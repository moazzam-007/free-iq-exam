(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Clinical Eye & Vision Screener
   *
   * Modules: credit-card screen calibration, Tumbling E visual acuity
   * (adaptive 3-of-4 staircase), astigmatism clock dial, red-green
   * duochrome balance.
   *
   * OPTICAL BASIS
   * Standard acuity: the whole optotype subtends 5 arcminutes of visual
   * angle at the test distance; each stroke and gap subtends 1 arcminute.
   * Optotype height (mm) = distance(mm) * tan(5 arcmin * denominator/20).
   *
   * RESOLUTION FLOOR - the honest constraint
   * A 20/20 optotype at 1 m is 1.45 mm. On a 96 DPI display (3.78 px/mm)
   * that is ~5.5 px tall with ~1.1 px strokes, which cannot be rendered
   * faithfully. Rather than clamp the size and report a fictional acuity,
   * the engine computes which tiers the current screen can actually
   * resolve and stops the staircase there.
   *
   * This is a screening aid. It is not a refraction, not a diagnosis,
   * and not a substitute for a comprehensive eye examination.
   * ------------------------------------------------------------------ */

  const CARD_WIDTH_MM = 85.6; // ISO/IEC 7810 ID-1
  const CARD_RATIO = 53.98 / 85.6;

  // Below this height the 5-stroke grid degrades past usefulness.
  const MIN_OPTOTYPE_PX = 12;

  // Screening baseline: the staircase opens at 20/70 rather than 20/200, so a
  // normally-sighted user is not walked up through five trivial tiers. If the
  // baseline is missed, the staircase steps DOWN toward 20/200 (see
  // handleDirection) before it will end the eye.
  const BASELINE_TIER_INDEX = 2; // 20/70

  // How many trials a single tier may take before it resolves.
  const TRIALS_PER_TIER = 4;

  // Pacing. A new optotype fades in before it accepts an answer, so the
  // orientation change is always perceived and the stroke geometry is only
  // ever judged at its final size.
  const PACING = {
    optotypeEnterMs: 190,
    sameTierMs: 600,
    wrongMs: 760,
    tierChangeMs: 820,
    eyeChangeMs: 1600
  };

  const DISTANCES = [
    { id: 'near', mm: 400, label: '40 cm', hint: '16 in · phone held at reading distance' },
    { id: 'desk', mm: 1000, label: '1 m', hint: '3.3 ft · seated at a desktop' },
    { id: 'room', mm: 2000, label: '2 m', hint: '6.6 ft · step back from a laptop' },
    { id: 'hall', mm: 3000, label: '3 m', hint: '10 ft · across a room' },
    { id: 'snellen', mm: 6000, label: '6 m', hint: '20 ft · the standard Snellen distance' }
  ];

  const ACUITY_TIERS = [
    { label: '20/200', denominator: 200 },
    { label: '20/100', denominator: 100 },
    { label: '20/70', denominator: 70 },
    { label: '20/50', denominator: 50 },
    { label: '20/40', denominator: 40 },
    { label: '20/30', denominator: 30 },
    { label: '20/25', denominator: 25 },
    { label: '20/20', denominator: 20 },
    { label: '20/15', denominator: 15 }
  ];

  const DIRECTIONS = ['up', 'right', 'down', 'left'];

  // Rotation applied to an E whose arms point right at 0deg.
  const DIRECTION_ROTATION = { right: 0, down: 90, left: 180, up: 270 };

  const EYE_SEQUENCE = [
    { id: 'right', label: 'Правый глаз', instruction: 'Cover your LEFT eye with your palm. Do not press on the eyelid.' },
    { id: 'left', label: 'Левый глаз', instruction: 'Cover your RIGHT eye with your palm. Do not press on the eyelid.' },
    { id: 'both', label: 'Оба глаза', instruction: 'Lower your hand and keep both eyes open.' }
  ];

  const state = {
    ppm: null,
    cardWidthPx: 260,
    distanceMm: 1000,
    distanceId: 'desk',
    sessionId: '',
    acuity: null,
    astigmatism: null,
    duochrome: null
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `EYE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('eye-live-region');
    if (live) live.textContent = message;
  }

  /* ---------------------------------------------------------------- *
   * Optics
   * ---------------------------------------------------------------- */

  function optotypeSizePx(denominator) {
    if (!state.ppm) return null;
    const arcMinutes = 5 * (denominator / 20);
    const radians = (arcMinutes / 60) * (Math.PI / 180);
    const heightMm = state.distanceMm * Math.tan(radians);
    return heightMm * state.ppm;
  }

  // Sharpest tier this screen can faithfully render at the current
  // calibration and distance. Null when uncalibrated.
  function sharpestRenderableTier() {
    if (!state.ppm) return null;
    for (let i = ACUITY_TIERS.length - 1; i >= 0; i -= 1) {
      if (optotypeSizePx(ACUITY_TIERS[i].denominator) >= MIN_OPTOTYPE_PX) return i;
    }
    return null;
  }

  function distanceLabel() {
    return DISTANCES.find((d) => d.id === state.distanceId)?.label || `${state.distanceMm} mm`;
  }

  function tumblingESvg(sizePx, direction) {
    const rotation = DIRECTION_ROTATION[direction];
    // Standard 5x5 Snellen grid: stem plus three equal arms.
    // The optotype stage is an illuminated white card (#ffffff), so the optotype is always solid black (#000000).
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 5 5" shape-rendering="geometricPrecision" role="img" aria-label="Оптотип «Tumbling E»">
      <g transform="rotate(${rotation} 2.5 2.5)" fill="#000000">
        <rect x="0" y="0" width="1" height="5" />
        <rect x="0" y="0" width="5" height="1" />
        <rect x="0" y="2" width="5" height="1" />
        <rect x="0" y="4" width="5" height="1" />
      </g>
    </svg>`;
  }

  /* ---------------------------------------------------------------- *
   * Module 1 - Calibration
   * ---------------------------------------------------------------- */

  function renderCard() {
    const width = state.cardWidthPx;
    const height = width * CARD_RATIO;
    const card = $('card-preview');
    if (card) {
      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
    }
    const readout = $('card-width-label');
    if (readout) readout.textContent = `${width} px`;

    const ppm = width / CARD_WIDTH_MM;
    const ppmReadout = $('ppm-readout');
    if (ppmReadout) ppmReadout.textContent = `${ppm.toFixed(2)} px/mm`;

    renderResolutionWarning(ppm);
  }

  function renderResolutionWarning(ppm) {
    const warning = $('resolution-warning');
    if (!warning) return;

    const previousPpm = state.ppm;
    state.ppm = ppm;
    const sharpest = sharpestRenderableTier();
    state.ppm = previousPpm;

    if (sharpest === null) {
      warning.textContent = 'Плотность пикселей экрана слишком низка, чтобы отобразить даже оптотип 20/200 на этом расстоянии. Подойдите ближе или выберите меньшее расстояние.';
      warning.classList.remove('hidden');
      warning.classList.add('is-blocking');
      return;
    }

    const bestLabel = ACUITY_TIERS[sharpest].label;
    const blocked = ACUITY_TIERS.slice(sharpest + 1).map((t) => t.label);

    if (blocked.length === 0) {
      warning.textContent = `This display can render every acuity tier at ${distanceLabel()}, including 20/15.`;
      warning.classList.remove('hidden', 'is-blocking');
      return;
    }

    warning.classList.remove('hidden', 'is-blocking');
    warning.textContent =
      `At ${distanceLabel()} this display can faithfully render down to ${bestLabel}. ` +
      `Tiers sharper than that - ${blocked.join(', ')} - need optotypes smaller than ${MIN_OPTOTYPE_PX} px, ` +
      `which this screen cannot draw accurately. The test will stop at ${bestLabel} and say so rather than report a sharper score. ` +
      `To measure sharper acuity, step further back and choose a longer distance.`;
  }

  function confirmCalibration() {
    state.ppm = state.cardWidthPx / CARD_WIDTH_MM;
    try {
      localStorage.setItem('freeiqexam:eye-ppm', String(state.ppm));
      localStorage.setItem('freeiqexam:eye-distance', state.distanceId);
    } catch (error) {
      /* storage unavailable - calibration simply will not persist */
    }
    startAcuity();
  }

  function loadStoredCalibration() {
    try {
      const storedPpm = Number(localStorage.getItem('freeiqexam:eye-ppm'));
      const storedDistance = localStorage.getItem('freeiqexam:eye-distance');
      if (Number.isFinite(storedPpm) && storedPpm > 0) {
        state.cardWidthPx = Math.round(storedPpm * CARD_WIDTH_MM);
        const slider = $('card-slider');
        if (slider) {
          slider.value = String(state.cardWidthPx);
          slider.min = '100';
          slider.max = '600';
        }
      }
      if (storedDistance && DISTANCES.some((d) => d.id === storedDistance)) {
        state.distanceId = storedDistance;
        state.distanceMm = DISTANCES.find((d) => d.id === storedDistance).mm;
      }
    } catch (error) {
      /* ignore */
    }
  }

  /* ---------------------------------------------------------------- *
   * Module 2 - Visual acuity (Tumbling E staircase)
   * ---------------------------------------------------------------- */

  function startAcuity() {
    // Open at the screening baseline, but never at a tier this display cannot
    // faithfully draw. Stepping down is always safe: larger optotypes are
    // strictly easier to render than the starting tier.
    const sharpest = sharpestRenderableTier();
    const startIndex = sharpest === null
      ? BASELINE_TIER_INDEX
      : Math.min(BASELINE_TIER_INDEX, sharpest);

    state.acuity = {
      eyeIndex: 0,
      perEye: {},
      awaitingResponse: false,
      current: null,
      startIndex
    };
    EYE_SEQUENCE.forEach((eye) => {
      state.acuity.perEye[eye.id] = {
        tierIndex: startIndex,
        trialsInTier: 0,
        correctInTier: 0,
        tierTrials: [],
        bestPassed: null,
        failed: false,
        beyondResolution: false,
        history: []
      };
    });

    showSection('acuity-section');
    renderEyeHeader();
    presentOptotype();
  }

  function renderEyeHeader() {
    const eye = EYE_SEQUENCE[state.acuity.eyeIndex];
    const label = $('acuity-eye-label');
    if (label) label.textContent = eye.label;
    const instruction = $('acuity-instruction');
    if (instruction) instruction.textContent = eye.instruction;
    const progress = $('acuity-eye-progress');
    if (progress) progress.textContent = `Eye ${state.acuity.eyeIndex + 1} of ${EYE_SEQUENCE.length}`;
  }

  function currentEyeState() {
    return state.acuity.perEye[EYE_SEQUENCE[state.acuity.eyeIndex].id];
  }

  function presentOptotype() {
    const eyeState = currentEyeState();
    const tier = ACUITY_TIERS[eyeState.tierIndex];

    if (!tier) {
      finishEye();
      return;
    }

    const sizePx = optotypeSizePx(tier.denominator);

    if (sizePx === null || sizePx < MIN_OPTOTYPE_PX) {
      eyeState.beyondResolution = true;
      finishEye();
      return;
    }

    const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    const presented = { direction, tierIndex: eyeState.tierIndex, sizePx };
    state.acuity.current = presented;

    // The optotype scales up as it fades in. Answering mid-animation would mean
    // judging a stroke geometry ~5% smaller than the tier claims, so the
    // response gate opens only once the enter animation has settled.
    state.acuity.awaitingResponse = false;

    const mount = $('optotype-mount');
    if (mount) {
      mount.style.minHeight = `${Math.max(sizePx + 48, 140)}px`;
      mount.innerHTML = `<div class="optotype-stage optotype-enter">${tumblingESvg(sizePx, direction)}</div>`;
    }

    const tierLabel = $('acuity-tier-label');
    if (tierLabel) tierLabel.textContent = tier.label;

    const trialLabel = $('acuity-trial-label');
    if (trialLabel) {
      trialLabel.textContent = `Trial ${eyeState.tierTrials.length + 1} of ${TRIALS_PER_TIER} at ${tier.label}`;
    }

    renderTierDots(eyeState);

    const fill = $('acuity-progress-fill');
    if (fill) fill.style.width = `${(eyeState.tierIndex / ACUITY_TIERS.length) * 100}%`;

    setFeedback('');

    // Sizing is display-only; the optotype must not be read from the DOM.
    announce(`Level ${tier.label}. Which direction does the E point?`);

    window.setTimeout(() => {
      // Ignore if the test was reset or this optotype was already replaced.
      if (!state.acuity || state.acuity.current !== presented) return;
      state.acuity.awaitingResponse = true;
    }, PACING.optotypeEnterMs);
  }

  // Per-tier trial dots: one per allowed trial, filled as the tier resolves.
  function renderTierDots(eyeState) {
    const mount = $('acuity-tier-dots');
    if (!mount) return;
    let html = '';
    for (let i = 0; i < TRIALS_PER_TIER; i += 1) {
      const trial = eyeState.tierTrials[i];
      const state = trial ? (trial.correct ? 'hit' : 'miss') : 'pending';
      html += `<span class="trial-dot ${state}"></span>`;
    }
    mount.innerHTML = html;
  }

  function setFeedback(message, tone) {
    const feedback = $('acuity-feedback');
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = tone ? `acuity-feedback ${tone}` : 'acuity-feedback';
  }

  // Brief press feedback on the matching on-screen key, so a keyboard answer
  // is visibly acknowledged in the same place a click would be.
  function pulseDirectionButton(direction) {
    const button = document.querySelector(`[data-direction="${direction}"]`);
    if (!button) return;
    button.classList.remove('is-pressed');
    void button.offsetWidth; // restart the animation on repeated presses
    button.classList.add('is-pressed');
    window.setTimeout(() => button.classList.remove('is-pressed'), 220);
  }

  function beginTier(eyeState, tierIndex) {
    eyeState.tierIndex = tierIndex;
    eyeState.trialsInTier = 0;
    eyeState.correctInTier = 0;
    eyeState.tierTrials = [];
  }

  function handleDirection(direction) {
    if (!state.acuity || !state.acuity.awaitingResponse || !state.acuity.current) return;

    const eyeState = currentEyeState();
    const correct = direction === state.acuity.current.direction;

    pulseDirectionButton(direction);

    state.acuity.awaitingResponse = false;
    eyeState.trialsInTier += 1;
    if (correct) eyeState.correctInTier += 1;
    eyeState.tierTrials.push({ correct });
    eyeState.history.push({
      tier: ACUITY_TIERS[eyeState.tierIndex].label,
      correct,
      shown: state.acuity.current.direction,
      answered: direction
    });

    renderTierDots(eyeState);

    const wrongInTier = eyeState.trialsInTier - eyeState.correctInTier;
    const currentTier = ACUITY_TIERS[eyeState.tierIndex];

    // 3-of-4 staircase: three correct clears the tier and moves one step
    // sharper; two wrong resolves it as a failure.
    if (eyeState.correctInTier >= 3) {
      eyeState.bestPassed = eyeState.tierIndex;
      setFeedback(`Correct - ${currentTier.label} cleared.`, 'good');
      beginTier(eyeState, eyeState.tierIndex + 1);
      window.setTimeout(presentOptotype, PACING.tierChangeMs);
      return;
    }

    if (wrongInTier >= 2) {
      // Descending ladder. While no tier has been cleared yet we do not know
      // how far down the chart this eye can see, so step DOWN one tier and
      // keep looking rather than ending the eye at the baseline. Once a tier
      // has been cleared the level is known and a failure simply ends it -
      // which is also what makes the search terminate.
      const canStepDown = eyeState.bestPassed === null && eyeState.tierIndex > 0;
      if (canStepDown) {
        const nextTier = ACUITY_TIERS[eyeState.tierIndex - 1];
        setFeedback(`${currentTier.label} was not cleared - stepping down to ${nextTier.label}.`, 'bad');
        beginTier(eyeState, eyeState.tierIndex - 1);
        window.setTimeout(presentOptotype, PACING.tierChangeMs);
        return;
      }

      eyeState.failed = true;
      setFeedback(`That level was not cleared. ${currentTier.label} is the limit for this eye.`, 'bad');
      window.setTimeout(finishEye, PACING.tierChangeMs);
      return;
    }

    setFeedback(
      correct ? `Correct - ${eyeState.correctInTier} of 3 needed at ${currentTier.label}.` : 'Not quite - trying that level again.',
      correct ? 'good' : 'bad'
    );
    window.setTimeout(presentOptotype, correct ? PACING.sameTierMs : PACING.wrongMs);
  }

  function finishEye() {
    const eye = EYE_SEQUENCE[state.acuity.eyeIndex];
    const eyeState = currentEyeState();
    state.acuity.awaitingResponse = false;

    if (state.acuity.eyeIndex < EYE_SEQUENCE.length - 1) {
      state.acuity.eyeIndex += 1;
      renderEyeHeader();
      const mount = $('optotype-mount');
      if (mount) {
        mount.innerHTML = `<p class="optotype-placeholder stage-enter">${EYE_SEQUENCE[state.acuity.eyeIndex].instruction}</p>`;
      }
      const dots = $('acuity-tier-dots');
      if (dots) dots.innerHTML = '';
      setFeedback(`Switching to the ${eye.label.toLowerCase()}.`, '');
      window.setTimeout(presentOptotype, PACING.eyeChangeMs);
      return;
    }

    // All eyes done.
    if (eyeState) eyeState.finished = true;
    startAstigmatism();
  }

  // Every result carries explicit flags rather than relying on the caller to
  // pattern-match the label. "Failed the largest optotype" and "the display
  // could not draw the optotype" are completely different findings and must
  // never be collapsed into one branch.
  function acuityResultFor(eyeId) {
    const eyeState = state.acuity?.perEye?.[eyeId];
    if (!eyeState) {
      return { label: 'Не тестировалось', measured: false, beyondResolution: false, belowChart: false, untested: true };
    }

    if (eyeState.bestPassed !== null) {
      return {
        label: ACUITY_TIERS[eyeState.bestPassed].label,
        measured: true,
        beyondResolution: false,
        belowChart: false,
        untested: false
      };
    }

    if (eyeState.beyondResolution) {
      return { label: 'Невозможно измерить на этом расстоянии', measured: false, beyondResolution: true, belowChart: false, untested: false };
    }

    // The staircase was completed - this eye simply did not clear 20/200.
    // That is a real, reportable acuity finding, not a missing measurement.
    return { label: 'Ниже уровня 20/200', measured: false, beyondResolution: false, belowChart: true, untested: false };
  }

  /* ---------------------------------------------------------------- *
   * Module 3 - Astigmatism clock dial
   * ---------------------------------------------------------------- */

  function startAstigmatism() {
    state.astigmatism = { selected: new Set(), noneReported: false };
    showSection('astigmatism-section');
    renderDial();
    updateDialSelection();
  }

  function renderDial() {
    const mount = $('dial-mount');
    if (!mount) return;

    // Each hour is drawn as its OWN radial spoke, not as a full diameter.
    // Two opposite hours trace the same diameter, so full-length transparent
    // hit lines overlap exactly and whichever pair is appended last silently
    // captures every click in the shared region - clicking 1 o'clock selected
    // 7. Radial spokes share only the hub, which is left empty, so no two hit
    // targets intersect.
    const cx = 200;
    const cy = 200;
    const innerR = 52; // hub hole; also what keeps neighbouring hit zones apart
    const outerR = 155;
    const labelR = 174;
    // Two 30deg-apart spokes are innerR * sin(30deg) = 26px apart at the inner
    // end, so a 20px hit width can never bleed into its neighbour.
    const HIT_WIDTH = 20;

    let svg = `<svg viewBox="0 0 400 400" class="dial-svg" role="group" aria-label="Циферблат для теста на астигматизм с двенадцатью радиальными линиями">`;
    svg += `<circle cx="${cx}" cy="${cy}" r="192" fill="#ffffff" stroke="#d4d4d8" stroke-width="1" />`;

    for (let hour = 1; hour <= 12; hour += 1) {
      const angle = (hour % 12) * 30 * (Math.PI / 180); // 0 = 12 o'clock
      const dx = Math.sin(angle);
      const dy = -Math.cos(angle);

      const x1 = cx + dx * innerR;
      const y1 = cy + dy * innerR;
      const x2 = cx + dx * outerR;
      const y2 = cy + dy * outerR;

      const lx = cx + dx * labelR;
      const ly = cy + dy * labelR;

      svg += `<g class="dial-ray" data-hour="${hour}" tabindex="0" role="button" aria-pressed="false" aria-label="Позиция на циферблате ${hour}">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="transparent" stroke-width="${HIT_WIDTH}" />
        <circle cx="${lx}" cy="${ly}" r="15" fill="transparent" />
        <line class="dial-ray-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000000" stroke-width="3" stroke-linecap="butt" />
        <text x="${lx}" y="${ly + 6}" text-anchor="middle" class="dial-label">${hour}</text>
      </g>`;
    }

    // Hub sits on top for looks only; it must never intercept a pointer.
    svg += `<circle class="dial-hub" cx="${cx}" cy="${cy}" r="9" fill="#d4d4d8" />`;
    svg += `</svg>`;
    mount.innerHTML = svg;

    mount.querySelectorAll('.dial-ray').forEach((ray) => {
      const hour = Number(ray.dataset.hour);
      const toggle = () => toggleRay(hour);
      ray.addEventListener('click', toggle);
      ray.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  function toggleRay(hour) {
    if (state.astigmatism.noneReported) return;
    const selected = state.astigmatism.selected;
    if (selected.has(hour)) selected.delete(hour);
    else selected.add(hour);

    document.querySelectorAll('.dial-ray').forEach((ray) => {
      const isSelected = selected.has(Number(ray.dataset.hour));
      ray.classList.toggle('selected', isSelected);
      ray.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    updateDialSelection();
  }

  // Optometric axis: degrees from horizontal, 0-180. Clock vertical = 90.
  function hourToAxis(hour) {
    return (((90 - 30 * (hour % 12)) % 180) + 180) % 180;
  }

  // Mean of angles defined modulo 180 - double-angle vector average.
  function meanAxis(hours) {
    if (!hours.length) return null;
    let sx = 0;
    let sy = 0;
    hours.forEach((hour) => {
      const radians = hourToAxis(hour) * 2 * (Math.PI / 180);
      sx += Math.cos(radians);
      sy += Math.sin(radians);
    });
    if (sx === 0 && sy === 0) return null;
    const mean = (Math.atan2(sy, sx) / 2) * (180 / Math.PI);
    return ((mean % 180) + 180) % 180;
  }

  function updateDialSelection() {
    const selected = [...state.astigmatism.selected].sort((a, b) => a - b);
    const label = $('dial-selection-label');

    // "All lines look equal" is a toggle, not a one-way door: a misclick
    // must not permanently disable the dial for the rest of the session.
    const noneButton = $('dial-none');
    if (noneButton) {
      const none = state.astigmatism.noneReported;
      noneButton.setAttribute('aria-pressed', none ? 'true' : 'false');
      noneButton.classList.toggle('selected', none);
      noneButton.textContent = none ? 'Actually, some lines do stand out' : 'All lines look equal';
    }

    if (!label) return;

    if (state.astigmatism.noneReported) {
      label.textContent = 'Вы сообщили, что все линии выглядят одинаково чёткими.';
      return;
    }
    if (!selected.length) {
      label.textContent = 'Линии пока не выбраны.';
      return;
    }
    const axis = meanAxis(selected);
    label.textContent = selected.length === 1
      ? `Selected line ${selected[0]} - meridian near ${Math.round(axis)}°.`
      : `Selected lines ${selected.join(', ')} - meridian near ${Math.round(axis)}°.`;
  }

  function submitAstigmatism() {
    const selected = [...state.astigmatism.selected];
    state.astigmatism.hours = selected;
    state.astigmatism.axis = selected.length ? meanAxis(selected) : null;
    startDuochrome();
  }

  function reportNoAstigmatism() {
    state.astigmatism.noneReported = !state.astigmatism.noneReported;
    if (state.astigmatism.noneReported) state.astigmatism.selected.clear();
    document.querySelectorAll('.dial-ray').forEach((ray) => {
      ray.classList.remove('selected');
      ray.setAttribute('aria-pressed', 'false');
    });
    updateDialSelection();
  }

  /* ---------------------------------------------------------------- *
   * Module 4 - Red-green duochrome
   * ---------------------------------------------------------------- */

  function startDuochrome() {
    state.duochrome = { choice: null };
    showSection('duochrome-section');

    const sizePx = duochromeTargetPx();
    const target = `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 100 100" role="img" aria-label="Кольцо дихроматического теста">
      <circle cx="50" cy="50" r="34" fill="none" stroke="#000000" stroke-width="9" />
    </svg>`;

    const red = $('duochrome-red');
    const green = $('duochrome-green');
    if (red) red.innerHTML = target;
    if (green) green.innerHTML = target;
  }

  function duochromeTargetPx() {
    // Duochrome does not need threshold size; a comfortably resolvable
    // target is easier to judge and the chromatic balance is scale-free.
    if (!state.ppm) return 96;
    const atThreshold = optotypeSizePx(100);
    return Math.round(Math.max(64, Math.min(140, atThreshold || 96)));
  }

  function submitDuochrome(choice) {
    state.duochrome.choice = choice;
    document.querySelectorAll('[data-duo]').forEach((button) => {
      button.classList.toggle('selected', button.dataset.duo === choice);
    });
    window.setTimeout(displayResults, 400);
  }

  function duochromeInterpretation() {
    const choice = state.duochrome?.choice;
    if (choice === 'red') {
      return {
        headline: 'Red appeared sharper',
        short: 'Myopic shift (undercorrected)',
        detail:
          'Longer wavelengths focus behind the retina, so the red panel coming into sharper focus indicates the eye is relatively myopic - or, if you were wearing correction, that it is undercorrected. Green would tend to look sharper if the eye were overcorrected.'
      };
    }
    if (choice === 'green') {
      return {
        headline: 'Green appeared sharper',
        short: 'Hyperopic shift (overcorrected)',
        detail:
          'Shorter wavelengths focus in front of the retina, so the green panel appearing sharper indicates the eye is relatively hyperopic - or that existing correction is overcorrected toward the plus side.'
      };
    }
    if (choice === 'equal') {
      return {
        headline: 'Both panels looked equally sharp',
        short: 'Emmetropic balance',
        detail:
          'Equal sharpness between the red and green panels is the balanced endpoint the duochrome is designed to find, suggesting the spherical focus sits close to the retina at this distance.'
      };
    }
    return {
      headline: 'Not recorded',
      short: 'No response',
      detail: 'This module was not completed.'
    };
  }

  /* ---------------------------------------------------------------- *
   * Progress stages
   * ---------------------------------------------------------------- */

  const STAGES = ['intro-section', 'calibration-section', 'acuity-section', 'astigmatism-section', 'duochrome-section', 'results-section'];

  function showSection(id) {
    STAGES.forEach((sectionId) => {
      const el = $(sectionId);
      if (!el) return;
      const isTarget = sectionId === id;
      el.classList.toggle('hidden', !isTarget);
      el.classList.remove('stage-enter');
      if (isTarget) {
        // Force a reflow so the entrance animation replays when a stage is
        // re-entered (retake, or moving back to a stage already seen).
        void el.offsetWidth;
        el.classList.add('stage-enter');
      }
    });
    updateStageStrip(id);
    const target = $(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Staggered entrance for the result cards. Re-triggered on every reveal so
  // a retake animates again rather than snapping in fully formed.
  function revealResults() {
    const items = document.querySelectorAll('#results-section .reveal');
    if (!items.length) return;
    items.forEach((el, index) => {
      el.classList.remove('is-revealed');
      el.style.animationDelay = `${index * 70}ms`;
    });
    void document.body.offsetWidth; // flush the removal in one pass
    items.forEach((el) => el.classList.add('is-revealed'));
  }

  function updateStageStrip(activeId) {
    const activeIndex = STAGES.indexOf(activeId);
    document.querySelectorAll('[data-stage]').forEach((node) => {
      const index = STAGES.indexOf(node.dataset.stage);
      node.classList.toggle('active', index === activeIndex);
      node.classList.toggle('done', index < activeIndex && index >= 0);
    });
  }

  /* ---------------------------------------------------------------- *
   * Results
   * ---------------------------------------------------------------- */

  function displayResults() {
    showSection('results-section');

    const right = acuityResultFor('right');
    const left = acuityResultFor('left');
    const both = acuityResultFor('both');
    const astig = state.astigmatism || {};
    const duo = duochromeInterpretation();

    const bothTierIndex = ACUITY_TIERS.findIndex((t) => t.label === both?.label);
    const acuityMeasured = right.measured || left.measured || both.measured;

    let headline = acuityMeasured ? 'Acuity result recorded' : 'Acuity not measured';
    let tone = 'neutral';
    if (bothTierIndex >= 0) {
      if (bothTierIndex >= ACUITY_TIERS.findIndex((t) => t.label === '20/40')) {
        headline = 'Acuity within the range usually acceptable for driving';
        tone = 'good';
      } else if (bothTierIndex >= ACUITY_TIERS.findIndex((t) => t.label === '20/70')) {
        headline = 'Reduced acuity - an eye examination is advisable';
        tone = 'moderate';
      } else {
        headline = 'Markedly reduced acuity - please arrange an eye examination';
        tone = 'bad';
      }
    } else if (both.belowChart) {
      // Failing even the largest optotype is the most severe outcome this
      // chart can express, and it is a completed result - not a gap.
      headline = 'Acuity below the 20/200 range - please arrange an eye examination';
      tone = 'bad';
    } else if (both.beyondResolution) {
      headline = 'Acuity could not be measured at this display resolution';
      tone = 'moderate';
    }

    const badge = $('result-badge');
    if (badge) {
      badge.textContent = headline;
      badge.className = `result-badge ${tone}`;
    }

    const setText = (id, value) => {
      const el = $(id);
      if (el) el.textContent = value;
    };

    setText('acuity-right', right.label);
    setText('acuity-left', left.label);
    setText('acuity-both', both.label);

    // Each note names the actual reason. "Could not be measured" is reserved
    // for a genuine resolution block; a failed 20/200 is a finished result.
    const noteFor = (result) => {
      if (result.untested) return 'Не тестировалось';
      if (result.beyondResolution) return 'Limited by display resolution';
      if (result.belowChart) return 'Completed - below 20/200';
      return 'Best level cleared';
    };
    const rightNote = $('acuity-right-note');
    if (rightNote) rightNote.textContent = noteFor(right);
    const leftNote = $('acuity-left-note');
    if (leftNote) leftNote.textContent = noteFor(left);
    const bothNote = $('acuity-both-note');
    if (bothNote) bothNote.textContent = noteFor(both);

    const sharpestIndex = sharpestRenderableTier();
    const summaryNote = $('acuity-summary-note');
    if (summaryNote) {
      // Only compare when both eyes produced a real chart level. A completed
      // "below 20/200" failure is a finding in its own right, not the same
      // finding as an eye the display could not measure.
      const differential = right.measured && left.measured && right.label !== left.label
        ? ` The two eyes differ by at least one level, which is worth mentioning at an examination.`
        : '';

      let caveat = '';
      if (right.beyondResolution || left.beyondResolution) {
        caveat = ' At least one eye could not be measured because this display cannot render the required optotype size at the chosen distance.';
      } else if (right.belowChart || left.belowChart) {
        caveat = ' At least one eye did not clear the largest optotype on the chart (20/200). That is a completed result indicating acuity below the range this test can resolve, and it warrants a prompt professional examination.';
      } else if (right.untested || left.untested) {
        caveat = ' The acuity module was not completed, so no optotype-based measurement was made.';
      }

      const ceiling = sharpestIndex !== null
        ? ` At ${distanceLabel()} this screen can faithfully render down to ${ACUITY_TIERS[sharpestIndex].label}, so sharper levels were not testable.`
        : '';
      summaryNote.textContent = differential + caveat + ceiling;
    }

    const astigSelected = astig.hours?.length ? astig.hours : null;
    const astigSubmitted = Array.isArray(astig.hours);

    setText('astig-result', astig.noneReported
      ? 'No asymmetry reported'
      : astigSelected
        ? `Lines ${astigSelected.join(', ')} · meridian ≈ ${Math.round(astig.axis)}°`
        : astigSubmitted
          ? 'No lines selected'
          : 'Not recorded');

    setText('astig-note', astig.noneReported
      ? 'You reported all radiating lines as equally sharp, which does not suggest uncorrected astigmatism on this dial.'
      : astigSelected
        ? 'A subset of lines appearing darker or blurred suggests unequal focus across meridians. The perpendicular meridian is the one usually corrected.'
        : astigSubmitted
          ? 'You advanced without marking any line as darker or sharper, so this module produced no reading either way. It is worth repeating if you are unsure.'
          : 'This module was skipped.');

    setText('duo-result', duo.short);
    setText('duo-note', duo.detail);

    setText('calibration-summary', state.ppm
      ? `${state.ppm.toFixed(2)} px/mm at ${distanceLabel()}`
      : `Not calibrated · distance ${distanceLabel()}`);

    renderPrintReport();
    revealResults();
  }

  function renderPrintReport() {
    const dateEl = $('report-date');
    if (!dateEl) return;

    const right = acuityResultFor('right');
    const left = acuityResultFor('left');
    const both = acuityResultFor('both');
    const astig = state.astigmatism || {};
    const astigSubmitted = Array.isArray(astig.hours);
    const duo = duochromeInterpretation();
    const sharpestIndex = sharpestRenderableTier();

    dateEl.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-calibration').textContent = state.ppm
      ? `${state.ppm.toFixed(2)} px/mm · test distance ${distanceLabel()}`
      : `Not calibrated · test distance ${distanceLabel()}`;
    $('print-right').textContent = right.label;
    $('print-left').textContent = left.label;
    $('print-both').textContent = both.label;
    $('print-astig').textContent = astig.noneReported
      ? 'No meridional asymmetry reported'
      : astig.hours?.length
        ? `Lines ${astig.hours.join(', ')} reported darker/blurred · estimated meridian ${Math.round(astig.axis)}°`
        : astigSubmitted
          ? 'No lines marked'
          : 'Not recorded';
    $('print-duo').textContent = `${duo.short} - ${duo.headline}`;
    $('print-notes').textContent = sharpestIndex !== null
      ? `Display resolution at this calibration and distance supports acuity tiers down to ${ACUITY_TIERS[sharpestIndex].label}. Sharper tiers were not testable and are not reported.`
      : state.ppm
        ? 'Display resolution was insufficient to render optotypes at a reliable size. No acuity figure is reported.'
        : 'The acuity module was not completed, so no optotype-based measurement was made.';
  }

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const right = acuityResultFor('right');
    const left = acuityResultFor('left');
    const both = acuityResultFor('both');
    const duo = duochromeInterpretation();
    const text = `I completed the FreeIQExam vision screener. Правый глаз ${right.label}, left eye ${left.label}, both eyes ${both.label}. Duochrome balance: ${duo.short}. This is screening information, not a diagnosis.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Скрининг зрения FreeIQExam', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Screening summary copied.');
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast('Screening summary copied.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Sharing was unavailable.');
    }
  }

  function showToast(message) {
    const toast = $('share-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-3');
    window.setTimeout(() => toast.classList.add('opacity-0', 'translate-y-3'), 2200);
  }

  function resetTest() {
    state.acuity = null;
    state.astigmatism = null;
    state.duochrome = null;
    state.sessionId = sessionId();
    const feedback = $('acuity-feedback');
    if (feedback) feedback.textContent = '';
    const dots = $('acuity-tier-dots');
    if (dots) dots.innerHTML = '';
    document.querySelectorAll('[data-duo]').forEach((button) => button.classList.remove('selected'));
    showSection('intro-section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------------------------------------------------------------- *
   * Init
   * ---------------------------------------------------------------- */

  function init() {
    if (!$('eye-app')) return;
    state.sessionId = sessionId();
    loadStoredCalibration();
    renderCard();

    $('begin-eye-test')?.addEventListener('click', () => {
      showSection('calibration-section');
    });

    const slider = $('card-slider');
    slider?.addEventListener('input', (event) => {
      state.cardWidthPx = Number(event.target.value);
      renderCard();
    });

    document.querySelectorAll('[data-distance]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.distance;
        const entry = DISTANCES.find((d) => d.id === id);
        if (!entry) return;
        state.distanceId = entry.id;
        state.distanceMm = entry.mm;
        document.querySelectorAll('[data-distance]').forEach((node) => {
          node.classList.toggle('selected', node.dataset.distance === id);
        });
        renderCard();
      });
    });

    // Reflect any stored distance on the buttons.
    document.querySelectorAll('[data-distance]').forEach((node) => {
      node.classList.toggle('selected', node.dataset.distance === state.distanceId);
    });

    $('confirm-calibration')?.addEventListener('click', confirmCalibration);
    $('skip-calibration')?.addEventListener('click', () => {
      state.ppm = null;
      startAstigmatism();
    });

    document.querySelectorAll('[data-direction]').forEach((button) => {
      button.addEventListener('click', () => handleDirection(button.dataset.direction));
    });

    $('dial-none')?.addEventListener('click', reportNoAstigmatism);
    $('submit-astigmatism')?.addEventListener('click', submitAstigmatism);

    document.querySelectorAll('[data-duo]').forEach((button) => {
      button.addEventListener('click', () => submitDuochrome(button.dataset.duo));
    });

    $('print-result')?.addEventListener('click', () => window.print());
    $('share-result')?.addEventListener('click', shareResult);
    $('retake-result')?.addEventListener('click', resetTest);

    document.addEventListener('keydown', (event) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if (typing) return;
      if (!$('acuity-section') || $('acuity-section').classList.contains('hidden')) return;

      const map = { ArrowUp: 'up', ArrowRight: 'right', ArrowDown: 'down', ArrowLeft: 'left' };
      const direction = map[event.key];
      if (direction) {
        event.preventDefault();
        handleDirection(direction);
      }
    });

    STAGES.forEach((id) => $(id)?.classList.add('hidden'));
    showSection('intro-section');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
