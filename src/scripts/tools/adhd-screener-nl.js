(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Nooit' },
    { value: 1, label: 'Zelden' },
    { value: 2, label: 'Soms' },
    { value: 3, label: 'Vaak' },
    { value: 4, label: 'Zeer vaak' }
  ];

  const QUESTIONS = [
    { id: 1, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Project completion', text: 'Hoe vaak heeft u moeite om de laatste details van een project af te ronden, nu de moeilijke delen al klaar zijn?' },
    { id: 2, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Organization and planning', text: 'Hoe vaak heeft u moeite om dingen in de juiste volgorde te zetten wanneer een taak organisatie vereist?' },
    { id: 3, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Prospective memory', text: 'Hoe vaak heeft u moeite om afspraken of verplichtingen in uw herinnering bij te houden?' },
    { id: 4, part: 'A', domain: 'inattentive', shadedMin: 3, context: 'Task initiation', text: 'Als een taak veel nadenken vereist, hoe vaak vermijd of uitstelt u dan het begin ervan?' },
    { id: 5, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Motor restlessness', text: 'Hoe vaak frict u of beweegt u met uw handen of voeten als u lang moet zitten?' },
    { id: 6, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Internal restlessness', text: 'Hoe vaak voel jij je te actief en alsof een motor je dwingt om dingen te doen?' }
  ];

  const state = {
    currentIndex: 0,
    answers: {},
    transitionTimer: null,
    transitionLocked: false,
    sessionId: ''
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return 'ASRS-NL-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
  }

  function announce(message) {
    const live = document.getElementById('adhd-live-region');
    if (live) live.textContent = message;
  }

  function answeredCount() {
    return Object.keys(state.answers).length;
  }

  function renderQuestion() {
    const q = QUESTIONS[state.currentIndex];
    const selected = state.answers[q.id];
    const total = QUESTIONS.length;
    const progress = ((state.currentIndex) / total) * 100;

    document.getElementById('question-number').textContent = 'Vraag ' + q.id + ' van ' + total;
    document.getElementById('question-part').textContent = 'Deel A';
    document.getElementById('question-domain').textContent = q.domain === 'inattentive' ? 'Onopmerkzaamheid' : 'Hyperactiviteit / Impulsiviteit';
    document.getElementById('question-heading').textContent = q.text;
    document.getElementById('question-context').textContent = q.context;
    document.getElementById('progress-fill').style.width = Math.max(4, progress) + '%';
    document.getElementById('progress-label').textContent = Math.round((answeredCount() / total) * 100) + ' beantwoord';

    const options = document.getElementById('likert-options');
    options.innerHTML = '';

    OPTIONS.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'likert-option';
      const isClinical = option.value >= q.shadedMin;
      if (isClinical) button.classList.add('clinical-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', option.label + ': ' + q.text);
      const badgeHtml = isClinical ? '<span class="likert-clinical-badge">Klinische zone</span>' : '';
      button.innerHTML = '<span class="likert-key">' + (option.value + 1) + '</span>' +
        '<span class="likert-label">' + option.label + '</span>' + badgeHtml;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    document.getElementById('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    document.getElementById('next-button').disabled = selected === undefined || state.transitionLocked;
    document.getElementById('next-button').textContent = state.currentIndex === total - 1 ? 'Questionnaire voltooien' : 'Volgende vraag';
    announce('Vraag ' + q.id + ' van ' + total + '. ' + q.text);
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
        finishQuestionnaire();
      }
    }, 200);
  }

  function goNext() {
    if (state.transitionLocked) return;
    const q = QUESTIONS[state.currentIndex];
    if (state.answers[q.id] === undefined) return;

    if (state.currentIndex < QUESTIONS.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
    } else {
      finishQuestionnaire();
    }
  }

  function goBack() {
    if (state.transitionLocked) return;
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  }

  function finishQuestionnaire() {
    document.getElementById('questionnaire-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    document.getElementById('results-session-id').textContent = state.sessionId;
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    displayResults();
  }

  function calculateScores() {
    let partAShaded = 0;
    let inattentionRaw = 0;
    let inattentionShaded = 0;
    let hyperactivityRaw = 0;
    let hyperactivityShaded = 0;

    QUESTIONS.forEach((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      const shaded = value >= q.shadedMin;
      if (q.part === 'A' && shaded) partAShaded += 1;
      if (q.domain === 'inattentive') {
        inattentionRaw += value;
        if (shaded) inattentionShaded += 1;
      } else {
        hyperactivityRaw += value;
        if (shaded) hyperactivityShaded += 1;
      }
    });

    const partAPositive = partAShaded >= 4;
    const inattentionElevated = inattentionShaded >= 3;
    const hyperactivityElevated = hyperactivityShaded >= 2;

    let classification = 'Laag / subklinisch patroon';
    let badge = 'Lage klinische waarschijnlijkheid';
    let tone = 'low';

    if (partAPositive) {
      badge = 'Hoge waarschijnlijkheid -- klinische opvolging aanbevolen';
      tone = 'high';
      classification = inattentionElevated && hyperactivityElevated
        ? 'Gecombineerd symptoom-patroon'
        : inattentionElevated
          ? 'Vooral onopmerkzaam symptoom-patroon'
          : hyperactivityElevated
            ? 'Vooral hyperactief / impulsief symptoom-patroon'
            : 'Positief Deel-A screeningsresultaat';
    } else if (partAShaded >= 2 || inattentionElevated || hyperactivityElevated) {
      badge = 'Matig / opkomend';
      tone = 'moderate';
      classification = 'Opkomend of gemengd symptoom-patroon';
    }

    return {
      partAShaded,
      partAPositive,
      inattentionRaw,
      inattentionShaded,
      hyperactivityRaw,
      hyperactivityShaded,
      classification,
      badge,
      tone
    };
  }

  function domainLevel(shaded, total) {
    const ratio = shaded / total;
    if (ratio >= 0.67) return 'Sterk verhoogd';
    if (ratio >= 0.45) return 'Verhoogd';
    if (ratio >= 0.22) return 'Licht verhoogd';
    return 'Normaal';
  }

  function displayResults() {
    const results = calculateScores();

    const badgeEl = document.getElementById('result-badge');
    badgeEl.textContent = results.badge;
    badgeEl.className = 'result-badge ' + results.tone;

    document.getElementById('result-classification').textContent = results.classification;
    document.getElementById('result-narrative').textContent = results.partAPositive
      ? 'Uw Deel-A reacties overschrijden de drempel. Dit ondersteunt een gesprek met een gekwalificeerde klinicus; het is geen diagnose.'
      : results.tone === 'moderate'
        ? 'Uw reacties bevatten enkele verhoogde antwoorden maar overschrijden de drempel niet. Symptomen kunnen desondanks beleukend zijn bij lang bestand en functionele impact.'
        : 'Uw reacties blijven onder de drempel. Een lagere score sluit niet uit dat andere oorzaken bestaan voor aandacht-, organisatie- of executieve functieproblemen.';

    document.getElementById('part-a-score').textContent = results.partAShaded + ' / 6';
    document.getElementById('part-a-status').textContent = results.partAPositive ? 'Drempel gehaald' : 'Onder drempel';
    document.getElementById('part-a-bar').style.width = (results.partAShaded / 6 * 100) + '%';

    document.getElementById('inattention-score').textContent = domainLevel(results.inattentionShaded, 4);
    document.getElementById('inattention-num').textContent = results.inattentionShaded + ' / 4';
    document.getElementById('inattention-bar').style.width = (results.inattentionShaded / 4 * 100) + '%';

    document.getElementById('hyperactivity-score').textContent = domainLevel(results.hyperactivityShaded, 2);
    document.getElementById('hyperactivity-num').textContent = results.hyperactivityShaded + ' / 2';
    document.getElementById('hyperactivity-bar').style.width = (results.hyperactivityShaded / 2 * 100) + '%';

    const detailsToggle = document.getElementById('results-details-toggle');
    if (detailsToggle) {
      detailsToggle.classList.remove('hidden');
    }

    document.getElementById('results-session-id').textContent = sessionId();
  }

  function resetQuestionnaire() {
    state.currentIndex = 0;
    state.answers = {};
    state.transitionLocked = false;
    window.clearTimeout(state.transitionTimer);
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('questionnaire-section').classList.remove('hidden');
    renderQuestion();
  }

  function init() {
    state.sessionId = sessionId();
    renderQuestion();

    const startBtn = document.getElementById('adhd-start-button');
    if (startBtn) startBtn.addEventListener('click', () => {
      document.getElementById('adhd-intro').classList.add('hidden');
      document.getElementById('questionnaire-section').classList.remove('hidden');
      renderQuestion();
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  window.adhdNL = {
    goNext,
    goBack,
    selectAnswer,
    resetQuestionnaire,
    calculateScores,
    sessionId,
    init,
    state,
    OPTIONS,
    QUESTIONS
  };
})();
