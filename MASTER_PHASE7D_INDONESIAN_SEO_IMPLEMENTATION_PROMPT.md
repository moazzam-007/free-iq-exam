# MASTER PHASE 7D — INDONESIAN ON-PAGE SEO IMPLEMENTATION & TOPICAL MESH
# Version: 2.0.0 (Execution Directive — 51 Primary Canonical Routes Implementation & Cross-Locale Parity Guard)
# Target Platform: freeiqexam.com (src/pages/id/**/*.astro)
# Authority Blueprint: PHASE7C_INDONESIAN_SEO_MAPPING_REPORT.md (Complete 2,032-line baseline report)
# Authority Standards: 2026 Google Search Essentials, Sovereign Baseline (Commit 857dc4b), Cross-Locale Parity
# Primary Research Assets:
#   - PHASE7C_INDONESIAN_SEO_MAPPING_REPORT.md (Primary blueprint in repository root)
#   - SEO_INDONESIAN_EXPANDED_29_TOOLS_RESEARCH.json (497 Verified Keywords via seodata.dev API)
#   - SEO_INDONESIAN_MASTER_RESEARCH.md & SEO_Indonesian_Keyword_Research_Log.txt

---

## 🎯 OBJECTIVE & MANDATE

You are the **Lead Technical SEO Engineer & Front-End Design Systems Specialist**.
Your objective is to execute **Phase 7D: Indonesian On-Page SEO Implementation** across the **51 primary canonical Indonesian routes** of `freeiqexam.com`, strictly adhering to the approved specifications in **`PHASE7C_INDONESIAN_SEO_MAPPING_REPORT.md`** and the 8 non-negotiable architectural guardrails below.

---

## 🛡️ 8 NON-NEGOTIABLE OPERATIONAL & ARCHITECTURAL GUARDRAILS

### 1. ⚖️ Cross-Locale Structural Parity Guard (Commit `857dc4b` & P5/P6 Standard)
- **Zero Structural Drift**: Do NOT introduce new section architectures, card layouts, grid systems, or component types only on Indonesian pages.
- All SEO improvements (headings, FAQs, intro context) must utilize existing design system components and slots (matching the 10-section pattern on homepage, and standard article/runner layouts established in English Phase 7B).
- Design system tokens remain immutable: pure flat canvas (`#000000` / `#ffffff`), 0 radial glows (`.fx-hero-glow`), 16×16/18×18 inline SVGs (zero cartoon emojis), and tactile buttons (`:active:scale-[0.97]`).

### 2. 🚫 37 Bridge & Alias Routes Strictly Untouched
- The 37 secondary bridge/alias files (in `src/pages/id/*.astro`, `src/pages/id/games/*.astro`, and `src/pages/id/permainan/*.astro`) exist exclusively for canonical consolidation and backward routing.
- **DO NOT** edit, rewrite, or target keywords on bridge files. Optimize ONLY their primary canonical Indonesian destinations. Preserve all existing `canonicalUrl` tags and redirects.

### 3. 🛡️ 5 Compliance & Utility Routes Strictly Exempt
- `/id/kebijakan-privasi`, `/id/syarat-dan-ketentuan`, `/id/404`, `/id/privacy`, `/id/terms` must remain **100% untouched**. Zero commercial keyword targeting.

### 4. 🧠 Keywords as Relevance Signals, NOT Mandatory Stuffing
- Mapped keywords are relevance signals to guide natural content phrasing, NOT mechanical density quotas.
- **Never force a keyword** if it results in awkward, repetitive, or ungrammatical Indonesian copy (*Bahasa Indonesia harus baku, alami, dan informatif*).

### 5. 🩺 Strict Medical & Clinical Protection
- Do NOT strengthen clinical claims for SEO. Never add words like "diagnosis resmi", "pasti akurat", or "standar medis resmi" unless explicitly backed by published literature (e.g. WHO ASRS v1.1, AQ-10, PHQ-9, GAD-7, 2PL IRT).
- Every clinical screener MUST preserve its prominent non-diagnostic disclaimer (*Skrining ini adalah alat evaluasi mandiri awal dan bukan merupakan diagnosis medis formal*).

