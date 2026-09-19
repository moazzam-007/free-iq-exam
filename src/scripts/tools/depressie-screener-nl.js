(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * PHQ-9 — Patient Health Questionnaire (9-item depressiemodule)
   * Spitzer, Williams & Kroenke.
   * Bereik: 0–27 over 9 DSM-criteria binnen een 14-daags venster,
   * plus een aanvullende functionele vraag (vraag 10).
   *
   * Deze tool biedt een indicatieve screening en psycho-educatie.
   * Het is geen formele medische of psychiatrische diagnose.
   * ------------------------------------------------------------------ */

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Helemaal niet', detail: '0 dagen' },
    { value: 1, label: 'Meerdere dagen', detail: '1–6 dagen' },
    { value: 2, label: 'Meer dan de helft van de dagen', detail: '7–11 dagen' },
    { value: 3, label: 'Bijna elke dag', detail: '12–14 dagen' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Helemaal niet moeilijk', detail: 'Geen belemmering' },
    { value: 1, label: 'Een beetje moeilijk', detail: 'Lichte belemmering' },
    { value: 2, label: 'Erg moeilijk', detail: 'Aanzienlijke belemmering' },
    { value: 3, label: 'Heel erg moeilijk', detail: 'Zware belemmering' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'affective',
      context: 'Anhedonie & verlies van interesse',
      text: 'Weinig interesse of plezier in uw bezigheden'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Neerslachtigheid & somberheid',
      text: 'Zich neerslachtig, depressief of hopeloos voelen'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Slaappatroon & vermoeidheid',
      text: 'Moeite met inslapen of doorslapen, of juist te veel slapen'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Energieniveau & vitaliteit',
      text: 'Zich moe voelen of weinig energie hebben'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Eetlust & gewichtsveranderingen',
      text: 'Weinig eetlust of juist te veel eten'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Zelfbeeld & schuldgevoel',
      text: 'Slecht over uzelf denken — of het gevoel hebben dat u gefaald heeft of uzelf of uw familie heeft teleurgesteld'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Concentratie & mentale focus',
      text: 'Moeite met concentreren op zaken zoals het lezen van de krant of televisiekijken'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Psychomotorische onrust of vertraging',
      text: 'Zodanig traag bewegen of spreken dat het anderen opvalt? Of juist zo rusteloos of wiebelig zijn dat u veel meer rondloopt dan gewoonlijk'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Veiligheidskritisch item · Suïcidaliteit',
      text: 'Gedachten dat u beter dood zou kunnen zijn of dat u uzelf op de een of andere manier pijn zou willen doen',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Aanvullende vraag · Impact op het dagelijks functioneren',
    text: 'Indien u een of meer van deze problemen heeft ervaren: in hoeverre hebben deze problemen het voor u moeilijk gemaakt om uw werk te doen, thuis voor dingen te zorgen, of met andere mensen om te gaan?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimaal',
      min: 0,
      max: 4,
      label: 'Minimaal of geen',
      badge: 'Minimale of geen depressieve klachten (0–4)',
      tone: 'low',
      narrative: 'Uw score (0–4) duidt op afwezigheid van klinisch relevante depressieve symptomen. Dit patroon valt binnen het normale bereik van alledaagse stemmingswisselingen.',
      steps: [
        'Geen specifieke behandeling geïndiceerd op basis van deze score.',
        'Blijf aandacht besteden aan een gezond slaapritme, regelmatige beweging en ontspanning.',
        'Herhaal de zelftest wanneer u in de toekomst aanhoudende stemmingsveranderingen opmerkt.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Lichte depressieve klachten',
      badge: 'Lichte depressieve symptomen (5–9)',
      tone: 'moderate',
      narrative: 'Uw score (5–9) wijst op lichte depressieve klachten. Hoewel dit vaak tijdelijk is (bijvoorbeeld door stress of overbelasting), kan waakzaamheid en leefstijlinterventie verergering voorkomen.',
      steps: [
        'Bewaak uw klachten: houd bij of uw stemming na twee tot vier weken verbetert.',
        'Bespreek uw gevoelens met vertrouwde naasten of uw huisarts/POH-GGZ als de klachten aanhouden.',
        'Zorg voor een vast dagritme, voldoende daglicht en vermijd overmatige stress.'
      ]
    },
    {
      key: 'matig',
      min: 10,
      max: 14,
      label: 'Matige depressieve klachten',
      badge: 'Matige depressieve symptomen (10–14) — consultatie geadviseerd',
      tone: 'moderate',
      narrative: 'Uw score (10–14) overschrijdt de gevalideerde klinische drempel van de PHQ-9. Dit patroon wijst op een matige depressieve episode die vaak merkbare hinder oplevert in werk of relaties.',
      steps: [
        'Maak een afspraak met uw huisarts of praktijkondersteuner GGZ (POH-GGZ) voor een formele evaluatie.',
        'Neem dit afgedrukte rapport mee naar het consult als voorbereiding op het gesprek.',
        'Effectieve behandelopties (zoals cognitieve gedragstherapie of activering) kunnen een snelle verbetering bewerkstelligen.'
      ]
    },
    {
      key: 'matig-ernstig',
      min: 15,
      max: 19,
      label: 'Matig-ernstige depressieve klachten',
      badge: 'Matig-ernstige depressieve symptomen (15–19) — medische evaluatie vereist',
      tone: 'high',
      narrative: 'Uw score (15–19) duidt op aanzienlijke depressieve ontregeling. Professionele medische en psychologische begeleiding is dringend aanbevolen om herstel te ondersteunen.',
      steps: [
        'Neem contact op met uw huisarts voor een gerichte verwijzing naar de basis- of specialistische GGZ.',
        'Deel uw situatie met iemand in uw directe omgeving die u kan ondersteunen bij het maken van afspraken.',
        'Stel grote levensbeslissingen voorlopig uit en focus op rust en herstel.'
      ]
    },
    {
      key: 'ernstig',
      min: 20,
      max: 27,
      label: 'Ernstige depressieve klachten',
      badge: 'Ernstige depressieve symptomen (20–27) — acute professionele zorg aanbevolen',
      tone: 'high',
      narrative: 'Uw score (20–27) wijst op een ernstige depressieve episode met zware invloed op het dagelijks functioneren. Professionele interventie is noodzakelijk.',
      steps: [
        'Neem vandaag nog contact op met uw huisarts of de regionale huisartsenpost.',
        'Vraag een naaste om u te vergezellen naar medische afspraken.',
        'Blijf niet alleen met zware gevoelens rondlopen; professionele hulp is effectief en beschikbaar.'
      ]
    }
  ];

  const state = {
    currentStep: 0,
    answers: {},
    functional: undefined,
    transitionTimer: null,
    transitionLocked: false,
    crisisAcknowledged: false,
    sessionId: '',
    startedAt: null
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

  function axisLabel(axis) {
    if (axis === 'affective') return 'Stemming & Emotionele beleving';
    if (axis === 'somatic') return 'Lichamelijke & neurovegetatieve symptomen';
    if (axis === 'cognitive') return 'Cognitief functioneren & focus';
    return 'Dagelijkse belemmering & functioneren';
  }

  function axisShort(axis) {
    if (axis === 'affective') return 'Stemming';
    if (axis === 'somatic') return 'Somatisch';
    if (axis === 'cognitive') return 'Cognitief';
    return 'Functioneel';
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
      item.id === 10 ? 'Aanvullende vraag' : `Vraag ${item.id} van 9`;
    $('question-part').textContent =
      item.id === 10 ? 'Dagelijkse impact · Functionele belemmering' : 'PHQ-9 · Afgelopen 2 weken';
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
      state.currentStep === TOTAL_STEPS - 1 ? 'Bekijk uitslag' : 'Volgende vraag';

    announce(`Stap ${stepNumber} van ${TOTAL_STEPS}. ${item.text}`);
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);

    // Crisis interlock: Question 9 positive triggers crisis modal
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
   * Crisis interstitial — triggers ONLY when item 9 is endorsed
   * ---------------------------------------------------------------- */

  function openCrisisInterstitial() {
    const panel = $('crisis-interstitial');
    if (!panel) return;
    $('questionnaire-section')?.classList.add('hidden');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusTarget = $('crisis-continue');
    if (focusTarget) focusTarget.focus({ preventScroll: true });
    announce('Belangrijke hulpbronnen beschikbaar. Bekijk deze alstublieft voor u doorgaat.');
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
    if (ratio >= 0.45) return 'Verhoogd';
    if (ratio >= 0.22) return 'Licht verhoogd';
    return 'Lage score';
  }

  function displayResults() {
    const results = calculateScores();

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Only show emergency crisis banner on results if item 9 was positive
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
      results.functional === null ? 'Niet ingevuld' : FUNCTIONAL_OPTIONS[results.functional].label;

    $('algorithm-status').textContent = results.meetsAlgorithm
      ? 'Vervuld — patroon consistent met een depressieve episode volgens DSM-5 criteria'
      : results.meetsCutoff
        ? 'Drempelwaarde overschreden (≥10), maar niet alle algoritmische criteria vervuld'
        : 'Niet vervuld';

    $('cutoff-status').textContent = results.meetsCutoff
      ? 'Op of boven de klinische drempel van 10'
      : 'Onder de klinische drempel van 10';

    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Stemming & emotionele beleving (V1, V2, V6)', results.axisTotals.affective, 9],
      ['Lichamelijke symptomen & energie (V3, V4, V5)', results.axisTotals.somatic, 9],
      ['Cognitief functioneren & psychomotoriek (V7, V8, V9)', results.axisTotals.cognitive, 9],
      ['Symptoombreedte (aantal items met score ≥ 2)', results.elevatedItems, 9]
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
        ${active ? '<span class="severity-marker">Uw positie</span>' : ''}
      </div>`;
    }).join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 27 — ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'Op of boven de drempelwaarde van 10'
      : 'Onder de drempelwaarde van 10';
    $('print-algorithm').textContent = results.meetsAlgorithm ? 'Criteria vervuld' : 'Criteria niet vervuld';
    $('print-affective').textContent = `${results.axisTotals.affective} / 9`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9`;
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 9`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Niet beantwoord'
        : FUNCTIONAL_OPTIONS[results.functional].label;
    $('print-item9').textContent = results.item9Flag
      ? `POSITIEF BEANTWOORD — ${LIKERT_OPTIONS[results.item9].label}`
      : 'Niet van toepassing (score 0)';

    const crisisRow = $('print-crisis-row');
    if (crisisRow) crisisRow.classList.toggle('hidden', !results.item9Flag);

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        const flagged = q.id === 9 && value >= 1;
        return `<tr${flagged ? ' class="flagged"' : ''}><td>${q.id}</td><td>${axisShort(q.axis)}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>10</td><td>Functioneel</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '—' : results.functional}</td><td>${results.functional === null ? 'Niet ingevuld' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `Ik heb de FreeIQExam PHQ-9 depressie zelftest afgerond. Score: ${results.total}/27 (${results.band.label}). Dit is een indicatieve screening, geen medische diagnose.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam PHQ-9 Depressie Zelftest', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Samenvatting gekopieerd naar klembord.');
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
      showToast('Samenvatting gekopieerd naar klembord.');
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
    announce('Zelftest opnieuw gestart.');
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
      // Crisis interstitial captures keys when modal is open
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
