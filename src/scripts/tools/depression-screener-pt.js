(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * PHQ-9 — Questionário de Saúde do Paciente (Módulo de 9 Itens)
   * Versão adaptada para Português do Brasil (Spitzer, Kroenke & Williams)
   * Autoavaliação orientativa para as últimas 2 semanas (0–27 pontos)
   * mais pergunta funcional de impacto no cotidiano.
   *
   * AVISO: Este teste é estritamente psicoeducativo e orientativo.
   * Não substitui avaliação ou diagnóstico clínico médico/psicológico.
   * ------------------------------------------------------------------ */

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Nenhum dia', detail: '0 dias' },
    { value: 1, label: 'Vários dias', detail: '1–6 dias' },
    { value: 2, label: 'Mais da metade dos dias', detail: '7–11 dias' },
    { value: 3, label: 'Quase todos os dias', detail: '12–14 dias' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Nenhuma dificuldade', detail: 'Sem impacto no dia a dia' },
    { value: 1, label: 'Alguma dificuldade', detail: 'Dificuldade leve' },
    { value: 2, label: 'Muita dificuldade', detail: 'Prejuízo significativo' },
    { value: 3, label: 'Extrema dificuldade', detail: 'Comprometimento grave' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'affective',
      context: 'Pouco interesse ou prazer',
      text: 'Pouco interesse ou prazer em fazer as coisas que costumava apreciar (Anedonia)'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Humor deprimido',
      text: 'Sentir-se para baixo, deprimido(a), triste ou sem perspectiva de futuro'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Padrão de sono',
      text: 'Dificuldade para adormecer, permanecer dormindo ou acordar muito cedo, ou dormir em excesso'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Energia e disposição',
      text: 'Sensação frequente de cansaço, fadiga ou falta constante de energia para atividades básicas'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Apetite e alimentação',
      text: 'Pouco apetite ou, pelo contrário, necessidade compulsiva de comer em excesso'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Autoestima e culpa',
      text: 'Sentir-se mal consigo mesmo(a) — ou sentir que você é um fracasso ou que decepcionou a si ou a sua família'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Foco e concentração',
      text: 'Dificuldade para se concentrar nas coisas, como ler notícias, trabalhar ou assistir a programas de TV'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Lentidão ou agitação psicomotora',
      text: 'Mover-se ou falar tão lentamente que outras pessoas poderiam notar, ou estar tão agitado(a) e inquieto(a) que você fica andando sem parar'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Pensamentos sobre a vida e morte',
      text: 'Pensamentos de que seria melhor estar morto(a) ou vontade de ferir a si mesmo(a) de alguma maneira',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Pergunta Adicional · Impacto Funcional',
    text: 'Se você assinalou qualquer um desses problemas, qual o grau de dificuldade que eles causaram no seu trabalho, nas tarefas domésticas ou no convívio com as pessoas?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimal',
      min: 0,
      max: 4,
      label: 'Sintomas Mínimos ou Ausentes',
      badge: 'Sintomas Mínimos (0–4)',
      action: 'A pontuação atual sugere ausência de quadro depressivo clinicamente significativo. Mantenha rotinas saudáveis de sono, atividade física e conexão social.'
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Sintomas Depressivos Leves',
      badge: 'Sintomas Leves (5–9)',
      action: 'Indica presença de sintomas leves. Recomenda-se acompanhamento vigilante e consideração de mudanças no estilo de vida ou suporte psicológico se persistirem.'
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Sintomas Depressivos Moderados',
      badge: 'Sintomas Moderados (10–14)',
      action: 'Pontuação consistente com episódio depressivo moderado. Recomenda-se fortemente agendar uma consulta com médico de família, clínico geral ou psicólogo.'
    },
    {
      key: 'moderately_severe',
      min: 15,
      max: 19,
      label: 'Sintomas Moderadamente Graves',
      badge: 'Moderadamente Grave (15–19)',
      action: 'Indica sofrimento clínico expressivo. É indicado buscar avaliação especializada com médico psiquiatra ou psicólogo para elaboração de plano terapêutico.'
    },
    {
      key: 'severe',
      min: 20,
      max: 27,
      label: 'Sintomas Depressivos Graves',
      badge: 'Sintomas Graves (20–27)',
      action: 'Pontuação severa com impacto profundo. Procure atendimento médico imediato em uma UBS, CAPS ou serviço de emergência psiquiátrica.'
    }
  ];

  const state = {
    currentIndex: 0,
    answers: {},
    functionalAnswer: null,
    transitionTimer: null,
    transitionLocked: false,
    sessionId: '',
    startedAt: null,
    item9Acknowledged: false
  };

  const $ = (id) => document.getElementById(id);

  function generateSessionId() {
    return `PHQ9-BR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('depression-live-region');
    if (live) live.textContent = message;
  }

  function renderQuestion() {
    const isFunctional = state.currentIndex === QUESTIONS.length;
    const q = isFunctional ? FUNCTIONAL_ITEM : QUESTIONS[state.currentIndex];
    const total = TOTAL_STEPS;
    const progress = ((state.currentIndex + 1) / total) * 100;
    const selected = isFunctional ? state.functionalAnswer : state.answers[q.id];

    $('question-step').textContent = `Etapa ${state.currentIndex + 1} de ${total}`;
    $('question-context').textContent = q.context;
    $('question-text').textContent = q.text;
    $('progress-fill').style.width = `${Math.max(6, progress)}%`;
    $('progress-label').textContent = `${Math.round(progress)}% concluído`;

    const optionsContainer = $('likert-options');
    optionsContainer.innerHTML = '';

    const opts = isFunctional ? FUNCTIONAL_OPTIONS : LIKERT_OPTIONS;

    opts.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'likert-option';
      if (selected === opt.value) btn.classList.add('selected');
      btn.setAttribute('aria-pressed', selected === opt.value ? 'true' : 'false');
      btn.setAttribute('aria-label', `${opt.label} (${opt.detail}): ${q.text}`);
      btn.innerHTML = `
        <span class="likert-key">${opt.value}</span>
        <div class="flex flex-col text-left">
          <span class="font-semibold text-zinc-900 dark:text-white">${opt.label}</span>
          <span class="text-xs text-zinc-500 dark:text-zinc-400">${opt.detail}</span>
        </div>
      `;
      btn.addEventListener('click', () => selectAnswer(opt.value));
      optionsContainer.appendChild(btn);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === null || selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Concluir Avaliação' : 'Próxima Pergunta';
    announce(`Etapa ${state.currentIndex + 1} de ${total}. ${q.text}`);
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    const isFunctional = state.currentIndex === QUESTIONS.length;

    if (isFunctional) {
      state.functionalAnswer = value;
    } else {
      const q = QUESTIONS[state.currentIndex];
      state.answers[q.id] = value;

      // Item 9 safety trigger
      if (q.critical && value > 0 && !state.item9Acknowledged) {
        showCrisisModal();
        return;
      }
    }

    state.transitionLocked = true;
    renderQuestion();

    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;

      if (state.currentIndex < TOTAL_STEPS - 1) {
        state.currentIndex += 1;
        renderQuestion();
      } else {
        finishAssessment();
      }
    }, 200);
  }

  function showCrisisModal() {
    const modal = $('crisis-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');
    }
  }

  function hideCrisisModal() {
    const modal = $('crisis-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');
      state.item9Acknowledged = true;
      state.transitionLocked = false;
      if (state.currentIndex < TOTAL_STEPS - 1) {
        state.currentIndex += 1;
        renderQuestion();
      } else {
        finishAssessment();
      }
    }
  }

  function goNext() {
    if (state.transitionLocked) return;
    const isFunctional = state.currentIndex === QUESTIONS.length;
    const selected = isFunctional ? state.functionalAnswer : state.answers[QUESTIONS[state.currentIndex].id];
    if (selected === undefined || selected === null) return;

    if (state.currentIndex < TOTAL_STEPS - 1) {
      state.currentIndex += 1;
      renderQuestion();
    } else {
      finishAssessment();
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
    let totalScore = 0;
    let affectiveRaw = 0;
    let somaticRaw = 0;
    let cognitiveRaw = 0;

    QUESTIONS.forEach((q) => {
      const val = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      totalScore += val;
      if (q.axis === 'affective') affectiveRaw += val;
      else if (q.axis === 'somatic') somaticRaw += val;
      else if (q.axis === 'cognitive') cognitiveRaw += val;
    });

    const band = SEVERITY_BANDS.find((b) => totalScore >= b.min && totalScore <= b.max) || SEVERITY_BANDS[0];
    const item9Value = state.answers[9] || 0;

    return {
      totalScore,
      band,
      affectiveRaw,
      somaticRaw,
      cognitiveRaw,
      functionalAnswer: state.functionalAnswer,
      hasSuicidalIdeation: item9Value > 0
    };
  }

  function finishAssessment() {
    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');

    const scores = calculateScores();
    const band = scores.band;

    $('result-badge').textContent = band.badge;
    $('total-score-display').textContent = `${scores.totalScore} / 27`;
    $('result-title').textContent = band.label;
    $('result-description').textContent = band.action;
    $('session-id-display').textContent = state.sessionId;
    $('timestamp-display').textContent = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // Progress bar for score (out of 27)
    const scorePct = Math.round((scores.totalScore / 27) * 100);
    $('score-bar-fill').style.width = `${Math.max(5, scorePct)}%`;

    // Colors according to severity
    const resultCard = $('result-classification-card');
    resultCard.className = 'p-6 sm:p-8 rounded-3xl border transition-all duration-300';
    if (scores.totalScore >= 15) {
      resultCard.classList.add('bg-rose-500/10', 'border-rose-500/30');
      $('result-badge').className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30';
    } else if (scores.totalScore >= 10) {
      resultCard.classList.add('bg-amber-500/10', 'border-amber-500/30');
      $('result-badge').className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30';
    } else {
      resultCard.classList.add('bg-emerald-500/10', 'border-emerald-500/30');
      $('result-badge').className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30';
    }

    // Subscale values
    $('subscale-affective').textContent = `${scores.affectiveRaw} / 9`;
    $('subscale-somatic').textContent = `${scores.somaticRaw} / 9`;
    $('subscale-cognitive').textContent = `${scores.cognitiveRaw} / 9`;

    $('bar-affective').style.width = `${(scores.affectiveRaw / 9) * 100}%`;
    $('bar-somatic').style.width = `${(scores.somaticRaw / 9) * 100}%`;
    $('bar-cognitive').style.width = `${(scores.cognitiveRaw / 9) * 100}%`;

    // Functional impact
    const funcOpt = FUNCTIONAL_OPTIONS.find((o) => o.value === scores.functionalAnswer) || FUNCTIONAL_OPTIONS[0];
    $('functional-impact-display').textContent = funcOpt.label;

    // Item 9 critical warning banner
    if (scores.hasSuicidalIdeation) {
      $('item9-alert-card').classList.remove('hidden');
    } else {
      $('item9-alert-card').classList.add('hidden');
    }

    renderDetailedBreakdown();

    try {
      localStorage.setItem('freeiqexam_depression_pt_history', JSON.stringify({
        sessionId: state.sessionId,
        date: new Date().toISOString(),
        scores
      }));
    } catch (_) {}

    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    announce('Resultados da autoavaliação PHQ-9 exibidos na tela.');
  }

  function renderDetailedBreakdown() {
    const list = $('detailed-questions-list');
    if (!list) return;
    list.innerHTML = '';

    QUESTIONS.forEach((q) => {
      const val = state.answers[q.id];
      const opt = LIKERT_OPTIONS.find((o) => o.value === val) || { label: 'Não respondido' };

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
          <span class="font-semibold text-zinc-700 dark:text-zinc-300">${opt.label} (${val} pts)</span>
          ${q.critical && val > 0 ? '<span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">Atenção</span>' : ''}
        </div>
      `;
      list.appendChild(item);
    });
  }

  function restart() {
    state.currentIndex = 0;
    state.answers = {};
    state.functionalAnswer = null;
    state.sessionId = generateSessionId();
    state.startedAt = new Date();
    state.item9Acknowledged = false;

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

    $('close-crisis-modal-btn')?.addEventListener('click', hideCrisisModal);

    window.addEventListener('keydown', (e) => {
      if ($('questionnaire-section') && !$('questionnaire-section').classList.contains('hidden')) {
        const num = parseInt(e.key, 10);
        if (num >= 0 && num <= 3) {
          selectAnswer(num);
        } else if (e.key === 'ArrowLeft') {
          goBack();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
          goNext();
        }
      }
    });

    $('print-results-btn')?.addEventListener('click', () => window.print());

    $('copy-summary-btn')?.addEventListener('click', async () => {
      const scores = calculateScores();
      const text = `FreeIQExam Brasil — Relatório de Autoavaliação de Humor (PHQ-9)\n` +
        `Sessão: ${state.sessionId}\n` +
        `Data: ${new Date().toLocaleDateString('pt-BR')}\n` +
        `Pontuação Total: ${scores.totalScore} / 27 (${scores.band.label})\n` +
        `Subescalas — Afetiva: ${scores.affectiveRaw}/9 | Somática: ${scores.somaticRaw}/9 | Cognitiva: ${scores.cognitiveRaw}/9\n` +
        `Impacto Funcional: ${FUNCTIONAL_OPTIONS.find(o => o.value === scores.functionalAnswer)?.label || 'Não avaliado'}\n\n` +
        `Nota: Este questionário é estritamente orientativo e não substitui avaliação médica profissional.`;

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
