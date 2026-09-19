(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * AQ-10 - Autism Spectrum Quotient, 10-item adult screening version
   * Allison, Auyeung & Baron-Cohen. Binary collapsed scoring (0–10) with
   * reversed items, mapped onto four trait subscales for profiling.
   *
   * Scoring rule (NICE-aligned): each item contributes 1 point when the
   * response falls in the autistic-trait direction -
   *   direction 'agree'    → Definitely/Agak Setuju scores 1
   *   direction 'disagree' → Slightly/Sangat Tidak Setuju scores 1
   * Referral threshold: total >= 6 of 10.
   *
   * Subscales:
   *   social        Q5, Q6, Q7, Q9, Q10 (max 5) - communication & relating
   *   sensory       Q1, Q2 (max 2)               - sensory & detail focus
   *   attention     Q3, Q4 (max 2)               - attention switching
   *   systematizing Q8 (max 1)                   - systematizing interests
   *
   * This engine produces screening information only. It is not a
   * diagnostic instrument and cannot establish or exclude autism.
   * ------------------------------------------------------------------ */

  const OPTIONS = [
    { value: 0, label: 'Sangat Setuju' },
    { value: 1, label: 'Agak Setuju' },
    { value: 2, label: 'Agak Tidak Setuju' },
    { value: 3, label: 'Sangat Tidak Setuju' }
  ];

  const QUESTIONS = [
    { id: 1, subscale: 'sensory', direction: 'agree', context: 'Sensorik · Perhatian terhadap Detail', text: 'Saya sering memperhatikan suara kecil yang tidak diperhatikan orang lain.' },
    { id: 2, subscale: 'sensory', direction: 'disagree', context: 'Pemrosesan Global vs Lokal', text: 'Saya biasanya lebih memusatkan perhatian pada gambaran keseluruhan, bukan pada detail kecil.' },
    { id: 3, subscale: 'attention', direction: 'disagree', context: 'Peralihan Perhatian', text: 'Saya merasa mudah melakukan lebih dari satu hal sekaligus.' },
    { id: 4, subscale: 'attention', direction: 'disagree', context: 'Peralihan Perhatian', text: 'Jika ada gangguan, saya dapat kembali ke apa yang saya kerjakan dengan sangat cepat.' },
    { id: 5, subscale: 'social', direction: 'disagree', context: 'Komunikasi Sosial', text: "I find it easy to 'read between the lines' when someone is talking to me." },
    { id: 6, subscale: 'social', direction: 'disagree', context: 'Relasi Sosial', text: 'Saya tahu cara mengetahui apakah orang yang mendengarkan saya mulai bosan.' },
    { id: 7, subscale: 'social', direction: 'agree', context: 'Teori Pikiran · Konteks Sosial', text: "When I'm reading a story I find it difficult to work out the characters' intentions." },
    { id: 8, subscale: 'systematizing', direction: 'agree', context: 'Sistematisasi · Minat yang Terbatas', text: 'Saya suka mengumpulkan informasi tentang kategori-kategori hal.' },
    { id: 9, subscale: 'social', direction: 'disagree', context: 'Afek Wajah · Empati', text: 'Saya merasa mudah mengetahui apa yang dipikirkan atau dirasakan seseorang hanya dari ekspresi wajahnya.' },
    { id: 10, subscale: 'social', direction: 'agree', context: 'Relasi Sosial', text: 'Saya merasa sulit berteman baru.' }
  ];

  const SUBSCALES = {
    social: { label: 'Komunikasi Sosial', short: 'Social', max: 5, color: '#10b981', blurb: 'Theory of mind, cue interpretation, reciprocity' },
    sensory: { label: 'Fokus Sensorik & Detail', short: 'Sensory', max: 2, color: '#06b6d4', blurb: 'Sensory awareness, local vs global processing' },
    attention: { label: 'Peralihan Perhatian', short: 'Switching', max: 2, color: '#8b5cf6', blurb: 'Task-switch friction, routine preservation' },
    systematizing: { label: 'Minat Sistematisasi', short: 'System.', max: 1, color: '#f59e0b', blurb: 'Pattern focus, categorization, deep interests' }
  };

  const SUBSCALE_ORDER = ['social', 'sensory', 'attention', 'systematizing'];
  const REFERRAL_CUTOFF = 6;

  const state = {
    currentIndex: 0,
    answers: {},
    transitionTimer: null,
    transitionLocked: false,
    sessionId: '',
    startedAt: null,
    radarFrame: null
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `AQ10-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('autism-live-region');
    if (live) live.textContent = message;
  }

  function answeredCount() {
    return Object.keys(state.answers).length;
  }

  function itemScoresOne(question, value) {
    if (!Number.isFinite(value)) return false;
    return question.direction === 'agree' ? value <= 1 : value >= 2;
  }

  function renderQuestion() {
    const q = QUESTIONS[state.currentIndex];
    const selected = state.answers[q.id];
    const total = QUESTIONS.length;
    const progress = (state.currentIndex / total) * 100;
    const meta = SUBSCALES[q.subscale];

    $('question-number').textContent = `Question ${q.id} of ${total}`;
    $('question-part').textContent = 'AQ-10 · Skrining autisme dewasa';
    $('question-domain').textContent = meta.label;
    $('question-heading').textContent = q.text;
    $('question-context').textContent = q.context;
    $('progress-fill').style.width = `${Math.max(4, progress)}%`;
    $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)}% answered`;

    const options = $('likert-options');
    options.innerHTML = '';

    OPTIONS.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'likert-option';
      const scores = itemScoresOne(q, option.value);
      if (scores) button.classList.add('clinical-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', `${option.label}: ${q.text}`);
      button.innerHTML = `
        <span class="likert-key">${option.value + 1}</span>
        <span class="likert-label">${option.label}</span>
        ${scores ? '<span class="likert-clinical-badge">Scores 1</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'View my results' : 'Next question';
    announce(`Question ${q.id} of ${total}. ${q.text}`);
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    const q = QUESTIONS[state.currentIndex];
    state.answers[q.id] = value;
    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    renderQuestion();

    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;

      if (state.currentIndex < QUESTIONS.length - 1) {
        state.currentIndex += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 180);
  }

  function goNext() {
    if (state.transitionLocked) return;
    const q = QUESTIONS[state.currentIndex];
    if (state.answers[q.id] === undefined) return;

    if (state.currentIndex < QUESTIONS.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
    } else {
      displayResults();
    }
  }

  function goBack() {
    if (state.transitionLocked) return;
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  }

  /* ---------------------------------------------------------------- *
   * Scoring
   * ---------------------------------------------------------------- */

  function calculateScores() {
    let total = 0;
    const subscaleTotals = { social: 0, sensory: 0, attention: 0, systematizing: 0 };

    QUESTIONS.forEach((q) => {
      const value = state.answers[q.id];
      if (itemScoresOne(q, value)) {
        total += 1;
        subscaleTotals[q.subscale] += 1;
      }
    });

    const aboveThreshold = total >= REFERRAL_CUTOFF;

    let classification;
    let badge;
    let tone;

    if (aboveThreshold) {
      tone = 'high';
      badge = 'Above referral threshold - specialist assessment recommended';
      classification = 'Clinically significant trait pattern';
    } else if (total >= 4) {
      tone = 'moderate';
      badge = 'Borderline pattern - monitor and consider context';
      classification = 'Borderline trait pattern';
    } else {
      tone = 'low';
      badge = 'Below clinical referral threshold';
      classification = 'Lower trait pattern';
    }

    return { total, subscaleTotals, aboveThreshold, classification, badge, tone };
  }

  /* ---------------------------------------------------------------- *
   * Radar chart - animated 60fps canvas, DPR-aware, reduced-motion safe
   * ---------------------------------------------------------------- */

  function subscaleRatios(results) {
    return SUBSCALE_ORDER.map((key) => {
      const max = SUBSCALES[key].max;
      return max === 0 ? 0 : results.subscaleTotals[key] / max;
    });
  }

  function drawRadarFrame(ctx, size, ratios, progress, opts) {
    const cx = size / 2;
    const cy = size / 2 + 8;
    const radius = size / 2 - 52;
    const n = SUBSCALE_ORDER.length;

    ctx.clearRect(0, 0, size, size);

    // Grid rings at 25/50/75/100%
    [0.25, 0.5, 0.75, 1].forEach((ring) => {
      ctx.beginPath();
      for (let i = 0; i <= n; i += 1) {
        const angle = (Math.PI * 2 * (i % n)) / n - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * ring;
        const y = cy + Math.sin(angle) * radius * ring;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 1 ? opts.gridStrong : opts.grid;
      ctx.lineWidth = ring === 1 ? 1.5 : 1;
      ctx.stroke();
    });

    // Spokes
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = opts.grid;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    ctx.beginPath();
    const points = [];
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = radius * Math.max(0.02, ratios[i] * eased);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      points.push([x, y]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Vertices + labels
    ctx.font = '700 12px ui-monospace, monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const key = SUBSCALE_ORDER[i];
      const meta = SUBSCALES[key];
      const [px, py] = points[i];

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = meta.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = opts.dotRing;
      ctx.stroke();

      const lx = cx + Math.cos(angle) * (radius + 30);
      const ly = cy + Math.sin(angle) * (radius + 26);
      ctx.fillStyle = opts.text;
      ctx.fillText(meta.short, lx, ly);
      ctx.font = '600 11px ui-monospace, monospace';
      ctx.fillStyle = opts.textMuted;
      ctx.fillText(`${results.subscaleTotals[key]}/${meta.max}`, lx, ly + 14);
      ctx.font = '700 12px ui-monospace, monospace';
    }

    return points;
  }

  function renderRadar(results) {
    const canvas = $('radar-chart');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    const tooltip = $('radar-tooltip');

    if (state.radarFrame) window.cancelAnimationFrame(state.radarFrame);
    state.radarFrame = null;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cssSize = Math.min(420, canvas.parentElement ? canvas.parentElement.clientWidth : 360);
    const size = Math.max(280, cssSize);
    canvas.width = size * dpr;
    canvas.height = (size + 20) * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size + 20}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const drawSize = size;

    const dark = document.documentElement.classList.contains('dark');
    const opts = {
      grid: dark ? 'rgba(63,63,70,0.9)' : 'rgba(212,212,216,0.9)',
      gridStrong: dark ? 'rgba(161,161,170,0.9)' : 'rgba(113,113,122,0.9)',
      text: dark ? '#f4f4f5' : '#18181b',
      textMuted: dark ? '#a1a1aa' : '#71717a',
      dotRing: dark ? '#09090b' : '#ffffff'
    };

    const ratios = subscaleRatios(results);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let points = [];
    if (reduceMotion) {
      points = drawRadarFrame(ctx, drawSize, ratios, 1, opts);
    } else {
      const start = performance.now();
      const duration = 650;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        points = drawRadarFrame(ctx, drawSize, ratios, progress, opts);
        if (progress < 1) {
          state.radarFrame = window.requestAnimationFrame(tick);
        } else {
          state.radarFrame = null;
        }
      };
      state.radarFrame = window.requestAnimationFrame(tick);
    }

    // Hover interaction: nearest-vertex tooltip
    if (tooltip) {
      canvas.onmousemove = (event) => {
        if (!points.length) return;
        const rect = canvas.getBoundingClientRect();
        const mx = event.clientX - rect.left;
        const my = event.clientY - rect.top;
        let best = -1;
        let bestDist = 28;
        points.forEach(([px, py], i) => {
          const d = Math.hypot(px - mx, py - my);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        if (best >= 0) {
          const key = SUBSCALE_ORDER[best];
          const meta = SUBSCALES[key];
          tooltip.textContent = `${meta.label}: ${results.subscaleTotals[key]} of ${meta.max} - ${meta.blurb}`;
          tooltip.classList.remove('hidden');
          const [px, py] = points[best];
          tooltip.style.left = `${Math.max(4, Math.min(rect.width - 4, px))}px`;
          tooltip.style.top = `${Math.max(4, py - 10)}px`;
        } else {
          tooltip.classList.add('hidden');
        }
      };
      canvas.onmouseleave = () => tooltip.classList.add('hidden');
    }
  }

  /* ---------------------------------------------------------------- *
   * Results
   * ---------------------------------------------------------------- */

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function subscaleStatus(value, max) {
    const ratio = max === 0 ? 0 : value / max;
    if (ratio >= 0.75) return 'Strongly endorsed';
    if (ratio >= 0.5) return 'Moderately endorsed';
    if (ratio > 0) return 'Mildly endorsed';
    return 'Minimal endorsement';
  }

  function displayResults() {
    const results = calculateScores();

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const badge = $('result-badge');
    badge.textContent = results.badge;
    badge.className = `result-badge ${results.tone}`;

    $('result-classification').textContent = results.classification;
    $('result-score').textContent = `${results.total} / 10`;
    $('threshold-status').textContent = results.aboveThreshold
      ? `At or above the referral threshold of ${REFERRAL_CUTOFF}`
      : `Below the referral threshold of ${REFERRAL_CUTOFF}`;

    $('result-narrative').textContent = results.aboveThreshold
      ? 'Your responses cross the screening threshold used by this implementation. This supports seeking a comprehensive diagnostic assessment with a specialist multidisciplinary team; it does not establish autism.'
      : results.total >= 4
        ? 'Your responses sit just below the screening threshold. Traits at this level can still be meaningful - especially with camouflaging, which can suppress scores - when they are persistent or impairing.'
        : 'Your responses fall below the screening threshold. A lower screen does not rule out every cause of social, sensory, or attention-related difficulty, and persistent concerns remain worth discussing.';

    $('social-score').textContent = `${results.subscaleTotals.social} / 5`;
    $('sensory-score').textContent = `${results.subscaleTotals.sensory} / 2`;
    $('attention-score').textContent = `${results.subscaleTotals.attention} / 2`;
    $('systematizing-score').textContent = `${results.subscaleTotals.systematizing} / 1`;
    $('social-status').textContent = subscaleStatus(results.subscaleTotals.social, 5);
    $('sensory-status').textContent = subscaleStatus(results.subscaleTotals.sensory, 2);
    $('attention-status').textContent = subscaleStatus(results.subscaleTotals.attention, 2);
    $('systematizing-status').textContent = subscaleStatus(results.subscaleTotals.systematizing, 1);

    updateBar('social-bar', results.subscaleTotals.social, 5);
    updateBar('sensory-bar', results.subscaleTotals.sensory, 2);
    updateBar('attention-bar', results.subscaleTotals.attention, 2);
    updateBar('systematizing-bar', results.subscaleTotals.systematizing, 1);

    renderRadar(results);
    renderMatrix(results);
    renderThresholdScale(results);
    renderNextSteps(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Social communication (Q5–Q7, Q9–Q10)', results.subscaleTotals.social, 5],
      ['Sensory & detail focus (Q1–Q2)', results.subscaleTotals.sensory, 2],
      ['Attention switching (Q3–Q4)', results.subscaleTotals.attention, 2],
      ['Systematizing interests (Q8)', results.subscaleTotals.systematizing, 1]
    ];

    $('profile-matrix').innerHTML = axes
      .map(([label, value, max]) => {
        const percent = Math.round(Math.max(0, Math.min(100, (value / max) * 100)));
        return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value} / ${max}</strong></div><div class="matrix-track"><span style="width:${percent}%"></span></div></div>`;
      })
      .join('');
  }

  function renderThresholdScale(results) {
    const container = $('threshold-scale');
    if (!container) return;

    let cells = '';
    for (let score = 0; score <= 10; score += 1) {
      const active = score === results.total;
      const inZone = score >= REFERRAL_CUTOFF;
      cells += `<div class="threshold-cell${active ? ' active' : ''}${inZone ? ' referral-zone' : ''}" title="Skor ${score}${score >= REFERRAL_CUTOFF ? ' - rentang rujukan' : ''}">
        <span>${score}</span>${active ? '<em>You</em>' : ''}
      </div>`;
    }
    container.innerHTML = cells;
  }

  function renderNextSteps(results) {
    const steps = results.aboveThreshold
      ? [
        'Arrange a comprehensive diagnostic assessment with a specialist multidisciplinary team - typically via your primary-care clinician, a neuropsychologist, or an adult autism service.',
        'Bring this summary plus concrete lifespan examples: social situations, sensory experiences, routines, and interests, including childhood patterns where available.',
        'Ask what the assessment involves (commonly developmental history, structured observation or interview, and questionnaires) so you can prepare without rehearsing.',
        'If you camouflage or mask in social settings, say so explicitly - masking can suppress observable traits during brief appointments.',
        'Explore workplace or study accommodations in parallel; many adjustments do not require a formal diagnosis to request.'
      ]
      : results.total >= 4
        ? [
          'Scores near the threshold deserve context, not dismissal. Note when traits appear, what triggers them, and what they cost you in daily life.',
          'Consider screening for commonly overlapping conditions - ADHD, anxiety, depression, and sensory processing differences can share surface features.',
          'If difficulties persist or cause real impairment, a clinical conversation is still worthwhile; thresholds are guides, not gates.',
          'Re-screen after a few months if your self-understanding changes, particularly if you begin unmasking long-held coping strategies.'
        ]
        : [
          'No referral is indicated on the basis of this score alone.',
          'If you are still struggling, the score is not the whole story. Persistent social, sensory, or attention-related distress deserves a conversation regardless of the number.',
          'Consider whether another explanation fits better - ADHD, social anxiety, depression, trauma responses, and sleep disorders can each mimic parts of this pattern.',
          'Re-screen if your experiences change meaningfully over time.'
        ];

    $('next-steps-list').innerHTML = steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 10 - ${results.classification}`;
    $('print-threshold').textContent = results.aboveThreshold
      ? `At or above the referral threshold of ${REFERRAL_CUTOFF}`
      : `Below the referral threshold of ${REFERRAL_CUTOFF}`;
    $('print-social').textContent = `${results.subscaleTotals.social} / 5`;
    $('print-sensory').textContent = `${results.subscaleTotals.sensory} / 2`;
    $('print-attention').textContent = `${results.subscaleTotals.attention} / 2`;
    $('print-systematizing').textContent = `${results.subscaleTotals.systematizing} / 1`;

    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      const scored = itemScoresOne(q, value);
      return `<tr${scored ? ' class="flagged"' : ''}><td>${q.id}</td><td>${SUBSCALES[q.subscale].short}</td><td>${q.text}</td><td>${OPTIONS[value].label}</td><td>${scored ? 1 : 0}</td></tr>`;
    }).join('');
  }

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `I completed the FreeIQExam AQ-10 autism screener. Score: ${results.total}/10 (referral threshold ≥6). Result: ${results.badge}. This is screening information, not a diagnosis.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Skrining AQ-10 FreeIQExam', text, url: window.location.href });
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

  function resetAssessment() {
    window.clearTimeout(state.transitionTimer);
    if (state.radarFrame) window.cancelAnimationFrame(state.radarFrame);

    state.currentIndex = 0;
    state.answers = {};
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.radarFrame = null;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('results-section').classList.add('hidden');
    $('questionnaire-section').classList.add('hidden');
    $('assessment-intro').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    announce('Asesmen direset. Siap memulai kembali.');
  }

  /* ---------------------------------------------------------------- *
   * Init
   * ---------------------------------------------------------------- */

  function beginAssessment() {
    $('assessment-intro').classList.add('hidden');
    $('questionnaire-section').classList.remove('hidden');
    state.currentIndex = 0;
    renderQuestion();
    $('questionnaire-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    if (!$('autism-app')) return;

    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', beginAssessment);
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);
    $('retake-intro')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if (typing) return;
      if ($('questionnaire-section')?.classList.contains('hidden')) return;

      if (['1', '2', '3', '4'].includes(event.key)) {
        event.preventDefault();
        selectAnswer(Number(event.key) - 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goBack();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    });

    window.addEventListener('resize', () => {
      if (!$('results-section')?.classList.contains('hidden')) {
        renderRadar(calculateScores());
      }
    });

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.add('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
