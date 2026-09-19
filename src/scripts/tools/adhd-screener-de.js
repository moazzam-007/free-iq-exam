(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Nie' },
    { value: 1, label: 'Selten' },
    { value: 2, label: 'Manchmal' },
    { value: 3, label: 'Oft' },
    { value: 4, label: 'Sehr oft' }
  ];

  const QUESTIONS = [
    { id: 1, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Projektabschluss', text: 'Wie oft haben Sie Schwierigkeiten, die letzten Details eines Projekts abzuschließen, nachdem die schwierigen Teile erledigt sind?' },
    { id: 2, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Organisation & Planung', text: 'Wie oft fällt es Ihnen schwer, Dinge in die richtige Reihenfolge zu bringen, wenn Sie eine Aufgabe organisieren müssen?' },
    { id: 3, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Prospektives Gedächtnis', text: 'Wie oft haben Sie Probleme, Termine oder Verpflichtungen im Gedächtnis zu behalten?' },
    { id: 4, part: 'A', domain: 'inattentive', shadedMin: 3, context: 'Aufgabenbeginn & Aufschub', text: 'Wenn Sie eine Aufgabe vor sich haben, die viel Nachdenken erfordert, wie oft vermeiden Sie es dann oder zögern das Beginnen hinaus?' },
    { id: 5, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Motorische Unruhe', text: 'Wie oft zappeln oder nesteln Sie mit Händen oder Füßen, wenn Sie lange stillsitzen müssen?' },
    { id: 6, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Innere Getriebenheit', text: 'Wie oft fühlen Sie sich übermäßig aktiv und wie von einem Motor angetrieben, Dinge zu tun?' },
    { id: 7, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Detailaufmerksamkeit', text: 'Wie oft unterlaufen Ihnen Flüchtigkeitsfehler, wenn Sie an einem langweiligen oder schwierigen Projekt arbeiten?' },
    { id: 8, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Daueraufmerksamkeit', text: 'Wie oft haben Sie Schwierigkeiten, Ihre Aufmerksamkeit bei langweiligen oder repetitiven Tätigkeiten aufrechtzuerhalten?' },
    { id: 9, part: 'B', domain: 'inattentive', shadedMin: 2, context: 'Fokussiertes Zuhören', text: 'Wie oft fällt es Ihnen schwer, sich darauf zu konzentrieren, was Menschen Ihnen sagen, selbst wenn diese direkt mit Ihnen sprechen?' },
    { id: 10, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Alltagsorganisation', text: 'Wie oft verlegen Sie Gegenstände zu Hause oder am Arbeitsplatz oder haben Schwierigkeiten, diese wiederzufinden?' },
    { id: 11, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Ablenkbarkeit', text: 'Wie oft lassen Sie sich durch Geräusche oder Aktivitäten in Ihrer Umgebung leicht ablenken?' },
    { id: 12, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Situative Unruhe', text: 'Wie oft verlassen Sie Ihren Platz in Meetings oder Situationen, in denen erwartet wird, dass Sie sitzen bleiben?' },
    { id: 13, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Innere Unruhe', text: 'Wie oft fühlen Sie sich innerlich unruhig oder rastlos?' },
    { id: 14, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Entspannungsfähigkeit', text: 'Wie oft fällt es Ihnen schwer, in Ihrer Freizeit zur Ruhe zu kommen und sich zu entspannen?' },
    { id: 15, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Sprachdrang', text: 'Wie oft ertappen Sie sich dabei, in sozialen Situationen übermäßig viel zu reden?' },
    { id: 16, part: 'B', domain: 'hyperactive', shadedMin: 2, context: 'Gesprächsimpulsivität', text: 'Wie oft beenden Sie im Gespräch die Sätze anderer Personen, bevor diese selbst fertig gesprochen haben?' },
    { id: 17, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Geduld & Warten', text: 'Wie oft fällt es Ihnen schwer abzuwarten, bis Sie an der Reihe sind, wenn Abwarten erforderlich ist?' },
    { id: 18, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Verhaltenshemmung', text: 'Wie oft unterbrechen Sie andere, wenn diese beschäftigt sind oder sich konzentrieren?' }
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
    return `ASRS-DE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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
    const progress = (state.currentIndex / total) * 100;

    $('question-number').textContent = `Frage ${q.id} von ${total}`;
    $('question-part').textContent = q.part === 'A' ? 'Teil A · Orientierendes Kernscreening' : 'Teil B · Vertiefende Symptomerfassung';
    $('question-domain').textContent = q.domain === 'inattentive' ? 'Unaufmerksamkeit' : 'Hyperaktivität / Impulsivität';
    $('question-heading').textContent = q.text;
    $('question-context').textContent = q.context;
    $('progress-fill').style.width = `${Math.max(4, progress)}%`;
    $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)} % beantwortet`;

    const options = $('likert-options');
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
      button.innerHTML = `
        <span class="likert-key">${option.value + 1}</span>
        <span class="likert-label">${option.label}</span>
        ${isClinical ? '<span class="likert-clinical-badge">Schwellenwert-Zone</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Fragebogen abschließen' : 'Nächste Frage';
    announce(`Frage ${q.id} von ${total}. ${q.text}`);
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
    $('questionnaire-section').classList.add('hidden');
    $('cognitive-section').classList.remove('hidden');
    const sidEl = $('cognitive-session-id');
    if (sidEl) sidEl.textContent = state.sessionId;
    $('cognitive-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const inattentionElevated = inattentionShaded >= 4;
    const hyperactivityElevated = hyperactivityShaded >= 4;

    let classification = 'Geringe Wahrscheinlichkeit / subklinisches Muster';
    let badge = 'Geringe klinische Wahrscheinlichkeit';
    let tone = 'low';

    if (partAPositive) {
      badge = 'Erhöhte Wahrscheinlichkeit — fachärztliche Abklärung empfohlen';
      tone = 'high';
      classification = inattentionElevated && hyperactivityElevated
        ? 'Kombiniertes Symptommuster (Unaufmerksamkeit & Hyperaktivität/Impulsivität)'
        : inattentionElevated
          ? 'Vorwiegend unaufmerksames Muster'
          : hyperactivityElevated
            ? 'Vorwiegend hyperaktiv-impulsives Muster'
            : 'Auffälliges Teil-A-Screening';
    } else if (partAShaded >= 2 || inattentionElevated || hyperactivityElevated) {
      badge = 'Moderates / grenzwertiges Muster';
      tone = 'moderate';
      classification = 'Grenzwertiges oder gemischtes Symptommuster';
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
    $('cognitive-start-panel').classList.add('hidden');
    $('cognitive-countdown').classList.remove('hidden');
    $('cognitive-target').classList.add('opacity-0');

    let count = 3;
    $('cognitive-countdown').textContent = String(count);

    state.cognitive.countdownTimer = window.setInterval(() => {
      count -= 1;
      if (count > 0) {
        $('cognitive-countdown').textContent = String(count);
      } else {
        window.clearInterval(state.cognitive.countdownTimer);
        $('cognitive-countdown').classList.add('hidden');
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

    $('cognitive-trial').textContent = `${trial + 1} / ${trials.length}`;
    $('cognitive-progress-fill').style.width = `${((trial + 1) / trials.length) * 100}%`;

    const target = $('cognitive-target');
    const label = $('cognitive-target-label');
    target.className = 'mx-auto mt-10 flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border-2 border-zinc-300 bg-zinc-100 opacity-100 transition-transform duration-75 dark:border-zinc-700 dark:bg-zinc-900 idle';
    label.textContent = 'Warten…';

    state.cognitive.stimulusActive = false;
    state.cognitive.responded = false;
    state.cognitive.stimulusType = trials[trial];

    const isi = Math.floor(700 + Math.random() * 800);

    state.cognitive.presentationTimer = window.setTimeout(() => {
      state.cognitive.stimulusActive = true;
      state.cognitive.stimulusStart = performance.now();

      if (state.cognitive.stimulusType === 'go') {
        target.className = 'mx-auto mt-10 flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border-2 opacity-100 transition-transform duration-75 target-go';
        label.textContent = 'DRÜCKEN!';
      } else {
        target.className = 'mx-auto mt-10 flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border-2 opacity-100 transition-transform duration-75 target-nogo';
        label.textContent = 'STOPP!';
      }

      state.cognitive.stimulusTimer = window.setTimeout(() => {
        if (state.cognitive.stimulusActive) {
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
    target.classList.add('responded');

    if (state.cognitive.stimulusType === 'go') {
      state.cognitive.responseTimes.push(rt);
    } else {
      state.cognitive.commissionErrors += 1;
    }

    state.cognitive.trial += 1;
    window.setTimeout(() => {
      target.classList.remove('responded');
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
      window.clearTimeout(state.cognitive.presentationTimer);
      window.clearTimeout(state.cognitive.stimulusTimer);
      window.clearInterval(state.cognitive.countdownTimer);
      state.cognitiveRunning = false;
    }
    state.cognitive = null;
    displayResults();
  }

  function displayResults() {
    $('cognitive-section').classList.add('hidden');
    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const results = calculateScores();
    const badgeEl = $('result-badge');
    badgeEl.className = `result-badge ${results.tone}`;
    badgeEl.textContent = results.badge;

    $('result-classification').textContent = results.classification;

    let narrative = '';
    if (results.partAPositive) {
      narrative = `Ihr Antwortmuster weist ${results.partAShaded} von 6 Kernsymptomen im Schwellenwertbereich von Teil A auf. Nach dem WHO ASRS v1.1-Framework ist dies ein starker Hinweis auf ein klinisch relevantes ADHS-Symptombild im Erwachsenenalter. Wir empfehlen Ihnen, dieses orientierende Ergebnis als strukturierte Grundlage für ein Gespräch mit einem Facharzt für Psychiatrie oder Psychotherapie zu nutzen.`;
    } else if (results.partAShaded >= 2) {
      narrative = `Sie haben ${results.partAShaded} von 6 Kernsymptomen in Teil A im Schwellenwertbereich angegeben. Dies liegt unterhalb der klassischen WHO-Schwelle für ein positives Screening, deutet jedoch auf einzelne spürbare Herausforderungen bei Aufmerksamkeit oder Impulskontrolle hin. Eine fachliche Beratung kann sinnvoll sein, falls Sie im Alltag deutliche Beeinträchtigungen erleben.`;
    } else {
      narrative = `Ihr Antwortprofil liegt mit ${results.partAShaded} von 6 Schwellenwert-Nennungen im unauffälligen Bereich. Die angegebenen Symptome erreichen nicht die Schwelle für ein auffälliges ADHS-Screening. Sollten dennoch Konzentrationsprobleme oder Erschöpfung Ihren Alltag belasten, können auch Stress, Schlafmangel oder andere Faktoren die Ursache sein.`;
    }

    $('result-narrative').textContent = narrative;
    $('part-a-score').textContent = `${results.partAShaded} / 6`;
    $('part-a-status').textContent = results.partAPositive ? 'Schwellenwert erreicht' : 'Unter Schwellenwert';
    $('part-a-bar').style.width = `${(results.partAShaded / 6) * 100}%`;

    $('inattention-score').textContent = `${results.inattentionRaw} / 36`;
    $('inattention-status').textContent = `${results.inattentionShaded} von 9 im Schwellenwert`;
    $('inattention-bar').style.width = `${(results.inattentionRaw / 36) * 100}%`;

    $('hyperactivity-score').textContent = `${results.hyperactivityRaw} / 36`;
    $('hyperactivity-status').textContent = `${results.hyperactivityShaded} von 9 im Schwellenwert`;
    $('hyperactivity-bar').style.width = `${(results.hyperactivityRaw / 36) * 100}%`;

    const cognitive = state.cognitive;
    if (cognitive && cognitive.meanRT) {
      $('cognitive-result-card').classList.remove('hidden');
      $('cognitive-rt').textContent = `${cognitive.meanRT} ms`;
      $('cognitive-rtv').textContent = `±${cognitive.rtv} ms`;
      $('cognitive-errors').textContent = `${cognitive.commissionErrors} / 5`;
      $('cognitive-omissions').textContent = `${cognitive.omissionErrors} / 15`;
    } else {
      $('cognitive-result-card').classList.add('hidden');
    }

    renderMatrix(results);
    $('report-date').textContent = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-part-a').textContent = `${results.partAShaded}/6 Schwellenwert-Antworten — ${results.partAPositive ? 'Kriterium erfüllt' : 'Unter Schwellenwert'}`;
    $('print-inattention').textContent = `${results.inattentionRaw}/36 Rohpunkte (${results.inattentionShaded}/9 im Schwellenwert)`;
    $('print-hyperactivity').textContent = `${results.hyperactivityRaw}/36 Rohpunkte (${results.hyperactivityShaded}/9 im Schwellenwert)`;
    $('print-cognitive').textContent = cognitive && cognitive.meanRT
      ? `Mittlere RT ${cognitive.meanRT} ms · RTV ±${cognitive.rtv} ms · Fehler bei Nicht-Reaktion ${cognitive.commissionErrors}/5 · Auslassungen ${cognitive.omissionErrors}/15`
      : 'Übersprungen';
    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      return `<tr><td>${q.id}</td><td>${q.part}</td><td>${q.domain === 'inattentive' ? 'Unaufmerksamkeit' : 'Hyperaktivität / Impulsivität'}</td><td>${OPTIONS[value].label}</td></tr>`;
    }).join('');
  }

  function renderMatrix(results) {
    const axes = [
      ['Projektabschluss & Umsetzung', (results.inattentionShaded / 9) * 100],
      ['Organisation & Alltagsstruktur', ((results.inattentionRaw / 36) + (results.inattentionShaded / 9)) * 50],
      ['Daueraufmerksamkeit & Fokus', (results.inattentionRaw / 36) * 100],
      ['Motorische & innere Unruhe', (results.hyperactivityShaded / 9) * 100],
      ['Gesprächsimpulsivität & Sprachdrang', (results.hyperactivityRaw / 36) * 100],
      ['Geduld & Wartenkönnen', ((results.hyperactivityShaded / 9) + (results.hyperactivityRaw / 36)) * 50]
    ];

    $('profile-matrix').innerHTML = axes.map(([label, raw]) => {
      const value = Math.round(Math.max(0, Math.min(100, raw)));
      return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value} %</strong></div><div class="matrix-track"><span style="width:${value}%"></span></div></div>`;
    }).join('');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Ich habe den FreeIQExam ADHS-Selbsttest für Erwachsene (WHO ASRS v1.1) absolviert. Teil A: ${results.partAShaded}/6. Ergebnis: ${results.badge}. Dies ist ein orientierendes Screening, keine medizinische Diagnose.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam ADHS-Selbsttest Ergebnis', text, url: window.location.href });
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
    if (state.cognitive) {
      window.clearTimeout(state.cognitive.presentationTimer);
      window.clearTimeout(state.cognitive.stimulusTimer);
      window.clearInterval(state.cognitive.countdownTimer);
    }

    state.currentIndex = 0;
    state.answers = {};
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.cognitive = null;
    state.cognitiveRunning = false;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('results-section').classList.add('hidden');
    $('cognitive-section').classList.add('hidden');
    $('cognitive-start-panel').classList.remove('hidden');
    $('cognitive-countdown').classList.add('hidden');
    $('cognitive-target').classList.add('opacity-0');
    $('questionnaire-section').classList.remove('hidden');
    $('assessment-intro').classList.add('hidden');

    const sidEl = $('cognitive-session-id');
    if (sidEl) sidEl.textContent = state.sessionId;

    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    if (!$('adhd-app')) return;
    state.sessionId = sessionId();
    state.startedAt = Date.now();
    const sidEl = $('cognitive-session-id');
    if (sidEl) sidEl.textContent = state.sessionId;

    $('begin-assessment')?.addEventListener('click', () => {
      $('assessment-intro').classList.add('hidden');
      $('questionnaire-section').classList.remove('hidden');
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

    $('questionnaire-section').classList.add('hidden');
    $('cognitive-section').classList.add('hidden');
    $('results-section').classList.add('hidden');
    renderQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
