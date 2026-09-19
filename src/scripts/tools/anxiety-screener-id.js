(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * GAD-7 - Generalized Anxiety Disorder 7-Item Clinical Screener
   * Spitzer, Kroenke, Williams & Löwe (2006). Scored 0–21 across 7 items
   * assessing symptom frequency over a 2-week recall window, plus a
   * supplementary functional impairment item reported separately.
   *
   * Dual-Domain Subscale Structure:
   * - Cognitive / Affective Worry Domain (Items 1, 2, 3, 7 - max 12)
   * - Somatic / Autonomic Arousal Domain (Items 4, 5, 6 - max 9)
   *
   * This engine produces screening information only. It is not a
   * diagnostic instrument and cannot establish or exclude a diagnosis.
   * ------------------------------------------------------------------ */

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Tidak sama sekali', detail: '0 days' },
    { value: 1, label: 'Beberapa hari', detail: '1–6 days' },
    { value: 2, label: 'Lebih dari setengah hari', detail: '7–11 days' },
    { value: 3, label: 'Hampir setiap hari', detail: '12–14 days' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Tidak sulit sama sekali', detail: 'No interference' },
    { value: 1, label: 'Agak sulit', detail: 'Mild interference' },
    { value: 2, label: 'Sangat sulit', detail: 'Marked interference' },
    { value: 3, label: 'Luar biasa sulit', detail: 'Severe interference' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'cognitive',
      context: 'Keprihatinan otonom · ketegangan afektif',
      text: 'Merasa gugup, cemas, atau tegang'
    },
    {
      id: 2,
      axis: 'cognitive',
      context: 'Kontrol metakognitif · kekhawatiran tidak terkendali',
      text: 'Tidak dapat menghentikan atau mengendalikan kekhawatiran'
    },
    {
      id: 3,
      axis: 'cognitive',
      context: 'Keprihatinan menyeluruh · ideasi katastrofik yang menyebar',
      text: 'Khawatir berlebihan tentang berbagai hal'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Arousal otonom · ketegangan otot & neuromuskular',
      text: 'Sulit bersantai'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Agitasi psikomotor · hiperaktivasi simpatik',
      text: 'Merasa sangat gelisah sehingga sulit duduk diam'
    },
    {
      id: 6,
      axis: 'somatic',
      context: 'Reaktivitas afektif · penurunan ambang sistem saraf',
      text: 'Mudah kesal atau tersinggung'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Antisipasi katastrofik · ketakutan & kehancuran yang akan datang',
      text: 'Merasa takut, seolah-olah sesuatu yang buruk mungkin terjadi'
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 8,
    axis: 'functional',
    context: 'Item tambahan · gangguan fungsional',
    text: 'Jika Anda menandai masalah apa pun, seberapa sulit masalah-masalah tersebut membuat Anda melakukan pekerjaan, mengurus urusan di rumah, atau bergaul dengan orang lain?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1; // 7 GAD items + 1 functional item

  const SEVERITY_BANDS = [
    {
      key: 'minimal',
      min: 0,
      max: 4,
      label: 'Kecemasan Minimal',
      badge: 'Minimal or no anxiety symptoms',
      tone: 'minimal',
      summary: 'Your responses fall in the normal baseline range of healthy emotional fluctuation.',
      narrative:
        'Your total score sits in the minimal range (0–4). This indicates that you endorsed few anxiety symptoms, or endorsed them only occasionally over the past two weeks. Normal baseline nervous system reactivity fluctuates with daily stressors; this score suggests that generalized anxiety is not currently exerting a clinically significant burden on your life.',
      steps: [
        'No clinical intervention is indicated on the basis of this score alone.',
        'Maintain nervous system resilience with consistent sleep hygiene (7–9 hours), regular cardiovascular movement, and balanced daily pacing.',
        'Practice physiological down-regulation tools (such as cyclical sighing and diaphragmatic breathwork) during occasional situational stress.',
        'Re-screen if you experience persistent sleep disruption, muscle tension, or escalating worry loops.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Kecemasan Ringan',
      badge: 'Mild anxiety symptoms',
      tone: 'mild',
      summary: 'You endorsed several symptoms at low-to-moderate frequency. This represents sub-clinical threshold elevation.',
      narrative:
        'A score of 5 to 9 falls in the mild anxiety bracket. At this level, symptoms often reflect elevated environmental or psychological load rather than established pathology. Active watchful waiting, paired with lifestyle pacing and cognitive restructuring, is the standard recommended approach. Symptoms at this tier respond very well to early self-regulation tools before worry patterns become consolidated.',
      steps: [
        'Watchful waiting is appropriate at this level: monitor your symptoms over the next 2 to 4 weeks to see if they settle or escalate.',
        'Implement structured worry time: allocate 15 minutes in the late afternoon to write down concerns and identify actionable next steps, preventing bedtime rumination.',
        'Reduce sympathetic nervous system stimulants, particularly excessive caffeine, nicotine, and late-night blue light exposure.',
        'Engage in daily somatic downshifting: 10–15 minutes of progressive muscle relaxation, yoga nidra, or low-frequency ambient green/brown noise.',
        'Consider seeking guidance from a therapist or primary care clinician if symptoms begin to interfere with concentration, work, or relationships.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Kecemasan Sedang',
      badge: 'Moderate anxiety - clinical evaluation recommended',
      tone: 'moderate',
      summary: 'Your score meets the validated clinical cut-off of 10 for probable Generalized Anxiety Disorder (GAD).',
      narrative:
        'A score of 10 or higher represents the clinically validated diagnostic threshold for Generalized Anxiety Disorder (GAD-7 sensitivity ~89%, specificity ~82%). At this level, excessive worry and autonomic tension are likely impairing daily functioning, cognitive focus, or sleep architecture. A comprehensive clinical evaluation with a physician, psychologist, or licensed psychotherapist is recommended.',
      steps: [
        'Schedule a clinical consultation with a primary care doctor, psychiatrist, or licensed mental health professional.',
        'Bring a printed or digital copy of this GAD-7 Clinician Intake Summary to your appointment to provide a structured symptom baseline.',
        'Evidence-based Cognitive Behavioral Therapy (CBT) and Acceptance & Commitment Therapy (ACT) show high clinical efficacy at this level.',
        'Discuss medical evaluations (such as thyroid panel, iron/ferritin levels, or cardiac rhythm checks) to rule out physiological mimics of anxiety.',
        'Re-screen every 2 to 4 weeks to track your symptom trajectory and evaluate response to any initiated treatments.'
      ]
    },
    {
      key: 'severe',
      min: 15,
      max: 21,
      label: 'Kecemasan Berat',
      badge: 'Severe anxiety - active clinical intervention warranted',
      tone: 'severe',
      summary: 'Your score is in the highest severity bracket, indicating marked cognitive and physiological disruption.',
      narrative:
        'A score of 15 to 21 signifies severe anxiety symptoms. At this severity, sympathetic overdrive, chronic apprehension, and somatic tension typically cause marked impairment across occupational, social, and personal domains. This warrants prompt, comprehensive medical and psychotherapeutic intervention. Severe anxiety is a treatable clinical condition, and multimodal care (psychotherapy plus medical management) often delivers substantial relief.',
      steps: [
        'Arrange a prompt evaluation with a licensed mental health clinician or psychiatrist. Do not hesitate to seek timely care.',
        'Share this full itemized report with your provider, highlighting both cognitive worry scores and somatic tension levels.',
        'First-line clinical interventions commonly include combined evidence-based psychotherapy (CBT) and pharmacotherapy (such as SSRIs or SNRIs).',
        'Enlist the support of a trusted family member or friend to assist in booking appointments and managing daily logistical demands.',
        'If you experience acute panic, overwhelming crisis, or thoughts of self-harm, immediately contact 988 (US/Canada), 116 123 (UK), or your local emergency services.'
      ]
    }
  ];

  const state = {
    currentStep: 0,
    answers: {},
    functional: undefined,
    transitionTimer: null,
    transitionLocked: false,
    sessionId: '',
    startedAt: null
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `GAD7-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('anxiety-live-region');
    if (live) live.textContent = message;
  }

  function answeredCount() {
    return Object.keys(state.answers).length + (state.functional !== undefined ? 1 : 0);
  }

  function currentItem() {
    return state.currentStep < QUESTIONS.length ? QUESTIONS[state.currentStep] : FUNCTIONAL_ITEM;
  }

  function currentOptions() {
    return state.currentStep < QUESTIONS.length ? LIKERT_OPTIONS : FUNCTIONAL_OPTIONS;
  }

  function currentValue() {
    const item = currentItem();
    return item.id === 8 ? state.functional : state.answers[item.id];
  }

  function setCurrentValue(value) {
    const item = currentItem();
    if (item.id === 8) state.functional = value;
    else state.answers[item.id] = value;
  }

  /* ---------------------------------------------------------------- *
   * Rendering
   * ---------------------------------------------------------------- */

  function renderQuestion() {
    const item = currentItem();
    const options = currentOptions();
    const selected = currentValue();
    const stepNumber = state.currentStep + 1;

    $('question-number').textContent =
      item.id === 8 ? 'Final question' : `Question ${item.id} of 7`;
    $('question-part').textContent =
      item.id === 8 ? 'Supplementary · Functional Impairment' : 'GAD-7 · Past 2 Weeks';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    const percent = Math.round((answered / TOTAL_STEPS) * 100);
    $('progress-label').textContent = `${percent}% answered`;
    $('progress-fill').style.width = `${Math.max(4, percent)}%`;

    const container = $('likert-options');
    container.innerHTML = options
      .map((opt, idx) => {
        const isSelected = selected === opt.value;
        return `
          <button
            type="button"
            class="likert-option${isSelected ? ' selected' : ''}"
            data-value="${opt.value}"
            aria-pressed="${isSelected}"
          >
            <span class="likert-key">${idx + 1}</span>
            <span class="likert-label">${opt.label}</span>
            <span class="likert-detail">${opt.detail}</span>
          </button>
        `;
      })
      .join('');

    container.querySelectorAll('.likert-option').forEach((button) => {
      button.addEventListener('click', () => {
        const val = Number(button.dataset.value);
        selectAnswer(val);
      });
    });

    $('back-button').disabled = state.currentStep === 0;
    $('next-button').disabled = selected === undefined;
    $('next-button').textContent =
      state.currentStep === TOTAL_STEPS - 1 ? 'View Clinical Results' : 'Next question';

    announce(`Question ${stepNumber} of ${TOTAL_STEPS}: ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'cognitive') return 'Cognitive / Affective Worry · Anticipation & Metacognition';
    if (axis === 'somatic') return 'Somatic / Autonomic Arousal · Tension, Agitation & Reactivity';
    return 'Supplementary · Occupational & Social Functional Impact';
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);
    renderQuestion();

    // Smooth auto-advance after brief visual confirmation
    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;
      if (state.currentStep < TOTAL_STEPS - 1) {
        state.currentStep += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 320);
  }

  function goNext() {
    if (currentValue() === undefined || state.transitionLocked) return;
    if (state.currentStep < TOTAL_STEPS - 1) {
      state.currentStep += 1;
      renderQuestion();
    } else {
      displayResults();
    }
  }

  function goBack() {
    if (state.currentStep === 0 || state.transitionLocked) return;
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.currentStep -= 1;
    renderQuestion();
  }

  /* ---------------------------------------------------------------- *
   * Scoring & Calculations
   * ---------------------------------------------------------------- */

  function calculateScores() {
    let total = 0;
    const axisTotals = { cognitive: 0, somatic: 0 };
    let elevatedItems = 0;

    QUESTIONS.forEach((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      total += value;
      axisTotals[q.axis] += value;
      if (value >= 2) elevatedItems += 1;
    });

    const band =
      SEVERITY_BANDS.find((entry) => total >= entry.min && total <= entry.max) ||
      SEVERITY_BANDS[SEVERITY_BANDS.length - 1];

    const functional = Number.isFinite(state.functional) ? state.functional : null;

    return {
      total,
      band,
      functional,
      axisTotals,
      elevatedItems,
      // Validated GAD-7 clinical cut-off (Spitzer et al., 2006):
      meetsCutoff: total >= 10
    };
  }

  /* ---------------------------------------------------------------- *
   * Results Presentation
   * ---------------------------------------------------------------- */

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function axisStatus(value, max) {
    const ratio = value / max;
    if (ratio >= 0.67) return 'Markedly elevated';
    if (ratio >= 0.45) return 'Elevated';
    if (ratio >= 0.22) return 'Mildly elevated';
    return 'Lower endorsement';
  }

  function displayResults() {
    const results = calculateScores();

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const badge = $('result-badge');
    badge.textContent = results.band.badge;
    badge.className = `result-badge ${results.band.tone}`;

    $('result-classification').textContent = results.band.label;
    $('result-score').textContent = `${results.total} / 21`;
    $('result-narrative').textContent = results.band.narrative;

    // Cognitive subscale (Items 1, 2, 3, 7 - max 12)
    $('cognitive-score').textContent = `${results.axisTotals.cognitive} / 12`;
    $('cognitive-status').textContent = axisStatus(results.axisTotals.cognitive, 12);
    updateBar('cognitive-bar', results.axisTotals.cognitive, 12);

    // Somatic subscale (Items 4, 5, 6 - max 9)
    $('somatic-score').textContent = `${results.axisTotals.somatic} / 9`;
    $('somatic-status').textContent = axisStatus(results.axisTotals.somatic, 9);
    updateBar('somatic-bar', results.axisTotals.somatic, 9);

    // Functional impairment
    $('functional-score').textContent =
      results.functional === null ? 'Not answered' : FUNCTIONAL_OPTIONS[results.functional].label;

    // Cutoff status
    $('cutoff-status').textContent = results.meetsCutoff
      ? 'At or above the validated clinical cut-off of 10 (Probable GAD)'
      : 'Below the validated clinical cut-off of 10';

    // Breadth status
    $('breadth-status').textContent = `${results.elevatedItems} of 7 items scored ≥ 2`;

    // Next steps list
    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Cognitive Worry Subscale (Items 1, 2, 3, 7)', results.axisTotals.cognitive, 12],
      ['Somatic Tension Subscale (Items 4, 5, 6)', results.axisTotals.somatic, 9],
      ['Symptom Breadth (Items scored ≥ 2 days)', results.elevatedItems, 7]
    ];

    $('profile-matrix').innerHTML = axes
      .map(([label, value, max]) => {
        const percent = Math.round(Math.max(0, Math.min(100, (value / max) * 100)));
        return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value} / ${max}</strong></div><div class="matrix-track"><span style="width:${percent}%"></span></div></div>`;
      })
      .join('');
  }

  function renderSeverityScale(results) {
    const container = $('severity-scale');
    if (!container) return;

    container.innerHTML = SEVERITY_BANDS.map((band) => {
      const active = band.key === results.band.key;
      return `<div class="severity-tier${active ? ' active' : ''}">
        <span class="severity-range">${band.min}–${band.max}</span>
        <span class="severity-name">${band.label}</span>
        ${active ? '<span class="severity-marker">Your score sits here</span>' : ''}
      </div>`;
    }).join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 21 - ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'At or above the validated clinical cut-off of 10 (Probable GAD)'
      : 'Below the validated clinical cut-off of 10';
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 12 (${axisStatus(results.axisTotals.cognitive, 12)})`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9 (${axisStatus(results.axisTotals.somatic, 9)})`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Not answered'
        : FUNCTIONAL_OPTIONS[results.functional].label;

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        return `<tr><td>${q.id}</td><td>${q.axis === 'cognitive' ? 'Cognitive' : 'Somatic'}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>8</td><td>Functional</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '-' : results.functional}</td><td>${results.functional === null ? 'Not answered' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  /* ---------------------------------------------------------------- *
   * Share / Reset / Print
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `I completed the FreeIQExam GAD-7 anxiety screener. Score: ${results.total}/21 (${results.band.label}). This is validated screening information, not a medical diagnosis.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Skrining GAD-7 FreeIQExam', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Screening summary copied to clipboard.');
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
      showToast('Screening summary copied to clipboard.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Sharing was unavailable.');
    }
  }

  function showToast(message) {
    const toast = $('share-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-3');
    window.setTimeout(() => toast.classList.add('opacity-0', 'translate-y-3'), 2400);
  }

  function resetAssessment() {
    window.clearTimeout(state.transitionTimer);

    state.currentStep = 0;
    state.answers = {};
    state.functional = undefined;
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('results-section').classList.add('hidden');
    $('questionnaire-section').classList.add('hidden');
    $('assessment-intro').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    announce('Asesmen direset. Siap memulai kembali.');
  }

  /* ---------------------------------------------------------------- *
   * Initialization
   * ---------------------------------------------------------------- */

  function beginAssessment() {
    $('assessment-intro').classList.add('hidden');
    $('questionnaire-section').classList.remove('hidden');
    state.currentStep = 0;
    renderQuestion();
    $('questionnaire-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    if (!$('anxiety-app')) return;

    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', beginAssessment);
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

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

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.add('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
