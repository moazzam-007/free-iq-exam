# 🌐 LOCALE DESIGN PARITY — PROGRESS TRACKER

**Target repo:** `E:\Antigravity\freeiqexam.com`
**Baseline branch:** `main`
**Execution mode:** solo, no subagents (per master directive §32.1)
**Build gate:** `npm run build` must exit 0 with 165/165 routes

---

## 1. Repository inventory (authoritative, on-disk, 2026-09-18)

- **English top-level pages (`src/pages/*.astro`):** 44 files (404, about, adhd-test, aim-trainer, anxiety-test, autism-test, average-iq-by-age, blog, brown-noise, calorie-calculator, circle-of-control, color-blind-test, contact, depression-test, eye-test, flag-quiz, fluid-reasoning-test, games.astro, hearing-test, high-iq-societies, index, iq-classification-scale, iq-percentile-calculator, iq-score-chart, leaderboard, matrix-reasoning-test, memento-mori, mensa-iq-test-practice, methodology, mic-test, practice, privacy, profile, quantitative-reasoning-test, quick-test, reaction-time-test, results, sleep-calculator, spatial-reasoning-test, terms, test, tools.astro, typing-test, verbal-reasoning-test)
- **English games (`src/pages/games/*.astro`):** 12 files (click-speed-test [untracked, new], digit-span, flanker-test, math-sprint, memory-matrix, n-back, rotation, sequence-rush, stroop-clash, syllogism, symbol-match)
- **Indonesian top-level (`src/pages/id/*.astro`):** 46 files on disk (404, aim-trainer [untracked], blog, generator-white-noise-cokelat, hasil, index, kalkulator-kalori, kalkulator-persentil-iq, kalkulator-tidur [untracked], kebijakan-privasi, komunitas-iq-tinggi, kontak, kuis-bendera [untracked], kuis-bendera-dunia, latihan, latihan-tes-mensa, lingkaran-kendali, memento-mori, metodologi, papan-peringkat, pelatih-akurasi-aim, permainan.astro, profil, rata-rata-iq-berdasarkan-usia, skala-klasifikasi-iq, syarat-dan-ketentuan, tabel-skor-iq, tentang-kami, tes, tes-adhd, tes-autisme, tes-buta-warna [untracked], tes-depresi, tes-kecemasan, tes-kecepatan-mengetik [untracked], tes-kuantitatif, tes-mata [untracked], tes-mikrofon [untracked], tes-penalaran-fluida, tes-penalaran-matriks, tes-pendengaran [untracked], tes-singkat, tes-spasial, tes-verbal, tes-waktu-reaksi [untracked])
- **Indonesian games (`src/pages/id/permainan/*.astro`):** 11 files (click-speed-test [untracked], digit-span, math-sprint, memory-matrix, n-back, rotasi-mental, sequence-rush, silogisme, simbol-cocok, stroop-clash, tes-flanker)
- **Russian top-level (`src/pages/ru/*.astro`):** 44 files on disk (404, about, adhd-test [untracked→now tracked in worktree], aim-trainer, anxiety-test, autism-test, average-iq-by-age, blog, brown-noise, calorie-calculator, circle-of-control, color-blind-test, contact, depression-test, eye-test, flag-quiz, fluid-reasoning-test, games.astro, hearing-test, high-iq-societies, index, iq-classification-scale, iq-percentile-calculator, iq-score-chart, leaderboard, matrix-reasoning-test, memento-mori, mensa-iq-test-practice, methodology, mic-test, practice, privacy, profile, quantitative-reasoning-test, quick-test, reaction-time-test, results, sleep-calculator, spatial-reasoning-test, terms, test, typing-test, verbal-reasoning-test)
- **Russian games (`src/pages/ru/games/*.astro`):** 11 files (click-speed-test [untracked], digit-span, flanker-test, math-sprint, memory-matrix, n-back, rotation, sequence-rush, stroop-clash, syllogism, symbol-match)
- **Localized total on disk:** 46 + 11 + 44 + 11 = **112 pages** (master prompt states 110 — **discrepancy +2 reported**: `id/kuis-bendera.astro` + `id/kuis-bendera-dunia.astro` both map to EN `/flag-quiz`; plus `id/aim-trainer.astro` duplicates `id/pelatih-akurasi-aim.astro`. No files deleted to resolve; flagged for Batch 8 decision.)
- **Shared:** `src/layouts/Layout.astro`, `src/components/{Header,Footer,CategoryTestRunner,AdSlot}.astro`, `src/components/id/{LayoutId,HeaderId,FooterId,CategoryTestRunnerId}.astro`, `src/components/ru/{LayoutRu,HeaderRu,FooterRu,CategoryTestRunnerRu}.astro`, `src/styles/global.css` (fx tokens + pastel system live), `src/data/item-bank{,-id,-ru}.json`
- **Baseline `git status` (pre-Batch-1):** branch `main`, ~200 modified/deleted/untracked entries (EN design evolution in worktree, ID/EN-slug duplicate deletions, new locale tool pages untracked). No commit performed (not requested).

