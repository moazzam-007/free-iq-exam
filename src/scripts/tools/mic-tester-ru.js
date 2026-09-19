/* ==========================================================================
   FreeIQExam - Microphone Test & Audio Quality Diagnostic
   Client engine: stream capture, FFT spectrum, peak/RMS dBFS metering,
   noise-floor & SNR analysis, and 5-second instant loopback playback.

   Everything runs locally in the browser. No audio ever leaves the device:
   there is no upload, no fetch, and no server-side component anywhere in
   this file, and the captured PCM lives only in RAM until the tab closes.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- *
   * Constants
   * ---------------------------------------------------------------- */

  const FFT_SIZE = 2048;
  const ANALYSER_SMOOTHING = 0.8;

  // Meter scale. -60 dBFS is the practical floor of a typical room + mic
  // self-noise, so the LED ladder spends its pixels where the signal is.
  const METER_FLOOR_DB = -60;
  const METER_CEIL_DB = 0;

  // True digital silence. 20*log10(0) is -Infinity, which poisons every
  // average it touches, so every amplitude is floored through toDb() first.
  const DB_FLOOR = -100;

  // Spectrum vertical range, in real dBFS.
  const SPECTRUM_FLOOR_DB = -100;
  const SPECTRUM_CEIL_DB = -10;

  // Spectrum horizontal range, in Hz. Log-spaced, because a linear axis
  // hands ~90% of the width to the bottom three octaves and crushes the
  // sibilance and air bands that carry speech intelligibility.
  const SPECTRUM_MIN_HZ = 20;
  const SPECTRUM_MAX_HZ = 20000;
  const SPECTRUM_BARS = 72;

  // Loopback capacity.
  const RING_SECONDS = 5;

  // Clipping. A single sample brushing full scale is a transient, not
  // distortion. Sustained saturation is three or more consecutive samples
  // pinned at the rail, which is what actually produces audible crackle.
  const CLIP_SAMPLE_LEVEL = 0.99;
  const CLIP_CONSECUTIVE = 3;
  const CLIP_HOLD_MS = 1500;

  // Noise-floor sampling.
  const NOISE_FLOOR_HISTORY = 240; // ~4s at 60fps
  const NOISE_MEASURE_MS = 3000;

  // SNR bands, from the Phase 2 Part 3 acoustic research file.
  const SNR_TIERS = [
    { min: 35, label: 'Отлично', tone: 'good', note: 'Wide dynamic range. Your voice will sit clearly above the room.' },
    { min: 25, label: 'Хорошо', tone: 'good', note: 'Comfortable margin. Fine for calls, streaming and voice notes.' },
    { min: 15, label: 'Удовлетворительно', tone: 'moderate', note: 'Audible hiss or hum underneath speech. A quieter room or a closer mic will help.' },
    { min: -Infinity, label: 'Плохо', tone: 'bad', note: 'Background noise is competing with your voice. Treat the room before the microphone.' }
  ];

  const DSP_FLAGS = ['echoCancellation', 'noiseSuppression', 'autoGainControl'];

  const WORKLET_NAME = 'fie-ring-capture';
  const WORKLET_SOURCE = `
    class FIERingCapture extends AudioWorkletProcessor {
      constructor(options) {
        super();
        const seconds = (options.processorOptions && options.processorOptions.seconds) || 5;
        this.capacity = Math.max(1, Math.ceil(sampleRate * seconds));
        this.ring = new Float32Array(this.capacity);
        this.write = 0;
        this.filled = 0;
        this.peak = 0;
        this.port.onmessage = (event) => {
          const cmd = event.data;
          if (cmd === 'snapshot') {
            const length = this.filled;
            const out = new Float32Array(length);
            const start = this.filled < this.capacity ? 0 : this.write;
            for (let i = 0; i < length; i += 1) {
              out[i] = this.ring[(start + i) % this.capacity];
            }
            this.port.postMessage({ type: 'snapshot', samples: out }, [out.buffer]);
          } else if (cmd === 'reset') {
            this.write = 0;
            this.filled = 0;
            this.peak = 0;
          } else if (cmd === 'status') {
            this.port.postMessage({
              type: 'status',
              filled: this.filled,
              capacity: this.capacity
            });
          }
        };
      }
      process(inputs) {
        const input = inputs[0];
        const channel = input && input[0];
        if (!channel) return true;
        for (let i = 0; i < channel.length; i += 1) {
          const sample = channel[i];
          this.ring[this.write] = sample;
          this.write = (this.write + 1) % this.capacity;
          if (this.filled < this.capacity) this.filled += 1;
          const abs = sample < 0 ? -sample : sample;
          if (abs > this.peak) this.peak = abs;
        }
        return true;
      }
    }
    registerProcessor('${WORKLET_NAME}', FIERingCapture);
  `;

  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */

  const state = {
    context: null,
    stream: null,
    source: null,
    analyser: null,
    capture: null, // active capture backend
    captureKind: 'none',

    running: false,
    starting: false,
    frame: null,

    timeData: null,
    freqData: null,

    dsp: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },

    deviceId: '',
    devices: [],

    // Metering
    rmsDb: DB_FLOOR,
    peakDb: DB_FLOOR,
    peakHoldDb: METER_FLOOR_DB,
    peakHoldAt: 0,
    clipUntil: 0,
    clipEvents: 0,

    // Room analysis
    rmsHistory: [],
    noiseFloorDb: null,
    speechPeakDb: null,
    snrDb: null,
    lockedNoiseFloorDb: null,
    measuringNoise: false,

    // Playback
    playbackNode: null,
    lastRecordingSeconds: 0,

    // Canvas
    canvas: null,
    ctx2d: null,
    cssWidth: 0,
    cssHeight: 0,
    dpr: 1,
    resizeObserver: null
  };

  /* ---------------------------------------------------------------- *
   * Utilities
   * ---------------------------------------------------------------- */

  const $ = (id) => document.getElementById(id);

  function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
  }

  // Amplitude (0..1 linear) to dBFS. The epsilon guard is what keeps
  // digital silence from becoming -Infinity and destroying every average.
  function toDb(amplitude) {
    if (!(amplitude > 0)) return DB_FLOOR;
    const db = 20 * Math.log10(amplitude);
    return db < DB_FLOOR ? DB_FLOOR : db;
  }

  function fmtDb(db) {
    if (db === null || db === undefined || !isFinite(db)) return '--';
    const rounded = Math.abs(db) < 0.05 ? 0 : db;
    return `${rounded.toFixed(1)}`;
  }

  // Linear-interpolated percentile over an already-sorted array.
  function percentile(sorted, fraction) {
    if (!sorted.length) return null;
    const index = (sorted.length - 1) * fraction;
    const low = Math.floor(index);
    const high = Math.ceil(index);
    if (low === high) return sorted[low];
    return sorted[low] + (sorted[high] - sorted[low]) * (index - low);
  }

  // These two run inside the 60fps loop, so both check before writing.
  // Assigning identical textContent, or re-adding a class the element already
  // carries, still costs a style recalculation sixty times a second.
  function setText(id, value) {
    const el = $(id);
    if (!el) return;
    const next = String(value);
    if (el.textContent !== next) el.textContent = next;
  }

  const TONES = ['good', 'moderate', 'bad', 'neutral'];

  function setTone(id, tone) {
    const el = $(id);
    if (!el) return;
    const next = tone || 'neutral';
    const present = TONES.filter((t) => el.classList.contains(t));
    if (present.length === 1 && present[0] === next) return;
    el.classList.remove(...TONES);
    el.classList.add(next);
  }

  function announce(message) {
    const live = $('mic-live');
    if (live) live.textContent = message;
  }

  /* ---------------------------------------------------------------- *
   * Environment & support detection
   * ---------------------------------------------------------------- */

  function insecureContext() {
    // getUserMedia is gated behind a secure context. file:// and plain
    // http:// on a LAN address both fail here, and the failure mode is a
    // bare `undefined` on navigator.mediaDevices rather than an exception.
    if (window.isSecureContext === false) return true;
    return !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia;
  }

  function showUnsupported(reason) {
    const panel = $('mic-unsupported');
    const body = $('mic-unsupported-reason');
    if (body) body.textContent = reason;
    if (panel) panel.hidden = false;
    const app = $('mic-controls');
    if (app) app.hidden = true;
  }

  function describeError(error) {
    if (!error) return 'The microphone could not be opened for an unknown reason.';
    switch (error.name) {
      case 'NotAllowedError':
      case 'SecurityError':
        return 'Permission was denied. Your browser is blocking microphone access for this site - open the padlock or camera icon in the address bar, allow the microphone, then reload this page.';
      case 'NotFoundError':
      case 'DevicesNotFoundError':
        return 'No microphone was found. Plug in or enable a microphone, then reload this page. On a laptop, check that the built-in mic has not been disabled in your operating system sound settings.';
      case 'NotReadableError':
      case 'TrackStartError':
        return 'The microphone is present but could not be read. Another application is most likely holding it exclusively - close Zoom, Teams, Discord, OBS or any voice recorder, then try again.';
      case 'OverconstrainedError':
      case 'ConstraintNotSatisfiedError':
        return 'The selected microphone does not support the requested settings. Pick a different input device from the list.';
      case 'AbortError':
        return 'The browser aborted the microphone request. Reload the page and try again.';
      default:
        return `The microphone could not be opened: ${error.message || error.name || 'unknown error'}.`;
    }
  }

  /* ---------------------------------------------------------------- *
   * Device enumeration
   * ---------------------------------------------------------------- */

  // Labels are deliberately blank until the page holds microphone
  // permission, so enumeration has to happen *after* a successful
  // getUserMedia call or the dropdown reads "Microphone 1, Microphone 2".
  async function populateDevices() {
    const select = $('mic-device');
    if (!select) return;
    let devices = [];
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      devices = all.filter((d) => d.kind === 'audioinput');
    } catch (error) {
      devices = [];
    }

    state.devices = devices;
    select.innerHTML = '';

    if (!devices.length) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'Микрофон не обнаружен';
      select.appendChild(option);
      select.disabled = true;
      return;
    }
    select.disabled = false;

    devices.forEach((device, index) => {
      const option = document.createElement('option');
      option.value = device.deviceId;
      option.textContent = device.label || `Microphone ${index + 1}`;
      select.appendChild(option);
    });

    const active = state.stream
      ? state.stream.getAudioTracks()[0]?.getSettings()?.deviceId
      : null;
    const preferred = active || state.deviceId;
    if (preferred && devices.some((d) => d.deviceId === preferred)) {
      select.value = preferred;
      state.deviceId = preferred;
    } else {
      state.deviceId = devices[0].deviceId;
      select.value = state.deviceId;
    }
  }

  /* ---------------------------------------------------------------- *
   * Capture backends - AudioWorklet, with a ScriptProcessor fallback
   * ---------------------------------------------------------------- */

  function makeMainThreadRing(capacity) {
    return {
      ring: new Float32Array(capacity),
      write: 0,
      filled: 0,
      capacity,
      push(channel) {
        for (let i = 0; i < channel.length; i += 1) {
          this.ring[this.write] = channel[i];
          this.write = (this.write + 1) % this.capacity;
          if (this.filled < this.capacity) this.filled += 1;
        }
      },
      snapshot() {
        const length = this.filled;
        const out = new Float32Array(length);
        const start = this.filled < this.capacity ? 0 : this.write;
        for (let i = 0; i < length; i += 1) out[i] = this.ring[(start + i) % this.capacity];
        return out;
      },
      reset() {
        this.write = 0;
        this.filled = 0;
      }
    };
  }

  async function createWorkletCapture(context, source) {
    const blob = new Blob([WORKLET_SOURCE], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      await context.audioWorklet.addModule(url);
    } finally {
      URL.revokeObjectURL(url);
    }

    const node = new AudioWorkletNode(context, WORKLET_NAME, {
      numberOfInputs: 1,
      numberOfOutputs: 0,
      processorOptions: { seconds: RING_SECONDS }
    });

    let pending = null;
    node.port.onmessage = (event) => {
      if (event.data && event.data.type === 'snapshot' && pending) {
        const resolve = pending;
        pending = null;
        resolve(event.data.samples);
      }
    };

    source.connect(node);

    return {
      kind: 'worklet',
      snapshot() {
        return new Promise((resolve) => {
          pending = resolve;
          node.port.postMessage('snapshot');
          // A worklet that has been torn down mid-flight would otherwise
          // leave this promise pending forever and hang the playback button.
          window.setTimeout(() => {
            if (pending === resolve) {
              pending = null;
              resolve(new Float32Array(0));
            }
          }, 800);
        });
      },
      reset() {
        node.port.postMessage('reset');
      },
      stop() {
        if (pending) {
          pending(new Float32Array(0));
          pending = null;
        }
        node.port.onmessage = null;
        try {
          source.disconnect(node);
        } catch (error) {
          /* already disconnected */
        }
        node.disconnect();
      }
    };
  }

  function createScriptProcessorCapture(context, source) {
    // Deprecated, but it is the only synchronous sample tap left in Safari
    // versions without AudioWorklet, and it needs no extra download.
    const node = context.createScriptProcessor(4096, 1, 1);
    const ring = makeMainThreadRing(Math.ceil(context.sampleRate * RING_SECONDS));

    node.onaudioprocess = (event) => {
      const channel = event.inputBuffer.getChannelData(0);
      ring.push(channel);
    };

    // A ScriptProcessorNode only runs while it is connected through to a
    // destination, so it is routed via a silent gain stage.
    const sink = context.createGain();
    sink.gain.value = 0;
    source.connect(node);
    node.connect(sink);
    sink.connect(context.destination);

    return {
      kind: 'scriptprocessor',
      snapshot() {
        return Promise.resolve(ring.snapshot());
      },
      reset() {
        ring.reset();
      },
      stop() {
        node.onaudioprocess = null;
        try {
          source.disconnect(node);
        } catch (error) {
          /* already disconnected */
        }
        try {
          node.disconnect();
          sink.disconnect();
        } catch (error) {
          /* already disconnected */
        }
      }
    };
  }

  async function attachCapture(context, source) {
    if (context.audioWorklet && typeof AudioWorkletNode === 'function') {
      try {
        return await createWorkletCapture(context, source);
      } catch (error) {
        // Fall through to the legacy tap rather than failing the whole test.
      }
    }
    return createScriptProcessorCapture(context, source);
  }

  /* ---------------------------------------------------------------- *
   * Stream lifecycle
   * ---------------------------------------------------------------- */

  function teardownStream() {
    if (state.capture) {
      try {
        state.capture.stop();
      } catch (error) {
        /* capture already gone */
      }
      state.capture = null;
    }
    if (state.source) {
      try {
        state.source.disconnect();
      } catch (error) {
        /* already disconnected */
      }
      state.source = null;
    }
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      state.stream = null;
    }
    state.analyser = null;
    state.running = false;
  }

  async function startStream() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showUnsupported('This browser does not expose the microphone API.');
      return;
    }

    // Opening a stream is asynchronous and involves a permission prompt, so
    // a double click would otherwise start two overlapping negotiations.
    if (state.starting) return;
    state.starting = true;
    const startBtn = $('mic-start');
    if (startBtn) startBtn.disabled = true;

    try {
      await openStream();
    } finally {
      state.starting = false;
    }
  }

  async function openStream() {
    teardownStream();
    stopRenderLoop();
    hideError();

    const constraints = {
      audio: {
        deviceId: state.deviceId ? { exact: state.deviceId } : undefined,
        // Raw by default. Every one of these three is a destructive
        // processor that hides exactly the defects this test exists to find.
        echoCancellation: state.dsp.echoCancellation,
        noiseSuppression: state.dsp.noiseSuppression,
        autoGainControl: state.dsp.autoGainControl
      },
      video: false
    };

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      // A saved deviceId can go stale between sessions - the headset was
      // unplugged, or the OS reassigned the id. `exact` then fails hard
      // rather than falling back, so retry once on whatever the system
      // currently calls the default input.
      const staleDevice = constraints.audio.deviceId && (error.name === 'OverconstrainedError' || error.name === 'NotFoundError');
      if (staleDevice) {
        state.deviceId = '';
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: constraints.audio.echoCancellation, noiseSuppression: constraints.audio.noiseSuppression, autoGainControl: constraints.audio.autoGainControl }, video: false });
        } catch (retryError) {
          showError(describeError(retryError));
          return;
        }
      } else {
        showError(describeError(error));
        return;
      }
    }

    state.stream = stream;

    // The context is created only now, so its sample rate reflects the
    // hardware actually granted rather than a device the user later swapped.
    if (!state.context || state.context.state === 'closed') {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      state.context = new Ctor({ latencyHint: 'interactive' });
    }
    if (state.context.state === 'suspended') {
      try {
        await state.context.resume();
      } catch (error) {
        /* resume is best-effort; the graph still reports state */
      }
    }

    const context = state.context;

    state.analyser = context.createAnalyser();
    state.analyser.fftSize = FFT_SIZE;
    state.analyser.smoothingTimeConstant = ANALYSER_SMOOTHING;
    state.analyser.minDecibels = SPECTRUM_FLOOR_DB;
    state.analyser.maxDecibels = SPECTRUM_CEIL_DB;

    state.source = context.createMediaStreamSource(stream);
    state.source.connect(state.analyser);

    state.timeData = new Float32Array(state.analyser.fftSize);
    state.freqData = new Float32Array(state.analyser.frequencyBinCount);

    state.capture = await attachCapture(context, state.source);
    state.captureKind = state.capture.kind;

    resetAnalysis();
    state.running = true;

    await populateDevices();
    await renderHardware();
    renderDspToggles();
    setTransportState(true);
    startRenderLoop();

    announce('Микрофон активен. Говорите как обычно и следите за индикаторами.');
  }

  function hideError() {
    const panel = $('mic-error');
    if (panel) panel.hidden = true;
  }

  function showError(message) {
    const panel = $('mic-error');
    const body = $('mic-error-message');
    if (body) body.textContent = message;
    if (panel) panel.hidden = false;
    setTransportState(false);
    announce(message);
  }

  function setTransportState(running) {
    const startBtn = $('mic-start');
    const stopBtn = $('mic-stop');
    const playbackBtn = $('mic-playback');
    if (startBtn) startBtn.disabled = running;
    if (stopBtn) stopBtn.disabled = !running;
    if (playbackBtn) playbackBtn.disabled = !running;
    const shell = $('mic-app');
    if (shell) shell.classList.toggle('is-live', running);
  }

  /* ---------------------------------------------------------------- *
   * Hardware capability card
   * ---------------------------------------------------------------- */

  async function renderHardware() {
    const track = state.stream ? state.stream.getAudioTracks()[0] : null;
    const settings = track && track.getSettings ? track.getSettings() : {};
    const context = state.context;

    const label = track && track.label ? track.label : 'Неизвестный вход';
    setText('hw-device', label);

    // The track reports what the hardware is actually running at, which
    // can differ from the context rate after resampling.
    const rate = settings.sampleRate || (context ? context.sampleRate : null);
    setText('hw-rate', rate ? `${(rate / 1000).toFixed(1)} kHz` : '--');

    const channels = settings.channelCount;
    setText('hw-channels', channels === 1 ? 'Mono' : channels === 2 ? 'Stereo' : channels ? `${channels} ch` : '--');

    // Total input-to-output latency. baseLatency is the graph's own buffer;
    // outputLatency is the hardware path; neither alone is the full figure.
    let latencyMs = null;
    if (context) {
      const base = typeof context.baseLatency === 'number' ? context.baseLatency : 0;
      const output = typeof context.outputLatency === 'number' ? context.outputLatency : 0;
      if (base || output) latencyMs = (base + output) * 1000;
    }
    setText('hw-latency', latencyMs !== null ? `${latencyMs.toFixed(0)} ms` : 'n/a');

    setText('hw-capture', state.captureKind === 'worklet' ? 'AudioWorklet ring buffer' : 'ScriptProcessor ring buffer');

    const dspActive = DSP_FLAGS.filter((flag) => state.dsp[flag]);
    setText('hw-dsp', dspActive.length ? dspActive.join(', ') : 'None - raw input');
  }

  function renderDspToggles() {
    DSP_FLAGS.forEach((flag) => {
      const input = $(`dsp-${flag}`);
      if (input) input.checked = Boolean(state.dsp[flag]);
    });
  }

  /* ---------------------------------------------------------------- *
   * Analysis reset
   * ---------------------------------------------------------------- */

  function resetAnalysis() {
    state.rmsHistory = [];
    state.noiseFloorDb = null;
    state.speechPeakDb = null;
    state.snrDb = null;
    state.lockedNoiseFloorDb = null;
    state.peakHoldDb = METER_FLOOR_DB;
    state.clipEvents = 0;
    state.clipUntil = 0;
    state.measuringNoise = false;
  }

  /* ---------------------------------------------------------------- *
   * Meters
   * ---------------------------------------------------------------- */

  function renderMeters() {    const rmsDb = state.rmsDb;
    const peakDb = state.peakDb;

    setText('meter-rms', fmtDb(rmsDb));
    setText('meter-peak', fmtDb(peakDb));

    const span = METER_CEIL_DB - METER_FLOOR_DB;
    const rmsPct = clamp(((rmsDb - METER_FLOOR_DB) / span) * 100, 0, 100);

    const fill = $('meter-fill');
    // The fill masks the unlit part of the scale from the right, so it
    // carries the complement of the level.
    if (fill) fill.style.width = `${100 - rmsPct}%`;

    // Peak hold: jump up instantly, then bleed down so a transient stays
    // readable long enough to see what caused it.
    const now = performance.now();
    if (peakDb > state.peakHoldDb) {
      state.peakHoldDb = peakDb;
      state.peakHoldAt = now;
    } else {
      const elapsed = now - state.peakHoldAt;
      if (elapsed > 900) state.peakHoldDb = Math.max(METER_FLOOR_DB, state.peakHoldDb - 0.6);
    }

    const holdPct = clamp(((state.peakHoldDb - METER_FLOOR_DB) / span) * 100, 0, 100);
    const hold = $('meter-peak-marker');
    if (hold) hold.style.left = `${holdPct}%`;

    const clipping = now < state.clipUntil;
    const clip = $('clip-indicator');
    if (clip) clip.classList.toggle('is-active', clipping);
    const root = $('mic-app');
    if (root) root.classList.toggle('is-clipping', clipping);
  }

  // Stopping leaves the last frame's numbers on screen, which reads as a
  // frozen live meter. Clear the readouts and park both indicators at rest.
  function resetMetersUI() {
    setText('meter-rms', '--');
    setText('meter-peak', '--');
    const fill = $('meter-fill');
    if (fill) fill.style.width = '100%';
    const marker = $('meter-peak-marker');
    if (marker) marker.style.left = '0%';
    const clip = $('clip-indicator');
    if (clip) clip.classList.remove('is-active');
    const root = $('mic-app');
    if (root) root.classList.remove('is-clipping');
  }

  /* ---------------------------------------------------------------- *
   * Room analysis - noise floor, speech peak, SNR
   * ---------------------------------------------------------------- */

  function updateRoomAnalysis() {
    state.rmsHistory.push(state.rmsDb);
    if (state.rmsHistory.length > NOISE_FLOOR_HISTORY) state.rmsHistory.shift();

    if (state.rmsHistory.length < 30) {
      renderSnr();
      return;
    }

    // Percentiles rather than a magic gate. The reference implementations
    // only accumulated frames below a fixed threshold and then tested
    // against that same threshold - so the "noisy room" branch could never
    // fire. Taking the 20th percentile of everything is the quiet part of
    // the window by construction, and cannot dead-end that way.
    const sorted = state.rmsHistory.slice().sort((a, b) => a - b);
    state.noiseFloorDb = percentile(sorted, 0.2);
    state.speechPeakDb = percentile(sorted, 0.98);

    const floor = state.lockedNoiseFloorDb !== null ? state.lockedNoiseFloorDb : state.noiseFloorDb;
    state.snrDb = state.speechPeakDb - floor;

    renderSnr();
  }

  function snrTier(snr) {
    for (let i = 0; i < SNR_TIERS.length; i += 1) {
      if (snr >= SNR_TIERS[i].min) return SNR_TIERS[i];
    }
    return SNR_TIERS[SNR_TIERS.length - 1];
  }

  function renderSnr() {
    const floor = state.lockedNoiseFloorDb !== null ? state.lockedNoiseFloorDb : state.noiseFloorDb;

    setText('analysis-floor', floor === null ? '--' : `${fmtDb(floor)} dBFS`);
    setText('analysis-speech', state.speechPeakDb === null ? '--' : `${fmtDb(state.speechPeakDb)} dBFS`);
    setText('analysis-snr', state.snrDb === null ? '--' : `${fmtDb(state.snrDb)} dB`);

    const badge = $('snr-badge');
    const note = $('snr-note');

    if (state.snrDb === null || floor === null || state.speechPeakDb === null || state.speechPeakDb <= DB_FLOOR + 1) {
      if (badge) {
        badge.textContent = 'Измерение';
        badge.className = 'result-badge neutral';
      }
      if (note) note.textContent = 'Говорите несколько секунд, и соотношение вычислится, как только в окне будут и речь, и тишина.';
      return;
    }

    // A "ratio" between two floors is meaningless - it would report a
    // spectacular SNR for a microphone that is simply unplugged.
    if (state.snrDb < 3) {
      if (badge) {
        badge.textContent = 'Речь не обнаружена';
        badge.className = 'result-badge neutral';
      }
      if (note) note.textContent = 'Сигнал так и не превысил уровень шума. Проверьте, выбран ли правильный вход, и говорите прямо в микрофон.';
      return;
    }

    const tier = snrTier(state.snrDb);
    if (badge) {
      badge.textContent = `${tier.label} · ${fmtDb(state.snrDb)} dB SNR`;
      badge.className = `result-badge ${tier.tone}`;
    }
    if (note) {
      note.textContent = state.lockedNoiseFloorDb !== null
        ? `${tier.note} Measured against your locked room floor of ${fmtDb(state.lockedNoiseFloorDb)} dBFS.`
        : tier.note;
    }
  }

  async function measureNoiseFloor() {
    if (!state.running || state.measuringNoise || state.lockedNoiseFloorDb !== null) return;
    state.measuringNoise = true;

    const button = $('noise-capture');
    const bar = $('noise-progress');
    const status = $('noise-status');
    if (button) button.disabled = true;
    if (status) status.textContent = 'Сохраняйте тишину — измерение уровня шума в комнате…';

    const started = performance.now();
    const sample = [];

    const tick = () => {
      if (!state.measuringNoise) return;
      sample.push(state.rmsDb);
      const elapsed = performance.now() - started;
      const pct = clamp((elapsed / NOISE_MEASURE_MS) * 100, 0, 100);
      if (bar) bar.style.width = `${pct}%`;
      if (elapsed < NOISE_MEASURE_MS) {
        window.requestAnimationFrame(tick);
        return;
      }

      const sorted = sample.slice().sort((a, b) => a - b);
      // Median of the quiet window: robust against a stray cough or a
      // chair creak landing inside the sample period.
      state.lockedNoiseFloorDb = percentile(sorted, 0.5);
      state.measuringNoise = false;
      if (button) button.disabled = false;
      if (bar) bar.style.width = '0%';
      if (status) status.textContent = `Room floor locked at ${fmtDb(state.lockedNoiseFloorDb)} dBFS.`;
      const reset = $('noise-reset');
      if (reset) reset.hidden = false;
      renderSnr();
      announce(`Room noise floor measured at ${fmtDb(state.lockedNoiseFloorDb)} dBFS.`);
    };

    window.requestAnimationFrame(tick);
  }

  function resetNoiseFloor() {
    state.lockedNoiseFloorDb = null;
    state.measuringNoise = false;
    const status = $('noise-status');
    if (status) status.textContent = 'Ещё не измерено.';
    const bar = $('noise-progress');
    if (bar) bar.style.width = '0%';
    const reset = $('noise-reset');
    if (reset) reset.hidden = true;
    const button = $('noise-capture');
    if (button) button.disabled = false;
    renderSnr();
  }

  /* ---------------------------------------------------------------- *
   * Diagnostics panel
   * ---------------------------------------------------------------- */

  function updateDiagnostics() {
    const rmsDb = state.rmsDb;
    const peakDb = state.peakDb;

    // Input level
    let level = 'Тишина';
    let levelTone = 'neutral';
    if (peakDb > -1 || rmsDb > -6) {
      level = 'Слишком громко — снизьте усиление';
      levelTone = 'bad';
    } else if (rmsDb > -24) {
      level = 'Optimal';
      levelTone = 'good';
    } else if (rmsDb > -36) {
      level = 'Хорошо';
      levelTone = 'good';
    } else if (rmsDb > -50) {
      level = 'Тихо — увеличьте усиление';
      levelTone = 'moderate';
    }
    setText('diag-level', level);
    setTone('diag-level', levelTone);

    // Clipping
    const clipping = performance.now() < state.clipUntil;
    if (clipping) {
      setText('diag-clipping', `Clipping - ${state.clipEvents} event${state.clipEvents === 1 ? '' : 's'}`);
      setTone('diag-clipping', 'bad');
    } else if (state.clipEvents > 0) {
      setText('diag-clipping', `Clean now - ${state.clipEvents} earlier event${state.clipEvents === 1 ? '' : 's'}`);
      setTone('diag-clipping', 'moderate');
    } else {
      setText('diag-clipping', 'Clean - no saturation');
      setTone('diag-clipping', 'good');
    }

    // Ambience
    const floor = state.lockedNoiseFloorDb !== null ? state.lockedNoiseFloorDb : state.noiseFloorDb;
    if (floor === null) {
      setText('diag-noise', 'Измерение');
      setTone('diag-noise', 'neutral');
    } else if (floor > -45) {
      setText('diag-noise', `Noisy room (${fmtDb(floor)} dBFS)`);
      setTone('diag-noise', 'bad');
    } else if (floor > -60) {
      setText('diag-noise', `Acceptable (${fmtDb(floor)} dBFS)`);
      setTone('diag-noise', 'moderate');
    } else {
      setText('diag-noise', `Very quiet (${fmtDb(floor)} dBFS)`);
      setTone('diag-noise', 'good');
    }

    // Чёткость, judged on where speech actually sits in the mix.
    let clarity = 'Тишина';
    let clarityTone = 'neutral';
    if (floor !== null && state.snrDb !== null && state.snrDb >= 3) {
      if (rmsDb > -22) {
        clarity = 'Broadcast clear';
        clarityTone = 'good';
      } else if (rmsDb > -32) {
        clarity = 'Conversation clear';
        clarityTone = 'good';
      } else if (rmsDb > -46) {
        clarity = 'Soft but intelligible';
        clarityTone = 'moderate';
      } else {
        clarity = 'Buried in the noise floor';
        clarityTone = 'bad';
      }
    } else if (rmsDb > -50) {
      clarity = 'Waiting for speech';
      clarityTone = 'neutral';
    }
    setText('diag-clarity', clarity);
    setTone('diag-clarity', clarityTone);
  }

  /* ---------------------------------------------------------------- *
   * Spectrum canvas
   * ---------------------------------------------------------------- */

  function setupCanvas() {
    const canvas = $('spectrum-canvas');
    if (!canvas) return;
    state.canvas = canvas;
    state.ctx2d = canvas.getContext('2d');
    resizeCanvas();

    if (typeof ResizeObserver === 'function') {
      state.resizeObserver = new ResizeObserver(() => resizeCanvas());
      state.resizeObserver.observe(canvas);
    }
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    const canvas = state.canvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    state.cssWidth = width;
    state.cssHeight = height;
    state.dpr = dpr;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = state.ctx2d;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Log-spaced frequency axis. Linear spacing gives the 20-150 Hz rumble
  // band a third of the screen and leaves the 2-16 kHz speech-clarity and
  // air bands fighting over a handful of pixels.
  function binForFrequency(hz) {
    const nyquist = state.context ? state.context.sampleRate / 2 : 24000;
    const bin = Math.round((hz / nyquist) * (state.freqData ? state.freqData.length - 1 : 0));
    return clamp(bin, 0, (state.freqData ? state.freqData.length : 1) - 1);
  }

  const BANDS = [
    { from: 20, to: 150, label: 'Гул', color: '#8b5cf6' },
    { from: 150, to: 500, label: 'Основные частоты', color: '#6366f1' },
    { from: 500, to: 2000, label: 'Корпус', color: '#38bdf8' },
    { from: 2000, to: 6000, label: 'Чёткость', color: '#10b981' },
    { from: 6000, to: 16000, label: 'Воздух', color: '#a78bfa' }
  ];

  function colorForFrequency(hz) {
    for (let i = 0; i < BANDS.length; i += 1) {
      if (hz >= BANDS[i].from && hz < BANDS[i].to) return BANDS[i].color;
    }
    return BANDS[BANDS.length - 1].color;
  }

  function drawSpectrum() {
    const ctx = state.ctx2d;
    if (!ctx || !state.freqData || !state.context) return;

    const width = state.cssWidth;
    const height = state.cssHeight;
    const nyquist = state.context.sampleRate / 2;
    const maxHz = Math.min(SPECTRUM_MAX_HZ, nyquist);
    const minHz = Math.min(SPECTRUM_MIN_HZ, maxHz / 2);

    ctx.clearRect(0, 0, width, height);

    // Grid: horizontal dB rules and vertical band separators.
    ctx.strokeStyle = 'rgba(113, 113, 122, 0.18)';
    ctx.lineWidth = 1;
    for (let db = SPECTRUM_CEIL_DB; db >= SPECTRUM_FLOOR_DB; db -= 20) {
      const y = Math.round(((SPECTRUM_CEIL_DB - db) / (SPECTRUM_CEIL_DB - SPECTRUM_FLOOR_DB)) * height) + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const labelSpace = 18;
    const plotHeight = Math.max(10, height - labelSpace);

    BANDS.forEach((band, index) => {
      if (band.from <= minHz) return;
      const ratio = Math.log(band.from / minHz) / Math.log(maxHz / minHz);
      const x = Math.round(ratio * width) + 0.5;
      ctx.strokeStyle = 'rgba(113, 113, 122, 0.22)';
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, plotHeight);
      ctx.stroke();

      if (index > 0) {
        ctx.fillStyle = 'rgba(161, 161, 170, 0.75)';
        ctx.font = '600 9px ui-monospace, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(band.label.toUpperCase(), x + 4, height - 5);
      }
    });

    const barWidth = width / SPECTRUM_BARS;
    const span = SPECTRUM_CEIL_DB - SPECTRUM_FLOOR_DB;

    for (let i = 0; i < SPECTRUM_BARS; i += 1) {
      const ratio = i / (SPECTRUM_BARS - 1);
      const hz = minHz * Math.pow(maxHz / minHz, ratio);
      const bin = binForFrequency(hz);
      const raw = state.freqData[bin];

      // getFloatFrequencyData returns genuine dBFS and can legitimately
      // report -Infinity for a digitally silent bin, so guard before use.
      const db = isFinite(raw) ? clamp(raw, SPECTRUM_FLOOR_DB, SPECTRUM_CEIL_DB) : SPECTRUM_FLOOR_DB;
      const norm = (db - SPECTRUM_FLOOR_DB) / span;
      const barHeight = norm * plotHeight;

      const x = i * barWidth;
      const y = plotHeight - barHeight;
      ctx.fillStyle = colorForFrequency(hz);
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x, y, Math.max(1, barWidth - 1.5), barHeight);
    }
    ctx.globalAlpha = 1;
  }

  function drawIdleSpectrum() {
    const ctx = state.ctx2d;
    if (!ctx) return;
    ctx.clearRect(0, 0, state.cssWidth, state.cssHeight);
    ctx.fillStyle = 'rgba(113, 113, 122, 0.5)';
    ctx.font = '500 12px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Start the microphone to draw the spectrum', state.cssWidth / 2, state.cssHeight / 2);
  }

  /* ---------------------------------------------------------------- *
   * Render loop
   * ---------------------------------------------------------------- */

  function renderFrame() {
    if (!state.running || !state.analyser) return;

    state.analyser.getFloatTimeDomainData(state.timeData);
    state.analyser.getFloatFrequencyData(state.freqData);

    let sumSquares = 0;
    let peak = 0;
    let consecutive = 0;
    let clippedThisFrame = false;

    for (let i = 0; i < state.timeData.length; i += 1) {
      const sample = state.timeData[i];
      const abs = sample < 0 ? -sample : sample;
      sumSquares += sample * sample;
      if (abs > peak) peak = abs;

      if (abs >= CLIP_SAMPLE_LEVEL) {
        consecutive += 1;
        if (consecutive >= CLIP_CONSECUTIVE) clippedThisFrame = true;
      } else {
        consecutive = 0;
      }
    }

    const rms = Math.sqrt(sumSquares / state.timeData.length);
    state.rmsDb = toDb(rms);
    state.peakDb = toDb(peak);

    if (clippedThisFrame && performance.now() >= state.clipUntil) {
      state.clipEvents += 1;
    }
    if (clippedThisFrame) {
      state.clipUntil = performance.now() + CLIP_HOLD_MS;
    }

    renderMeters();
    updateRoomAnalysis();
    updateDiagnostics();
    drawSpectrum();

    state.frame = window.requestAnimationFrame(renderFrame);
  }

  function startRenderLoop() {
    stopRenderLoop();
    state.frame = window.requestAnimationFrame(renderFrame);
  }

  function stopRenderLoop() {
    if (state.frame !== null) {
      window.cancelAnimationFrame(state.frame);
      state.frame = null;
    }
    state.rmsDb = DB_FLOOR;
    state.peakDb = DB_FLOOR;
  }

  /* ---------------------------------------------------------------- *
   * Loopback playback
   * ---------------------------------------------------------------- */

  async function playLoopback() {
    if (!state.running || !state.capture || !state.context) return;

    const button = $('mic-playback');
    const status = $('playback-status');
    if (button) button.disabled = true;
    if (status) status.textContent = 'Чтение буфера…';

    let samples;
    try {
      samples = await state.capture.snapshot();
    } catch (error) {
      samples = new Float32Array(0);
    }

    if (!samples || !samples.length) {
      if (status) status.textContent = 'Пока ничего не записано — скажите несколько слов, затем попробуйте снова.';
      if (button) button.disabled = false;
      return;
    }

    const context = state.context;
    const buffer = context.createBuffer(1, samples.length, context.sampleRate);
    buffer.copyToChannel(samples, 0);

    // Order matters: stopPlayback() re-enables the transport button, so the
    // disable for this new playback has to be re-applied after it returns.
    stopPlayback();
    if (button) button.disabled = true;

    const node = context.createBufferSource();
    node.buffer = buffer;
    node.connect(context.destination);
    node.onended = () => {
      if (status) status.textContent = 'Воспроизведение завершено.';
      state.playbackNode = null;
      if (button) button.disabled = false;
    };
    state.playbackNode = node;
    state.lastRecordingSeconds = samples.length / context.sampleRate;

    node.start();
    if (status) {
      status.textContent = `Playing ${state.lastRecordingSeconds.toFixed(1)}s of what others hear…`;
    }
    announce('Воспроизведение последних нескольких секунд записанного звука.');
  }

  function stopPlayback() {
    if (state.playbackNode) {
      try {
        state.playbackNode.onended = null;
        state.playbackNode.stop();
        state.playbackNode.disconnect();
      } catch (error) {
        /* already stopped */
      }
      state.playbackNode = null;
    }
    const button = $('mic-playback');
    if (button && state.running) button.disabled = false;
  }

  function clearBuffer() {
    if (state.capture) state.capture.reset();
    stopPlayback();
    const status = $('playback-status');
    if (status) status.textContent = 'Буфер очищен.';
  }

  /* ---------------------------------------------------------------- *
   * Wiring
   * ---------------------------------------------------------------- */

  function wireToggles() {
    DSP_FLAGS.forEach((flag) => {
      const input = $(`dsp-${flag}`);
      if (!input) return;
      input.checked = Boolean(state.dsp[flag]);
      input.addEventListener('change', async () => {
        state.dsp[flag] = input.checked;
        // These are getUserMedia constraints, not graph nodes - changing
        // one requires tearing the stream down and reopening it.
        if (state.running) await startStream();
        else await renderHardware();
      });
    });
  }

  function wireEvents() {
    const startBtn = $('mic-start');
    if (startBtn) startBtn.addEventListener('click', () => startStream());

    const stopBtn = $('mic-stop');
    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        teardownStream();
        stopRenderLoop();
        stopPlayback();
        resetMetersUI();
        setTransportState(false);
        drawIdleSpectrum();
        announce('Микрофон остановлен. Весь записанный звук удалён.');
        const status = $('playback-status');
        if (status) status.textContent = 'Микрофон остановлен.';
      });
    }

    const deviceSelect = $('mic-device');
    if (deviceSelect) {
      deviceSelect.addEventListener('change', async () => {
        state.deviceId = deviceSelect.value;
        if (state.running) await startStream();
      });
    }

    const playbackBtn = $('mic-playback');
    if (playbackBtn) playbackBtn.addEventListener('click', playLoopback);

    const clearBtn = $('mic-clear');
    if (clearBtn) clearBtn.addEventListener('click', clearBuffer);

    const noiseBtn = $('noise-capture');
    if (noiseBtn) noiseBtn.addEventListener('click', measureNoiseFloor);

    const noiseReset = $('noise-reset');
    if (noiseReset) {
      noiseReset.hidden = true;
      noiseReset.addEventListener('click', resetNoiseFloor);
    }

    if (navigator.mediaDevices && 'ondevicechange' in navigator.mediaDevices) {
      navigator.mediaDevices.addEventListener('devicechange', async () => {
        await populateDevices();
        await renderHardware();
      });
    }

    // Release the hardware when the tab is discarded or navigated away,
    // so the browser's recording indicator does not stay lit.
    window.addEventListener('pagehide', () => {
      teardownStream();
      stopPlayback();
    });
  }

  function init() {
    if (insecureContext()) {
      showUnsupported('Microphone access requires a secure connection. Open this page over HTTPS (or on localhost) to run the test.');
      setupCanvas();
      drawIdleSpectrum();
      return;
    }

    setupCanvas();
    drawIdleSpectrum();
    wireToggles();
    wireEvents();
    renderDspToggles();
    setTransportState(false);
    renderSnr();
    populateDevices();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
