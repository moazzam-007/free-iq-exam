/**
 * FPS Aim Trainer & Mouse Accuracy Benchmark Engine
 * Professional client-side 60FPS canvas game engine featuring:
 * - Triple Training Modes: Gridshot (Flicking), Smooth Tracking, Precision Micro-Targets
 * - High-DPI 60+ FPS Canvas rendering with delta-time compensation & particle physics
 * - Web Audio API dynamic pitch-scaling hit chimes & miss acoustics
 * - Real-time Kinematic metrics: Overall Score, TPS (Targets/Sec), Reaction Delay (ms), Accuracy %
 * - In-game crosshair customization (Dot, Crosshair, Circle-Dot) & Sensitivity eDPI converter
 * - Shareable high-resolution esports scorecard certificate generator (1200x675 PNG)
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
     1. WEB AUDIO API SOUND SYNTHESIS (COMBO PITCH SCALING)
     ========================================================= */
  class AimAudioEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.volume = 0.4;
      this.combo = 0;
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

    setVolume(val) {
      this.volume = Math.max(0, Math.min(1, val));
    }

    playHitSound() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch climbs by 1 semitone per combo streak (max +12 semitones / 1 octave)
      const semitone = Math.min(12, this.combo);
      const baseFreq = 880; // A5 note
      const freq = baseFreq * Math.pow(2, semitone / 12);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      this.combo++;
    }

    playMissSound() {
      this.combo = 0; // Reset combo pitch
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.06);

      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    }

    playTrackingHum() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      // Soft ambient click
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);

      gain.gain.setValueAtTime(this.volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  /* =========================================================
     2. PARTICLE FX ENGINE
     ========================================================= */
  class ParticleEngine {
    constructor() {
      this.particles = [];
    }

    burst(x, y, color = '#f43f5e', count = 16) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 5.5;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.5 + Math.random() * 3.5,
          color,
          alpha: 1.0,
          decay: 0.03 + Math.random() * 0.03
        });
      }
    }

    update(dt = 1) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= p.decay * dt;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }

    draw(ctx) {
      this.particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    clear() {
      this.particles = [];
    }
  }

  /* =========================================================
     3. AIM TRAINER CORE GAME ENGINE
     ========================================================= */
  class AimEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = window.devicePixelRatio || 1;
      this.width = 900;
      this.height = 520;

      // Settings
      this.mode = 'gridshot'; // 'gridshot', 'tracking', 'precision'
      this.duration = 30; // 30s or 60s
      this.crosshairStyle = 'cross'; // 'dot', 'cross', 'circle'
      this.crosshairColor = '#f43f5e';

      // State
      this.isActive = false;
      this.isPaused = false;
      this.isCompleted = false;
      this.startTime = null;
      this.elapsedSeconds = 0;
      this.remainingSeconds = 30;
      this.lastFrameTime = performance.now();
      this.animFrameId = null;

      // Game Entities
      this.targets = [];
      this.particles = new ParticleEngine();
      this.audio = new AimAudioEngine();

      // Mouse coords
      this.mouseX = 0;
      this.mouseY = 0;
      this.isMouseInside = false;

      // Metrics
      this.totalClicks = 0;
      this.hits = 0;
      this.misses = 0;
      this.currentStreak = 0;
      this.maxStreak = 0;
      this.timeOnTargetMs = 0;
      this.totalTrackingTimeMs = 0;
      this.trackingStreakMs = 0;
      this.maxTrackingStreakMs = 0;

      this.setupCanvas();
    }

    setupCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const cssW = Math.floor(rect.width) || 900;
      const cssH = 520;

      this.width = cssW;
      this.height = cssH;
      this.canvas.width = cssW * this.dpr;
      this.canvas.height = cssH * this.dpr;
      this.canvas.style.height = cssH + 'px';

      this.ctx.scale(this.dpr, this.dpr);
    }

    start(onTick, onComplete) {
      this.onTick = onTick;
      this.onComplete = onComplete;

      this.isActive = true;
      this.isPaused = false;
      this.isCompleted = false;
      this.startTime = performance.now();
      this.elapsedSeconds = 0;
      this.remainingSeconds = this.duration;
      this.lastFrameTime = performance.now();

      // Reset metrics
      this.totalClicks = 0;
      this.hits = 0;
      this.misses = 0;
      this.currentStreak = 0;
      this.maxStreak = 0;
      this.reactionTimes = [];
      this.timeOnTargetMs = 0;
      this.totalTrackingTimeMs = 0;
      this.trackingStreakMs = 0;
      this.maxTrackingStreakMs = 0;
      this.particles.clear();
      this.targets = [];

      // Spawn initial targets based on mode
      this.initTargets();

      // Start 60FPS Game Loop
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      this.gameLoop();
    }

    initTargets() {
      this.targets = [];
      if (this.mode === 'gridshot') {
        for (let i = 0; i < 3; i++) {
          this.spawnGridshotTarget();
        }
      } else if (this.mode === 'tracking') {
        this.spawnTrackingOrb();
      } else if (this.mode === 'precision') {
        this.spawnPrecisionTarget();
      }
    }

    spawnGridshotTarget() {
      const radius = 28;
      const padding = radius + 30;
      let x, y, overlap;
      let attempts = 0;

      do {
        overlap = false;
        x = padding + Math.random() * (this.width - padding * 2);
        y = padding + Math.random() * (this.height - padding * 2);

        for (const t of this.targets) {
          const dist = Math.hypot(t.x - x, t.y - y);
          if (dist < radius * 2.8) {
            overlap = true;
            break;
          }
        }
        attempts++;
      } while (overlap && attempts < 30);

      this.targets.push({
        id: Math.random(),
        x,
        y,
        radius,
        spawnTime: performance.now(),
        scale: 0.1, // Expansion animation
        color: '#f43f5e'
      });
    }

    spawnTrackingOrb() {
      const radius = 24;
      this.targets = [{
        x: this.width / 2,
        y: this.height / 2,
        radius,
        vx: (Math.random() > 0.5 ? 1 : -1) * 3.5,
        vy: (Math.random() > 0.5 ? 1 : -1) * 3.5,
        angle: Math.random() * Math.PI * 2,
        color: '#f43f5e'
      }];
    }

    spawnPrecisionTarget() {
      const radius = 16;
      const padding = radius + 40;
      const x = padding + Math.random() * (this.width - padding * 2);
      const y = padding + Math.random() * (this.height - padding * 2);

      this.targets = [{
        id: Math.random(),
        x,
        y,
        radius,
        maxLifespan: 1000, // 1000ms countdown
        spawnTime: performance.now(),
        scale: 0.1,
        color: '#f43f5e'
      }];
    }

    handleClick(mouseX, mouseY) {
      if (!this.isActive || this.isPaused || this.isCompleted) return;

      this.totalClicks++;
      let hit = false;
      const now = performance.now();

      if (this.mode === 'gridshot') {
        for (let i = this.targets.length - 1; i >= 0; i--) {
          const t = this.targets[i];
          const dist = Math.hypot(t.x - mouseX, t.y - mouseY);

          if (dist <= t.radius) {
            hit = true;
            this.hits++;
            this.currentStreak++;
            this.maxStreak = Math.max(this.maxStreak, this.currentStreak);

            // Record reaction latency
            this.reactionTimes.push(now - t.spawnTime);

            // Particles and Audio
            this.particles.burst(t.x, t.y, '#f43f5e', 16);
            this.audio.playHitSound();

            // Replace target immediately
            this.targets.splice(i, 1);
            this.spawnGridshotTarget();
            break;
          }
        }
      } else if (this.mode === 'precision') {
        if (this.targets.length > 0) {
          const t = this.targets[0];
          const dist = Math.hypot(t.x - mouseX, t.y - mouseY);

          if (dist <= t.radius) {
            hit = true;
            this.hits++;
            this.currentStreak++;
            this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
            this.reactionTimes.push(now - t.spawnTime);

            this.particles.burst(t.x, t.y, '#f43f5e', 18);
            this.audio.playHitSound();

            this.targets = [];
            this.spawnPrecisionTarget();
          }
        }
      }

      if (!hit && this.mode !== 'tracking') {
        this.misses++;
        this.currentStreak = 0;
        this.audio.playMissSound();
      }
    }

    update(dt) {
      const now = performance.now();
      this.elapsedSeconds = (now - this.startTime) / 1000;
      this.remainingSeconds = Math.max(0, this.duration - this.elapsedSeconds);

      // Tracking mode continuous updates
      if (this.mode === 'tracking' && this.targets.length > 0) {
        const orb = this.targets[0];

        // Smooth multi-harmonic velocity
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;

        // Wall collisions
        if (orb.x <= orb.radius + 20 || orb.x >= this.width - orb.radius - 20) {
          orb.vx *= -1;
          orb.vy += (Math.random() - 0.5) * 1.5;
        }
        if (orb.y <= orb.radius + 20 || orb.y >= this.height - orb.radius - 20) {
          orb.vy *= -1;
          orb.vx += (Math.random() - 0.5) * 1.5;
        }

        // Check if mouse/pointer is currently tracking over orb
        // NOTE: lastFrameTime is advanced in gameLoop() before update() runs, so
        // (now - this.lastFrameTime) is ~0 here. dt is the frame delta normalized
        // to 1.0 at 60fps, which is the correct per-frame duration in ms.
        const frameMs = dt * 16.666;
        this.totalTrackingTimeMs += frameMs;

        const dist = Math.hypot(orb.x - this.mouseX, orb.y - this.mouseY);
        if (dist <= orb.radius) {
          this.timeOnTargetMs += frameMs;
          this.trackingStreakMs += frameMs;
          this.maxTrackingStreakMs = Math.max(this.maxTrackingStreakMs, this.trackingStreakMs);

          // Subtle spark trail
          if (Math.random() < 0.4) {
            this.particles.burst(orb.x, orb.y, '#f43f5e', 2);
          }
          if (Math.random() < 0.1) {
            this.audio.playTrackingHum();
          }
        } else {
          this.trackingStreakMs = 0;
        }
      }

      // Precision mode countdown shrink & expiration
      if (this.mode === 'precision' && this.targets.length > 0) {
        const t = this.targets[0];
        const age = now - t.spawnTime;

        if (age >= t.maxLifespan) {
          // Expired target
          this.misses++;
          this.currentStreak = 0;
          this.audio.playMissSound();
          this.targets = [];
          this.spawnPrecisionTarget();
        }
      }

      // Smooth target scale animation
      this.targets.forEach((t) => {
        if (t.scale < 1.0) {
          t.scale = Math.min(1.0, t.scale + 0.12 * dt);
        }
      });

      this.particles.update(dt);

      // Trigger tick callback for HUD
      if (typeof this.onTick === 'function') {
        this.onTick(this.getLiveMetrics());
      }

      // Timer expiration check
      if (this.remainingSeconds <= 0) {
        this.finish();
      }
    }

    gameLoop() {
      if (!this.isActive || this.isPaused) return;

      const now = performance.now();
      const dt = Math.min(2.0, (now - this.lastFrameTime) / 16.66);
      this.lastFrameTime = now;

      this.update(dt);
      this.render();

      if (this.isActive) {
        this.animFrameId = requestAnimationFrame(() => this.gameLoop());
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      // Deep Dark Canvas Background & Subtle Grid Hairlines
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, this.width, this.height);

      // Subtle Background Crosshair Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = step; x < this.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.height);
        ctx.stroke();
      }
      for (let y = step; y < this.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
        ctx.stroke();
      }

      // Draw Targets
      this.targets.forEach((t) => {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.scale(t.scale || 1, t.scale || 1);

        // Radiant Outer Glow Ring
        const grad = ctx.createRadialGradient(0, 0, t.radius * 0.3, 0, 0, t.radius);
        grad.addColorStop(0, '#fda4af');
        grad.addColorStop(0.5, '#f43f5e');
        grad.addColorStop(1, '#e11d48');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
        ctx.fill();

        // 1px Sharp Hairline Ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner Core Dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, t.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Precision Mode Countdown Ring
        if (this.mode === 'precision' && t.maxLifespan) {
          const age = performance.now() - t.spawnTime;
          const remainingPct = 1 - age / t.maxLifespan;
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(0, 0, t.radius + 6, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remainingPct);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Draw Particles
      this.particles.draw(ctx);

      // Draw Custom Crosshair at Mouse Location
      if (this.isMouseInside) {
        this.drawCrosshair(ctx, this.mouseX, this.mouseY);
      }
    }

    drawCrosshair(ctx, x, y) {
      ctx.save();
      ctx.strokeStyle = this.crosshairColor;
      ctx.fillStyle = this.crosshairColor;
      ctx.lineWidth = 1.5;

      if (this.crosshairStyle === 'dot') {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.crosshairStyle === 'cross' || this.crosshairStyle === 'crosshair') {
        const gap = 4;
        const len = 9;
        ctx.beginPath();
        // Top
        ctx.moveTo(x, y - gap);
        ctx.lineTo(x, y - gap - len);
        // Bottom
        ctx.moveTo(x, y + gap);
        ctx.lineTo(x, y + gap + len);
        // Left
        ctx.moveTo(x - gap, y);
        ctx.lineTo(x - gap - len, y);
        // Right
        ctx.moveTo(x + gap, y);
        ctx.lineTo(x + gap + len, y);
        ctx.stroke();
      } else if (this.crosshairStyle === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    getLiveMetrics() {
      if (this.mode === 'tracking') {
        const acc = this.totalTrackingTimeMs > 0 ? Math.round((this.timeOnTargetMs / this.totalTrackingTimeMs) * 100) : 100;
        const score = Math.min(100000, Math.round((acc / 100) * 85000 + (this.maxTrackingStreakMs / 1000) * 500));
        return {
          remainingSeconds: Math.ceil(this.remainingSeconds),
          score,
          hits: `${(this.timeOnTargetMs / 1000).toFixed(1)}s`,
          misses: `${((this.totalTrackingTimeMs - this.timeOnTargetMs) / 1000).toFixed(1)}s`,
          accuracy: acc,
          tps: `${acc}%`,
          streak: `${(this.trackingStreakMs / 1000).toFixed(1)}s`
        };
      }

      const acc = this.totalClicks > 0 ? Math.round((this.hits / this.totalClicks) * 100) : 100;
      const tps = this.elapsedSeconds > 0 ? (this.hits / this.elapsedSeconds).toFixed(2) : '0.00';
      const score = Math.round((this.hits * 1000) * (acc / 100) * (1 + this.maxStreak * 0.02));

      return {
        remainingSeconds: Math.ceil(this.remainingSeconds),
        score,
        hits: this.hits,
        misses: this.misses,
        accuracy: acc,
        tps,
        streak: this.currentStreak
      };
    }

    getFinalResults() {
      let acc = 100;
      let score = 0;
      let tps = '0.00';
      let hits = this.hits;
      let maxStreak = this.maxStreak;
      const elapsed = Math.max(1, this.elapsedSeconds || this.duration);

      if (this.mode === 'tracking') {
        acc = this.totalTrackingTimeMs > 0 ? Math.round((this.timeOnTargetMs / this.totalTrackingTimeMs) * 100) : 100;
        score = Math.min(100000, Math.round((acc / 100) * 85000 + (this.maxTrackingStreakMs / 1000) * 500));
        tps = `${acc}% TOT`;
        hits = `${(this.timeOnTargetMs / 1000).toFixed(1)}s`;
        maxStreak = `${(this.maxTrackingStreakMs / 1000).toFixed(1)}s`;
      } else {
        acc = this.totalClicks > 0 ? Math.round((this.hits / this.totalClicks) * 100) : 100;
        tps = (this.hits / elapsed).toFixed(2);
        score = Math.round((this.hits * 1000) * (acc / 100) * (1 + this.maxStreak * 0.03));
      }

      const avgReaction = this.reactionTimes.length > 0 ? Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length) : (this.mode === 'tracking' ? '-' : 240);
      const rank = this.getEsportsRank(score, this.mode === 'tracking' ? acc / 25 : parseFloat(tps), acc);

      return {
        score,
        hits,
        misses: this.misses,
        totalClicks: this.totalClicks,
        accuracy: acc,
        tps,
        avgReaction,
        maxStreak,
        duration: `${this.duration}s`,
        mode: this.mode,
        rank
      };
    }

    getEsportsRank(score, tps, acc) {
      if (score >= 80000 || (tps >= 3.5 && acc >= 95)) {
        return { tier: 'Radiant / Global Elite', percentile: 'Top 0,5%', badge: 'bg-rose-500 text-zinc-950', desc: 'Refleks motorik esports kelas dunia. Flick saccadic sub-180ms dan kontrol crosshair presisi piksel.' };
      }
      if (score >= 65000 || (tps >= 3.0 && acc >= 90)) {
        return { tier: 'Immortal / Faceit Lvl 10', percentile: 'Top 3%', badge: 'bg-rose-500/20 text-rose-400 border border-rose-500/40', desc: 'Aim kompetitif unggul. Akuisisi target yang sangat mematikan dan mikro-penyesuaian yang andal.' };
      }
      if (score >= 48000 || (tps >= 2.4 && acc >= 85)) {
        return { tier: 'Tier Diamond', percentile: 'Top 15%', badge: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40', desc: 'Refleks taktis yang tajam. Kemampuan mekanis solid dengan ritme flick yang konsisten.' };
      }
      if (score >= 32000 || (tps >= 1.8 && acc >= 80)) {
        return { tier: 'Tier Platinum', percentile: 'Top 35%', badge: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40', desc: 'Kontrol mouse di atas rata-rata. Koordinasi tangan-mata dengan fondasi yang baik.' };
      }
      if (score >= 20000) {
        return { tier: 'Tier Emas', percentile: 'Persentil ke-50', badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/40', desc: 'Aim rekreasi standar. Fokus pada postur lengan/pergelangan tangan dan menurunkan sensitivitas demi konsistensi.' };
      }
      return { tier: 'Silver / Bronze', percentile: 'Aim Berkembang', badge: 'bg-zinc-500/20 text-zinc-300 border border-zinc-500/40', desc: 'Refleks dasar. Berlatih 10 menit setiap hari dengan pelacakan halus dan penempatan crosshair.' };
    }

    finish() {
      this.isActive = false;
      this.isCompleted = true;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

      const results = this.getFinalResults();
      if (typeof this.onComplete === 'function') {
        this.onComplete(results);
      }
    }
  }

  /* =========================================================
     4. AIM SCORECARD CERTIFICATE GENERATOR (1200x675 PNG)
     ========================================================= */
  function downloadAimCertificate(results) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext('2d');

    // Deep Dark Monochrome Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 675);
    bgGrad.addColorStop(0, '#000000');
    bgGrad.addColorStop(0.5, '#0c0a09');
    bgGrad.addColorStop(1, '#000000');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 675);

    // Neon Rose Ambient Glow
    const glow = ctx.createRadialGradient(600, 220, 0, 600, 220, 500);
    glow.addColorStop(0, 'rgba(244, 63, 94, 0.2)');
    glow.addColorStop(0.7, 'rgba(244, 63, 94, 0.02)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1200, 675);

    // Precise Hairline Border
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(36, 36, 1128, 603);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(48, 48, 1104, 579);

    // Brand Eyebrow
    ctx.fillStyle = '#f43f5e';
    ctx.font = '600 13px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FREEIQEXAM.COM · ESPORTS PSYCHOMOTOR LAB', 600, 95);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Outfit, system-ui, sans-serif';
    ctx.fillText('Official FPS Aim Benchmark Scorecard', 600, 145);

    // Big Score Hero Readout
    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 110px Outfit, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(results.score.toLocaleString(), 600, 260);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 16px JetBrains Mono, monospace';
    ctx.textBaseline = 'top';
    ctx.fillText(`OVERALL KINEMATIC SCORE · MODE: ${results.mode.toUpperCase()}`, 600, 325);

    // Rank Badge
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Outfit, system-ui, sans-serif';
    ctx.fillText(`${results.rank.tier} · ${results.rank.percentile}`, 600, 365);

    // Metrics Row Cards
    const stats = [
      { label: 'AKURASI', value: `${results.accuracy}%` },
      { label: results.mode === 'tracking' ? 'WAKTU DI TARGET %' : 'TARGET / DETIK', value: results.tps.toString() },
      { label: 'REAKSI RATA-RATA', value: typeof results.avgReaction === 'number' ? `${results.avgReaction}ms` : results.avgReaction },
      { label: results.mode === 'tracking' ? 'WAKTU DI TARGET' : 'TARGET KENA', value: results.hits.toString() },
      { label: 'STREAK MAKS', value: results.maxStreak.toString().endsWith('s') ? results.maxStreak.toString() : `${results.maxStreak}x` }
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

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 22px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(st.value, x + cardW / 2, y + 25);

      ctx.fillStyle = '#71717a';
      ctx.font = '600 11px JetBrains Mono, monospace';
      ctx.fillText(st.label, x + cardW / 2, y + 55);
    });

    // Footer
    ctx.fillStyle = '#52525b';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Verified at ' + resolveShareUrl('https://freeiqexam.com/id/pelatih-akurasi-aim') + ' · Issued: ' + new Date().toLocaleDateString(), 600, 580);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aim-trainer-scorecard-${results.score}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* =========================================================
     5. UI CONTROLLER & SENSITIVITY CONVERTER
     ========================================================= */
  const AimApp = {
    engine: null,
    canvas: null,

    init() {
      this.canvas = document.getElementById('aimCanvas');
      if (!this.canvas) return;

      this.engine = new AimEngine(this.canvas);
      this.bindDOM();
      this.bindSensitivityConverter();
    },

    bindDOM() {
      // Mode Buttons (Gridshot, Tracking, Precision)
      document.querySelectorAll('.aim-mode-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.aim-mode-btn').forEach((b) => b.classList.remove('active', 'bg-rose-500/10', 'text-rose-500', 'border-rose-500/40'));
          btn.classList.add('active', 'bg-rose-500/10', 'text-rose-500', 'border-rose-500/40');
          this.engine.mode = btn.dataset.mode;
          this.resetToStartOverlay();
        });
      });

      // Duration Buttons (30s, 60s)
      document.querySelectorAll('.aim-time-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.aim-time-btn').forEach((b) => b.classList.remove('active', 'text-rose-500', 'font-bold'));
          btn.classList.add('active', 'text-rose-500', 'font-bold');
          this.engine.duration = parseInt(btn.dataset.time, 10);
          this.resetToStartOverlay();
        });
      });

      // Crosshair Style Selector
      const crosshairSelect = document.getElementById('crosshairStyleSelect');
      if (crosshairSelect) {
        crosshairSelect.addEventListener('change', (e) => {
          this.engine.crosshairStyle = e.target.value;
          this.engine.render();
        });
      }

      // Crosshair Color Selector
      const colorSelect = document.getElementById('crosshairColorSelect');
      if (colorSelect) {
        colorSelect.addEventListener('change', (e) => {
          this.engine.crosshairColor = e.target.value;
          this.engine.render();
        });
      }

      // Unified Pointer Coordinates & Touch/Mouse Handling
      const updateCoords = (clientX, clientY) => {
        const rect = this.canvas.getBoundingClientRect();
        this.engine.mouseX = clientX - rect.left;
        this.engine.mouseY = clientY - rect.top;
        this.engine.isMouseInside = true;
      };

      this.canvas.addEventListener('pointermove', (e) => {
        updateCoords(e.clientX, e.clientY);
      });

      this.canvas.addEventListener('pointerleave', () => {
        this.engine.isMouseInside = false;
      });

      this.canvas.addEventListener('pointerdown', (e) => {
        updateCoords(e.clientX, e.clientY);
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (!this.engine.isActive && !this.engine.isCompleted) {
          this.startGame();
        } else if (this.engine.isActive) {
          this.engine.handleClick(x, y);
        }
      });

      // Prevent default touch scrolling gestures on canvas
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          const t = e.touches[0];
          updateCoords(t.clientX, t.clientY);
        }
      }, { passive: false });

      this.canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const t = e.touches[0];
          updateCoords(t.clientX, t.clientY);
        }
      }, { passive: false });

      // Start Button Overlay
      const startOverlay = document.getElementById('startOverlay');
      if (startOverlay) {
        startOverlay.addEventListener('click', () => this.startGame());
      }

      // Retake Buttons
      const retakeBtn = document.getElementById('retakeAimBtn');
      if (retakeBtn) {
        retakeBtn.addEventListener('click', () => this.resetToStartOverlay());
      }

      // Certificate Download
      const downloadBtn = document.getElementById('downloadAimCertBtn');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
          downloadAimCertificate(this.engine.getFinalResults());
        });
      }

      // Keyboard Controls: Space to Pause/Resume, Esc to Reset
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && this.engine.isActive) {
          e.preventDefault();
          this.engine.isPaused = !this.engine.isPaused;
          if (!this.engine.isPaused) {
            this.engine.lastFrameTime = performance.now();
            this.engine.gameLoop();
          }
        } else if (e.key === 'Escape') {
          this.resetToStartOverlay();
        }
      });

      // Window resize handling
      window.addEventListener('resize', () => {
        if (this.engine) {
          this.engine.setupCanvas();
          this.engine.render();
        }
      });
    },

    startGame() {
      const startOverlay = document.getElementById('startOverlay');
      const resultsWrap = document.getElementById('resultsWrap');
      const arenaWrap = document.getElementById('arenaContainer');

      if (startOverlay) startOverlay.classList.add('hidden');
      if (resultsWrap) resultsWrap.classList.add('hidden');
      if (arenaWrap) arenaWrap.classList.remove('hidden');

      this.engine.start(
        (metrics) => this.onTick(metrics),
        (results) => this.onComplete(results)
      );
    },

    resetToStartOverlay() {
      if (this.engine) {
        this.engine.isActive = false;
        this.engine.isCompleted = false;
        if (this.engine.animFrameId) cancelAnimationFrame(this.engine.animFrameId);
        this.engine.setupCanvas();
        this.engine.render();
      }

      const startOverlay = document.getElementById('startOverlay');
      const resultsWrap = document.getElementById('resultsWrap');
      const hudTimer = document.getElementById('hudAimTimer');
      const hudScore = document.getElementById('hudAimScore');
      const hudHits = document.getElementById('hudAimHits');
      const hudAcc = document.getElementById('hudAimAcc');

      if (startOverlay) startOverlay.classList.remove('hidden');
      if (resultsWrap) resultsWrap.classList.add('hidden');
      if (hudTimer) hudTimer.textContent = `${this.engine.duration}s`;
      if (hudScore) hudScore.textContent = '0';
      if (hudHits) hudHits.textContent = '0';
      if (hudAcc) hudAcc.textContent = '100%';
    },

    onTick(metrics) {
      const hudTimer = document.getElementById('hudAimTimer');
      const hudScore = document.getElementById('hudAimScore');
      const hudHits = document.getElementById('hudAimHits');
      const hudAcc = document.getElementById('hudAimAcc');

      if (hudTimer) hudTimer.textContent = `${metrics.remainingSeconds}s`;
      if (hudScore) hudScore.textContent = metrics.score.toLocaleString();
      if (hudHits) hudHits.textContent = metrics.hits.toString();
      if (hudAcc) hudAcc.textContent = `${metrics.accuracy}%`;
    },

    onComplete(results) {
      const startOverlay = document.getElementById('startOverlay');
      const resultsWrap = document.getElementById('resultsWrap');

      if (startOverlay) startOverlay.classList.add('hidden');
      if (resultsWrap) resultsWrap.classList.remove('hidden');

      // Populate Result Stats
      const resScore = document.getElementById('resAimScore');
      const resAcc = document.getElementById('resAimAcc');
      const resTps = document.getElementById('resAimTps');
      const resReaction = document.getElementById('resAimReaction');
      const resHits = document.getElementById('resAimHits');
      const resStreak = document.getElementById('resAimStreak');
      const resTier = document.getElementById('resAimTier');
      const resPercentile = document.getElementById('resAimPercentile');
      const resDesc = document.getElementById('resAimDesc');

      if (resScore) resScore.textContent = results.score.toLocaleString();
      if (resAcc) resAcc.textContent = `${results.accuracy}%`;
      if (resTps) resTps.textContent = results.tps.toString();
      if (resReaction) resReaction.textContent = typeof results.avgReaction === 'number' ? `${results.avgReaction}ms` : results.avgReaction;
      if (resHits) resHits.textContent = results.hits.toString();
      if (resStreak) resStreak.textContent = results.maxStreak.toString().endsWith('s') ? results.maxStreak.toString() : `${results.maxStreak}x`;
      if (resTier) resTier.textContent = results.rank.tier;
      if (resPercentile) resPercentile.textContent = results.rank.percentile;
      if (resDesc) resDesc.textContent = results.rank.desc;

      setTimeout(() => {
        if (resultsWrap) resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    },

    bindSensitivityConverter() {
      const sensInput = document.getElementById('sensSourceVal');
      const gameSelect = document.getElementById('sensSourceGame');
      const dpiInput = document.getElementById('sensDpi');

      const outVal = document.getElementById('outValorant');
      const outCs = document.getElementById('outCs2');
      const outOw = document.getElementById('outOverwatch');
      const outEdpi = document.getElementById('outEdpi');

      const updateSens = () => {
        if (!sensInput || !gameSelect || !dpiInput) return;
        const val = parseFloat(sensInput.value) || 1.0;
        const game = gameSelect.value;
        const dpi = parseInt(dpiInput.value) || 800;

        // Convert input into CS2 base sensitivity
        let cs2Sens = val;
        if (game === 'valorant') {
          cs2Sens = val * 3.181818;
        } else if (game === 'overwatch') {
          cs2Sens = val / 3.333333;
        } else if (game === 'r6') {
          cs2Sens = val / 3.84;
        }

        const valorant = (cs2Sens / 3.181818).toFixed(3);
        const cs2 = cs2Sens.toFixed(3);
        const overwatch = (cs2Sens * 3.333333).toFixed(2);
        const edpi = Math.round(val * dpi);

        if (outVal) outVal.textContent = valorant;
        if (outCs) outCs.textContent = cs2;
        if (outOw) outOw.textContent = overwatch;
        if (outEdpi) outEdpi.textContent = edpi.toString();
      };

      if (sensInput) sensInput.addEventListener('input', updateSens);
      if (gameSelect) gameSelect.addEventListener('change', updateSens);
      if (dpiInput) dpiInput.addEventListener('input', updateSens);

      updateSens();
    }
  };

  // Safe DOM Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AimApp.init());
  } else {
    AimApp.init();
  }
})();
