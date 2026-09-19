# MASTER PHASE 7F — RUSSIAN ON-PAGE SEO IMPLEMENTATION & TOPICAL MESH
# Version: 2.1.0 (Execution Directive — 52 Primary Canonical Routes Implementation & Cross-Locale Parity Guard)
# Target Platform: freeiqexam.com (src/pages/ru/**/*.astro)
# Authority Standards: 2026 Google Search Essentials, Sovereign Baseline (Commit 857dc4b), Cross-Locale Parity Standard
# Primary Research Assets:
#   - JSON Keyword Metrics: e:/Antigravity/Fashion Deals Website/SEO_RUSSIAN_EXPANDED_29_TOOLS_RESEARCH.json (649 Verified Keywords via seodata.dev API)
#   - Master Research Doc: e:/Antigravity/Fashion Deals Website/SEO_RUSSIAN_MASTER_RESEARCH.md
#   - Persistent Keyword Log: e:/Antigravity/Fashion Deals Website/SEO_Russian_Keyword_Research_Log.txt
#   - Mapping Blueprint: e:/Antigravity/Fashion Deals Website/PHASE7E_RUSSIAN_SEO_MAPPING_REPORT.md
# Mode: SURGICAL ON-PAGE SEO IMPLEMENTATION & VALIDATION (STRICT 204-PAGE BUILD GATE)

---

## 🎯 OBJECTIVE & MANDATE

You are the **Lead Technical SEO Engineer & Front-End Design Systems Specialist**.
Your objective is to execute **Phase 7F: Russian On-Page SEO Implementation** across the **52 primary canonical Russian routes** of `freeiqexam.com` (`src/pages/ru/**/*.astro`), strictly adhering to the 649-keyword research database, Google 2026 Search Essentials, and the 9 non-negotiable architectural guardrails below.

Every updated route must feature:
1. **Search-Intent Aligned Russian Metadata**: Refined `<title>` and `<meta name="description">` front-loading high-volume primary queries (`тест на айкью`, `тест на iq`, `тест на дальтонизм`, `проверка микрофона`, `тест на депрессию`, etc.).
2. **Topical Semantic Headings**: Logical `<h1>`, `<h2>`, and `<h3>` heading hierarchies incorporating secondary and long-tail variants.
3. **Runner Content Alignment**: Providing psychometric context (2PL IRT, CHC theory, scoring bands) in parity with English Phase 7B and Indonesian Phase 7D without introducing new structural section types.
4. **Qualified Schema.org JSON-LD**: Precise structured data (`WebApplication`, `MedicalWebPage`, `Article`) with deprecated `FAQPage` rich markup strictly excluded.
5. **User-Facing FAQ Content**: 3–5 natural Russian Q&As per page for user clarity and potential search snippet assistance.

---

## 🛡️ 9 NON-NEGOTIABLE OPERATIONAL & ARCHITECTURAL GUARDRAILS

### 1. ⚖️ Cross-Locale Structural Parity Guard (Commit `857dc4b` & Sovereign Design Law)
- **Zero Structural Drift**: Do NOT introduce new visible section architectures, card layouts, grid systems, or component types only on Russian pages.
- **Do NOT add a new visible section to RU unless the same structural section already exists in EN (Phase 7B) and ID (Phase 7D).**
- Design system tokens remain immutable: pure flat canvas (`#000000` / `#ffffff`), strictly ZERO radial glows (`.fx-hero-glow`), 16×16/18×18 inline SVGs (zero cartoon emojis), and tactile buttons (`:active:scale-[0.97]`).

### 2. 🗂️ Absolute Route Authority & Reconciliation
- The repository contains exactly **55 Russian `.astro` files**:
  - **3 Compliance & Utility Routes (Strictly Exempt)**: `/ru/privacy`, `/ru/terms`, `/ru/404`.
  - **52 Primary Canonical Indexable Routes**: 1:1 structural twin to the 52 indexable English routes.
- **Rule**: Reconcile all 52 primary routes directly against the filesystem. Do NOT invent, remove, or reclassify routes.

### 3. 🚫 3 Compliance & Utility Routes Strictly Exempt
- `/ru/privacy` (Политика конфиденциальности)
- `/ru/terms` (Условия использования)
- `/ru/404` (Страница не найдена)
- **DO NOT** edit or add commercial keywords to compliance routes. Preserve all legal disclaimers and clean indexing directives.

