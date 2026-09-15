(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Never' },
    { value: 1, label: 'Rarely' },
    { value: 2, label: 'Sometimes' },
    { value: 3, label: 'Often' },
    { value: 4, label: 'Very Often' }
  ];

  const QUESTIONS = [
    { id: 1, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Executive task completion', text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?' },
    { id: 2, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Planning and organization', text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?' },
    { id: 3, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Prospective memory', text: 'How often do you have problems remembering appointments or obligations?' },
    { id: 4, part: 'A', domain: 'inattentive', shadedMin: 3, context: 'Task initiation', text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?' },
    { id: 5, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Motor restlessness', text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?' },
    { id: 6, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Internal restlessness', text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?' },
    { id: 7, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Attention to detail', text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?' },
    { id: 8, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Sustained attention', text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?' },
    { id: 9, part: 'B', domain: 'inattentive', shadedMin: 2, context: 'Listening and attentional gating', text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?' },
    { id: 10, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Everyday organization', text: 'How often do you misplace or have difficulty finding things at home or at work?' },
    { id: 11, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Distractibility', text: 'How often are you distracted by activity or noise around you?' },
    { id: 12, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Situational restlessness', text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?' },
    { id: 13, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Psychomotor restlessness', text: 'How often do you feel restless or fidgety?' },
    { id: 14, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Difficulty downshifting', text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?' },
    { id: 15, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Verbal activity', text: 'How often do you find yourself talking too much when you are in social situations?' },
    { id: 16, part: 'B', domain: 'hyperactive', shadedMin: 2, context: 'Conversational impulsivity', text: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?" },
    { id: 17, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Impatience and inhibition', text: 'How often do you have difficulty waiting your turn in situations when turn taking is required?' },
    { id: 18, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Behavioral inhibition', text: 'How often do you interrupt others when they are busy?' }
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
    return `ASRS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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

    $('question-number').textContent = `Question ${q.id} of ${total}`;
    $('question-part').textContent = q.part === 'A' ? 'Part A · Core Clinical Screener' : 'Part B · Additional Symptom Inventory';
    $('question-domain').textContent = q.domain === 'inattentive' ? 'Inattention' : 'Hyperactivity / Impulsivity';
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
      const isClinical = option.value >= q.shadedMin;
      if (isClinical) button.classList.add('clinical-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', `${option.label}: ${q.text}`);
      button.innerHTML = `
        <span class="likert-key">${option.value + 1}</span>
        <span class="likert-label">${option.label}</span>
        ${isClinical ? '<span class="likert-clinical-badge">Clinical Zone</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Finish questionnaire' : 'Next question';
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

    let classification = 'Low / sub-clinical pattern';
    let badge = 'Low clinical likelihood';
    let tone = 'low';

    if (partAPositive) {
      badge = 'High likelihood — clinical follow-up recommended';
      tone = 'high';
      classification = inattentionElevated && hyperactivityElevated
        ? 'Combined symptom pattern'
        : inattentionElevated
          ? 'Predominantly inattentive symptom pattern'
          : hyperactivityElevated
            ? 'Predominantly hyperactive / impulsive symptom pattern'
            : 'Positive Part A screen';
    } else if (partAShaded >= 2 || inattentionElevated || hyperactivityElevated) {
      badge = 'Moderate / emerging';
      tone = 'moderate';
      classification = 'Emerging or mixed symptom pattern';
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
        return;
      }
      window.clearInterval(state.cognitive.countdownTimer);
      $('cognitive-countdown').classList.add('hidden');
      $('cognitive-target').classList.remove('opacity-0');
      scheduleCognitiveTrial();
    }, 700);
  }

  function scheduleCognitiveTrial() {
    if (!state.cognitiveRunning || !state.cognitive) return;

    if (state.cognitive.trial >= state.cognitive.trials.length) {
      finishCognitive();
      return;
    }

    const cognitive = state.cognitive;
    const target = $('cognitive-target');

    window.clearTimeout(cognitive.presentationTimer);
    window.clearTimeout(cognitive.stimulusTimer);

    // Critical invariant: any inter-trial period has no active stimulus.
    cognitive.stimulusActive = false;
    cognitive.stimulusType = null;
    cognitive.responded = false;

    target.classList.remove('opacity-0', 'go', 'nogo', 'responded');
    target.classList.add('idle');
    $('cognitive-target-label').textContent = 'Wait…';
    $('cognitive-trial').textContent = `${cognitive.trial + 1} / ${cognitive.trials.length}`;
    $('cognitive-progress-fill').style.width = `${(cognitive.trial / cognitive.trials.length) * 100}%`;

    cognitive.presentationTimer = window.setTimeout(() => {
      presentCognitiveStimulus(cognitive.trials[cognitive.trial]);
    }, 500 + Math.random() * 600);
  }

  function presentCognitiveStimulus(type) {
    if (!state.cognitiveRunning || !state.cognitive) return;

    const cognitive = state.cognitive;
    const target = $('cognitive-target');

    // Critical invariant: only presentCognitiveStimulus can activate input.
    cognitive.stimulusActive = true;
    cognitive.stimulusType = type;
    cognitive.responded = false;
    cognitive.stimulusStart = performance.now();

    target.classList.remove('opacity-0', 'idle', 'go', 'nogo', 'responded');
    target.classList.add(type);
    $('cognitive-target-label').textContent = type === 'go' ? 'GO' : 'NO-GO';

    cognitive.stimulusTimer = window.setTimeout(() => {
      if (!state.cognitiveRunning || !state.cognitive || cognitive.responded) return;

      cognitive.stimulusActive = false;
      cognitive.stimulusType = null;
      target.classList.remove('go', 'nogo', 'responded');
      target.classList.add('idle');
      $('cognitive-target-label').textContent = 'Wait…';

      if (type === 'go') cognitive.omissionErrors += 1;
      cognitive.trial += 1;
      scheduleCognitiveTrial();
    }, 800);
  }

  function handleCognitiveInput() {
    const cognitive = state.cognitive;

    // Critical fix: never accept input during the inter-trial / waiting state.
    if (
      !state.cognitiveRunning ||
      !cognitive ||
      !cognitive.stimulusActive ||
      cognitive.responded
    ) {
      return;
    }

    const type = cognitive.stimulusType;
    const rt = performance.now() - cognitive.stimulusStart;

    cognitive.responded = true;
    cognitive.stimulusActive = false;
    window.clearTimeout(cognitive.stimulusTimer);

    if (type === 'go') {
      cognitive.responseTimes.push(rt);
    } else {
      cognitive.commissionErrors += 1;
    }

    $('cognitive-target').classList.add('responded');

    window.setTimeout(() => {
      if (!state.cognitiveRunning || !state.cognitive) return;
      cognitive.stimulusType = null;
      cognitive.trial += 1;
      $('cognitive-target').classList.remove('responded', 'go', 'nogo');
      $('cognitive-target').classList.add('idle');
      $('cognitive-target-label').textContent = 'Wait…';
      scheduleCognitiveTrial();
    }, 120);
  }

  function finishCognitive() {
    if (!state.cognitive) {
      displayResults();
      return;
    }

    const cognitive = state.cognitive;
    cognitive.stimulusActive = false;
    window.clearTimeout(cognitive.presentationTimer);
    window.clearTimeout(cognitive.stimulusTimer);
    window.clearInterval(cognitive.countdownTimer);

    const rts = cognitive.responseTimes;
    const mean = rts.length ? rts.reduce((a, b) => a + b, 0) / rts.length : 0;
    const variance = rts.length > 1
      ? rts.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / (rts.length - 1)
      : 0;

    cognitive.stats = {
      meanRT: Math.round(mean),
      rtv: Math.round(Math.sqrt(variance)),
      commissionErrors: cognitive.commissionErrors,
      omissionErrors: cognitive.omissionErrors
    };

    state.cognitiveRunning = false;
    state.cognitive = cognitive;
    $('cognitive-progress-fill').style.width = '100%';
    $('cognitive-section').classList.add('hidden');
    displayResults();
  }

  function skipCognitive() {
    if (state.cognitive) {
      window.clearTimeout(state.cognitive.presentationTimer);
      window.clearTimeout(state.cognitive.stimulusTimer);
      window.clearInterval(state.cognitive.countdownTimer);
    }
    state.cognitiveRunning = false;
    state.cognitive = null;
    $('cognitive-section').classList.add('hidden');
    displayResults();
  }

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function domainLevel(shaded, total) {
    const ratio = shaded / total;
    if (ratio >= 0.67) return 'Markedly elevated';
    if (ratio >= 0.45) return 'Elevated';
    if (ratio >= 0.22) return 'Mildly elevated';
    return 'Lower endorsement';
  }

  function displayResults() {
    const results = calculateScores();
    const cognitive = state.cognitive?.stats || null;

    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const badge = $('result-badge');
    badge.textContent = results.badge;
    badge.className = `result-badge ${results.tone}`;

    $('result-classification').textContent = results.classification;
    $('result-narrative').textContent = results.partAPositive
      ? 'Your Part A responses meet the screening threshold used by this implementation. This supports discussing the symptom pattern with a qualified clinician; it does not establish a diagnosis.'
      : results.tone === 'moderate'
        ? 'Your responses include several elevated endorsements but do not meet the Part A screening threshold. Symptoms may still be meaningful when they are persistent or impairing.'
        : 'Your responses fall below the Part A screening threshold. A lower screen does not rule out every cause of attention, organization, or executive-function difficulty.';

    $('part-a-score').textContent = `${results.partAShaded} / 6`;
    $('part-a-status').textContent = results.partAPositive ? 'Threshold met' : 'Below threshold';
    $('inattention-score').textContent = `${results.inattentionRaw} / 36`;
    $('hyperactivity-score').textContent = `${results.hyperactivityRaw} / 36`;
    $('inattention-status').textContent = domainLevel(results.inattentionShaded, 9);
    $('hyperactivity-status').textContent = domainLevel(results.hyperactivityShaded, 9);

    updateBar('part-a-bar', results.partAShaded, 6);
    updateBar('inattention-bar', results.inattentionRaw, 36);
    updateBar('hyperactivity-bar', results.hyperactivityRaw, 36);

    if (cognitive) {
      $('cognitive-result-card').classList.remove('hidden');
      $('cognitive-rt').textContent = `${cognitive.meanRT} ms`;
      $('cognitive-rtv').textContent = `${cognitive.rtv} ms`;
      $('cognitive-errors').textContent = `${cognitive.commissionErrors} / 5`;
      $('cognitive-omissions').textContent = `${cognitive.omissionErrors} / 15`;
    } else {
      $('cognitive-result-card').classList.add('hidden');
    }

    renderMatrix(results);
    $('report-date').textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-part-a').textContent = `${results.partAShaded}/6 shaded responses — ${results.partAPositive ? 'threshold met' : 'below threshold'}`;
    $('print-inattention').textContent = `${results.inattentionRaw}/36 (${results.inattentionShaded}/9 shaded)`;
    $('print-hyperactivity').textContent = `${results.hyperactivityRaw}/36 (${results.hyperactivityShaded}/9 shaded)`;
    $('print-cognitive').textContent = cognitive
      ? `Mean RT ${cognitive.meanRT} ms · RTV ${cognitive.rtv} ms · commission errors ${cognitive.commissionErrors}/5 · omissions ${cognitive.omissionErrors}/15`
      : 'Skipped';
    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      return `<tr><td>${q.id}</td><td>${q.part}</td><td>${q.domain === 'inattentive' ? 'Inattention' : 'Hyperactivity / Impulsivity'}</td><td>${OPTIONS[value].label}</td></tr>`;
    }).join('');
  }

  function renderMatrix(results) {
    const axes = [
      ['Task completion', (results.inattentionShaded / 9) * 100],
      ['Organization', ((results.inattentionRaw / 36) + (results.inattentionShaded / 9)) * 50],
      ['Sustained attention', (results.inattentionRaw / 36) * 100],
      ['Motor restlessness', (results.hyperactivityShaded / 9) * 100],
      ['Conversational inhibition', (results.hyperactivityRaw / 36) * 100],
      ['Turn-taking / patience', ((results.hyperactivityShaded / 9) + (results.hyperactivityRaw / 36)) * 50]
    ];

    $('profile-matrix').innerHTML = axes.map(([label, raw]) => {
      const value = Math.round(Math.max(0, Math.min(100, raw)));
      return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value}%</strong></div><div class="matrix-track"><span style="width:${value}%"></span></div></div>`;
    }).join('');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `I completed the FreeIQExam Adult ADHD Screener. Part A: ${results.partAShaded}/6. Result: ${results.badge}. This is screening information, not a diagnosis.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam ADHD Screener', text, url: window.location.href });
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