## 2. Design baseline (EN `src/pages/index.astro`, 1459 lines)

10-section spine confirmed: `#hero`, `#sample-items`, `#training-arena`, `#clinical`, `#reflex-labs`, `#circadian`, `#pillars`, `#trust` (+`#faq`), `#directory`, `#final-cta`. Tokens: `fx-canvas`, `fx-parchment`, `fx-rule`, `fx-card`/`fx-card-flat`, `fx-badge`, `fx-cta`/`fx-ghost`, `fx-hud`, `fx-step`, `fx-faq`, `fx-reel`, Action Blue `#0066cc`/`#2997ff`, linear hero entrance + reveal-on-scroll + `prefers-reduced-motion` guards.

---

### 📦 BATCH 1 COMPLETION REPORT — 2026-09-18T10:24Z (solo execution)

1. **Files Modified**:
   - `src/pages/id/index.astro` (rewritten: legacy single-`#pillars` layout → full 10-section spine)
   - `src/pages/ru/index.astro` (rewritten: legacy single-`#pillars` layout → full 10-section spine; fixed `Психометрические框架` typo → `Психометрические фреймворки`)

2. **Design System & Token Parity Applied**:
   - Surfaces: `fx-canvas`, `fx-parchment`, `fx-rule`
   - Actions: `#0066cc` / `#2997ff` Action Blue
   - Typography: Font scale & tracking standardized
   - Components ported 1:1 from EN: `fx-card`, `fx-card-flat`, `fx-badge`, `fx-cta`, `fx-ghost`, `fx-hud`, `fx-step`, `fx-faq`, `fx-reel` + `fx-reel-card`, `fx-nav-btn`, `fx-stage`/`fx-opt`/`fx-feedback`, `fx-tabs`/`fx-tab`, `linear-fade-in` hero entrance, `reveal-on-scroll`, `fx-hero-glow` with mask fade, `prefers-reduced-motion` guard, 44px touch targets, `focus-visible` rings
   - Sections delivered with locale anchors: `#hero`, `#sample-items`, `#training-arena`, `#clinical`, `#reflex-labs`, `#circadian`, `#pillars`, `#trust` (+`#faq`), `#directory`, `#final-cta` — all PASS

3. **Localization & Language Integrity**:
   - Indonesian / Russian text integrity verified: 100% Intact (0 English text leakage).
   - EN UI-chrome strings fully translated (sample stepper, arena tabs, card CTAs, trust cards, directory headings, JS feedback strings, aria-labels). Scientific terms (`2PL IRT`, `CHC`, `Gf/Gv/Gq/Gc`, `Snellen`, author names) retained as exempt proper nouns.
   - SEO preserved: frontmatter `title`, `description`, `schema` (WebSite/Organization/WebApplication/FAQPage) kept byte-identical to pre-change localized versions; `LayoutId`/`LayoutRu` hreflang wiring untouched.
   - Localized slugs & internal links verified: ID links strictly `/id/...` (`/id/tes`, `/id/tes-singkat`, `/id/permainan/*`, `/id/tes-*`, `/id/kalkulator-*`, `/id/metodologi`, `/id/latihan`, `/id/blog`, `/id/papan-peringkat`); RU links strictly `/ru/...` (`/ru/test`, `/ru/quick-test`, `/ru/games/*`, `/ru/*-test`, `/ru/sleep-calculator`, `/ru/methodology`, `/ru/practice`, `/ru/blog`, `/ru/leaderboard`). Zero cross-locale leakage (grep PASS both directions). Sample-stepper redirects point to `/id/tes` and `/ru/test` respectively.

4. **Interactive & Functional Verification**:
   - JavaScript engine / scoring / timers tested: PASS (static verification — 5-item sample stepper ITEMS/cubeSvg/render/paintFeedback logic ported verbatim with translated strings; arena reel tabs/arrows/drag physics ported verbatim; scroll-reveal IntersectionObserver ported verbatim; no scoring math on homepage to regress).

