/**
 * Clinical TDEE, BMR & Neuro-Metabolic Calorie Engine
 * Features:
 * - Mifflin-St Jeor (Gold Standard), Katch-McArdle (LBM), and Oxford/Schofield BMR formulas
 * - Dual Unit System: Metric (kg/cm) and Imperial (lbs/ft-in) with bidirectional sync
 * - US Navy Body Fat Percentage Calculator (Neck, Waist, Hip)
 * - 5 Goal Presets: Maintenance, Mild Cut (-10%), Standard Cut (-20%), Aggressive Cut (-25%), Lean Bulk (+10%), Heavy Bulk (+20%)
 * - 4 Macro Diet Protocols: High Protein, Balanced, Low-Carb/Keto, Endurance
 * - Neuro-Metabolic Brain Energy & Glucose Consumption Index (~20% of BMR)
 * - Interactive 60FPS High-DPI Canvas Macro Doughnut Chart
 */

(function () {
  'use strict';

  /* =========================================================
     1. CLINICAL CALCULATION ENGINE
     ========================================================= */
  class CalorieEngine {
    constructor() {
      this.unit = 'metric'; // 'metric' | 'imperial'
      this.gender = 'male'; // 'male' | 'female'
      this.age = 28;
      this.weightKg = 75;
      this.heightCm = 178;
      this.activity = 1.55; // Moderately Active
      this.bodyFat = null; // optional percentage
      this.goal = 'maintenance'; // 'maintenance', 'mild-cut', 'standard-cut', 'aggressive-cut', 'lean-bulk', 'heavy-bulk'
      this.dietProtocol = 'balanced'; // 'high-protein', 'balanced', 'keto', 'endurance'

      // US Navy Circumferences (cm)
      this.neckCm = 38;
      this.waistCm = 84;
      this.hipCm = 98;
    }

    // Setters with auto-conversions
    setMetric(weightKg, heightCm, age, gender, activity, bodyFat) {
      this.unit = 'metric';
      this.weightKg = Math.max(25, Math.min(300, weightKg));
      this.heightCm = Math.max(80, Math.min(250, heightCm));
      this.age = Math.max(12, Math.min(110, age));
      this.gender = gender;
      this.activity = activity;
      this.bodyFat = bodyFat && bodyFat > 3 && bodyFat < 60 ? bodyFat : null;
    }

    setImperial(weightLbs, heightFeet, heightInches, age, gender, activity, bodyFat) {
      this.unit = 'imperial';
      const totalInches = (heightFeet * 12) + heightInches;
      this.heightCm = totalInches * 2.54;
      this.weightKg = weightLbs * 0.45359237;
      this.age = Math.max(12, Math.min(110, age));
      this.gender = gender;
      this.activity = activity;
      this.bodyFat = bodyFat && bodyFat > 3 && bodyFat < 60 ? bodyFat : null;
    }

    /* ---------------------------------------------------------
       BMR Equations
       --------------------------------------------------------- */
    // 1. Mifflin-St Jeor (Clinical Gold Standard)
    getMifflinBMR() {
      const w = this.weightKg;
      const h = this.heightCm;
      const a = this.age;
      if (this.gender === 'male') {
        return Math.round(10 * w + 6.25 * h - 5 * a + 5);
      } else {
        return Math.round(10 * w + 6.25 * h - 5 * a - 161);
      }
    }

    // 2. Katch-McArdle (Uses Lean Body Mass)
    getKatchBMR() {
      if (!this.bodyFat) return this.getMifflinBMR();
      const lbmKg = this.weightKg * (1 - this.bodyFat / 100);
      return Math.round(370 + 21.6 * lbmKg);
    }

    // 3. Oxford / Schofield Equation
    getOxfordBMR() {
      const w = this.weightKg;
      const a = this.age;
      if (this.gender === 'male') {
        if (a < 30) return Math.round(15.057 * w + 692.2);
        if (a < 60) return Math.round(11.472 * w + 873.1);
        return Math.round(11.711 * w + 587.7);
      } else {
        if (a < 30) return Math.round(14.818 * w + 486.6);
        if (a < 60) return Math.round(8.126 * w + 845.6);
        return Math.round(9.082 * w + 658.5);
      }
    }

    getPrimaryBMR() {
      // Use Katch-McArdle if body fat is known, otherwise Mifflin-St Jeor
      return this.bodyFat ? this.getKatchBMR() : this.getMifflinBMR();
    }

    /* ---------------------------------------------------------
       TDEE & Goal Calories
       --------------------------------------------------------- */
    getTDEE() {
      const bmr = this.getPrimaryBMR();
      return Math.round(bmr * this.activity);
    }

    getTargetCalories() {
      const tdee = this.getTDEE();
      switch (this.goal) {
        case 'mild-cut':
          return {
            calories: Math.round(tdee * 0.90),
            delta: -Math.round(tdee * 0.10),
            weeklyWeightChangeKg: -0.25,
            desc: 'Defisit Ringan (-10%) · Penurunan lemak berkelanjutan dengan retensi kekuatan puncak'
          };
        case 'standard-cut':
          return {
            calories: Math.round(tdee * 0.80),
            delta: -Math.round(tdee * 0.20),
            weeklyWeightChangeKg: -0.50,
            desc: 'Defisit Standar (-20%) · Standar emas penurunan lemak klinis (1 pon / minggu)'
          };
        case 'aggressive-cut':
          return {
            calories: Math.round(tdee * 0.75),
            delta: -Math.round(tdee * 0.25),
            weeklyWeightChangeKg: -0.75,
            desc: 'Defisit Agresif (-25%) · Pemangkasan cepat dengan kewajiban asupan protein tinggi'
          };
        case 'lean-bulk':
          return {
            calories: Math.round(tdee * 1.10),
            delta: Math.round(tdee * 0.10),
            weeklyWeightChangeKg: 0.25,
            desc: 'Surplus Ramping (+10%) · Hipertrofi bersih dengan penambahan lemak minimal'
          };
        case 'heavy-bulk':
          return {
            calories: Math.round(tdee * 1.20),
            delta: Math.round(tdee * 0.20),
            weeklyWeightChangeKg: 0.50,
            desc: 'Surplus Agresif (+20%) · Peningkatan kekuatan dan otot maksimal'
          };
        case 'maintenance':
        default:
          return {
            calories: tdee,
            delta: 0,
            weeklyWeightChangeKg: 0,
            desc: 'Pemeliharaan (0 kcal) · Keseimbangan metabolik dan komposisi ulang tubuh'
          };
      }
    }

    /* ---------------------------------------------------------
       US Navy Body Fat Calculation
       --------------------------------------------------------- */
    calculateNavyBodyFat(neckCm, waistCm, hipCm) {
      const h = this.heightCm;
      if (this.gender === 'male') {
        const diff = waistCm - neckCm;
        if (diff <= 0) return null;
        const bf = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(h)) - 450;
        return Math.max(4, Math.min(55, Math.round(bf * 10) / 10));
      } else {
        const sumDiff = waistCm + (hipCm || waistCm * 1.15) - neckCm;
        if (sumDiff <= 0) return null;
        const bf = 495 / (1.29579 - 0.35004 * Math.log10(sumDiff) + 0.22100 * Math.log10(h)) - 450;
        return Math.max(8, Math.min(60, Math.round(bf * 10) / 10));
      }
    }

    /* ---------------------------------------------------------
       Macronutrient Grams & Calories Splitter
       --------------------------------------------------------- */
    getMacroSplit(targetCalories) {
      const w = this.weightKg;
      let proteinG = 0, fatG = 0, carbG = 0;

      switch (this.dietProtocol) {
        case 'high-protein':
          // 2.2g per kg bodyweight, 25% calories from fat, remainder from carbs
          proteinG = Math.round(2.2 * w);
          fatG = Math.round((targetCalories * 0.25) / 9);
          const remCaloriesHP = targetCalories - (proteinG * 4 + fatG * 9);
          carbG = Math.max(20, Math.round(remCaloriesHP / 4));
          break;

        case 'keto':
          // 25% protein, 70% fat, 5% carbs
          proteinG = Math.round((targetCalories * 0.25) / 4);
          fatG = Math.round((targetCalories * 0.70) / 9);
          carbG = Math.max(15, Math.round((targetCalories * 0.05) / 4));
          break;

        case 'endurance':
          // 20% protein, 20% fat, 60% carbs
          proteinG = Math.round((targetCalories * 0.20) / 4);
          fatG = Math.round((targetCalories * 0.20) / 9);
          carbG = Math.round((targetCalories * 0.60) / 4);
          break;

        case 'balanced':
        default:
          // 30% protein, 30% fat, 40% carbs
          proteinG = Math.round((targetCalories * 0.30) / 4);
          fatG = Math.round((targetCalories * 0.30) / 9);
          carbG = Math.round((targetCalories * 0.40) / 4);
          break;
      }

      const proteinKcal = proteinG * 4;
      const fatKcal = fatG * 9;
      const carbKcal = carbG * 4;
      const totalKcal = proteinKcal + fatKcal + carbKcal;

      return {
        protein: { grams: proteinG, calories: proteinKcal, percent: Math.round((proteinKcal / totalKcal) * 100) },
        fat: { grams: fatG, calories: fatKcal, percent: Math.round((fatKcal / totalKcal) * 100) },
        carbs: { grams: carbG, calories: carbKcal, percent: Math.round((carbKcal / totalKcal) * 100) },
        totalKcal
      };
    }

    /* ---------------------------------------------------------
       Neuro-Metabolic Brain Glucose & Energy Index
       --------------------------------------------------------- */
    getNeuroMetabolicMetrics() {
      const bmr = this.getPrimaryBMR();
      // The human brain consumes ~20% of basal metabolic energy
      const brainKcal = Math.round(bmr * 0.20);
      const brainGlucoseGrams = Math.round(brainKcal / 4.0); // 4 kcal per gram glucose
      const brainPercentOfBMR = 20;

      return {
        brainKcal,
        brainGlucoseGrams,
        brainPercentOfBMR,
        brainHourlyWatts: (brainKcal / 24 * 1.163).toFixed(1), // Watts power consumption
        desc: 'Otak manusia mencakup ~2% dari massa tubuh namun mengonsumsi 20% energi metabolik saat istirahat (perfusi glukosa berkelanjutan).'
      };
    }

    /* ---------------------------------------------------------
       BMI and Health Classification
       --------------------------------------------------------- */
    getBMI() {
      const hM = this.heightCm / 100;
      const bmi = this.weightKg / (hM * hM);
      const rounded = Math.round(bmi * 10) / 10;

      let category = 'Berat Badan Normal';
      let colorClass = 'text-emerald-500';
      if (rounded < 18.5) {
        category = 'Kekurangan Berat Badan';
        colorClass = 'text-amber-500';
      } else if (rounded >= 25 && rounded < 29.9) {
        category = 'Kelebihan Berat Badan';
        colorClass = 'text-amber-500';
      } else if (rounded >= 30) {
        category = 'Obesitas (Kelas I+)';
        colorClass = 'text-rose-500';
      }

      return {
        value: rounded,
        category,
        colorClass
      };
    }
  }

  /* =========================================================
     2. 60 FPS INTERACTIVE MACRO DOUGHNUT CHART
     ========================================================= */
  class MacroChart {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.dpr = window.devicePixelRatio || 1;
      this.animProgress = 0;
      this.animFrameId = null;
      this.currentData = { protein: 30, fat: 30, carbs: 40 };

      this.setupCanvas();
    }

    setupCanvas() {
      const rect = this.canvas.getBoundingClientRect();
      const size = Math.min(rect.width || 240, 240);

      this.dpr = window.devicePixelRatio || 1;
      this.size = size;
      this.canvas.width = size * this.dpr;
      this.canvas.height = size * this.dpr;
      this.canvas.style.width = size + 'px';
      this.canvas.style.height = size + 'px';

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    draw(macros, animate = true) {
      this.currentData = {
        protein: macros.protein.percent,
        fat: macros.fat.percent,
        carbs: macros.carbs.percent,
        totalKcal: macros.totalKcal
      };

      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }

      if (!animate) {
        this.renderFrame(1.0);
        return;
      }

      let start = null;
      const duration = 400;

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1.0);
        const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        this.renderFrame(ease);
        if (progress < 1.0) {
          this.animFrameId = requestAnimationFrame(step);
        } else {
          this.animFrameId = null;
        }
      };
      this.animFrameId = requestAnimationFrame(step);
    }

    renderFrame(progress) {
      const ctx = this.ctx;
      const s = this.size;
      const center = s / 2;
      const radius = s * 0.42;
      const innerRadius = s * 0.28;

      ctx.clearRect(0, 0, s, s);

      const slices = [
        { percent: this.currentData.protein, color: '#10b981' }, // Emerald Protein
        { percent: this.currentData.fat, color: '#f59e0b' },     // Amber Fat
        { percent: this.currentData.carbs, color: '#06b6d4' }    // Cyan Carbs
      ];

      let currentAngle = -Math.PI / 2;

      slices.forEach((sl) => {
        const sliceAngle = (sl.percent / 100) * (Math.PI * 2) * progress;

        ctx.beginPath();
        ctx.arc(center, center, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(center, center, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = sl.color;
        ctx.fill();

        currentAngle += sliceAngle;
      });

      // Center Calorie Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px ui-sans-serif, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.currentData.totalKcal || '0', center, center - 6);

      ctx.fillStyle = '#71717a';
      ctx.font = '600 10px JetBrains Mono, monospace';
      ctx.fillText('KCAL', center, center + 14);
    }
  }

  /* =========================================================
     3. UI CONTROLLER & DOM BINDINGS
     ========================================================= */
  const CalorieApp = {
    engine: null,
    chart: null,

    init() {
      this.engine = new CalorieEngine();

      const canvas = document.getElementById('macroChartCanvas');
      if (canvas) {
        this.chart = new MacroChart(canvas);
      }

      this.bindDOM();
      this.calculate();
    },

    bindDOM() {
      // Unit Toggle (Metric / Imperial)
      document.querySelectorAll('.cal-unit-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.cal-unit-btn').forEach((b) => b.classList.remove('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40'));
          btn.classList.add('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40');

          const unit = btn.dataset.unit;
          const metricWrap = document.getElementById('metricInputsWrap');
          const imperialWrap = document.getElementById('imperialInputsWrap');

          if (unit === 'metric') {
            if (metricWrap) metricWrap.classList.remove('hidden');
            if (imperialWrap) imperialWrap.classList.add('hidden');
          } else {
            if (metricWrap) metricWrap.classList.add('hidden');
            if (imperialWrap) imperialWrap.classList.remove('hidden');
          }
          this.engine.unit = unit;
          this.calculate();
        });
      });

      // Gender Selector
      document.querySelectorAll('.cal-gender-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.cal-gender-btn').forEach((b) => b.classList.remove('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40'));
          btn.classList.add('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40');
          this.engine.gender = btn.dataset.gender;

          const femaleHipWrap = document.getElementById('femaleHipWrap');
          if (femaleHipWrap) {
            if (btn.dataset.gender === 'female') femaleHipWrap.classList.remove('hidden');
            else femaleHipWrap.classList.add('hidden');
          }
          this.calculate();
        });
      });

      // Goal Selector Buttons
      document.querySelectorAll('.cal-goal-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.cal-goal-btn').forEach((b) => b.classList.remove('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40'));
          btn.classList.add('active', 'bg-blue-600/10', 'text-blue-600', 'border-blue-600/40', 'dark:bg-blue-500/20', 'dark:text-blue-400', 'dark:border-blue-500/40');
          this.engine.goal = btn.dataset.goal;
          this.calculate();
        });
      });

      // Diet Protocol Selector Buttons
      document.querySelectorAll('.cal-diet-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.cal-diet-btn').forEach((b) => b.classList.remove('active', 'bg-zinc-800', 'text-white'));
          btn.classList.add('active', 'bg-zinc-800', 'text-white');
          this.engine.dietProtocol = btn.dataset.diet;
          this.calculate();
        });
      });

      // Inputs Auto-calculate on Change
      const inputIds = [
        'calAge', 'calWeightMetric', 'calHeightMetric', 'calBodyFat',
        'calWeightImperial', 'calHeightFeet', 'calHeightInches', 'calActivity',
        'navyNeck', 'navyWaist', 'navyHip'
      ];

      inputIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('input', () => this.calculate());
        }
      });

      // Navy Body Fat Estimate Button
      const calcNavyBtn = document.getElementById('calcNavyBfBtn');
      if (calcNavyBtn) {
        calcNavyBtn.addEventListener('click', () => {
          const neck = parseFloat(document.getElementById('navyNeck')?.value) || 38;
          const waist = parseFloat(document.getElementById('navyWaist')?.value) || 84;
          const hip = parseFloat(document.getElementById('navyHip')?.value) || 98;
          const bf = this.engine.calculateNavyBodyFat(neck, waist, hip);

          if (bf) {
            const bfInput = document.getElementById('calBodyFat');
            if (bfInput) bfInput.value = bf;
            const bfBadge = document.getElementById('navyBfResultBadge');
            if (bfBadge) {
              bfBadge.textContent = `${bf}% Lemak Tubuh Diterapkan`;
              bfBadge.classList.remove('hidden');
            }
            this.calculate();
          }
        });
      }

      // Window resize for chart
      window.addEventListener('resize', () => {
        if (this.chart) {
          this.chart.setupCanvas();
          this.calculate(false);
        }
      });
    },

    calculate(animateChart = true) {
      const age = parseInt(document.getElementById('calAge')?.value, 10) || 28;
      const activity = parseFloat(document.getElementById('calActivity')?.value) || 1.55;
      const bodyFat = parseFloat(document.getElementById('calBodyFat')?.value) || null;

      if (this.engine.unit === 'metric') {
        const weightKg = parseFloat(document.getElementById('calWeightMetric')?.value) || 75;
        const heightCm = parseFloat(document.getElementById('calHeightMetric')?.value) || 178;
        this.engine.setMetric(weightKg, heightCm, age, this.engine.gender, activity, bodyFat);
      } else {
        const weightLbs = parseFloat(document.getElementById('calWeightImperial')?.value) || 165;
        const feet = parseInt(document.getElementById('calHeightFeet')?.value, 10) || 5;
        const inches = parseInt(document.getElementById('calHeightInches')?.value, 10) || 10;
        this.engine.setImperial(weightLbs, feet, inches, age, this.engine.gender, activity, bodyFat);
      }

      // Calculations
      const bmrMifflin = this.engine.getMifflinBMR();
      const bmrKatch = this.engine.getKatchBMR();
      const bmrOxford = this.engine.getOxfordBMR();
      const primaryBmr = this.engine.getPrimaryBMR();
      const tdee = this.engine.getTDEE();
      const target = this.engine.getTargetCalories();
      const macros = this.engine.getMacroSplit(target.calories);
      const neuro = this.engine.getNeuroMetabolicMetrics();
      const bmi = this.engine.getBMI();

      // Update DOM Text
      this.updateElement('resTdeeVal', tdee.toLocaleString());
      this.updateElement('resBmrVal', primaryBmr.toLocaleString());
      this.updateElement('resTargetCalories', target.calories.toLocaleString());
      this.updateElement('resGoalDesc', target.desc);
      this.updateElement('resDeltaVal', target.delta > 0 ? `+${target.delta} kcal` : `${target.delta} kcal`);

      // BMR Formula Comparison Box
      this.updateElement('bmrMifflinVal', `${bmrMifflin.toLocaleString()} kcal`);
      this.updateElement('bmrKatchVal', `${bmrKatch.toLocaleString()} kcal`);
      this.updateElement('bmrOxfordVal', `${bmrOxford.toLocaleString()} kcal`);

      // BMI Box
      this.updateElement('resBmiVal', bmi.value.toString());
      this.updateElement('resBmiCategory', bmi.category);
      const bmiEl = document.getElementById('resBmiCategory');
      if (bmiEl) {
        bmiEl.className = `text-xs font-bold ${bmi.colorClass}`;
      }

      // Macronutrient Grams & Percentages
      this.updateElement('macroProteinGrams', `${macros.protein.grams}g`);
      this.updateElement('macroProteinKcal', `${macros.protein.calories} kcal (${macros.protein.percent}%)`);

      this.updateElement('macroFatGrams', `${macros.fat.grams}g`);
      this.updateElement('macroFatKcal', `${macros.fat.calories} kcal (${macros.fat.percent}%)`);

      this.updateElement('macroCarbGrams', `${macros.carbs.grams}g`);
      this.updateElement('macroCarbKcal', `${macros.carbs.calories} kcal (${macros.carbs.percent}%)`);

      // Neuro-Metabolic Brain Stats
      this.updateElement('neuroBrainKcal', `${neuro.brainKcal} kcal/day`);
      this.updateElement('neuroBrainGlucose', `${neuro.brainGlucoseGrams}g pure glucose`);
      this.updateElement('neuroBrainWatts', `${neuro.brainHourlyWatts} Watts`);

      // Draw Macro Doughnut Chart
      if (this.chart) {
        this.chart.draw(macros, animateChart);
      }
    },

    updateElement(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
  };

  // Safe DOM Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CalorieApp.init());
  } else {
    CalorieApp.init();
  }
})();
