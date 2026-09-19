(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Определённо согласен' },
    { value: 1, label: 'Скорее согласен' },
    { value: 2, label: 'Скорее не согласен' },
    { value: 3, label: 'Определённо не согласен' }
  ];

  const QUESTIONS = [
    { id: 1, subscale: 'sensory', direction: 'agree', context: 'Сенсорика · внимание к деталям', text: 'Я часто замечаю небольшие звуки, которых не замечают другие.' },
    { id: 2, subscale: 'sensory', direction: 'disagree', context: 'Глобальная vs локальная обработка', text: 'Обычно я больше сосредоточен на общей картине, а не на мелких деталях.' },
    { id: 3, subscale: 'attention', direction: 'disagree', context: 'Переключение внимания', text: 'Мне легко делать несколько дел одновременно.' },
    { id: 4, subscale: 'attention', direction: 'disagree', context: 'Переключение внимания', text: 'Если меня прервали, я могу очень быстро вернуться к тому, что делал.' },
    { id: 5, subscale: 'social', direction: 'disagree', context: 'Социальная коммуникация', text: 'Мне легко «читать между строк», когда со мной разговаривают.' },
    { id: 6, subscale: 'social', direction: 'disagree', context: 'Социальные отношения', text: 'Я понимаю, когда человеку, слушающему меня, становится скучно.' },
    { id: 7, subscale: 'social', direction: 'agree', context: 'Теория психики · социальный контекст', text: 'Читая рассказ, мне трудно понять намерения персонажей.' },
    { id: 8, subscale: 'systematizing', direction: 'agree', context: 'Систематизация · узкие интересы', text: 'Мне нравится собирать информацию о категориях вещей.' },
    { id: 9, subscale: 'social', direction: 'disagree', context: 'Мимика · эмпатия', text: 'Мне легко понять, о чём человек думает или что чувствует, просто посмотрев на его лицо.' },
    { id: 10, subscale: 'social', direction: 'agree', context: 'Социальные отношения', text: 'Мне трудно заводить новых друзей.' }
  ];

  const SUBSCALES = {
    social: { label: 'Социальная коммуникация', short: 'Соц.', max: 5, color: '#10b981', blurb: 'Теория психики, интерпретация сигналов, взаимность' },
    sensory: { label: 'Сенсорика и внимание к деталям', short: 'Сенс.', max: 2, color: '#06b6d4', blurb: 'Сенсорное восприятие, локальная и глобальная обработка' },
    attention: { label: 'Переключение внимания', short: 'Перекл.', max: 2, color: '#8b5cf6', blurb: 'Трение при переключении задач, сохранение рутин' },
    systematizing: { label: 'Систематизирующие интересы', short: 'Сист.', max: 1, color: '#f59e0b', blurb: 'Фокус на паттернах, категоризация, глубокие интересы' }
  };

  const SUBSCALE_ORDER = ['social', 'sensory', 'attention', 'systematizing'];
  const REFERRAL_CUTOFF = 6;

  const state = {
    currentIndex: 0,
    answers: {},
    transitionTimer: null,
    transitionLocked: false,
    sessionId: '',
    startedAt: null,
    radarFrame: null
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `AQ10-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('autism-live-region');
    if (live) live.textContent = message;
  }

  function answeredCount() {
    return Object.keys(state.answers).length;
  }

  function itemScoresOne(question, value) {
    if (!Number.isFinite(value)) return false;
    return question.direction === 'agree' ? value <= 1 : value >= 2;
  }

  function renderQuestion() {
    const q = QUESTIONS[state.currentIndex];
    const selected = state.answers[q.id];
    const total = QUESTIONS.length;
    const progress = (state.currentIndex / total) * 100;
    const meta = SUBSCALES[q.subscale];

    $('question-number').textContent = `Вопрос ${q.id} из ${total}`;
    $('question-part').textContent = 'AQ-10 · Скрининг аутизма у взрослых';
    $('question-domain').textContent = meta.label;
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
      const scores = itemScoresOne(q, option.value);
      if (scores) button.classList.add('clinical-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', `${option.label}: ${q.text}`);
      button.innerHTML = `
        <span class="likert-key">${option.value + 1}</span>
        <span class="likert-label">${option.label}</span>
        ${scores ? '<span class="likert-clinical-badge">1 балл</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Посмотреть результаты' : 'Следующий вопрос';
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
        displayResults();
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
      displayResults();
    }
  }

  function goBack() {
    if (state.transitionLocked) return;
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  }

  function calculateScores() {
    let total = 0;
    const subscaleTotals = { social: 0, sensory: 0, attention: 0, systematizing: 0 };

    QUESTIONS.forEach((q) => {
      const value = state.answers[q.id];
      if (itemScoresOne(q, value)) {
        total += 1;
        subscaleTotals[q.subscale] += 1;
      }
    });

    const aboveThreshold = total >= REFERRAL_CUTOFF;

    let classification;
    let badge;
    let tone;

    if (aboveThreshold) {
      tone = 'high';
      badge = 'Выше порога направления - рекомендуется оценка специалистом';
      classification = 'Клинически значимый паттерн черт';
    } else if (total >= 4) {
      tone = 'moderate';
      badge = 'Пограничный паттерн - наблюдение с учётом контекста';
      classification = 'Пограничный паттерн черт';
    } else {
      tone = 'low';
      badge = 'Ниже клинического порога направления';
      classification = 'Слабо выраженный паттерн черт';
    }

    return { total, subscaleTotals, aboveThreshold, classification, badge, tone };
  }

  function subscaleRatios(results) {
    return SUBSCALE_ORDER.map((key) => {
      const max = SUBSCALES[key].max;
      return max === 0 ? 0 : results.subscaleTotals[key] / max;
    });
  }

  function drawRadarFrame(ctx, size, ratios, progress, opts) {
    const cx = size / 2;
    const cy = size / 2 + 8;
    const radius = size / 2 - 52;
    const n = SUBSCALE_ORDER.length;

    ctx.clearRect(0, 0, size, size);

    [0.25, 0.5, 0.75, 1].forEach((ring) => {
      ctx.beginPath();
      for (let i = 0; i <= n; i += 1) {
        const angle = (Math.PI * 2 * (i % n)) / n - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * ring;
        const y = cy + Math.sin(angle) * radius * ring;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = ring === 1 ? opts.gridStrong : opts.grid;
      ctx.lineWidth = ring === 1 ? 1.5 : 1;
      ctx.stroke();
    });

    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = opts.grid;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    ctx.beginPath();
    const points = [];
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = radius * Math.max(0.02, ratios[i] * eased);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      points.push([x, y]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.font = '700 12px ui-monospace, monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const key = SUBSCALE_ORDER[i];
      const meta = SUBSCALES[key];
      const [px, py] = points[i];

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = meta.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = opts.dotRing;
      ctx.stroke();

      const lx = cx + Math.cos(angle) * (radius + 30);
      const ly = cy + Math.sin(angle) * (radius + 26);
      ctx.fillStyle = opts.text;
      ctx.fillText(meta.short, lx, ly);
      ctx.font = '600 11px ui-monospace, monospace';
      ctx.fillStyle = opts.textMuted;
      ctx.fillText(`${results.subscaleTotals[key]}/${meta.max}`, lx, ly + 14);
      ctx.font = '700 12px ui-monospace, monospace';
    }

    return points;
  }

  function renderRadar(results) {
    const canvas = $('radar-chart');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    const tooltip = $('radar-tooltip');

    if (state.radarFrame) window.cancelAnimationFrame(state.radarFrame);
    state.radarFrame = null;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cssSize = Math.min(420, canvas.parentElement ? canvas.parentElement.clientWidth : 360);
    const size = Math.max(280, cssSize);
    canvas.width = size * dpr;
    canvas.height = (size + 20) * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size + 20}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const drawSize = size;

    const dark = document.documentElement.classList.contains('dark');
    const opts = {
      grid: dark ? 'rgba(63,63,70,0.9)' : 'rgba(212,212,216,0.9)',
      gridStrong: dark ? 'rgba(161,161,170,0.9)' : 'rgba(113,113,122,0.9)',
      text: dark ? '#f4f4f5' : '#18181b',
      textMuted: dark ? '#a1a1aa' : '#71717a',
      dotRing: dark ? '#09090b' : '#ffffff'
    };

    const ratios = subscaleRatios(results);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let points = [];
    if (reduceMotion) {
      points = drawRadarFrame(ctx, drawSize, ratios, 1, opts);
    } else {
      const start = performance.now();
      const duration = 650;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        points = drawRadarFrame(ctx, drawSize, ratios, progress, opts);
        if (progress < 1) {
          state.radarFrame = window.requestAnimationFrame(tick);
        } else {
          state.radarFrame = null;
        }
      };
      state.radarFrame = window.requestAnimationFrame(tick);
    }

    if (tooltip) {
      canvas.onmousemove = (event) => {
        if (!points.length) return;
        const rect = canvas.getBoundingClientRect();
        const mx = event.clientX - rect.left;
        const my = event.clientY - rect.top;
        let best = -1;
        let bestDist = 28;
        points.forEach(([px, py], i) => {
          const d = Math.hypot(px - mx, py - my);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        if (best >= 0) {
          const key = SUBSCALE_ORDER[best];
          const meta = SUBSCALES[key];
          tooltip.textContent = `${meta.label}: ${results.subscaleTotals[key]} из ${meta.max} - ${meta.blurb}`;
          tooltip.classList.remove('hidden');
          const [px, py] = points[best];
          tooltip.style.left = `${Math.max(4, Math.min(rect.width - 4, px))}px`;
          tooltip.style.top = `${Math.max(4, py - 10)}px`;
        } else {
          tooltip.classList.add('hidden');
        }
      };
      canvas.onmouseleave = () => tooltip.classList.add('hidden');
    }
  }

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function subscaleStatus(value, max) {
    const ratio = max === 0 ? 0 : value / max;
    if (ratio >= 0.75) return 'Сильно выражено';
    if (ratio >= 0.5) return 'Умеренно выражено';
    if (ratio > 0) return 'Слабо выражено';
    return 'Минимальная выраженность';
  }

  function displayResults() {
    const results = calculateScores();

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const badge = $('result-badge');
    badge.textContent = results.badge;
    badge.className = `result-badge ${results.tone}`;

    $('result-classification').textContent = results.classification;
    $('result-score').textContent = `${results.total} / 10`;
    $('threshold-status').textContent = results.aboveThreshold
      ? `На уровне или выше порога направления ${REFERRAL_CUTOFF}`
      : `Ниже порога направления ${REFERRAL_CUTOFF}`;

    $('result-narrative').textContent = results.aboveThreshold
      ? 'Ваши ответы пересекают порог скрининга, используемый в этой реализации. Это обосновывает обращение за комплексной диагностической оценкой к специализированной междисциплинарной команде; это не устанавливает аутизм.'
      : results.total >= 4
        ? 'Ваши ответы находятся чуть ниже порога скрининга. Черты на этом уровне всё ещё могут быть значимыми - особенно при маскировке, которая может занижать баллы, - если они стойкие или нарушают функционирование.'
        : 'Ваши ответы ниже порога скрининга. Низкий результат не исключает всех причин социальных, сенсорных или связанных с вниманием трудностей, и стойкие опасения всё равно заслуживают обсуждения.';

    $('social-score').textContent = `${results.subscaleTotals.social} / 5`;
    $('sensory-score').textContent = `${results.subscaleTotals.sensory} / 2`;
    $('attention-score').textContent = `${results.subscaleTotals.attention} / 2`;
    $('systematizing-score').textContent = `${results.subscaleTotals.systematizing} / 1`;
    $('social-status').textContent = subscaleStatus(results.subscaleTotals.social, 5);
    $('sensory-status').textContent = subscaleStatus(results.subscaleTotals.sensory, 2);
    $('attention-status').textContent = subscaleStatus(results.subscaleTotals.attention, 2);
    $('systematizing-status').textContent = subscaleStatus(results.subscaleTotals.systematizing, 1);

    updateBar('social-bar', results.subscaleTotals.social, 5);
    updateBar('sensory-bar', results.subscaleTotals.sensory, 2);
    updateBar('attention-bar', results.subscaleTotals.attention, 2);
    updateBar('systematizing-bar', results.subscaleTotals.systematizing, 1);

    renderRadar(results);
    renderMatrix(results);
    renderThresholdScale(results);
    renderNextSteps(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Социальная коммуникация (Q5–Q7, Q9–Q10)', results.subscaleTotals.social, 5],
      ['Сенсорика и детали (Q1–Q2)', results.subscaleTotals.sensory, 2],
      ['Переключение внимания (Q3–Q4)', results.subscaleTotals.attention, 2],
      ['Систематизирующие интересы (Q8)', results.subscaleTotals.systematizing, 1]
    ];

    $('profile-matrix').innerHTML = axes
      .map(([label, value, max]) => {
        const percent = Math.round(Math.max(0, Math.min(100, (value / max) * 100)));
        return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value} / ${max}</strong></div><div class="matrix-track"><span style="width:${percent}%"></span></div></div>`;
      })
      .join('');
  }

  function renderThresholdScale(results) {
    const container = $('threshold-scale');
    if (!container) return;

    let cells = '';
    for (let score = 0; score <= 10; score += 1) {
      const active = score === results.total;
      const inZone = score >= REFERRAL_CUTOFF;
      cells += `<div class="threshold-cell${active ? ' active' : ''}${inZone ? ' referral-zone' : ''}" title="Балл ${score}${score >= REFERRAL_CUTOFF ? ' - зона направления' : ''}">
        <span>${score}</span>${active ? '<em>Вы</em>' : ''}
      </div>`;
    }
    container.innerHTML = cells;
  }

  function renderNextSteps(results) {
    const steps = results.aboveThreshold
      ? [
        'Организуйте комплексную диагностическую оценку у специализированной междисциплинарной команды - обычно через врача первичного звена, нейропсихолога или службу помощи взрослым с аутизмом.',
        'Возьмите эту сводку плюс конкретные примеры из жизни: социальные ситуации, сенсорный опыт, рутины и интересы, включая детские паттерны при наличии.',
        'Спросите, что включает оценка (обычно история развития, структурированное наблюдение или интервью и опросники), чтобы подготовиться без заучивания.',
        'Если вы маскируетесь в социальных ситуациях, скажите об этом прямо - маскировка может подавлять наблюдаемые черты во время коротких приёмов.',
        'Параллельно изучите возможности приспособлений на работе или учёбе; для многих изменений формальный диагноз не требуется.'
      ]
      : results.total >= 4
        ? [
          'Баллы около порога заслуживают контекста, а не отбрасывания. Отметьте, когда появляются черты, что их запускает и чего они стоят в повседневной жизни.',
          'Рассмотрите скрининг часто пересекающихся состояний - СДВГ, тревога, депрессия и различия сенсорной обработки могут иметь схожие поверхностные признаки.',
          'Если трудности сохраняются или вызывают реальные нарушения, клинический разговор всё равно стоит того; пороги - это ориентиры, а не ворота.',
          'Повторите скрининг через несколько месяцев, если ваше самопонимание изменится, особенно если вы начнёте снимать давние стратегии совладания.'
        ]
        : [
          'Направление на основании одного этого балла не показано.',
          'Если вам всё ещё тяжело, балл - не вся история. Стойкий социальный, сенсорный или связанный с вниманием дистресс заслуживает разговора независимо от числа.',
          'Подумайте, не подходит ли лучше другое объяснение - СДВГ, социальная тревога, депрессия, реакции на травму и расстройства сна могут имитировать части этого паттерна.',
          'Повторите скрининг, если ваш опыт существенно изменится со временем.'
        ];

    $('next-steps-list').innerHTML = steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 10 - ${results.classification}`;
    $('print-threshold').textContent = results.aboveThreshold
      ? `На уровне или выше порога направления ${REFERRAL_CUTOFF}`
      : `Ниже порога направления ${REFERRAL_CUTOFF}`;
    $('print-social').textContent = `${results.subscaleTotals.social} / 5`;
    $('print-sensory').textContent = `${results.subscaleTotals.sensory} / 2`;
    $('print-attention').textContent = `${results.subscaleTotals.attention} / 2`;
    $('print-systematizing').textContent = `${results.subscaleTotals.systematizing} / 1`;

    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      const scored = itemScoresOne(q, value);
      return `<tr${scored ? ' class="flagged"' : ''}><td>${q.id}</td><td>${SUBSCALES[q.subscale].short}</td><td>${q.text}</td><td>${OPTIONS[value].label}</td><td>${scored ? 1 : 0}</td></tr>`;
    }).join('');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Я прошёл скрининг аутизма AQ-10 на FreeIQExam. Балл: ${results.total}/10 (порог направления ≥6). Результат: ${results.badge}. Это информация скрининга, а не диагноз.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'Скрининг AQ-10 - FreeIQExam', text, url: window.location.href });
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
    if (state.radarFrame) window.cancelAnimationFrame(state.radarFrame);

    state.currentIndex = 0;
    state.answers = {};
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.radarFrame = null;
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
    state.currentIndex = 0;
    renderQuestion();
    $('questionnaire-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    if (!$('autism-app')) return;

    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', beginAssessment);
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);
    $('retake-intro')?.addEventListener('click', resetAssessment);

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

    window.addEventListener('resize', () => {
      if (!$('results-section')?.classList.contains('hidden')) {
        renderRadar(calculateScores());
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