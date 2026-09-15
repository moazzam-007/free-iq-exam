/**
 * FreeIQExam — Clinical Sleep Cycle & Chronotype Optimizer
 * ---------------------------------------------------------------------------
 * Five client-side subsystems, zero network calls, zero storage:
 *
 *   1. Triple-mode sleep scheduling  (wake-at / sleep-now / planned-bedtime)
 *   2. Cycle tier tagging            (6 / 5 / 4 / <=3 with deficit alerting)
 *   3. Munich ChronoType assessment  (MCTQ -> MSFsc -> Lion / Bear / Wolf /
 *                                     Dolphin overlay)
 *   4. Caffeine half-life decay      (first-order elimination, t-half = 5.7 h)
 *   5. Sleep debt & recovery         (7-night ledger + 3-night repayment)
 *
 * Plus two renderers: a night-architecture hypnogram and a 24-hour circadian
 * clock wheel.
 *
 * PROVENANCE / HONESTY NOTES
 * --------------------------
 * The 90-minute cycle is a POPULATION AVERAGE. Individual ultradian periods
 * range roughly 70-120 minutes. This engine therefore treats cycle length as a
 * scheduling heuristic, not a measurement of the user's physiology, and says so
 * in the UI. It cannot tell you when you will actually wake up mid-cycle.
 *
 * Per-cycle stage architecture follows the model in the Qwen reference
 * (n1=5, n2=35+3c, n3=max(0,30-7c), rem=15+5c, scaled to 90 min), which encodes
 * the two facts that matter: slow-wave sleep dominates the early cycles and REM
 * dominates the late ones. It is corrected here in one respect -- the reference
 * ordered its depth axis awake < n1 < n2 < rem < n3, placing REM deeper than
 * N2. REM sits near N1 in arousal threshold ("paradoxical sleep"), so the depth
 * axis here is awake < rem < n1 < n2 < n3.
 *
 * MSFsc is computed per Roenneberg's MCTQ: the sleep-debt correction term is
 * applied ONLY when free-day sleep is longer than workday sleep. Applying it
 * unconditionally is a common bug in sleep-calculator clones.
 *
 * Dolphin is NOT an MCTQ construct. It comes from Breus's four-chronotype
 * popularisation, so it is surfaced here as an explicit overlay on the computed
 * MCTQ type -- never silently substituted for it.
 */
