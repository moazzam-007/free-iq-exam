/**
 * FreeIQExam — Stoic Circle of Control & Mental Clarity Observatory Engine
 * ---------------------------------------------------------------------------
 * Synthesized from 8 candidate builds (interactive observatory, Gemini
 * trichotomy toggle, DeepSeek a11y chips, Qwen 4-step wizard, scholarly
 * decision lab, dual circle+list, forge chain).
 *
 * Three-tier model (Epictetus dichotomy + Irvine/Covey trichotomy):
 *   - control   : inner ring  — direct agency (emerald/gold)
 *   - influence : middle ring — indirect impact (cyan/indigo)
 *   - concern   : outer ring  — zero agency (slate/rose)
 *
 * Features:
 *   1. Quick-add custom worries with one-click zone assignment
 *   2. Drag-and-drop onto concentric rings (radius auto-classify) + click-to-move
 *   3. Four 1-click curated Stoic presets (work, relationship, financial, health)
 *   4. 60fps SVG visualizer with floating-node physics + glowing ring highlights
 *   5. Agency ratio breakdown (% control / influence / concern + Agency Index)
 *   6. Stoic reframing engine for Concern items (Epictetus conversion prompts)
 *   7. 100% client-side, localStorage persistence, printable/copyable action plan
 *
 * Zero network calls. Zero telemetry. Progressive enhancement — works with
 * keyboard only and honors prefers-reduced-motion.
 */
