/**
 * Hearing & Biological Ear Age Engine
 * Clinical Web Audio API synthesis engine with:
 * - High-Frequency Ear Age Sweep (8,000 Hz – 20,000 Hz)
 * - Pure-Tone Audiometry Screening (250 Hz – 8,000 Hz)
 * - Independent Left/Right Ear Stereo Panning
 * - Anti-popping exponential gain envelopes
 * - Canvas Audiogram renderer with severity bands
 * - Shareable Biological Ear Age Certificate generator
 */

(function () {
  'use strict';

  // DEF-59: Localized share URL resolver. Prefers the page canonical URL
  // (inherently locale-prefixed), falling back to the localized slug.
  function resolveShareUrl(fallback) {
    try {
      var canon = document.querySelector('link[rel="canonical"]');
      if (canon && canon.href) return canon.href;
      if (window.location && window.location.origin && window.location.pathname) {
        return window.location.origin + window.location.pathname;
      }
    } catch (e) {}
    return fallback;
  }

  /* =========================================================
     AUDIO ENGINE - Pure Web Audio API Synthesis
     ========================================================= */
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.currentOsc = null;
      this.currentGain = null;
      this.currentPanner = null;
      this.calibrationMultiplier = 1.0;
      this.isCalibrated = false;
    }

    async init() {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') {
          await this.ctx.resume();
        }
        return;
      }
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('Web Audio API is not supported in this browser.');
      }
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 1.0;
      this.masterGain.connect(this.ctx.destination);
    }

    // Convert dB HL to linear amplitude gain
    // 0 dB HL ≈ ~0.001 (threshold of audibility for young healthy ears)
    // 40 dB HL ≈ ~0.1 (comfortable conversational intensity)
    // 70 dB HL ≈ ~1.0 (loud speech)
    // Capped at 3.0 to protect ears and transducers
    dbToGain(dbHL) {
      const rawGain = Math.pow(10, (dbHL - 70) / 20);
      const clampedGain = Math.max(0.00001, Math.min(rawGain, 3.0));
      // Re-apply the ceiling after calibration so a calibration boost can never
      // push output past the ear/transducer protection limit documented above.
      return Math.max(0.00001, Math.min(clampedGain * this.calibrationMultiplier, 3.0));
    }

    // Synthesizes a pure sine tone with smooth attack and release envelopes
    async playTone(frequency, dbHL, ear = 'both', duration = null) {
      await this.init();
      this.stopTone();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner();

      osc.type = 'sine';
      osc.frequency.value = frequency;

      // Channel routing via StereoPannerNode
      if (ear === 'left') {
        panner.pan.value = -1;
      } else if (ear === 'right') {
        panner.pan.value = 1;
      } else {
        panner.pan.value = 0;
      }

      const targetGain = this.dbToGain(dbHL);
      const now = this.ctx.currentTime;
      const attackTime = 0.04; // 40ms attack prevents speaker click/pop
      const releaseTime = 0.08; // 80ms gentle release

      gain.gain.setValueAtTime(0.00001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.00001, targetGain), now + attackTime);

      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);

      osc.start(now);

      this.currentOsc = osc;
      this.currentGain = gain;
      this.currentPanner = panner;

      if (duration !== null) {
        const stopTime = now + attackTime + duration;
        gain.gain.setValueAtTime(Math.max(0.00001, targetGain), stopTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, stopTime + releaseTime);
        osc.stop(stopTime + releaseTime + 0.02);

        return new Promise((resolve) => {
          osc.onended = () => {
            this._cleanup();
            resolve();
          };
        });
      }

      return null;
    }

    stopTone() {
      if (this.currentOsc && this.currentGain && this.ctx) {
        const now = this.ctx.currentTime;
        try {
          this.currentGain.gain.cancelScheduledValues(now);
          this.currentGain.gain.setValueAtTime(Math.max(0.00001, this.currentGain.gain.value), now);
          this.currentGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.04);
          this.currentOsc.stop(now + 0.05);
        } catch (e) {
          try {
            this.currentOsc.stop();
          } catch (err) {}
        }
        this._cleanup();
      }
    }

    _cleanup() {
      this.currentOsc = null;
      this.currentGain = null;
      this.currentPanner = null;
    }

    setCalibration(dbHL) {
      const val = typeof dbHL === 'number' ? dbHL : parseFloat(dbHL) || 0;
      // The slider is a 20-80 dB HL reference level (default 40), and dbToGain()
      // already maps dB HL onto absolute linear gain against a 70 dB HL full-scale
      // reference. Calibration is therefore applied as a *bounded relative offset*
      // from the 40 dB HL neutral midpoint, not as a second absolute conversion:
      // a literal 10^(dbHL/20) would reach 100x at 40 dB HL and flatten the whole
      // audiogram against the 3.0 protection ceiling. +/-6 dB keeps the relative
      // audiogram curve intact while still compensating for a quiet or loud system.
      const offsetDb = Math.max(-6, Math.min(6, val - 40));
      this.calibrationMultiplier = Math.pow(10, offsetDb / 20);
      this.isCalibrated = true;
    }
  }

  /* =========================================================
     EAR AGE TEST - High-Frequency Sweep (8kHz → 20kHz)
     ========================================================= */
  class EarAgeTest {
    constructor(audio) {
      this.audio = audio;
      this.steps = [8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000];
      this.stepIndex = 0;
      this.currentFreq = this.steps[0];
      this.lastHeardFreq = 0;
      this.testDbHL = 65; // Moderate volume compensation for high-frequency attenuation
      this.completed = false;
    }

    start() {
      this.stepIndex = 0;
      this.currentFreq = this.steps[0];
      this.lastHeardFreq = 0;
      this.completed = false;
      this.playCurrent();
    }

    playCurrent() {
      this.audio.playTone(this.currentFreq, this.testDbHL, 'both', 1.4);
    }

    respondHeard() {
      this.lastHeardFreq = this.currentFreq;
      this.stepIndex++;
      if (this.stepIndex >= this.steps.length) {
        this.completed = true;
        return { done: true, freq: this.lastHeardFreq };
      }
      this.currentFreq = this.steps[this.stepIndex];
      this.playCurrent();
      return { done: false, freq: this.currentFreq, progress: this.stepIndex / this.steps.length };
    }

    respondNotHeard() {
      this.completed = true;
      return { done: true, freq: this.lastHeardFreq };
    }

    // Presbycusis stereocilia hair cell degradation mapping
    freqToEarAge(freq) {
      if (freq >= 19000) {
        return {
          age: '< 18',
          numericAge: 16,
          range: 'Under 18',
          rating: 'Exceptional',
          score: 100,
          desc: 'Pendengaran frekuensi tinggi Anda luar biasa, setara dengan seorang remaja. Anda dapat mendeteksi nada dering mosquito 17.4 kHz dengan mudah. Sel rambut koklea basal Anda dalam kondisi sempurna.'
        };
      }
      if (freq >= 18000) {
        return {
          age: '19–24',
          numericAge: 21,
          range: '19–24 years',
          rating: 'Superior',
          score: 95,
          desc: 'Pendengaran frekuensi tinggi unggul. Anda berada di tingkat teratas untuk orang dewasa, dengan keausan stereosilia minimal di sepanjang putaran basal koklea.'
        };
      }
      if (freq >= 17000) {
        return {
          age: '25–29',
          numericAge: 27,
          range: '25–29 years',
          rating: 'Very Good',
          score: 88,
          desc: 'Rentang frekuensi tinggi sangat baik. Anda berada tepat di batas di mana frekuensi 17.4 kHz memudar untuk populasi dewasa umum.'
        };
      }
      if (freq >= 16000) {
        return {
          age: '30–34',
          numericAge: 32,
          range: '30–34 years',
          rating: 'Good',
          score: 80,
          desc: 'Respons pendengaran standar dan sehat. Presbikusis sub-klinis awal mulai terjadi, yang merupakan ciri biologis normal pada awal masa dewasa.'
        };
      }
      if (freq >= 15000) {
        return {
          age: '35–39',
          numericAge: 37,
          range: '35–39 years',
          rating: 'Di Atas Rata-Rata',
          score: 72,
          desc: 'Pendengaran di atas rata-rata untuk usia dewasa. Kecakapan berbahasa dalam kondisi sunyi dan bising sedang tetap sepenuhnya kuat dan tidak terganggu.'
        };
      }
      if (freq >= 14000) {
        return {
          age: '40–44',
          numericAge: 42,
          range: '40–44 years',
          rating: 'Average',
          score: 64,
          desc: 'Ambang pendengaran tipikal usia paruh baya. Penurunan ringan 4 kHz–14 kHz adalah standar akibat akumulasi kebisingan lingkungan alami.'
        };
      }
      if (freq >= 13000) {
        return {
          age: '45–49',
          numericAge: 47,
          range: '45–49 years',
          rating: 'Moderate',
          score: 56,
          desc: 'Normal threshold for late-40s. High-frequency sibilant consonants (s, f, th) may require slightly more cognitive effort in loud restaurants.'
        };
      }
      if (freq >= 12000) {
        return {
          age: '50–54',
          numericAge: 52,
          range: '50–54 years',
          rating: 'Mild Decline',
          score: 48,
          desc: 'Penurunan frekuensi tinggi ringan terdeteksi. Ambang ini standar untuk usia 50+, karena stereosilia basal mengalami penuaan kumulatif yang wajar.'
        };
      }
      if (freq >= 11000) {
        return {
          age: '55–59',
          numericAge: 57,
          range: '55–59 years',
          rating: 'Noticeable Decline',
          score: 40,
          desc: 'Penurunan frekuensi tinggi yang nyata. Diskriminasi ucapan dalam kebisingan latar mungkin sedikit terganggu. Skrining tahunan disarankan.'
        };
      }
      if (freq >= 10000) {
        return {
          age: '60–64',
          numericAge: 62,
          range: '60–64 years',
          rating: 'Significant Decline',
          score: 32,
          desc: 'Redaman frekuensi tinggi yang signifikan. Pemeriksaan kesehatan pendengaran bersama audiologis disarankan untuk mempatokan frekuensi percakapan.'
        };
      }
      if (freq >= 9000) {
        return {
          age: '65–69',
          numericAge: 67,
          range: '65–69 years',
          rating: 'Marked Decline',
          score: 24,
          desc: 'Presbikusis nyata. Frekuensi di atas 9 kHz tidak terdengar. Audiogram klinis lengkap disarankan untuk menjaga kejernihan ucapan.'
        };
      }
      if (freq >= 8000) {
        return {
          age: '70–74',
          numericAge: 72,
          range: '70–74 years',
          rating: 'Substantial Loss',
          score: 18,
          desc: 'Gangguan pendengaran frekuensi tinggi yang substansial memasuki pita ucapan atas (8 kHz). Konsultasi dengan spesialis pendengaran berlisensi disarankan.'
        };
      }
      return {
        age: '75+',
        numericAge: 78,
        range: '75+ years',
        rating: 'Severe Cutoff',
        score: 10,
        desc: 'Batas atas di bawah 8 kHz. Kami sangat menyarankan pemeriksaan audiometri nada murni klinis langsung dengan dokter THT atau audiologis.'
      };
    }
  }

  /* =========================================================
     AUDIOMETRY TEST - Pure-Tone Audiometry (250Hz - 8kHz)
     Modified Hughson-Westlake Ascending Technique
     ========================================================= */
  class AudiometryTest {
    constructor(audio) {
      this.audio = audio;
      this.frequencies = [125, 250, 500, 1000, 2000, 4000, 8000];
      this.ears = ['left', 'right'];
      this.testPoints = [];
      this.earIndex = 0;
      this.freqIndex = 0;
      this.currentDbHL = 40;
      this.direction = null; // 'down' (after heard) or 'up' (after not heard)
      this.ascendingResponses = {}; // dbHL -> count of heard responses on ascending runs
      this.lowestHeard = null;
      this.trialCount = 0;
      this.threshold = null;
      this.results = { left: {}, right: {} };
      this.completed = false;
      this.tonePlaying = false;
    }

    start() {
      this.testPoints = [];
      for (const ear of this.ears) {
        for (const freq of this.frequencies) {
          this.testPoints.push({ ear, freq });
        }
      }
      this.earIndex = 0;
      this.freqIndex = 0;
      this.resetPointState();
      this.results = { left: {}, right: {} };
      this.completed = false;
      this.playCurrent();
    }

    resetPointState() {
      this.currentDbHL = 40;
      this.direction = null;
      this.ascendingResponses = {};
      this.lowestHeard = null;
      this.trialCount = 0;
      this.threshold = null;
    }

    getCurrentPoint() {
      if (this.earIndex >= this.ears.length) return null;
      return {
        ear: this.ears[this.earIndex],
        freq: this.frequencies[this.freqIndex]
      };
    }

    getProgress() {
      const total = this.ears.length * this.frequencies.length;
      const completed = this.earIndex * this.frequencies.length + this.freqIndex;
      return { completed, total };
    }

    async playCurrent() {
      const point = this.getCurrentPoint();
      if (!point) return;
      this.trialCount++;
      this.tonePlaying = true;
      await this.audio.playTone(point.freq, this.currentDbHL, point.ear, 1.4);
      this.tonePlaying = false;
    }

    respondHeard() {
      if (this.lowestHeard === null || this.currentDbHL < this.lowestHeard) {
        this.lowestHeard = this.currentDbHL;
      }

      // If this tone was presented after an increase ("up" direction), count as an ascending response
      if (this.direction === 'up') {
        this.ascendingResponses[this.currentDbHL] = (this.ascendingResponses[this.currentDbHL] || 0) + 1;
        if (this.ascendingResponses[this.currentDbHL] >= 2) {
          this.threshold = this.currentDbHL;
          this.advancePoint();
          return;
        }
      }

      // Hughson-Westlake: On heard, decrease by 10 dB
      this.direction = 'down';
      this.currentDbHL -= 10;

      if (this.currentDbHL <= 0) {
        this.currentDbHL = 0;
        // If 0 dB HL is heard twice, confirm threshold at 0 dB
        if (this.lowestHeard === 0) {
          this.ascendingResponses[0] = (this.ascendingResponses[0] || 0) + 1;
          if (this.ascendingResponses[0] >= 2) {
            this.threshold = 0;
            this.advancePoint();
            return;
          }
        }
      }

      if (this.trialCount >= 10 && this.lowestHeard !== null) {
        this.threshold = this.lowestHeard;
        this.advancePoint();
        return;
      }

      setTimeout(() => this.playCurrent(), 350);
    }

    respondNotHeard() {
      // Hughson-Westlake: On not heard, increase by 5 dB
      this.direction = 'up';
      this.currentDbHL += 5;

      if (this.currentDbHL >= 90) {
        this.currentDbHL = 90;
        if (this.trialCount >= 4) {
          this.threshold = this.lowestHeard !== null ? this.lowestHeard : 90;
          this.advancePoint();
          return;
        }
      }

      if (this.trialCount >= 12) {
        this.threshold = this.lowestHeard !== null ? this.lowestHeard : (this.currentDbHL <= 90 ? this.currentDbHL : 90);
        this.advancePoint();
        return;
      }

      setTimeout(() => this.playCurrent(), 350);
    }

    advancePoint() {
      const point = this.getCurrentPoint();
      if (point) {
        this.results[point.ear][point.freq] = this.threshold !== null ? this.threshold : (this.lowestHeard !== null ? this.lowestHeard : 40);
      }

      this.freqIndex++;
      if (this.freqIndex >= this.frequencies.length) {
        this.freqIndex = 0;
        this.earIndex++;
      }

      this.resetPointState();

      if (this.earIndex >= this.ears.length) {
        this.completed = true;
        return;
      }

      setTimeout(() => this.playCurrent(), 500);
    }

    classifyThreshold(dbHL) {
      if (dbHL <= 20) return { label: 'Pendengaran Normal', class: 'normal', textClass: 'text-emerald-600 dark:text-emerald-400', desc: 'Ambang dalam rentang klinis standar (0–20 dB HL).' };
      if (dbHL <= 40) return { label: 'Gangguan Pendengaran Ringan', class: 'mild', textClass: 'text-amber-600 dark:text-amber-400', desc: 'Sulit mendengar ucapan lembut, konsonan berbisik, atau percakapan di kafe yang bising.' };
      if (dbHL <= 70) return { label: 'Gangguan Pendengaran Sedang', class: 'moderate', textClass: 'text-amber-600 dark:text-amber-400', desc: 'Sulit mendengar percakapan tanpa bantuan amplifikasi.' };
      return { label: 'Gangguan Pendengaran Berat', class: 'severe', textClass: 'text-rose-600 dark:text-rose-400', desc: 'Ucapan tidak terdengar tanpa alat bantu dengar khusus atau amplifikasi.' };
    }

    getAverageLoss(ear) {
      const speechFreqs = [500, 1000, 2000, 4000];
      const values = speechFreqs.map((f) => this.results[ear][f]).filter((v) => v !== undefined && v !== null);
      if (values.length === 0) return null;
      return values.reduce((a, b) => a + b, 0) / values.length;
    }
  }

  /* =========================================================
     AUDIOGRAM RENDERER - Canvas-Based Clinical Chart
     ========================================================= */
  class AudiogramRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = window.devicePixelRatio || 1;
      this.padding = { left: 65, right: 30, top: 35, bottom: 45 };
      this.setupCanvas();
    }

    setupCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const cssWidth = rect.width || 820;
      const cssHeight = 440;
      this.canvas.width = cssWidth * this.dpr;
      this.canvas.height = cssHeight * this.dpr;
      this.canvas.style.height = cssHeight + 'px';
      this.ctx.scale(this.dpr, this.dpr);
      this.width = cssWidth;
      this.height = cssHeight;
    }

    freqToX(freq) {
      const minLog = Math.log10(125);
      const maxLog = Math.log10(8000);
      const logF = Math.log10(freq);
      const plotWidth = this.width - this.padding.left - this.padding.right;
      return this.padding.left + ((logF - minLog) / (maxLog - minLog)) * plotWidth;
    }

    dbToY(db) {
      const minDb = -10;
      const maxDb = 120;
      const plotHeight = this.height - this.padding.top - this.padding.bottom;
      return this.padding.top + ((db - minDb) / (maxDb - minDb)) * plotHeight;
    }

    draw(results) {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      const padding = this.padding;
      const plotW = this.width - padding.left - padding.right;
      const plotH = this.height - padding.top - padding.bottom;

      // Clinical severity color bands
      const zones = [
        { min: -10, max: 20, color: 'rgba(16, 185, 129, 0.08)' }, // Normal
        { min: 20, max: 40, color: 'rgba(245, 158, 11, 0.07)' },  // Mild
        { min: 40, max: 70, color: 'rgba(249, 115, 22, 0.07)' },  // Moderate
        { min: 70, max: 90, color: 'rgba(239, 68, 68, 0.08)' },   // Severe
        { min: 90, max: 120, color: 'rgba(220, 38, 38, 0.12)' }   // Profound
      ];

      zones.forEach((zone) => {
        const y1 = this.dbToY(zone.min);
        const y2 = this.dbToY(zone.max);
        ctx.fillStyle = zone.color;
        ctx.fillRect(padding.left, y1, plotW, y2 - y1);
      });

      // Horizontal grid lines and dB HL labels
      const dbLines = [0, 20, 40, 60, 80, 100, 120];
      dbLines.forEach((db) => {
        const y = this.dbToY(db);
        ctx.strokeStyle = db === 20 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(161, 161, 170, 0.2)';
        ctx.lineWidth = db === 20 ? 1.5 : 1;
        ctx.setLineDash(db === 20 ? [4, 4] : []);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + plotW, y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = db === 20 ? 'rgba(16, 185, 129, 0.9)' : 'rgba(161, 161, 170, 0.8)';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(db.toString(), padding.left - 10, y);
      });

      // Vertical grid lines and frequency labels
      const freqs = [250, 500, 1000, 2000, 4000, 8000];
      freqs.forEach((freq) => {
        const x = this.freqToX(freq);
        ctx.strokeStyle = 'rgba(161, 161, 170, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + plotH);
        ctx.stroke();

        const label = freq >= 1000 ? freq / 1000 + 'k' : freq.toString();
        ctx.fillStyle = 'rgba(161, 161, 170, 0.9)';
        ctx.font = '11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(label, x, padding.top + plotH + 8);
      });

      // Axis Titles
      ctx.fillStyle = 'rgba(161, 161, 170, 0.7)';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Frequency (Hz)', padding.left + plotW / 2, this.height - 8);

      ctx.save();
      ctx.translate(16, padding.top + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Hearing Level (dB HL)', 0, 0);
      ctx.restore();

      // Plot Left Ear (Blue 'X') and Right Ear (Red 'O')
      this.plotEar(results.left, '#3b82f6', '#93c5fd', 'X');
      this.plotEar(results.right, '#ef4444', '#fca5a5', 'O');
    }

    plotEar(earData, color, lightColor, symbol) {
      if (!earData) return;
      const ctx = this.ctx;
      const freqs = [250, 500, 1000, 2000, 4000, 8000];
      const points = [];

      freqs.forEach((freq) => {
        const db = earData[freq];
        if (db !== undefined && db !== null) {
          const x = this.freqToX(freq);
          const y = this.dbToY(db);
          points.push({ x, y, freq, db });
        }
      });

      if (points.length === 0) return;

      // Connecting line
      if (points.length > 1) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }

      // Points & Symbols
      points.forEach((p) => {
        ctx.fillStyle = lightColor + '40';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;

        if (symbol === 'X') {
          const s = 6;
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y - s);
          ctx.lineTo(p.x + s, p.y + s);
          ctx.moveTo(p.x + s, p.y - s);
          ctx.lineTo(p.x - s, p.y + s);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(p.db + 'dB', p.x, p.y - 10);
      });
    }

    download(results) {
      const dlCanvas = document.createElement('canvas');
      dlCanvas.width = 1200;
      dlCanvas.height = 760;
      const dlCtx = dlCanvas.getContext('2d');

      dlCtx.fillStyle = '#09090b';
      dlCtx.fillRect(0, 0, 1200, 760);

      dlCtx.fillStyle = '#ffffff';
      dlCtx.font = 'bold 28px Outfit, sans-serif';
      dlCtx.textAlign = 'left';
      dlCtx.fillText('Pure-Tone Audiogram Assessment', 50, 50);

      dlCtx.fillStyle = '#71717a';
      dlCtx.font = '14px Inter, sans-serif';
      dlCtx.fillText('FreeIQExam.com Hearing Diagnostics · ' + new Date().toLocaleDateString(), 50, 78);

      dlCtx.fillStyle = '#3b82f6';
      dlCtx.font = 'bold 14px Inter, sans-serif';
      dlCtx.fillText('✕ Left Ear (Blue)', 920, 50);
      dlCtx.fillStyle = '#ef4444';
      dlCtx.fillText('○ Right Ear (Red)', 1060, 50);

      const savedDpr = window.devicePixelRatio || 1;
      const oldCanvas = this.canvas;
      const oldCtx = this.ctx;
      const oldWidth = this.width;
      const oldHeight = this.height;

      this.canvas = dlCanvas;
      this.ctx = dlCtx;
      this.width = 1200;
      this.height = 760;
      this.dpr = 1;

      dlCtx.save();
      dlCtx.translate(0, 40);
      this.draw(results);
      dlCtx.restore();

      this.canvas = oldCanvas;
      this.ctx = oldCtx;
      this.width = oldWidth;
      this.height = oldHeight;
      this.dpr = savedDpr;
      this.setupCanvas();
      this.draw(results);

      dlCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audiogram-results.png';
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  /* =========================================================
     SHAREABLE EAR AGE CERTIFICATE GENERATOR
     ========================================================= */
  function downloadEarAgeCertificate(data) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1100;
    const ctx = canvas.getContext('2d');

    // Deep Monochrome Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, 900, 1100);
    bgGrad.addColorStop(0, '#000000');
    bgGrad.addColorStop(0.5, '#09090b');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 900, 1100);

    // Cyan Radial Glow
    const glowGrad = ctx.createRadialGradient(450, 360, 0, 450, 360, 450);
    glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
    glowGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.03)');
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, 900, 1100);

    // Precise Hairline Borders
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, 820, 1020);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(55, 55, 790, 990);

    // Brand Eyebrow
    ctx.fillStyle = '#06b6d4';
    ctx.font = '600 13px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FREEIQEXAM.COM · AUDITORY COGNITION LAB', 450, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Outfit, sans-serif';
    ctx.fillText('Biological Ear Age Assessment', 450, 160);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '15px Inter, sans-serif';
    ctx.fillText('High-Frequency Stereocilia Presbycusis Metric', 450, 192);

    // Big Age Hero Readout
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 140px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(data.age, 450, 360);

    ctx.fillStyle = '#71717a';
    ctx.font = '600 18px Inter, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText('Estimated Biological Age', 450, 440);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Outfit, sans-serif';
    ctx.fillText(data.rating, 450, 480);

    // Stats Grid
    const stats = [
      { label: 'Frekuensi Tertinggi', value: data.maxFreq + ' Hz' },
      { label: 'Skor Pendengaran', value: data.score + ' / 100' },
      { label: 'Rentang Kelompok Usia', value: data.range }
    ];

    stats.forEach((stat, i) => {
      const x = 170 + i * 280;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(x - 120, 560, 240, 100);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 120, 560, 240, 100);

      ctx.fillStyle = '#06b6d4';
      ctx.font = 'bold 22px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(stat.value, x, 600);

      ctx.fillStyle = '#71717a';
      ctx.font = '600 12px JetBrains Mono, monospace';
      ctx.fillText(stat.label.toUpperCase(), x, 634);
    });

    // Description text
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';

    const words = data.desc.split(' ');
    let line = '';
    let currentY = 720;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 700 && n > 0) {
        ctx.fillText(line, 450, currentY);
        line = words[n] + ' ';
        currentY += 24;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 450, currentY);

    // Footer
    ctx.fillStyle = '#52525b';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.fillText('Verified on ' + resolveShareUrl('https://freeiqexam.com/id/tes-pendengaran') + ' · ' + new Date().toLocaleDateString(), 450, 960);

    ctx.fillStyle = '#3f3f46';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('Screening assessment for self-check purposes only. Not an official medical diagnostic instrument.', 450, 990);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'biological-ear-age-certificate.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* =========================================================
     HEARING APP CONTROLLER
     ========================================================= */
  const HearingApp = {
    audio: null,
    earAgeTest: null,
    audiometryTest: null,
    audiogramRenderer: null,
    mode: null, // 'ear-age' or 'audiometry'

    init() {
      this.audio = new AudioEngine();
      this.bindEvents();
    },

    bindEvents() {
      // Mode selection cards
      document.querySelectorAll('.hearing-mode-card').forEach((card) => {
        card.addEventListener('click', () => {
          this.mode = card.dataset.mode;
          this.startCalibration();
        });
      });

      // Calibration elements
      const calibSlider = document.getElementById('calibSlider');
      const calibDbDisplay = document.getElementById('calibDbDisplay');
      if (calibSlider && calibDbDisplay) {
        calibSlider.addEventListener('input', (e) => {
          calibDbDisplay.textContent = e.target.value + ' dB HL';
        });
      }

      const calibPlayBtn = document.getElementById('calibPlayBtn');
      if (calibPlayBtn) {
        calibPlayBtn.addEventListener('click', async () => {
          const dbHL = calibSlider ? parseInt(calibSlider.value) : 40;
          await this.audio.init();
          this.audio.playTone(1000, dbHL, 'both');
        });
      }

      const calibStopBtn = document.getElementById('calibStopBtn');
      if (calibStopBtn) {
        calibStopBtn.addEventListener('click', () => {
          this.audio.stopTone();
        });
      }

      const startTestBtn = document.getElementById('startTestBtn');
      if (startTestBtn) {
        startTestBtn.addEventListener('click', async () => {
          const dbHL = calibSlider ? parseInt(calibSlider.value) : 40;
          this.audio.setCalibration(dbHL);
          this.audio.stopTone();
          this.startTest();
        });
      }

      // Ear Age Responses
      const earAgeHearBtn = document.getElementById('earAgeHearBtn');
      if (earAgeHearBtn) {
        earAgeHearBtn.addEventListener('click', () => this.earAgeRespond(true));
      }

      const earAgeNoHearBtn = document.getElementById('earAgeNoHearBtn');
      if (earAgeNoHearBtn) {
        earAgeNoHearBtn.addEventListener('click', () => this.earAgeRespond(false));
      }

      const earAgeReplayBtn = document.getElementById('earAgeReplayBtn');
      if (earAgeReplayBtn) {
        earAgeReplayBtn.addEventListener('click', () => {
          if (this.earAgeTest && !this.earAgeTest.completed) {
            this.earAgeTest.playCurrent();
          }
        });
      }

      // Audiometry Responses
      const audYesBtn = document.getElementById('audYesBtn');
      if (audYesBtn) {
        audYesBtn.addEventListener('click', () => this.audRespond(true));
      }

      const audNoBtn = document.getElementById('audNoBtn');
      if (audNoBtn) {
        audNoBtn.addEventListener('click', () => this.audRespond(false));
      }

      const audReplayBtn = document.getElementById('audReplayBtn');
      if (audReplayBtn) {
        audReplayBtn.addEventListener('click', () => {
          if (this.audiometryTest && !this.audiometryTest.completed) {
            this.audiometryTest.playCurrent();
          }
        });
      }

      // Results Actions
      const downloadEarAgeBtn = document.getElementById('downloadEarAgeBtn');
      if (downloadEarAgeBtn) {
        downloadEarAgeBtn.addEventListener('click', () => {
          if (!this.earAgeTest) return;
          const data = this.earAgeTest.freqToEarAge(this.earAgeTest.lastHeardFreq);
          data.age = document.getElementById('resultEarAge').textContent;
          data.maxFreq = this.earAgeTest.lastHeardFreq;
          downloadEarAgeCertificate(data);
        });
      }

      const downloadAudiogramBtn = document.getElementById('downloadAudiogramBtn');
      if (downloadAudiogramBtn) {
        downloadAudiogramBtn.addEventListener('click', () => {
          if (this.audiogramRenderer && this.audiometryTest) {
            this.audiogramRenderer.download(this.audiometryTest.results);
          }
        });
      }

      const retakeEarAgeBtn = document.getElementById('retakeEarAgeBtn');
      if (retakeEarAgeBtn) retakeEarAgeBtn.addEventListener('click', () => this.reset());

      const retakeAudBtn = document.getElementById('retakeAudBtn');
      if (retakeAudBtn) retakeAudBtn.addEventListener('click', () => this.reset());

      const tryOtherBtn = document.getElementById('tryOtherBtn');
      if (tryOtherBtn) {
        tryOtherBtn.addEventListener('click', () => {
          this.mode = 'audiometry';
          this.startCalibration();
        });
      }

      const tryEarAgeBtn = document.getElementById('tryEarAgeBtn');
      if (tryEarAgeBtn) {
        tryEarAgeBtn.addEventListener('click', () => {
          this.mode = 'ear-age';
          this.startCalibration();
        });
      }

      // Keyboard Accessibility
      window.addEventListener('keydown', (e) => {
        const earAgePanel = document.getElementById('earAgePanel');
        const audiometryPanel = document.getElementById('audiometryPanel');

        if (earAgePanel && !earAgePanel.classList.contains('hidden')) {
          if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'y' || e.key === '1') {
            this.earAgeRespond(true);
          } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'n' || e.key === '2') {
            this.earAgeRespond(false);
          } else if (e.key.toLowerCase() === 'r') {
            if (this.earAgeTest && !this.earAgeTest.completed) this.earAgeTest.playCurrent();
          }
        } else if (audiometryPanel && !audiometryPanel.classList.contains('hidden')) {
          if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'y' || e.key === '1') {
            this.audRespond(true);
          } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'n' || e.key === '2') {
            this.audRespond(false);
          } else if (e.key.toLowerCase() === 'r') {
            if (this.audiometryTest && !this.audiometryTest.completed) this.audiometryTest.playCurrent();
          }
        }
      });

      // Cleanup on leaving page
      window.addEventListener('pagehide', () => {
        if (this.audio) this.audio.stopTone();
      });
      window.addEventListener('beforeunload', () => {
        if (this.audio) this.audio.stopTone();
      });
    },

    startCalibration() {
      const modeSelector = document.getElementById('modeSelector');
      const workspace = document.getElementById('workspace');
      const calibrationPanel = document.getElementById('calibrationPanel');
      const earAgePanel = document.getElementById('earAgePanel');
      const audiometryPanel = document.getElementById('audiometryPanel');
      const resultsWrap = document.getElementById('resultsWrap');
      const workspaceTitle = document.getElementById('workspaceTitle');
      const stepNum = document.getElementById('stepNum');

      if (modeSelector) modeSelector.classList.add('hidden');
      if (workspace) workspace.classList.remove('hidden');
      if (calibrationPanel) calibrationPanel.classList.remove('hidden');
      if (earAgePanel) earAgePanel.classList.add('hidden');
      if (audiometryPanel) audiometryPanel.classList.add('hidden');
      if (resultsWrap) resultsWrap.classList.add('hidden');

      if (workspaceTitle) {
        workspaceTitle.textContent = this.mode === 'ear-age' ? 'Ear Age Frequency Test' : 'Pure-Tone Audiometry';
      }
      if (stepNum) stepNum.textContent = '1';

      setTimeout(() => {
        if (workspace) workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    },

    async startTest() {
      const calibrationPanel = document.getElementById('calibrationPanel');
      const stepNum = document.getElementById('stepNum');
      if (calibrationPanel) calibrationPanel.classList.add('hidden');
      if (stepNum) stepNum.textContent = '2';

      if (this.mode === 'ear-age') {
        const earAgePanel = document.getElementById('earAgePanel');
        if (earAgePanel) earAgePanel.classList.remove('hidden');
        this.earAgeTest = new EarAgeTest(this.audio);
        this.updateEarAgeUI();
        await this.audio.init();
        this.earAgeTest.start();
        const wave = document.getElementById('earAgeWave');
        if (wave) wave.classList.add('active');
      } else {
        const audiometryPanel = document.getElementById('audiometryPanel');
        if (audiometryPanel) audiometryPanel.classList.remove('hidden');
        this.audiometryTest = new AudiometryTest(this.audio);
        this.updateAudUI();
        this.buildAudProgress();
        await this.audio.init();
        this.audiometryTest.start();
      }
    },

    updateEarAgeUI() {
      const earAgeFreq = document.getElementById('earAgeFreq');
      const earAgeProgress = document.getElementById('earAgeProgress');
      if (earAgeFreq) {
        earAgeFreq.textContent = this.earAgeTest.currentFreq.toLocaleString();
      }
      if (earAgeProgress) {
        const pct = (this.earAgeTest.stepIndex / this.earAgeTest.steps.length) * 100;
        earAgeProgress.style.width = pct + '%';
      }
    },

    earAgeRespond(heard) {
      if (!this.earAgeTest || this.earAgeTest.completed) return;
      this.audio.stopTone();

      let result;
      if (heard) {
        result = this.earAgeTest.respondHeard();
      } else {
        result = this.earAgeTest.respondNotHeard();
      }

      if (result.done) {
        this.showEarAgeResults();
      } else {
        this.updateEarAgeUI();
        const wave = document.getElementById('earAgeWave');
        if (wave) {
          wave.classList.remove('active');
          setTimeout(() => wave.classList.add('active'), 150);
        }
      }
    },

    showEarAgeResults() {
      const earAgePanel = document.getElementById('earAgePanel');
      const wave = document.getElementById('earAgeWave');
      const resultsWrap = document.getElementById('resultsWrap');
      const stepNum = document.getElementById('stepNum');

      if (earAgePanel) earAgePanel.classList.add('hidden');
      if (wave) wave.classList.remove('active');
      if (stepNum) stepNum.textContent = '3';

      const freq = this.earAgeTest.lastHeardFreq;
      const data = this.earAgeTest.freqToEarAge(freq);

      const resultEarAge = document.getElementById('resultEarAge');
      const resultEarAgeDesc = document.getElementById('resultEarAgeDesc');
      const resultMaxFreq = document.getElementById('resultMaxFreq');
      const resultScore = document.getElementById('resultScore');
      const resultRating = document.getElementById('resultRating');

      if (resultEarAge) resultEarAge.textContent = data.age;
      if (resultEarAgeDesc) resultEarAgeDesc.textContent = data.desc;
      if (resultMaxFreq) resultMaxFreq.textContent = freq.toLocaleString();
      if (resultScore) resultScore.textContent = data.score;
      if (resultRating) resultRating.textContent = data.rating;

      if (resultsWrap) resultsWrap.classList.remove('hidden');

      const panelEarAge = document.getElementById('panel-earage');
      const panelAudiogram = document.getElementById('panel-audiogram');
      if (panelEarAge) panelEarAge.classList.remove('hidden');
      if (panelAudiogram) panelAudiogram.classList.add('hidden');

      setTimeout(() => {
        if (resultsWrap) resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },

    updateAudUI() {
      const point = this.audiometryTest.getCurrentPoint();
      if (!point) return;

      const audFreqValue = document.getElementById('audFreqValue');
      const audDbValue = document.getElementById('audDbValue');
      const audEarLabel = document.getElementById('audEarLabel');
      const indicator = document.getElementById('audEarIndicator');

      if (audFreqValue) {
        audFreqValue.textContent = point.freq >= 1000 ? point.freq / 1000 + ' kHz' : point.freq + ' Hz';
      }
      if (audDbValue) {
        audDbValue.textContent = this.audiometryTest.currentDbHL;
      }
      if (audEarLabel) {
        audEarLabel.textContent = point.ear === 'left' ? 'Left Ear (Blue)' : 'Right Ear (Red)';
      }
      if (indicator) {
        indicator.className =
          point.ear === 'left'
            ? 'w-12 h-12 rounded-full flex items-center justify-center border-2 border-blue-500 bg-blue-500/10 text-blue-500 font-bold'
            : 'w-12 h-12 rounded-full flex items-center justify-center border-2 border-rose-500 bg-rose-500/10 text-rose-500 font-bold';
        indicator.textContent = point.ear === 'left' ? 'L' : 'R';
      }
    },

    buildAudProgress() {
      const container = document.getElementById('audProgress');
      if (!container) return;
      container.innerHTML = '';
      const total = this.audiometryTest.ears.length * this.audiometryTest.frequencies.length;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'aud-progress-dot flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors';
        container.appendChild(dot);
      }
      this.updateAudProgress();
    },

    updateAudProgress() {
      const dots = document.querySelectorAll('.aud-progress-dot');
      const { completed } = this.audiometryTest.getProgress();
      dots.forEach((dot, i) => {
        if (i < completed) {
          dot.className = 'aud-progress-dot flex-1 h-1.5 rounded-full bg-cyan-500 transition-colors';
        } else if (i === completed) {
          dot.className = 'aud-progress-dot flex-1 h-1.5 rounded-full bg-cyan-400 ring-2 ring-cyan-300 transition-colors animate-pulse';
        } else {
          dot.className = 'aud-progress-dot flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors';
        }
      });
    },

    audRespond(heard) {
      if (!this.audiometryTest || this.audiometryTest.completed) return;
      this.audio.stopTone();

      if (heard) {
        this.audiometryTest.respondHeard();
      } else {
        this.audiometryTest.respondNotHeard();
      }

      this.updateAudUI();
      this.updateAudProgress();

      if (this.audiometryTest.completed) {
        this.showAudiometryResults();
      }
    },

    showAudiometryResults() {
      const audiometryPanel = document.getElementById('audiometryPanel');
      const resultsWrap = document.getElementById('resultsWrap');
      const stepNum = document.getElementById('stepNum');

      if (audiometryPanel) audiometryPanel.classList.add('hidden');
      if (stepNum) stepNum.textContent = '3';

      const canvas = document.getElementById('audiogramCanvas');
      if (canvas) {
        this.audiogramRenderer = new AudiogramRenderer(canvas);
      }

      if (resultsWrap) resultsWrap.classList.remove('hidden');

      const panelEarAge = document.getElementById('panel-earage');
      const panelAudiogram = document.getElementById('panel-audiogram');
      if (panelEarAge) panelEarAge.classList.add('hidden');
      if (panelAudiogram) panelAudiogram.classList.remove('hidden');

      setTimeout(() => {
        if (this.audiogramRenderer) {
          this.audiogramRenderer.setupCanvas();
          this.audiogramRenderer.draw(this.audiometryTest.results);
          this.buildAudiogramSummary();
        }
        if (resultsWrap) resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    },

    buildAudiogramSummary() {
      const container = document.getElementById('audiogramSummary');
      if (!container) return;
      container.innerHTML = '';

      const ears = ['left', 'right'];
      ears.forEach((ear) => {
        const avgLoss = this.audiometryTest.getAverageLoss(ear);
        const classification = this.audiometryTest.classifyThreshold(avgLoss || 0);

        const card = document.createElement('div');
        card.className = 'p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2';
        card.innerHTML = `
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            ${ear === 'left' ? 'Left Ear (Blue)' : 'Right Ear (Red)'} · PTA (500–4000 Hz)
          </div>
          <div class="font-heading font-extrabold text-2xl sm:text-3xl ${classification.textClass}">
            ${avgLoss !== null ? Math.round(avgLoss) + ' dB HL' : 'N/A'}
          </div>
          <div class="text-sm font-semibold text-zinc-900 dark:text-white">${classification.label}</div>
          <div class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">${classification.desc}</div>
        `;
        container.appendChild(card);
      });

      const leftAvg = this.audiometryTest.getAverageLoss('left') || 0;
      const rightAvg = this.audiometryTest.getAverageLoss('right') || 0;
      const worse = Math.max(leftAvg, rightAvg);

      let recommendation = '';
      if (worse <= 20) {
        recommendation = 'Your pure-tone hearing thresholds are within the normal range. Practice safe listening with the 60/60 rule and re-test every 3 to 5 years.';
      } else if (worse <= 40) {
        recommendation = 'Mild hearing loss detected. If you struggle with speech in background noise, consider an in-person audiometric evaluation with a licensed audiologist.';
      } else if (worse <= 70) {
        recommendation = 'Moderate hearing loss detected. Hearing aids and an evaluation by an otolaryngologist (ENT) are recommended to maintain speech clarity.';
      } else {
        recommendation = 'Severe hearing loss indicated across speech frequencies. We strongly recommend scheduling a clinical hearing examination promptly.';
      }

      const recCard = document.createElement('div');
      recCard.className = 'p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2 sm:col-span-2';
      recCard.innerHTML = `
        <div class="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Clinical Recommendation</div>
        <div class="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">${recommendation}</div>
      `;
      container.appendChild(recCard);
    },

    reset() {
      if (this.audio) this.audio.stopTone();
      const resultsWrap = document.getElementById('resultsWrap');
      const workspace = document.getElementById('workspace');
      const earAgePanel = document.getElementById('earAgePanel');
      const audiometryPanel = document.getElementById('audiometryPanel');
      const calibrationPanel = document.getElementById('calibrationPanel');
      const modeSelector = document.getElementById('modeSelector');

      if (resultsWrap) resultsWrap.classList.add('hidden');
      if (workspace) workspace.classList.add('hidden');
      if (earAgePanel) earAgePanel.classList.add('hidden');
      if (audiometryPanel) audiometryPanel.classList.add('hidden');
      if (calibrationPanel) calibrationPanel.classList.add('hidden');
      if (modeSelector) modeSelector.classList.remove('hidden');

      this.earAgeTest = null;
      this.audiometryTest = null;

      const testAnchor = document.getElementById('test-arena');
      if (testAnchor) {
        testAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Safe DOM initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HearingApp.init());
  } else {
    HearingApp.init();
  }
})();
