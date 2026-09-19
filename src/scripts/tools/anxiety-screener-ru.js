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
      axis: 'cognitive',
      context: 'Автономная тревога · аффективное напряжение',
      text: 'Чувство нервозности, тревоги или взвинченности'
    },
    {
      id: 2,
      axis: 'cognitive',
      context: 'Метакогнитивный контроль · неуправляемость беспокойства',
      text: 'Невозможность остановить или контролировать беспокойство'
    },
    {
      id: 3,
      axis: 'cognitive',
      context: 'Генерализованная тревога · диффузные катастрофические идеи',
      text: 'Чрезмерное беспокойство о разных вещах'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Автономное возбуждение · мышечное и нервно-мышечное напряжение',
      text: 'Трудности с расслаблением'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Психомоторное возбуждение · симпатическая гиперактивация',
      text: 'Такое беспокойство, что трудно усидеть на месте'
    },
    {
      id: 6,
      axis: 'somatic',
      context: 'Аффективная реактивность · снижение порога нервной системы',
      text: 'Лёгкая раздражительность или вспыльчивость'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Катастрофическое предвосхищение · страх и предчувствие беды',
      text: 'Чувство страха, будто может случиться что-то ужасное'
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 8,
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
      label: 'Минимальная тревожность',
      badge: 'Минимальные симптомы тревоги или их отсутствие',
      tone: 'minimal',
      summary: 'Ваши ответы попадают в нормальный базовый диапазон здоровых эмоциональных колебаний.',
      narrative:
        'Ваш суммарный балл находится в минимальном диапазоне (0–4). Это указывает, что вы отметили мало симптомов тревоги или отметили их лишь изредка за последние две недели. Нормальная базовая реактивность нервной системы колеблется вместе с повседневными стрессорами; этот балл говорит, что генерализованная тревога сейчас не оказывает клинически значимого бремени на вашу жизнь.',
      steps: [
        'Клиническое вмешательство на основании одного этого балла не показано.',
        'Поддерживайте устойчивость нервной системы стабильной гигиеной сна (7–9 часов), регулярной кардионагрузкой и сбалансированным дневным ритмом.',
        'Практикуйте инструменты физиологической саморегуляции (например, циклические вздохи и диафрагмальное дыхание) при occasional ситуационном стрессе.',
        'Повторите скрининг, если появятся стойкие нарушения сна, мышечное напряжение или нарастающие петли беспокойства.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Лёгкая тревожность',
      badge: 'Лёгкие симптомы тревоги',
      tone: 'mild',
      summary: 'Вы отметили несколько симптомов с низкой или умеренной частотой. Это субклиническое повышение.',
      narrative:
        'Балл от 5 до 9 попадает в лёгкий диапазон тревоги. На этом уровне симптомы часто отражают повышенную средовую или психологическую нагрузку, а не сложившуюся патологию. Активная выжидательная тактика вместе с lifestyle-ритмом и когнитивной реструктуризацией - стандартный рекомендуемый подход. Симптомы этой ступени очень хорошо отвечают на ранние инструменты саморегуляции до того, как паттерны беспокойства закрепятся.',
      steps: [
        'Выжидательная тактика на этом уровне уместна: наблюдайте за симптомами в течение следующих 2–4 недель, чтобы увидеть, стабилизируются они или нарастают.',
        'Введите структурированное «время для беспокойства»: выделите 15 минут во второй половине дня, чтобы записать тревоги и определить выполнимые шаги, предотвращая размышления перед сном.',
        'Сократите стимуляторы симпатической системы, особенно избыток кофеина, никотина и позднее воздействие синего света.',
        'Ежедневно практикуйте соматическое успокоение: 10–15 минут прогрессивной мышечной релаксации, йога-нидры или низкочастотного зелёного/коричневого шума.',
        'Подумайте об обращении к терапевту или врачу первичного звена, если симптомы начнут мешать концентрации, работе или отношениям.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Умеренная тревожность',
      badge: 'Умеренная тревожность - рекомендуется клиническая оценка',
      tone: 'moderate',
      summary: 'Ваш балл достигает валидированного клинического порога 10 для вероятного генерализованного тревожного расстройства (ГТР).',
      narrative:
        'Балл 10 и выше представляет клинически валидированный диагностический порог для генерализованного тревожного расстройства (чувствительность GAD-7 ~89%, специфичность ~82%). На этом уровне чрезмерное беспокойство и автономное напряжение, вероятно, нарушают повседневное функционирование, когнитивную концентрацию или архитектуру сна. Рекомендуется комплексная клиническая оценка у врача, психолога или лицензированного психотерапевта.',
      steps: [
        'Запишитесь на клиническую консультацию к врачу первичного звена, психиатру или лицензированному специалисту по психическому здоровью.',
        'Возьмите печатную или цифровую копию этой сводки для клинициста на приём, чтобы дать структурированную базовую линию симптомов.',
        'Научно обоснованная когнитивно-поведенческая терапия (КПТ) и терапия принятия и ответственности (ACT) показывают высокую клиническую эффективность на этом уровне.',
        'Обсудите медицинские обследования (например, панель щитовидной железы, уровни железа/ферритина или проверку сердечного ритма), чтобы исключить физиологические имитаторы тревоги.',
        'Повторяйте скрининг каждые 2–4 недели, чтобы отслеживать траекторию симптомов и оценивать ответ на начатое лечение.'
      ]
    },
    {
      key: 'severe',
      min: 15,
      max: 21,
      label: 'Тяжёлая тревожность',
      badge: 'Тяжёлая тревожность - показано активное клиническое вмешательство',
      tone: 'severe',
      summary: 'Ваш балл находится в самой тяжёлой полосе, указывая на выраженные когнитивные и физиологические нарушения.',
      narrative:
        'Балл от 15 до 21 означает тяжёлые симптомы тревоги. При этой тяжести симпатическая гиперактивность, хроническая тревога и соматическое напряжение обычно вызывают выраженные нарушения в профессиональной, социальной и личной сферах. Это требует незамедлительного комплексного медицинского и психотерапевтического вмешательства. Тяжёлая тревожность - излечимое клиническое состояние, и мультимодальная помощь (психотерапия плюс медицинское ведение) часто приносит существенное облегчение.',
      steps: [
        'Как можно скорее организуйте оценку у лицензированного клинициста по психическому здоровью или психиатра. Не откладывайте своевременную помощь.',
        'Передайте этот полный детализированный отчёт своему специалисту, выделив как баллы когнитивного беспокойства, так и уровни соматического напряжения.',
        'Вмешательства первой линии обычно включают комбинированную научно обоснованную психотерапию (КПТ) и фармакотерапию (например, СИОЗС или СИОЗСН).',
        'Привлеките поддержку доверенного члена семьи или друга для помощи с записью на приёмы и повседневными logistical задачами.',
        'Если вы испытываете острую панику, непреодолимый кризис или мысли о самоповреждении, немедленно свяжитесь с 988 (США/Канада), 116 123 (Великобритания) или местными экстренными службами.'
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
    startedAt: null
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `GAD7-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('anxiety-live-region');
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
    return item.id === 8 ? state.functional : state.answers[item.id];
  }

  function setCurrentValue(value) {
    const item = currentItem();
    if (item.id === 8) state.functional = value;
    else state.answers[item.id] = value;
  }

  function renderQuestion() {
    const item = currentItem();
    const options = currentOptions();
    const selected = currentValue();
    const stepNumber = state.currentStep + 1;

    $('question-number').textContent =
      item.id === 8 ? 'Последний вопрос' : `Вопрос ${item.id} из 7`;
    $('question-part').textContent =
      item.id === 8 ? 'Дополнительно · Нарушение функционирования' : 'GAD-7 · Последние 2 недели';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    const percent = Math.round((answered / TOTAL_STEPS) * 100);
    $('progress-label').textContent = `${percent}% отвечено`;
    $('progress-fill').style.width = `${Math.max(4, percent)}%`;

    const container = $('likert-options');
    container.innerHTML = options
      .map((opt, idx) => {
        const isSelected = selected === opt.value;
        return `
          <button
            type="button"
            class="likert-option${isSelected ? ' selected' : ''}"
            data-value="${opt.value}"
            aria-pressed="${isSelected}"
          >
            <span class="likert-key">${idx + 1}</span>
            <span class="likert-label">${opt.label}</span>
            <span class="likert-detail">${opt.detail}</span>
          </button>
        `;
      })
      .join('');

    container.querySelectorAll('.likert-option').forEach((button) => {
      button.addEventListener('click', () => {
        const val = Number(button.dataset.value);
        selectAnswer(val);
      });
    });

    $('back-button').disabled = state.currentStep === 0;
    $('next-button').disabled = selected === undefined;
    $('next-button').textContent =
      state.currentStep === TOTAL_STEPS - 1 ? 'Посмотреть клинические результаты' : 'Следующий вопрос';

    announce(`Вопрос ${stepNumber} из ${TOTAL_STEPS}: ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'cognitive') return 'Когнитивное / аффективное беспокойство · предвосхищение и метапознание';
    if (axis === 'somatic') return 'Соматическое / автономное возбуждение · напряжение, агитация и реактивность';
    return 'Дополнительно · профессиональное и социальное функционирование';
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);
    renderQuestion();

    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;
      if (state.currentStep < TOTAL_STEPS - 1) {
        state.currentStep += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 320);
  }

  function goNext() {
    if (currentValue() === undefined || state.transitionLocked) return;
    if (state.currentStep < TOTAL_STEPS - 1) {
      state.currentStep += 1;
      renderQuestion();
    } else {
      displayResults();
    }
  }

  function goBack() {
    if (state.currentStep === 0 || state.transitionLocked) return;
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.currentStep -= 1;
    renderQuestion();
  }

  function calculateScores() {
    let total = 0;
    const axisTotals = { cognitive: 0, somatic: 0 };
    let elevatedItems = 0;

    QUESTIONS.forEach((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      total += value;
      axisTotals[q.axis] += value;
      if (value >= 2) elevatedItems += 1;
    });

    const band =
      SEVERITY_BANDS.find((entry) => total >= entry.min && total <= entry.max) ||
      SEVERITY_BANDS[SEVERITY_BANDS.length - 1];

    const functional = Number.isFinite(state.functional) ? state.functional : null;

    return {
      total,
      band,
      functional,
      axisTotals,
      elevatedItems,
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

    const badge = $('result-badge');
    badge.textContent = results.band.badge;
    badge.className = `result-badge ${results.band.tone}`;

    $('result-classification').textContent = results.band.label;
    $('result-score').textContent = `${results.total} / 21`;
    $('result-narrative').textContent = results.band.narrative;

    $('cognitive-score').textContent = `${results.axisTotals.cognitive} / 12`;
    $('cognitive-status').textContent = axisStatus(results.axisTotals.cognitive, 12);
    updateBar('cognitive-bar', results.axisTotals.cognitive, 12);

    $('somatic-score').textContent = `${results.axisTotals.somatic} / 9`;
    $('somatic-status').textContent = axisStatus(results.axisTotals.somatic, 9);
    updateBar('somatic-bar', results.axisTotals.somatic, 9);

    $('functional-score').textContent =
      results.functional === null ? 'Нет ответа' : FUNCTIONAL_OPTIONS[results.functional].label;

    $('cutoff-status').textContent = results.meetsCutoff
      ? 'На уровне или выше валидированного клинического порога 10 (вероятное ГТР)'
      : 'Ниже валидированного клинического порога 10';

    $('breadth-status').textContent = `${results.elevatedItems} из 7 пунктов с оценкой ≥ 2`;

    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Подшкала когнитивного беспокойства (пункты 1, 2, 3, 7)', results.axisTotals.cognitive, 12],
      ['Подшкала соматического напряжения (пункты 4, 5, 6)', results.axisTotals.somatic, 9],
      ['Широта симптомов (пункты с оценкой ≥ 2 дней)', results.elevatedItems, 7]
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
        ${active ? '<span class="severity-marker">Ваш балл здесь</span>' : ''}
      </div>`;
    }).join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 21 - ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'На уровне или выше валидированного клинического порога 10 (вероятное ГТР)'
      : 'Ниже валидированного клинического порога 10';
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 12 (${axisStatus(results.axisTotals.cognitive, 12)})`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9 (${axisStatus(results.axisTotals.somatic, 9)})`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Нет ответа'
        : FUNCTIONAL_OPTIONS[results.functional].label;

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        return `<tr><td>${q.id}</td><td>${q.axis === 'cognitive' ? 'Когнитивный' : 'Соматический'}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>8</td><td>Функциональный</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '-' : results.functional}</td><td>${results.functional === null ? 'Нет ответа' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Я прошёл скрининг тревожности GAD-7 на FreeIQExam. Балл: ${results.total}/21 (${results.band.label}). Это валидированная информация скрининга, а не медицинский диагноз.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Скрининг GAD-7 - FreeIQExam', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Сводка скрининга скопирована в буфер обмена.');
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
      showToast('Сводка скрининга скопирована в буфер обмена.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Отправка недоступна.');
    }
  }

  function showToast(message) {
    const toast = $('share-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-3');
    window.setTimeout(() => toast.classList.add('opacity-0', 'translate-y-3'), 2400);
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

    $('results-section').classList.add('hidden');
    $('questionnaire-section').classList.add('hidden');
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
    if (!$('anxiety-app')) return;

    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', beginAssessment);
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();