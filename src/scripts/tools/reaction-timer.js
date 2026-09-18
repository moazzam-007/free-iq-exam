(function () {
  'use strict';

  const STATE = Object.freeze({
    START: 'start',
    WAITING: 'waiting',
    ACTIVE: 'active',
    TOO_SOON: 'toosoon',
    RESULT: 'result',
    SUMMARY: 'summary'
  });

  const TOTAL_ROUNDS = 5;
  const MIN_DELAY_MS = 1500;
  const MAX_DELAY_MS = 5000;
  const PB_KEY = 'freeiqexam_best_rt';

  const arena = document.getElementById('reaction-box');
  if (!arena) return;

  const refs = {
    content: {
      start: document.getElementById('content-start'),
      waiting: document.getElementById('content-waiting'),
      active: document.getElementById('content-active'),
      tooSoon: document.getElementById('content-toosoon'),
      result: document.getElementById('content-result'),
      summary: document.getElementById('content-summary')
    },
    hudRound: document.getElementById('hud-round-counter'),
    hudBest: document.getElementById('hud-personal-best'),
    soundButton: document.getElementById('btn-sound-toggle'),
    soundIcon: document.getElementById('sound-icon'),
    soundLabel: document.getElementById('sound-label'),
    roundMs: document.getElementById('round-ms-display'),
    roundFeedback: document.getElementById('round-quick-feedback'),
    roundIndicator: document.getElementById('result-round-indicator'),
    finalAverage: document.getElementById('final-avg-ms'),
    finalPercentile: document.getElementById('final-percentile-badge'),
    finalTier: document.getElementById('final-tier-badge'),
    summaryTrials: document.getElementById('summary-trials-grid'),
    shareButton: document.getElementById('btn-share-score'),
    shareButtonText: document.getElementById('share-btn-text'),
    restartButton: document.getElementById('btn-restart-game'),
    toast: document.getElementById('share-toast')
  };

  let currentState = STATE.START;
  let currentRound = 0;
  let validTimes = [];
  let waitTimer = null;
  let activeTimestamp = 0;
  let soundEnabled = true;
  let audioContext = null;

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Private browsing or blocked storage: the test remains functional.
    }
  }

  function initAudio() {
    if (audioContext) return audioContext;

    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;

    try {
      audioContext = new AudioCtor();
      return audioContext;
    } catch {
      return null;
    }
  }

  function playTone(frequency, duration, type) {
    if (!soundEnabled) return;

    const ctx = initAudio();
    if (!ctx) return;

    try {
      if (ctx.state === 'suspended') {
        const resumePromise = ctx.resume();
        if (resumePromise && typeof resumePromise.catch === 'function') {
          resumePromise.catch(() => {});
        }
      }

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      const safeDuration = Math.max(0.03, duration);

      oscillator.type = type || 'sine';
      oscillator.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.11, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + safeDuration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(now);
      oscillator.stop(now + safeDuration + 0.02);
    } catch {
      // Audio is enhancement-only.
    }
  }

  function loadPersonalBest() {
    const raw = safeStorageGet(PB_KEY);
    const best = Number(raw);

    if (Number.isFinite(best) && best > 0) {
      refs.hudBest.textContent = `${Math.round(best)} ms`;
    } else {
      refs.hudBest.textContent = '—';
    }
  }

  function updateSoundButton() {
    if (!refs.soundButton) return;

    refs.soundButton.setAttribute('aria-pressed', String(soundEnabled));
    refs.soundButton.setAttribute(
      'aria-label',
      soundEnabled ? 'Mute sound effects' : 'Turn on sound effects'
    );

    var soundIconOn = document.getElementById('sound-icon-on');
    var soundIconOff = document.getElementById('sound-icon-off');
    if (soundIconOn) soundIconOn.classList.toggle('hidden', !soundEnabled);
    if (soundIconOff) soundIconOff.classList.toggle('hidden', soundEnabled);

    if (refs.soundLabel) {
      refs.soundLabel.textContent = soundEnabled ? 'Audio' : 'Muted';
    }
  }

  function stateKey(state) {
    switch (state) {
      case STATE.START:
        return 'start';
      case STATE.WAITING:
        return 'waiting';
      case STATE.ACTIVE:
        return 'active';
      case STATE.TOO_SOON:
        return 'tooSoon';
      case STATE.RESULT:
        return 'result';
      case STATE.SUMMARY:
        return 'summary';
      default:
        return 'start';
    }
  }

  function setVisualState(nextState) {
    currentState = nextState;

    arena.classList.remove(
      'state-start',
      'state-waiting',
      'state-active',
      'state-toosoon',
      'state-result',
      'state-summary'
    );

    arena.classList.add(`state-${nextState}`);

    const visibleKey = stateKey(nextState);

    Object.entries(refs.content).forEach(([key, node]) => {
      if (node) {
        node.classList.toggle('hidden', key !== visibleKey);
      }
    });

    arena.setAttribute(
      'aria-busy',
      String(nextState === STATE.WAITING)
    );

    const displayedRound =
      nextState === STATE.WAITING || nextState === STATE.ACTIVE
        ? currentRound
        : validTimes.length;

    if (refs.hudRound) {
      refs.hudRound.textContent = `${Math.min(displayedRound, TOTAL_ROUNDS)} / ${TOTAL_ROUNDS}`;
    }

    updateProgressPills();
  }

  function updateProgressPills() {
    for (let i = 1; i <= TOTAL_ROUNDS; i += 1) {
      const pill = document.getElementById(`pill-trial-${i}`);
      if (!pill) continue;

      pill.className = 'h-2 flex-1 rounded-full transition-colors duration-200';

      if (i <= validTimes.length) {
        pill.classList.add('bg-blue-600', 'dark:bg-blue-500');
      } else if (
        currentState !== STATE.SUMMARY &&
        i === currentRound
      ) {
        pill.classList.add(
          'bg-amber-400',
          'dark:bg-amber-500',
          'animate-pulse'
        );
      } else {
        pill.classList.add(
          'bg-zinc-200',
          'dark:bg-zinc-800'
        );
      }
    }
  }

  function clearWaitTimer() {
    if (waitTimer !== null) {
      window.clearTimeout(waitTimer);
      waitTimer = null;
    }
  }

  function beginTest() {
    clearWaitTimer();

    currentRound = 1;
    validTimes = [];
    activeTimestamp = 0;

    startWaiting();
  }

  function startWaiting() {
    clearWaitTimer();

    if (currentRound < 1) {
      currentRound = 1;
    }

    if (currentRound > TOTAL_ROUNDS) {
      showFinalSummary();
      return;
    }

    setVisualState(STATE.WAITING);

    initAudio();
    playTone(320, 0.08, 'triangle');

    const randomDelay =
      MIN_DELAY_MS +
      Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);

    waitTimer = window.setTimeout(() => {
      waitTimer = null;

      window.requestAnimationFrame(triggerActiveFrame);
    }, randomDelay);
  }

  function triggerActiveFrame() {
    /*
     * The visual transition is committed from a requestAnimationFrame callback.
     * The performance.now() sample immediately after that transition provides
     * the reference timestamp for the reaction interval.
     */
    setVisualState(STATE.ACTIVE);
    activeTimestamp = window.performance.now();

    playTone(880, 0.12, 'sine');
  }

  function handleInteraction(event) {
    if (event && event.type === 'pointerdown') {
      if (
        event.button !== undefined &&
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
    }

    initAudio();

    switch (currentState) {
      case STATE.START:
        beginTest();
        break;

      case STATE.WAITING:
        clearWaitTimer();

        setVisualState(STATE.TOO_SOON);
        playTone(200, 0.25, 'sawtooth');
        break;

      case STATE.TOO_SOON:
        startWaiting();
        break;

      case STATE.ACTIVE: {
        const endTimestamp = window.performance.now();

        const elapsed = Math.max(
          1,
          Math.round(endTimestamp - activeTimestamp)
        );

        validTimes.push(elapsed);
        activeTimestamp = 0;

        playTone(1050, 0.1, 'sine');
        showRoundResult(elapsed);
        break;
      }

      case STATE.RESULT:
        if (validTimes.length >= TOTAL_ROUNDS) {
          showFinalSummary();
        } else {
          currentRound = validTimes.length + 1;
          startWaiting();
        }
        break;

      case STATE.SUMMARY:
        break;

      default:
        break;
    }
  }

  function showRoundResult(milliseconds) {
    setVisualState(STATE.RESULT);

    if (refs.roundMs) {
      refs.roundMs.textContent = String(milliseconds);
    }

    if (refs.roundIndicator) {
      refs.roundIndicator.textContent =
        `ROUND ${validTimes.length} OF ${TOTAL_ROUNDS}`;
    }

    if (!refs.roundFeedback) return;

    if (milliseconds < 185) {
      refs.roundFeedback.textContent =
        '⚡ Exceptional speed. Elite-level reflex territory.';
    } else if (milliseconds < 220) {
      refs.roundFeedback.textContent =
        '🚀 Lightning fast. Well ahead of the population baseline.';
    } else if (milliseconds < 250) {
      refs.roundFeedback.textContent =
        '🎯 Above average. A strong visual reaction.';
    } else if (milliseconds <= 280) {
      refs.roundFeedback.textContent =
        '⏱️ Solid human baseline. Keep your gaze relaxed.';
    } else {
      refs.roundFeedback.textContent =
        '🐢 Slower result. Display and input latency can matter.';
    }
  }

  function erf(x) {
    const sign = x < 0 ? -1 : 1;
    const ax = Math.abs(x);

    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const t = 1 / (1 + p * ax);

    const polynomial =
      (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t;

    const y =
      1 -
      polynomial *
      Math.exp(-ax * ax);

    return sign * y;
  }

  function gaussianCDF(value, mean, standardDeviation) {
    const z =
      (value - mean) /
      standardDeviation;

    const probability =
      0.5 *
      (1 + erf(z / Math.SQRT2));

    return Math.max(
      0,
      Math.min(1, probability)
    );
  }

  function calculatePercentile(milliseconds) {
    /*
     * Lower reaction times are better.
     * The reference model is N(265, 42²).
     * Therefore a fast score corresponds to the upper
     * tail of the reference distribution.
     */
    const percentile =
      (1 - gaussianCDF(milliseconds, 265, 42)) * 100;

    return Math.max(
      1,
      Math.min(99, Math.round(percentile))
    );
  }

  function tierFor(milliseconds) {
    if (milliseconds < 185) {
      return {
        label: 'Cybernetic / Pro Gamer',
        classes: [
          'bg-purple-50',
          'dark:bg-purple-950',
          'text-purple-700',
          'dark:text-purple-300',
          'border-purple-200',
          'dark:border-purple-800'
        ]
      };
    }

    if (milliseconds < 220) {
      return {
        label: 'Lightning Fast',
        classes: [
          'bg-emerald-50',
          'dark:bg-emerald-950',
          'text-emerald-700',
          'dark:text-emerald-300',
          'border-emerald-200',
          'dark:border-emerald-800'
        ]
      };
    }

    if (milliseconds < 250) {
      return {
        label: 'Above Average',
        classes: [
          'bg-blue-50',
          'dark:bg-blue-950',
          'text-blue-700',
          'dark:text-blue-300',
          'border-blue-200',
          'dark:border-blue-800'
        ]
      };
    }

    if (milliseconds <= 280) {
      return {
        label: 'Normal Human Median',
        classes: [
          'bg-zinc-100',
          'dark:bg-zinc-800',
          'text-zinc-700',
          'dark:text-zinc-300',
          'border-zinc-200',
          'dark:border-zinc-700'
        ]
      };
    }

    return {
      label: 'Hardware Lag / Slower',
      classes: [
        'bg-amber-50',
        'dark:bg-amber-950',
        'text-amber-700',
        'dark:text-amber-300',
        'border-amber-200',
        'dark:border-amber-800'
      ]
    };
  }

  function showFinalSummary() {
    if (validTimes.length !== TOTAL_ROUNDS) {
      return;
    }

    clearWaitTimer();
    setVisualState(STATE.SUMMARY);

    playTone(660, 0.18, 'triangle');

    const average = Math.round(
      validTimes.reduce(
        (sum, value) => sum + value,
        0
      ) / validTimes.length
    );

    const percentile =
      calculatePercentile(average);

    const tier =
      tierFor(average);

    if (refs.finalAverage) {
      refs.finalAverage.textContent =
        String(average);
    }

    function getOrdinal(n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    if (refs.finalPercentile) {
      refs.finalPercentile.textContent =
        `Top ${100 - percentile}% Reflexes (${getOrdinal(percentile)} Percentile)`;
    }

    if (refs.finalTier) {
      refs.finalTier.className =
        'px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border';

      tier.classes.forEach((className) => {
        refs.finalTier.classList.add(className);
      });

      refs.finalTier.textContent =
        tier.label;
    }

    if (refs.summaryTrials) {
      refs.summaryTrials.innerHTML = '';

      validTimes.forEach((milliseconds, index) => {
        const chip =
          document.createElement('div');

        chip.className =
          'rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-2';

        const label =
          document.createElement('div');

        label.className =
          'text-[13px] text-zinc-500 dark:text-zinc-400 font-semibold';

        label.textContent =
          `R${index + 1}`;

        const value =
          document.createElement('div');

        value.className =
          'font-bold text-zinc-900 dark:text-white';

        value.textContent =
          `${milliseconds} ms`;

        chip.append(label, value);
        refs.summaryTrials.appendChild(chip);
      });
    }

    const previousBestRaw =
      safeStorageGet(PB_KEY);

    const previousBest =
      Number(previousBestRaw);

    const isNewBest =
      !Number.isFinite(previousBest) ||
      previousBest <= 0 ||
      average < previousBest;

    const best =
      isNewBest
        ? average
        : previousBest;

    safeStorageSet(
      PB_KEY,
      String(Math.round(best))
    );

    loadPersonalBest();

    if (isNewBest && refs.hudBest) {
      refs.hudBest.textContent =
        `${average} ms · PB`;
    }
  }

  async function copyScore() {
    const average =
      refs.finalAverage
        ? refs.finalAverage.textContent
        : '—';

    const message =
      `⚡ I scored an average reaction time of ${average} ms on FreeIQExam. ` +
      `Can you beat my reflexes? https://freeiqexam.com/reaction-time-test`;

    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === 'function'
      ) {
        await navigator.clipboard.writeText(message);
      } else {
        throw new Error('Clipboard API unavailable');
      }

      showToast('Score copied to clipboard');
    } catch {
      const textarea =
        document.createElement('textarea');

      textarea.value = message;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';

      document.body.appendChild(textarea);

      textarea.select();

      try {
        document.execCommand('copy');
        showToast('Score copied to clipboard');
      } catch {
        showToast(
          'Copy failed — select and share your score manually'
        );
      }

      textarea.remove();
    }
  }

  let toastTimer = null;

  function showToast(message) {
    if (!refs.toast) return;

    refs.toast.textContent = message;

    refs.toast.classList.remove(
      'translate-y-16',
      'opacity-0',
      'pointer-events-none'
    );

    refs.toast.classList.add(
      'translate-y-0',
      'opacity-100'
    );

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {
      refs.toast.classList.add(
        'translate-y-16',
        'opacity-0',
        'pointer-events-none'
      );

      refs.toast.classList.remove(
        'translate-y-0',
        'opacity-100'
      );
    }, 2600);
  }

  function restart() {
    beginTest();

    if (
      typeof arena.focus === 'function'
    ) {
      arena.focus({
        preventScroll: true
      });
    }
  }

  if (refs.soundButton) {
    refs.soundButton.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        soundEnabled = !soundEnabled;

        if (soundEnabled) {
          initAudio();
        }

        updateSoundButton();
      }
    );
  }

  if (refs.shareButton) {
    refs.shareButton.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        copyScore();
      }
    );
  }

  if (refs.restartButton) {
    refs.restartButton.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        restart();
      }
    );
  }

  arena.addEventListener(
    'pointerdown',
    handleInteraction,
    { passive: false }
  );

  window.addEventListener(
    'keydown',
    (event) => {
      const target = event.target;

      if (
        target &&
        (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable
        )
      ) {
        return;
      }

      if (
        event.code !== 'Space' &&
        event.code !== 'Enter'
      ) {
        return;
      }

      if (
        currentState === STATE.SUMMARY &&
        event.code === 'Enter'
      ) {
        return;
      }

      event.preventDefault();
      handleInteraction(null);
    }
  );

  loadPersonalBest();
  updateSoundButton();
  setVisualState(STATE.START);
})();