### 6. 📐 Schema.org Qualification & 2026 Realignment
- Apply structured data ONLY where the page genuinely qualifies and visible content supports it:
  - `MedicalWebPage`: Strictly for clinical screeners (ADHD, Autism, Depression, Anxiety, Vision, Hearing).
  - `WebApplication`: Must include required properties (`name`, `applicationCategory`, `operatingSystem: "All"`, `offers`).
  - `Quiz`: Strictly for interactive question-and-answer test runners.
  - `Article` / `TechArticle`: For normative guides, score charts, and methodology.
  - **No `FAQPage` rich markup**: Purged per Google May 2026 deprecation; maintain visible FAQ accordions for users.

### 7. 🔗 Contextual, User-First Internal Linking
- Add internal links ONLY when the destination is topically relevant and genuinely useful to the reader. Do not add forced links solely to artificially increase link counts.

### 8. 📝 Preserve High-Quality Indonesian Copy
- Do NOT blindly delete or rewrite existing high-quality Indonesian text. Make the smallest surgical change necessary to satisfy search intent and fill content gaps.

---

## 🗂️ 51 PRIMARY CANONICAL ROUTES — 5-BATCH EXECUTION ROADMAP

Execute implementation sequentially across 5 structured batches. Run `npm run build` after every batch:

### 🏆 Batch 1: Mega-Volume Diagnostic & Utility Hubs (14 Pages)
1. `src/pages/id/index.astro` (`tes iq` — 165,000 vol | `tes iq online` — 33,100 vol)
2. `src/pages/id/tes.astro` (`tes iq online` — 33,100 vol | `tes iq gratis` — 33,100 vol) — **Remediate thin runner gap (add 2PL IRT overview & FAQs)**
3. `src/pages/id/tes-buta-warna.astro` (`tes buta warna` — 135,000 vol | `tes buta warna online` — 6,600 vol)
4. `src/pages/id/tes-depresi.astro` (`tes depresi` — 74,000 vol | `kesehatan mental` — 22,200 vol)
5. `src/pages/id/tes-kecepatan-mengetik.astro` (`tes mengetik` — 60,500 vol | `tes kecepatan mengetik` — 8,100 vol)
6. `src/pages/id/tes-mikrofon.astro` (`mic test` — 22,200 vol | `cek mic` — 720 vol)
7. `src/pages/id/kalkulator-kalori.astro` (`defisit kalori` — 22,200 vol | `kalkulator kalori` — 9,900 vol)
8. `src/pages/id/permainan/click-speed-test.astro` (`cps test` — 14,800 vol | `click speed test` — 2,400 vol)
9. `src/pages/id/tes-mata.astro` (`tes mata` — 14,800 vol | `tes mata minus` — 8,100 vol | `tes mata silinder` — 3,600 vol)
10. `src/pages/id/memento-mori.astro` (`memento mori` — 9,900 vol | `kalender kehidupan` — 210 vol)
11. `src/pages/id/tes-waktu-reaksi.astro` (`reaction time test` — 6,600 vol | `tes refleks` — 320 vol)
12. `src/pages/id/generator-white-noise-cokelat.astro` (`white noise` — 5,400 vol | `brown noise` — 480 vol)
13. `src/pages/id/permainan.astro` (`game asah otak` — 4,400 vol | `brain games` — 3,600 vol)
14. `src/pages/id/pelatih-akurasi-aim.astro` (`aim trainer` — 3,600 vol)

### 🧠 Batch 2: Specialized Cognitive, Clinical & CHC Batteries (13 Pages)
15. `src/pages/id/tes-kecemasan.astro` (`tes kecemasan` — 1,600 vol | `tes anxiety` — 1,000 vol)
16. `src/pages/id/tes-adhd.astro` (`tes adhd` — 720 vol | `tes adhd dewasa` — 590 vol)
17. `src/pages/id/tes-autisme.astro` (`tes autisme` — 320 vol | `tes spektrum autisme` — 170 vol)
18. `src/pages/id/tes-pendengaran.astro` (`tes pendengaran` — 720 vol | `tes pendengaran online` — 170 vol)
19. `src/pages/id/tes-penalaran-matriks.astro` (`tes matriks iq` — 590 vol | `tes penalaran` — 480 vol)
20. `src/pages/id/tes-penalaran-fluida.astro` (`penalaran induktif` — 480 vol | `tes logika` — 2,900 vol) — **Remediate depth**
21. `src/pages/id/tes-spasial.astro` (`tes spasial` — 720 vol | `tes rotasi mental` — 210 vol) — **Remediate depth**
22. `src/pages/id/tes-kuantitatif.astro` (`tes numerik` — 1,300 vol | `tes kuantitatif` — 320 vol) — **Remediate depth**
23. `src/pages/id/tes-verbal.astro` (`tes verbal` — 1,900 vol | `tes analogi kata` — 480 vol) — **Remediate depth**
24. `src/pages/id/tes-singkat.astro` (`tes iq singkat` — 1,000 vol | `tes iq cepat` — 260 vol) — **Remediate thin runner gap**
25. `src/pages/id/latihan-tes-mensa.astro` (`tes mensa` — 1,300 vol | `mensa indonesia` — 590 vol)
26. `src/pages/id/kalkulator-tidur.astro` (`siklus tidur` — 480 vol | `jam tidur ideal` — 320 vol)
27. `src/pages/id/lingkaran-kendali.astro` (`lingkaran kendali` — 260 vol | `circle of control` — 1,300 vol)