(function () {
  'use strict';

  /* =========================================================
     1. CONSTANTS & CURATED CONTENT
     ========================================================= */

  var STORAGE_KEY = 'coc_items_v1';
  var COMMIT_KEY = 'coc_commit_v1';
  var MAX_TEXT_LEN = 120;

  var ZONES = {
    control: {
      key: 'control',
      label: 'Circle of Control',
      short: 'Control',
      color: '#10b981',
      hint: 'judgments · effort · choices · habits · responses'
    },
    influence: {
      key: 'influence',
      label: 'Circle of Influence',
      short: 'Influence',
      color: '#38bdf8',
      hint: 'relationships · persuasion · collaboration · environment'
    },
    concern: {
      key: 'concern',
      label: 'Circle of Concern',
      short: 'Concern',
      color: '#fb7185',
      hint: 'past · other people · luck · markets · weather · aging'
    }
  };

  // Four curated 1-click presets. Each entry carries a suggested zone so the
  // triage teaches the dichotomy instead of testing it cold.
  var PRESETS = {
    work: {
      title: 'Workplace Overwhelm & Deadlines',
      icon: '💼',
      items: [
        { text: 'My preparation and work output today', zone: 'control' },
        { text: 'How I prioritize the next 90 minutes', zone: 'control' },
        { text: 'Asking my manager clarifying questions', zone: 'influence' },
        { text: 'Whether teammates deliver on time', zone: 'influence' },
        { text: 'My boss’s mood this morning', zone: 'concern' },
        { text: 'Whether the project is judged a success', zone: 'concern' },
        { text: 'Company layoffs and restructuring rumors', zone: 'concern' }
      ]
    },
    relationship: {
      title: 'Relationship & Social Anxiety',
      icon: '💬',
      items: [
        { text: 'My own integrity and follow-through', zone: 'control' },
        { text: 'How I listen and respond with respect', zone: 'control' },
        { text: 'Setting a calm boundary before hard talks', zone: 'control' },
        { text: 'Inviting an honest conversation', zone: 'influence' },
        { text: 'Whether they validate or approve of me', zone: 'concern' },
        { text: 'What they think of me after I leave', zone: 'concern' },
        { text: 'A past embarrassing mistake I keep replaying', zone: 'concern' }
      ]
    },
    financial: {
      title: 'Financial & Macro Uncertainty',
      icon: '📉',
      items: [
        { text: 'My personal spending budget this month', zone: 'control' },
        { text: 'Building one marketable skill this week', zone: 'control' },
        { text: 'Negotiating a bill or asking for a raise', zone: 'influence' },
        { text: 'Inflation and rent prices', zone: 'concern' },
        { text: 'Stock market swings and recessions', zone: 'concern' },
        { text: 'Global economy headlines', zone: 'concern' }
      ]
    },
    health: {
      title: 'Health & Physical Well-being',
      icon: '🌿',
      items: [
        { text: 'My exercise and daily movement', zone: 'control' },
        { text: 'My nutrition and sleep routine tonight', zone: 'control' },
        { text: 'Booking the checkup I keep postponing', zone: 'control' },
        { text: 'Asking my doctor one prepared question', zone: 'influence' },
        { text: 'Genetic risk I inherited', zone: 'concern' },
        { text: 'The fact of aging itself', zone: 'concern' },
        { text: 'Whether a test result comes back perfect', zone: 'concern' }
      ]
    }
  };

  // Starter chips shown under the input (gentle on-ramp, mirrors candidates).
  var STARTERS = [
    { text: 'What my boss thinks of me', zone: 'concern' },
    { text: 'My focus and effort today', zone: 'control' },
    { text: 'Inflation and rent prices', zone: 'concern' },
    { text: 'How I respond to disrespect', zone: 'control' },
    { text: 'My preparation for a hard conversation', zone: 'influence' },
    { text: 'Traffic on the way home', zone: 'concern' },
    { text: 'Whether a project succeeds', zone: 'concern' },
    { text: 'Keeping a promise I made', zone: 'control' }
  ];

  var QUOTES = [
    { text: 'Some things are in our control and others not.', author: 'Epictetus', source: 'Enchiridion 1' },
    { text: 'You have power over your mind — not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius', source: 'Meditations 6.8' },
    { text: 'The impediment to action advances action. What stands in the way becomes the way.', author: 'Marcus Aurelius', source: 'Meditations 5.20' },
    { text: 'It is not the things themselves that disturb us, but our judgments about them.', author: 'Epictetus', source: 'Enchiridion 5' },
    { text: 'Do not seek for things to happen the way you want them to; rather, wish that what happens happens the way it happens.', author: 'Epictetus', source: 'Enchiridion 8' },
    { text: 'Waste no more time arguing what a good man should be. Be one.', author: 'Marcus Aurelius', source: 'Meditations 10.16' },
    { text: 'If it is not right, do not do it. If it is not true, do not say it.', author: 'Marcus Aurelius', source: 'Meditations 12.17' },
    { text: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.', author: 'Marcus Aurelius', source: 'Meditations 7.47' }
  ];

  // Reframe templates for Concern items. Each answers:
  // "How can I convert this concern into an actionable point of control?"
  var REFRAME_TEMPLATES = [
    {
      match: /boss|manager|colleague|coworker|teammate|client/i,
      reframe: 'You cannot command their judgment — only the quality of your preparation and conduct. Shrink the target to one controllable act: one clear update, one question, one delivered promise.',
      action: 'Send one 3-sentence status update or ask one clarifying question today.'
    },
    {
      match: /money|financ|inflation|market|rent|debt|salary|econom/i,
      reframe: 'Markets and prices are outside the citadel. Your budget, your skill, and your next negotiation are inside it. Convert macro-dread into micro-leverage.',
      action: 'Review one spending category for 10 minutes or practice one negotiation sentence.'
    },
    {
      match: /health|sleep|weight|doctor|ill|sick|pain|aging|age|genetic|test result/i,
      reframe: 'Biology deals cards you did not choose; how you play this week is yours. Stoicism asks for excellent stewardship of the body without demanding a guaranteed outcome.',
      action: 'Take a 20-minute walk, set a bedtime alarm, or book the appointment you are avoiding.'
    },
    {
      match: /partner|relationship|friend|family|parent|marriage|divorce|approve|validat|opinion|respect/i,
      reframe: 'Their inner verdict is not your property. Your listening, honesty, and boundaries are. Aim at being worthy of trust rather than at controlling their approval.',
      action: 'Name one boundary in one sentence and deliver it calmly within 24 hours.'
    },
    {
      match: /past|mistake|regret|embarrass|shame|failed|failure/i,
      reframe: 'The past is existentially closed — it cannot be edited, only studied. Extract the lesson, make the repair you can, and return attention to present conduct.',
      action: 'Write the one lesson in a single sentence, then one repair step under 15 minutes.'
    },
    {
      match: /weather|traffic|flight|delay|news|politic|war|climate/i,
      reframe: 'External systems do not take orders from worry. Prepare the buffer (leave earlier, carry the book, limit the feed) and release the outcome to reality.',
      action: 'Add a 15-minute buffer or set a 20-minute news limit today.'
    }
  ];

  var GENERIC_REFRAMES = [
    'This outcome is not yours to command — but your next response is. Ask: what is the smallest excellent action available in the next 20 minutes?',
    'Separate the event from the story about the event. The event is data; the catastrophizing is optional commentary. Choose the response a wise friend would admire.',
    'Apply the trichotomy: is any part influenceable? If yes, make the request. If no, practice release — attention is finite currency, spend it inside the citadel.'
  ];

  var VIRTUES = ['Wisdom', 'Courage', 'Justice', 'Temperance'];

  /* =========================================================
     2. STATE
     ========================================================= */

  var state = {
    items: [], // {id, text, zone, x, y, phase, createdAt}
    quoteIndex: 0,
    dragId: null,
    reduceMotion: false
  };

  function uid(prefix) {
    return (prefix || 'coc') + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function $(id) {
    return document.getElementById(id);
  }

  /* =========================================================
     3. PERSISTENCE (guarded — private mode safe)
     ========================================================= */

  function saveItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) { /* storage unavailable — session-only mode */ }
  }

  function loadItems() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(function (it) { return it && typeof it.text === 'string' && ZONES[it.zone]; })
        .map(function (it) {
          return {
            id: String(it.id || uid('coc')),
            text: String(it.text).slice(0, MAX_TEXT_LEN),
            zone: it.zone,
            x: clampPct(num(it.x, 50)),
            y: clampPct(num(it.y, 50)),
            phase: num(it.phase, Math.random() * Math.PI * 2),
            createdAt: it.createdAt || new Date().toISOString()
          };
        })
        .slice(0, 60);
    } catch (e) {
      return [];
    }
  }

  function num(v, fallback) {
    var n = Number(v);
    return isFinite(n) ? n : fallback;
  }

  function clampPct(v) {
    return Math.max(4, Math.min(96, v));
  }

  /* =========================================================
     4. POSITIONING — random point inside a zone annulus
        Arena is 0-100 coordinate space; center 50/50.
        control r<20 · influence 20-36 · concern 36-48
     ========================================================= */

  function randomPointInZone(zone) {
    var angle = Math.random() * Math.PI * 2;
    var r;
    if (zone === 'control') r = 4 + Math.random() * 14; // 4–18
    else if (zone === 'influence') r = 21 + Math.random() * 13; // 21–34
    else r = 37 + Math.random() * 9; // 37–46
    return {
      x: clampPct(50 + Math.cos(angle) * r * 1.35), // arena is wider than tall
      y: clampPct(50 + Math.sin(angle) * r)
    };
  }

  // Classify a drop point (percent coords) by radius from center.
  function zoneFromPoint(x, y) {
    var dx = (x - 50) / 1.35;
    var dy = y - 50;
    var r = Math.sqrt(dx * dx + dy * dy);
    if (r < 20) return 'control';
    if (r < 36) return 'influence';
    return 'concern';
  }

  /* =========================================================
     5. CRUD
     ========================================================= */

  function addItem(text, zone, silent) {
    text = String(text == null ? '' : text).trim().slice(0, MAX_TEXT_LEN);
    if (!text) {
      if (!silent) toast('Type a worry first — then assign it to a ring.');
      return null;
    }
    if (!ZONES[zone]) zone = 'concern';
    if (state.items.length >= 60) {
      toast('Observatory is full (60 items). Release one before adding more.');
      return null;
    }
    var p = randomPointInZone(zone);
    var item = {
      id: uid('coc'),
      text: text,
      zone: zone,
      x: p.x,
      y: p.y,
      phase: Math.random() * Math.PI * 2,
      createdAt: new Date().toISOString()
    };
    state.items.push(item);
    saveItems();
    renderAll();
    if (!silent) toast('Added to ' + ZONES[zone].label + '.');
    return item;
  }

  function moveItem(id, zone) {
    var it = null;
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].id === id) { it = state.items[i]; break; }
    }
    if (!it || !ZONES[zone] || it.zone === zone) return;
    it.zone = zone;
    var p = randomPointInZone(zone);
    it.x = p.x;
    it.y = p.y;
    saveItems();
    renderAll();
  }

  function removeItem(id) {
    state.items = state.items.filter(function (it) { return it.id !== id; });
    saveItems();
    renderAll();
  }

  function clearAll() {
    if (!state.items.length) return;
    state.items = [];
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    renderAll();
    toast('Observatory cleared. A clean citadel.');
  }

  function loadPreset(key) {
    var preset = PRESETS[key];
    if (!preset) return;
    var added = 0;
    preset.items.forEach(function (entry) {
      var exists = state.items.some(function (it) {
        return it.text.toLowerCase() === entry.text.toLowerCase();
      });
      if (!exists && state.items.length < 60) {
        var p = randomPointInZone(entry.zone);
        state.items.push({
          id: uid('coc'),
          text: entry.text,
          zone: entry.zone,
          x: p.x,
          y: p.y,
          phase: Math.random() * Math.PI * 2,
          createdAt: new Date().toISOString()
        });
        added++;
      }
    });
    saveItems();
    renderAll();
    toast(preset.icon + ' ' + preset.title + ' — ' + added + ' reflection' + (added === 1 ? '' : 's') + ' added.');
    var arena = $('cocArena');
    if (arena) arena.scrollIntoView({ behavior: state.reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }

  /* =========================================================
     6. REFRAME ENGINE
     ========================================================= */

  function reframeFor(text) {
    for (var i = 0; i < REFRAME_TEMPLATES.length; i++) {
      if (REFRAME_TEMPLATES[i].match.test(text)) return REFRAME_TEMPLATES[i];
    }
    var idx = 0;
    for (var j = 0; j < text.length; j++) idx = (idx + text.charCodeAt(j)) % GENERIC_REFRAMES.length;
    return { reframe: GENERIC_REFRAMES[idx], action: 'Choose one 5–20 minute controllable action and do it before asking reality for a guarantee.' };
  }

  function openReframe(id) {
    var it = null;
    for (var i = 0; i < state.items.length; i++) {
      if (state.items[i].id === id) { it = state.items[i]; break; }
    }
    if (!it) return;
    var r = reframeFor(it.text);
    var panel = $('reframePanel');
    var outText = $('reframeText');
    var outAction = $('reframeAction');
    var outTitle = $('reframeTitle');
    if (outTitle) outTitle.textContent = 'Reframing: “' + it.text + '”';
    if (outText) outText.textContent = r.reframe;
    if (outAction) outAction.textContent = '⚡ Next controllable step: ' + r.action;
    if (panel) {
      panel.classList.remove('hidden');
      panel.scrollIntoView({ behavior: state.reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  /* =========================================================
     7. METRICS — agency ratio
     ========================================================= */

  function computeStats() {
    var c = 0, f = 0, n = 0;
    state.items.forEach(function (it) {
      if (it.zone === 'control') c++;
      else if (it.zone === 'influence') f++;
      else n++;
    });
    var total = c + f + n;
    var agency = total === 0 ? 0 : Math.round(((c + 0.5 * f) / total) * 100);
    return { control: c, influence: f, concern: n, total: total, agency: agency };
  }

  function diagnosticFor(s) {
    if (s.total === 0) return 'Add a few situations to generate your agency diagnostic.';
    if (s.agency >= 70) return 'Anchored — most attention sits inside your agency. Protect this ratio with one daily virtue action.';
    if (s.agency >= 45) return 'Balanced but leaking — convert one Concern into a 20-minute controllable step today.';
    if (s.agency >= 25) return 'Overloaded — attention is captured by outcomes you cannot command. Release one Concern deliberately.';
    return 'Flooded — nearly everything sits outside agency. Start with a single 5-minute act inside Control.';
  }

  function planQuoteFor(s) {
    if (s.total === 0) return QUOTES[0];
    if (s.agency >= 70) return QUOTES[5];
    if (s.agency >= 45) return QUOTES[3];
    return QUOTES[0];
  }

  /* =========================================================
     8. RENDER
     ========================================================= */

  function renderAll() {
    renderStarters();
    renderCards();
    renderStats();
    renderPlan();
    renderReframeSelect();
  }

  function renderStarters() {
    var wrap = $('starterChips');
    if (!wrap || wrap.dataset.built === '1') return;
    wrap.dataset.built = '1';
    STARTERS.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'coc-chip';
      b.textContent = s.text;
      b.setAttribute('aria-label', 'Add "' + s.text + '" to ' + ZONES[s.zone].label);
      b.addEventListener('click', function () { addItem(s.text, s.zone); });
      wrap.appendChild(b);
    });
  }

  function zoneClass(zone) {
    if (zone === 'control') return 'coc-card-control';
    if (zone === 'influence') return 'coc-card-influence';
    return 'coc-card-concern';
  }

  function renderCards() {
    var layer = $('cocCards');
    var empty = $('cocEmpty');
    if (!layer) return;
    layer.innerHTML = '';

    if (empty) empty.style.display = state.items.length ? 'none' : '';

    state.items.forEach(function (it) {
      var card = document.createElement('div');
      card.className = 'coc-card ' + zoneClass(it.zone);
      card.style.left = it.x + '%';
      card.style.top = it.y + '%';
      card.dataset.id = it.id;
      card.dataset.phase = String(it.phase);
      card.setAttribute('draggable', 'true');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', esc(it.text) + ' — in ' + ZONES[it.zone].label + '. Press Enter to reframe.');

      var tag = document.createElement('span');
      tag.className = 'coc-card-tag';
      tag.textContent = ZONES[it.zone].short;
      card.appendChild(tag);

      var txt = document.createElement('span');
      txt.className = 'coc-card-text';
      txt.textContent = it.text;
      card.appendChild(txt);

      var actions = document.createElement('div');
      actions.className = 'coc-card-actions';

      var btnC = document.createElement('button');
      btnC.type = 'button';
      btnC.className = 'coc-mini coc-mini-c';
      btnC.textContent = 'C';
      btnC.title = 'Move to Control';
      btnC.setAttribute('aria-label', 'Move to Control');
      btnC.addEventListener('click', function (e) { e.stopPropagation(); moveItem(it.id, 'control'); });
      actions.appendChild(btnC);

      var btnF = document.createElement('button');
      btnF.type = 'button';
      btnF.className = 'coc-mini coc-mini-f';
      btnF.textContent = 'I';
      btnF.title = 'Move to Influence';
      btnF.setAttribute('aria-label', 'Move to Influence');
      btnF.addEventListener('click', function (e) { e.stopPropagation(); moveItem(it.id, 'influence'); });
      actions.appendChild(btnF);

      var btnN = document.createElement('button');
      btnN.type = 'button';
      btnN.className = 'coc-mini coc-mini-n';
      btnN.textContent = 'O';
      btnN.title = 'Move to Concern (outside)';
      btnN.setAttribute('aria-label', 'Move to Concern');
      btnN.addEventListener('click', function (e) { e.stopPropagation(); moveItem(it.id, 'concern'); });
      actions.appendChild(btnN);

      if (it.zone === 'concern') {
        var btnR = document.createElement('button');
        btnR.type = 'button';
        btnR.className = 'coc-mini coc-mini-r';
        btnR.textContent = '⇄';
        btnR.title = 'Stoic reframe: convert to control';
        btnR.setAttribute('aria-label', 'Reframe this concern');
        btnR.addEventListener('click', function (e) { e.stopPropagation(); openReframe(it.id); });
        actions.appendChild(btnR);
      }

      var btnD = document.createElement('button');
      btnD.type = 'button';
      btnD.className = 'coc-mini coc-mini-d';
      btnD.textContent = '×';
      btnD.title = 'Release (delete)';
      btnD.setAttribute('aria-label', 'Release this item');
      btnD.addEventListener('click', function (e) { e.stopPropagation(); removeItem(it.id); });
      actions.appendChild(btnD);

      card.appendChild(actions);

      // Native drag
      card.addEventListener('dragstart', function (e) {
        state.dragId = it.id;
        try { e.dataTransfer.setData('text/plain', it.id); e.dataTransfer.effectAllowed = 'move'; } catch (err) {}
        card.classList.add('coc-dragging');
      });
      card.addEventListener('dragend', function () {
        state.dragId = null;
        card.classList.remove('coc-dragging');
        clearRingHighlights();
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); openReframe(it.id); }
        if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); removeItem(it.id); }
      });

      layer.appendChild(card);
    });
  }

  function renderStats() {
    var s = computeStats();
    setText('statControl', String(s.control));
    setText('statInfluence', String(s.influence));
    setText('statConcern', String(s.concern));
    setText('statAgency', s.total ? s.agency + '%' : '—');
    setText('countText', s.total + (s.total === 1 ? ' reflection' : ' reflections') + ' in the observatory');
    var bar = $('agencyBar');
    if (bar) {
      bar.style.width = s.agency + '%';
      bar.className = 'coc-bar-fill' + (s.agency >= 70 ? ' coc-bar-good' : s.agency >= 45 ? ' coc-bar-mid' : 'coc-bar-low');
    }
    var diag = $('agencyDiagnostic');
    if (diag) diag.textContent = diagnosticFor(s);

    // Ring counts painted on the SVG labels
    setText('ringCountControl', s.control ? s.control + ' in agency' : '');
    setText('ringCountInfluence', s.influence ? s.influence + ' in reach' : '');
    setText('ringCountConcern', s.concern ? s.concern + ' to release' : '');
  }

  function renderPlan() {
    var s = computeStats();
    var focus = $('planFocusList');
    var infl = $('planInfluenceList');
    var rel = $('planReleaseList');
    var intro = $('planIntro');
    if (!focus || !infl || !rel) return;

    function li(text) {
      var el = document.createElement('li');
      el.textContent = text;
      return el;
    }

    focus.innerHTML = '';
    infl.innerHTML = '';
    rel.innerHTML = '';

    var controls = state.items.filter(function (i) { return i.zone === 'control'; }).slice(0, 5);
    var influences = state.items.filter(function (i) { return i.zone === 'influence'; }).slice(0, 5);
    var concerns = state.items.filter(function (i) { return i.zone === 'concern'; }).slice(0, 5);

    if (!s.total) {
      if (intro) intro.textContent = 'Classify your first situation to generate a personalized Stoic action plan.';
      focus.appendChild(li('Put attention on the next deliberate action.'));
      infl.appendChild(li('Name one conversation or request you can make.'));
      rel.appendChild(li('Name what you cannot command — then stop bargaining with it.'));
    } else {
      if (intro) {
        intro.textContent = s.control + ' in Control · ' + s.influence + ' in Influence · ' + s.concern + ' in Concern — Agency Index ' + s.agency + '%. ' + diagnosticFor(s);
      }
      if (controls.length) controls.forEach(function (i) { focus.appendChild(li('Act: ' + i.text)); });
      else focus.appendChild(li('Nothing claimed in Control yet — add one 20-minute action you fully own.'));
      if (influences.length) influences.forEach(function (i) { infl.appendChild(li('Shape: ' + i.text + ' — make the request, release the reply.')); });
      else infl.appendChild(li('No influence targets — one honest conversation counts as training.'));
      if (concerns.length) concerns.forEach(function (i) { rel.appendChild(li('Release: ' + i.text + ' — acknowledge, prepare the buffer, let go.')); });
      else rel.appendChild(li('Nothing to release. The citadel is quiet.'));
    }

    var q = planQuoteFor(s);
    setText('planQuoteText', '“' + q.text + '”');
    setText('planQuoteAuthor', q.author + ' · ' + q.source);
  }

  function renderReframeSelect() {
    var sel = $('reframeSelect');
    if (!sel) return;
    var prev = sel.value;
    sel.innerHTML = '';
    var concerns = state.items.filter(function (i) { return i.zone === 'concern'; });
    if (!concerns.length) {
      var opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'No concerns right now — the citadel is quiet';
      sel.appendChild(opt);
      sel.disabled = true;
      return;
    }
    sel.disabled = false;
    concerns.forEach(function (i) {
      var o = document.createElement('option');
      o.value = i.id;
      o.textContent = i.text.length > 60 ? i.text.slice(0, 60) + '…' : i.text;
      sel.appendChild(o);
    });
    if (prev) {
      for (var k = 0; k < sel.options.length; k++) {
        if (sel.options[k].value === prev) { sel.selectedIndex = k; break; }
      }
    }
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  /* =========================================================
     9. EXPORT — copy / download / print
     ========================================================= */

  function buildPlanText() {
    var s = computeStats();
    var lines = [];
    lines.push('STOIC CLARITY PLAN — FreeIQExam Circle of Control');
    lines.push('Generated ' + new Date().toLocaleString() + ' · 100% private, in-browser');
    lines.push('');
    lines.push('AGENCY INDEX: ' + (s.total ? s.agency + '%' : '—') + '  (' + s.control + ' Control · ' + s.influence + ' Influence · ' + s.concern + ' Concern)');
    lines.push(diagnosticFor(s));
    lines.push('');
    lines.push('— FOCUS (act with virtue) —');
    var controls = state.items.filter(function (i) { return i.zone === 'control'; });
    if (controls.length) controls.forEach(function (i, n) { lines.push((n + 1) + '. [Control] ' + i.text); });
    else lines.push('(none yet — claim one 20-minute action)');
    lines.push('');
    lines.push('— SHAPE (influence without command) —');
    var infls = state.items.filter(function (i) { return i.zone === 'influence'; });
    if (infls.length) infls.forEach(function (i, n) { lines.push((n + 1) + '. [Influence] ' + i.text); });
    else lines.push('(none yet)');
    lines.push('');
    lines.push('— RELEASE (accept without passivity) —');
    var cons = state.items.filter(function (i) { return i.zone === 'concern'; });
    if (cons.length) {
      cons.forEach(function (i, n) {
        var r = reframeFor(i.text);
        lines.push((n + 1) + '. [Concern] ' + i.text);
        lines.push('   Reframe: ' + r.reframe);
        lines.push('   Next step: ' + r.action);
      });
    } else lines.push('(nothing to release)');
    lines.push('');
    var commit = '';
    try { commit = localStorage.getItem(COMMIT_KEY) || ''; } catch (e) {}
    if (commit) lines.push('MY MICRO-COMMITMENT (5–20 min today): ' + commit + '\n');
    lines.push('“Some things are in our control and others not.” — Epictetus, Enchiridion 1');
    lines.push('https://freeiqexam.com/circle-of-control');
    return lines.join('\n');
  }

  function copyPlan() {
    var text = buildPlanText();
    function done() { toast('Clarity plan copied — paste it anywhere.'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else fallbackCopy(text), done();
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) {}
  }

  function downloadPlan() {
    var text = buildPlanText();
    try {
      var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var d = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = 'stoic-clarity-plan-' + d + '.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      toast('Clarity plan downloaded (.txt).');
    } catch (e) {
      toast('Download blocked — use Copy instead.');
    }
  }

  /* =========================================================
     10. TOAST + QUOTES
     ========================================================= */

  var toastTimer = null;
  function toast(msg) {
    var el = $('cocToast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('coc-toast-show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('coc-toast-show'); }, 3200);
  }

  function showQuote(idx) {
    var q = QUOTES[idx % QUOTES.length];
    setText('stoicQuoteText', '“' + q.text + '”');
    setText('stoicQuoteAuthor', q.author);
    setText('stoicQuoteSource', q.source);
  }

  /* =========================================================
     11. 60FPS FLOATING-NODE PHYSICS
     ========================================================= */

  function startPhysics() {
    if (state.reduceMotion) return;
    var t = 0;
    function frame() {
      t += 0.016;
      var layer = $('cocCards');
      if (layer) {
        var cards = layer.children;
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          if (card.classList.contains('coc-dragging')) continue;
          var phase = parseFloat(card.dataset.phase || '0');
          var dx = Math.sin(t * 0.9 + phase) * 5;
          var dy = Math.cos(t * 0.7 + phase * 1.3) * 4;
          card.style.transform = 'translate(-50%, -50%) translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* =========================================================
     12. DROP ZONES + RING HIGHLIGHTS
     ========================================================= */

  function clearRingHighlights() {
    ['ringControl', 'ringInfluence', 'ringConcern'].forEach(function (id) {
      var el = $(id);
      if (el) el.classList.remove('coc-ring-active');
    });
    var arena = $('cocArena');
    if (arena) arena.classList.remove('coc-arena-drag');
  }

  function highlightRing(zone) {
    clearRingHighlights();
    var map = { control: 'ringControl', influence: 'ringInfluence', concern: 'ringConcern' };
    var el = $(map[zone]);
    if (el) el.classList.add('coc-ring-active');
  }

  function bindDropZones() {
    var arena = $('cocArena');
    if (!arena) return;

    ['dragover', 'dragenter'].forEach(function (evt) {
      arena.addEventListener(evt, function (e) {
        e.preventDefault();
        try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
        var pt = arenaPoint(e);
        if (pt) highlightRing(zoneFromPoint(pt.x, pt.y));
        arena.classList.add('coc-arena-drag');
      });
    });
    arena.addEventListener('dragleave', function (e) {
      if (e.target === arena) clearRingHighlights();
    });
    arena.addEventListener('drop', function (e) {
      e.preventDefault();
      var id = state.dragId;
      try { id = id || e.dataTransfer.getData('text/plain'); } catch (err) {}
      var pt = arenaPoint(e);
      if (id && pt) {
        var zone = zoneFromPoint(pt.x, pt.y);
        var it = null;
        for (var i = 0; i < state.items.length; i++) {
          if (state.items[i].id === id) { it = state.items[i]; break; }
        }
        if (it) {
          it.zone = zone;
          it.x = clampPct(pt.x);
          it.y = clampPct(pt.y);
          saveItems();
          renderAll();
          toast('Moved to ' + ZONES[zone].label + '.');
        }
      }
      state.dragId = null;
      clearRingHighlights();
    });
  }

  function arenaPoint(e) {
    var arena = $('cocArena');
    if (!arena) return null;
    var rect = arena.getBoundingClientRect();
    var cx = (e.clientX - rect.left) / rect.width * 100;
    var cy = (e.clientY - rect.top) / rect.height * 100;
    return { x: clampPct(cx), y: clampPct(cy) };
  }

  /* =========================================================
     13. INIT + DOM BINDINGS
     ========================================================= */

  function init() {
    try {
      state.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { state.reduceMotion = false; }

    state.items = loadItems();
    try {
      var savedCommit = localStorage.getItem(COMMIT_KEY);
      var commitInput = $('commitInput');
      if (savedCommit && commitInput) commitInput.value = savedCommit;
    } catch (e) {}

    // Input + one-click zone assignment
    var input = $('worryInput');
    function submitTo(zone) {
      if (!input) return;
      var item = addItem(input.value, zone);
      if (item) input.value = '';
      if (input) input.focus();
    }
    var bC = $('btnAddControl');
    var bF = $('btnAddInfluence');
    var bN = $('btnAddConcern');
    if (bC) bC.addEventListener('click', function () { submitTo('control'); });
    if (bF) bF.addEventListener('click', function () { submitTo('influence'); });
    if (bN) bN.addEventListener('click', function () { submitTo('concern'); });
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submitTo('influence'); }
      });
    }
    var form = $('worryForm');
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); submitTo('influence'); });

    // Preset buttons
    document.querySelectorAll('[data-preset]').forEach(function (btn) {
      btn.addEventListener('click', function () { loadPreset(btn.getAttribute('data-preset')); });
    });

    // Plan actions
    var bCopy = $('btnCopyPlan');
    var bDl = $('btnDownloadPlan');
    var bPrint = $('btnPrintPlan');
    var bReset = $('btnResetArena');
    if (bCopy) bCopy.addEventListener('click', copyPlan);
    if (bDl) bDl.addEventListener('click', downloadPlan);
    if (bPrint) bPrint.addEventListener('click', function () { window.print(); });
    if (bReset) bReset.addEventListener('click', clearAll);

    // Reframe builder
    var bBuild = $('btnBuildReframe');
    if (bBuild) {
      bBuild.addEventListener('click', function () {
        var sel = $('reframeSelect');
        var id = sel && !sel.disabled ? sel.value : '';
        if (id) openReframe(id);
        else {
          var first = state.items.filter(function (i) { return i.zone === 'concern'; })[0];
          if (first) openReframe(first.id);
          else toast('No concerns to reframe — add one above.');
        }
      });
    }

    // Micro-commitment
    var bCommit = $('btnSaveCommit');
    if (bCommit) {
      bCommit.addEventListener('click', function () {
        var ci = $('commitInput');
        var v = ci ? String(ci.value).trim().slice(0, 140) : '';
        try { localStorage.setItem(COMMIT_KEY, v); } catch (e) {}
        toast(v ? 'Micro-commitment saved on this device.' : 'Commitment cleared.');
      });
    }

    // Quote rotator
    state.quoteIndex = Math.floor(Math.random() * QUOTES.length);
    showQuote(state.quoteIndex);
    var bQuote = $('btnNextQuote');
    if (bQuote) bQuote.addEventListener('click', function () {
      state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
      showQuote(state.quoteIndex);
    });

    // Virtue chips (decorative selection, stored in reframe context)
    document.querySelectorAll('[data-virtue]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-virtue]').forEach(function (b) { b.classList.remove('coc-virtue-active'); });
        btn.classList.add('coc-virtue-active');
      });
    });

    bindDropZones();
    renderAll();
    startPhysics();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
