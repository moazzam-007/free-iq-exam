/**
 * Procedural Brown Noise, Sleep Soundscape & Binaural Beats Engine
 * 100% Procedural Web Audio API Synthesis:
 * - 4 Noise Colors: Brown (1/f² Brownian), Pink (1/f Voss-McCartney), White (f⁰), Green (500Hz Nature)
 * - Binaural Brainwave Entrainment: Delta (0.5-4Hz), Theta (4-8Hz), Alpha (8-13Hz), Beta (13-30Hz)
 * - 4 Ambient Soundscape Generators: Procedural Rain, Distant Thunder, Ocean Waves, Sleep Fan
 * - Smooth exponential sleep timer fade-out (30s ramp down)
 * - 60FPS Reactive Particle Waveform Visualizer
 */

(function () {
  'use strict';

  /* =========================================================
     1. PROCEDURAL SOUND SYNTHESIS ENGINE
     ========================================================= */
  class SoundscapeEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.masterVolume = 0.8;

      // Noise Color State
      this.activeColor = 'brown'; // 'brown', 'pink', 'white', 'green'
      this.noiseVolume = 0.75;
      this.noiseSource = null;
      this.noiseGain = null;
      this.noiseFilter = null;

      // Binaural Beat State
      this.binauralEnabled = true;
      this.binauralVolume = 0.35;
      this.binauralType = 'delta'; // 'delta', 'theta', 'alpha', 'beta'
      this.binauralBeatFreq = 2.0;
      this.binauralBaseFreq = 100;
      this.oscLeft = null;
      this.oscRight = null;
      this.binauralGain = null;

      // Ambient Layers State
      this.rainVolume = 0.0;
      this.thunderVolume = 0.0;
      this.oceanVolume = 0.0;
      this.fanVolume = 0.0;

      this.rainNodes = null;
      this.thunderNodes = null;
      this.oceanNodes = null;
      this.fanNodes = null;

      // Master Gain & Analyser
      this.masterGain = null;
      this.analyser = null;
      this.freqData = null;

      // Sleep Timer
      this.timerMinutes = 0;
      this.timerRemainingSeconds = 0;
      this.timerInterval = null;
      this.isFadingOut = false;

      // Precomputed Audio Buffers (5 seconds seamless loop)
      this.buffers = {
        white: null,
        pink: null,
        brown: null,
        green: null,
        rain: null,
        ocean: null,
        fan: null
      };

      // Periodic Thunder Interval
      this.thunderTimeout = null;
    }

    initAudioContext() {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        return;
      }

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master Gain Stage
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);

      // Master Analyser Node for Visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.85;
      this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Generate procedural audio buffers
      this.generateAllBuffers();
    }

    /* ---------------------------------------------------------
       Procedural Buffer Generators (Mathematical Algorithms)
       --------------------------------------------------------- */
    generateAllBuffers() {
      const sampleRate = this.ctx.sampleRate;
      const length = sampleRate * 5; // 5-second seamless loop buffer

      // 1. Uniform White Noise Buffer
      const whiteBuffer = this.ctx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const out = whiteBuffer.getChannelData(ch);
        for (let i = 0; i < length; i++) {
          out[i] = Math.random() * 2 - 1;
        }
      }
      this.buffers.white = whiteBuffer;

      // 2. Pink Noise Buffer (Voss-McCartney Cascading IIR Filter: -3dB/octave)
      const pinkBuffer = this.ctx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const out = pinkBuffer.getChannelData(ch);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          b6 = white * 0.115926;
          out[i] = pink * 0.11; // Scaled to prevent clipping
        }
      }
      this.buffers.pink = pinkBuffer;

      // 3. Brown / Brownian Noise Buffer (Leaky Integrator: -6dB/octave)
      const brownBuffer = this.ctx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const out = brownBuffer.getChannelData(ch);
        let lastOut = 0.0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          lastOut = (lastOut + (0.02 * white)) / 1.02;
          out[i] = lastOut * 3.5; // Gain staging for deep warm rumble
        }
      }
      this.buffers.brown = brownBuffer;

      // 4. Green Noise Buffer (Nature mid-band 500Hz profile)
      const greenBuffer = this.ctx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const out = greenBuffer.getChannelData(ch);
        let lastOut = 0.0;
        for (let i = 0; i < length; i++) {
          const white = Math.random() * 2 - 1;
          lastOut = (lastOut + (0.04 * white)) / 1.04;
          out[i] = lastOut * 2.8;
        }
      }
      this.buffers.green = greenBuffer;
    }

    /* ---------------------------------------------------------
       Sound Engine Playback Controller
       --------------------------------------------------------- */
    start() {
      this.initAudioContext();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterVolume, now);
      this.isFadingOut = false;

      // Start Base Noise Color
      this.startBaseNoise();

      // Start Binaural Carrier
      this.startBinauralBeats();

      // Start Ambient Soundscapes
      this.startRain();
      this.startOcean();
      this.startFan();
      this.scheduleThunder();

      this.isPlaying = true;
    }

    stop() {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Cleanly stop all active nodes
      this.stopBaseNoise();
      this.stopBinauralBeats();
      this.stopRain();
      this.stopOcean();
      this.stopFan();
      if (this.thunderTimeout) {
        clearTimeout(this.thunderTimeout);
        this.thunderTimeout = null;
      }

      this.isPlaying = false;
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
      return this.isPlaying;
    }

    /* ---------------------------------------------------------
       1. Base Noise Color Node
       --------------------------------------------------------- */
    startBaseNoise() {
      this.stopBaseNoise();
      if (!this.buffers[this.activeColor]) return;

      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers[this.activeColor];
      src.loop = true;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.noiseVolume, this.ctx.currentTime);

      // For Green noise, add a 500Hz bandpass filter
      if (this.activeColor === 'green') {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(500, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.9, this.ctx.currentTime);

        src.connect(filter);
        filter.connect(gain);
        this.noiseFilter = filter;
      } else {
        src.connect(gain);
      }

      gain.connect(this.masterGain);
      src.start(0);

      this.noiseSource = src;
      this.noiseGain = gain;
    }

    stopBaseNoise() {
      if (this.noiseSource) {
        try {
          this.noiseSource.stop();
          this.noiseSource.disconnect();
        } catch (e) {}
        this.noiseSource = null;
      }
      if (this.noiseGain) {
        this.noiseGain.disconnect();
        this.noiseGain = null;
      }
      this.noiseFilter = null;
    }

    setNoiseColor(color) {
      this.activeColor = color;
      if (this.isPlaying) {
        this.startBaseNoise();
      }
    }

    setNoiseVolume(val) {
      this.noiseVolume = Math.max(0, Math.min(1, val));
      if (this.noiseGain && this.ctx) {
        this.noiseGain.gain.setTargetAtTime(this.noiseVolume, this.ctx.currentTime, 0.05);
      }
    }

    /* ---------------------------------------------------------
       2. Binaural Beats Stereo Generator
       --------------------------------------------------------- */
    startBinauralBeats() {
      this.stopBinauralBeats();
      if (!this.binauralEnabled || this.binauralVolume <= 0) return;

      const now = this.ctx.currentTime;
      const leftFreq = this.binauralBaseFreq;
      const rightFreq = this.binauralBaseFreq + this.binauralBeatFreq;

      // Left Channel Oscillator
      const oscL = this.ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(leftFreq, now);

      const pannerL = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (pannerL) pannerL.pan.setValueAtTime(-1.0, now);

      // Right Channel Oscillator
      const oscR = this.ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(rightFreq, now);

      const pannerR = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (pannerR) pannerR.pan.setValueAtTime(1.0, now);

      // Binaural Master Gain
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.binauralVolume * 0.4, now);

      if (pannerL && pannerR) {
        oscL.connect(pannerL);
        pannerL.connect(gain);
        oscR.connect(pannerR);
        pannerR.connect(gain);
      } else {
        // Fallback channel merger if StereoPanner unsupported
        const merger = this.ctx.createChannelMerger(2);
        oscL.connect(merger, 0, 0);
        oscR.connect(merger, 0, 1);
        merger.connect(gain);
      }

      gain.connect(this.masterGain);

      oscL.start(now);
      oscR.start(now);

      this.oscLeft = oscL;
      this.oscRight = oscR;
      this.binauralGain = gain;
    }

    stopBinauralBeats() {
      if (this.oscLeft) {
        try {
          this.oscLeft.stop();
          this.oscLeft.disconnect();
        } catch (e) {}
        this.oscLeft = null;
      }
      if (this.oscRight) {
        try {
          this.oscRight.stop();
          this.oscRight.disconnect();
        } catch (e) {}
        this.oscRight = null;
      }
      if (this.binauralGain) {
        this.binauralGain.disconnect();
        this.binauralGain = null;
      }
    }

    setBinauralPreset(type) {
      this.binauralType = type;
      switch (type) {
        case 'delta':
          this.binauralBaseFreq = 100;
          this.binauralBeatFreq = 2.0; // Deep sleep (2 Hz)
          break;
        case 'theta':
          this.binauralBaseFreq = 140;
          this.binauralBeatFreq = 6.0; // Deep meditation (6 Hz)
          break;
        case 'alpha':
          this.binauralBaseFreq = 200;
          this.binauralBeatFreq = 10.0; // Calm focus (10 Hz)
          break;
        case 'beta':
          this.binauralBaseFreq = 250;
          this.binauralBeatFreq = 16.0; // Active study (16 Hz)
          break;
      }

      if (this.isPlaying) {
        this.startBinauralBeats();
      }
    }

    setBinauralVolume(val) {
      this.binauralVolume = Math.max(0, Math.min(1, val));
      if (this.binauralGain && this.ctx) {
        this.binauralGain.gain.setTargetAtTime(this.binauralVolume * 0.4, this.ctx.currentTime, 0.05);
      } else if (this.isPlaying && this.binauralVolume > 0 && !this.oscLeft) {
        this.startBinauralBeats();
      }
    }

    /* ---------------------------------------------------------
       3. Ambient Soundscape: Procedural Rain
       --------------------------------------------------------- */
    startRain() {
      this.stopRain();
      if (this.rainVolume <= 0) return;

      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers.pink;
      src.loop = true;

      // Highpass to remove low rumble + Lowpass for soft droplet texture
      const highpass = this.ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(800, this.ctx.currentTime);

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(6500, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.rainVolume * 0.6, this.ctx.currentTime);

      src.connect(highpass);
      highpass.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(this.masterGain);

      src.start(0);
      this.rainNodes = { src, gain };
    }

    stopRain() {
      if (this.rainNodes) {
        try {
          this.rainNodes.src.stop();
          this.rainNodes.src.disconnect();
        } catch (e) {}
        this.rainNodes = null;
      }
    }

    setRainVolume(val) {
      this.rainVolume = Math.max(0, Math.min(1, val));
      if (this.rainNodes && this.ctx) {
        this.rainNodes.gain.gain.setTargetAtTime(this.rainVolume * 0.6, this.ctx.currentTime, 0.05);
      } else if (this.isPlaying && this.rainVolume > 0 && !this.rainNodes) {
        this.startRain();
      }
    }

    /* ---------------------------------------------------------
       4. Ambient Soundscape: Distant Thunder
       --------------------------------------------------------- */
    scheduleThunder() {
      if (this.thunderTimeout) {
        clearTimeout(this.thunderTimeout);
        this.thunderTimeout = null;
      }
      if (!this.isPlaying || this.thunderVolume <= 0) return;

      // Trigger thunder every 12 to 28 seconds
      const nextDelay = 12000 + Math.random() * 16000;
      this.thunderTimeout = setTimeout(() => {
        if (this.isPlaying && this.thunderVolume > 0) {
          this.playThunderClap();
          this.scheduleThunder();
        }
      }, nextDelay);
    }

    playThunderClap() {
      if (!this.ctx || this.thunderVolume <= 0) return;

      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers.brown;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.exponentialRampToValueAtTime(70, now + 4.5);

      const gain = this.ctx.createGain();
      const peakVol = this.thunderVolume * (0.4 + Math.random() * 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(peakVol, now + 0.6 + Math.random() * 0.4);
      gain.gain.exponentialRampToValueAtTime(peakVol * 0.6, now + 2.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      src.start(now);
      src.stop(now + 6.0);
    }

    setThunderVolume(val) {
      this.thunderVolume = Math.max(0, Math.min(1, val));
      if (this.isPlaying && this.thunderVolume > 0 && !this.thunderTimeout) {
        this.scheduleThunder();
      }
    }

    /* ---------------------------------------------------------
       5. Ambient Soundscape: Ocean Waves (LFO Modulated)
       --------------------------------------------------------- */
    startOcean() {
      this.stopOcean();
      if (this.oceanVolume <= 0) return;

      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers.pink;
      src.loop = true;

      // Dynamic lowpass filter swept by LFO
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      // Low Frequency Oscillator (0.12 Hz = ~8 second wave cycle)
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, now);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(320, now); // Modulate filter between 130Hz and 770Hz

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.oceanVolume * 0.7, now);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      lfo.start(now);
      src.start(now);

      this.oceanNodes = { src, lfo, lfoGain, gain };
    }

    stopOcean() {
      if (this.oceanNodes) {
        try {
          this.oceanNodes.src.stop();
          this.oceanNodes.lfo.stop();
          this.oceanNodes.src.disconnect();
          this.oceanNodes.lfo.disconnect();
          this.oceanNodes.lfoGain.disconnect();
        } catch (e) {}
        this.oceanNodes = null;
      }
    }

    setOceanVolume(val) {
      this.oceanVolume = Math.max(0, Math.min(1, val));
      if (this.oceanNodes && this.ctx) {
        this.oceanNodes.gain.gain.setTargetAtTime(this.oceanVolume * 0.7, this.ctx.currentTime, 0.05);
      } else if (this.isPlaying && this.oceanVolume > 0 && !this.oceanNodes) {
        this.startOcean();
      }
    }

    /* ---------------------------------------------------------
       6. Ambient Soundscape: Mechanical Sleep Fan
       --------------------------------------------------------- */
    startFan() {
      this.stopFan();
      if (this.fanVolume <= 0) return;

      const now = this.ctx.currentTime;
      const src = this.ctx.createBufferSource();
      src.buffer = this.buffers.pink;
      src.loop = true;

      // Resonant Lowpass & 120Hz motor hum
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, now);
      filter.Q.setValueAtTime(1.4, now);

      const hum = this.ctx.createOscillator();
      hum.type = 'sine';
      hum.frequency.setValueAtTime(120, now); // 120Hz motor harmonic

      const humGain = this.ctx.createGain();
      humGain.gain.setValueAtTime(0.08, now);
      hum.connect(humGain);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.fanVolume * 0.8, now);

      src.connect(filter);
      filter.connect(gain);
      humGain.connect(gain);
      gain.connect(this.masterGain);

      src.start(now);
      hum.start(now);

      this.fanNodes = { src, hum, gain };
    }

    stopFan() {
      if (this.fanNodes) {
        try {
          this.fanNodes.src.stop();
          this.fanNodes.hum.stop();
          this.fanNodes.src.disconnect();
          this.fanNodes.hum.disconnect();
        } catch (e) {}
        this.fanNodes = null;
      }
    }

    setFanVolume(val) {
      this.fanVolume = Math.max(0, Math.min(1, val));
      if (this.fanNodes && this.ctx) {
        this.fanNodes.gain.gain.setTargetAtTime(this.fanVolume * 0.8, this.ctx.currentTime, 0.05);
      } else if (this.isPlaying && this.fanVolume > 0 && !this.fanNodes) {
        this.startFan();
      }
    }

    /* ---------------------------------------------------------
       Master Controls & Presets
       --------------------------------------------------------- */
    setMasterVolume(val) {
      this.masterVolume = Math.max(0, Math.min(1, val));
      if (this.masterGain && this.ctx && !this.isFadingOut) {
        this.masterGain.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.05);
      }
    }

    applyPreset(presetName) {
      switch (presetName) {
        case 'deep-sleep':
          this.setNoiseColor('brown');
          this.setNoiseVolume(0.85);
          this.setBinauralPreset('delta');
          this.setBinauralVolume(0.35);
          this.setRainVolume(0.0);
          this.setThunderVolume(0.0);
          this.setOceanVolume(0.0);
          this.setFanVolume(0.25);
          break;
        case 'adhd-focus':
          this.setNoiseColor('brown');
          this.setNoiseVolume(0.90);
          this.setBinauralPreset('alpha');
          this.setBinauralVolume(0.40);
          this.setRainVolume(0.20);
          this.setThunderVolume(0.0);
          this.setOceanVolume(0.0);
          this.setFanVolume(0.0);
          break;
        case 'tinnitus-relief':
          this.setNoiseColor('pink');
          this.setNoiseVolume(0.85);
          this.setBinauralVolume(0.0);
          this.setRainVolume(0.0);
          this.setThunderVolume(0.0);
          this.setOceanVolume(0.45);
          this.setFanVolume(0.0);
          break;
        case 'cozy-storm':
          this.setNoiseColor('brown');
          this.setNoiseVolume(0.60);
          this.setBinauralVolume(0.0);
          this.setRainVolume(0.75);
          this.setThunderVolume(0.55);
          this.setOceanVolume(0.0);
          this.setFanVolume(0.0);
          break;
        case 'meditation':
          this.setNoiseColor('green');
          this.setNoiseVolume(0.70);
          this.setBinauralPreset('theta');
          this.setBinauralVolume(0.40);
          this.setRainVolume(0.0);
          this.setThunderVolume(0.0);
          this.setOceanVolume(0.35);
          this.setFanVolume(0.0);
          break;
      }
    }

    /* ---------------------------------------------------------
       Sleep Timer with 30-Second Exponential Fade-Out
       --------------------------------------------------------- */
    setSleepTimer(minutes, onTick, onComplete) {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }

      this.timerMinutes = minutes;
      if (minutes <= 0) {
        this.timerRemainingSeconds = 0;
        if (onTick) onTick(0);
        return;
      }

      this.timerRemainingSeconds = minutes * 60;
      if (onTick) onTick(this.timerRemainingSeconds);

      this.timerInterval = setInterval(() => {
        this.timerRemainingSeconds--;

        if (onTick) onTick(this.timerRemainingSeconds);

        // Initiate 30-second smooth exponential fade-out before completion
        if (this.timerRemainingSeconds <= 30 && !this.isFadingOut && this.ctx && this.masterGain) {
          this.isFadingOut = true;
          const now = this.ctx.currentTime;
          this.masterGain.gain.setValueAtTime(this.masterVolume, now);
          this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(1, this.timerRemainingSeconds));
        }

        if (this.timerRemainingSeconds <= 0) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
          this.stop();
          if (onComplete) onComplete();
        }
      }, 1000);
    }
  }

  /* =========================================================
     2. 60 FPS AUDIO WAVEFORM / PARTICLE VISUALIZER
     ========================================================= */
  class SoundVisualizer {
    constructor(canvas, engine) {
      this.canvas = canvas;
      this.engine = engine;
      this.ctx = canvas.getContext('2d');
      this.animId = null;
      this.dpr = window.devicePixelRatio || 1;
      this.particles = [];

      this.setupCanvas();
      this.initParticles();
    }

    setupCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const cssW = Math.floor(rect.width) || 720;
      const cssH = 220;

      this.dpr = window.devicePixelRatio || 1;
      this.width = cssW;
      this.height = cssH;
      this.canvas.width = cssW * this.dpr;
      this.canvas.height = cssH * this.dpr;
      this.canvas.style.height = cssH + 'px';

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    initParticles() {
      this.particles = [];
      const count = 48;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: 1.5 + Math.random() * 2.5,
          alpha: 0.2 + Math.random() * 0.6
        });
      }
    }

    getColorHex() {
      switch (this.engine.activeColor) {
        case 'brown': return '#f59e0b'; // Warm Amber
        case 'pink': return '#ec4899'; // Gentle Rose Pink
        case 'white': return '#38bdf8'; // Sky Cyan
        case 'green': return '#10b981'; // Forest Emerald
        default: return '#f59e0b';
      }
    }

    start() {
      if (this.animId) cancelAnimationFrame(this.animId);
      const loop = () => {
        this.render();
        this.animId = requestAnimationFrame(loop);
      };
      loop();
    }

    render() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const color = this.getColorHex();

      ctx.clearRect(0, 0, w, h);

      // Background subtle gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, 'rgba(10, 10, 15, 0.95)');
      bgGrad.addColorStop(1, 'rgba(15, 15, 22, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      if (!this.engine.isPlaying || !this.engine.analyser) {
        // Idle ambient gentle wave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const time = performance.now() * 0.0015;
        for (let x = 0; x < w; x += 4) {
          const y = h / 2 + Math.sin(x * 0.015 + time) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      this.engine.analyser.getByteFrequencyData(this.engine.freqData);
      const data = this.engine.freqData;
      const bins = Math.min(data.length, 64);

      // 1. Draw Waveform Ribbon
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;

      const sliceW = w / (bins - 1);
      for (let i = 0; i < bins; i++) {
        const v = data[i] / 255.0;
        const amp = v * (h * 0.42);
        const x = i * sliceW;
        const y = h / 2 + (i % 2 === 0 ? amp : -amp);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 2. Draw Floating Organic Audio Particles
      this.particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    }
  }

  /* =========================================================
     3. UI CONTROLLER & DOM BINDINGS
     ========================================================= */
  const SoundApp = {
    engine: null,
    visualizer: null,

    init() {
      this.engine = new SoundscapeEngine();

      const canvas = document.getElementById('visualizerCanvas');
      if (canvas) {
        this.visualizer = new SoundVisualizer(canvas, this.engine);
        this.visualizer.start();
      }

      this.bindDOM();
      this.syncUI();
    },

    bindDOM() {
      // Master Play/Pause Buttons
      const masterPlayBtn = document.getElementById('masterPlayBtn');
      const floatingPlayBtn = document.getElementById('floatingPlayBtn');

      const handleToggle = () => {
        const playing = this.engine.toggle();
        this.updatePlayState(playing);
      };

      if (masterPlayBtn) masterPlayBtn.addEventListener('click', handleToggle);
      if (floatingPlayBtn) floatingPlayBtn.addEventListener('click', handleToggle);

      // Master Volume Slider
      const masterVol = document.getElementById('masterVolumeSlider');
      if (masterVol) {
        masterVol.addEventListener('input', (e) => {
          this.engine.setMasterVolume(parseFloat(e.target.value));
        });
      }

      // Noise Color Selector Buttons
      document.querySelectorAll('.noise-color-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const color = btn.dataset.color;
          document.querySelectorAll('.noise-color-btn').forEach((b) => b.classList.remove('active', 'border-blue-600', 'bg-blue-600/10', 'text-blue-600', 'dark:border-blue-400', 'dark:text-blue-400', 'border-amber-500', 'bg-amber-500/10', 'text-amber-400'));
          btn.classList.add('active', 'border-blue-600', 'bg-blue-600/10', 'text-blue-600', 'dark:border-blue-400', 'dark:text-blue-400');
          this.engine.setNoiseColor(color);
        });
      });

      // Preset Selector Buttons
      document.querySelectorAll('.preset-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('active', 'bg-zinc-800', 'text-white'));
          btn.classList.add('active', 'bg-zinc-800', 'text-white');
          this.engine.applyPreset(btn.dataset.preset);
          this.syncUI();
        });
      });

      // Binaural Beat Frequency Preset Selector
      document.querySelectorAll('.binaural-wave-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.binaural-wave-btn').forEach((b) => b.classList.remove('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40', 'bg-indigo-500/20', 'text-indigo-400', 'border-indigo-500/40'));
          btn.classList.add('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40');
          this.engine.setBinauralPreset(btn.dataset.wave);
        });
      });

      // Multi-Track Sliders
      const noiseVol = document.getElementById('noiseVolSlider');
      if (noiseVol) {
        noiseVol.addEventListener('input', (e) => this.engine.setNoiseVolume(parseFloat(e.target.value)));
      }

      const binauralVol = document.getElementById('binauralVolSlider');
      if (binauralVol) {
        binauralVol.addEventListener('input', (e) => this.engine.setBinauralVolume(parseFloat(e.target.value)));
      }

      const rainVol = document.getElementById('rainVolSlider');
      if (rainVol) {
        rainVol.addEventListener('input', (e) => this.engine.setRainVolume(parseFloat(e.target.value)));
      }

      const thunderVol = document.getElementById('thunderVolSlider');
      if (thunderVol) {
        thunderVol.addEventListener('input', (e) => this.engine.setThunderVolume(parseFloat(e.target.value)));
      }

      const oceanVol = document.getElementById('oceanVolSlider');
      if (oceanVol) {
        oceanVol.addEventListener('input', (e) => this.engine.setOceanVolume(parseFloat(e.target.value)));
      }

      const fanVol = document.getElementById('fanVolSlider');
      if (fanVol) {
        fanVol.addEventListener('input', (e) => this.engine.setFanVolume(parseFloat(e.target.value)));
      }

      // Sleep Timer Buttons
      document.querySelectorAll('.timer-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.timer-btn').forEach((b) => b.classList.remove('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40', 'bg-amber-500/10', 'text-amber-400', 'border-amber-500/40'));
          btn.classList.add('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40');

          const mins = parseInt(btn.dataset.mins, 10);
          const countdownEl = document.getElementById('timerCountdownDisplay');

          this.engine.setSleepTimer(
            mins,
            (remaining) => {
              if (countdownEl) {
                if (remaining > 0) {
                  const m = Math.floor(remaining / 60);
                  const s = remaining % 60;
                  countdownEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                  countdownEl.classList.remove('hidden');
                } else {
                  countdownEl.classList.add('hidden');
                }
              }
            },
            () => {
              this.updatePlayState(false);
              if (countdownEl) countdownEl.classList.add('hidden');
            }
          );
        });
      });

      // Window resize handling for canvas
      window.addEventListener('resize', () => {
        if (this.visualizer) {
          this.visualizer.setupCanvas();
          this.visualizer.initParticles();
        }
      });
    },

    updatePlayState(playing) {
      const masterIcon = document.getElementById('masterPlayIcon');
      const masterText = document.getElementById('masterPlayText');
      const floatIcon = document.getElementById('floatingPlayIcon');
      const floatWrap = document.getElementById('floatingBar');

      if (masterIcon) {
        masterIcon.innerHTML = playing
          ? '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />'
          : '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />';
      }
      if (masterText) {
        masterText.textContent = playing ? 'Jeda Suara' : 'Mulai Suara';
      }
      if (floatIcon) {
        floatIcon.innerHTML = playing
          ? '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />'
          : '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />';
      }
      if (floatWrap) {
        if (playing) floatWrap.classList.remove('translate-y-24', 'opacity-0');
        else floatWrap.classList.add('translate-y-24', 'opacity-0');
      }
    },

    syncUI() {
      // Sync sliders with engine values
      const noiseVol = document.getElementById('noiseVolSlider');
      if (noiseVol) noiseVol.value = this.engine.noiseVolume;

      const binauralVol = document.getElementById('binauralVolSlider');
      if (binauralVol) binauralVol.value = this.engine.binauralVolume;

      const rainVol = document.getElementById('rainVolSlider');
      if (rainVol) rainVol.value = this.engine.rainVolume;

      const thunderVol = document.getElementById('thunderVolSlider');
      if (thunderVol) thunderVol.value = this.engine.thunderVolume;

      const oceanVol = document.getElementById('oceanVolSlider');
      if (oceanVol) oceanVol.value = this.engine.oceanVolume;

      const fanVol = document.getElementById('fanVolSlider');
      if (fanVol) fanVol.value = this.engine.fanVolume;

      // Sync active color button
      document.querySelectorAll('.noise-color-btn').forEach((b) => {
        if (b.dataset.color === this.engine.activeColor) {
          b.classList.add('active', 'border-blue-600', 'bg-blue-600/10', 'text-blue-600', 'dark:border-blue-400', 'dark:text-blue-400');
        } else {
          b.classList.remove('active', 'border-blue-600', 'bg-blue-600/10', 'text-blue-600', 'dark:border-blue-400', 'dark:text-blue-400', 'border-amber-500', 'bg-amber-500/10', 'text-amber-400');
        }
      });

      // Sync binaural button
      document.querySelectorAll('.binaural-wave-btn').forEach((b) => {
        if (b.dataset.wave === this.engine.binauralType) {
          b.classList.add('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40');
        } else {
          b.classList.remove('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40', 'bg-indigo-500/20', 'text-indigo-400', 'border-indigo-500/40');
        }
      });
    }
  };

  // Safe DOM Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SoundApp.init());
  } else {
    SoundApp.init();
  }
})();
