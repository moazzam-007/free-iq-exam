(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * AQ-10 — Autism-Spectrum Quotient (10-item versie voor volwassenen)
   * Allison, Auyeung & Baron-Cohen (Autism Research Centre, Cambridge).
   * Binaire scoring (0–10) volgens de NICE-richtlijnen (CG142).
   * Verwijsdrempel: score ≥ 6 van 10.
   *
   * Deze engine produceert uitsluitend informatieve screeningresultaten.
   * Het is geen formele diagnose en kan autisme niet definitief vaststellen.
   * ------------------------------------------------------------------ */

  const OPTIONS = [
    { value: 0, label: 'Helemaal mee eens' },
    { value: 1, label: 'Mee eens' },
    { value: 2, label: 'Mee oneens' },
    { value: 3, label: 'Helemaal mee oneens' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      subscale: 'sensory',
      direction: 'agree',
      context: 'Sensorische waarneming & detailfocus',
      text: 'Ik merk vaak kleine geluiden op als anderen dat niet doen.'
    },
    {
      id: 2,
      subscale: 'sensory',
      direction: 'disagree',
      context: 'Overzicht versus detailwaarneming',
      text: 'Ik concentreer me meestal meer op het grote geheel dan op de details.'
    },
    {
      id: 3,
      subscale: 'attention',
      direction: 'disagree',
      context: 'Aandacht & multitasking',
      text: 'Ik vind het makkelijk om meer dan één ding tegelijk te doen.'
    },
    {
      id: 4,
      subscale: 'attention',
      direction: 'disagree',
      context: 'Taakomschakeling na onderbreking',
      text: 'Als ik onderbroken word, kan ik heel snel weer verdergaan waarmee ik bezig was.'
    },
    {
      id: 5,
      subscale: 'social',
      direction: 'disagree',
      context: 'Sociale communicatie & nuance',
      text: "Ik vind het makkelijk om 'tussen de regels door te lezen' als iemand tegen me praat."
    },
    {
      id: 6,
      subscale: 'social',
      direction: 'disagree',
      context: 'Sociale signalen & interactie',
      text: 'Ik weet hoe ik kan zien of iemand die naar me luistert zich verveelt.'
    },
    {
      id: 7,
      subscale: 'social',
      direction: 'agree',
      context: 'Theory of Mind & verhaallijnen',
      text: 'Wanneer ik een verhaal lees, vind ik het moeilijk om de bedoelingen van de personages te begrijpen.'
    },
    {
      id: 8,
      subscale: 'systematizing',
      direction: 'agree',
      context: 'Systematisering & gerichte interesses',
      text: "Ik verzamel graag informatie over categorieën van dingen (zoals types auto's, vogels, treinen of planten)."
    },
    {
      id: 9,
      subscale: 'social',
      direction: 'disagree',
      context: 'Emotieherkenning & mimiek',
      text: 'Ik vind het makkelijk om aan iemands gezichtsuitdrukking te zien wat diegene denkt of voelt.'
    },
    {
      id: 10,
      subscale: 'social',
      direction: 'agree',
      context: 'Vriendschappen & sociale relaties',
      text: 'Ik vind het moeilijk om nieuwe vrienden te maken.'
    }
  ];

  const SUBSCALES = {
    social: {
      label: 'Sociale communicatie & empathie',
      short: 'Sociaal',
      max: 5,
      color: '#10b981',
      blurb: 'Theory of mind, sociale signalen, communicatieve wederkerigheid'
    },
    sensory: {
      label: 'Sensorische waarneming & detailfocus',
      short: 'Sensorisch',
      max: 2,
      color: '#06b6d4',
      blurb: 'Prikkelverwerking en oog voor subtiele details'
    },
    attention: {
      label: 'Aandacht & taakomschakeling',
      short: 'Aandacht',
      max: 2,
      color: '#8b5cf6',
      blurb: 'Flexibiliteit, taakwisseling en verwerken van onderbrekingen'
    },
    systematizing: {
      label: 'Systematisering & patronen',
      short: 'Systematisch',
      max: 1,
      color: '#f59e0b',
      blurb: 'Informatie categoriseren, patronen herkennen en diepgaande interesses'
    }
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
    return `AQ-NL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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

    $('question-number').textContent = `Vraag ${q.id} van ${total}`;
    $('question-part').textContent = 'AQ-10 · Autism-Spectrum Quotient';
    $('question-domain').textContent = meta.label;
    $('question-heading').textContent = q.text;
    $('question-context').textContent = q.context;
    $('progress-fill').style.width = `${Math.max(4, progress)}%`;
    $('progress-label').textContent = `${Math.round((answeredCount() / total) * 100)}% beantwoord`;

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
        ${scores ? '<span class="likert-clinical-badge">Scoort 1 punt</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Bekijk uitslag' : 'Volgende vraag';
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

  /* ---------------------------------------------------------------- *
   * Scoring
   * ---------------------------------------------------------------- */

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
      badge = 'Boven de verwijsdrempel (≥6) — nader onderzoek aanbevolen';
      classification = 'Klinisch relevant autistisch kenmerkenpatroon';
    } else if (total >= 4) {
      tone = 'moderate';
      badge = 'Grensgebied (4–5) — context en lijdensdruk bepalend';
      classification = 'Verhoogd autistisch kenmerkenpatroon';
    } else {
      tone = 'low';
      badge = 'Onder de klinische verwijsdrempel (<4)';
      classification = 'Laag aantal autistische kenmerken';
    }

    return { total, subscaleTotals, aboveThreshold, classification, badge, tone };
  }

  /* ---------------------------------------------------------------- *
   * Radar chart — animated 60fps canvas, DPR-aware, reduced-motion safe
   * ---------------------------------------------------------------- */

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

    // Grid rings at 25/50/75/100%
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

    // Spokes
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

    // Vertices + labels
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

    // Hover interaction: nearest-vertex tooltip
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
          tooltip.textContent = `${meta.label}: ${results.subscaleTotals[key]} van ${meta.max} — ${meta.blurb}`;
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

  /* ---------------------------------------------------------------- *
   * Results
   * ---------------------------------------------------------------- */

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function subscaleStatus(value, max) {
    const ratio = max === 0 ? 0 : value / max;
    if (ratio >= 0.75) return 'Sterk aanwezig';
    if (ratio >= 0.5) return 'Matig aanwezig';
    if (ratio > 0) return 'Licht aanwezig';
    return 'Niet of nauwelijks aanwezig';
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
      ? `Op of boven de verwijsdrempel van ${REFERRAL_CUTOFF}`
      : `Onder de verwijsdrempel van ${REFERRAL_CUTOFF}`;

    $('result-narrative').textContent = results.aboveThreshold
      ? 'Uw antwoorden overschrijden de officiële verwijsdrempel van de AQ-10 (score ≥ 6). Dit betekent dat u een significant aantal autistische kenmerken vertoont. Dit rechtvaardigt nader specialistisch onderzoek via een huisarts of GGZ-poli. Het is geen definitieve diagnose.'
      : results.total >= 4
        ? 'Uw antwoorden liggen in het grensgebied (4–5 punten). Bij veel volwassenen (met name vrouwen) kan jarenlang aangeleerd compensatiegedrag ("masking") de score dempen. Als u aanzienlijke hinder ondervindt in uw dagelijks leven, is overleg met een specialist aan te raden.'
        : 'Uw antwoorden vallen onder de klinische verwijsdrempel. Een lage score sluit specifieke sensorische of communicatieve gevoeligheden niet uit, maar duidt niet op een primair autistisch patroon volgens de AQ-10.';

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
      ['Sociale communicatie & empathie (V5–V7, V9–V10)', results.subscaleTotals.social, 5],
      ['Sensorische waarneming & detailfocus (V1–V2)', results.subscaleTotals.sensory, 2],
      ['Aandacht & taakomschakeling (V3–V4)', results.subscaleTotals.attention, 2],
      ['Systematisering & patronen (V8)', results.subscaleTotals.systematizing, 1]
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
      cells += `<div class="threshold-cell${active ? ' active' : ''}${inZone ? ' referral-zone' : ''}" title="Score ${score}${score >= REFERRAL_CUTOFF ? ' — verwijsbereik' : ''}">
        <span>${score}</span>${active ? '<em>U</em>' : ''}
      </div>`;
    }
    container.innerHTML = cells;
  }

  function renderNextSteps(results) {
    const steps = results.aboveThreshold
      ? [
        'Bespreek deze uitslag met uw huisarts voor een verwijzing naar een gespecialiseerd diagnostisch centrum of GGZ-poli voor volwassenen met autisme.',
        'Neem dit afgedrukte rapport mee, aangevuld met voorbeelden uit uw jeugd en dagelijks leven: sociale interacties, overprikkeling en routines.',
        'Benoem expliciet of u geneigd bent gedrag sociaal te compenseren ("masking"), aangezien dit tijdens korte gesprekken kenmerken kan maskeren.',
        'Onderzoek tegelijkertijd praktische aanpassingen op de werkplek of studie (zoals een prikkelarme werkplek of duidelijke schriftelijke instructies).'
      ]
      : results.total >= 4
        ? [
          'Scores in het grensgebied verdienen context. Noteer in welke situaties u spanning ervaart en wat de impact is op uw dagelijks leven.',
          'Overweeg mogelijke overlap met ADHD (AuDHD), hooggevoeligheid of angststoornissen, die raakvlakken hebben met dit profiel.',
          'Wanneer u aanzienlijke hinder ervaart in uw functioneren, is een oriënterend gesprek met een psycholoog of de praktijkondersteuner (POH-GGZ) altijd waardevol.',
          'Herhaal de zelftest gerust na enkele maanden wanneer u meer inzicht krijgt in uw eigen copingmechanismen.'
        ]
        : [
          'Op basis van deze score is een gerichte verwijzing voor diagnostisch autismeonderzoek niet direct geïndiceerd.',
          'Blijft u tegen hardnekkige sociale of sensorische problemen aanlopen? Bespreek uw klachten dan open met uw huisarts.',
          'Onderzoek of een andere verklaring beter past, zoals chronische stress, sociale angst, oververmoeidheid of stemmingsproblemen.'
        ];

    $('next-steps-list').innerHTML = steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 10 — ${results.classification}`;
    $('print-threshold').textContent = results.aboveThreshold
      ? `Op of boven de verwijsdrempel van ${REFERRAL_CUTOFF}`
      : `Onder de verwijsdrempel van ${REFERRAL_CUTOFF}`;
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

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `Ik heb de FreeIQExam AQ-10 autisme zelftest afgerond. Score: ${results.total}/10 (verwijsdrempel ≥6). Uitslag: ${results.badge}. Dit is een indicatieve screening, geen diagnose.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam AQ-10 Autisme Zelftest', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Samenvatting gekopieerd naar klembord.');
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
      showToast('Samenvatting gekopieerd naar klembord.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Delen niet beschikbaar.');
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
    announce('Zelftest opnieuw gestart.');
  }

  /* ---------------------------------------------------------------- *
   * Init
   * ---------------------------------------------------------------- */

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
