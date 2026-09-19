(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Nooit' },
    { value: 1, label: 'Zelden' },
    { value: 2, label: 'Soms' },
    { value: 3, label: 'Vaak' },
    { value: 4, label: 'Zeer vaak' }
  ];

  // WHO ASRS v1.1 Deel A — 6 gevalideerde kernvragen
  const QUESTIONS = [
    { id: 1, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Projectafronding & details', text: 'Hoe vaak heeft u moeite om de laatste details van een project af te ronden, nadat de uitdagende onderdelen al zijn gedaan?' },
    { id: 2, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Organisatie & planning', text: 'Hoe vaak heeft u moeite om zaken op volgorde te organiseren wanneer u een taak moet structureren?' },
    { id: 3, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Geheugen voor afspraken', text: 'Hoe vaak heeft u problemen om afspraken of verplichtingen te onthouden?' },
    { id: 4, part: 'A', domain: 'inattentive', shadedMin: 3, context: 'Uitstelgedrag & taakstart', text: 'Wanneer u een taak heeft die veel denkwerk vereist, hoe vaak vermijdt u deze dan of stelt u het begin ervan uit?' },
    { id: 5, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Motorische onrust', text: 'Hoe vaak friemelt of wiebelt u met uw handen of voeten wanneer u langdurig stil moet zitten?' },
    { id: 6, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Innerlijke gedrevenheid', text: 'Hoe vaak voelt u zich overmatig actief en gedreven alsof u door een motor wordt voortgestuwd?' }
  ];

  const state = {
    currentIndex: 0,
    answers: {},
    transitionTimer: null,
    transitionLocked: false,
    cognitive: null,
    cognitiveRunning: false,
    sessionId: '',
    startedAt: null
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `ASRS-NL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('adhd-live-region');
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

    if ($('question-number')) $('question-number').textContent = `Vraag ${q.id} van ${total}`;
    if ($('question-part')) $('question-part').textContent = 'Deel A · Oriënterende kernscreening';
    if ($('question-domain')) $('question-domain').textContent = q.domain === 'inattentive' ? 'Aandacht & Concentratie' : 'Hyperactiviteit & Impulsinhibitie';
    if ($('question-heading')) $('question-heading').textContent = q.text;
    if ($('question-context')) $('question-context').textContent = q.context;
    if ($('progress-fill')) $('progress-fill').style.width = `${Math.max(4, progress)}%`;
    if ($('progress-label')) $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)} % beantwoord`;

    const options = $('likert-options');
    if (options) {
      options.innerHTML = '';
      OPTIONS.forEach((option) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'likert-option';
        const isClinical = option.value >= q.shadedMin;
        if (isClinical) button.classList.add('clinical-zone');
        if (selected === option.value) button.classList.add('selected');
        button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
        button.setAttribute('aria-label', `${option.label}: ${q.text}`);
        const badgeHtml = isClinical ? '<span class="likert-clinical-badge">Klinische drempel</span>' : '';
        button.innerHTML = `<span class="likert-key">${option.value + 1}</span>` +
          `<span class="likert-label">${option.label}</span>${badgeHtml}`;
        button.addEventListener('click', () => selectAnswer(option.value));
        options.appendChild(button);
      });
    }

    if ($('back-button')) $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    if ($('next-button')) {
      $('next-button').disabled = selected === undefined || state.transitionLocked;
      $('next-button').textContent = state.currentIndex === total - 1 ? 'Naar prestatiemeting' : 'Volgende vraag';
    }
    announce(`Vraag ${q.id} van ${total}. ${q.text}`);
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
    $('questionnaire-section')?.classList.add('hidden');
    $('cognitive-section')?.classList.remove('hidden');
    $('cognitive-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    announce('Vragenlijst voltooid. U kunt nu de optionele Go/No-Go benchmark starten of overslaan.');
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
      if (shaded) partAShaded += 1;
      if (q.domain === 'inattentive') {
        inattentionRaw += value;
        if (shaded) inattentionShaded += 1;
      } else {
        hyperactivityRaw += value;
        if (shaded) hyperactivityShaded += 1;
      }
    });

    const partAPositive = partAShaded >= 4;
    const inattentionElevated = inattentionShaded >= 2;
    const hyperactivityElevated = hyperactivityShaded >= 2;

    let classification = 'Subklinisch patroon';
    let badge = 'Lage waarschijnlijkheid';
    let tone = 'low';

    if (partAPositive) {
      badge = 'Verhoogde waarschijnlijkheid';
      tone = 'high';
      classification = inattentionElevated && hyperactivityElevated
        ? 'Gecombineerd ADHD-symptoompatroon'
        : inattentionElevated
          ? 'Overwegend onoplettend patroon (ADD-type)'
          : hyperactivityElevated
            ? 'Overwegend hyperactief / impulsief patroon'
            : 'Positief Deel A screeningsresultaat';
    } else if (partAShaded >= 2) {
      badge = 'Matig / opmerkzaam';
      tone = 'moderate';
      classification = 'Enkele verhoogde kenmerken';
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

  // --- Go / No-Go Cognitive Benchmark ---
  function beginCognitive() {
    if (state.cognitiveRunning) return;

    state.cognitiveRunning = true;
    state.cognitive = {
      trial: 0,
      trials: [],
      responseTimes: [],
      commissionErrors: 0,
      omissionErrors: 0,
      stimulusActive: false,
      stimulusType: null,
      stimulusStart: 0,
      stimulusTimer: null,
      presentationTimer: null,
      countdownTimer: null,
      responded: false
    };

    const trials = [
      ...Array(15).fill('go'),
      ...Array(5).fill('nogo')
    ];

    for (let i = trials.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [trials[i], trials[j]] = [trials[j], trials[i]];
    }

    if (trials[0] !== 'go') {
      const firstGo = trials.indexOf('go');
      [trials[0], trials[firstGo]] = [trials[firstGo], trials[0]];
    }

    state.cognitive.trials = trials;
    $('cognitive-start-panel')?.classList.add('hidden');
    $('cognitive-countdown')?.classList.remove('hidden');
    $('cognitive-target')?.classList.add('opacity-0');

    let count = 3;
    if ($('cognitive-countdown')) $('cognitive-countdown').textContent = String(count);

    state.cognitive.countdownTimer = window.setInterval(() => {
      count -= 1;
      if (count > 0) {
        if ($('cognitive-countdown')) $('cognitive-countdown').textContent = String(count);
      } else {
        window.clearInterval(state.cognitive.countdownTimer);
        $('cognitive-countdown')?.classList.add('hidden');
        runCognitiveTrial();
      }
    }, 800);
  }

  function runCognitiveTrial() {
    if (!state.cognitiveRunning || !state.cognitive) return;

    const { trial, trials } = state.cognitive;
    if (trial >= trials.length) {
      finishCognitive();
      return;
    }

    if ($('cognitive-trial')) $('cognitive-trial').textContent = `${trial + 1} / ${trials.length}`;
    if ($('cognitive-progress-fill')) $('cognitive-progress-fill').style.width = `${((trial + 1) / trials.length) * 100}%`;

    const target = $('cognitive-target');
    const label = $('cognitive-target-label');
    if (target) target.className = 'mx-auto mt-10 flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border-2 border-zinc-300 bg-zinc-100 opacity-100 transition-transform duration-75 dark:border-zinc-700 dark:bg-zinc-900 idle';
    if (label) label.textContent = 'Wachten…';

    state.cognitive.stimulusActive = false;
    state.cognitive.responded = false;
    state.cognitive.stimulusType = trials[trial];

    const isi = Math.floor(700 + Math.random() * 800);

    state.cognitive.presentationTimer = window.setTimeout(() => {
      state.cognitive.stimulusActive = true;
      state.cognitive.stimulusStart = performance.now();

      if (state.cognitive.stimulusType === 'go') {
        if (target) target.className = 'mx-auto mt-10 flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border-2 opacity-100 transition-transform duration-75 target-go';
        if (label) label.textContent = 'DRUKKEN!';
      } else {
        if (target) target.className = 'mx-auto mt-10 flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border-2 opacity-100 transition-transform duration-75 target-nogo';
        if (label) label.textContent = 'STOP!';
      }

      state.cognitive.stimulusTimer = window.setTimeout(() => {
        if (state.cognitive && state.cognitive.stimulusActive) {
          if (state.cognitive.stimulusType === 'go' && !state.cognitive.responded) {
            state.cognitive.omissionErrors += 1;
          }
          state.cognitive.stimulusActive = false;
          state.cognitive.trial += 1;
          runCognitiveTrial();
        }
      }, 750);
    }, isi);
  }

  function handleCognitiveInput() {
    if (!state.cognitiveRunning || !state.cognitive || !state.cognitive.stimulusActive) return;

    const rt = performance.now() - state.cognitive.stimulusStart;
    state.cognitive.stimulusActive = false;
    state.cognitive.responded = true;
    window.clearTimeout(state.cognitive.stimulusTimer);

    const target = $('cognitive-target');
    if (target) target.classList.add('responded');

    if (state.cognitive.stimulusType === 'go') {
      state.cognitive.responseTimes.push(rt);
    } else {
      state.cognitive.commissionErrors += 1;
    }

    state.cognitive.trial += 1;
    window.setTimeout(() => {
      if (target) target.classList.remove('responded');
      runCognitiveTrial();
    }, 150);
  }

  function finishCognitive() {
    state.cognitiveRunning = false;
    const rts = state.cognitive.responseTimes;
    const meanRT = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : null;
    const variance = rts.length > 1
      ? rts.reduce((acc, val) => acc + Math.pow(val - meanRT, 2), 0) / rts.length
      : 0;
    const rtv = Math.round(Math.sqrt(variance));

    state.cognitive.meanRT = meanRT;
    state.cognitive.rtv = rtv;

    displayResults();
  }

  function skipCognitive() {
    if (state.cognitiveRunning && state.cognitive) {
      window.clearInterval(state.cognitive.countdownTimer);
      window.clearTimeout(state.cognitive.presentationTimer);
      window.clearTimeout(state.cognitive.stimulusTimer);
      state.cognitiveRunning = false;
    }
    state.cognitive = null;
    displayResults();
  }

  function displayResults() {
    const results = calculateScores();

    $('cognitive-section')?.classList.add('hidden');
    $('questionnaire-section')?.classList.add('hidden');
    $('results-section')?.classList.remove('hidden');
    $('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const badgeEl = $('result-badge');
    if (badgeEl) {
      badgeEl.textContent = results.badge;
      badgeEl.className = `result-badge ${results.tone}`;
    }

    if ($('result-classification')) $('result-classification').textContent = results.classification;
    if ($('result-narrative')) {
      $('result-narrative').textContent = results.partAPositive
        ? 'Uw antwoorden overschrijden de klinische drempel van de WHO ASRS Deel A (minimaal 4 van de 6 vragen in de klinische zone). Dit patroon is sterk indicatief voor volwassen ADHD en ondersteunt een diepgaand gesprek met uw huisarts of een gespecialiseerd psychiater/psycholoog.'
        : results.tone === 'moderate'
          ? 'Uw antwoorden vertonen enkele verhoogde kenmerken, maar bereiken de formele screeningsdrempel van Deel A niet. Indien u toch aanzienlijke hinder ondervindt in uw dagelijks functioneren of werk, kan een consultatie waardevol zijn.'
          : 'Uw antwoorden blijven onder de screeningsdrempel voor volwassen ADHD. Uw klachten worden op basis van dit instrument waarschijnlijk niet verklaard door ADHD, al kunnen andere oorzaken (zoals stress, slaaptekort of stemmingsproblemen) een rol spelen.';
    }

    if ($('part-a-score')) $('part-a-score').textContent = `${results.partAShaded} / 6`;
    if ($('part-a-status')) $('part-a-status').textContent = results.partAPositive ? 'Klinische drempel bereikt (≥ 4)' : 'Onder klinische drempel (< 4)';
    if ($('part-a-bar')) $('part-a-bar').style.width = `${(results.partAShaded / 6) * 100}%`;

    if ($('inattention-score')) $('inattention-score').textContent = `${results.inattentionShaded} / 4`;
    if ($('inattention-status')) $('inattention-status').textContent = `${results.inattentionShaded} van 4 in klinische zone`;
    if ($('inattention-bar')) $('inattention-bar').style.width = `${(results.inattentionShaded / 4) * 100}%`;

    if ($('hyperactivity-score')) $('hyperactivity-score').textContent = `${results.hyperactivityShaded} / 2`;
    if ($('hyperactivity-status')) $('hyperactivity-status').textContent = `${results.hyperactivityShaded} van 2 in klinische zone`;
    if ($('hyperactivity-bar')) $('hyperactivity-bar').style.width = `${(results.hyperactivityShaded / 2) * 100}%`;

    // Render matrix
    const matrix = $('profile-matrix');
    if (matrix) {
      matrix.innerHTML = '';
      QUESTIONS.forEach((q) => {
        const val = state.answers[q.id];
        const isShaded = val !== undefined && val >= q.shadedMin;
        const optLabel = val !== undefined ? OPTIONS[val].label : 'Niet beantwoord';
        const row = document.createElement('div');
        row.className = `p-4 rounded-2xl border ${isShaded ? 'border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/20' : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'} flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`;
        row.innerHTML = `
          <div>
            <div class="text-xs font-mono font-semibold text-zinc-500 uppercase">${q.domain === 'inattentive' ? 'Aandacht' : 'Hyperactiviteit'} · Vraag ${q.id}</div>
            <div class="text-sm font-bold text-zinc-900 dark:text-white mt-0.5">${q.context}</div>
            <div class="text-xs text-zinc-600 dark:text-zinc-400 mt-1">${q.text}</div>
          </div>
          <div class="text-right shrink-0">
            <span class="inline-block text-xs font-bold px-2.5 py-1 rounded-full ${isShaded ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}">${optLabel}</span>
          </div>
        `;
        matrix.appendChild(row);
      });
    }

    // Cognitive card
    if (state.cognitive && state.cognitive.meanRT !== null) {
      $('cognitive-result-card')?.classList.remove('hidden');
      if ($('cognitive-rt')) $('cognitive-rt').textContent = `${state.cognitive.meanRT} ms`;
      if ($('cognitive-rtv')) $('cognitive-rtv').textContent = `± ${state.cognitive.rtv} ms`;
      if ($('cognitive-errors')) $('cognitive-errors').textContent = `${state.cognitive.commissionErrors} / 5`;
      if ($('cognitive-omissions')) $('cognitive-omissions').textContent = `${state.cognitive.omissionErrors} / 15`;
    } else {
      $('cognitive-result-card')?.classList.add('hidden');
    }

    announce('Resultaten berekend en weergegeven.');
  }

  function shareResult() {
    const results = calculateScores();
    const text = `FreeIQExam ADHD Zelftest Resultaat (WHO ASRS v1.1)\nClassificatie: ${results.classification}\nDeel A score: ${results.partAShaded}/6 in klinische drempel\nSessie: ${state.sessionId}\nhttps://freeiqexam.com/nl/adhd-test`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        const toast = $('share-toast');
        if (toast) {
          toast.textContent = 'Uitslagsamenvatting gekopieerd naar klembord.';
          toast.classList.remove('opacity-0', 'translate-y-3');
          setTimeout(() => toast.classList.add('opacity-0', 'translate-y-3'), 3000);
        }
      });
    }
  }

  function resetAssessment() {
    state.currentIndex = 0;
    state.answers = {};
    state.transitionLocked = false;
    state.cognitive = null;
    state.cognitiveRunning = false;
    state.sessionId = sessionId();

    $('results-section')?.classList.add('hidden');
    $('cognitive-section')?.classList.add('hidden');
    $('questionnaire-section')?.classList.add('hidden');
    $('assessment-intro')?.classList.remove('hidden');
    $('assessment-intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    if (!$('adhd-app')) return;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    const sidEl = $('cognitive-session-id');
    if (sidEl) sidEl.textContent = state.sessionId;

    $('begin-assessment')?.addEventListener('click', () => {
      $('assessment-intro')?.classList.add('hidden');
      $('questionnaire-section')?.classList.remove('hidden');
      renderQuestion();
    });

    // Fallback ID support
    $('adhd-start-button')?.addEventListener('click', () => {
      $('assessment-intro')?.classList.add('hidden');
      $('adhd-intro')?.classList.add('hidden');
      $('questionnaire-section')?.classList.remove('hidden');
      renderQuestion();
    });

    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('begin-cognitive')?.addEventListener('click', beginCognitive);
    $('skip-cognitive')?.addEventListener('click', skipCognitive);

    $('cognitive-target')?.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      handleCognitiveInput();
    });

    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
      if (state.cognitiveRunning && event.code === 'Space') {
        event.preventDefault();
        handleCognitiveInput();
        return;
      }

      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if (typing || $('questionnaire-section')?.classList.contains('hidden')) return;

      if (['1', '2', '3', '4', '5'].includes(event.key)) {
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

    renderQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
