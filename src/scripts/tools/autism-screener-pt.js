(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * AQ-10 — Quociente do Espectro Autista (Versão de 10 Itens para Adultos)
   * Allison, Auyeung & Baron-Cohen. Avaliação orientativa com 4 eixos
   * e gráfico interativo tipo radar/teia.
   *
   * AVISO: Este teste é estritamente orientativo e psicoeducativo.
   * Não substitui avaliação ou diagnóstico clínico neuropsicológico.
   * ------------------------------------------------------------------ */

  const OPTIONS = [
    { value: 0, label: 'Concordo totalmente' },
    { value: 1, label: 'Concordo parcialmente' },
    { value: 2, label: 'Discordo parcialmente' },
    { value: 3, label: 'Discordo totalmente' }
  ];

  const QUESTIONS = [
    { id: 1, subscale: 'sensory', direction: 'agree', context: 'Percepção Sensorial e Detalhes', text: 'Costumo perceber sons baixos ou sutis que outras pessoas não reparam.' },
    { id: 2, subscale: 'sensory', direction: 'disagree', context: 'Processamento Global vs. Detalhes', text: 'Costumo me concentrar mais no quadro geral do que nos pequenos detalhes.' },
    { id: 3, subscale: 'attention', direction: 'disagree', context: 'Alternância de Atenção', text: 'Acho fácil realizar mais de uma tarefa ao mesmo tempo.' },
    { id: 4, subscale: 'attention', direction: 'disagree', context: 'Retorno após Interrupção', text: 'Se houver uma interrupção, consigo voltar ao que estava fazendo muito rapidamente.' },
    { id: 5, subscale: 'social', direction: 'disagree', context: 'Comunicação Social', text: 'Acho fácil "ler nas entrelinhas" quando alguém está conversando comigo.' },
    { id: 6, subscale: 'social', direction: 'disagree', context: 'Sinais Sociais de Tédio', text: 'Consigo perceber rapidamente quando alguém que está me ouvindo começa a ficar entediado(a).' },
    { id: 7, subscale: 'social', direction: 'agree', context: 'Teoria da Mente em Narrativas', text: 'Quando leio uma história, acho difícil imaginar ou entender as intenções dos personagens.' },
    { id: 8, subscale: 'systematizing', direction: 'agree', context: 'Interesses e Categorização', text: 'Gosto de coletar informações e detalhes minuciosos sobre categorias específicas de coisas.' },
    { id: 9, subscale: 'social', direction: 'disagree', context: 'Leitura de Expressões Faciais', text: 'Acho fácil entender o que alguém está pensando ou sentindo apenas olhando para o seu rosto.' },
    { id: 10, subscale: 'social', direction: 'agree', context: 'Relações Interpessoais', text: 'Acho difícil iniciar e manter novas amizades.' }
  ];

  const SUBSCALES = {
    social: { label: 'Comunicação e Interação Social', short: 'Social', max: 5, color: '#10b981', blurb: 'Teoria da mente, sinais sociais e dinâmicas interpessoais' },
    sensory: { label: 'Sensibilidade e Foco em Detalhes', short: 'Sensorial', max: 2, color: '#06b6d4', blurb: 'Estímulos sensoriais e atenção aos detalhes vs. visão geral' },
    attention: { label: 'Alternância de Foco e Flexibilidade', short: 'Atenção', max: 2, color: '#8b5cf6', blurb: 'Flexibilidade cognitiva, multitarefa e tolerância a interrupções' },
    systematizing: { label: 'Padrões e Sistematização', short: 'Sistemas', max: 1, color: '#f59e0b', blurb: 'Busca por padrões, categorização e hiperfocos específicos' }
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

  function generateSessionId() {
    return `AQ10-BR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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

    $('question-number').textContent = `Pergunta ${q.id} de ${total}`;
    $('question-part').textContent = 'AQ-10 · Triagem do Espectro Autista';
    $('question-domain').textContent = meta.label;
    $('question-heading').textContent = q.text;
    $('question-context').textContent = q.context;
    $('progress-fill').style.width = `${Math.max(6, progress)}%`;
    $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)}% preenchido`;

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
        ${scores ? '<span class="likert-clinical-badge">Ponto no Espectro</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Concluir Avaliação' : 'Próxima Pergunta';
    announce(`Pergunta ${q.id} de ${total}. ${q.text}`);
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
    const itemScores = {};

    QUESTIONS.forEach((q) => {
      const val = state.answers[q.id];
      const scores = itemScoresOne(q, val);
      itemScores[q.id] = scores ? 1 : 0;
      if (scores) {
        total += 1;
        subscaleTotals[q.subscale] += 1;
      }
    });

    const aboveThreshold = total >= REFERRAL_CUTOFF;
    let tone = 'low';
    let badge = 'Abaixo da Linha de Corte (0–5)';
    let classification = 'Traços Típicos / Subclínicos';

    if (aboveThreshold) {
      tone = 'high';
      badge = `Pontuação no Ponto de Corte (≥ ${REFERRAL_CUTOFF})`;
      classification = 'Traços Significativos do Espectro Autista';
    } else if (total >= 4) {
      tone = 'moderate';
      badge = 'Traços Moderados (4–5)';
      classification = 'Presença Parcial de Traços do Espectro';
    }

    return {
      total,
      subscaleTotals,
      itemScores,
      aboveThreshold,
      tone,
      badge,
      classification
    };
  }

  function subscaleRatios(results) {
    return SUBSCALE_ORDER.map((k) => {
      const max = SUBSCALES[k].max;
      return max === 0 ? 0 : results.subscaleTotals[k] / max;
    });
  }

  function drawRadarFrame(ctx, size, ratios, progress, opts) {
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.36;
    const n = SUBSCALE_ORDER.length;

    ctx.clearRect(0, 0, size, size + 20);

    // Background circles
    const levels = [0.25, 0.5, 0.75, 1.0];
    levels.forEach((lvl) => {
      ctx.beginPath();
      for (let i = 0; i < n; i += 1) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * lvl;
        const y = cy + Math.sin(angle) * radius * lvl;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = lvl === 1.0 ? opts.gridStrong : opts.grid;
      ctx.lineWidth = lvl === 1.0 ? 1.5 : 1;
      ctx.stroke();
    });

    // Axis lines
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.strokeStyle = opts.grid;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Data polygon
    const points = [];
    ctx.beginPath();
    for (let i = 0; i < n; i += 1) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = radius * ratios[i] * progress;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      points.push([x, y]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 102, 204, 0.22)';
    ctx.fill();
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Corner Dots & Labels
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

      const lx = cx + Math.cos(angle) * (radius + 28);
      const ly = cy + Math.sin(angle) * (radius + 24);
      ctx.fillStyle = opts.text;
      ctx.fillText(meta.short, lx, ly);
    }

    return points;
  }

  function renderRadar(results) {
    const canvas = $('radar-chart');
    if (!canvas || typeof canvas.getContext !== 'function') return;

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

    const dark = document.documentElement.classList.contains('dark');
    const opts = {
      grid: dark ? 'rgba(63,63,70,0.8)' : 'rgba(212,212,216,0.8)',
      gridStrong: dark ? 'rgba(161,161,170,0.8)' : 'rgba(113,113,122,0.8)',
      text: dark ? '#f4f4f5' : '#18181b',
      dotRing: dark ? '#09090b' : '#ffffff'
    };

    const ratios = subscaleRatios(results);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      drawRadarFrame(ctx, size, ratios, 1, opts);
    } else {
      const start = performance.now();
      const duration = 600;
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        drawRadarFrame(ctx, size, ratios, progress, opts);
        if (progress < 1) {
          state.radarFrame = window.requestAnimationFrame(tick);
        } else {
          state.radarFrame = null;
        }
      };
      state.radarFrame = window.requestAnimationFrame(tick);
    }
  }

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function subscaleStatus(value, max) {
    const ratio = max === 0 ? 0 : value / max;
    if (ratio >= 0.75) return 'Marcante';
    if (ratio >= 0.5) return 'Moderado';
    if (ratio > 0) return 'Presente';
    return 'Mínimo / Ausente';
  }

  function displayResults() {
    const results = calculateScores();

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const badge = $('result-badge');
    badge.textContent = results.badge;

    if (results.aboveThreshold) {
      badge.className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30';
      $('result-classification-card').className = 'p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-500/10 transition-all duration-300';
    } else {
      badge.className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30';
      $('result-classification-card').className = 'p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 transition-all duration-300';
    }

    $('result-classification').textContent = results.classification;
    $('result-score').textContent = `${results.total} / 10`;
    $('session-id-display').textContent = state.sessionId;
    $('timestamp-display').textContent = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    $('threshold-status').textContent = results.aboveThreshold
      ? `Atinge ou supera a linha de corte clínico de referência (${REFERRAL_CUTOFF}/10)`
      : `Pontuação abaixo da linha de corte clínico (${REFERRAL_CUTOFF}/10)`;

    $('result-narrative').textContent = results.aboveThreshold
      ? 'Sua pontuação atinge a linha de corte sugerida pelo protocolo AQ-10. Isso indica a presença de traços clinicamente significativos associados ao espectro autista e justifica uma avaliação diagnóstica com equipe médica ou neuropsicólogo especializado.'
      : results.total >= 4
        ? 'Sua pontuação situa-se próxima ao limiar de referência. Traços nessa faixa podem ser relevantes, principalmente se estratégias de camuflagem ("masking") diminuírem a pontuação aparente, mas houver sobrecarga no dia a dia.'
        : 'Sua pontuação situa-se na faixa típica inferior à linha de corte. No entanto, se você vivencia desafios significativos de comunicação ou sobrecarga sensorial, consulte um profissional qualificado.';

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
    renderDetailedBreakdown(results);

    try {
      localStorage.setItem('freeiqexam_autism_pt_history', JSON.stringify({
        sessionId: state.sessionId,
        date: new Date().toISOString(),
        scores: results
      }));
    } catch (_) {}

    announce('Resultados da autoavaliação AQ-10 calculados e exibidos na tela.');
  }

  function renderDetailedBreakdown(results) {
    const list = $('detailed-questions-list');
    if (!list) return;
    list.innerHTML = '';

    QUESTIONS.forEach((q) => {
      const val = state.answers[q.id];
      const opt = OPTIONS.find((o) => o.value === val) || { label: 'Não respondido' };
      const scored = results.itemScores[q.id] === 1;

      const item = document.createElement('div');
      item.className = 'p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm';
      item.innerHTML = `
        <div class="space-y-1 max-w-xl">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">P${q.id}</span>
            <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400">${q.context}</span>
          </div>
          <p class="text-zinc-900 dark:text-zinc-100 font-medium">${q.text}</p>
        </div>
        <div class="flex items-center gap-2 sm:text-right">
          <span class="font-semibold ${scored ? 'text-[#0066cc] dark:text-[#2997ff]' : 'text-zinc-600 dark:text-zinc-400'}">${opt.label}</span>
          ${scored ? '<span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-[#0066cc] dark:text-[#2997ff] border border-blue-500/20">1 Ponto</span>' : '<span class="text-[10px] text-zinc-400">0 Pts</span>'}
        </div>
      `;
      list.appendChild(item);
    });
  }

  function restart() {
    state.currentIndex = 0;
    state.answers = {};
    state.sessionId = generateSessionId();
    state.startedAt = new Date();

    $('results-section').classList.add('hidden');
    $('intro-section').classList.remove('hidden');
    $('intro-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setupEventListeners() {
    $('start-assessment-btn')?.addEventListener('click', () => {
      $('intro-section').classList.add('hidden');
      $('questionnaire-section').classList.remove('hidden');
      state.sessionId = generateSessionId();
      state.startedAt = new Date();
      renderQuestion();
      $('questionnaire-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('back-button')?.addEventListener('click', goBack);
    $('next-button')?.addEventListener('click', goNext);

    window.addEventListener('keydown', (e) => {
      if ($('questionnaire-section') && !$('questionnaire-section').classList.contains('hidden')) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 4) {
          selectAnswer(num - 1);
        } else if (e.key === 'ArrowLeft') {
          goBack();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
          goNext();
        }
      }
    });

    $('print-results-btn')?.addEventListener('click', () => window.print());

    $('copy-summary-btn')?.addEventListener('click', async () => {
      const results = calculateScores();
      const text = `FreeIQExam Brasil — Relatório de Autoavaliação do Espectro Autista (AQ-10)\n` +
        `Sessão: ${state.sessionId}\n` +
        `Data: ${new Date().toLocaleDateString('pt-BR')}\n` +
        `Pontuação Total: ${results.total} de 10 (Linha de Corte: ${REFERRAL_CUTOFF}/10)\n` +
        `Classificação: ${results.classification}\n` +
        `Subescalas:\n` +
        `- Comunicação Social: ${results.subscaleTotals.social}/5\n` +
        `- Sensorial e Detalhes: ${results.subscaleTotals.sensory}/2\n` +
        `- Alternância de Foco: ${results.subscaleTotals.attention}/2\n` +
        `- Sistematização: ${results.subscaleTotals.systematizing}/1\n\n` +
        `Nota: Questionário estritamente orientativo e psicoeducativo. Não constitui diagnóstico médico.`;

      try {
        await navigator.clipboard.writeText(text);
        const btn = $('copy-summary-btn');
        const orig = btn.textContent;
        btn.textContent = 'Copiado para a área de transferência!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      } catch (_) {}
    });

    $('restart-btn')?.addEventListener('click', restart);
  }

  document.addEventListener('DOMContentLoaded', setupEventListeners);
})();
