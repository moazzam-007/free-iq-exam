(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * AQ-10 — Autism Spectrum Quotient, 10-Item Version für Erwachsene
   * Allison, Auyeung & Baron-Cohen. NICE-konforme Auswertung (0–10)
   * mit 4 Eigenschaftsskalen und interaktivem Radar-Profil.
   *
   * Dieser Selbsttest liefert ausschließlich orientierende Information.
   * Er ersetzt keine fachärztliche oder psychologische Diagnostik.
   * ------------------------------------------------------------------ */

  const OPTIONS = [
    { value: 0, label: 'Stimme voll und ganz zu' },
    { value: 1, label: 'Stimme eher zu' },
    { value: 2, label: 'Stimme eher nicht zu' },
    { value: 3, label: 'Stimme überhaupt nicht zu' }
  ];

  const QUESTIONS = [
    { id: 1, subscale: 'sensory', direction: 'agree', context: 'Sensorik · Detailwahrnehmung', text: 'Ich bemerke oft leise Geräusche, die anderen entgehen.' },
    { id: 2, subscale: 'sensory', direction: 'disagree', context: 'Ganzheitliche vs. lokale Verarbeitung', text: 'Ich konzentriere mich normalerweise mehr auf das Gesamtbild als auf kleine Details.' },
    { id: 3, subscale: 'attention', direction: 'disagree', context: 'Aufmerksamkeitswechsel', text: 'Es fällt mir leicht, mehrere Dinge gleichzeitig zu tun.' },
    { id: 4, subscale: 'attention', direction: 'disagree', context: 'Aufmerksamkeitswechsel', text: 'Nach einer Unterbrechung kann ich sehr schnell wieder zu dem zurückkehren, was ich gerade getan habe.' },
    { id: 5, subscale: 'social', direction: 'disagree', context: 'Soziale Kommunikation', text: 'Es fällt mir leicht, „zwischen den Zeilen zu lesen“, wenn jemand mit mir spricht.' },
    { id: 6, subscale: 'social', direction: 'disagree', context: 'Soziale Interaktion', text: 'Ich erkenne schnell, wenn jemand, der mir zuhört, sich zu langweilen beginnt.' },
    { id: 7, subscale: 'social', direction: 'agree', context: 'Theory of Mind · Kontextverständnis', text: 'Wenn ich eine Geschichte lese, fällt es mir schwer, die Absichten der Charaktere zu verstehen.' },
    { id: 8, subscale: 'systematizing', direction: 'agree', context: 'Systematisieren & Spezialinteressen', text: 'Ich sammle gern Informationen über bestimmte Kategorien von Dingen.' },
    { id: 9, subscale: 'social', direction: 'disagree', context: 'Mimik & Empathie', text: 'Es fällt mir leicht zu erkennen, was jemand denkt oder fühlt, indem ich einfach in das Gesicht der Person schaue.' },
    { id: 10, subscale: 'social', direction: 'agree', context: 'Soziale Beziehungen', text: 'Es fällt mir schwer, neue Freundschaften zu schließen.' }
  ];

  const SUBSCALES = {
    social: { label: 'Soziale Kommunikation', short: 'Sozial', max: 5, color: '#10b981', blurb: 'Theory of Mind, soziale Signale, Beziehungsgestaltung' },
    sensory: { label: 'Sensorik & Detailfokus', short: 'Sensorik', max: 2, color: '#06b6d4', blurb: 'Sensorische Reize, Detailfokus vs. Gesamtbild' },
    attention: { label: 'Aufmerksamkeitswechsel', short: 'Fokus', max: 2, color: '#8b5cf6', blurb: 'Aufgabenwechsel, Flexibilität, Routinen' },
    systematizing: { label: 'Systematisierende Interessen', short: 'System.', max: 1, color: '#f59e0b', blurb: 'Mustersuche, Kategorisierung, fokussierte Interessen' }
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
    return `AQ10-DE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
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

    $('question-number').textContent = `Frage ${q.id} von ${total}`;
    $('question-part').textContent = 'AQ-10 · Autismus-Spektrum Orientierung';
    $('question-domain').textContent = meta.label;
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
      const scores = itemScoresOne(q, option.value);
      if (scores) button.classList.add('clinical-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', `${option.label}: ${q.text}`);
      button.innerHTML = `
        <span class="likert-key">${option.value + 1}</span>
        <span class="likert-label">${option.label}</span>
        ${scores ? '<span class="likert-clinical-badge">1 Punkt</span>' : ''}
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      options.appendChild(button);
    });

    $('back-button').disabled = state.currentIndex === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent = state.currentIndex === total - 1 ? 'Auswertung anzeigen' : 'Nächste Frage';
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
      const val = state.answers[q.id];
      if (itemScoresOne(q, val)) {
        total += 1;
        subscaleTotals[q.subscale] += 1;
      }
    });

    const aboveThreshold = total >= REFERRAL_CUTOFF;
    let classification = '';
    let badge = '';
    let tone = 'low';

    if (aboveThreshold) {
      tone = 'high';
      badge = 'Schwellenwert erreicht (≥ 6 / 10)';
      classification = 'Hinweis auf klinisch signifikante autistische Züge';
    } else if (total >= 4) {
      tone = 'moderate';
      badge = 'Grenzbereich (4–5 / 10)';
      classification = 'Mäßige Ausprägung autistischer Merkmale';
    } else {
      tone = 'low';
      badge = 'Unterhalb des Schwellenwerts (< 6 / 10)';
      classification = 'Geringe Ausprägung / unauffälliges Profil';
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
          tooltip.textContent = `${meta.label}: ${results.subscaleTotals[key]} von ${meta.max} — ${meta.blurb}`;
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
    if (ratio >= 0.75) return 'Stark ausgeprägt';
    if (ratio >= 0.5) return 'Moderat ausgeprägt';
    if (ratio > 0) return 'Gering ausgeprägt';
    return 'Minimal / keine Nennung';
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
      ? `Erreicht oder überschreitet den Schwellenwert von ${REFERRAL_CUTOFF}`
      : `Liegt unter dem klinischen Schwellenwert von ${REFERRAL_CUTOFF}`;

    $('result-narrative').textContent = results.aboveThreshold
      ? 'Ihr Punktwert erreicht den Schwellenwert des AQ-10. Dies deutet auf klinisch relevante autistische Züge hin und rechtfertigt eine weiterführende diagnostische Abklärung bei einem spezialisierten Facharzt oder einer Autismus-Ambulanz. Es stellt keine formelle Diagnose dar.'
      : results.total >= 4
        ? 'Ihr Wert liegt knapp unterhalb der Überweisungsschwelle. Merkmale auf dieser Ebene können dennoch bedeutsam sein — insbesondere wenn Kompensationsstrategien („Masking“) die Punkte dämpfen und im Alltag Belastungen entstehen.'
        : 'Ihr Ergebnis liegt im unauffälligen Bereich unterhalb des Schwellenwerts. Ein niedriger Wert schließt andere Ursachen für soziale Erschöpfung oder sensorische Reizüberflutung nicht aus; anhaltende Schwierigkeiten sollten ärztlich besprochen werden.';

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
      ['Soziale Kommunikation & Interaktion (Q5–Q7, Q9–Q10)', results.subscaleTotals.social, 5],
      ['Sensorik & Detailfokus (Q1–Q2)', results.subscaleTotals.sensory, 2],
      ['Aufmerksamkeitswechsel & Flexibilität (Q3–Q4)', results.subscaleTotals.attention, 2],
      ['Systematisierende Interessen (Q8)', results.subscaleTotals.systematizing, 1]
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
      cells += `<div class="threshold-cell${active ? ' active' : ''}${inZone ? ' referral-zone' : ''}" title="Score ${score}${score >= REFERRAL_CUTOFF ? ' — Schwellenwert-Bereich' : ''}">
        <span>${score}</span>${active ? '<em>Sie</em>' : ''}
      </div>`;
    }
    container.innerHTML = cells;
  }

  function renderNextSteps(results) {
    const steps = results.aboveThreshold
      ? [
        'Fachärztliche Abklärung: Wenden Sie sich an eine Spezialambulanz für Autismus im Erwachsenenalter oder einen Facharzt für Psychiatrie/Psychotherapie.',
        'Vorbereitung: Bringen Sie diesen orientierenden Ausdruck sowie konkrete biografische Beispiele (Schule, Beruf, soziale Interaktion, Reizempfindlichkeit) mit.',
        'Masking thematisieren: Falls Sie soziale Situationen durch ständige bewusste Anpassung („Camouflaging“) bewältigen, sprechen Sie dies im Gespräch offen an.',
        'Nachteilsausgleiche prüfen: Anpassungen am Arbeitsplatz (z. B. Lärmschutz, klare schriftliche Vorgaben) können oft auch unabhängig von einem formalen Gutachten besprochen werden.'
      ]
      : results.total >= 4
        ? [
          'Ergebnisse im Grenzbereich verdienen Kontext: Notieren Sie, in welchen Situationen sensorische Überlastung oder Kommunikationshürden auftreten.',
          'Differenzialdiagnosen bedenken: ADHS, soziale Angststörungen oder Hochsensibilität weisen teilweise ähnliche Verhaltensmuster auf.',
          'Bei anhaltendem Leidensdruck im Alltag lohnt sich ein professionelles Gespräch unabhängig vom numerischen Wert.',
          'Wiederholen Sie das Screening nach einigen Monaten, falls Sie unbewusste Kompensationsstrategien reflektieren.'
        ]
        : [
          'Auf Basis dieses orientierenden Ergebnisses ist derzeit keine Überweisung indiziert.',
          'Sollten Sie dennoch unter chronischer Erschöpfung oder zwischenmenschlichen Belastungen leiden, sprechen Sie mit einem Arzt oder Therapeuten.',
          'Andere Ursachen wie Stress, Schlafstörungen oder soziale Ängste können ähnliche Symptome hervorrufen.',
          'Wiederholen Sie den Test, wenn sich Ihre Wahrnehmung oder persönliche Situation grundlegend ändert.'
        ];

    $('next-steps-list').innerHTML = steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 10 — ${results.classification}`;
    $('print-threshold').textContent = results.aboveThreshold
      ? `Erreicht oder überschreitet den Schwellenwert von ${REFERRAL_CUTOFF}`
      : `Liegt unter dem klinischen Schwellenwert von ${REFERRAL_CUTOFF}`;
    $('print-social').textContent = `${results.subscaleTotals.social} / 5`;
    $('print-sensory').textContent = `${results.subscaleTotals.sensory} / 2`;
    $('print-attention').textContent = `${results.subscaleTotals.attention} / 2`;
    $('print-systematizing').textContent = `${results.subscaleTotals.systematizing} / 1`;

    $('print-answer-body').innerHTML = QUESTIONS.map((q) => {
      const val = state.answers[q.id];
      const scores = itemScoresOne(q, val);
      return `<tr><td>${q.id}</td><td>${SUBSCALES[q.subscale].label}</td><td>${OPTIONS[val !== undefined ? val : 0].label}</td><td>${scores ? '1' : '0'}</td></tr>`;
    }).join('');
  }

  async function shareResult() {
    const results = calculateScores();
    const text = `Ich habe den FreeIQExam AQ-10 Autismus-Selbsttest für Erwachsene absolviert. Ergebnis: ${results.total}/10. ${results.aboveThreshold ? 'Hinweis auf klinisch signifikante Züge' : 'Unterhalb des Schwellenwerts'}. Dies ist ein orientierendes Screening, keine Diagnose.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam AQ-10 Selbsttest Ergebnis', text, url: window.location.href });
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
    if (state.radarFrame) window.cancelAnimationFrame(state.radarFrame);
    state.radarFrame = null;
    state.currentIndex = 0;
    state.answers = {};
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('results-section').classList.add('hidden');
    $('questionnaire-section').classList.remove('hidden');
    $('assessment-intro').classList.add('hidden');

    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    if (!$('autism-app')) return;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', () => {
      $('assessment-intro').classList.add('hidden');
      $('questionnaire-section').classList.remove('hidden');
      renderQuestion();
    });
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if (typing || $('questionnaire-section')?.classList.contains('hidden')) return;

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
    renderQuestion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
