(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * PHQ-9 - Patient Health Questionnaire 9-item depression module
   * Spitzer, Williams & Kroenke. Scored 0–27 across 9 DSM-5 criterion
   * items over a 2-week recall window, plus a supplementary functional
   * impairment item (item 10) reported separately from the total.
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
      axis: 'affective',
      context: 'Anhedonia · responsivitas penghargaan berkurang',
      text: 'Sedikit minat atau kesenangan dalam melakukan sesuatu'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Suasana hati depresif · afek negatif berkelanjutan',
      text: 'Merasa sedih, tertekan, atau putus asa'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Gangguan tidur · insomnia atau hipersomnia',
      text: 'Sulit memulai atau mempertahankan tidur, atau tidur terlalu banyak'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Kelelahan · ketersediaan energi berkurang',
      text: 'Merasa lelah atau memiliki sedikit energi'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Disregulasi nafsu makan · makan terlalu sedikit atau berlebihan',
      text: 'Nafsu makan buruk atau makan berlebihan'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Perasaan tidak berharga dan rasa bersalah berlebihan',
      text: 'Merasa buruk tentang diri sendiri - atau bahwa Anda seorang pecundang atau telah mengecewakan diri sendiri maupun keluarga'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Gangguan konsentrasi · beban atensional',
      text: 'Sulit berkonsentrasi pada sesuatu, seperti membaca koran atau menonton televisi'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Agitasi atau retardasi psikomotor',
      text: 'Bergerak atau berbicara sangat lambat sehingga orang lain bisa menyadarinya - atau sebaliknya, menjadi sangat gelisah sehingga Anda banyak bergerak lebih dari biasanya'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Item kritis keselamatan · melukai diri sendiri dan ide bunuh diri',
      text: 'Pikiran bahwa Anda lebih baik mati, atau melukai diri sendiri dengan cara tertentu',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Item tambahan · gangguan fungsional',
    text: 'Jika Anda menandai masalah apa pun, seberapa sulit masalah-masalah tersebut membuat Anda melakukan pekerjaan, mengurus urusan di rumah, atau bergaul dengan orang lain?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimal',
      min: 0,
      max: 4,
      label: 'Minimal atau Tidak Ada',
      badge: 'Minimal or no depression symptoms',
      tone: 'minimal',
      summary: 'Your responses fall below the threshold usually associated with clinically significant depression.',
      narrative:
        'Your total score sits in the minimal range. This means you endorsed few depressive symptoms, or endorsed them only occasionally, across the past two weeks. A score in this band does not mean that difficult feelings are unimportant - it means the symptom pattern captured by this instrument is not currently elevated.',
      steps: [
        'No treatment is indicated on the basis of this score alone.',
        'If you are still struggling, the score is not the whole story. Persistent distress deserves a conversation with a clinician regardless of the number.',
        'Re-screen if your mood, sleep, energy, or interest in daily life changes meaningfully.',
        'Maintain the basics that protect mood: consistent sleep and wake times, daytime light exposure, aerobic movement, and regular social contact.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Depresi Ringan',
      badge: 'Mild depressive symptoms',
      tone: 'mild',
      summary: 'You endorsed several symptoms at low frequency. This is below the standard treatment threshold but above a fully clear screen.',
      narrative:
        'A score in the mild range is best read as an early signal rather than a verdict. Symptoms at this level often respond well to structured behavioural and lifestyle intervention, and watchful waiting is a legitimate clinical strategy - provided the symptoms are actually being watched. Re-screen in two to four weeks to see whether the pattern is settling or consolidating.',
      steps: [
        'Watchful waiting is reasonable at this level, but it should be active: track your symptoms rather than waiting to feel worse.',
        'Behavioural activation helps. Schedule small, achievable, previously enjoyable activities even when motivation has not arrived yet - motivation typically follows action rather than preceding it.',
        'Protect sleep architecture. Consistent wake times anchor circadian rhythm more effectively than consistent bedtimes.',
        'Aerobic exercise at moderate intensity has a measurable antidepressant effect at this severity level.',
        'Re-screen in two to four weeks, and seek clinical advice if the score is rising or daily functioning is slipping.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Depresi Sedang',
      badge: 'Moderate depression - clinical evaluation recommended',
      tone: 'moderate',
      summary: 'Your score meets the standard PHQ-9 cut-off of 10 for probable major depression.',
      narrative:
        'A score of 10 or above is the most widely validated threshold on the PHQ-9, with pooled sensitivity and specificity of roughly 88% for major depressive disorder against structured clinical interview. At this level, a formal clinical evaluation is recommended. This is the point at which structured psychotherapy or pharmacotherapy is commonly considered, and the point at which the balance of benefit versus watchful waiting shifts toward active treatment.',
      steps: [
        'Arrange a clinical evaluation with a primary-care clinician, psychiatrist, or psychologist.',
        'Bring a copy of this summary. A structured symptom record shortens the assessment and improves diagnostic accuracy.',
        'Evidence-based psychotherapy - particularly CBT and behavioural activation - has strong support at this severity level.',
        'Discuss whether medication is appropriate for your history, and ask about the expected time to onset, which is typically two to four weeks.',
        'Re-screen every two weeks if you begin treatment, so that response can be measured rather than guessed.'
      ]
    },
    {
      key: 'moderately-severe',
      min: 15,
      max: 19,
      label: 'Depresi Sedang hingga Berat',
      badge: 'Moderately severe depression - active treatment indicated',
      tone: 'high',
      summary: 'Your score is well above the diagnostic cut-off and in the range where active treatment is indicated.',
      narrative:
        'Scores in this band are associated with a high probability of major depressive disorder and with substantial functional impairment. At this level, combined treatment - psychotherapy plus pharmacotherapy - generally outperforms either alone, and the risk of not treating is significant. If you have been managing this without professional support, this score is a clear signal that the balance has changed.',
      steps: [
        'Seek clinical assessment promptly rather than monitoring this on your own.',
        'Combined psychotherapy and pharmacotherapy is the usual first-line approach at this severity.',
        'Ask your clinician about the functional impairment item on this summary - it captures impairment that the symptom total alone does not.',
        'If your sleep, appetite, or energy have deteriorated markedly, or if you have stopped managing basic self-care, say so explicitly during intake.',
        'Do not stop or change any prescribed medication without speaking to the prescriber first.'
      ]
    },
    {
      key: 'severe',
      min: 20,
      max: 27,
      label: 'Depresi Berat',
      badge: 'Severe depression - prompt comprehensive assessment',
      tone: 'severe',
      summary: 'Your score is in the highest severity band on the PHQ-9.',
      narrative:
        'A score of 20 or above represents severe symptom burden and is associated with a high likelihood of major depressive disorder, marked functional impairment, and elevated risk. This warrants prompt, comprehensive medical and psychiatric evaluation. Severity at this level is not a character failing and it is not permanent - it is a treatable clinical state, but it needs treatment rather than self-management.',
      steps: [
        'Arrange a comprehensive medical and psychiatric evaluation promptly. If you cannot get an appointment quickly, contact a crisis line or an urgent-care service.',
        'Ask a trusted person to help you coordinate appointments and transportation. Severe depression impairs exactly the executive functions needed to arrange care.',
        'Combined pharmacotherapy and psychotherapy is standard, and your clinician may discuss other interventions such as ECT or ketamine-based treatment for severe or treatment-resistant presentations.',
        'Give a copy of this summary to whoever assesses you, and be candid about the self-harm item - clinicians ask because it changes the plan, not because it changes how they regard you.',
        'If you have any thought of ending your life or harming yourself, contact emergency services or a crisis line now. Do not wait for an appointment.'
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
    startedAt: null,
    crisisAcknowledged: false
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `PHQ9-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('depression-live-region');
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
    return item.id === 10 ? state.functional : state.answers[item.id];
  }

  function setCurrentValue(value) {
    const item = currentItem();
    if (item.id === 10) state.functional = value;
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
      item.id === 10 ? 'Final question' : `Question ${item.id} of 9`;
    $('question-part').textContent =
      item.id === 10 ? 'Supplementary · Functional impairment' : 'PHQ-9 · Past 2 weeks';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    $('progress-fill').style.width = `${Math.max(4, (stepNumber / TOTAL_STEPS) * 100)}%`;
    $('progress-label').textContent = `${Math.round((answered / TOTAL_STEPS) * 100)}% answered`;

    const container = $('likert-options');
    container.innerHTML = '';

    const isCritical = Boolean(item.critical);

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'likert-option';
      if (isCritical && option.value > 0) button.classList.add('safety-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', `${option.label}: ${item.text}`);
      button.innerHTML = `
        <span class="likert-key">${index + 1}</span>
        <span class="likert-label">${option.label}</span>
        <span class="likert-detail">${option.detail}</span>
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      container.appendChild(button);
    });

    const safetyNote = $('question-safety-note');
    if (safetyNote) safetyNote.classList.toggle('hidden', !isCritical);

    $('back-button').disabled = state.currentStep === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent =
      state.currentStep === TOTAL_STEPS - 1 ? 'View my results' : 'Next question';

    announce(`Question ${stepNumber} of ${TOTAL_STEPS}. ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'affective') return 'Affective · mood and anhedonia';
    if (axis === 'somatic') return 'Somatic · neurovegetative symptoms';
    if (axis === 'cognitive') return 'Cognitive and motor · focus, psychomotor, hope';
    return 'Functional · daily impairment';
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);

    // Safety interlock: any endorsement of item 9 pauses the flow so the
    // crisis panel is seen rather than skipped past on the way to results.
    const item = currentItem();
    if (item.id === 9 && value >= 1 && !state.crisisAcknowledged) {
      renderQuestion();
      openCrisisInterstitial();
      return;
    }

    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    renderQuestion();

    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;

      if (state.currentStep < TOTAL_STEPS - 1) {
        state.currentStep += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 180);
  }

  function goNext() {
    if (state.transitionLocked) return;
    if (currentValue() === undefined) return;

    if (state.currentStep < TOTAL_STEPS - 1) {
      state.currentStep += 1;
      renderQuestion();
    } else {
      displayResults();
    }
  }

  function goBack() {
    if (state.transitionLocked) return;
    if (state.currentStep > 0) {
      state.currentStep -= 1;
      renderQuestion();
    }
  }

  /* ---------------------------------------------------------------- *
   * Crisis interstitial - shown the moment item 9 is endorsed.
   * ---------------------------------------------------------------- */

  function openCrisisInterstitial() {
    const panel = $('crisis-interstitial');
    if (!panel) return;
    // Modal: hide the questionnaire so background Likert buttons and nav
    // controls cannot be clicked while the safety resources are showing.
    $('questionnaire-section')?.classList.add('hidden');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusTarget = $('crisis-continue');
    if (focusTarget) focusTarget.focus({ preventScroll: true });
    announce('Sumber daya dukungan tersedia. Harap tinjau sebelum melanjutkan.');
  }

  function closeCrisisInterstitial() {
    const panel = $('crisis-interstitial');
    if (panel) panel.classList.add('hidden');
    state.crisisAcknowledged = true;
    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;
      $('questionnaire-section')?.classList.remove('hidden');
      if (state.currentStep < TOTAL_STEPS - 1) {
        state.currentStep += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 120);
  }

  /* ---------------------------------------------------------------- *
   * Scoring
   * ---------------------------------------------------------------- */

  function calculateScores() {
    let total = 0;
    const axisTotals = { affective: 0, somatic: 0, cognitive: 0 };
    let elevatedItems = 0;
    let coreElevated = false;

    QUESTIONS.forEach((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      total += value;
      axisTotals[q.axis] += value;
      if (value >= 2) elevatedItems += 1;
      if ((q.id === 1 || q.id === 2) && value >= 2) coreElevated = true;
    });

    const band =
      SEVERITY_BANDS.find((entry) => total >= entry.min && total <= entry.max) ||
      SEVERITY_BANDS[SEVERITY_BANDS.length - 1];

    const item9 = Number.isFinite(state.answers[9]) ? state.answers[9] : 0;
    const functional = Number.isFinite(state.functional) ? state.functional : null;

    return {
      total,
      band,
      item9,
      item9Flag: item9 >= 1,
      functional,
      axisTotals,
      elevatedItems,
      coreElevated,
      // Standard PHQ-9 alternative algorithm for major depressive episode:
      // five or more items scored >= 2, with at least one of the two core
      // items (depressed mood, anhedonia) also scored >= 2.
      meetsAlgorithm: elevatedItems >= 5 && coreElevated,
      meetsCutoff: total >= 10
    };
  }

  /* ---------------------------------------------------------------- *
   * Results
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

    const crisisBanner = $('crisis-banner');
    if (crisisBanner) crisisBanner.classList.toggle('hidden', !results.item9Flag);

    const badge = $('result-badge');
    badge.textContent = results.band.badge;
    badge.className = `result-badge ${results.band.tone}`;

    $('result-classification').textContent = results.band.label;
    $('result-score').textContent = `${results.total} / 27`;
    $('result-narrative').textContent = results.band.narrative;

    $('affective-score').textContent = `${results.axisTotals.affective} / 9`;
    $('somatic-score').textContent = `${results.axisTotals.somatic} / 9`;
    $('cognitive-score').textContent = `${results.axisTotals.cognitive} / 9`;
    $('affective-status').textContent = axisStatus(results.axisTotals.affective, 9);
    $('somatic-status').textContent = axisStatus(results.axisTotals.somatic, 9);
    $('cognitive-status').textContent = axisStatus(results.axisTotals.cognitive, 9);

    updateBar('affective-bar', results.axisTotals.affective, 9);
    updateBar('somatic-bar', results.axisTotals.somatic, 9);
    updateBar('cognitive-bar', results.axisTotals.cognitive, 9);

    $('functional-score').textContent =
      results.functional === null ? 'Not answered' : FUNCTIONAL_OPTIONS[results.functional].label;

    $('algorithm-status').textContent = results.meetsAlgorithm
      ? 'Met - pattern consistent with a major depressive episode'
      : results.meetsCutoff
        ? 'Total above cut-off, algorithm criteria not fully met'
        : 'Not met';

    $('cutoff-status').textContent = results.meetsCutoff
      ? 'At or above the validated cut-off of 10'
      : 'Below the validated cut-off of 10';

    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Affective (mood, anhedonia, guilt)', results.axisTotals.affective, 9],
      ['Somatic (sleep, energy, appetite)', results.axisTotals.somatic, 9],
      ['Cognitive / motor (focus, psychomotor, hope)', results.axisTotals.cognitive, 9],
      ['Symptom breadth (items scored ≥ 2)', results.elevatedItems, 9]
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
        ${active ? '<span class="severity-marker">You are here</span>' : ''}
      </div>`;
    }).join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 27 - ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'At or above the validated cut-off of 10'
      : 'Below the validated cut-off of 10';
    $('print-algorithm').textContent = results.meetsAlgorithm ? 'Criteria met' : 'Criteria not met';
    $('print-affective').textContent = `${results.axisTotals.affective} / 9`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9`;
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 9`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Not answered'
        : FUNCTIONAL_OPTIONS[results.functional].label;
    $('print-item9').textContent = results.item9Flag
      ? `ENDORSED - ${LIKERT_OPTIONS[results.item9].label}`
      : 'Not endorsed';

    const crisisRow = $('print-crisis-row');
    if (crisisRow) crisisRow.classList.toggle('hidden', !results.item9Flag);

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        const flagged = q.id === 9 && value >= 1;
        return `<tr${flagged ? ' class="flagged"' : ''}><td>${q.id}</td><td>${axisShort(q.axis)}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>10</td><td>Functional</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '-' : results.functional}</td><td>${results.functional === null ? 'Not answered' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  function axisShort(axis) {
    if (axis === 'affective') return 'Affective';
    if (axis === 'somatic') return 'Somatic';
    return 'Cognitive';
  }

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `I completed the FreeIQExam PHQ-9 depression screener. Score: ${results.total}/27 (${results.band.label}). This is screening information, not a diagnosis.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Skrining PHQ-9 FreeIQExam', text, url: window.location.href });
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

    state.currentStep = 0;
    state.answers = {};
    state.functional = undefined;
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.crisisAcknowledged = false;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('results-section').classList.add('hidden');
    $('questionnaire-section').classList.add('hidden');
    $('crisis-interstitial')?.classList.add('hidden');
    $('crisis-banner')?.classList.add('hidden');
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
    state.currentStep = 0;
    renderQuestion();
    $('questionnaire-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    if (!$('depression-app')) return;

    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', beginAssessment);
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('crisis-continue')?.addEventListener('click', closeCrisisInterstitial);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
      // Crisis interstitial is modal: it captures its own keys.
      if ($('crisis-interstitial') && !$('crisis-interstitial').classList.contains('hidden')) {
        if (event.key === 'Escape' || event.key === 'Enter') {
          event.preventDefault();
          closeCrisisInterstitial();
        }
        return;
      }

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
    $('crisis-interstitial')?.classList.add('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
