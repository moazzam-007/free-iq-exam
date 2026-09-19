(() => {
  'use strict';

  const OPTIONS = [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Raramente' },
    { value: 2, label: 'Às vezes' },
    { value: 3, label: 'Frequentemente' },
    { value: 4, label: 'Muito frequentemente' }
  ];

  const QUESTIONS = [
    { id: 1, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Finalização de Projetos', text: 'Com que frequência você tem dificuldade para finalizar os detalhes finais de um projeto, depois que as partes mais desafiadoras já foram feitas?' },
    { id: 2, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Organização e Planejamento', text: 'Com que frequência você tem dificuldade para colocar as coisas em ordem quando tem que realizar uma tarefa que exige organização?' },
    { id: 3, part: 'A', domain: 'inattentive', shadedMin: 2, context: 'Memória Prospectiva', text: 'Com que frequência você tem problemas para se lembrar de compromissos ou obrigações cotidianas?' },
    { id: 4, part: 'A', domain: 'inattentive', shadedMin: 3, context: 'Início de Tarefas e Procrastinação', text: 'Quando você tem uma tarefa que exige muito raciocínio ou concentração, com que frequência você evita ou adia o início?' },
    { id: 5, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Inquietação Motora', text: 'Com que frequência você fica inquieto, mexendo as mãos ou os pés, quando precisa ficar sentado por muito tempo?' },
    { id: 6, part: 'A', domain: 'hyperactive', shadedMin: 3, context: 'Impulso Interno', text: 'Com que frequência você se sente excessivamente ativo e impulsionado a fazer coisas, como se estivesse "ligado em um motor"?' },
    { id: 7, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Atenção aos Detalhes', text: 'Com que frequência você comete erros por descuido ou desatenção ao trabalhar em um projeto chato ou difícil?' },
    { id: 8, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Atenção Sustentada', text: 'Com que frequência você tem dificuldade para manter a atenção quando está realizando tarefas monótonas ou repetitivas?' },
    { id: 9, part: 'B', domain: 'inattentive', shadedMin: 2, context: 'Escuta Focada', text: 'Com que frequência você tem dificuldade para se concentrar no que as pessoas dizem, mesmo quando estão falando diretamente com você?' },
    { id: 10, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Organização Diária', text: 'Com que frequência você perde ou tem dificuldade para encontrar objetos em casa ou no ambiente de trabalho?' },
    { id: 11, part: 'B', domain: 'inattentive', shadedMin: 3, context: 'Distratibilidade', text: 'Com que frequência você se distrai facilmente com ruídos externos ou acontecimentos ao seu redor?' },
    { id: 12, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Permanência Sentado', text: 'Com que frequência você se levanta do seu lugar em reuniões ou em outras situações onde deveria permanecer sentado?' },
    { id: 13, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Agitação Interna', text: 'Com que frequência você se sente internamente inquieto ou agitado?' },
    { id: 14, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Dificuldade para Relaxar', text: 'Com que frequência você tem dificuldade para relaxar, desacelerar e descansar no seu tempo livre?' },
    { id: 15, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Verbosidade Social', text: 'Com que frequência você se percebe falando demais em situações sociais ou reuniões?' },
    { id: 16, part: 'B', domain: 'hyperactive', shadedMin: 2, context: 'Impulsividade Conversacional', text: 'Quando está conversando com alguém, com que frequência você termina as frases das outras pessoas antes que elas concluam?' },
    { id: 17, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Tolerância à Espera', text: 'Com que frequência você tem dificuldade para esperar sua vez em filas ou situações que exigem paciência?' },
    { id: 18, part: 'B', domain: 'hyperactive', shadedMin: 3, context: 'Intrusão Social', text: 'Com que frequência você interrompe ou interfere nas conversas e atividades dos outros quando eles estão ocupados?' }
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

  function generateSessionId() {
    return `ASRS-BR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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

    $('question-number').textContent = `Pergunta ${q.id} de ${total}`;
    $('question-part').textContent = q.part === 'A' ? 'Parte A · Triagem Central da OMS' : 'Parte B · Investigação Detalhada de Sintomas';
    $('question-domain').textContent = q.domain === 'inattentive' ? 'Desatenção' : 'Hiperatividade / Impulsividade';
    $('question-heading').textContent = q.text;
    $('question-context').textContent = q.context;
    $('progress-fill').style.width = `${Math.max(4, progress)}%`;
    $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)}% preenchido`;

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
        ${isClinical ? '<span class="likert-clinical-badge">Zona de Relevância</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Concluir Questionário' : 'Próxima Pergunta';
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

    let classification = 'Baixa probabilidade / padrão subclínico';
    let badge = 'Baixa probabilidade de relevância clínica';
    let tone = 'low';

    if (partAPositive) {
      badge = 'Probabilidade elevada — avaliação clínica recomendada';
      tone = 'high';
      classification = inattentionElevated && hyperactivityElevated
        ? 'Padrão sintomático combinado (desatenção e hiperatividade/impulsividade)'
        : inattentionElevated
          ? 'Padrão predominantemente desatento'
          : hyperactivityElevated
            ? 'Padrão predominantemente hiperativo-impulsivo'
            : 'Triagem Parte A positiva para sintomas consistentes de TDAH';
    } else if (partAShaded >= 2 || inattentionElevated || hyperactivityElevated) {
      badge = 'Padrão sintomático moderado ou limítrofe';
      tone = 'moderate';
      classification = 'Sintomatologia moderada com áreas pontuais de atenção';
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
        state.cognitive.countdownTimer = null;
        $('cognitive-countdown').classList.add('hidden');
        nextTrial();
      }
    }, 700);
  }

  function nextTrial() {
    const cog = state.cognitive;
    if (!cog || !state.cognitiveRunning) return;

    if (cog.trial >= cog.trials.length) {
      finishCognitive();
      return;
    }

    cog.stimulusType = cog.trials[cog.trial];
    cog.stimulusActive = false;
    cog.responded = false;
    $('cognitive-feedback').textContent = '';
    $('cognitive-counter').textContent = `Tentativa ${cog.trial + 1} de ${cog.trials.length}`;

    const target = $('cognitive-target');
    target.className = 'w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl transition-all duration-100 shadow-lg select-none opacity-0';

    const delay = 600 + Math.floor(Math.random() * 800);

    cog.presentationTimer = window.setTimeout(() => {
      if (!state.cognitiveRunning) return;

      cog.stimulusActive = true;
      cog.stimulusStart = performance.now();

      if (cog.stimulusType === 'go') {
        target.className = 'w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl text-white bg-emerald-600 dark:bg-emerald-500 shadow-emerald-500/40 shadow-xl select-none scale-105 transition-transform duration-75';
        target.textContent = 'GO (Espaço)';
      } else {
        target.className = 'w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl text-white bg-rose-600 dark:bg-rose-500 shadow-rose-500/40 shadow-xl select-none scale-105 transition-transform duration-75';
        target.textContent = 'PARE';
      }

      cog.stimulusTimer = window.setTimeout(() => {
        if (!cog.responded) {
          if (cog.stimulusType === 'go') {
            cog.omissionErrors += 1;
            $('cognitive-feedback').textContent = 'Omissão (Sem resposta no alvo GO)';
            $('cognitive-feedback').className = 'text-amber-500 font-semibold text-sm';
          }
        }
        target.classList.add('opacity-0');
        cog.stimulusActive = false;
        cog.trial += 1;
        cog.stimulusTimer = window.setTimeout(nextTrial, 350);
      }, 750);
    }, delay);
  }

  function handleCognitiveInput() {
    const cog = state.cognitive;
    if (!cog || !cog.stimulusActive || cog.responded) return;

    cog.responded = true;
    const rt = Math.round(performance.now() - cog.stimulusStart);
    const target = $('cognitive-target');
    window.clearTimeout(cog.stimulusTimer);

    if (cog.stimulusType === 'go') {
      cog.responseTimes.push(rt);
      $('cognitive-feedback').textContent = `Excelente: ${rt} ms`;
      $('cognitive-feedback').className = 'text-emerald-500 font-semibold text-sm';
      target.classList.add('scale-95');
    } else {
      cog.commissionErrors += 1;
      $('cognitive-feedback').textContent = 'Erro de Inibição (Clicou no NO-GO)';
      $('cognitive-feedback').className = 'text-rose-500 font-semibold text-sm';
      target.classList.add('animate-shake');
    }

    target.classList.add('opacity-0');
    cog.stimulusActive = false;
    cog.trial += 1;
    cog.stimulusTimer = window.setTimeout(nextTrial, 400);
  }

  function finishCognitive() {
    state.cognitiveRunning = false;
    renderResults();
  }

  function skipCognitive() {
    if (state.cognitive) {
      window.clearTimeout(state.cognitive.stimulusTimer);
      window.clearTimeout(state.cognitive.presentationTimer);
      window.clearInterval(state.cognitive.countdownTimer);
    }
    state.cognitiveRunning = false;
    state.cognitive = null;
    renderResults();
  }

  function renderResults() {
    $('cognitive-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');

    const scores = calculateScores();
    const resultCard = $('result-classification-card');
    resultCard.className = 'p-6 sm:p-8 rounded-3xl border transition-all duration-300';

    if (scores.tone === 'high') {
      resultCard.classList.add('bg-amber-500/10', 'border-amber-500/40', 'dark:bg-amber-500/10');
      $('result-badge').className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30';
    } else if (scores.tone === 'moderate') {
      resultCard.classList.add('bg-blue-500/10', 'border-blue-500/30', 'dark:bg-blue-500/10');
      $('result-badge').className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-500/20 text-[#0066cc] dark:text-[#2997ff] border border-blue-500/30';
    } else {
      resultCard.classList.add('bg-emerald-500/10', 'border-emerald-500/30', 'dark:bg-emerald-500/10');
      $('result-badge').className = 'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30';
    }

    $('result-badge').textContent = scores.badge;
    $('result-title').textContent = scores.classification;
    $('session-id-display').textContent = state.sessionId;
    $('timestamp-display').textContent = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    $('score-part-a-shaded').textContent = `${scores.partAShaded} / 6`;
    $('score-inattention-shaded').textContent = `${scores.inattentionShaded} / 9`;
    $('score-hyperactivity-shaded').textContent = `${scores.hyperactivityShaded} / 9`;

    $('progress-bar-part-a').style.width = `${(scores.partAShaded / 6) * 100}%`;
    $('progress-bar-inattention').style.width = `${(scores.inattentionShaded / 9) * 100}%`;
    $('progress-bar-hyperactivity').style.width = `${(scores.hyperactivityShaded / 9) * 100}%`;

    const cog = state.cognitive;
    const cogPanel = $('cognitive-results-card');

    if (cog && cog.responseTimes.length > 0) {
      cogPanel.classList.remove('hidden');
      const meanRt = Math.round(cog.responseTimes.reduce((a, b) => a + b, 0) / cog.responseTimes.length);
      $('cog-mean-rt').textContent = `${meanRt} ms`;
      $('cog-commission').textContent = `${cog.commissionErrors} de 5`;
      $('cog-omission').textContent = `${cog.omissionErrors} de 15`;
    } else {
      cogPanel.classList.add('hidden');
    }

    renderDetailedBreakdown();

    try {
      localStorage.setItem('freeiqexam_adhd_pt_history', JSON.stringify({
        sessionId: state.sessionId,
        date: new Date().toISOString(),
        scores
      }));
    } catch (_) {}

    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    announce('Resultados da autoavaliação calculados e exibidos na tela.');
  }

  function renderDetailedBreakdown() {
    const list = $('detailed-questions-list');
    if (!list) return;
    list.innerHTML = '';

    QUESTIONS.forEach((q) => {
      const val = state.answers[q.id];
      const opt = OPTIONS.find((o) => o.value === val) || { label: 'Não respondido' };
      const shaded = val >= q.shadedMin;

      const item = document.createElement('div');
      item.className = 'p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm';
      item.innerHTML = `
        <div class="space-y-1 max-w-xl">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">P${q.id} · Parte ${q.part}</span>
            <span class="text-xs font-medium text-zinc-500 dark:text-zinc-400">${q.context}</span>
          </div>
          <p class="text-zinc-900 dark:text-zinc-100 font-medium">${q.text}</p>
        </div>
        <div class="flex items-center gap-2 sm:text-right">
          <span class="font-semibold ${shaded ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-600 dark:text-zinc-400'}">${opt.label}</span>
          ${shaded ? '<span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">Relevante</span>' : ''}
        </div>
      `;
      list.appendChild(item);
    });
  }

  function restart() {
    state.currentIndex = 0;
    state.answers = {};
    state.cognitive = null;
    state.cognitiveRunning = false;
    state.sessionId = generateSessionId();
    state.startedAt = new Date();

    $('results-section').classList.add('hidden');
    $('cognitive-section').classList.add('hidden');
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

    $('start-cognitive-btn')?.addEventListener('click', beginCognitive);
    $('skip-cognitive-btn')?.addEventListener('click', skipCognitive);
    $('cognitive-target')?.addEventListener('pointerdown', handleCognitiveInput);

    window.addEventListener('keydown', (e) => {
      if ($('questionnaire-section') && !$('questionnaire-section').classList.contains('hidden')) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 5) {
          selectAnswer(num - 1);
        } else if (e.key === 'ArrowLeft') {
          goBack();
        } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
          goNext();
        }
      } else if (state.cognitiveRunning && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        handleCognitiveInput();
      }
    });

    $('print-results-btn')?.addEventListener('click', () => window.print());

    $('copy-summary-btn')?.addEventListener('click', async () => {
      const scores = calculateScores();
      const text = `FreeIQExam Brasil — Relatório de Autoavaliação TDAH (ASRS v1.1)\n` +
        `Sessão: ${state.sessionId}\n` +
        `Data: ${new Date().toLocaleDateString('pt-BR')}\n` +
        `Classificação: ${scores.classification}\n` +
        `Parte A (Sintomas na Faixa Relevante): ${scores.partAShaded} de 6 (Critério ≥ 4: ${scores.partAPositive ? 'Positivo' : 'Negativo'})\n` +
        `Desatenção Total na Faixa: ${scores.inattentionShaded} de 9\n` +
        `Hiperatividade Total na Faixa: ${scores.hyperactivityShaded} de 9\n\n` +
        `Nota: Este resultado é meramente orientativo e não constitui diagnóstico clínico médico.`;

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
