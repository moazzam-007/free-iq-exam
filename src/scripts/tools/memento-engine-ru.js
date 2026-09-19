/**
 * Stoic Memento Mori & Life-in-Weeks Visualizer Engine
 * Features:
 * - 4,000 Weeks Interactive Life Grid (Ages 0 to 80-90+)
 * - 4 Color-coded Life Eras: Formative (0-18), Ascent (18-35), Mastery (35-60), Legacy (60+)
 * - Actuarial Life Expectancy & Longevity Modifiers (Exercise, Sleep, Diet, Smoking, Stress)
 * - Interactive Milestone Pinning & Tooltip inspection (Date, Age, Life Stage)
 * - Curated Stoic Reflections Database (Marcus Aurelius, Seneca, Epictetus)
 * - 1200x675 High-Resolution PNG Poster Download Generator
 */

(function () {
  'use strict';

  /* =========================================================
     1. STOIC REFLECTIONS DATABASE
     ========================================================= */
  const STOIC_QUOTES = [
    {
      author: 'Seneca',
      source: 'De Brevitate Vitae (On the Shortness of Life)',
      text: 'It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous estimate has been given to us for the highest achievements if it were all well invested.'
    },
    {
      author: 'Marcus Aurelius',
      source: 'Meditations, Book II',
      text: 'You could leave life right now. Let that determine what you do and say and think.'
    },
    {
      author: 'Seneca',
      source: 'Letters from a Stoic, Letter I',
      text: 'Hold every hour in your grasp. Lay hold of today’s task, and you will not need to depend so much upon tomorrow’s. While we are postponing, life speeds by.'
    },
    {
      author: 'Epictetus',
      source: 'Enchiridion',
      text: 'Keep death and exile, and all other things which appear terrible, daily before your eyes, but chiefly death, and you will never entertain any abject thought, nor too eagerly covet anything.'
    },
    {
      author: 'Marcus Aurelius',
      source: 'Meditations, Book IV',
      text: 'Time is a river, a violent current of events, glimpsed once and already carried past us, and another follows and is gone.'
    },
    {
      author: 'Seneca',
      source: 'Letters from a Stoic, Letter XXVI',
      text: 'Think on death before you think on life; for life without the thought of death is a dream, a delusion, a drunken trance.'
    },
    {
      author: 'Marcus Aurelius',
      source: 'Meditations, Book X',
      text: 'Do not act as if you were going to live ten thousand years. Death hangs over you. While you live, while it is in your power, be good.'
    },
    {
      author: 'Seneca',
      source: 'De Brevitate Vitae',
      text: 'You act like mortals in all that you fear, and like immortals in all that you desire.'
    },
    {
      author: 'Marcus Aurelius',
      source: 'Meditations, Book VII',
      text: 'Think of yourself as dead. You have lived your life. Now, take what’s left and live it properly.'
    },
    {
      author: 'Epictetus',
      source: 'Discourses',
      text: 'When you kiss your child or your wife, say to yourself that you are kissing a mortal human being; so that if they die, you will not be distraught.'
    }
  ];

  /* =========================================================
     2. ACTUARIAL LONGEVITY & MEMENTO ENGINE
     ========================================================= */
  class MementoEngine {
    constructor() {
      // Default to 28-year-old
      const now = new Date();
      const defaultBirth = new Date(now.getFullYear() - 28, now.getMonth(), now.getDate());

      this.birthDate = defaultBirth;
      this.gender = 'male';
      this.countryBase = 78.5;

      // Biometric Modifiers (in years)
      this.modifiers = {
        exercise: 3.8, // 0 to 4.5
        sleep: 2.4,    // 0 to 3.0
        diet: 2.8,     // 0 to 3.5
        smoking: 0,    // 0 or -8.5
        stress: 0      // 0 or -2.5
      };

      // Milestones Array
      this.milestones = [
        { age: 0, title: 'Birth', color: '#6366f1' },
        { age: 6, title: 'Primary School', color: '#6366f1' },
        { age: 18, title: 'Adulthood & Independence', color: '#06b6d4' },
        { age: 22, title: 'College / Career Entry', color: '#06b6d4' },
        { age: 30, title: 'Age 30 Milestone', color: '#f59e0b' },
        { age: 50, title: 'Half-Century Pinnacle', color: '#f59e0b' },
        { age: 65, title: 'Retirement & Wisdom', color: '#f43f5e' }
      ];
    }

    setBirthDate(dateStr) {
      if (!dateStr) return;
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        this.birthDate = parsed;
      }
    }

    getStats() {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - this.birthDate.getTime());
      const msPerWeek = 7 * 24 * 3600 * 1000;
      const livedWeeks = Math.floor(diffMs / msPerWeek);
      const ageYears = (diffMs / (365.2425 * 24 * 3600 * 1000)).toFixed(1);

      // Actuarial Expected Years
      let totalYears = this.countryBase;
      if (this.gender === 'female') totalYears += 4.5;
      totalYears += this.modifiers.exercise;
      totalYears += this.modifiers.sleep;
      totalYears += this.modifiers.diet;
      totalYears += this.modifiers.smoking;
      totalYears += this.modifiers.stress;
      totalYears = Math.max(50, Math.min(105, totalYears));

      const totalWeeks = Math.round(totalYears * 52.1775);
      const remainingWeeks = Math.max(0, totalWeeks - livedWeeks);
      const percentSpent = Math.min(100, Math.round((livedWeeks / totalWeeks) * 1000) / 10);
      const remainingDays = remainingWeeks * 7;
      const remainingHours = remainingDays * 24;
      const remainingHeartbeats = Math.round(remainingHours * 60 * 72); // 72 bpm avg

      return {
        livedWeeks,
        totalWeeks,
        remainingWeeks,
        ageYears,
        lifeExpectancyYears: totalYears.toFixed(1),
        percentSpent,
        remainingDays,
        remainingHours,
        remainingHeartbeats
      };
    }

    getWeekInfo(weekIndex) {
      const msPerWeek = 7 * 24 * 3600 * 1000;
      const weekStartMs = this.birthDate.getTime() + weekIndex * msPerWeek;
      const weekEndMs = weekStartMs + msPerWeek - 1000;

      const startDate = new Date(weekStartMs);
      const endDate = new Date(weekEndMs);
      const ageAtWeek = (weekIndex / 52.1775).toFixed(1);

      let era = 'Formative & Childhood';
      let eraColor = '#6366f1';
      if (weekIndex >= 936 && weekIndex < 1820) {
        era = 'Ascent, Learning & Ambition';
        eraColor = '#06b6d4';
      } else if (weekIndex >= 1820 && weekIndex < 3120) {
        era = 'Mastery, Family & Climax';
        eraColor = '#f59e0b';
      } else if (weekIndex >= 3120) {
        era = 'Elder Wisdom & Legacy';
        eraColor = '#f43f5e';
      }

      // Check if a milestone matches
      const milestone = this.milestones.find((m) => Math.round(m.age * 52.1775) === weekIndex);

      return {
        weekIndex,
        ageAtWeek,
        startDate: startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        endDate: endDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        era,
        eraColor,
        milestone: milestone ? milestone.title : null
      };
    }
  }

  /* =========================================================
     3. HIGH-RES POSTER GENERATOR (1200x675 PNG)
     ========================================================= */
  function downloadLifePoster(engine) {
    const stats = engine.getStats();
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');

    // Obsidian Background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, 1200, 675);

    // Inner Hairline Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, 1140, 615);

    // Header Title
    ctx.fillStyle = '#2997ff';
    ctx.font = 'bold 24px Geist, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('MEMENTO MORI', 60, 75);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '500 13px "Geist Mono", monospace';
    ctx.fillText(`ВАША ЖИЗНЬ В НЕДЕЛЯХ · РОЖДЕНИЕ: ${engine.birthDate.toLocaleDateString('ru-RU')}`, 60, 98);

    // Right Header Metrics
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Geist Mono", monospace';
    ctx.fillText(`${stats.livedWeeks.toLocaleString('ru-RU')} / ${stats.totalWeeks.toLocaleString('ru-RU')} НЕДЕЛЬ`, 1140, 75);
    ctx.fillStyle = '#2997ff';
    ctx.font = '500 13px "Geist Mono", monospace';
    ctx.fillText(`${stats.percentSpent}% ПРОЖИТО · ОСТАЛОСЬ ${stats.remainingWeeks.toLocaleString('ru-RU')}`, 1140, 98);

    // Grid Rendering (80 years = 80 rows, 52 cols = 4,160 dots)
    const cols = 52;
    const rows = 80;
    const gridStartX = 60;
    const gridStartY = 130;
    const dotW = 19.5;
    const dotH = 5.6;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        const x = gridStartX + c * dotW;
        const y = gridStartY + r * dotH;

        if (index < stats.livedWeeks) {
          // Lived week (action blue / high contrast)
          ctx.fillStyle = '#2997ff';
          ctx.fillRect(x, y, 13, 3.8);
        } else if (index === stats.livedWeeks) {
          // Active week (white glowing dot)
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y, 13, 3.8);
        } else if (index < stats.totalWeeks) {
          // Remaining expected week (subtle translucent)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.fillRect(x, y, 13, 3.8);
        } else {
          // Beyond expected (faintest outline)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.fillRect(x, y, 13, 3.8);
        }
      }
    }

    // Footer Quote
    ctx.textAlign = 'center';
    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'italic 14px "Newsreader", Georgia, serif';
    ctx.fillText('«Вы боитесь всего, как смертные, а хотите всего, как бессмертные». — Сенека', 600, 605);

    ctx.fillStyle = '#71717a';
    ctx.font = '13px "Geist Mono", monospace';
    ctx.fillText(`Создано на https://freeiqexam.com/ru/memento-mori · Issued: ${new Date().toLocaleDateString()}`, 600, 628);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `memento-mori-life-in-weeks-${stats.livedWeeks}w.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* =========================================================
     4. UI CONTROLLER & INTERACTIVE GRID RENDERER
     ========================================================= */
  const MementoApp = {
    engine: null,
    quoteIndex: 0,

    init() {
      this.engine = new MementoEngine();
      this.bindDOM();
      this.render();
      this.showRandomQuote();
    },

    bindDOM() {
      // Birth Date Input
      const dobInput = document.getElementById('mementoDob');
      if (dobInput) {
        // Set default input value to 28 years ago
        const d = this.engine.birthDate;
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        dobInput.value = `${y}-${m}-${day}`;

        dobInput.addEventListener('change', (e) => {
          this.engine.setBirthDate(e.target.value);
          this.render();
        });
      }

      // Gender Selector
      document.querySelectorAll('.memento-gender-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.memento-gender-btn').forEach((b) => {
            b.classList.remove('active', 'border-blue-600', 'bg-blue-600/10', 'text-blue-600', 'dark:border-blue-400', 'dark:bg-blue-400/10', 'dark:text-blue-400', 'font-semibold');
            b.classList.add('border-zinc-200', 'dark:border-zinc-800', 'bg-white', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300');
          });
          btn.classList.remove('border-zinc-200', 'dark:border-zinc-800', 'bg-white', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300');
          btn.classList.add('active', 'border-blue-600', 'bg-blue-600/10', 'text-blue-600', 'dark:border-blue-400', 'dark:bg-blue-400/10', 'dark:text-blue-400', 'font-semibold');
          this.engine.gender = btn.dataset.gender;
          this.render();
        });
      });

      // Longevity Modifiers Checkboxes/Sliders
      const modExercise = document.getElementById('modExercise');
      if (modExercise) {
        modExercise.addEventListener('change', (e) => {
          this.engine.modifiers.exercise = e.target.checked ? 3.8 : 0;
          this.render();
        });
      }

      const modSleep = document.getElementById('modSleep');
      if (modSleep) {
        modSleep.addEventListener('change', (e) => {
          this.engine.modifiers.sleep = e.target.checked ? 2.4 : 0;
          this.render();
        });
      }

      const modDiet = document.getElementById('modDiet');
      if (modDiet) {
        modDiet.addEventListener('change', (e) => {
          this.engine.modifiers.diet = e.target.checked ? 2.8 : 0;
          this.render();
        });
      }

      const modSmoking = document.getElementById('modSmoking');
      if (modSmoking) {
        modSmoking.addEventListener('change', (e) => {
          this.engine.modifiers.smoking = e.target.checked ? -8.5 : 0;
          this.render();
        });
      }

      const modStress = document.getElementById('modStress');
      if (modStress) {
        modStress.addEventListener('change', (e) => {
          this.engine.modifiers.stress = e.target.checked ? -2.5 : 0;
          this.render();
        });
      }

      // Download Poster Button
      const downloadBtn = document.getElementById('downloadMementoPosterBtn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => downloadLifePoster(this.engine));
      }

      // Next Quote Button
      const nextQuoteBtn = document.getElementById('nextQuoteBtn');
      if (nextQuoteBtn) {
        nextQuoteBtn.addEventListener('click', () => this.showNextQuote());
      }
    },

    showRandomQuote() {
      this.quoteIndex = Math.floor(Math.random() * STOIC_QUOTES.length);
      this.updateQuoteUI();
    },

    showNextQuote() {
      this.quoteIndex = (this.quoteIndex + 1) % STOIC_QUOTES.length;
      this.updateQuoteUI();
    },

    updateQuoteUI() {
      const q = STOIC_QUOTES[this.quoteIndex];
      const textEl = document.getElementById('stoicQuoteText');
      const authorEl = document.getElementById('stoicQuoteAuthor');
      const sourceEl = document.getElementById('stoicQuoteSource');

      if (textEl) textEl.textContent = `“${q.text}”`;
      if (authorEl) authorEl.textContent = q.author;
      if (sourceEl) sourceEl.textContent = q.source;
    },

    render() {
      const stats = this.engine.getStats();

      // Update Metric Numbers
      this.updateText('statLivedWeeks', stats.livedWeeks.toLocaleString());
      this.updateText('statRemainingWeeks', stats.remainingWeeks.toLocaleString());
      this.updateText('statTotalWeeks', stats.totalWeeks.toLocaleString());
      this.updateText('statPercentSpent', `${stats.percentSpent}%`);
      this.updateText('statAgeYears', `${stats.ageYears} лет`);
      this.updateText('statLifeExpectancy', `${stats.lifeExpectancyYears} лет`);
      this.updateText('statRemainingDays', stats.remainingDays.toLocaleString());
      this.updateText('statRemainingHours', stats.remainingHours.toLocaleString());
      this.updateText('statRemainingHeartbeats', stats.remainingHeartbeats.toLocaleString());

      // Progress Bar
      const progressBar = document.getElementById('lifeProgressBar');
      if (progressBar) {
        progressBar.style.width = `${stats.percentSpent}%`;
      }

      // Render 4,000 Weeks Interactive Grid into Container
      this.renderGrid(stats);
    },

    renderGrid(stats) {
      const gridContainer = document.getElementById('lifeGridContainer');
      if (!gridContainer) return;

      if (!gridContainer.dataset.delegated) {
        gridContainer.dataset.delegated = 'true';

        gridContainer.addEventListener('mouseover', (e) => {
          const dot = e.target.closest('.week-dot');
          if (!dot) return;
          const tooltip = document.getElementById('gridTooltip');
          if (!tooltip) return;
          const index = parseInt(dot.dataset.week, 10);
          if (isNaN(index)) return;
          const info = this.engine.getWeekInfo(index);
          tooltip.innerHTML = `
            <div class="font-bold text-blue-600 dark:text-blue-400 text-sm">Week ${info.weekIndex.toLocaleString()} (Age ${info.ageAtWeek})</div>
            <div class="text-[13px] text-zinc-600 dark:text-zinc-300 font-mono">${info.startDate} – ${info.endDate}</div>
            <div class="text-[13px] text-zinc-500 dark:text-zinc-400 mt-1">${info.era}</div>
            ${info.milestone ? `<div class="mt-1 font-semibold text-emerald-600 dark:text-emerald-400 text-[13px]">📌 Milestone: ${info.milestone}</div>` : ''}
          `;
          tooltip.classList.remove('hidden');

          const rect = dot.getBoundingClientRect();
          tooltip.style.left = `${rect.left + window.scrollX - 100}px`;
          tooltip.style.top = `${rect.top + window.scrollY - 85}px`;
        });

        gridContainer.addEventListener('mouseout', (e) => {
          const dot = e.target.closest('.week-dot');
          if (dot) {
            const tooltip = document.getElementById('gridTooltip');
            if (tooltip) tooltip.classList.add('hidden');
          }
        });
      }

      gridContainer.innerHTML = '';

      const totalDisplayWeeks = Math.max(stats.totalWeeks, 4160); // 80 years minimum display
      const cols = 52;
      const rows = Math.ceil(totalDisplayWeeks / cols);

      const frag = document.createDocumentFragment();

      for (let r = 0; r < rows; r++) {
        const rowEl = document.createElement('div');
        rowEl.className = 'flex items-center gap-1 sm:gap-1.5 justify-center';

        // Year label on the left (every 5 years)
        const yearLabel = document.createElement('span');
        yearLabel.className = 'w-6 text-[13px] font-mono text-zinc-400 dark:text-zinc-500 text-right select-none shrink-0';
        yearLabel.textContent = r % 5 === 0 ? `${r}` : '';
        rowEl.appendChild(yearLabel);

        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          if (index >= totalDisplayWeeks) break;

          const dot = document.createElement('div');
          dot.dataset.week = index;

          if (index < stats.livedWeeks) {
            // Lived week
            dot.className = 'week-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-zinc-900 dark:bg-zinc-200 hover:scale-150 transition-transform cursor-pointer';
          } else if (index === stats.livedWeeks) {
            // Current Active Week (pulsing halo)
            dot.className = 'week-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm bg-[#0066cc] dark:bg-[#2997ff] shadow-[0_0_8px_rgba(41,151,255,0.8)] animate-pulse hover:scale-200 transition-transform cursor-pointer';
          } else if (index < stats.totalWeeks) {
            // Remaining expected week
            dot.className = 'week-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm border border-zinc-300 dark:border-zinc-700/80 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-150 transition-all cursor-pointer';
          } else {
            // Beyond expected
            dot.className = 'week-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-sm border border-zinc-200 dark:border-zinc-800/50 opacity-25 hover:scale-150 transition-transform cursor-pointer';
          }

          rowEl.appendChild(dot);
        }

        frag.appendChild(rowEl);
      }

      gridContainer.appendChild(frag);
    },

    updateText(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
  };

  // Safe DOM Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MementoApp.init());
  } else {
    MementoApp.init();
  }
})();