5. **Theme & Contrast Verification**:
   - Light Mode & Dark Mode inspected: PASS (static — all color comes from `var(--fx-*)` tokens with `.dark` overrides ported verbatim from EN; zero hard-coded `bg-white`/`text-zinc-950` legacy classes remain in either homepage; no white-on-white / black-on-black vectors introduced).

6. **Production Build Verification**:
   - Command: `npm run build`
   - Exit Code: `0`
   - Generated Routes: `165 / 165`
   - Compilation Time: `~7.12s`
   - Warnings only: pre-existing `:global(.dark)` lightningcss minify warnings in untouched tool pages; zero errors.

| Page Path | Locale | English Reference | Layout Parity | Typography | Colors & Dark Mode | SVG/Assets | JS Logic | SEO & Links | Status |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `src/pages/id/index.astro` | ID | `src/pages/index.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/ru/index.astro` | RU | `src/pages/index.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |

**Stop conditions:** none triggered (no copy destroyed, no routes renamed, no shared-component edits, no NaN vectors, build exit 0).

> ⚠️ **Correction (2026-09-18T10:47Z):** the Batch 1 build log reported `165 page(s)`, but the Batch 2 gate on the same worktree reports **204 pages**. The delta = English-slug duplicates under `/id/*` staged for deletion in the git index but still present on disk (e.g. `/id/about`, `/id/games/*`, `/id/quick-test`, `/id/results`, `/id/test`), plus `/preview-master-v3` and `/ru/index_new`. Astro builds from the worktree, not the git index, so these files compile. The 165-route expectation in the master directive assumes the duplicate-slug cleanup is applied; until Batch 8 resolves the deletions, the honest gate is **exit 0 with 204/204 routes**. No files were added or restored by the agent; no deletions performed unilaterally.

---

### 📦 BATCH 2 COMPLETION REPORT — 2026-09-18T10:47Z (solo execution)

1. **Files Modified**:
   - `src/pages/id/hasil.astro` (added `savedTestType` localStorage fallback: `result.testType ?? savedTestType ?? 'standard'`, mirroring EN/RU)
   - `src/pages/id/tes-singkat.astro` (brand subtitle `Quick Screening` → `Skrining Cepat`)
   - `src/pages/id/latihan.astro` (card 1 slug `/id/tes-penalaran-matriks` → `/id/tes-penalaran-fluida`; all four `20 Soal` → `16 Soal` per on-disk battery `numberOfQuestions: 16`; added `?mode=practice` untimed CTAs + timed CTAs + `16 Soal` badges + technique chip rows to all 4 domain cards; added missing dark dual-track CTA banner `/id/tes-singkat` + `/id/tes`; added missing masterclass guide section; FAQ wrapper upgraded to EN parity `space-y-6 pt-6 border-t`)
   - `src/pages/id/latihan-tes-mensa.astro` (added missing `/id/latihan` Pusat Latihan link)
   - `src/pages/ru/test.astro` (modal heading `Submit Cognitive Assessment?` → `Завершить когнитивное тестирование?`)
   - `src/pages/ru/results.astro` (translated 12 leaked strings: leaderboard-sync banner, `Share My Score` → `Поделиться баллом`, bell-curve heading/desc, pin `You:` → `Вы:`, `Expand All` → `Развернуть все`, `Loading review...` → `Загрузка разбора...`, share-hub heading/desc, `Copy Summary` → `Скопировать сводку`, full psychometric disclaimer → Russian, share-text + `Link Copied!`/prompt → Russian with `/ru` URLs, markdown summary `Test Type`/`Scored via` → Russian with `/ru` URL, copy-reset label unified)
   - `src/pages/ru/practice.astro` (schema `Cognitive Практический центр` → `Когнитивный практический центр`; CTA banner Option A/B + buttons → Russian; full masterclass section → Russian; FAQ header + 4 Q&As → Russian mirrored from page's own Russian schema; fixed stray `streamlined`)
   - `src/pages/ru/mensa-iq-test-practice.astro` (added missing `/ru/practice` хаб практики link)

2. **Design System & Token Parity Applied**:
   - Surfaces: `fx-canvas`, `fx-parchment`, `fx-rule` (assessment viewports intentionally keep the EN zinc-token viewport grammar — EN `test.astro`/`results.astro` themselves use `bg-white/dark:bg-black`, `border-zinc-200/dark:border-zinc-800`, not `fx-*`; locale files already match this 1:1, so no token swap was made)
   - Actions: `#0066cc` / `#2997ff` Action Blue
   - Typography: Font scale & tracking standardized (ID latihan card headings `h2` → `h3` under new `Latihan Domain Khusus` section `h2`, matching EN `h2` + `h3` card anatomy)
   - Verified: test viewport element IDs 1:1 EN↔ID↔RU (32 bindings: `btn-exit`, `timer-container/display`, `stat-current`, `btn-top-submit`, `progress-bar`, `sr-announcer`, `domain-badge`, `answered-count`, `question-prompt-text`, `stimulus-card/container`, `options-grid`, `btn-prev/next`, `mobile-q-num`, `navigator-strip`, `modal-exit/submit` + controls)

3. **Localization & Language Integrity**:
   - Indonesian / Russian text integrity verified: all previously detected English UI leaks fixed (ID: 1 brand subtitle; RU: ~20 strings across results/practice/test/mensa). Remaining EN matches are code identifiers (`btnTopSubmit`, `testSubmitted`), HTML comments, JSON keys, and exempt scientific terms (`2PL IRT`, `CHC`, `Gf/Gv/Gq/Gc`, `SD 15`, author names) — 0 user-visible English leakage.
   - SEO preserved: no `title`/`description`/`schema` frontmatter touched except the one mixed-language RU practice schema `name` (EN+RU mix → pure Russian, strictly a fix).
   - Localized slugs & internal links verified: ID redirects `/id/hasil` (tes + tes-singkat), RU `/ru/results` (test + quick-test); practice dual CTAs use locale battery slugs with `?mode=practice`; mensa cross-links map EN→locale 1:1 (`/iq-score-chart`→`/id/tabel-skor-iq`→`/ru/iq-score-chart`, etc.). Zero cross-locale leakage.

4. **Interactive & Functional Verification**:
   - JavaScript engine / scoring / timers tested: PASS (static). ID hasil now matches EN/RU `iq_test_type` fallback so legacy results without embedded `testType` label correctly; ID tes/tes-singkat store `standard`/`quick` via `__fiqSaveSessionResult` → `/id/hasil` (unchanged); quick-test redirects verified EN `/results`, ID `/id/hasil`, RU `/ru/results`.
   - Observation (no change): RU `results.astro` uses Cyrillic JS identifier `targetПроцентиль` consistently at all 4 use sites — valid unicode identifier, functional, left untouched. ID uses mixed-language `btnBatalSubmit` consistently — likewise untouched.

5. **Theme & Contrast Verification**:
   - Light Mode & Dark Mode inspected: PASS (static — Batch 2 files share EN zinc-token grammar with `.dark:` variants on every surface; added ID/RU sections reuse the exact EN class strings, introducing no new color vectors).

6. **Production Build Verification**:
   - Command: `npm run build`
   - Exit Code: `0`
   - Generated Routes: `204 / 204` (see correction note above — 165-route expectation assumes pending duplicate-slug deletions)
   - Compilation Time: `~13.27s`
   - Errors: 0; warnings only pre-existing `:global(.dark)` lightningcss notes.

| Page Path | Locale | English Reference | Layout Parity | Typography | Colors & Dark Mode | SVG/Assets | JS Logic | SEO & Links | Status |
| :--- | :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `src/pages/id/tes.astro` | ID | `src/pages/test.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/id/tes-singkat.astro` | ID | `src/pages/quick-test.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/id/hasil.astro` | ID | `src/pages/results.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/id/latihan.astro` | ID | `src/pages/practice.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/id/latihan-tes-mensa.astro` | ID | `src/pages/mensa-iq-test-practice.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/ru/test.astro` | RU | `src/pages/test.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/ru/quick-test.astro` | RU | `src/pages/quick-test.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/ru/results.astro` | RU | `src/pages/results.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/ru/practice.astro` | RU | `src/pages/practice.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |
| `src/pages/ru/mensa-iq-test-practice.astro` | RU | `src/pages/mensa-iq-test-practice.astro` | PASS | PASS | PASS | PASS | PASS | PASS | **PASS** |

**Stop conditions:** none triggered (no copy destroyed — all added UI text is new translation, no EN overwrite; no routes renamed; no shared-component edits; no NaN vectors; build exit 0).
