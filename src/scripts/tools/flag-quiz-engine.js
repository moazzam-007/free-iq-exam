/**
 * World Flag Quiz & Geographic Memory Arena Engine
 * 100% Client-side interactive engine featuring:
 * - 195+ Sovereign Nations comprehensive database (ISO, Name, Capital, Continent, Flag SVG/PNG)
 * - Multiple Game Modes: 20-Question Sprint, Endless Survival (Sudden Death), Reverse Mode, Vexillology Hard Mode
 * - Continental Filters: All World, Europe, Asia, Americas, Africa, Oceania
 * - Web Audio API sound synthesis (combo ascending chimes & miss acoustics)
 * - Kinematic Metrics: Final Score, Percentile Rank, Accuracy %, Avg Reaction Time (ms), Regional Mastery Breakdown
 * - End-of-Round Review Screen for missed flags with vexillological explanations
 */

(function () {
  'use strict';

  /* =========================================================
     1. COMPREHENSIVE 195+ NATIONS DATABASE
     ========================================================= */
  const COUNTRIES_DB = [
    // Europe
    { code: 'fr', name: 'France', capital: 'Paris', continent: 'Europe', hardPair: null },
    { code: 'de', name: 'Germany', capital: 'Berlin', continent: 'Europe', hardPair: null },
    { code: 'it', name: 'Italy', capital: 'Rome', continent: 'Europe', hardPair: 'ireland' },
    { code: 'es', name: 'Spain', capital: 'Madrid', continent: 'Europe', hardPair: null },
    { code: 'gb', name: 'United Kingdom', capital: 'London', continent: 'Europe', hardPair: null },
    { code: 'pt', name: 'Portugal', capital: 'Lisbon', continent: 'Europe', hardPair: null },
    { code: 'nl', name: 'Netherlands', capital: 'Amsterdam', continent: 'Europe', hardPair: 'luxembourg' },
    { code: 'be', name: 'Belgium', capital: 'Brussels', continent: 'Europe', hardPair: 'germany' },
    { code: 'ch', name: 'Switzerland', capital: 'Bern', continent: 'Europe', hardPair: null },
    { code: 'at', name: 'Austria', capital: 'Vienna', continent: 'Europe', hardPair: 'latvia' },
    { code: 'se', name: 'Sweden', capital: 'Stockholm', continent: 'Europe', hardPair: 'nordic' },
    { code: 'no', name: 'Norway', capital: 'Oslo', continent: 'Europe', hardPair: 'iceland' },
    { code: 'fi', name: 'Finland', capital: 'Helsinki', continent: 'Europe', hardPair: 'nordic' },
    { code: 'dk', name: 'Denmark', capital: 'Copenhagen', continent: 'Europe', hardPair: 'nordic' },
    { code: 'is', name: 'Iceland', capital: 'Reykjavik', continent: 'Europe', hardPair: 'norway' },
    { code: 'ie', name: 'Ireland', capital: 'Dublin', continent: 'Europe', hardPair: 'cote_divoire' },
    { code: 'pl', name: 'Poland', capital: 'Warsaw', continent: 'Europe', hardPair: 'indonesia' },
    { code: 'cz', name: 'Czech Republic', capital: 'Prague', continent: 'Europe', hardPair: null },
    { code: 'gr', name: 'Greece', capital: 'Athens', continent: 'Europe', hardPair: null },
    { code: 'hu', name: 'Hungary', capital: 'Budapest', continent: 'Europe', hardPair: 'italy' },
    { code: 'ro', name: 'Romania', capital: 'Bucharest', continent: 'Europe', hardPair: 'chad' },
    { code: 'bg', name: 'Bulgaria', capital: 'Sofia', continent: 'Europe', hardPair: null },
    { code: 'ua', name: 'Ukraine', capital: 'Kyiv', continent: 'Europe', hardPair: null },
    { code: 'hr', name: 'Croatia', capital: 'Zagreb', continent: 'Europe', hardPair: null },
    { code: 'rs', name: 'Serbia', capital: 'Belgrade', continent: 'Europe', hardPair: 'russia' },
    { code: 'sk', name: 'Slovakia', capital: 'Bratislava', continent: 'Europe', hardPair: 'slovenia' },
    { code: 'si', name: 'Slovenia', capital: 'Ljubljana', continent: 'Europe', hardPair: 'slovakia' },
    { code: 'lu', name: 'Luxembourg', capital: 'Luxembourg City', continent: 'Europe', hardPair: 'netherlands' },
    { code: 'mc', name: 'Monaco', capital: 'Monaco', continent: 'Europe', hardPair: 'indonesia' },
    { code: 'ee', name: 'Estonia', capital: 'Tallinn', continent: 'Europe', hardPair: null },
    { code: 'lv', name: 'Latvia', capital: 'Riga', continent: 'Europe', hardPair: 'austria' },
    { code: 'lt', name: 'Lithuania', capital: 'Vilnius', continent: 'Europe', hardPair: null },
    { code: 'cy', name: 'Cyprus', capital: 'Nicosia', continent: 'Europe', hardPair: null },
    { code: 'mt', name: 'Malta', capital: 'Valletta', continent: 'Europe', hardPair: null },
    { code: 'al', name: 'Albania', capital: 'Tirana', continent: 'Europe', hardPair: null },
    { code: 'ba', name: 'Bosnia and Herzegovina', capital: 'Sarajevo', continent: 'Europe', hardPair: null },
    { code: 'mk', name: 'North Macedonia', capital: 'Skopje', continent: 'Europe', hardPair: null },
    { code: 'me', name: 'Montenegro', capital: 'Podgorica', continent: 'Europe', hardPair: null },
    { code: 'md', name: 'Moldova', capital: 'Chisinau', continent: 'Europe', hardPair: 'andorra' },
    { code: 'by', name: 'Belarus', capital: 'Minsk', continent: 'Europe', hardPair: null },
    { code: 'va', name: 'Vatican City', capital: 'Vatican City', continent: 'Europe', hardPair: null },
    { code: 'sm', name: 'San Marino', capital: 'San Marino', continent: 'Europe', hardPair: null },
    { code: 'li', name: 'Liechtenstein', capital: 'Vaduz', continent: 'Europe', hardPair: 'haiti' },
    { code: 'ad', name: 'Andorra', capital: 'Andorra la Vella', continent: 'Europe', hardPair: 'moldova' },

    // Asia
    { code: 'jp', name: 'Japan', capital: 'Tokyo', continent: 'Asia', hardPair: 'bangladesh' },
    { code: 'cn', name: 'China', capital: 'Beijing', continent: 'Asia', hardPair: 'vietnam' },
    { code: 'in', name: 'India', capital: 'New Delhi', continent: 'Asia', hardPair: 'niger' },
    { code: 'kr', name: 'South Korea', capital: 'Seoul', continent: 'Asia', hardPair: null },
    { code: 'id', name: 'Indonesia', capital: 'Jakarta', continent: 'Asia', hardPair: 'monaco' },
    { code: 'sa', name: 'Saudi Arabia', capital: 'Riyadh', continent: 'Asia', hardPair: null },
    { code: 'ae', name: 'United Arab Emirates', capital: 'Abu Dhabi', continent: 'Asia', hardPair: 'pan_arab' },
    { code: 'th', name: 'Thailand', capital: 'Bangkok', continent: 'Asia', hardPair: 'costa_rica' },
    { code: 'vn', name: 'Vietnam', capital: 'Hanoi', continent: 'Asia', hardPair: 'china' },
    { code: 'ph', name: 'Philippines', capital: 'Manila', continent: 'Asia', hardPair: null },
    { code: 'my', name: 'Malaysia', capital: 'Kuala Lumpur', continent: 'Asia', hardPair: 'united_states' },
    { code: 'sg', name: 'Singapore', capital: 'Singapore', continent: 'Asia', hardPair: null },
    { code: 'tr', name: 'Turkey', capital: 'Ankara', continent: 'Asia', hardPair: 'tunisia' },
    { code: 'il', name: 'Israel', capital: 'Jerusalem', continent: 'Asia', hardPair: null },
    { code: 'pk', name: 'Pakistan', capital: 'Islamabad', continent: 'Asia', hardPair: null },
    { code: 'bd', name: 'Bangladesh', capital: 'Dhaka', continent: 'Asia', hardPair: 'japan' },
    { code: 'ir', name: 'Iran', capital: 'Tehran', continent: 'Asia', hardPair: null },
    { code: 'iq', name: 'Iraq', capital: 'Baghdad', continent: 'Asia', hardPair: 'syria' },
    { code: 'qa', name: 'Qatar', capital: 'Doha', continent: 'Asia', hardPair: 'bahrain' },
    { code: 'bh', name: 'Bahrain', capital: 'Manama', continent: 'Asia', hardPair: 'qatar' },
    { code: 'kw', name: 'Kuwait', capital: 'Kuwait City', continent: 'Asia', hardPair: 'pan_arab' },
    { code: 'om', name: 'Oman', capital: 'Muscat', continent: 'Asia', hardPair: null },
    { code: 'jo', name: 'Jordan', capital: 'Amman', continent: 'Asia', hardPair: 'palestine' },
    { code: 'lb', name: 'Lebanon', capital: 'Beirut', continent: 'Asia', hardPair: null },
    { code: 'lk', name: 'Sri Lanka', capital: 'Colombo', continent: 'Asia', hardPair: null },
    { code: 'np', name: 'Nepal', capital: 'Kathmandu', continent: 'Asia', hardPair: null },
    { code: 'kz', name: 'Kazakhstan', capital: 'Astana', continent: 'Asia', hardPair: null },
    { code: 'uz', name: 'Uzbekistan', capital: 'Tashkent', continent: 'Asia', hardPair: null },
    { code: 'kh', name: 'Cambodia', capital: 'Phnom Penh', continent: 'Asia', hardPair: null },
    { code: 'mm', name: 'Myanmar', capital: 'Naypyidaw', continent: 'Asia', hardPair: 'lithuania' },
    { code: 'la', name: 'Laos', capital: 'Vientiane', continent: 'Asia', hardPair: null },
    { code: 'mn', name: 'Mongolia', capital: 'Ulaanbaatar', continent: 'Asia', hardPair: null },
    { code: 'ge', name: 'Georgia', capital: 'Tbilisi', continent: 'Asia', hardPair: null },
    { code: 'am', name: 'Armenia', capital: 'Yerevan', continent: 'Asia', hardPair: 'colombia' },
    { code: 'az', name: 'Azerbaijan', capital: 'Baku', continent: 'Asia', hardPair: null },
    { code: 'tw', name: 'Taiwan', capital: 'Taipei', continent: 'Asia', hardPair: null },
    { code: 'kp', name: 'North Korea', capital: 'Pyongyang', continent: 'Asia', hardPair: null },
    { code: 'ye', name: 'Yemen', capital: 'Sana\'a', continent: 'Asia', hardPair: 'egypt' },
    { code: 'sy', name: 'Syria', capital: 'Damascus', continent: 'Asia', hardPair: 'iraq' },
    { code: 'af', name: 'Afghanistan', capital: 'Kabul', continent: 'Asia', hardPair: null },
    { code: 'tm', name: 'Turkmenistan', capital: 'Ashgabat', continent: 'Asia', hardPair: null },
    { code: 'kg', name: 'Kyrgyzstan', capital: 'Bishkek', continent: 'Asia', hardPair: null },
    { code: 'tj', name: 'Tajikistan', capital: 'Dushanbe', continent: 'Asia', hardPair: 'hungary' },
    { code: 'bt', name: 'Bhutan', capital: 'Thimphu', continent: 'Asia', hardPair: null },
    { code: 'mv', name: 'Maldives', capital: 'Male', continent: 'Asia', hardPair: null },
    { code: 'bn', name: 'Brunei', capital: 'Bandar Seri Begawan', continent: 'Asia', hardPair: null },
    { code: 'tl', name: 'Timor-Leste', capital: 'Dili', continent: 'Asia', hardPair: null },

    // Americas
    { code: 'us', name: 'United States', capital: 'Washington, D.C.', continent: 'Americas', hardPair: 'malaysia' },
    { code: 'ca', name: 'Canada', capital: 'Ottawa', continent: 'Americas', hardPair: 'peru' },
    { code: 'mx', name: 'Mexico', capital: 'Mexico City', continent: 'Americas', hardPair: 'italy' },
    { code: 'br', name: 'Brazil', capital: 'Brasilia', continent: 'Americas', hardPair: null },
    { code: 'ar', name: 'Argentina', capital: 'Buenos Aires', continent: 'Americas', hardPair: 'uruguay' },
    { code: 'co', name: 'Colombia', capital: 'Bogota', continent: 'Americas', hardPair: 'ecuador' },
    { code: 'cl', name: 'Chile', capital: 'Santiago', continent: 'Americas', hardPair: 'texas' },
    { code: 'pe', name: 'Peru', capital: 'Lima', continent: 'Americas', hardPair: 'canada' },
    { code: 've', name: 'Venezuela', capital: 'Caracas', continent: 'Americas', hardPair: 'ecuador' },
    { code: 'ec', name: 'Ecuador', capital: 'Quito', continent: 'Americas', hardPair: 'colombia' },
    { code: 'uy', name: 'Uruguay', capital: 'Montevideo', continent: 'Americas', hardPair: 'argentina' },
    { code: 'py', name: 'Paraguay', capital: 'Asuncion', continent: 'Americas', hardPair: 'netherlands' },
    { code: 'bo', name: 'Bolivia', capital: 'La Paz', continent: 'Americas', hardPair: 'ghana' },
    { code: 'cu', name: 'Cuba', capital: 'Havana', continent: 'Americas', hardPair: 'puerto_rico' },
    { code: 'do', name: 'Dominican Republic', capital: 'Santo Domingo', continent: 'Americas', hardPair: null },
    { code: 'pr', name: 'Puerto Rico', capital: 'San Juan', continent: 'Americas', hardPair: 'cuba' },
    { code: 'cr', name: 'Costa Rica', capital: 'San Jose', continent: 'Americas', hardPair: 'thailand' },
    { code: 'pa', name: 'Panama', capital: 'Panama City', continent: 'Americas', hardPair: null },
    { code: 'gt', name: 'Guatemala', capital: 'Guatemala City', continent: 'Americas', hardPair: null },
    { code: 'hn', name: 'Honduras', capital: 'Tegucigalpa', continent: 'Americas', hardPair: 'el_salvador' },
    { code: 'sv', name: 'El Salvador', capital: 'San Salvador', continent: 'Americas', hardPair: 'honduras' },
    { code: 'ni', name: 'Nicaragua', capital: 'Managua', continent: 'Americas', hardPair: 'el_salvador' },
    { code: 'jm', name: 'Jamaica', capital: 'Kingston', continent: 'Americas', hardPair: null },
    { code: 'ht', name: 'Haiti', capital: 'Port-au-Prince', continent: 'Americas', hardPair: 'liechtenstein' },
    { code: 'bs', name: 'Bahamas', capital: 'Nassau', continent: 'Americas', hardPair: null },
    { code: 'tt', name: 'Trinidad and Tobago', capital: 'Port of Spain', continent: 'Americas', hardPair: null },
    { code: 'bb', name: 'Barbados', capital: 'Bridgetown', continent: 'Americas', hardPair: null },
    { code: 'bz', name: 'Belize', capital: 'Belmopan', continent: 'Americas', hardPair: null },
    { code: 'gy', name: 'Guyana', capital: 'Georgetown', continent: 'Americas', hardPair: null },
    { code: 'sr', name: 'Suriname', capital: 'Paramaribo', continent: 'Americas', hardPair: null },
    { code: 'lc', name: 'Saint Lucia', capital: 'Castries', continent: 'Americas', hardPair: null },
    { code: 'vc', name: 'Saint Vincent', capital: 'Kingstown', continent: 'Americas', hardPair: null },
    { code: 'gd', name: 'Grenada', capital: 'St. George\'s', continent: 'Americas', hardPair: null },
    { code: 'ag', name: 'Antigua and Barbuda', capital: 'St. John\'s', continent: 'Americas', hardPair: null },
    { code: 'dm', name: 'Dominica', capital: 'Roseau', continent: 'Americas', hardPair: null },
    { code: 'kn', name: 'Saint Kitts and Nevis', capital: 'Basseterre', continent: 'Americas', hardPair: null },

    // Africa
    { code: 'eg', name: 'Egypt', capital: 'Cairo', continent: 'Africa', hardPair: 'syria' },
    { code: 'za', name: 'South Africa', capital: 'Pretoria', continent: 'Africa', hardPair: null },
    { code: 'ng', name: 'Nigeria', capital: 'Abuja', continent: 'Africa', hardPair: null },
    { code: 'ke', name: 'Kenya', capital: 'Nairobi', continent: 'Africa', hardPair: null },
    { code: 'ma', name: 'Morocco', capital: 'Rabat', continent: 'Africa', hardPair: 'vietnam' },
    { code: 'dz', name: 'Algeria', capital: 'Algiers', continent: 'Africa', hardPair: null },
    { code: 'et', name: 'Ethiopia', capital: 'Addis Ababa', continent: 'Africa', hardPair: 'ghana' },
    { code: 'gh', name: 'Ghana', capital: 'Accra', continent: 'Africa', hardPair: 'bolivia' },
    { code: 'ci', name: 'Ivory Coast (Côte d\'Ivoire)', capital: 'Yamoussoukro', continent: 'Africa', hardPair: 'ireland' },
    { code: 'sn', name: 'Senegal', capital: 'Dakar', continent: 'Africa', hardPair: 'mali' },
    { code: 'ml', name: 'Mali', capital: 'Bamako', continent: 'Africa', hardPair: 'guinea' },
    { code: 'gn', name: 'Guinea', capital: 'Conakry', continent: 'Africa', hardPair: 'mali' },
    { code: 'cm', name: 'Cameroon', capital: 'Yaounde', continent: 'Africa', hardPair: 'senegal' },
    { code: 'tn', name: 'Tunisia', capital: 'Tunis', continent: 'Africa', hardPair: 'turkey' },
    { code: 'tz', name: 'Tanzania', capital: 'Dodoma', continent: 'Africa', hardPair: null },
    { code: 'ug', name: 'Uganda', capital: 'Kampala', continent: 'Africa', hardPair: null },
    { code: 'td', name: 'Chad', capital: 'N\'Djamena', continent: 'Africa', hardPair: 'romania' },
    { code: 'ao', name: 'Angola', capital: 'Luanda', continent: 'Africa', hardPair: null },
    { code: 'zm', name: 'Zambia', capital: 'Lusaka', continent: 'Africa', hardPair: null },
    { code: 'zw', name: 'Zimbabwe', capital: 'Harare', continent: 'Africa', hardPair: null },
    { code: 'cd', name: 'DR Congo', capital: 'Kinshasa', continent: 'Africa', hardPair: null },
    { code: 'cg', name: 'Congo', capital: 'Brazzaville', continent: 'Africa', hardPair: null },
    { code: 'sd', name: 'Sudan', capital: 'Khartoum', continent: 'Africa', hardPair: 'jordan' },
    { code: 'ss', name: 'South Sudan', capital: 'Juba', continent: 'Africa', hardPair: 'kenya' },
    { code: 'rw', name: 'Rwanda', capital: 'Kigali', continent: 'Africa', hardPair: null },
    { code: 'so', name: 'Somalia', capital: 'Mogadishu', continent: 'Africa', hardPair: null },
    { code: 'mz', name: 'Mozambique', capital: 'Maputo', continent: 'Africa', hardPair: null },
    { code: 'mg', name: 'Madagascar', capital: 'Antananarivo', continent: 'Africa', hardPair: null },
    { code: 'bw', name: 'Botswana', capital: 'Gaborone', continent: 'Africa', hardPair: null },
    { code: 'na', name: 'Namibia', capital: 'Windhoek', continent: 'Africa', hardPair: null },
    { code: 'mu', name: 'Mauritius', capital: 'Port Louis', continent: 'Africa', hardPair: null },
    { code: 'ly', name: 'Libya', capital: 'Tripoli', continent: 'Africa', hardPair: null },
    { code: 'ne', name: 'Niger', capital: 'Niamey', continent: 'Africa', hardPair: 'india' },
    { code: 'bf', name: 'Burkina Faso', capital: 'Ouagadougou', continent: 'Africa', hardPair: null },
    { code: 'bj', name: 'Benin', capital: 'Porto-Novo', continent: 'Africa', hardPair: null },
    { code: 'tg', name: 'Togo', capital: 'Lome', continent: 'Africa', hardPair: null },
    { code: 'sl', name: 'Sierra Leone', capital: 'Freetown', continent: 'Africa', hardPair: null },
    { code: 'lr', name: 'Liberia', capital: 'Monrovia', continent: 'Africa', hardPair: 'united_states' },
    { code: 'ga', name: 'Gabon', capital: 'Libreville', continent: 'Africa', hardPair: null },
    { code: 'gq', name: 'Equatorial Guinea', capital: 'Malabo', continent: 'Africa', hardPair: null },
    { code: 'mw', name: 'Malawi', capital: 'Lilongwe', continent: 'Africa', hardPair: null },
    { code: 'er', name: 'Eritrea', capital: 'Asmara', continent: 'Africa', hardPair: null },
    { code: 'dj', name: 'Djibouti', capital: 'Djibouti', continent: 'Africa', hardPair: null },
    { code: 'cv', name: 'Cape Verde', capital: 'Praia', continent: 'Africa', hardPair: null },
    { code: 'sc', name: 'Seychelles', capital: 'Victoria', continent: 'Africa', hardPair: null },

    // Oceania
    { code: 'au', name: 'Australia', capital: 'Canberra', continent: 'Oceania', hardPair: 'new_zealand' },
    { code: 'nz', name: 'New Zealand', capital: 'Wellington', continent: 'Oceania', hardPair: 'australia' },
    { code: 'fj', name: 'Fiji', capital: 'Suva', continent: 'Oceania', hardPair: 'tuvalu' },
    { code: 'pg', name: 'Papua New Guinea', capital: 'Port Moresby', continent: 'Oceania', hardPair: null },
    { code: 'ws', name: 'Samoa', capital: 'Apia', continent: 'Oceania', hardPair: 'taiwan' },
    { code: 'to', name: 'Tonga', capital: 'Nuku\'alofa', continent: 'Oceania', hardPair: null },
    { code: 'vu', name: 'Vanuatu', capital: 'Port Vila', continent: 'Oceania', hardPair: null },
    { code: 'sb', name: 'Solomon Islands', capital: 'Honiara', continent: 'Oceania', hardPair: null },
    { code: 'fm', name: 'Micronesia', capital: 'Palikir', continent: 'Oceania', hardPair: null },
    { code: 'pw', name: 'Palau', capital: 'Ngerulmud', continent: 'Oceania', hardPair: 'japan' },
    { code: 'mh', name: 'Marshall Islands', capital: 'Majuro', continent: 'Oceania', hardPair: null },
    { code: 'ki', name: 'Kiribati', capital: 'South Tarawa', continent: 'Oceania', hardPair: null },
    { code: 'tv', name: 'Tuvalu', capital: 'Funafuti', continent: 'Oceania', hardPair: 'fiji' },
    { code: 'nr', name: 'Nauru', capital: 'Yaren', continent: 'Oceania', hardPair: null }
  ];

  /* =========================================================
     2. WEB AUDIO API SOUND SYNTHESIS
     ========================================================= */
  class QuizAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }

    playCorrect(streak = 0) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const semitone = Math.min(12, streak);
      const baseFreq = 523.25; // C5 note
      const freq1 = baseFreq * Math.pow(2, semitone / 12);
      const freq2 = freq1 * 1.25; // Major third

      // Dual tone harmonic chime
      [freq1, freq2].forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.05);

        gain.gain.setValueAtTime(0.2, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    }

    playWrong() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    }
  }

  /* =========================================================
     3. FLAG QUIZ GAMEPLAY ENGINE
     ========================================================= */
  class FlagQuizEngine {
    constructor() {
      this.mode = 'sprint'; // 'sprint' (20 q's), 'survival' (sudden death), 'hard', 'reverse'
      this.continent = 'all'; // 'all', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'

      this.currentQuestionIndex = 0;
      this.totalQuestions = 20;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.correctCount = 0;
      this.wrongCount = 0;

      this.questionStartTime = 0;
      this.reactionTimes = [];
      this.missedFlags = [];
      this.continentStats = {};

      this.currentQuestion = null;
      this.isAnswerLocked = false;
      this.audio = new QuizAudio();
    }

    getPool() {
      let pool = COUNTRIES_DB;
      if (this.continent !== 'all') {
        pool = pool.filter((c) => c.continent === this.continent);
      }
      if (this.mode === 'hard') {
        pool = pool.filter((c) => c.hardPair !== null);
      }
      return pool.length >= 4 ? pool : COUNTRIES_DB;
    }

    start(mode, continent) {
      this.mode = mode || 'sprint';
      this.continent = continent || 'all';

      this.currentQuestionIndex = 0;
      this.totalQuestions = this.mode === 'survival' ? 999 : 20;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.correctCount = 0;
      this.wrongCount = 0;

      this.reactionTimes = [];
      this.missedFlags = [];
      this.continentStats = {
        Europe: { total: 0, correct: 0 },
        Asia: { total: 0, correct: 0 },
        Americas: { total: 0, correct: 0 },
        Africa: { total: 0, correct: 0 },
        Oceania: { total: 0, correct: 0 }
      };

      this.isAnswerLocked = false;
    }

    getNextQuestion() {
      const pool = this.getPool();
      const target = pool[Math.floor(Math.random() * pool.length)];

      // Generate 3 unique distractors
      const distractors = [];
      const distractorPool = pool.filter((c) => c.code !== target.code);

      while (distractors.length < 3) {
        const rand = distractorPool[Math.floor(Math.random() * distractorPool.length)];
        if (!distractors.some((d) => d.code === rand.code)) {
          distractors.push(rand);
        }
      }

      // Shuffle 4 options
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        target,
        options,
        isReverse: this.mode === 'reverse'
      };

      this.questionStartTime = performance.now();
      this.isAnswerLocked = false;
      this.currentQuestionIndex++;

      return this.currentQuestion;
    }

    submitAnswer(selectedCode) {
      if (this.isAnswerLocked || !this.currentQuestion) return null;
      this.isAnswerLocked = true;

      const elapsed = Math.round(performance.now() - this.questionStartTime);
      this.reactionTimes.push(elapsed);

      const target = this.currentQuestion.target;
      const isCorrect = selectedCode === target.code;

      // Track continent metrics
      if (this.continentStats[target.continent]) {
        this.continentStats[target.continent].total++;
        if (isCorrect) this.continentStats[target.continent].correct++;
      }

      if (isCorrect) {
        this.correctCount++;
        this.streak++;
        this.maxStreak = Math.max(this.maxStreak, this.streak);

        // Speed bonus formula: base 1000 pts + up to 500 bonus for sub-2s answer
        const speedBonus = Math.max(0, Math.round((2500 - elapsed) * 0.4));
        const streakMultiplier = 1 + (this.streak * 0.1);
        const roundPts = Math.round((1000 + speedBonus) * streakMultiplier);

        this.score += roundPts;
        this.audio.playCorrect(this.streak);
      } else {
        this.wrongCount++;
        this.streak = 0;
        this.audio.playWrong();

        const selectedCountry = COUNTRIES_DB.find((c) => c.code === selectedCode);
        this.missedFlags.push({
          target,
          selected: selectedCountry || { name: 'Unknown' },
          reactionTime: elapsed
        });
      }

      const isGameOver = this.mode === 'survival' ? !isCorrect : (this.currentQuestionIndex >= this.totalQuestions);

      return {
        isCorrect,
        correctCode: target.code,
        selectedCode,
        elapsed,
        score: this.score,
        streak: this.streak,
        isGameOver
      };
    }

    getFinalResults() {
      const totalAnswered = this.correctCount + this.wrongCount;
      const accuracy = totalAnswered > 0 ? Math.round((this.correctCount / totalAnswered) * 100) : 0;
      const avgReaction = this.reactionTimes.length > 0
        ? Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length)
        : 0;

      let tier = 'Regional Navigator';
      let percentile = 'Top 45%';
      let desc = 'Solid foundational knowledge of major global sovereign flags.';

      if (this.score >= 35000 || (accuracy >= 95 && this.correctCount >= 20)) {
        tier = 'Vexillological Grandmaster';
        percentile = 'Top 0.8%';
        desc = 'Flawless geographic memory and sub-second visual recall across all continents.';
      } else if (this.score >= 25000 || (accuracy >= 85 && this.correctCount >= 17)) {
        tier = 'Master Geographer';
        percentile = 'Top 6%';
        desc = 'Exceptional spatial recall with rapid target identification on obscure micro-states.';
      } else if (this.score >= 18000 || (accuracy >= 70 && this.correctCount >= 14)) {
        tier = 'Continental Explorer';
        percentile = 'Top 22%';
        desc = 'Strong competence across Europe and the Americas with emerging African mastery.';
      }

      return {
        score: this.score,
        accuracy,
        avgReaction,
        correctCount: this.correctCount,
        wrongCount: this.wrongCount,
        maxStreak: this.maxStreak,
        totalAnswered,
        tier,
        percentile,
        desc,
        missedFlags: this.missedFlags,
        continentStats: this.continentStats
      };
    }
  }

  /* =========================================================
     4. UI CONTROLLER & DOM BINDINGS
     ========================================================= */
  const FlagApp = {
    engine: null,

    init() {
      this.engine = new FlagQuizEngine();
      this.bindDOM();
    },

    bindDOM() {
      // Mode Selector Pills
      document.querySelectorAll('.flag-mode-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.flag-mode-btn').forEach((b) => b.classList.remove('active', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40'));
          btn.classList.add('active', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40');
          this.engine.mode = btn.dataset.mode;
        });
      });

      // Continent Filter Select
      const contSelect = document.getElementById('flagContinentSelect');
      if (contSelect) {
        contSelect.addEventListener('change', (e) => {
          this.engine.continent = e.target.value;
        });
      }

      // Start Quiz Buttons
      const startBtn = document.getElementById('startFlagQuizBtn');
      if (startBtn) {
        startBtn.addEventListener('click', () => this.startSession());
      }

      const retakeBtn = document.getElementById('retakeFlagQuizBtn');
      if (retakeBtn) {
        retakeBtn.addEventListener('click', () => this.startSession());
      }
    },

    startSession() {
      const startCard = document.getElementById('flagStartCard');
      const arenaCard = document.getElementById('flagArenaCard');
      const resultsCard = document.getElementById('flagResultsCard');

      if (startCard) startCard.classList.add('hidden');
      if (resultsCard) resultsCard.classList.add('hidden');
      if (arenaCard) arenaCard.classList.remove('hidden');

      this.engine.start(this.engine.mode, this.engine.continent);
      this.renderNextQuestion();
    },

    renderNextQuestion() {
      const q = this.engine.getNextQuestion();
      if (!q) return;

      const progressEl = document.getElementById('flagQuizProgress');
      const scoreEl = document.getElementById('flagLiveScore');
      const streakEl = document.getElementById('flagLiveStreak');
      const flagImg = document.getElementById('flagTargetImage');
      const countryTitle = document.getElementById('flagCountryTitle');
      const optionsWrap = document.getElementById('flagOptionsGrid');

      if (progressEl) {
        progressEl.textContent = this.engine.mode === 'survival'
          ? `Question ${this.engine.currentQuestionIndex}`
          : `Question ${this.engine.currentQuestionIndex} / ${this.engine.totalQuestions}`;
      }
      if (scoreEl) scoreEl.textContent = this.engine.score.toLocaleString();
      if (streakEl) streakEl.textContent = `${this.engine.streak}x`;

      // Render Target Flag Image (using high-res FlagCDN with instant fallback)
      if (flagImg) {
        flagImg.src = `https://flagcdn.com/w320/${q.target.code}.png`;
        flagImg.alt = `Flag of ${q.target.name}`;
      }

      if (countryTitle) {
        if (q.isReverse) {
          countryTitle.textContent = `Which flag belongs to ${q.target.name}?`;
          countryTitle.classList.remove('hidden');
          if (flagImg) flagImg.classList.add('hidden');
        } else {
          countryTitle.classList.add('hidden');
          if (flagImg) flagImg.classList.remove('hidden');
        }
      }

      // Render 4 Multiple-Choice Buttons
      if (optionsWrap) {
        optionsWrap.innerHTML = '';
        q.options.forEach((opt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'flag-choice-btn w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:bg-zinc-800 text-left font-bold text-sm text-zinc-100 transition-all cursor-pointer flex items-center justify-between';
          btn.dataset.code = opt.code;

          if (q.isReverse) {
            btn.innerHTML = `
              <div class="flex items-center gap-3">
                <img src="https://flagcdn.com/w80/${opt.code}.png" class="w-10 h-6 object-cover rounded shadow-sm" alt="Flag option" />
                <span>${opt.name}</span>
              </div>
            `;
          } else {
            btn.innerHTML = `
              <span>${opt.name}</span>
              <span class="text-xs font-mono text-zinc-500">${opt.capital}</span>
            `;
          }

          btn.addEventListener('click', () => this.handleAnswer(opt.code, btn));
          optionsWrap.appendChild(btn);
        });
      }
    },

    handleAnswer(selectedCode, clickedBtn) {
      if (this.engine.isAnswerLocked) return;
      const res = this.engine.submitAnswer(selectedCode);
      if (!res) return;

      // Color code buttons
      document.querySelectorAll('.flag-choice-btn').forEach((btn) => {
        const code = btn.dataset.code;
        if (code === res.correctCode) {
          btn.classList.add('!bg-emerald-500/20', '!border-emerald-500', '!text-emerald-400');
        } else if (code === res.selectedCode && !res.isCorrect) {
          btn.classList.add('!bg-rose-500/20', '!border-rose-500', '!text-rose-400');
        }
        btn.disabled = true;
      });

      const scoreEl = document.getElementById('flagLiveScore');
      const streakEl = document.getElementById('flagLiveStreak');
      if (scoreEl) scoreEl.textContent = res.score.toLocaleString();
      if (streakEl) streakEl.textContent = `${res.streak}x`;

      setTimeout(() => {
        if (res.isGameOver) {
          this.showResults();
        } else {
          this.renderNextQuestion();
        }
      }, 750);
    },

    showResults() {
      const arenaCard = document.getElementById('flagArenaCard');
      const resultsCard = document.getElementById('flagResultsCard');

      if (arenaCard) arenaCard.classList.add('hidden');
      if (resultsCard) resultsCard.classList.remove('hidden');

      const res = this.engine.getFinalResults();

      this.updateText('resFlagScore', res.score.toLocaleString());
      this.updateText('resFlagTier', res.tier);
      this.updateText('resFlagPercentile', res.percentile);
      this.updateText('resFlagDesc', res.desc);

      this.updateText('resFlagAccuracy', `${res.accuracy}%`);
      this.updateText('resFlagReaction', `${res.avgReaction}ms`);
      this.updateText('resFlagCorrect', `${res.correctCount} / ${res.totalAnswered}`);
      this.updateText('resFlagMaxStreak', `${res.maxStreak}x`);

      // Regional Mastery Breakdown Bars
      const regionsList = document.getElementById('resFlagRegionsList');
      if (regionsList) {
        regionsList.innerHTML = '';
        Object.entries(res.continentStats).forEach(([region, stats]) => {
          if (stats.total === 0) return;
          const pct = Math.round((stats.correct / stats.total) * 100);
          const row = document.createElement('div');
          row.className = 'p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-1';
          row.innerHTML = `
            <div class="flex justify-between font-sans">
              <span class="font-bold text-zinc-300">${region}</span>
              <span class="font-bold text-emerald-400">${pct}% (${stats.correct}/${stats.total})</span>
            </div>
            <div class="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: ${pct}%"></div>
            </div>
          `;
          regionsList.appendChild(row);
        });
      }

      // Review Missed Flags List
      const missedWrap = document.getElementById('resFlagMissedWrap');
      const missedList = document.getElementById('resFlagMissedList');

      if (res.missedFlags.length > 0 && missedWrap && missedList) {
        missedWrap.classList.remove('hidden');
        missedList.innerHTML = '';
        res.missedFlags.forEach((m) => {
          const item = document.createElement('div');
          item.className = 'p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs';
          item.innerHTML = `
            <div class="flex items-center gap-3">
              <img src="https://flagcdn.com/w80/${m.target.code}.png" class="w-10 h-6 object-cover rounded shadow" alt="${m.target.name} flag" />
              <div>
                <span class="font-bold text-white block">${m.target.name}</span>
                <span class="text-[10px] text-zinc-400 font-mono">Capital: ${m.target.capital}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-rose-400 block font-mono">Picked: ${m.selected.name}</span>
              <span class="text-[9px] text-zinc-500 font-mono">${m.reactionTime}ms</span>
            </div>
          `;
          missedList.appendChild(item);
        });
      } else if (missedWrap) {
        missedWrap.classList.add('hidden');
      }

      setTimeout(() => {
        if (resultsCard) resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    },

    updateText(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
  };

  // Safe DOM Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FlagApp.init());
  } else {
    FlagApp.init();
  }
})();
