(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * PHQ-9 — Patient Health Vragenlijst 9-item depression module
   * Spitzer, Williams & Kroenke. Scored 0–27 across 9 DSM-5 criterion
   * items over a 2-week recall window, plus a supplementary functional
   * impairment item (item 10) reported separately from the total.
   *
   * Deze engine produceert uitsluitend screening-informatie. Het is geen
   * diagnostisch instrument en kan een diagnose niet vaststellen of uitsluiten.
   * ------------------------------------------------------------------ */

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Niet op alleen', detail: '0 dagen' },
    { value: 1, label: 'Een paar dagen', detail: '1-6 dagen' },
    { value: 2, label: 'Meer dan de helft van de dagen', detail: '7-11 dagen' },
    { value: 3, label: 'Bijna elke dag', detail: '12-14 dagen' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Helemaal niet moeilijk', detail: 'Geen interferentie' },
    { value: 1, label: 'Een beetje moeilijk', detail: 'Lichte interferentie' },
    { value: 2, label: 'Zeer moeilijk', detail: 'Aanzienlijke interferentie' },
    { value: 3, label: 'Zeer zwaar', detail: 'Zware interferentie' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'affective',
      context: 'Anhedonie en verminderde beloningsgevoeligheid',
      text: 'Weinig interesse of plezier in dingen doen'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Gedeprimeerde stemming en aanhoudende negatieve emotie',
      text: 'Neerslappend gevoel, somber of hoopeloos zijn'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Slaapstoornis en insomnia of hypersomnie',
      text: 'Moeite met inslaap of blijven slapen, of te veel slapen'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Vermoeidheid en verminderde energie',
      text: 'Moe zijn of weinig energie hebben'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Eetlustafwijkingen en onder- of over-eten',
      text: 'Slechte eetlust of over-eten'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Niet-waardigheidsgevoel en overmatig schuldgevoel',
      text: 'Slecht over jezelf voelen of dat je een falen bent of dat je jezelf of je familie hebt teleursteld'    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Concentratievermindering en aandachtsbelasting',
      text: 'Moeite met concentreren op dingen zoals een krant lezen of tv kijken'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Psychomotorische agitatie of retardatie',
      text: 'Zo langzaam bewegen of spreken dat anderen dit zouden merken, of juist zo onrustig zijn dat je veel meer in beweging bent dan gebruikelijk'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Veiligheidskritisch item en zelfkader en suïcidale ideatie',
      text: 'Gedachten dat het beter zou zijn als je niet meer woedt, of jezelf op een of andere manier krenen zou wensen',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Supplementair item en functionele belemmering',
    text: 'Als je problemen aankruist, hoe moeilijk zijn deze problemen geweest om je werk te doen, omgaam met dingen thuis, of om te gaan met andere mensen?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimaal',
      min: 0,
      max: 4,
      label: 'Minimaal of geen',
      badge: 'Minimale of geen depressiesymptomen',
      tone: 'minimaal',
      summary: 'Je reacties vallen onder de drempel die meestal wordt gekoppeld aan klinisch significante depressie.',
      narrative:
        'Je totaalscore zit in het minimale bereik. Dit betekent dat je weinig depressieve symptomen hebt aangekruld, of ze alleen incidenteel. Een score in deze band betekent niet dat moeilijke gevoelens onbelangrijk zijn — het betekent dat het symptoompatroon dat dit instrument vastvangt momenteel niet verhoogd is.',
      steps: [
        'Geen behandeling wordt aangewezen op basis van alleen deze score.',
        'Als je nog steeds moeite hebt, is de score niet het geheel. Aanhoudende angst verdient een gesprek met een klinicus ongeacht het getal.',
        'Her-screen als je stemming, slaap, energie of interesse in dagelijks leven aanzienlijk verandert.',
        'Houd de basis in stand die stemming beschermt: consistente slaap- en wakkerheidstijden, daglicht blootstelling, aerobe beweging en regelmatig sociaal contact.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Lichte Depressie',
      badge: 'Milde depressieve symptomen',
      tone: 'mild',
      summary: 'Je hebt meerdere symptomen aangekruist op lage frequentie. Dit is onder de standaard behandeldrempel maar boven een volledig schone screening.',
      narrative:
        'Een score in het milde bereik is best read as an early signal rather than a verdict. Symptoms at this level often respond well to structured behavioural and lifestyle intervention, and watchful waiting is a legitimate clinical strategy — provided the symptoms are actually being watched. Re-screen in two to four weeks to see whether the pattern is settling or consolidating.',
      steps: [
        'Waakzaam wachten is redelijk op dit niveau, maar het moet actief zijn: volg je symptomen in plaats van te wachten tot het slechter wordt.',
        'Gedragsactivatie helpt. Schedule small, achievable, previously enjoyable activities even when motivation has not arrived yet — motivation typically follows action rather than preceding it.',
        'Bescherm slaaparchitectuur. Consistente wakker-tijden zijn effectiever voor de circadiane ritme dan consistente slaap-tijden.',
        'Aerobe oefening in matige intensiteit heeft een meetbare antidepressieve effect op dit ernstniveau.',
        'Her-screen over twee tot vier weken, en zoek klinisch advies als de score stijgt of dagelijkse functie afnemende.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Matige Depressie',
      badge: 'Moderate depression — klinische evaluatie aanbevolen',
      tone: 'moderate',
      summary: 'Je score ontmoet de standaard PHQ-9-drempel van 10 voor waarschijnlijke major depressie.',
      narrative:
        'Een score van 10 of hoger is de meest breed validatorische drempel op de PHQ-9, met een gepoolde sensitiviteit en specificiteit van ongeveer 88% voor major depressieve stoornis bij een gestructureerd klinisch interview. Op dit niveau wordt een formele klinische evaluatie aanbevolen. Dit is het punt waar gestructureerde psychotherapie of farmacotherapie vaak wordt overwogen, en het punt waar het bereik van nut versus waakzaam wachten zich opschuift naar actieve behandeling.',
      steps: [
        'Plan een klinische evaluatie with a huisarts, psychiatrist, or psychologist.',
        'Breng een kopie van dit overzicht mee. Een gestructureerde symptoomregistratie verkort de evaluatie en verbetert de diagnostische nauwkeurigheid.',
        'Op wetenschap gebaseerde psychotherapie — vooral CBT and behavioural activation — has strong support at this severity level.',
        'Bespreek of medicatie geschikt is voor je historie, en vraag naar de verwachte tijd tot ontkoming, meestal twee tot vier weken.',
        'Her-screen elke twee weken als je behandeling start, zodat de respons gemeten kan worden in plaats van te worden geraden.'
      ]
    },
    {
      key: 'moderately-severe',
      min: 15,
      max: 19,
      label: 'Matig-zware Depressie',
      badge: 'Moderately severe depression — actieve behandeling aangegeven',
      tone: 'high',
      summary: 'Je score is ver boven de diagnostische drempel en in het bereik waar actieve behandeling aangewezen is.',
      narrative:
        'Scores in this band are associated with a high probability of major depressive disorder and with substantial functional impairment. At this level, combined treatment — psychotherapie plus farmacotherapie — generally outperforms either alone, and the risk of not treating is significant. If you have been managing this without professional support, this score is a clear signal that the balance has changed.',
      steps: [
        'Zoek snel klinische evaluatie in plaats van dit alleen te monitoren.',
        'Gecombineerde psychotherapie en farmacotherapie is de gebruikelijke eerste aanpak op dit ernstniveau.',
        'Vraag je behandelend arts about the functional impairment item on this summary — it captures impairment that the symptom total alone does not.',
        'Als je slaap, eetlust of energie sterk zijn verslechterd, of als je basis-zorg voor jezelf kunt opnemen, zeg dit expliciet tijdens intake.',
        'Stop niet of wijzig enige voorgeschreven medicatie zonder contact op te nemen met de voorschrijver.'
      ]
    },
    {
      key: 'severe',
      min: 20,
      max: 27,
      label: 'Zware Depressie',
      badge: 'Severe depression — snelle omvattende evaluatie',
      tone: 'severe',
      summary: 'Je score is in het hoogste ernstbereik op de PHQ-9.',
      narrative:
        'Een score van 20 of hoger vertegenwoordigt zware symptoombelasting en is gekoppeld aan een hoge waarschijnlijkheid voor major depressieve stoornis, aanzienlijke functionele belemmering en verhoogd risico. Dit vereist snelle, omvattende medische en psychiaten evaluatie. Ernst op dit niveau is geen karakterfout en is het niet blijvend — het is een behandelbare klinische toestand, maar het vereist behandeling in plaats van zelf-management.',
      steps: [
        'Plan een omvattende medische and psychiatric evaluation promptly. If you cannot get an appointment quickly, neem contact op met een crisislijn or an urgent-care service.',
        'Vraag een vertrouwde persoon to help you coordinate appointments and transportation. Severe depression impairs exactly the executive functions needed to arrange care.',
        'Combined pharmacotherapy and psychotherapy is standard, and your clinician may discuss other interventions such as ECT or ketamine-based treatment for severe or treatment-resistant presentations.',
        'Give a copy of this summary to whoever assesses you, and be candid about the self-harm item — clinicians ask because it changes the plan, not because it changes how they regard you.',
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
    return `PHQ9-NL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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
      item.id === 10 ? 'Final question' : `Vraag ${item.id} van 9`;
    $('question-part').textContent =
      item.id === 10 ? 'Supplementary · Functional impairment' : 'PHQ-9 · Past 2 weeks';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    $('progress-fill').style.width = `${Math.max(4, (stepNumber / TOTAL_STEPS) * 100)}%`;
    $('progress-label').textContent = `${Math.round((answered / TOTAL_STEPS) * 100)}% beantwoord`;

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
      state.currentStep === TOTAL_STEPS - 1 ? 'Resultaat weergeven' : 'Volgende vraag';

    announce(`Vraag ${stepNumber} of ${TOTAL_STEPS}. ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'affective') return 'Affectioneel en anhedonie'
    if (axis === 'somatic') return 'Somatisch en neurovegetatieve symptomen'
    if (axis === 'cognitive') return 'Cognitief en motorisch en focus'
    return 'Functioneel en dagelijkse belemmering'
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
   * Crisis interstitial — shown the moment item 9 is endorsed.
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
    announce('Support resources are available. Please review before continuing.');
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
    if (ratio >= 0.67) return 'Aanzienlijk verhoogd';
    if (ratio >= 0.45) return 'Elevated';
    if (ratio >= 0.22) return 'Mildly elevated';
    return 'Lage score';
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
      ? 'Met — pattern consistent with a major depressive episode'
      : results.meetsCutoff
        ? 'Total above cut-off, algorithm criteria not fully met'
        : 'Not met';

    $('cutoff-status').textContent = results.meetsCutoff
      ? 'Op of boven de gevalideerde drempel van 10'
      : 'Onder de gevalideerde drempel van 10';

    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Affectioneel en anhedonie', results.axisTotals.affective, 9],
      ['Somatisch en neurovegetatieve symptomen', results.axisTotals.somatic, 9],
      ['Cognitief / motorisch (focus, psychomotorisch, hoop)', results.axisTotals.cognitive, 9],
      ['Symptoom breedte (items met score ≥ 2)', results.elevatedItems, 9]
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
    $('print-total').textContent = `${results.total} / 27 — ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'Op of boven de gevalideerde drempel van 10'
      : 'Onder de gevalideerde drempel van 10';
    $('print-algorithm').textContent = results.meetsAlgorithm ? 'Criteria vervuld' : 'Criteria niet vervuld';
    $('print-affective').textContent = `${results.axisTotals.affective} / 9`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9`;
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 9`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Not answered'
        : FUNCTIONAL_OPTIONS[results.functional].label;
    $('print-item9').textContent = results.item9Flag
      ? `ENDORSED — ${LIKERT_OPTIONS[results.item9].label}`
      : 'Not endorsed';

    const crisisRow = $('print-crisis-row');
    if (crisisRow) crisisRow.classList.toggle('hidden', !results.item9Flag);

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        const flagged = q.id === 9 && value >= 1;
        return `<tr${flagged ? ' class="flagged"' : ''}><td>${q.id}</td><td>${axisShort(q.axis)}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>10</td><td>Functional</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '—' : results.functional}</td><td>${results.functional === null ? 'Not answered' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  function axisShort(axis) {
    if (axis === 'affective') return 'Affectioneel';
    if (axis === 'somatic') return 'Somatisch';
    return 'Cognitive';
  }

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `Ik heb de FreeIQExam PHQ-9 depressie screener afgerond. Score: ${results.total}/27 (${results.band.label}). Dit is screening informatie, geen diagnose.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam PHQ-9 Screener', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Screening samenvatting gekopieerd.');
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
      showToast('Screening samenvatting gekopieerd.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Delen niet beschikbaar.');
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
    announce('Screening opnieuw gestart. Klaar om opnieuw te beginnen.');
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
