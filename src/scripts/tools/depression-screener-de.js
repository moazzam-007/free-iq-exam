(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * PHQ-9 — Patient Health Questionnaire 9-Item Modul (Deutsch)
   * Spitzer, Williams & Kroenke. Standardisiertes Selbstbeurteilungsinstrument
   * für die letzten 2 Wochen (0–27 Punkte) plus funktionale Zusatzfrage.
   *
   * Dieser Selbsttest liefert ausschließlich orientierende Information.
   * Er ersetzt keine ärztliche oder psychotherapeutische Diagnose.
   * ------------------------------------------------------------------ */

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Überhaupt nicht', detail: '0 Tage' },
    { value: 1, label: 'An einzelnen Tagen', detail: '1–6 Tage' },
    { value: 2, label: 'An mehr als der Hälfte der Tage', detail: '7–11 Tage' },
    { value: 3, label: 'Beinahe jeden Tag', detail: '12–14 Tage' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Überhaupt nicht erschwert', detail: 'Keine Beeinträchtigung' },
    { value: 1, label: 'Etwas erschwert', detail: 'Leichte Beeinträchtigung' },
    { value: 2, label: 'Sehr erschwert', detail: 'Deutliche Beeinträchtigung' },
    { value: 3, label: 'Extrem erschwert', detail: 'Schwere Beeinträchtigung' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'affective',
      context: 'Wenig Interesse oder Freude an Tätigkeiten',
      text: 'Wenig Interesse oder Freude an Ihren Tätigkeiten (Anhedonie)'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Niedergeschlagenheit, Schwermut oder Hoffnungslosigkeit',
      text: 'Niedergeschlagenheit, Schwermut oder Hoffnungslosigkeit'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Schwierigkeiten beim Ein- oder Durchschlafen oder vermehrtes Schlafen',
      text: 'Schwierigkeiten beim Ein- oder Durchschlafen oder vermehrtes Schlafen (Schlafmuster)'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Müdigkeit oder Gefühl, keine Energie zu haben',
      text: 'Müdigkeit oder Gefühl, keine Energie zu haben (Fatigue)'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Verminderter Appetit oder übermäßiges Bedürfnis zu essen',
      text: 'Verminderter Appetit oder übermäßiges Bedürfnis zu essen (Appetitveränderung)'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Schlechte Meinung von sich selbst oder Gefühl, ein Versager zu sein',
      text: 'Schlechte Meinung von sich selbst — das Gefühl, ein Versager zu sein oder die Familie enttäuscht zu haben'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Schwierigkeiten bei der Konzentration (z. B. beim Lesen oder Fernsehen)',
      text: 'Schwierigkeiten, sich auf Dinge zu konzentrieren, wie das Lesen der Zeitung oder Fernsehen'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Auffällige Verlangsamung oder psychomotorische Unruhe',
      text: 'Waren Ihre Bewegungen oder Ihre Sprache so verlangsamt, dass es anderen aufgefallen ist? Oder waren Sie im Gegenteil so unruhig oder rastlos, dass Sie mehr als sonst umhergelaufen sind?'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Gedanken, dass Sie lieber tot wären oder sich ein Leid antun möchten',
      text: 'Gedanken, dass Sie lieber tot wären oder sich in irgendeiner Weise ein Leid antun möchten',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Zusatzfrage · Beeinträchtigung im Alltag',
    text: 'Falls Sie eines oder mehrere dieser Probleme angegeben haben: Wie sehr haben diese Probleme es Ihnen erschwert, Ihre Arbeit zu erledigen, Dinge im Haushalt zu regeln oder mit anderen Menschen auszukommen?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimal',
      min: 0,
      max: 4,
      label: 'Minimale oder keine depressiven Symptome',
      badge: 'Minimale oder keine depressiven Symptome',
      tone: 'minimal',
      summary: 'Ihre Antworten liegen unterhalb der Schwelle für eine klinisch relevante depressive Verstimmung.',
      narrative:
        'Ihr Gesamtergebnis liegt im minimalen Bereich (0–4 Punkte). Dies deutet darauf hin, dass Sie in den letzten zwei Wochen keine oder nur sehr vereinzelte depressive Kernsymptome erlebt haben. Eine fachliche Behandlung ist bezogen auf dieses Ergebnis derzeit nicht angezeigt.',
      steps: [
        'Auf Basis dieses orientierenden Ergebnisses ist derzeit keine therapeutische Intervention indiziert.',
        'Sollten Sie sich dennoch emotional belastet fühlen, hören Sie auf Ihr Wohlbefinden — ein numerischer Score spiegelt nicht jede persönliche Lebenslage wider.',
        'Wiederholen Sie die Selbstprüfung, falls sich Schlaf, Stimmung, Motivation oder Energielevel spürbar verschlechtern.',
        'Pflegen Sie protektive Alltagsroutinen: verlässlicher Schlafrhythmus, Tageslicht, moderate Bewegung und stabiler sozialer Austausch.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Leichte depressive Symptomatik',
      badge: 'Leichte depressive Symptomatik',
      tone: 'mild',
      summary: 'Sie haben mehrere Symptome in geringer bis moderater Häufigkeit angegeben.',
      narrative:
        'Ein Ergebnis von 5 bis 9 Punkten deutet auf eine milde depressive Symptomatik hin. Oft reagieren diese Anzeichen gut auf strukturierte Verhaltensanpassungen, Stressreduktion und verbesserte Schlafhygiene. Wachsame Beobachtung („Watchful Waiting“) ist in diesem Bereich eine etablierte Vorgehensweise.',
      steps: [
        'Aktive Selbstbeobachtung: Dokumentieren Sie, ob die Beschwerden nachlassen oder sich verfestigen.',
        'Verhaltensaktivierung: Planen Sie kleine, machbare Aktivitäten ein, die Ihnen früher Freude bereitet haben.',
        'Regelmäßiger Schlafrhythmus: Feste Aufstehzeiten stabilisieren die zirkadiane Rhythmik zuverlässiger als variables Zubettgehen.',
        'Wiederholen Sie die Orientierung in 2 bis 4 Wochen. Konsultieren Sie einen Hausarzt, falls die Belastung im Alltag zunimmt.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Mittelgradige depressive Symptomatik',
      badge: 'Mittelgradig — ärztliche / therapeutische Abklärung empfohlen',
      tone: 'moderate',
      summary: 'Ihr Wert erreicht den klinischen PHQ-9 Schwellenwert von 10 Punkten für eine depressive Episode.',
      narrative:
        'Ein Score von 10 bis 14 Punkten überschreitet den in Validierungsstudien etablierten Schwellenwert (Sensitivität und Spezifität ca. 88 % für eine depressive Störung). Wir empfehlen Ihnen, das Ergebnis ärztlich oder psychotherapeutisch abklären zu lassen, um gezielte Unterstützungsmöglichkeiten zu besprechen.',
      steps: [
        'Vereinbaren Sie einen Termin bei Ihrer Hausarztpraxis oder einer psychotherapeutischen Sprechstunde.',
        'Nehmen Sie diesen Ausdruck oder die Zusammenfassung als strukturierte Gesprächsgrundlage mit.',
        'Evidenzbasierte Psychotherapie (z. B. kognitive Verhaltenstherapie) ist auf dieser Stufe sehr wirksam.',
        'Sprechen Sie offen mit einer Vertrauensperson über Ihre Belastung, um emotionale Entlastung zu finden.'
      ]
    },
    {
      key: 'moderately_severe',
      min: 15,
      max: 19,
      label: 'Mittelschwere depressive Symptomatik',
      badge: 'Mittelschwer — fachärztliche Behandlung indiziert',
      tone: 'moderately-severe',
      summary: 'Ihr Wert weist auf eine deutliche und behandlungsbedürftige depressive Belastung hin.',
      narrative:
        'Ein Punktwert von 15 bis 19 Punkten signalisiert eine ausgeprägte depressive Symptomatik, die funktionale Alltagsbereiche typischerweise spürbar einschränkt. Eine fachärztliche (psychiatrische) oder psychotherapeutische Untersuchung wird dringend empfohlen.',
      steps: [
        'Wenden Sie sich zeitnah an einen Facharzt für Psychiatrie und Psychotherapie oder eine psychiatrische Institutsambulanz.',
        'In Deutschland können Sie die Terminservicestelle der Kassenärztlichen Vereinigung unter 116 117 für kurzfristige Termine nutzen.',
        'Kombinierte Behandlungsansätze aus leitliniengerechter Psychotherapie und medikamentöser Unterstützung zeigen hier die besten Erfolge.',
        'Bitten Sie Angehörige oder Freunde um praktische Unterstützung bei Terminvereinbarungen.'
      ]
    },
    {
      key: 'severe',
      min: 20,
      max: 27,
      label: 'Schwere depressive Symptomatik',
      badge: 'Schwer — umgehende fachärztliche Vorstellung erforderlich',
      tone: 'severe',
      summary: 'Ihr Wert deutet auf eine schwere depressive Episode hin, die sofortige professionelle Hilfe erfordert.',
      narrative:
        'Ein Wert ab 20 Punkten zeigt eine erhebliche, potenziell krisenhafte depressive Symptomlast an. Hier ist eine zeitnahe professionelle Versorgung durch einen Facharzt, eine Notfallambulanz oder ein Krisenzentrum unerlässlich.',
      steps: [
        'Suchen Sie zeitnah eine psychiatrische Ambulanz oder Ihren Arzt auf.',
        'In akuten seelischen Notlagen steht Ihnen in Deutschland die TelefonSeelsorge (0800 111 0 111 / 0800 111 0 222) kostenfrei rund um die Uhr zur Verfügung.',
        'In Österreich erreichen Sie die Telefonseelsorge unter 142, in der Schweiz Die Dargebotene Hand unter 143.',
        'Bei akuter Selbstgefährdung wählen Sie sofort den Notruf 112.'
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
    return `PHQ9-DE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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

  function renderQuestion() {
    const item = currentItem();
    const options = currentOptions();
    const selected = currentValue();
    const stepNumber = state.currentStep + 1;

    $('question-number').textContent =
      item.id === 10 ? 'Zusatzfrage' : `Frage ${item.id} von 9`;
    $('question-part').textContent =
      item.id === 10 ? 'Zusatzfrage · Alltagsbeeinträchtigung' : 'PHQ-9 · Letzte 2 Wochen';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    $('progress-fill').style.width = `${Math.max(4, (stepNumber / TOTAL_STEPS) * 100)}%`;
    $('progress-label').textContent = `${Math.round((answered / TOTAL_STEPS) * 100)} % beantwortet`;

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
      state.currentStep === TOTAL_STEPS - 1 ? 'Auswertung anzeigen' : 'Nächste Frage';

    announce(`Frage ${stepNumber} von ${TOTAL_STEPS}. ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'affective') return 'Affektiv · Stimmung & Freude';
    if (axis === 'somatic') return 'Somatisch · Schlaf, Energie & Appetit';
    if (axis === 'cognitive') return 'Kognitiv & Psychomotorisch · Fokus & Antrieb';
    return 'Funktional · Beeinträchtigung im Alltag';
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);

    // Safety Interstitial: Any endorsement of item 9 triggers safety modal
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

  function openCrisisInterstitial() {
    const panel = $('crisis-interstitial');
    if (!panel) return;
    $('questionnaire-section')?.classList.add('hidden');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusTarget = $('crisis-continue');
    if (focusTarget) focusTarget.focus({ preventScroll: true });
    announce('Wichtige Hilfsangebote im Notfall verfügbar. Bitte vor dem Fortfahren lesen.');
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

  function calculateScores() {
    let total = 0;
    let affectiveRaw = 0;
    let somaticRaw = 0;
    let cognitiveRaw = 0;

    QUESTIONS.forEach((q) => {
      const val = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      total += val;
      if (q.axis === 'affective') affectiveRaw += val;
      else if (q.axis === 'somatic') somaticRaw += val;
      else if (q.axis === 'cognitive') cognitiveRaw += val;
    });

    const band = SEVERITY_BANDS.find((b) => total >= b.min && total <= b.max) || SEVERITY_BANDS[0];
    const selfHarmEndorsed = (state.answers[9] || 0) > 0;
    const functionalScore = Number.isFinite(state.functional) ? state.functional : 0;

    return {
      total,
      band,
      affectiveRaw,
      somaticRaw,
      cognitiveRaw,
      selfHarmEndorsed,
      functionalScore,
      functionalLabel: FUNCTIONAL_OPTIONS[functionalScore]?.label || 'Nicht angegeben'
    };
  }

  function displayResults() {
    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const results = calculateScores();

    const badgeEl = $('result-badge');
    badgeEl.className = `result-badge ${results.band.tone}`;
    badgeEl.textContent = results.band.badge;

    $('result-classification').textContent = `${results.band.label} (${results.total} von 27 Punkten)`;
    $('result-narrative').textContent = results.band.narrative;

    $('total-score').textContent = `${results.total} / 27`;
    $('total-bar').style.width = `${(results.total / 27) * 100}%`;
    $('total-status').textContent = results.band.label;

    $('affective-score').textContent = `${results.affectiveRaw} / 9`;
    $('affective-bar').style.width = `${(results.affectiveRaw / 9) * 100}%`;

    $('somatic-score').textContent = `${results.somaticRaw} / 9`;
    $('somatic-bar').style.width = `${(results.somaticRaw / 9) * 100}%`;

    $('cognitive-score').textContent = `${results.cognitiveRaw} / 9`;
    $('cognitive-bar').style.width = `${(results.cognitiveRaw / 9) * 100}%`;

    $('functional-status').textContent = results.functionalLabel;

    // Safety Banner in Results
    const crisisBanner = $('crisis-banner');
    if (crisisBanner) {
      crisisBanner.classList.toggle('hidden', !results.selfHarmEndorsed);
    }

    const recList = $('recommendations-list');
    if (recList) {
      recList.innerHTML = results.band.steps.map((step) => `<li>${step}</li>`).join('');
    }

    $('report-date').textContent = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total}/27 Punkte — ${results.band.label}`;
    $('print-affective').textContent = `${results.affectiveRaw}/9 Punkte`;
    $('print-somatic').textContent = `${results.somaticRaw}/9 Punkte`;
    $('print-cognitive').textContent = `${results.cognitiveRaw}/9 Punkte`;
    $('print-functional').textContent = results.functionalLabel;
    $('print-self-harm').textContent = results.selfHarmEndorsed ? 'Positiv (Sicherheitsflag)' : '0 (Nicht genannt)';

    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const val = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      return `<tr><td>${q.id}</td><td>${axisLabel(q.axis)}</td><td>${LIKERT_OPTIONS[val].label}</td><td>${val}</td></tr>`;
    }).join('') + (state.functional !== undefined
      ? `<tr><td>10</td><td>Alltagsbeeinträchtigung</td><td>${FUNCTIONAL_OPTIONS[state.functional].label}</td><td>${state.functional}</td></tr>`
      : '');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Ich habe den FreeIQExam PHQ-9 Selbsttest absolviert. Gesamtwert: ${results.total}/27 (${results.band.label}). Dies ist eine orientierende Selbstauskunft, keine medizinische Diagnose.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam PHQ-9 Selbsttest Ergebnis', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Ergebniszusammenfassung kopiert.');
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
      showToast('Ergebniszusammenfassung kopiert.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Kopieren nicht unterstützt.');
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
    state.sessionId = sessionId();
    state.startedAt = Date.now();
    state.crisisAcknowledged = false;

    $('results-section').classList.add('hidden');
    $('crisis-interstitial').classList.add('hidden');
    $('crisis-banner')?.classList.add('hidden');
    $('questionnaire-section').classList.remove('hidden');
    $('assessment-intro').classList.add('hidden');

    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    if (!$('depression-app')) return;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', () => {
      $('assessment-intro').classList.add('hidden');
      $('questionnaire-section').classList.remove('hidden');
      renderQuestion();
    });
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('crisis-continue')?.addEventListener('click', closeCrisisInterstitial);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if (typing || $('questionnaire-section')?.classList.contains('hidden')) return;

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
    $('crisis-interstitial').classList.add('hidden');
    renderQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