(function () {
  'use strict';

  // =========================================================== constants ===

  const CYCLE_MIN = 90;              // population-average ultradian period
  const LATENCY_MIN = 14;            // mean sleep-onset latency, healthy adults
  const TARGET_SLEEP_MIN = 480;      // 8 h reference for the debt ledger
  const SCHEDULE_CYCLES = [6, 5, 4, 3];

  const CAFFEINE_HALF_LIFE_H = 5.7;  // mean elimination half-life, 3-7 h range
  const CAFFEINE_CUTOFF_MG = 50;     // residual dose used for the cut-off readout
  const CAFFEINE_MAX_MG = 600;
  const CAFFEINE_CURVE_HOURS = 24;

  const MELATONIN_LEAD_MIN = 120;    // DLMO ~2 h before habitual sleep onset

  // MCTQ MSFsc cut-points, in decimal local clock hours.
  const MSFSC_LION_MAX = 2.5;
  const MSFSC_WOLF_MIN = 4.0;

  const CLOCK_R = 108;
  const CLOCK_CX = 130;
  const CLOCK_CY = 130;
  const CLOCK_BED_R = 92;
  const CLOCK_MARK_R = 100;

  const DEBT_RECOVERY_NIGHTS = 3;
  const DEBT_RECOVERY_CAP_MIN = 90;  // per-night extension ceiling; see notes

  // Depth ordering: index 0 is the shallowest arousal threshold.
  const STAGE_META = {
    awake: { label: 'Awake',     depth: 0, y: 18,  color: '#fbbf24' },
    rem:   { label: 'REM',       depth: 1, y: 54,  color: '#f472b6' },
    n1:    { label: 'N1',        depth: 2, y: 90,  color: '#a78bfa' },
    n2:    { label: 'N2',        depth: 3, y: 126, color: '#818cf8' },
    n3:    { label: 'N3 (SWS)',  depth: 4, y: 162, color: '#4338ca' }
  };

  const CYCLE_TIERS = {
    6: {
      key: 'optimal',
      label: 'Optimal Restorative Sleep',
      short: 'Optimal',
      tone: 'optimal',
      note: 'Six complete cycles. Full slow-wave and REM complement with the ' +
            'least residual sleep pressure on waking.'
    },
    5: {
      key: 'baseline',
      label: 'Recommended Adult Baseline',
      short: 'Baseline',
      tone: 'baseline',
      note: 'Five cycles (~7.5 h in bed). Meets the AASM/SRS adult duration ' +
            'consensus for most people.'
    },
    4: {
      key: 'minimum',
      label: 'Functional Minimum',
      short: 'Minimum',
      tone: 'minimum',
      note: 'Four cycles (~6 h). Sustainable short-term, but REM is truncated ' +
            'and cumulative debt accrues nightly.'
    },
    3: {
      key: 'deficit',
      label: 'Sleep Deprivation Risk',
      short: 'Deficit',
      tone: 'deficit',
      note: 'Three cycles or fewer. Below the minimum adult duration' +
            ' consensus. Expect measurable vigilance and mood impairment.'
    },
    deficit: {
      key: 'deficit',
      label: 'Sleep Deprivation Risk',
      short: 'Deficit',
      tone: 'deficit',
      note: 'Below the minimum adult duration consensus. Expect measurable ' +
            'vigilance and mood impairment.'
    }
  };

  const CHRONOTYPES = {
    lion: {
      key: 'lion',
      name: 'Lion',
      alias: 'Early chronotype — the "lark"',
      tone: 'early',
      summary: 'Your free-day mid-sleep lands early. Your circadian phase is ' +
               'advanced relative to the population: you reach peak alertness ' +
               'before most people have finished their first coffee, and your ' +
               'sleep pressure builds early in the evening.',
      peak: '08:00 – 12:00',
      trough: '14:00 – 16:00',
      secondary: '16:00 – 18:00',
      typicalBed: '21:45',
      typicalWake: '05:15',
      scheduleAdvice: 'Protect a bedtime before 22:30. Evening social ' +
                      'obligations cost you more than they cost a Bear or Wolf, ' +
                      'because your melatonin onset is already underway.',
      friction: 'Late-evening events, night shifts, and 24-hour light exposure ' +
                'hit this chronotype hardest — you are being asked to stay awake ' +
                'through your biological night.'
    },
    bear: {
      key: 'bear',
      name: 'Bear',
      alias: 'Intermediate chronotype — the population plurality',
      tone: 'intermediate',
      summary: 'Your free-day mid-sleep sits close to the population mean. ' +
               'Roughly 55% of people fall here — your circadian rhythm tracks ' +
               'the solar day closely and is the reference against which the ' +
               'other chronotypes are defined.',
      peak: '10:00 – 14:00',
      trough: '14:00 – 16:00',
      secondary: '16:00 – 18:00',
      typicalBed: '23:15',
      typicalWake: '07:15',
      scheduleAdvice: 'A bedtime between 22:45 and 23:45 matches your phase. ' +
                      'Your main vulnerability is the mid-afternoon trough — ' +
                      'schedule low-stakes work there, not decisions.',
      friction: 'Post-lunch alertness dips are steepest in this group. The ' +
                'trough is circadian, not a failure of willpower or digestion.'
    },
    wolf: {
      key: 'wolf',
      name: 'Wolf',
      alias: 'Late chronotype — the "owl"',
      tone: 'late',
      summary: 'Your free-day mid-sleep lands late. Your circadian phase is ' +
               'delayed relative to the population: morning hours fall inside ' +
               'your biological night, and your best cognitive work happens ' +
               'when a Lion is winding down.',
      peak: '17:00 – 21:00',
      trough: '07:00 – 09:00',
      secondary: '21:00 – 23:00',
      typicalBed: '01:00',
      typicalWake: '09:00',
      scheduleAdvice: 'Anchor a consistent wake time even on free days — a ' +
                      'late phase is worsened by weekend catch-up sleep. Seek ' +
                      'bright light within 30 minutes of waking.',
      friction: 'This is the chronotype most damaged by standard 09:00 start ' +
                'times. The resulting chronic debt is a scheduling mismatch, ' +
                'not a discipline problem.'
    },
    dolphin: {
      key: 'dolphin',
      name: 'Dolphin',
      alias: 'Fragmented-sleep overlay',
      tone: 'fragmented',
      summary: 'Your MCTQ timing sits in the intermediate range, but your ' +
               'sleep is fragmented — you report frequent night waking and ' +
               'unrefreshing rest. Fragmentation, not phase, is your primary ' +
               'problem, and it needs a different response.',
      peak: '15:00 – 19:00',
      trough: '07:00 – 09:00',
      secondary: '11:00 – 13:00',
      typicalBed: '23:30',
      typicalWake: '06:30',
      scheduleAdvice: 'Rigid sleep-window regularity matters more for you than ' +
                      'total duration. Keep the wake time fixed to within 30 ' +
                      'minutes, seven days a week.',
      friction: 'Important caveat: Dolphin is not part of the Munich ' +
                'ChronoType Questionnaire. It is an overlay drawn from a ' +
                'separate popular framework, inferred here from your ' +
                'fragmentation answer alone.'
    }
  };

  // ============================================================== helpers ===

  function $(id) {
    return document.getElementById(id);
  }

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  /** Parse "HH:MM" (or an <input type="time"> value) into minutes past midnight. */
  function toMinutes(value) {
    if (typeof value !== 'string') return null;
    const match = /^(\d{1,2}):(\d{2})/.exec(value.trim());
    if (!match) return null;
    const h = Number(match[1]);
    const m = Number(match[2]);
    if (h > 23 || m > 59) return null;
    return h * 60 + m;
  }

  /** Minutes past midnight -> "HH:MM", wrapping across days. */
  function fromMinutes(total) {
    const wrapped = ((Math.round(total) % 1440) + 1440) % 1440;
    const h = Math.floor(wrapped / 60);
    const m = wrapped % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  function fromMinutes12(total) {
    const wrapped = ((Math.round(total) % 1440) + 1440) % 1440;
    const h24 = Math.floor(wrapped / 60);
    const m = wrapped % 60;
    const suffix = h24 < 12 ? 'AM' : 'PM';
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return h12 + ':' + String(m).padStart(2, '0') + ' ' + suffix;
  }

  /** Duration in hours across a possible midnight boundary. */
  function durationHours(startMin, endMin) {
    let span = endMin - startMin;
    if (span <= 0) span += 1440;
    return span / 60;
  }

  function formatDuration(minutes) {
    const total = Math.round(minutes);
    const h = Math.floor(total / 60);
    const m = total % 60;
    if (h === 0) return m + ' min';
    if (m === 0) return h + ' h';
    return h + ' h ' + m + ' min';
  }

  function ordinal(n) {
    const rem100 = n % 100;
    if (rem100 >= 11 && rem100 <= 13) return n + 'th';
    switch (n % 10) {
      case 1: return n + 'st';
      case 2: return n + 'nd';
      case 3: return n + 'rd';
      default: return n + 'th';
    }
  }

  // Guarded DOM writers. The clock wheel ticks once a minute and the caffeine
  // sliders fire on every input event; unconditional writes there cause
  // needless layout work and, on the slider, visible text flicker.
  function setText(el, value) {
    if (!el) return;
    const next = String(value);
    if (el.textContent !== next) el.textContent = next;
  }

  function setTone(el, tone) {
    if (!el) return;
    const next = 'tone-' + tone;
    if (el.dataset.tone !== tone) {
      el.dataset.tone = tone;
      el.classList.remove('tone-optimal', 'tone-baseline', 'tone-minimum',
                          'tone-deficit', 'tone-early', 'tone-intermediate',
                          'tone-late', 'tone-fragmented');
      el.classList.add(next);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ================================================== 1. cycle scheduling ===

  /** Tier descriptor for a cycle count. Never throws; unknown counts degrade. */
  function tierFor(cycles) {
    const exact = CYCLE_TIERS[cycles];
    if (exact) return exact;
    if (cycles >= 6) return CYCLE_TIERS[6];
    return CYCLE_TIERS.deficit;
  }

  /**
   * Mode A — wake at a fixed time. Cycles run backwards from the alarm.
   * The latency offset is subtracted as well, because a "bedtime" is when you
   * get into bed, not when you fall asleep.
   */
  function scheduleForWake(wakeMin) {
    return SCHEDULE_CYCLES.map(function (cycles) {
      const sleepMin = cycles * CYCLE_MIN;
      const bedMin = wakeMin - sleepMin - LATENCY_MIN;
      return {
        cycles: cycles,
        tier: tierFor(cycles),
        onset: fromMinutes(bedMin + LATENCY_MIN),
        bed: fromMinutes(bedMin),
        wake: fromMinutes(wakeMin),
        sleepMinutes: sleepMin
      };
    });
  }

  /** Mode B — sleep now. Onset = now + latency; wake = onset + n cycles. */
  function scheduleForNow(nowMin) {
    return SCHEDULE_CYCLES.map(function (cycles) {
      const sleepMin = cycles * CYCLE_MIN;
      const onsetMin = nowMin + LATENCY_MIN;
      return {
        cycles: cycles,
        tier: tierFor(cycles),
        onset: fromMinutes(onsetMin),
        bed: fromMinutes(nowMin),
        wake: fromMinutes(onsetMin + sleepMin),
        sleepMinutes: sleepMin
      };
    });
  }

  /** Mode C — planned bedtime. Onset = bed + latency; wake = onset + n cycles. */
  function scheduleForBedtime(bedMin) {
    return SCHEDULE_CYCLES.map(function (cycles) {
      const sleepMin = cycles * CYCLE_MIN;
      const onsetMin = bedMin + LATENCY_MIN;
      return {
        cycles: cycles,
        tier: tierFor(cycles),
        onset: fromMinutes(onsetMin),
        bed: fromMinutes(bedMin),
        wake: fromMinutes(onsetMin + sleepMin),
        sleepMinutes: sleepMin
      };
    });
  }

  // ============================================== 2. night architecture =====

  /**
   * Population-average stage architecture for a night of `cycleCount` cycles.
   * Each cycle is scaled to exactly CYCLE_MIN so the total matches the
   * schedule shown elsewhere on the page. A leading awake segment accounts for
   * sleep-onset latency.
   *
   * Returns { segments, totals } where segments are contiguous and ordered.
   */
  function buildNightArchitecture(cycleCount) {
    const count = clamp(Math.round(cycleCount), 1, 8);
    const segments = [{
      stage: 'awake',
      minutes: LATENCY_MIN,
      label: 'Sleep latency'
    }];

    for (let c = 0; c < count; c++) {
      // Raw weights, then normalised so every cycle occupies the full period.
      const rawN1 = 5;
      const rawN2 = 35 + c * 3;
      const rawN3 = Math.max(0, 30 - c * 7);
      const rawRem = 15 + c * 5;
      const rawTotal = rawN1 + rawN2 + rawN3 + rawRem;
      const scale = CYCLE_MIN / rawTotal;

      // Order within a cycle: descend into SWS, then ascend through REM.
      const order = [
        ['n1', rawN1 * scale],
        ['n2', rawN2 * scale],
        ['n3', rawN3 * scale],
        ['rem', rawRem * scale]
      ];

      for (let i = 0; i < order.length; i++) {
        if (order[i][1] <= 0) continue;
        segments.push({
          stage: order[i][0],
          minutes: order[i][1],
          cycle: c + 1,
          label: STAGE_META[order[i][0]].label
        });
      }
    }

    // Merge adjacent segments of the same stage that span a cycle boundary.
    const merged = [];
    for (let i = 0; i < segments.length; i++) {
      const prev = merged[merged.length - 1];
      if (prev && prev.stage === segments[i].stage && prev.cycle === undefined &&
          segments[i].cycle === undefined) {
        prev.minutes += segments[i].minutes;
      } else {
        merged.push(segments[i]);
      }
    }

    const totals = { awake: 0, n1: 0, n2: 0, n3: 0, rem: 0 };
    for (let i = 0; i < merged.length; i++) {
      totals[merged[i].stage] += merged[i].minutes;
    }

    return { segments: merged, totals: totals, cycles: count };
  }

  /**
   * Render the night architecture as an SVG hypnogram. Time flows left to
   * right from lights-out; depth increases downward.
   */
  function renderHypnogram(architecture, bedMin) {
    const width = 720;
    const height = 200;
    const padLeft = 56;
    const padRight = 16;
    const padTop = 14;
    const padBottom = 26;
    const plotW = width - padLeft - padRight;

    const totalMinutes = architecture.segments.reduce(function (sum, seg) {
      return sum + seg.minutes;
    }, 0);
    if (!totalMinutes) return '';

    const parts = [];
    const stageKeys = ['awake', 'rem', 'n1', 'n2', 'n3'];

    // Horizontal grid + stage labels.
    for (let i = 0; i < stageKeys.length; i++) {
      const meta = STAGE_META[stageKeys[i]];
      parts.push(
        '<line class="hypo-grid" x1="' + padLeft + '" y1="' + meta.y +
        '" x2="' + (width - padRight) + '" y2="' + meta.y + '"/>'
      );
      parts.push(
        '<text class="hypo-stage" x="' + (padLeft - 10) + '" y="' +
        (meta.y + 4) + '" text-anchor="end">' + escapeHtml(meta.label) +
        '</text>'
      );
    }

    // Step trace. Horizontal run per segment, vertical connector between them.
    let cursor = padLeft;
    let prevY = STAGE_META[architecture.segments[0].stage].y;
    const points = [];

    for (let i = 0; i < architecture.segments.length; i++) {
      const seg = architecture.segments[i];
      const meta = STAGE_META[seg.stage];
      const runW = (seg.minutes / totalMinutes) * plotW;
      if (meta.y !== prevY) {
        points.push('L ' + cursor.toFixed(2) + ' ' + meta.y);
        prevY = meta.y;
      }
      points.push('L ' + cursor.toFixed(2) + ' ' + meta.y);
      cursor += runW;
      points.push('L ' + cursor.toFixed(2) + ' ' + meta.y);
    }

    if (points.length) {
      points[0] = 'M ' + points[0].slice(2);
      parts.push('<path class="hypo-trace" d="' + points.join(' ') + '"/>');
    }

    // Cycle boundary ticks along the baseline.
    const cycleW = (CYCLE_MIN / totalMinutes) * plotW;
    const baseline = padTop + 170;
    for (let c = 1; c < architecture.cycles; c++) {
      const x = padLeft + (LATENCY_MIN / totalMinutes) * plotW + cycleW * c;
      parts.push(
        '<line class="hypo-cycle-tick" x1="' + x.toFixed(2) + '" y1="' +
        (baseline - 172) + '" x2="' + x.toFixed(2) + '" y2="' + baseline + '"/>'
      );
    }

    // Clock labels at lights-out and at final wake.
    parts.push(
      '<text class="hypo-axis" x="' + padLeft + '" y="' + (height - 8) +
      '" text-anchor="start">' + escapeHtml(fromMinutes12(bedMin)) + '</text>'
    );
    parts.push(
      '<text class="hypo-axis" x="' + (width - padRight) + '" y="' + (height - 8) +
      '" text-anchor="end">' + escapeHtml(fromMinutes12(bedMin + totalMinutes)) +
      '</text>'
    );

    return parts.join('');
  }

  // ================================================ 3. chronotype / MCTQ ====

  /**
   * Compute MCTQ-derived quantities from four clock times plus a fragmentation
   * answer.
   *
   * MSFsc = MSF - (SD_F - SD_week) / 2, applied ONLY when SD_F > SD_week.
   * The correction exists because free-day sleep is inflated by repayment of
   * workday debt; without the guard, a short sleeper who catches up on Sunday
   * is misclassified as a late chronotype.
   */
  function computeMCTQ(input) {
    const workdaySleep = toMinutes(input.workdaySleep);
    const workdayWake = toMinutes(input.workdayWake);
    const freeSleep = toMinutes(input.freeSleep);
    const freeWake = toMinutes(input.freeWake);

    if (workdaySleep === null || workdayWake === null ||
        freeSleep === null || freeWake === null) {
      return { ok: false, reason: 'Please fill in all four times.' };
    }

    const sdWeek = durationHours(workdaySleep, workdayWake);
    const sdFree = durationHours(freeSleep, freeWake);

    if (sdWeek <= 0 || sdFree <= 0) {
      return { ok: false, reason: 'Sleep times must differ from wake times.' };
    }

    // Mid-sleep, as decimal clock hours.
    let msw = (workdaySleep + (sdWeek * 60) / 2) / 60;   // workday mid-sleep
    let msf = (freeSleep + (sdFree * 60) / 2) / 60;      // free-day mid-sleep
    if (msw < 0) msw += 24;
    if (msf < 0) msf += 24;
    msw %= 24;
    msf %= 24;

    const correction = sdFree > sdWeek ? (sdFree - sdWeek) / 2 : 0;
    let msfsc = msf - correction;
    // Keep MSFsc on the same side of midnight as MSF so the cut-points read
    // correctly for late chronotypes whose mid-sleep sits after 00:00.
    if (msf < 12 && msfsc < 0) msfsc += 24;
    msfsc = ((msfsc % 24) + 24) % 24;

    // Social jetlag: the phase shift between biological and social time.
    let socialJetlag = msf - msw;
    if (socialJetlag > 12) socialJetlag -= 24;
    if (socialJetlag < -12) socialJetlag += 24;

    const average = (sdWeek * 5 + sdFree * 2) / 7;
    const fragmented = input.fragmentation === 'often';

    let key;
    if (msfsc < MSFSC_LION_MAX) key = 'lion';
    else if (msfsc > MSFSC_WOLF_MIN) key = 'wolf';
    else key = 'bear';

    const mctqKey = key;
    let type = CHRONOTYPES[key];
    let overlay = null;

    if (fragmented) {
      // The overlay keeps the Dolphin descriptive copy but INHERITS the
      // measured MCTQ timing. Showing a fragmented Wolf the Dolphin's 23:30
      // bedtime would contradict their own MSFsc on the clock wheel.
      overlay = Object.assign({}, CHRONOTYPES.dolphin, {
        baseKey: mctqKey,
        baseName: type.name,
        typicalBed: type.typicalBed,
        typicalWake: type.typicalWake
      });
      type = overlay;
    }

    return {
      ok: true,
      msf: msf,
      msfsc: msfsc,
      msw: msw,
      correction: correction,
      sdWeek: sdWeek,
      sdFree: sdFree,
      socialJetlag: socialJetlag,
      average: average,
      mctqKey: mctqKey,
      mctqType: CHRONOTYPES[mctqKey],
      type: type,
      isOverlay: Boolean(overlay),
      fragmentation: input.fragmentation
    };
  }

  // ================================================= 4. caffeine kinetics ====

  /** First-order elimination. C(t) = C0 * 0.5^(t / t-half). */
  function caffeineRemaining(mg, hours) {
    if (mg <= 0 || hours < 0) return mg <= 0 ? 0 : mg;
    return mg * Math.pow(0.5, hours / CAFFEINE_HALF_LIFE_H);
  }

  /**
   * Hours after ingestion for a dose to decay to `threshold` mg.
   * Undefined (Infinity) when the dose is already at or below threshold.
   */
  function hoursToThreshold(mg, threshold) {
    if (mg <= threshold) return 0;
    return CAFFEINE_HALF_LIFE_H * Math.log(mg / threshold) / Math.LN2;
  }

  function buildCaffeineCurve(mg, hours) {
    const points = [];
    const steps = 96;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * hours;
      points.push({ t: t, mg: caffeineRemaining(mg, t) });
    }
    return points;
  }

  // ======================================================= 5. sleep debt ====

  /**
   * Cumulative debt across a 7-night ledger against TARGET_SLEEP_MIN.
   *
   * The recovery protocol deliberately does NOT repay the debt linearly in one
   * night. Recovery sleep is capped per night because (a) the homeostatic
   * rebound is saturable, (b) extended time in bed degrades sleep efficiency,
   * and (c) large single-night extensions produce morning sleep inertia. The
   * honest statement is that debt is repaid over several nights, partially.
   */
  function computeSleepDebt(nights) {
    const valid = nights.filter(function (n) {
      return typeof n === 'number' && isFinite(n) && n >= 0;
    });
    if (!valid.length) return { ok: false };

    const targetH = TARGET_SLEEP_MIN / 60;
    let totalSlept = 0;
    let worstIndex = 0;
    let worstValue = Infinity;

    for (let i = 0; i < valid.length; i++) {
      totalSlept += valid[i];
      if (valid[i] < worstValue) {
        worstValue = valid[i];
        worstIndex = i;
      }
    }

    const targetTotal = targetH * valid.length;
    const deficitH = Math.max(0, targetTotal - totalSlept);
    const average = totalSlept / valid.length;
    const averageDeficit = Math.max(0, targetH - average);

    // Repayment schedule: spread the deficit across DEBT_RECOVERY_NIGHTS,
    // capped per night. Report residual debt honestly rather than pretending
    // three nights erases a week of restriction.
    const capH = DEBT_RECOVERY_CAP_MIN / 60;
    const plan = [];
    let remaining = deficitH;
    for (let i = 0; i < DEBT_RECOVERY_NIGHTS; i++) {
      const repay = Math.min(capH, remaining);
      remaining -= repay;
      plan.push({
        night: i + 1,
        extension: repay,
        bedtimeHours: targetH + repay,
        residual: remaining
      });
    }

    return {
      ok: true,
      nights: valid.length,
      totalSlept: totalSlept,
      average: average,
      deficitH: deficitH,
      averageDeficit: averageDeficit,
      worstIndex: worstIndex,
      worstValue: worstValue,
      plan: plan,
      residual: remaining,
      recovered: deficitH > 0 ? (deficitH - remaining) / deficitH : 1
    };
  }

  // ======================================================= 6. clock wheel ===

  function polar(cx, cy, r, hour) {
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }

  /** Arc from startHour forward to endHour, wrapping past 24 if needed. */
  function arcPath(cx, cy, r, startHour, endHour) {
    let span = endHour - startHour;
    while (span <= 0) span += 24;
    while (span > 24) span -= 24;
    const large = span > 12 ? 1 : 0;
    const s = polar(cx, cy, r, startHour);
    const e = polar(cx, cy, r, endHour);
    return 'M ' + s.x.toFixed(2) + ' ' + s.y.toFixed(2) +
           ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' +
           e.x.toFixed(2) + ' ' + e.y.toFixed(2);
  }

  function hourToDecimal(minutes) {
    return ((minutes % 1440) + 1440) % 1440 / 60;
  }

  /**
   * 24-hour circadian wheel. Midnight at the top, noon at the bottom, running
   * clockwise. Layers, outermost first: hour ring, sleep arc, melatonin-onset
   * marker, caffeine cut-off marker, chronotype peak arc, current-time hand.
   */
  function renderClockWheel(state) {
    const parts = [];

    // Hour ring + ticks.
    parts.push('<circle class="wheel-ring" cx="' + CLOCK_CX + '" cy="' + CLOCK_CY +
               '" r="' + CLOCK_R + '"/>');

    for (let h = 0; h < 24; h++) {
      const major = h % 6 === 0;
      const outer = polar(CLOCK_CX, CLOCK_CY, CLOCK_R, h);
      const inner = polar(CLOCK_CX, CLOCK_CY, CLOCK_R - (major ? 12 : 6), h);
      parts.push('<line class="wheel-tick' + (major ? ' is-major' : '') +
                 '" x1="' + outer.x.toFixed(2) + '" y1="' + outer.y.toFixed(2) +
                 '" x2="' + inner.x.toFixed(2) + '" y2="' + inner.y.toFixed(2) + '"/>');

      if (major) {
        const label = polar(CLOCK_CX, CLOCK_CY, CLOCK_R - 26, h);
        parts.push('<text class="wheel-hour" x="' + label.x.toFixed(2) +
                   '" y="' + (label.y + 4).toFixed(2) + '" text-anchor="middle">' +
                   String(h).padStart(2, '0') + '</text>');
      }
    }

    // Sleep arc.
    if (state.bedMin !== null && state.wakeMin !== null) {
      parts.push('<path class="wheel-sleep-arc" d="' +
                 arcPath(CLOCK_CX, CLOCK_CY, CLOCK_BED_R,
                         hourToDecimal(state.bedMin), hourToDecimal(state.wakeMin)) + '"/>');
      const bedPt = polar(CLOCK_CX, CLOCK_CY, CLOCK_BED_R, hourToDecimal(state.bedMin));
      parts.push('<circle class="wheel-node is-bed" cx="' + bedPt.x.toFixed(2) +
                 '" cy="' + bedPt.y.toFixed(2) + '" r="4.5"/>');
      const wakePt = polar(CLOCK_CX, CLOCK_CY, CLOCK_BED_R, hourToDecimal(state.wakeMin));
      parts.push('<circle class="wheel-node is-wake" cx="' + wakePt.x.toFixed(2) +
                 '" cy="' + wakePt.y.toFixed(2) + '" r="4.5"/>');
    }

    // Melatonin onset (DLMO), ~2 h before habitual sleep onset.
    if (state.onsetMin !== null) {
      const dlmoMin = state.onsetMin - MELATONIN_LEAD_MIN;
      const pt = polar(CLOCK_CX, CLOCK_CY, CLOCK_MARK_R, hourToDecimal(dlmoMin));
      parts.push('<circle class="wheel-node is-melatonin" cx="' + pt.x.toFixed(2) +
                 '" cy="' + pt.y.toFixed(2) + '" r="4"/>');
    }

    // Caffeine cut-off marker, only when a dose is actually in play.
    if (state.caffeineCutoffMin !== null) {
      const pt = polar(CLOCK_CX, CLOCK_CY, CLOCK_MARK_R,
                       hourToDecimal(state.caffeineCutoffMin));
      parts.push('<circle class="wheel-node is-caffeine" cx="' + pt.x.toFixed(2) +
                 '" cy="' + pt.y.toFixed(2) + '" r="4"/>');
    }

    // Chronotype peak / trough arcs on the inner band.
    if (state.peakStartMin !== null && state.peakEndMin !== null) {
      parts.push('<path class="wheel-peak-arc" d="' +
                 arcPath(CLOCK_CX, CLOCK_CY, 72,
                         hourToDecimal(state.peakStartMin),
                         hourToDecimal(state.peakEndMin)) + '"/>');
    }

    // Current-time hand.
    const nowHour = state.nowMin / 60;
    const hand = polar(CLOCK_CX, CLOCK_CY, CLOCK_R - 18, nowHour);
    parts.push('<line class="wheel-hand" x1="' + CLOCK_CX + '" y1="' + CLOCK_CY +
               '" x2="' + hand.x.toFixed(2) + '" y2="' + hand.y.toFixed(2) + '"/>');
    parts.push('<circle class="wheel-hub" cx="' + CLOCK_CX + '" cy="' + CLOCK_CY +
               '" r="5"/>');

    return parts.join('');
  }

  /** Radial legend swatch positions, drawn by the page's static markup. */

  // =========================================================== page wiring ==

  const state = {
    mode: 'wake',
    bedMin: null,
    onsetMin: null,
    wakeMin: null,
    caffeineCutoffMin: null,
    peakStartMin: null,
    peakEndMin: null,
    chrono: null,
    nowMin: 0,
    lastHandMinute: -1
  };

  function currentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function redrawWheel() {
    const host = $('clock-wheel');
    if (!host) return;
    host.innerHTML = renderClockWheel(state);
  }

  // ------------------------------------------------------------ mode tabs --

  function applyMode(mode) {
    state.mode = mode;

    const tabs = document.querySelectorAll('[data-sleep-mode]');
    for (let i = 0; i < tabs.length; i++) {
      const active = tabs[i].getAttribute('data-sleep-mode') === mode;
      tabs[i].classList.toggle('is-active', active);
      tabs[i].setAttribute('aria-selected', active ? 'true' : 'false');
    }

    const panels = document.querySelectorAll('[data-mode-panel]');
    for (let i = 0; i < panels.length; i++) {
      const active = panels[i].getAttribute('data-mode-panel') === mode;
      panels[i].hidden = !active;
    }
  }

  function renderScheduleCards(hostId, schedule, summaryText) {
    const host = $(hostId);
    if (!host) return;

    const cards = schedule.map(function (entry) {
      const tier = entry.tier;
      // Schedule entries carry clock STRINGS; fromMinutes12 wants minutes, so
      // every one of these goes back through toMinutes first.
      const primary = toMinutes(state.mode === 'wake' ? entry.bed : entry.wake);
      const primaryLabel = state.mode === 'wake' ? 'Bedtime' : 'Wake up';
      const secondary = toMinutes(state.mode === 'wake' ? entry.wake : entry.bed);
      const secondaryLabel = state.mode === 'wake' ? 'Wake' : 'Get into bed';

      return '' +
        '<article class="cycle-card" data-tone="' + tier.tone + '">' +
          '<header class="cycle-card-head">' +
            '<span class="cycle-count">' + entry.cycles + ' cycles</span>' +
            '<span class="cycle-tier">' + escapeHtml(tier.short) + '</span>' +
          '</header>' +
          '<p class="cycle-primary">' + escapeHtml(fromMinutes12(primary)) + '</p>' +
          '<p class="cycle-primary-label">' + escapeHtml(primaryLabel) + '</p>' +
          '<dl class="cycle-meta">' +
            '<div><dt>' + escapeHtml(secondaryLabel) + '</dt><dd>' +
              escapeHtml(fromMinutes12(secondary)) + '</dd></div>' +
            '<div><dt>Asleep by</dt><dd>' + escapeHtml(fromMinutes12(toMinutes(entry.onset))) + '</dd></div>' +
            '<div><dt>Time asleep</dt><dd>' + escapeHtml(formatDuration(entry.sleepMinutes)) + '</dd></div>' +
          '</dl>' +
          '<p class="cycle-note">' + escapeHtml(tier.note) + '</p>' +
          (tier.tone === 'deficit'
            ? '<p class="cycle-alert" role="note">Below the minimum adult ' +
              'duration consensus — not a sustainable target.</p>'
            : '') +
        '</article>';
    }).join('');

    host.innerHTML = cards;

    const summary = $(hostId + '-summary');
    setText(summary, summaryText);
  }

  function updateWakeMode() {
    const input = $('wake-time');
    if (!input) return;
    const wakeMin = toMinutes(input.value);
    if (wakeMin === null) return;

    const schedule = scheduleForWake(wakeMin);
    const best = schedule[0];   // 6 cycles

    state.wakeMin = wakeMin;
    state.bedMin = toMinutes(best.bed);
    state.onsetMin = toMinutes(best.onset);
    state.caffeineCutoffMin = null;
    redrawWheel();

    renderScheduleCards('wake-results', schedule,
      'To wake at ' + fromMinutes12(wakeMin) + ', be asleep by ' +
      fromMinutes12(toMinutes(best.onset)) + ' — ' +
      fromMinutes12(toMinutes(best.bed)) + ' in bed, allowing ' +
      LATENCY_MIN + ' minutes to fall asleep.');

    renderHypnogramFor(6, toMinutes(best.bed));
  }

  function updateNowMode() {
    const nowMin = currentMinutes();
    const schedule = scheduleForNow(nowMin);
    const best = schedule[0];

    state.bedMin = nowMin;
    state.onsetMin = nowMin + LATENCY_MIN;
    state.wakeMin = toMinutes(best.wake);
    state.caffeineCutoffMin = null;
    state.nowMin = nowMin;
    redrawWheel();

    renderScheduleCards('now-results', schedule,
      'If you get into bed now (' + fromMinutes12(nowMin) + '), you would ' +
      'fall asleep around ' + fromMinutes12(nowMin + LATENCY_MIN) + '. Waking ' +
      'at a cycle boundary means ' + fromMinutes12(toMinutes(best.wake)) +
      ' for six complete cycles.');

    renderHypnogramFor(6, nowMin);
  }

  function updateBedtimeMode() {
    const input = $('bedtime-input');
    if (!input) return;
    const bedMin = toMinutes(input.value);
    if (bedMin === null) return;

    const schedule = scheduleForBedtime(bedMin);
    const best = schedule[0];

    state.bedMin = bedMin;
    state.onsetMin = bedMin + LATENCY_MIN;
    state.wakeMin = toMinutes(best.wake);
    state.caffeineCutoffMin = null;
    redrawWheel();

    renderScheduleCards('bedtime-results', schedule,
      'In bed at ' + fromMinutes12(bedMin) + ' and asleep by ' +
      fromMinutes12(bedMin + LATENCY_MIN) + ', six cycles finish at ' +
      fromMinutes12(toMinutes(best.wake)) + '.');

    renderHypnogramFor(6, bedMin);
  }

  function renderHypnogramFor(cycles, bedMin) {
    const host = $('hypnogram');
    if (!host) return;
    const architecture = buildNightArchitecture(cycles);
    host.innerHTML = renderHypnogram(architecture, bedMin);

    const totals = architecture.totals;
    setText($('hypo-total'), formatDuration(cycles * CYCLE_MIN));
    setText($('hypo-sws'), formatDuration(totals.n3));
    setText($('hypo-rem'), formatDuration(totals.rem));
    setText($('hypo-light'),
      formatDuration(totals.n1 + totals.n2));
  }

  // ------------------------------------------------------ chronotype quiz --

  function updateChronotype() {
    const result = computeMCTQ({
      workdaySleep: ($('mctq-workday-sleep') || {}).value,
      workdayWake: ($('mctq-workday-wake') || {}).value,
      freeSleep: ($('mctq-freeday-sleep') || {}).value,
      freeWake: ($('mctq-freeday-wake') || {}).value,
      fragmentation: ($('mctq-fragmentation') || {}).value
    });

    const panel = $('chrono-result');
    const errorEl = $('chrono-error');

    if (!result.ok) {
      if (panel) panel.hidden = true;
      if (errorEl) {
        errorEl.hidden = false;
        setText(errorEl, result.reason);
      }
      return;
    }

    if (errorEl) errorEl.hidden = true;
    if (panel) panel.hidden = false;

    const type = result.type;
    state.chrono = result;

    setTone(panel, type.tone);
    setText($('chrono-name'), type.name);
    setText($('chrono-alias'), type.alias);
    setText($('chrono-summary'), type.summary);
    setText($('chrono-peak'), type.peak);
    setText($('chrono-trough'), type.trough);
    setText($('chrono-secondary'), type.secondary);
    setText($('chrono-advice'), type.scheduleAdvice);
    setText($('chrono-friction'), type.friction);
    setText($('chrono-msfsc'), fromMinutes12(result.msfsc * 60));
    setText($('chrono-msfsc-echo'), fromMinutes12(result.msfsc * 60));
    setText($('chrono-msf'), fromMinutes12(result.msf * 60));
    setText($('chrono-msw'), fromMinutes12(result.msw * 60));
    setText($('chrono-sdweek'), formatDuration(result.sdWeek * 60));
    setText($('chrono-sdfree'), formatDuration(result.sdFree * 60));
    setText($('chrono-social-jetlag'),
      (result.socialJetlag >= 0 ? '+' : '−') +
      formatDuration(Math.abs(result.socialJetlag) * 60));
    setText($('chrono-average'), formatDuration(result.average * 60));
    setText($('chrono-correction'),
      result.correction > 0 ? '−' + formatDuration(result.correction * 60) : 'none');

    // The Dolphin overlay must disclose what it is overlaying. Silently
    // replacing an MCTQ result with a popular-framework label would be a
    // fabrication.
    const disclosure = $('chrono-overlay-note');
    if (disclosure) {
      if (result.isOverlay) {
        disclosure.hidden = false;
        setText(disclosure,
          'Dolphin is not an MCTQ classification. Your questionnaire result ' +
          'was ' + result.mctqType.name + ' (MSFsc ' +
          fromMinutes12(result.msfsc * 60) + '); the Dolphin overlay was ' +
          'applied because you reported frequent night waking.');
      } else {
        disclosure.hidden = true;
      }
    }

    // Chronotype drives the wheel's peak arc and its own schedule preview.
    const peakStart = toMinutes(type.peak.slice(0, 5));
    const peakEnd = toMinutes(type.peak.slice(8, 13));
    const bedMin = toMinutes(type.typicalBed);
    const wakeMin = toMinutes(type.typicalWake);

    state.peakStartMin = peakStart;
    state.peakEndMin = peakEnd;

    if (state.mode !== 'now') {
      state.bedMin = bedMin;
      state.onsetMin = bedMin + LATENCY_MIN;
      state.wakeMin = wakeMin;
    }

    // Caffeine cut-off from the chronotype's typical bedtime at a 200 mg dose.
    const cutoffHours = hoursToThreshold(200, CAFFEINE_CUTOFF_MG);
    state.caffeineCutoffMin = bedMin - cutoffHours * 60;

    setText($('chrono-caffeine-cutoff'),
      fromMinutes12(state.caffeineCutoffMin) + ' (at a 200 mg dose)');
    setText($('chrono-melatonin-onset'),
      fromMinutes12(bedMin + LATENCY_MIN - MELATONIN_LEAD_MIN));

    redrawWheel();
  }

  // ------------------------------------------------------- caffeine panel --

  function updateCaffeine() {
    const doseEl = $('caffeine-dose');
    const timeEl = $('caffeine-time');
    const bedEl = $('caffeine-bedtime');
    if (!doseEl || !timeEl || !bedEl) return;

    const dose = clamp(Number(doseEl.value) || 0, 0, CAFFEINE_MAX_MG);
    const consumedMin = toMinutes(timeEl.value);
    const bedMin = toMinutes(bedEl.value);

    setText($('caffeine-dose-value'), dose + ' mg');

    if (consumedMin === null || bedMin === null) return;

    const hoursToBed = durationHours(consumedMin, bedMin);
    const remaining = caffeineRemaining(dose, hoursToBed);
    const cutoffHours = hoursToThreshold(dose, CAFFEINE_CUTOFF_MG);
    const cutoffMin = consumedMin + cutoffHours * 60;

    setText($('caffeine-remaining'), Math.round(remaining) + ' mg');
    setText($('caffeine-hours'), hoursToBed.toFixed(1) + ' h');
    setText($('caffeine-fraction'),
      dose > 0 ? Math.round((remaining / dose) * 100) + '%' : '0%');

    // Half-life milestone list: useful, concrete, and cheap to compute.
    const milestones = [];
    for (let half = 1; half <= 5; half++) {
      const hours = CAFFEINE_HALF_LIFE_H * half;
      const at = consumedMin + hours * 60;
      milestones.push(
        '<li><span class="milestone-dose">' +
        Math.round(caffeineRemaining(dose, hours)) + ' mg</span>' +
        '<span class="milestone-time">' + escapeHtml(fromMinutes12(at)) + '</span>' +
        '<span class="milestone-label">' + half + ' half-life' +
        (half === 1 ? '' : 's') + ' (' + hours.toFixed(1) + ' h)</span></li>'
      );
    }
    const listHost = $('caffeine-milestones');
    if (listHost) listHost.innerHTML = milestones.join('');

    const verdict = $('caffeine-verdict');
    if (verdict) {
      let tone;
      let message;
      if (dose === 0) {
        tone = 'optimal';
        message = 'No caffeine logged. Nothing to clear before bed.';
      } else if (remaining <= CAFFEINE_CUTOFF_MG) {
        tone = 'optimal';
        message = 'About ' + Math.round(remaining) + ' mg of the original ' +
                  dose + ' mg will still be circulating at bedtime — below the ' +
                  '50 mg threshold where measurable sleep disruption is ' +
                  'typically observed.';
      } else if (remaining <= 100) {
        tone = 'minimum';
        message = 'About ' + Math.round(remaining) + ' mg will still be ' +
                  'circulating at bedtime. That is enough to lengthen sleep ' +
                  'latency and reduce slow-wave sleep in controlled studies.';
      } else {
        tone = 'deficit';
        message = 'About ' + Math.round(remaining) + ' mg — roughly ' +
                  Math.round((remaining / dose) * 100) + '% of the dose — ' +
                  'will still be active at bedtime. Expect longer sleep onset ' +
                  'and reduced deep sleep.';
      }
      setTone(verdict, tone);
      setText($('caffeine-verdict-text'), message);
    }

    // Cut-off readout: the clock time after which a further dose would still
    // be above threshold at bedtime.
    const latestDoseMin = bedMin - cutoffHours * 60;
    setText($('caffeine-cutoff'),
      cutoffHours > 0 ? fromMinutes12(latestDoseMin) : 'Below 50 mg already');

    renderCaffeineCurve(dose, hoursToBed);
  }

  /**
   * Decay curve as a polyline on a linear time axis with a logarithmic-looking
   * dose axis. Plotted linearly in mg so the exponential reads as the curve it
   * actually is — a log axis would render it as a straight line and hide the
   * very shape the panel exists to show.
   */
  function renderCaffeineCurve(dose, hoursToBed) {
    const host = $('caffeine-curve');
    if (!host) return;

    const width = 640;
    const height = 220;
    const padLeft = 48;
    const padRight = 18;
    const padTop = 16;
    const padBottom = 30;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const maxMg = Math.max(100, dose);
    const points = buildCaffeineCurve(dose, CAFFEINE_CURVE_HOURS);

    function x(t) { return padLeft + (t / CAFFEINE_CURVE_HOURS) * plotW; }
    function y(mg) { return padTop + plotH - (mg / maxMg) * plotH; }

    const parts = [];

    // Axes.
    parts.push('<line class="curve-axis" x1="' + padLeft + '" y1="' + padTop +
               '" x2="' + padLeft + '" y2="' + (padTop + plotH) + '"/>');
    parts.push('<line class="curve-axis" x1="' + padLeft + '" y1="' +
               (padTop + plotH) + '" x2="' + (width - padRight) + '" y2="' +
               (padTop + plotH) + '"/>');

    // Horizontal guides every 6 hours, labelled.
    for (let h = 0; h <= CAFFEINE_CURVE_HOURS; h += 6) {
      parts.push('<line class="curve-grid" x1="' + x(h).toFixed(2) + '" y1="' + padTop +
                 '" x2="' + x(h).toFixed(2) + '" y2="' + (padTop + plotH) + '"/>');
      parts.push('<text class="curve-tick" x="' + x(h).toFixed(2) + '" y="' +
                 (height - 10) + '" text-anchor="middle">' + h + 'h</text>');
    }

    // Y labels at 0, half, full.
    [0, maxMg / 2, maxMg].forEach(function (mg) {
      parts.push('<text class="curve-tick" x="' + (padLeft - 8) + '" y="' +
                 (y(mg) + 4).toFixed(2) + '" text-anchor="end">' +
                 Math.round(mg) + '</text>');
    });

    // Threshold band.
    if (maxMg > CAFFEINE_CUTOFF_MG) {
      parts.push('<line class="curve-threshold" x1="' + padLeft + '" y1="' +
                 y(CAFFEINE_CUTOFF_MG).toFixed(2) + '" x2="' + (width - padRight) +
                 '" y2="' + y(CAFFEINE_CUTOFF_MG).toFixed(2) + '"/>');
      parts.push('<text class="curve-threshold-label" x="' + (width - padRight) +
                 '" y="' + (y(CAFFEINE_CUTOFF_MG) - 6).toFixed(2) +
                 '" text-anchor="end">50 mg threshold</text>');
    }

    // Decay polyline.
    const d = points.map(function (p, i) {
      return (i === 0 ? 'M ' : 'L ') + x(p.t).toFixed(2) + ' ' + y(p.mg).toFixed(2);
    }).join(' ');
    parts.push('<path class="curve-line" d="' + d + '"/>');

    // Bedtime marker.
    if (hoursToBed > 0 && hoursToBed <= CAFFEINE_CURVE_HOURS) {
      const bx = x(hoursToBed);
      const by = y(caffeineRemaining(dose, hoursToBed));
      parts.push('<line class="curve-bedtime" x1="' + bx.toFixed(2) + '" y1="' + padTop +
                 '" x2="' + bx.toFixed(2) + '" y2="' + (padTop + plotH) + '"/>');
      parts.push('<circle class="curve-node" cx="' + bx.toFixed(2) + '" cy="' +
                 by.toFixed(2) + '" r="4.5"/>');
      parts.push('<text class="curve-bedtime-label" x="' + (bx + 8).toFixed(2) +
                 '" y="' + (padTop + 14) + '">bedtime</text>');
    }

    host.innerHTML = parts.join('');
  }

  // ----------------------------------------------------------- sleep debt --

  function updateSleepDebt() {
    const inputs = document.querySelectorAll('[data-debt-night]');
    if (!inputs.length) return;

    const hours = [];
    for (let i = 0; i < inputs.length; i++) {
      const raw = inputs[i].value;
      if (raw === '') continue;
      const value = Number(raw);
      if (isFinite(value) && value >= 0) hours.push(value);
    }

    const result = computeSleepDebt(hours);
    const panel = $('debt-result');

    if (!result.ok) {
      if (panel) panel.hidden = true;
      return;
    }
    if (panel) panel.hidden = false;

    const tone = result.deficitH <= 0 ? 'optimal'
               : result.deficitH <= 3 ? 'minimum'
               : 'deficit';

    setTone(panel, tone);
    setText($('debt-deficit'),
      result.deficitH <= 0 ? 'None' : formatDuration(result.deficitH * 60));
    setText($('debt-average'), formatDuration(result.average * 60));
    setText($('debt-nights'), String(result.nights));
    setText($('debt-worst'),
      formatDuration(result.worstValue * 60) + ' (' +
      ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh']
        [result.worstIndex] + ' night)');

    setText($('debt-summary'),
      result.deficitH <= 0
        ? 'Your logged nights meet or exceed the 8-hour reference on average. ' +
          'No repayment schedule is needed — hold the pattern.'
        : 'Across ' + result.nights + ' nights you are ' +
          formatDuration(result.deficitH * 60) + ' below an 8-hour reference, ' +
          'an average shortfall of ' +
          formatDuration(result.averageDeficit * 60) + ' per night.');

    const list = $('debt-plan');
    if (list) {
      list.innerHTML = result.plan.map(function (step) {
        return '<li class="debt-step">' +
          '<span class="debt-step-night">Night ' + step.night + '</span>' +
          '<span class="debt-step-extend">+' +
            formatDuration(step.extension * 60) + '</span>' +
          '<span class="debt-step-total">' +
            step.bedtimeHours.toFixed(1) + ' h in bed</span>' +
          '<span class="debt-step-residual">' +
            (step.residual > 0.05
              ? formatDuration(step.residual * 60) + ' remaining'
              : 'repaid') +
          '</span></li>';
      }).join('');
    }

    setText($('debt-residual'),
      result.residual > 0.05
        ? 'After three recovery nights, ' + formatDuration(result.residual * 60) +
          ' of debt remains. That is expected — recovery sleep is saturable, ' +
          'and a single long night does not repay a week of restriction at a ' +
          '1:1 rate.'
        : 'Three recovery nights clear the logged deficit. Keep the extension ' +
          'modest: large single-night increases in time in bed reduce sleep ' +
          'efficiency and worsen morning sleep inertia.');
  }

  // ================================================================ init ==

  function initModeTabs() {
    const tabs = document.querySelectorAll('[data-sleep-mode]');
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function (event) {
        event.preventDefault();
        const mode = tabs[i].getAttribute('data-sleep-mode');
        applyMode(mode);
        if (mode === 'wake') updateWakeMode();
        else if (mode === 'now') updateNowMode();
        else updateBedtimeMode();
      });
    }
  }

  function initInputs() {
    const wake = $('wake-time');
    if (wake) wake.addEventListener('input', updateWakeMode);

    const bedtime = $('bedtime-input');
    if (bedtime) bedtime.addEventListener('input', updateBedtimeMode);

    const dose = $('caffeine-dose');
    if (dose) dose.addEventListener('input', updateCaffeine);

    const caffTime = $('caffeine-time');
    if (caffTime) caffTime.addEventListener('input', updateCaffeine);

    const caffBed = $('caffeine-bedtime');
    if (caffBed) caffBed.addEventListener('input', updateCaffeine);

    const chronoIds = [
      'mctq-workday-sleep', 'mctq-workday-wake',
      'mctq-freeday-sleep', 'mctq-freeday-wake',
      'mctq-fragmentation'
    ];
    for (let i = 0; i < chronoIds.length; i++) {
      const el = $(chronoIds[i]);
      if (el) {
        el.addEventListener('input', updateChronotype);
        el.addEventListener('change', updateChronotype);
      }
    }

    const debtInputs = document.querySelectorAll('[data-debt-night]');
    for (let i = 0; i < debtInputs.length; i++) {
      debtInputs[i].addEventListener('input', updateSleepDebt);
    }
  }

  function seedDefaults() {
    const wake = $('wake-time');
    if (wake && !wake.value) wake.value = '07:00';

    const bedtime = $('bedtime-input');
    if (bedtime && !bedtime.value) bedtime.value = '23:00';

    const caffTime = $('caffeine-time');
    if (caffTime && !caffTime.value) caffTime.value = '14:00';

    const caffBed = $('caffeine-bedtime');
    if (caffBed && !caffBed.value) caffBed.value = '23:00';

    const wSleep = $('mctq-workday-sleep');
    if (wSleep && !wSleep.value) wSleep.value = '23:30';
    const wWake = $('mctq-workday-wake');
    if (wWake && !wWake.value) wWake.value = '07:00';
    const fSleep = $('mctq-freeday-sleep');
    if (fSleep && !fSleep.value) fSleep.value = '01:00';
    const fWake = $('mctq-freeday-wake');
    if (fWake && !fWake.value) fWake.value = '09:00';

    const debtInputs = document.querySelectorAll('[data-debt-night]');
    for (let i = 0; i < debtInputs.length; i++) {
      if (!debtInputs[i].value) debtInputs[i].value = '7';
    }
  }

  function startClock() {
    state.nowMin = currentMinutes();
    state.lastHandMinute = state.nowMin;

    window.setInterval(function () {
      const now = currentMinutes();
      // Cheap change-detection: the wheel only needs a redraw when the minute
      // value actually advances.
      if (now === state.lastHandMinute) return;
      state.lastHandMinute = now;
      state.nowMin = now;

      // In "sleep now" mode the whole schedule is relative to the current
      // time, so a minute tick invalidates the cards too.
      if (state.mode === 'now') updateNowMode();
      else redrawWheel();
    }, 15000);
  }

  function init() {
    // The engine is loaded only on the sleep calculator, but guard anyway so a
    // stray include elsewhere is inert rather than throwing.
    if (!$('clock-wheel') && !$('wake-results')) return;

    seedDefaults();
    applyMode('wake');
    initModeTabs();
    initInputs();

    // Order matters: every updater writes the SHARED wheel state, so the mode
    // the page opens in must run last to win. updateNowMode() runs early purely
    // to populate its (hidden) result panel.
    updateNowMode();
    updateCaffeine();
    updateSleepDebt();
    updateChronotype();
    updateWakeMode();

    // The chronotype result is hidden until it has valid input; seedDefaults
    // supplies valid defaults, so reveal it now that it is populated.
    const panel = $('chrono-result');
    if (panel && state.chrono) panel.hidden = false;

    startClock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