### 4. 🧠 Keywords as Relevance Signals, NOT Mechanical Stuffing
- Mapped keywords are relevance signals to guide natural content phrasing, NOT mechanical density quotas.
- **Never force a keyword** if it results in awkward, repetitive, or ungrammatical Russian copy (*Используйте грамотный, естественный литературный русский язык*).

### 5. 🔬 Strict Scientific Verification First (No Fact Invention)
- **CRITICAL SCIENTIFIC INTEGRITY RULE**: Before adding any scientific instrument name, named paradigm (e.g., Corsi, Jaeggi, Shepard-Metzler, Miller's Law), normative benchmark, or population statistic, inspect the actual implementation in the codebase first.
- Verify that the claim accurately describes the existing tool. **Never introduce a scientific label solely as an SEO keyword opportunity.**

### 6. 🩺 Strict Medical & Clinical Protection
- Do NOT strengthen clinical claims for SEO. Never add words like "официальный диагноз", "100% точность", or "заменяет врача" unless explicitly backed by published scientific literature (e.g. WHO ASRS v1.1, AQ-10, PHQ-9, Beck Anxiety/Depression Inventories, Rabkin plates).
- Every clinical screener MUST preserve its prominent non-diagnostic disclaimer (*Данный тест является инструментом первичного самоконтроля и не заменяет консультацию врача-специалиста*).
- `MedicalWebPage` is a semantic Schema.org classification for medical information, not a guarantee of rich results. Use it only when the visible content genuinely provides health evaluation context.

### 7. 📐 Schema.org Qualification & 2026 Realignment
- Apply structured data ONLY where the page genuinely qualifies and visible content supports it:
  - `MedicalWebPage`: Strictly for clinical screeners (ADHD, Autism, Depression, Anxiety, Vision, Hearing, Color Vision).
  - `WebApplication`: Standard schema for interactive assessment engines, calculators, and brain games (must include `name`, `applicationCategory`, `operatingSystem: "All"`, `offers`).
  - `Article` / `TechArticle`: For normative statistical guides, score charts, and methodology.
  - **No `FAQPage` rich markup**: Strictly excluded per Google deprecation; maintain visible FAQ accordions for users.
  - `Quiz`: Restrict strictly to pages that qualify under Google's structured educational assessment requirements. Default interactive tools to `WebApplication`.

### 8. 🔗 Contextual, User-First Internal Linking
- Add internal links ONLY when the destination is topically relevant and genuinely useful to the reader. Do not add forced links solely to artificially increase link counts.

### 9. ⚙️ Engine Logic & Psychometrics Protection
- Strictly **ZERO modifications** to JavaScript calculation logic, scoring algorithms, 2PL IRT formulas, timer durations, question arrays, or state stores (`ru-test-engine.js`, `color-blind-engine.js`, `reaction-timer.js`, etc.).

---

## 🗂️ 52 PRIMARY CANONICAL ROUTES — 5-BATCH EXECUTION ROADMAP

Execute implementation sequentially across 5 structured batches. Run `npm run build` after every batch:

```
[Batch 1: Mega-Volume Hubs (13)] ──► [Batch 2: Cognitive & Clinical (13)] ──► [Batch 3: Statistical Authority (9)]
          Build Test ✅                         Build Test ✅                          Build Test ✅
                                                                                            │
                               [Batch 5: Entity & Trust (6)] ◄─── [Batch 4: Brain Games (11)]
                                        Build Test ✅                         Build Test ✅
```

---

### 🏆 Batch 1: Mega-Volume Interactive Landing Pages & Utility Hubs (13 Pages)

1. `src/pages/ru/index.astro`
   - **Primary Target**: `тест на айкью` (54,900 vol), `тест на iq` (41,900 vol), `iq тест` (26,900 vol), `тест iq` (3,780 vol)
   - **Action**: Search-intent aligned metadata with primary Russian queries; H1 and 10-section flagship architecture maintained.

2. `src/pages/ru/test.astro`
   - **Primary Target**: `тест iq онлайн` (590 vol), `тест на iq` (41,900 vol), `пройти тест iq`
   - **Action**: Psychometric context below runner (2PL IRT background & scoring tiers in parity with EN/ID), plus 4 user-facing FAQs.

3. `src/pages/ru/color-blind-test.astro`
   - **Primary Target**: `тест на дальтонизм` (5,500 vol), `таблицы рабкина` (50 vol), `проверка зрения на цвета`
   - **Action**: Clinical plate descriptions (Ishihara/Rabkin plates); `MedicalWebPage` schema; 4 FAQs on protanopia, deuteranopia, tritanopia.

4. `src/pages/ru/depression-test.astro`
   - **Primary Target**: `тест на депрессию` (20,200 vol), `шкала бека` (2,080 vol), `тест на уровень депрессии` (690 vol)
   - **Action**: Beck Depression Inventory (BDI) / PHQ-9 scale context, clinical non-diagnostic disclaimer, `MedicalWebPage` schema, severity tiers.

5. `src/pages/ru/typing-test.astro`
   - **Primary Target**: `клавиатурный тренажер` (1,600 vol), `тест скорости печати` (1,360 vol), `тест печати` (260 vol)
   - **Action**: WPM/CPM speed benchmarks; `WebApplication` schema; touch-typing FAQs.

6. `src/pages/ru/mic-test.astro`
   - **Primary Target**: `проверка микрофона` (39,200 vol), `тест микрофона` (11,800 vol), `проверка микрофона онлайн` (3,500 vol), `проверка звука` (1,270 vol)
   - **Action**: WebRTC hardware diagnostic metadata; `WebApplication` schema; microphone troubleshooting FAQs.

7. `src/pages/ru/calorie-calculator.astro`
   - **Primary Target**: `калькулятор калорий` (15,000 vol), `дефицит калорий` (6,000 vol), `расчет калорий` (2,020 vol), `норма калорий` (460 vol)
   - **Action**: Mifflin-St Jeor & TDEE formulas context; `WebApplication` schema; calorie deficit FAQs.

8. `src/pages/ru/brown-noise.astro`
   - **Primary Target**: `белый шум` (14,800 vol), `коричневый шум` (90 vol), `звуки для сна`
   - **Action**: Acoustic frequency spectrum context (Brownian 1/f² slope); `WebApplication` schema; sleep/focus FAQs.

9. `src/pages/ru/sleep-calculator.astro`
   - **Primary Target**: `калькулятор сна` (6,800 vol), `фазы сна калькулятор` (110 vol), `расчет сна`
   - **Action**: 90-minute sleep cycle background; `WebApplication` schema; optimal bedtime guide & FAQs.

10. `src/pages/ru/memento-mori.astro`
    - **Primary Target**: `memento mori`, `календарь жизни`, `помни о смерти`, `жизнь в неделях`
    - **Action**: Stoic life in weeks calendar visualization; `WebApplication` schema; mortality reflection FAQs.

11. `src/pages/ru/reaction-time-test.astro`
    - **Primary Target**: `тест на реакцию` (3,120 vol), `тест скорости реакции`, `время реакции`
    - **Action**: Visual-motor latency benchmarks (200–250ms window); `WebApplication` schema; reflex FAQs.

12. `src/pages/ru/aim-trainer.astro`
    - **Primary Target**: `aim trainer` (740 vol), `тренировка аима`, `тренажер аима`
    - **Action**: FPS target acquisition and flick accuracy; `WebApplication` schema; sensitivity FAQs.

13. `src/pages/ru/flag-quiz.astro`
    - **Primary Target**: `флаги стран мира` (4,400 vol), `угадай флаг` (250 vol), `тест на флаги` (140 vol)
    - **Action**: World country flags geography quiz; `WebApplication` schema; continent breakdowns & FAQs.

---

### 🧠 Batch 2: Specialized Cognitive, Clinical & CHC Batteries (13 Pages)

14. `src/pages/ru/adhd-test.astro`
    - **Primary Target**: `тест на сдвг` (8,300 vol), `сдвг тест` (3,600 vol), `тест на сдвг у взрослых` (710 vol)
    - **Action**: Adult ADHD Self-Report Scale (ASRS v1.1) context; non-diagnostic disclaimer; `MedicalWebPage` schema; inattentive vs hyperactive symptom FAQs.

15. `src/pages/ru/anxiety-test.astro`
    - **Primary Target**: `тест на тревожность` (1,590 vol), `шкала тревоги бека` (420 vol), `тест на тревогу` (50 vol)
    - **Action**: Beck Anxiety Inventory (BAI) / GAD-7 clinical scale context; `MedicalWebPage` schema; anxiety symptom FAQs.

16. `src/pages/ru/autism-test.astro`
    - **Primary Target**: `тест на аутизм` (6,000 vol), `тест на аутизм у взрослых` (800 vol), `аутизм тест` (320 vol)
    - **Action**: Autism Spectrum Quotient (AQ-10) screening framework; `MedicalWebPage` schema; adult neurodiversity FAQs.

17. `src/pages/ru/eye-test.astro`
    - **Primary Target**: `проверка зрения` (2,180 vol), `таблица сивцева` (1,310 vol), `тест на астигматизм` (590 vol), `проверка зрения онлайн` (560 vol)
    - **Action**: Sivtsev chart visual acuity & astigmatism dial calibration; `MedicalWebPage` schema; screen distance calibration FAQs.

18. `src/pages/ru/hearing-test.astro`
    - **Primary Target**: `проверка слуха` (260 vol), `проверка слуха онлайн` (140 vol), `тест слуха`
    - **Action**: Pure tone frequency calibration (250Hz–8000Hz); `MedicalWebPage` schema; volume calibration FAQs.

19. `src/pages/ru/matrix-reasoning-test.astro`
    - **Primary Target**: `тест равена` (2,190 vol), `матрицы равена` (250 vol), `прогрессивные матрицы`
    - **Action**: Raven Progressive Matrices construct, non-verbal fluid intelligence ($Gf$), `WebApplication` schema, 4 FAQs.

20. `src/pages/ru/fluid-reasoning-test.astro`
    - **Primary Target**: `тест на мышление` (130 vol), `логическое мышление`, `подвижный интеллект`
    - **Action**: CHC Fluid Reasoning ($Gf$) inductive/deductive rules context; `WebApplication` schema; FAQs.

21. `src/pages/ru/spatial-reasoning-test.astro`
    - **Primary Target**: `пространственное мышление` (260 vol), `тест на пространственное мышление` (20 vol)
    - **Action**: Mental rotation & 3D projection ($Gv$); `WebApplication` schema; spatial reasoning FAQs.

22. `src/pages/ru/quantitative-reasoning-test.astro`
    - **Primary Target**: `математический тест` (760 vol), `числовой тест` (90 vol), `числовые тесты` (30 vol)
    - **Action**: Quantitative knowledge ($Gq$) & mathematical deduction; `WebApplication` schema; FAQs.

23. `src/pages/ru/verbal-reasoning-test.astro`
    - **Primary Target**: `вербальный тест` (210 vol), `вербальные тесты` (30 vol), `вербальное мышление`
    - **Action**: Crystallized intelligence ($Gc$), semantic relations; `WebApplication` schema; FAQs.

24. `src/pages/ru/quick-test.astro`
    - **Primary Target**: `быстрый тест iq`, `экспресс тест iq`, `тест iq за 5 минут`
    - **Action**: 15-item truncated adaptive battery context in parity with EN/ID; `WebApplication` schema; FAQs.

25. `src/pages/ru/mensa-iq-test-practice.astro`
    - **Primary Target**: `тест менса` (110 vol), `mensa россия`, `тест в менсу`
    - **Action**: 98th percentile cutoff (IQ $\ge 130$, SD 15) qualification rules; Mensa admission criteria & practice FAQs.

26. `src/pages/ru/circle-of-control.astro`
    - **Primary Target**: `круг контроля`, `круг влияния`, `стоицизм`
    - **Action**: Stoic dichotomy of control (Epictetus/Covey model) psychological resilience framework; interactive tool guide & FAQs.

---

### 📊 Batch 3: Statistical Authority & Reference Link Magnets (9 Pages)

27. `src/pages/ru/average-iq-by-age.astro`
    - **Primary Target**: `средний iq` (320 vol), `средний iq по возрасту`, `средний iq в россии`
    - **Action**: WAIS-IV normative age-stratified tables (16–80+), Flynn effect data; `Article` schema.

28. `src/pages/ru/iq-classification-scale.astro`
    - **Primary Target**: `шкала iq`, `классификация iq`, `уровни iq`
    - **Action**: WAIS-IV & Stanford-Binet V classification tiers (Very Superior to Borderline); `Article` schema.

29. `src/pages/ru/iq-score-chart.astro`
    - **Primary Target**: `таблица iq`, `график iq`, `нормальное распределение iq`
    - **Action**: Gaussian bell curve distribution ($\mu=100, \sigma=15$), standard deviation brackets; `Article` schema.

30. `src/pages/ru/iq-percentile-calculator.astro`
    - **Primary Target**: `процентиль iq`, `калькулятор процентиля iq`
    - **Action**: Cumulative distribution function (CDF) z-score to percentile converter; `WebApplication` schema.

31. `src/pages/ru/high-iq-societies.astro`
    - **Primary Target**: `общества высокого iq`, `менса россия`, `mensa russia`
    - **Action**: Comprehensive high-IQ society directories (Mensa 98th%, Intertel 99th%, Triple Nine 99.9th%, Prometheus 99.997th%).

32. `src/pages/ru/methodology.astro`
    - **Primary Target**: `методология теста iq`, `психометрические стандарты`, `2pl irt`
    - **Action**: Psychometric whitepaper (2PL Item Response Theory item characteristic curves, Fisher information function).

33. `src/pages/ru/practice.astro`
    - **Primary Target**: `тренировка iq`, `тесты для ума`, `развитие интеллекта`
    - **Action**: Adaptive cognitive training taxonomy across CHC domains; structured module links & practice FAQs.

34. `src/pages/ru/results.astro`
    - **Primary Target**: `результаты теста iq`, `расшифровка результатов iq`
    - **Action**: Cognitive domain score report interpretation, stanine scale conversion, sub-score analysis guide.

35. `src/pages/ru/leaderboard.astro`
    - **Primary Target**: `рейтинг iq`, `таблица рекордов iq`
    - **Action**: Global and regional percentile rankings, anti-cheat validation notice, competitive benchmark context.

---

### 🎮 Batch 4: Brain Games Micro-Apps (11 Pages in `src/pages/ru/games/*.astro`)

36. `src/pages/ru/games/click-speed-test.astro`
    - **Primary Target**: `клик тест` (2,180 vol), `cps test` (1,300 vol), `тест на клики`
    - **Action**: CPS click speed benchmark; clicking modes; `WebApplication` schema; FAQs.

37. `src/pages/ru/games/stroop-clash.astro`
    - **Primary Target**: `тест струпа` (480 vol), `эффект струпа`, `когнитивная гибкость`
    - **Action**: Stroop color-word interference & selective attention speed; `WebApplication` schema; FAQs.

38. `src/pages/ru/games/digit-span.astro`
    - **Primary Target**: `цифровой ряд`, `объем памяти`, `тест на память`
    - **Action**: Forward/backward working memory capacity benchmark; `WebApplication` schema; FAQs.

39. `src/pages/ru/games/flanker-test.astro`
    - **Primary Target**: `тест фланкера`, `избирательное внимание`, `тест на внимание`
    - **Action**: Eriksen Flanker selective visual inhibition benchmark; `WebApplication` schema; FAQs.

40. `src/pages/ru/games/math-sprint.astro`
    - **Primary Target**: `математический спринт`, `устный счет`, `тренажер счета`
    - **Action**: Rapid arithmetic mental processing speed ($Gs$); `WebApplication` schema; FAQs.

41. `src/pages/ru/games/memory-matrix.astro`
    - **Primary Target**: `матрица памяти`, `зрительная память`, `пространственная память`
    - **Action**: Visual-spatial working memory grid benchmark; `WebApplication` schema; FAQs.

42. `src/pages/ru/games/n-back.astro`
    - **Primary Target**: `n-back`, `тест n-back`, `двойной n-back`
    - **Action**: Dual n-back working memory task; `WebApplication` schema; FAQs.

43. `src/pages/ru/games/rotation.astro`
    - **Primary Target**: `пространственные фигуры`, `вращение фигур`, `пространственное мышление`
    - **Action**: 3D mental rotation reaction time task; `WebApplication` schema; FAQs.

44. `src/pages/ru/games/sequence-rush.astro`
    - **Primary Target**: `числовые последовательности`, `логические ряды`, `скорость реакции`
    - **Action**: Rapid algorithmic pattern recognition benchmark; `WebApplication` schema; FAQs.

45. `src/pages/ru/games/syllogism.astro`
    - **Primary Target**: `силлогизмы`, `логика тест`, `дедуктивное мышление`
    - **Action**: Syllogistic deductive logic validator; `WebApplication` schema; FAQs.

46. `src/pages/ru/games/symbol-match.astro`
    - **Primary Target**: `сопоставление символов`, `скорость восприятия`, `тест на внимание`
    - **Action**: Symbol search perceptual processing speed task; `WebApplication` schema; FAQs.

---

### 🏛️ Batch 5: Entity, Trust & Directory Hubs (6 Pages)

47. `src/pages/ru/games.astro`
    - **Primary Target**: `игры для мозга` (140 vol), `тренажер мозга` (20 vol), `игры для ума`
    - **Action**: Hub layout linking 11 cognitive games with CHC domain categories.

48. `src/pages/ru/tools.astro`
    - **Primary Target**: `инструменты для мозга`, `когнитивные тесты онлайн`, `калькуляторы здоровья`
    - **Action**: Master directory grouping all 29+ interactive tools into Sensory, Speed, Bio-Math, Clinical, and Memory hubs.

49. `src/pages/ru/about.astro`
    - **Primary Target**: `о нас freeiqexam`, `команда freeiqexam`, `психометрическая платформа`
    - **Action**: Platform mission, editorial oversight board, psychometric standards, institutional credentials.

50. `src/pages/ru/blog.astro`
    - **Primary Target**: `статьи о психометрии`, `исследования интеллекта`, `блог о когнитивных науках`
    - **Action**: Cognitive science research publication portal; editorial integrity disclosure; category filters.

51. `src/pages/ru/contact.astro`
    - **Primary Target**: `контакты freeiqexam`, `обратная связь`, `поддержка`
    - **Action**: Contact form, editorial inquiries, bug bounty reporting, research collaboration channels.

52. `src/pages/ru/profile.astro`
    - **Primary Target**: `профиль пользователя freeiqexam`, `история тестов iq`
    - **Action**: User progress dashboard, historical cognitive domain tracking, percentile growth curve.

---

## 📋 STEP-BY-STEP IMPLEMENTATION PROTOCOL PER ROUTE

For each file in the active batch, execute this exact sequence:

1. **Read File Content**: Inspect existing frontmatter, imports, layouts, and slot architecture.
2. **Update Metadata**:
   - Set search-intent aligned `<title>` (Russian head query front-loaded).
   - Set concise `<meta name="description">` (tool value proposition, zero boilerplate).
3. **Refine Heading Hierarchy**:
   - Verify single `<h1>` matching the primary topic.
   - Insert semantic `<h2>` sections (e.g. *Научная основа*, *Интерпретация результатов*, *Часто задаваемые вопросы*).
4. **Enrich Content in Parity with EN/ID**:
   - For runner tools (`/ru/test`, `/ru/quick-test`, CHC tests), insert background explanatory panels matching EN/ID layout slots.
   - For clinical screeners, preserve and strengthen standard non-diagnostic medical disclaimers.
   - **Verify before claiming**: Verify implementation before attributing named psychometric paradigms.
5. **Inject Qualified Schema.org JSON-LD**:
   - Insert clean, valid Schema.org script matching the page type (`WebApplication`, `MedicalWebPage`, `Article`).
   - Strictly exclude `FAQPage` rich markup.
6. **Add User-Facing FAQ Content**:
   - Add 3–5 high-intent Russian FAQs using standard semantic `<details><summary>` or existing design system accordion components.
7. **Verify Build**:
   - Run `npm run build` after completing the batch to ensure 204 pages build with 0 errors.

---

## 🚀 EXECUTION DIRECTIVE

Proceed with Phase 7F implementation batch-by-batch starting with **Batch 1 (Pages 1–13)**.
Ensure **Sovereign Universal Design Law (Commit `857dc4b`)** is strictly preserved at all times.
All 204 routes across EN, ID, and RU must build cleanly with 0 errors.