### 📊 Batch 3: Statistical Authority & Reference Link Magnets (9 Pages)
28. `src/pages/id/rata-rata-iq-berdasarkan-usia.astro` (`rata rata iq indonesia` — 1,900 vol)
29. `src/pages/id/skala-klasifikasi-iq.astro` (`skala iq` — 1,300 vol | `skor iq` — 720 vol)
30. `src/pages/id/tabel-skor-iq.astro` (`tabel iq` — 1,000 vol)
31. `src/pages/id/kalkulator-persentil-iq.astro` (`kalkulator persentil iq` — 260 vol)
32. `src/pages/id/komunitas-iq-tinggi.astro` (`komunitas iq tinggi` — 170 vol | `mensa indonesia` — 590 vol)
33. `src/pages/id/metodologi.astro` (`metodologi tes iq` — 140 vol | `teori respons butir 2pl` — 90 vol)
34. `src/pages/id/latihan.astro` (`latihan tes iq` — 2,400 vol | `tes psikologi` — 18,100 vol)
35. `src/pages/id/hasil.astro` (`hasil tes iq` — 480 vol)
36. `src/pages/id/papan-peringkat.astro` (`papan peringkat iq` — 110 vol)

### 🎮 Batch 4: Brain Games & Micro-Apps (11 Pages)
37. `src/pages/id/kuis-bendera.astro` (`tebak bendera` — 1,900 vol)
38. `src/pages/id/permainan/stroop-clash.astro` (`stroop test` — 1,600 vol)
39. `src/pages/id/permainan/sequence-rush.astro` (`tes deret angka` — 1,600 vol)
40. `src/pages/id/permainan/n-back.astro` (`dual n back` — 880 vol)
41. `src/pages/id/permainan/memory-matrix.astro` (`tes memori spasial` — 720 vol)
42. `src/pages/id/permainan/silogisme.astro` (`tes silogisme` — 720 vol)
43. `src/pages/id/permainan/math-sprint.astro` (`tes matematika cepat` — 590 vol)
44. `src/pages/id/permainan/digit-span.astro` (`tes rentang digit` — 480 vol)
45. `src/pages/id/permainan/rotasi-mental.astro` (`tes rotasi mental` — 480 vol)
46. `src/pages/id/permainan/simbol-cocok.astro` (`tes kecepatan persepsi` — 320 vol)
47. `src/pages/id/permainan/tes-flanker.astro` (`tes flanker` — 320 vol)

### 🏛️ Batch 5: Entity & Trust Pages (4 Pages)
48. `src/pages/id/tentang-kami.astro` (`tentang freeiqexam` — 90 vol)
49. `src/pages/id/blog.astro` (`blog sains kognitif` — 140 vol) — *Remediate depth with editorial standards note*
50. `src/pages/id/kontak.astro` (`kontak freeiqexam` — 50 vol)
51. `src/pages/id/profil.astro` (`profil kognitif pribadi` — 50 vol)

---

## 🧪 VERIFICATION & ACCEPTANCE GATE

Execute after each batch:
1. **Production Build Gate**:
   ```powershell
   npm run build
   ```
   *Requirement: Exactly 204 generated HTML routes, 0 build errors.*
2. **Design & Interaction Verification**:
   - Flat `#000000`/`#ffffff` canvases intact. Zero `.fx-hero-glow`.
   - Pure inline SVGs (zero emojis).
   - Button tactile interactions `:active:scale-[0.97]` preserved.
   - Zero JS engine/scoring changes.
