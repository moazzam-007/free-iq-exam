(() => {
  'use strict';

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Совсем нет', detail: '0 дней' },
    { value: 1, label: 'Несколько дней', detail: '1–6 дней' },
    { value: 2, label: 'Более половины дней', detail: '7–11 дней' },
    { value: 3, label: 'Почти каждый день', detail: '12–14 дней' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Совсем не трудно', detail: 'Нет нарушений' },
    { value: 1, label: 'Немного трудно', detail: 'Лёгкие нарушения' },
    { value: 2, label: 'Очень трудно', detail: 'Выраженные нарушения' },
    { value: 3, label: 'Крайне трудно', detail: 'Тяжёлые нарушения' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'affective',
      context: 'Ангедония · снижение чувствительности к вознаграждению',
      text: 'Слабый интерес или удовольствие от занятий'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Подавленное настроение · стойкий негативный аффект',
      text: 'Подавленность, депрессия или безнадёжность'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Нарушение сна · бессонница или гиперсомния',
      text: 'Трудности с засыпанием или поддержанием сна, либо слишком долгий сон'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Утомляемость · снижение доступной энергии',
      text: 'Чувство усталости или недостаток энергии'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Нарушение аппетита · недоедание или переедание',
      text: 'Плохой аппетит или переедание'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Обесценивание себя и чрезмерное чувство вины',
      text: 'Плохое мнение о себе - ощущение неудачи или того, что вы подвели себя или свою семью'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Нарушение концентрации · когнитивная нагрузка',
      text: 'Трудности с концентрацией, например при чтении газеты или просмотре телевизора'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Психомоторное возбуждение или заторможенность',
      text: 'Движения или речь настолько замедлены, что это могли заметить другие - либо наоборот, такая суетливость или беспокойство, что вы двигались гораздо больше обычного'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Критически важный пункт · самоповреждение и суицидальные мысли',
      text: 'Мысли о том, что вам лучше было бы умереть, или о том, чтобы причинить себе вред',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Дополнительный пункт · нарушение функционирования',
    text: 'Если вы отметили какие-либо проблемы, насколько трудно вам было из-за них работать, заниматься домашними делами или ладить с другими людьми?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimal',
      min: 0,
      max: 4,
      label: 'Минимальная или отсутствует',
      badge: 'Минимальные симптомы депрессии или их отсутствие',
      tone: 'minimal',
      summary: 'Ваши ответы ниже порога, обычно связанного с клинически значимой депрессией.',
      narrative:
        'Ваш суммарный балл находится в минимальном диапазоне. Это означает, что вы отметили мало депрессивных симптомов или отметили их лишь изредка за последние две недели. Балл в этом диапазоне не означает, что тяжёлые переживания неважны - он означает, что паттерн симптомов, который оценивает эта методика, сейчас не повышен.',
      steps: [
        'На основании одного этого балла лечение не показано.',
        'Если вам всё ещё тяжело, балл - не вся история. Стойкое страдание заслуживает разговора с клиницистом независимо от числа.',
        'Повторите скрининг, если настроение, сон, энергия или интерес к повседневной жизни заметно изменятся.',
        'Поддерживайте базовые вещи, защищающие настроение: стабильное время сна и пробуждения, дневное освещение, аэробную активность и регулярное общение.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Лёгкая депрессия',
      badge: 'Лёгкие депрессивные симптомы',
      tone: 'mild',
      summary: 'Вы отметили несколько симптомов с низкой частотой. Это ниже стандартного порога лечения, но выше полностью чистого скрининга.',
      narrative:
        'Балл в лёгком диапазоне лучше всего читать как ранний сигнал, а не как приговор. Симптомы на этом уровне часто хорошо отвечают на структурированное поведенческое и lifestyle-вмешательство, и выжидательная тактика - законная клиническая стратегия, при условии, что за симптомами действительно наблюдают. Повторите скрининг через две-четыре недели, чтобы увидеть, стабилизируется паттерн или закрепляется.',
      steps: [
        'Выжидательная тактика на этом уровне разумна, но она должна быть активной: отслеживайте симптомы, а не ждите ухудшения.',
        'Помогает поведенческая активация. Планируйте небольшие, достижимые, ранее приятные занятия, даже когда мотивация ещё не пришла - мотивация обычно следует за действием, а не предшествует ему.',
        'Берегите архитектуру сна. Стабильное время пробуждения закрепляет циркадный ритм эффективнее, чем стабильное время отхода ко сну.',
        'Аэробные упражнения умеренной интенсивности дают измеримый антидепрессивный эффект при этой степени тяжести.',
        'Повторите скрининг через две-четыре недели и обратитесь за клиническим советом, если балл растёт или повседневное функционирование ухудшается.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Умеренная депрессия',
      badge: 'Умеренная депрессия - рекомендуется клиническая оценка',
      tone: 'moderate',
      summary: 'Ваш балл достигает стандартного порога PHQ-9, равного 10, для вероятной большой депрессии.',
      narrative:
        'Балл 10 и выше - наиболее широко валидированный порог PHQ-9, с объединённой чувствительностью и специфичностью около 88% для большого депрессивного расстройства относительно структурированного клинического интервью. На этом уровне рекомендуется формальная клиническая оценка. Это точка, в которой обычно рассматривается структурированная психотерапия или фармакотерапия, и точка, в которой баланс пользы и выжидательной тактики смещается в сторону активного лечения.',
      steps: [
        'Организуйте клиническую оценку у врача первичного звена, психиатра или психолога.',
        'Возьмите с собой копию этой сводки. Структурированная запись симптомов сокращает оценку и повышает точность диагностики.',
        'Научно обоснованная психотерапия - особенно КПТ и поведенческая активация - имеет сильную поддержку при этой степени тяжести.',
        'Обсудите, уместны ли лекарства с учётом вашей истории, и спросите об ожидаемом времени начала действия, которое обычно составляет две-четыре недели.',
        'Повторяйте скрининг каждые две недели, если начнёте лечение, чтобы ответ можно было измерить, а не угадывать.'
      ]
    },
    {
      key: 'moderately-severe',
      min: 15,
      max: 19,
      label: 'Умеренно тяжёлая депрессия',
      badge: 'Умеренно тяжёлая депрессия - показано активное лечение',
      tone: 'high',
      summary: 'Ваш балл значительно выше диагностического порога и находится в диапазоне, где показано активное лечение.',
      narrative:
        'Баллы в этом диапазоне связаны с высокой вероятностью большого депрессивного расстройства и с существенным нарушением функционирования. На этом уровне комбинированное лечение - психотерапия плюс фармакотерапия - обычно превосходит каждое по отдельности, а риск отсутствия лечения значителен. Если вы справлялись с этим без профессиональной поддержки, этот балл - ясный сигнал, что баланс изменился.',
      steps: [
        'Как можно скорее обратитесь за клинической оценкой, а не наблюдайте за этим самостоятельно.',
        'Комбинированная психотерапия и фармакотерапия - обычный подход первой линии при этой степени тяжести.',
        'Спросите своего клинициста о пункте функциональных нарушений в этой сводке - он фиксирует нарушения, которые не отражает один лишь суммарный балл.',
        'Если сон, аппетит или энергия заметно ухудшились, или если вы перестали справляться с базовым самообслуживанием, скажите об этом прямо на приёме.',
        'Не прекращайте и не меняйте назначенные лекарства, не поговорив сначала с назначившим их специалистом.'
      ]
    },
    {
      key: 'severe',
      min: 20,
      max: 27,
      label: 'Тяжёлая депрессия',
      badge: 'Тяжёлая депрессия - незамедлительная комплексная оценка',
      tone: 'severe',
      summary: 'Ваш балл находится в самой тяжёлой полосе PHQ-9.',
      narrative:
        'Балл 20 и выше отражает тяжёлое бремя симптомов и связан с высокой вероятностью большого депрессивного расстройства, выраженным нарушением функционирования и повышенным риском. Это требует незамедлительной комплексной медицинской и психиатрической оценки. Тяжесть на этом уровне - не недостаток характера и не навсегда - это излечимое клиническое состояние, но оно требует лечения, а не самопомощи.',
      steps: [
        'Как можно скорее организуйте комплексную медицинскую и психиатрическую оценку. Если не удаётся быстро записаться на приём, обратитесь на кризисную линию или в службу неотложной помощи.',
        'Попросите доверенного человека помочь с записью на приёмы и транспортом. Тяжёлая депрессия нарушает именно те исполнительные функции, которые нужны для организации помощи.',
        'Стандартом является комбинированная фармакотерапия и психотерапия, и ваш клиницист может обсудить другие вмешательства, такие как ЭСТ или лечение на основе кетамина, при тяжёлых или резистентных формах.',
        'Передайте копию этой сводки тому, кто вас оценивает, и будьте откровенны по пункту о самоповреждении - клиницисты спрашивают об этом, потому что это меняет план, а не потому что это меняет их отношение к вам.',
        'Если у вас есть мысли о том, чтобы покончить с жизнью или причинить себе вред, немедленно обратитесь в экстренные службы или на кризисную линию. Не ждите приёма.'
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

  function renderQuestion() {
    const item = currentItem();
    const options = currentOptions();
    const selected = currentValue();
    const stepNumber = state.currentStep + 1;

    $('question-number').textContent =
      item.id === 10 ? 'Последний вопрос' : `Вопрос ${item.id} из 9`;
    $('question-part').textContent =
      item.id === 10 ? 'Дополнительно · Нарушение функционирования' : 'PHQ-9 · Последние 2 недели';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    $('progress-fill').style.width = `${Math.max(4, (stepNumber / TOTAL_STEPS) * 100)}%`;
    $('progress-label').textContent = `${Math.round((answered / TOTAL_STEPS) * 100)}% отвечено`;

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
      state.currentStep === TOTAL_STEPS - 1 ? 'Посмотреть результаты' : 'Следующий вопрос';

    announce(`Вопрос ${stepNumber} из ${TOTAL_STEPS}. ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'affective') return 'Аффективный · настроение и ангедония';
    if (axis === 'somatic') return 'Соматический · нейровегетативные симптомы';
    if (axis === 'cognitive') return 'Когнитивный и моторный · внимание, психомоторика, надежда';
    return 'Функциональный · повседневные нарушения';
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);

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
    announce('Доступны ресурсы поддержки. Пожалуйста, ознакомьтесь перед продолжением.');
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

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function axisStatus(value, max) {
    const ratio = value / max;
    if (ratio >= 0.67) return 'Выраженно повышенный уровень';
    if (ratio >= 0.45) return 'Повышенный уровень';
    if (ratio >= 0.22) return 'Незначительно повышенный уровень';
    return 'Низкая выраженность';
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
      results.functional === null ? 'Нет ответа' : FUNCTIONAL_OPTIONS[results.functional].label;

    $('algorithm-status').textContent = results.meetsAlgorithm
      ? 'Выполнены - паттерн соответствует большому депрессивному эпизоду'
      : results.meetsCutoff
        ? 'Сумма выше порога, критерии алгоритма выполнены не полностью'
        : 'Не выполнены';

    $('cutoff-status').textContent = results.meetsCutoff
      ? 'На уровне или выше валидированного порога 10'
      : 'Ниже валидированного порога 10';

    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Аффективный (настроение, ангедония, вина)', results.axisTotals.affective, 9],
      ['Соматический (сон, энергия, аппетит)', results.axisTotals.somatic, 9],
      ['Когнитивный / моторный (внимание, психомоторика, надежда)', results.axisTotals.cognitive, 9],
      ['Широта симптомов (пункты с оценкой ≥ 2)', results.elevatedItems, 9]
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
        ${active ? '<span class="severity-marker">Вы здесь</span>' : ''}
      </div>`;
    }).join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 27 - ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'На уровне или выше валидированного порога 10'
      : 'Ниже валидированного порога 10';
    $('print-algorithm').textContent = results.meetsAlgorithm ? 'Критерии выполнены' : 'Критерии не выполнены';
    $('print-affective').textContent = `${results.axisTotals.affective} / 9`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9`;
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 9`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Нет ответа'
        : FUNCTIONAL_OPTIONS[results.functional].label;
    $('print-item9').textContent = results.item9Flag
      ? `ОТМЕЧЕНО - ${LIKERT_OPTIONS[results.item9].label}`
      : 'Не отмечено';

    const crisisRow = $('print-crisis-row');
    if (crisisRow) crisisRow.classList.toggle('hidden', !results.item9Flag);

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        const flagged = q.id === 9 && value >= 1;
        return `<tr${flagged ? ' class="flagged"' : ''}><td>${q.id}</td><td>${axisShort(q.axis)}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>10</td><td>Функциональный</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '-' : results.functional}</td><td>${results.functional === null ? 'Нет ответа' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  function axisShort(axis) {
    if (axis === 'affective') return 'Аффективный';
    if (axis === 'somatic') return 'Соматический';
    return 'Когнитивный';
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Я прошёл скрининг депрессии PHQ-9 на FreeIQExam. Балл: ${results.total}/27 (${results.band.label}). Это информация скрининга, а не диагноз.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Скрининг PHQ-9 - FreeIQExam', text, url: window.location.href });
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
    announce('Оценка сброшена. Готово к новому прохождению.');
  }

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