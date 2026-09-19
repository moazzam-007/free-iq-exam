/**
 * Тест скорости печати (WPM) - Русский движок
 * Клиентский диагностический движок набора текста:
 * - Синтез звука механических переключателей через Web Audio API (Cherry MX Blue, Brown, Red)
 * - Плавная физика каретки в стиле Monkeytype и авто-прокрутка активной строки
 * - Психометрические метрики: Gross WPM, Net WPM, точность, CPM, стабильность
 * - Живой график WPM на высокоточном canvas
 * - Интерактивная тепловая карта ошибок клавиатуры ЙЦУКЕН
 * - Генератор сертификата о скорости печати (PNG 1200x675)
 */

(function () {
  'use strict';

  /* =========================================================
     1. КОРПУС РУССКИХ СЛОВ
     ========================================================= */
  const COMMON_WORDS = [
    'и', 'в', 'не', 'на', 'я', 'быть', 'он', 'с', 'что', 'а', 'по', 'это', 'она', 'этот', 'к', 'но',
    'они', 'мы', 'как', 'из', 'у', 'который', 'то', 'за', 'свой', 'весь', 'год', 'от', 'так', 'о',
    'для', 'ты', 'же', 'все', 'тот', 'мочь', 'вы', 'человек', 'такой', 'себя', 'один', 'уже', 'если',
    'дело', 'время', 'сам', 'когда', 'другой', 'вот', 'говорить', 'наш', 'мой', 'знать', 'стать',
    'при', 'чтобы', 'жизнь', 'кто', 'первый', 'очень', 'два', 'день', 'новый', 'рука', 'даже', 'раз',
    'где', 'там', 'под', 'можно', 'без', 'право', 'взять', 'нет', 'ни', 'найти', 'три', 'работа',
    'слово', 'место', 'лицо', 'дом', 'сторона', 'надо', 'ещё', 'сила', 'город', 'вода', 'конец',
    'земля', 'страна', 'свет', 'вопрос', 'часть', 'книга', 'понять', 'глаз', 'идти', 'думать', 'дать',
    'потом', 'здесь', 'каждый', 'начать', 'большой', 'малый', 'хорошо', 'плохо', 'жить', 'видеть',
    'слышать', 'любить', 'хотеть', 'делать', 'сказать', 'спросить', 'ответить', 'писать', 'читать',
    'учить', 'играть', 'ходить', 'бежать', 'лететь', 'плыть', 'стоять', 'сидеть', 'лежать', 'открыть',
    'закрыть', 'купить', 'продать', 'платить', 'считать', 'решить', 'менять', 'строить', 'мыть',
    'чистить', 'резать', 'варить', 'пить', 'спать', 'встать', 'упасть', 'прыгнуть', 'крикнуть',
    'шептать', 'молчать', 'ждать', 'встретить', 'проводить', 'послать', 'получить', 'держать',
    'нести', 'везти', 'вести', 'тянуть', 'толкать', 'бросить', 'ловить', 'искать', 'терять',
    'помнить', 'забыть', 'узнать', 'верить', 'надеяться', 'бояться', 'смеяться', 'плакать',
    'радоваться', 'грустить', 'сердиться', 'удивляться', 'гордиться', 'жалеть', 'благодарить',
    'просить', 'требовать', 'обещать', 'предлагать', 'соглашаться', 'отказывать', 'спорить',
    'доказывать', 'объяснять', 'показывать', 'рассказывать', 'описывать', 'сравнивать', 'выбирать',
    'ошибаться', 'исправлять', 'пробовать', 'успеть', 'опоздать', 'спешить', 'отдыхать', 'работать',
    'учиться', 'заниматься', 'интересно', 'быстро', 'медленно', 'легко', 'трудно', 'просто',
    'сложно', 'важно', 'нужно', 'можно', 'нельзя', 'всегда', 'никогда', 'часто', 'редко', 'иногда',
    'сегодня', 'вчера', 'завтра', 'утро', 'вечер', 'ночь', 'неделя', 'месяц', 'минута', 'секунда',
    'число', 'буква', 'звук', 'цвет', 'форма', 'размер', 'высота', 'длина', 'ширина', 'глубина',
    'скорость', 'движение', 'порядок', 'система', 'метод', 'результат', 'пример', 'задача', 'цель',
    'смысл', 'знание', 'опыт', 'память', 'внимание', 'мышление', 'решение', 'действие', 'процесс',
    'развитие', 'уровень', 'качество', 'количество', 'основа', 'причина', 'следствие', 'условие',
    'возможность', 'способность', 'потребность', 'интерес', 'характер', 'личность', 'общество',
    'коллектив', 'команда', 'группа', 'класс', 'школа', 'студент', 'учитель', 'врач', 'инженер',
    'программист', 'компьютер', 'клавиатура', 'экран', 'кнопка', 'палец', 'ладонь', 'запястье'
  ];

  /* =========================================================
     2. СИНТЕЗАТОР ЗВУКА МЕХАНИЧЕСКИХ ПЕРЕКЛЮЧАТЕЛЕЙ
     ========================================================= */
  class MechanicalAudioEngine {
    constructor() {
      this.ctx = null;
      this.soundType = 'blue'; // 'blue', 'brown', 'red', 'mute'
      this.volume = 0.45;
      this.enabled = true;
    }

    init() {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    setSoundType(type) {
      this.soundType = type;
      this.enabled = type !== 'mute';
    }

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, val));
    }

    playKeySound(isSpace = false) {
      if (!this.enabled || this.soundType === 'mute') return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const vol = this.volume * (isSpace ? 1.2 : 1.0);

      if (this.soundType === 'blue') {
        this._playClicky(now, vol, isSpace);
      } else if (this.soundType === 'brown') {
        this._playThock(now, vol, isSpace);
      } else if (this.soundType === 'red') {
        this._playLinear(now, vol, isSpace);
      }
    }

    _playClicky(now, vol, isSpace) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(isSpace ? 2400 : 3400 + Math.random() * 400, now);
      filter.Q.setValueAtTime(4.5, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isSpace ? 380 : 540 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.025);

      gain.gain.setValueAtTime(vol * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }

    _playThock(now, vol, isSpace) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isSpace ? 320 : 480 + Math.random() * 60, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isSpace ? 140 : 220 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.045);

      gain.gain.setValueAtTime(vol * 0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    }

    _playLinear(now, vol, isSpace) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isSpace ? 110 : 160 + Math.random() * 20, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.03);

      gain.gain.setValueAtTime(vol * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  /* =========================================================
     3. ЯДРО ЛОГИКИ ТЕСТА
     ========================================================= */
  class TypingEngine {
    constructor() {
      this.mode = 'time';
      this.duration = 60;
      this.wordLimit = 50;
      this.includePunctuation = false;
      this.includeNumbers = false;

      this.words = [];
      this.currentWordIndex = 0;
      this.currentCharIndex = 0;
      this.inputBuffer = '';

      this.startTime = null;
      this.timerInterval = null;
      this.elapsedSeconds = 0;
      this.remainingSeconds = 60;
      this.isActive = false;
      this.isCompleted = false;

      this.totalKeystrokes = 0;
      this.correctKeystrokes = 0;
      this.errorKeystrokes = 0;
      this.uncorrectedErrors = 0;

      this.timeline = [];
      this.keyStats = {};

      this.audio = new MechanicalAudioEngine();
    }

    generateWords(count = 120) {
      const pool = [...COMMON_WORDS];
      const result = [];
      let lastWord = '';

      for (let i = 0; i < count; i++) {
        let word = pool[Math.floor(Math.random() * pool.length)];
        while (word === lastWord) {
          word = pool[Math.floor(Math.random() * pool.length)];
        }
        lastWord = word;

        if (this.includeNumbers && Math.random() < 0.12) {
          word = Math.floor(Math.random() * 1000).toString();
        }

        if (this.includePunctuation) {
          const rand = Math.random();
          if (rand < 0.08) word += ',';
          else if (rand < 0.15) word += '.';
          else if (rand < 0.18) word = '«' + word + '»';
          else if (rand < 0.20) word += '!';
          else if (rand < 0.22) word += '?';
          else if (rand < 0.24) word += ';';
          else if (rand < 0.26) word += ':';
        }

        result.push(word);
      }
      this.words = result;
      return result;
    }

    reset() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.currentWordIndex = 0;
      this.currentCharIndex = 0;
      this.inputBuffer = '';
      this.startTime = null;
      this.elapsedSeconds = 0;
      this.remainingSeconds = this.duration;
      this.isActive = false;
      this.isCompleted = false;

      this.totalKeystrokes = 0;
      this.correctKeystrokes = 0;
      this.errorKeystrokes = 0;
      this.uncorrectedErrors = 0;
      this.timeline = [];
      this.keyStats = {};

      const count = this.mode === 'words' ? this.wordLimit : Math.max(120, this.duration * 3);
      this.generateWords(count);
    }

    startTimer(onTick, onComplete) {
      this.isActive = true;
      this.startTime = Date.now();

      this.timerInterval = setInterval(() => {
        this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);

        if (this.mode === 'time') {
          this.remainingSeconds = Math.max(0, this.duration - this.elapsedSeconds);
          this._recordTimelinePoint();

          if (typeof onTick === 'function') {
            onTick({
              time: this.remainingSeconds,
              wpm: this.getCurrentWPM(),
              rawWpm: this.getCurrentRawWPM(),
              accuracy: this.getCurrentAccuracy()
            });
          }

          if (this.remainingSeconds <= 0) {
            this.finish(onComplete);
          }
        } else {
          this._recordTimelinePoint();
          if (typeof onTick === 'function') {
            onTick({
              time: this.elapsedSeconds,
              wpm: this.getCurrentWPM(),
              rawWpm: this.getCurrentRawWPM(),
              accuracy: this.getCurrentAccuracy()
            });
          }
        }
      }, 1000);
    }

    _recordTimelinePoint() {
      const sec = this.mode === 'time' ? this.duration - this.remainingSeconds : this.elapsedSeconds;
      if (sec <= 0) return;
      this.timeline.push({
        second: sec,
        wpm: this.getCurrentWPM(),
        rawWpm: this.getCurrentRawWPM(),
        errors: this.errorKeystrokes
      });
    }

    handleKey(char, onTick, onComplete) {
      if (this.isCompleted) return;

      if (!this.isActive) {
        this.startTimer(onTick, onComplete);
      }

      this.totalKeystrokes++;
      const targetWord = this.words[this.currentWordIndex] || '';

      const lowerKey = char.toLowerCase();
      if (!this.keyStats[lowerKey]) {
        this.keyStats[lowerKey] = { total: 0, errors: 0 };
      }
      this.keyStats[lowerKey].total++;

      if (char === ' ') {
        this.audio.playKeySound(true);
        const typedWord = this.inputBuffer;

        if (typedWord !== targetWord) {
          this.uncorrectedErrors++;
        }

        this.currentWordIndex++;
        this.currentCharIndex = 0;
        this.inputBuffer = '';

        if (this.mode === 'words' && this.currentWordIndex >= this.wordLimit) {
          this.finish(onComplete);
        }
        return { action: 'next-word' };
      }

      this.audio.playKeySound(false);
      this.inputBuffer += char;

      const expectedChar = targetWord[this.currentCharIndex];
      const isCorrect = char === expectedChar;

      if (isCorrect) {
        this.correctKeystrokes++;
      } else {
        this.errorKeystrokes++;
        this.keyStats[lowerKey].errors++;
      }

      this.currentCharIndex++;
      return { action: 'char', isCorrect };
    }

    handleBackspace() {
      if (this.isCompleted || !this.isActive) return;
      if (this.inputBuffer.length > 0) {
        this.inputBuffer = this.inputBuffer.slice(0, -1);
        this.currentCharIndex = Math.max(0, this.currentCharIndex - 1);
        this.audio.playKeySound(false);
        return { action: 'backspace' };
      }
      return null;
    }

    finish(onComplete) {
      if (this.isCompleted) return;
      this.isCompleted = true;
      this.isActive = false;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this._recordTimelinePoint();

      if (typeof onComplete === 'function') {
        onComplete(this.getFinalResults());
      }
    }

    getCurrentWPM() {
      const mins = Math.max(1 / 60, (Date.now() - (this.startTime || Date.now())) / 60000);
      const grossWpm = (this.totalKeystrokes / 5) / mins;
      const netWpm = Math.max(0, grossWpm - (this.uncorrectedErrors / mins));
      return Math.round(netWpm) || 0;
    }

    getCurrentRawWPM() {
      const mins = Math.max(1 / 60, (Date.now() - (this.startTime || Date.now())) / 60000);
      return Math.round((this.totalKeystrokes / 5) / mins) || 0;
    }

    getCurrentAccuracy() {
      if (this.totalKeystrokes === 0) return 100;
      const acc = (this.correctKeystrokes / this.totalKeystrokes) * 100;
      return Math.max(0, Math.min(100, Math.round(acc * 10) / 10));
    }

    getConsistency() {
      if (this.timeline.length < 2) return 100;
      const wpms = this.timeline.map((t) => t.wpm);
      const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
      if (mean === 0) return 100;
      const variance = wpms.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wpms.length;
      const stdDev = Math.sqrt(variance);
      return Math.max(0, Math.min(100, Math.round(100 - (stdDev / mean) * 100)));
    }

    getPercentile(wpm) {
      if (wpm >= 120) return { percentile: 'Топ 0,5%', tier: 'Элитный гроссмейстер', badge: 'bg-amber-500 text-zinc-950', desc: 'У вас соревновательная ловкость мирового класса - вы опережаете 99,5% людей по скорости набора текста.' };
      if (wpm >= 95) return { percentile: 'Топ 3%', tier: 'Мастер слепой печати', badge: 'bg-amber-500/20 text-amber-500 border border-amber-500/30', desc: 'Превосходная моторика. Ваша скорость печати выше, чем у 97% профессиональных программистов.' };
      if (wpm >= 75) return { percentile: 'Топ 12%', tier: 'Продвинутый профессионал', badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', desc: 'Высокая и продуктивная скорость. Отличное владение клавиатурой для письма, кода и офисных задач.' };
      if (wpm >= 55) return { percentile: 'Топ 35%', tier: 'Выше среднего', badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', desc: 'Уверенная, беглая скорость печати, комфортно превышающая средний уровень офисных сотрудников.' };
      if (wpm >= 40) return { percentile: '50-й процентиль', tier: 'Средний уровень', badge: 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/30', desc: 'Стандартный взрослый показатель. Освоение слепой печати по домашнему ряду откроет путь к 70+ WPM.' };
      return { percentile: 'Нижние 25%', tier: 'Начинающий', badge: 'bg-rose-500/20 text-rose-400 border border-rose-500/30', desc: 'Базовая скорость набора. Тренируйте слепой метод, не глядя на клавиатуру.' };
    }

    getFinalResults() {
      const finalWpm = this.getCurrentWPM();
      const rawWpm = this.getCurrentRawWPM();
      const accuracy = this.getCurrentAccuracy();
      const consistency = this.getConsistency();
      const cpm = Math.round(this.correctKeystrokes / Math.max(1 / 60, (this.elapsedSeconds || this.duration) / 60));
      const percentileInfo = this.getPercentile(finalWpm);

      return {
        wpm: finalWpm,
        rawWpm,
        accuracy,
        consistency,
        cpm,
        keystrokes: this.totalKeystrokes,
        correctKeystrokes: this.correctKeystrokes,
        errorKeystrokes: this.errorKeystrokes,
        uncorrectedErrors: this.uncorrectedErrors,
        timeSeconds: this.elapsedSeconds || this.duration,
        mode: `${this.mode === 'time' ? this.duration + ' с' : this.wordLimit + ' слов'}`,
        timeline: this.timeline,
        keyStats: this.keyStats,
        percentileInfo
      };
    }
  }

  /* =========================================================
     4. РЕНДЕРЕР ГРАФИКА WPM
     ========================================================= */
  class WpmChartRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = window.devicePixelRatio || 1;
      this.padding = { left: 45, right: 45, top: 25, bottom: 35 };
      this.setupCanvas();
    }

    setupCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const cssWidth = rect.width || 760;
      const cssHeight = 260;
      this.canvas.width = cssWidth * this.dpr;
      this.canvas.height = cssHeight * this.dpr;
      this.canvas.style.height = cssHeight + 'px';
      this.ctx.scale(this.dpr, this.dpr);
      this.width = cssWidth;
      this.height = cssHeight;
    }

    draw(timeline, avgWpm) {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      if (!timeline || timeline.length < 2) return;

      const p = this.padding;
      const plotW = this.width - p.left - p.right;
      const plotH = this.height - p.top - p.bottom;

      const maxSec = timeline[timeline.length - 1].second || 1;
      const maxWpmVal = Math.max(80, Math.ceil((Math.max(...timeline.map((t) => Math.max(t.wpm, t.rawWpm))) + 15) / 20) * 20);

      const getX = (sec) => p.left + (sec / maxSec) * plotW;
      const getY = (wpm) => p.top + plotH - (wpm / maxWpmVal) * plotH;

      const gridSteps = 4;
      for (let i = 0; i <= gridSteps; i++) {
        const val = Math.round((maxWpmVal / gridSteps) * i);
        const y = getY(val);

        ctx.strokeStyle = 'rgba(161, 161, 170, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.left, y);
        ctx.lineTo(p.left + plotW, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(161, 161, 170, 0.6)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(val.toString(), p.left - 8, y);
      }

      if (avgWpm > 0) {
        const avgY = getY(avgWpm);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(p.left, avgY);
        ctx.lineTo(p.left + plotW, avgY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Сред. ${avgWpm}`, p.left + plotW + 6, avgY);
      }

      ctx.strokeStyle = 'rgba(161, 161, 170, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      timeline.forEach((pt, idx) => {
        const x = getX(pt.second);
        const y = getY(pt.rawWpm);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      const grad = ctx.createLinearGradient(0, p.top, 0, p.top + plotH);
      grad.addColorStop(0, 'rgba(0, 102, 204, 0.25)');
      grad.addColorStop(1, 'rgba(0, 102, 204, 0.0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(getX(timeline[0].second), getY(0));
      timeline.forEach((pt) => {
        ctx.lineTo(getX(pt.second), getY(pt.wpm));
      });
      ctx.lineTo(getX(timeline[timeline.length - 1].second), getY(0));
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#0066cc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      timeline.forEach((pt, idx) => {
        const x = getX(pt.second);
        const y = getY(pt.wpm);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      timeline.forEach((pt) => {
        const x = getX(pt.second);
        const y = getY(pt.wpm);
        ctx.fillStyle = '#0066cc';
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(161, 161, 170, 0.7)';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const step = Math.max(1, Math.floor(maxSec / 6));
      for (let s = step; s <= maxSec; s += step) {
        ctx.fillText(s + 'с', getX(s), p.top + plotH + 8);
      }
    }
  }

  /* =========================================================
     5. ГЕНЕРАТОР СЕРТИФИКАТА (PNG 1200x675)
     ========================================================= */
  function downloadTypingCertificate(results) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
    bgGrad.addColorStop(0, '#000000');
    bgGrad.addColorStop(0.5, '#09090b');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 675);

    const glow = ctx.createRadialGradient(600, 220, 0, 600, 220, 500);
    glow.addColorStop(0, 'rgba(0, 102, 204, 0.18)');
    glow.addColorStop(0.7, 'rgba(0, 102, 204, 0.02)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1200, 675);

    ctx.strokeStyle = 'rgba(0, 102, 204, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(36, 36, 1128, 603);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(48, 48, 1104, 579);

    ctx.fillStyle = '#2997ff';
    ctx.font = '600 13px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FREEIQEXAM.COM · ПСИХОМОТОРНЫЙ БЕНЧМАРК', 600, 95);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Outfit, system-ui, sans-serif';
    ctx.fillText('Официальный сертификат скорости печати', 600, 145);

    ctx.fillStyle = '#2997ff';
    ctx.font = 'bold 110px Outfit, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(results.wpm.toString(), 600, 260);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 16px JetBrains Mono, monospace';
    ctx.textBaseline = 'top';
    ctx.fillText('NET WORDS PER MINUTE (WPM)', 600, 325);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Outfit, system-ui, sans-serif';
    ctx.fillText(`${results.percentileInfo.tier} · ${results.percentileInfo.percentile}`, 600, 365);

    const stats = [
      { label: 'ТОЧНОСТЬ', value: `${results.accuracy}%` },
      { label: 'RAW WPM', value: results.rawWpm.toString() },
      { label: 'СТАБИЛЬНОСТЬ', value: `${results.consistency}%` },
      { label: 'ЗНАКОВ / МИН', value: results.cpm.toString() },
      { label: 'ДЛИТЕЛЬНОСТЬ', value: results.mode }
    ];

    const cardW = 190;
    const totalW = stats.length * cardW + (stats.length - 1) * 16;
    const startX = (1200 - totalW) / 2;

    stats.forEach((st, i) => {
      const x = startX + i * (cardW + 16);
      const y = 430;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(x, y, cardW, 85);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cardW, 85);

      ctx.fillStyle = '#2997ff';
      ctx.font = 'bold 22px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(st.value, x + cardW / 2, y + 25);

      ctx.fillStyle = '#71717a';
      ctx.font = '600 11px JetBrains Mono, monospace';
      ctx.fillText(st.label, x + cardW / 2, y + 55);
    });

    ctx.fillStyle = '#52525b';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`Проверено на https://freeiqexam.com/ru/typing-test · ${new Date().toLocaleDateString('ru-RU')}`, 600, 580);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sertifikat-skorosti-pechati-${results.wpm}wpm.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* =========================================================
     6. UI-КОНТРОЛЛЕР
     ========================================================= */
  const TypingApp = {
    engine: null,
    chartRenderer: null,
    wordsEl: null,
    caretEl: null,
    hiddenInput: null,

    init() {
      this.engine = new TypingEngine();
      this.bindDOM();
      this.setupTest();
    },

    bindDOM() {
      this.wordsEl = document.getElementById('wordsWrapper');
      this.caretEl = document.getElementById('caret');
      this.hiddenInput = document.getElementById('typingInput');

      const MODE_ACTIVE = ['active', 'bg-blue-500/10', 'text-blue-600', 'dark:text-blue-400', 'border', 'border-blue-500/40'];

      document.querySelectorAll('.mode-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.mode-btn').forEach((b) =>
            b.classList.remove('active', 'bg-blue-500/10', 'text-blue-600', 'dark:text-blue-400', 'border', 'border-blue-500/40', 'font-bold')
          );
          btn.classList.add(...MODE_ACTIVE, 'font-bold');
          this.engine.mode = btn.dataset.mode;

          const timeGroup = document.getElementById('timeOptionsGroup');
          const wordGroup = document.getElementById('wordOptionsGroup');
          if (this.engine.mode === 'time') {
            if (timeGroup) timeGroup.classList.remove('hidden');
            if (wordGroup) wordGroup.classList.add('hidden');
          } else {
            if (timeGroup) timeGroup.classList.add('hidden');
            if (wordGroup) wordGroup.classList.remove('hidden');
          }
          this.setupTest();
        });
      });

      document.querySelectorAll('.time-opt-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.time-opt-btn').forEach((b) => b.classList.remove('active', 'text-blue-500', 'font-bold'));
          btn.classList.add('active', 'text-blue-500', 'font-bold');
          this.engine.duration = parseInt(btn.dataset.time, 10);
          this.setupTest();
        });
      });

      document.querySelectorAll('.word-opt-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.word-opt-btn').forEach((b) => b.classList.remove('active', 'text-blue-500', 'font-bold'));
          btn.classList.add('active', 'text-blue-500', 'font-bold');
          this.engine.wordLimit = parseInt(btn.dataset.words, 10);
          this.setupTest();
        });
      });

      const puncToggle = document.getElementById('togglePunctuation');
      if (puncToggle) {
        puncToggle.addEventListener('click', () => {
          this.engine.includePunctuation = !this.engine.includePunctuation;
          puncToggle.classList.toggle('text-blue-500', this.engine.includePunctuation);
          puncToggle.classList.toggle('font-bold', this.engine.includePunctuation);
          this.setupTest();
        });
      }

      const numToggle = document.getElementById('toggleNumbers');
      if (numToggle) {
        numToggle.addEventListener('click', () => {
          this.engine.includeNumbers = !this.engine.includeNumbers;
          numToggle.classList.toggle('text-blue-500', this.engine.includeNumbers);
          numToggle.classList.toggle('font-bold', this.engine.includeNumbers);
          this.setupTest();
        });
      }

      const soundSelect = document.getElementById('soundSelect');
      if (soundSelect) {
        soundSelect.addEventListener('change', (e) => {
          this.engine.audio.setSoundType(e.target.value);
        });
      }

      const arena = document.getElementById('typingArena');
      if (arena && this.hiddenInput) {
        arena.addEventListener('click', () => {
          this.hiddenInput.focus();
        });
      }

      if (this.hiddenInput) {
        this.hiddenInput.addEventListener('keydown', (e) => this.onKeyDown(e));
        this.hiddenInput.addEventListener('input', (e) => this.onInput(e));
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          this.setupTest();
        }
      });

      const restartBtn = document.getElementById('restartBtn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => this.setupTest());
      }

      const retakeBtn = document.getElementById('retakeTestBtn');
      if (retakeBtn) {
        retakeBtn.addEventListener('click', () => this.setupTest());
      }

      const certBtn = document.getElementById('downloadCertBtn');
      if (certBtn) {
        certBtn.addEventListener('click', () => {
          downloadTypingCertificate(this.engine.getFinalResults());
        });
      }
    },

    setupTest() {
      this.engine.reset();

      const arena = document.getElementById('typingArena');
      const resultsWrap = document.getElementById('resultsWrap');
      if (arena) arena.classList.remove('hidden');
      if (resultsWrap) resultsWrap.classList.add('hidden');

      const timerDisplay = document.getElementById('hudTimer');
      const wpmDisplay = document.getElementById('hudWpm');
      const accDisplay = document.getElementById('hudAccuracy');
      if (timerDisplay) timerDisplay.textContent = this.engine.mode === 'time' ? `${this.engine.duration}с` : `0/${this.engine.wordLimit}`;
      if (wpmDisplay) wpmDisplay.textContent = '0';
      if (accDisplay) accDisplay.textContent = '100%';

      this.renderWordsDOM();
      this.updateCaret();

      if (this.hiddenInput) {
        this.hiddenInput.value = '';
        this.hiddenInput.focus();
      }
    },

    renderWordsDOM() {
      if (!this.wordsEl) return;
      this.wordsEl.innerHTML = '';
      this.wordsEl.scrollTop = 0;

      this.engine.words.forEach((word, wIdx) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = `word inline-flex mr-3 mb-2 transition-colors ${wIdx === 0 ? 'active' : ''}`;
        wordDiv.dataset.wordIndex = wIdx;

        for (let cIdx = 0; cIdx < word.length; cIdx++) {
          const charSpan = document.createElement('span');
          charSpan.className = 'char text-zinc-400 dark:text-zinc-600 transition-colors';
          charSpan.textContent = word[cIdx];
          charSpan.dataset.charIndex = cIdx;
          wordDiv.appendChild(charSpan);
        }
        this.wordsEl.appendChild(wordDiv);
      });
    },

    onKeyDown(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.setupTest();
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        const res = this.engine.handleBackspace();
        if (res) {
          this.updateWordDOM();
          this.updateCaret();
        }
        if (this.hiddenInput) this.hiddenInput.value = '';
        return;
      }

      if (e.key.length === 1 && e.key !== 'Unidentified' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const res = this.engine.handleKey(
          e.key,
          (tickData) => this.onTick(tickData),
          (results) => this.onComplete(results)
        );
        if (res) {
          this.updateWordDOM();
          this.updateCaret();
        }
        if (this.hiddenInput) this.hiddenInput.value = '';
      }
    },

    onInput(e) {
      if (e.inputType === 'deleteContentBackward') {
        const res = this.engine.handleBackspace();
        if (res) {
          this.updateWordDOM();
          this.updateCaret();
        }
        if (this.hiddenInput) this.hiddenInput.value = '';
        return;
      }

      const val = e.data || (this.hiddenInput ? this.hiddenInput.value : '');
      if (val && val.length > 0) {
        for (let char of val) {
          const res = this.engine.handleKey(
            char,
            (tickData) => this.onTick(tickData),
            (results) => this.onComplete(results)
          );
          if (res) {
            this.updateWordDOM();
            this.updateCaret();
          }
        }
        if (this.hiddenInput) this.hiddenInput.value = '';
      }
    },

    updateWordDOM() {
      const activeWordEl = this.wordsEl.querySelector(`.word[data-word-index="${this.engine.currentWordIndex}"]`);
      if (!activeWordEl) return;

      this.wordsEl.querySelectorAll('.word').forEach((wEl, idx) => {
        if (idx === this.engine.currentWordIndex) {
          wEl.classList.add('active');
        } else {
          wEl.classList.remove('active');
        }
      });

      const targetWord = this.engine.words[this.engine.currentWordIndex] || '';
      const input = this.engine.inputBuffer;
      const charSpans = activeWordEl.querySelectorAll('.char');

      charSpans.forEach((span, i) => {
        if (i < input.length) {
          if (input[i] === targetWord[i]) {
            span.className = 'char text-zinc-900 dark:text-white font-medium';
          } else {
            span.className = 'char text-rose-500 bg-rose-500/15 underline rounded-xs';
          }
        } else {
          span.className = 'char text-zinc-400 dark:text-zinc-600';
        }
      });

      const existingExtras = activeWordEl.querySelectorAll('.char.extra');
      existingExtras.forEach((el) => el.remove());

      if (input.length > targetWord.length) {
        for (let i = targetWord.length; i < input.length; i++) {
          const extraSpan = document.createElement('span');
          extraSpan.className = 'char extra text-rose-400 bg-rose-500/20 underline opacity-80';
          extraSpan.textContent = input[i];
          activeWordEl.appendChild(extraSpan);
        }
      }

      const arenaRect = this.wordsEl.getBoundingClientRect();
      const wordRect = activeWordEl.getBoundingClientRect();
      const relativeTop = wordRect.top - arenaRect.top;
      if (relativeTop > 48) {
        this.wordsEl.scrollTop += relativeTop - 36;
      }
    },

    updateCaret() {
      if (!this.caretEl || !this.wordsEl) return;

      const activeWordEl = this.wordsEl.querySelector(`.word[data-word-index="${this.engine.currentWordIndex}"]`);
      if (!activeWordEl) return;

      const chars = activeWordEl.querySelectorAll('.char');
      const arenaRect = this.wordsEl.getBoundingClientRect();

      let targetLeft = 0;
      let targetTop = 0;

      if (this.engine.currentCharIndex < chars.length) {
        const charRect = chars[this.engine.currentCharIndex].getBoundingClientRect();
        targetLeft = charRect.left - arenaRect.left;
        targetTop = charRect.top - arenaRect.top;
      } else if (chars.length > 0) {
        const lastCharRect = chars[chars.length - 1].getBoundingClientRect();
        targetLeft = lastCharRect.right - arenaRect.left;
        targetTop = lastCharRect.top - arenaRect.top;
      } else {
        const wordRect = activeWordEl.getBoundingClientRect();
        targetLeft = wordRect.left - arenaRect.left;
        targetTop = wordRect.top - arenaRect.top;
      }

      this.caretEl.style.transform = `translate(${targetLeft}px, ${targetTop}px)`;
    },

    onTick(data) {
      const timerDisplay = document.getElementById('hudTimer');
      const wpmDisplay = document.getElementById('hudWpm');
      const accDisplay = document.getElementById('hudAccuracy');

      if (timerDisplay) {
        timerDisplay.textContent = this.engine.mode === 'time' ? `${data.time}с` : `${this.engine.currentWordIndex}/${this.engine.wordLimit}`;
      }
      if (wpmDisplay) wpmDisplay.textContent = data.wpm.toString();
      if (accDisplay) accDisplay.textContent = `${data.accuracy}%`;
    },

    onComplete(results) {
      const arena = document.getElementById('typingArena');
      const resultsWrap = document.getElementById('resultsWrap');
      if (arena) arena.classList.add('hidden');
      if (resultsWrap) resultsWrap.classList.remove('hidden');

      const resWpm = document.getElementById('resWpm');
      const resAcc = document.getElementById('resAccuracy');
      const resRaw = document.getElementById('resRawWpm');
      const resConsistency = document.getElementById('resConsistency');
      const resCpm = document.getElementById('resCpm');
      const resPercentile = document.getElementById('resPercentile');
      const resTier = document.getElementById('resTier');
      const resDesc = document.getElementById('resDesc');

      if (resWpm) resWpm.textContent = results.wpm.toString();
      if (resAcc) resAcc.textContent = `${results.accuracy}%`;
      if (resRaw) resRaw.textContent = results.rawWpm.toString();
      if (resConsistency) resConsistency.textContent = `${results.consistency}%`;
      if (resCpm) resCpm.textContent = results.cpm.toString();
      if (resPercentile) resPercentile.textContent = results.percentileInfo.percentile;
      if (resTier) resTier.textContent = results.percentileInfo.tier;
      if (resDesc) resDesc.textContent = results.percentileInfo.desc;

      const chartCanvas = document.getElementById('wpmChartCanvas');
      if (chartCanvas) {
        if (!this.chartRenderer) {
          this.chartRenderer = new WpmChartRenderer(chartCanvas);
        } else {
          this.chartRenderer.setupCanvas();
        }
        this.chartRenderer.draw(results.timeline, results.wpm);
      }

      this.renderKeyboardHeatmap(results.keyStats);

      setTimeout(() => {
        if (resultsWrap) resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    },

    renderKeyboardHeatmap(keyStats) {
      const heatmapContainer = document.getElementById('keyboardHeatmap');
      if (!heatmapContainer) return;

      const keyboardRows = [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
      ];

      heatmapContainer.innerHTML = '';
      keyboardRows.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'flex justify-center gap-1.5 sm:gap-2 mb-1.5';

        row.forEach((k) => {
          const keyDiv = document.createElement('div');
          const stat = keyStats[k] || { total: 0, errors: 0 };
          const acc = stat.total > 0 ? Math.round(((stat.total - stat.errors) / stat.total) * 100) : null;

          let colorClass = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
          if (acc !== null) {
            if (acc >= 95) {
              colorClass = 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
            } else if (acc >= 85) {
              colorClass = 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
            } else {
              colorClass = 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/40 font-bold';
            }
          }

          keyDiv.className = `w-8 h-10 sm:w-9 sm:h-12 rounded-lg border flex flex-col items-center justify-center text-xs font-mono transition-all ${colorClass}`;
          keyDiv.innerHTML = `
            <span class="uppercase font-bold">${k}</span>
            <span class="text-[9px] opacity-75">${acc !== null ? acc + '%' : '-'}</span>
          `;
          rowDiv.appendChild(keyDiv);
        });
        heatmapContainer.appendChild(rowDiv);
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TypingApp.init());
  } else {
    TypingApp.init();
  }
})();