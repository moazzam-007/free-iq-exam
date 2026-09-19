(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Никогда' },
    { value: 1, label: 'Редко' },
    { value: 2, label: 'Иногда' },
    { value: 3, label: 'Часто' },
    { value: 4, label: 'Очень часто' }
  ];

  const QUESTIONS = [
    { id: 1, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Завершение задач', text: 'Как часто вам трудно доводить до конца последние детали проекта, когда самая сложная часть уже сделана?' },
    { id: 2, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Планирование и организация', text: 'Как часто вам трудно привести дела в порядок, когда задача требует организованности?' },
    { id: 3, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Проспективная память', text: 'Как часто вы забываете о встречах или обязательствах?' },
    { id: 4, part: 'A', domain: 'inattentive', shadedMin: 3, context: 'Инициация задачи', text: 'Когда перед вами задача, требующая серьёзных размышлений, как часто вы избегаете её или откладываете начало?' },
    { id: 5, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Двигательное беспокойство', text: 'Как часто вы ёрзаете руками или ногами, когда приходится долго сидеть?' },
    { id: 6, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Внутреннее беспокойство', text: 'Как часто вы чувствуете себя чрезмерно активным и вынужденным что-то делать, будто вас приводит в движение мотор?' },
    { id: 7, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Внимание к деталям', text: 'Как часто вы допускаете небрежные ошибки, когда работаете над скучным или сложным проектом?' },
    { id: 8, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Устойчивое внимание', text: 'Как часто вам трудно удерживать внимание на скучной или монотонной работе?' },
    { id: 9, part: 'B', domain: 'inattentive', shadedMin: 2, context: 'Слушание и внимание', text: 'Как часто вам трудно сосредоточиться на том, что вам говорят, даже если обращаются напрямую?' },
    { id: 10, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Бытовая организация', text: 'Как часто вы теряете вещи или не можете найти их дома или на работе?' },
    { id: 11, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Отвлекаемость', text: 'Как часто вас отвлекает активность или шум вокруг?' },
    { id: 12, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Ситуативное беспокойство', text: 'Как часто вы встаёте с места на совещаниях или в других ситуациях, где нужно оставаться сидящим?' },
    { id: 13, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Психомоторное беспокойство', text: 'Как часто вы ощущаете беспокойство или неусидчивость?' },
    { id: 14, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Трудность расслабления', text: 'Как часто вам трудно расслабиться и отдохнуть, когда есть свободное время?' },
    { id: 15, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Речевая активность', text: 'Как часто вы замечаете, что слишком много говорите в социальных ситуациях?' },
    { id: 16, part: 'B', domain: 'hyperactive', shadedMin: 2, context: 'Разговорная импульсивность', text: 'В разговоре как часто вы заканчиваете предложения собеседника раньше, чем он успевает это сделать сам?' },
    { id: 17, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Импульсивность и ожидание', text: 'Как часто вам трудно дождаться своей очереди в ситуациях, где очередь требуется?' },
    { id: 18, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Торможение поведения', text: 'Как часто вы перебиваете других, когда они заняты?' }
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

    $('question-number').textContent = `Вопрос ${q.id} из ${total}`;
    $('question-part').textContent = q.part === 'A' ? 'Часть A · Основной клинический скрининг' : 'Часть B · Дополнительный перечень симптомов';
    $('question-domain').textContent = q.domain === 'inattentive' ? 'Невнимательность' : 'Гиперактивность / импульсивность';
    $('question-heading').textContent = q.text;
    $('question-context').textContent = q.context;
    $('progress-fill').style.width = `${Math.max(4, progress)}%`;
    $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)}% отвечено`;

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
        
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Завершить опросник' : 'Следующий вопрос';
    announce(`Вопрос ${q.id} из ${total}. ${q.text}`);
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

    let classification = 'Низкий / субклинический паттерн';
    let badge = 'Низкая клиническая вероятность';
    let tone = 'low';

    if (partAPositive) {
      badge = 'Высокая вероятность - рекомендуется клиническое наблюдение';
      tone = 'high';
      classification = inattentionElevated && hyperactivityElevated
        ? 'Смешанный паттерн симптомов'
        : inattentionElevated
          ? 'Преимущественно невнимательный паттерн'
          : hyperactivityElevated
            ? 'Преимущественно гиперактивно-импульсивный паттерн'
            : 'Положительный скрининг части A';
    } else if (partAShaded >= 2 || inattentionElevated || hyperactivityElevated) {
      badge = 'Умеренный / формирующийся';
      tone = 'moderate';
      classification = 'Формирующийся или смешанный паттерн симптомов';
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

    cognitive.stimulusActive = false;
    cognitive.stimulusType = null;
    cognitive.responded = false;

    target.classList.remove('opacity-0', 'go', 'nogo', 'responded');
    target.classList.add('idle');
    $('cognitive-target-label').textContent = 'Ожидание…';
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

    cognitive.stimulusActive = true;
    cognitive.stimulusType = type;
    cognitive.responded = false;
    cognitive.stimulusStart = performance.now();

    target.classList.remove('opacity-0', 'idle', 'go', 'nogo', 'responded');
    target.classList.add(type);
    $('cognitive-target-label').textContent = type === 'go' ? 'НАЖМИТЕ' : 'НЕ НАЖИМАТЬ';

    cognitive.stimulusTimer = window.setTimeout(() => {
      if (!state.cognitiveRunning || !state.cognitive || cognitive.responded) return;

      cognitive.stimulusActive = false;
      cognitive.stimulusType = null;
      target.classList.remove('go', 'nogo', 'responded');
      target.classList.add('idle');
      $('cognitive-target-label').textContent = 'Ожидание…';

      if (type === 'go') cognitive.omissionErrors += 1;
      cognitive.trial += 1;
      scheduleCognitiveTrial();
    }, 800);
  }

  function handleCognitiveInput() {
    const cognitive = state.cognitive;

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
      $('cognitive-target-label').textContent = 'Ожидание…';
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
    if (ratio >= 0.67) return 'Выраженно повышенный уровень';
    if (ratio >= 0.45) return 'Повышенный уровень';
    if (ratio >= 0.22) return 'Незначительно повышенный уровень';
    return 'Низкая выраженность';
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
      ? 'Ваши ответы в части A достигают порога скрининга, используемого в этой реализации. Это обосновывает обсуждение симптоматики с квалифицированным клиницистом, но не устанавливает диагноз.'
      : results.tone === 'moderate'
        ? 'В ваших ответах есть несколько повышенных оценок, но порог скрининга части A не достигнут. Симптомы могут оставаться значимыми, если они стойкие или нарушают функционирование.'
        : 'Ваши ответы ниже порога скрининга части A. Низкий результат скрининга не исключает всех причин трудностей с вниманием, организацией или исполнительными функциями.';

    $('part-a-score').textContent = `${results.partAShaded} / 6`;
    $('part-a-status').textContent = results.partAPositive ? 'Порог достигнут' : 'Ниже порога';
    $('inattention-score').textContent = `${results.inattentionRaw} / 36`;
    $('hyperactivity-score').textContent = `${results.hyperactivityRaw} / 36`;
    $('inattention-status').textContent = domainLevel(results.inattentionShaded, 9);
    $('hyperactivity-status').textContent = domainLevel(results.hyperactivityShaded, 9);

    updateBar('part-a-bar', results.partAShaded, 6);
    updateBar('inattention-bar', results.inattentionRaw, 36);
    updateBar('hyperactivity-bar', results.hyperactivityRaw, 36);

    if (cognitive) {
      $('cognitive-result-card').classList.remove('hidden');
      $('cognitive-rt').textContent = `${cognitive.meanRT} мс`;
      $('cognitive-rtv').textContent = `${cognitive.rtv} мс`;
      $('cognitive-errors').textContent = `${cognitive.commissionErrors} / 5`;
      $('cognitive-omissions').textContent = `${cognitive.omissionErrors} / 15`;
    } else {
      $('cognitive-result-card').classList.add('hidden');
    }

    renderMatrix(results);
    $('report-date').textContent = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-part-a').textContent = `${results.partAShaded}/6 выделенных ответов - ${results.partAPositive ? 'порог достигнут' : 'ниже порога'}`;
    $('print-inattention').textContent = `${results.inattentionRaw}/36 (${results.inattentionShaded}/9 выделено)`;
    $('print-hyperactivity').textContent = `${results.hyperactivityRaw}/36 (${results.hyperactivityShaded}/9 выделено)`;
    $('print-cognitive').textContent = cognitive
      ? `Среднее ВР ${cognitive.meanRT} мс · вариабельность ВР ${cognitive.rtv} мс · ошибки комиссии ${cognitive.commissionErrors}/5 · пропуски ${cognitive.omissionErrors}/15`
      : 'Пропущено';
    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      return `<tr><td>${q.id}</td><td>${q.part}</td><td>${q.domain === 'inattentive' ? 'Невнимательность' : 'Гиперактивность / импульсивность'}</td><td>${OPTIONS[value].label}</td></tr>`;
    }).join('');
  }

  function renderMatrix(results) {
    const axes = [
      ['Завершение задач', (results.inattentionShaded / 9) * 100],
      ['Организация', ((results.inattentionRaw / 36) + (results.inattentionShaded / 9)) * 50],
      ['Устойчивое внимание', (results.inattentionRaw / 36) * 100],
      ['Двигательное беспокойство', (results.hyperactivityShaded / 9) * 100],
      ['Разговорное торможение', (results.hyperactivityRaw / 36) * 100],
      ['Ожидание / терпение', ((results.hyperactivityShaded / 9) + (results.hyperactivityRaw / 36)) * 50]
    ];

    $('profile-matrix').innerHTML = axes.map(([label, raw]) => {
      const value = Math.round(Math.max(0, Math.min(100, raw)));
      return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value}%</strong></div><div class="matrix-track"><span style="width:${value}%"></span></div></div>`;
    }).join('');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Я прошёл скрининг СДВГ для взрослых на FreeIQExam. Часть A: ${results.partAShaded}/6. Результат: ${results.badge}. Это информация скрининга, а не диагноз.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Скрининг СДВГ - FreeIQExam', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Сводка скрининга скопирована.');
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
      showToast('Сводка скрининга скопирована.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Отправка недоступна.');
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