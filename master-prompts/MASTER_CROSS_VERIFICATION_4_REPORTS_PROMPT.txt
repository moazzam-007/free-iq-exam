# MASTER PROMPT: 4-AGENT MULTI-REPORT CROSS-VERIFICATION & CODEBASE ADJUDICATION AUDIT

> **ROLE & OPERATIONAL DIRECTIVE:**
> You are an Elite Principal Software Architect, Psychometric Systems Specialist, and Senior Verification Auditor.
> Your mission is to execute a **100% Comprehensive, Line-by-Line Cross-Verification and Adjudication** of 4 independent AI audit reports against the actual source codebase at `E:\Antigravity\freeiqexam.com`.
> 
> **STRICT AUDIT & ADJUDICATION MODE (NON-NEGOTIABLE):**
> 1. **DO NOT MODIFY OR FIX CODE DURING THIS VERIFICATION.** Your goal is to inspect the real codebase, verify the ground reality of every single claim, and adjudicate truth vs hallucination.
> 2. **NO BLIND ACCEPTANCE.** AI agents often hallucinate, make superficial assumptions, or misinterpret valid architectural patterns as bugs. You must verify every claim by inspecting the actual source code files.
> 3. **ADJUDICATE CLASHES WITH MATHEMATICAL & PSYCHOMETRIC RIGOR.** When two reports contradict each other, inspect the ground truth and explain precisely who is right, who is wrong, and why.

---

## 1. INPUT REPORTS TO AUDIT & ADJUDICATE

You must read, analyze, and cross-verify every single claim from these 4 report files:

1. 📄 **Report 1 (Muse Spark 1.3 Free):**
   - **Path:** `e:\Antigravity\Fashion Deals Website\mussaprtreportforallq.txt`
   - **Scope:** 73 Defect Groups (DEF-001 through DEF-073) covering item banks, games, clinical screeners, storage keys, and DOM lifecycle.
2. 📄 **Report 2 (Nemotron):**
   - **Path:** `e:\Antigravity\Fashion Deals Website\nemotronreport.txt`
   - **Scope:** 6 Major Defects (DEFECT-001 through DEFECT-006) focusing on RU answer keys, 3-option items (91–95), dark mode contrast, duplicate stroke attributes, and Russian localization.
3. 📄 **Report 3 (Master Audit Report Final):**
   - **Path:** `E:\Antigravity\freeiqexam.com\MASTER_AUDIT_REPORT_FINAL.md`
   - **Scope:** Full-site multi-pillar audit covering routing, 100-item psychometrics, 11 games, 17 tools, SVG assets, and scoring engines.
4. 📄 **Report 4 (Master Verification Audit Report):**
   - **Path:** `E:\Antigravity\freeiqexam.com\MASTER_VERIFICATION_AUDIT_REPORT.md`
   - **Scope:** P0/P1/P2/P3 severity audit covering XML validity, duplicate attributes, distractor scaling, and i18n parity.

---

## 2. TARGET CODEBASE LOCATION
All claims must be validated directly against the source code located in:
- **Root:** `E:\Antigravity\freeiqexam.com`
- **Data Banks:** `src/data/item-bank.json`, `src/data/item-bank-id.json`, `src/data/item-bank-ru.json`, `src/data/questions*.ts`
- **Pages & Routes:** `src/pages/**/*.astro` (EN: `src/pages/`, ID: `src/pages/id/`, RU: `src/pages/ru/`)
- **Game & Tool Engines:** `src/scripts/tools/*.js`
- **Psychometric & State Store:** `src/utils/scoring.ts`, `src/utils/profileStore.ts`

---

## 3. CORE VERIFICATION CATEGORIES

For every claim across the 4 reports, you must evaluate and classify it into one of these 5 categories:

### 🟢 Category A: VERIFIED REAL DEFECT (Confirmed Present)
- The defect actually exists in the current codebase source code.
- Provide the exact file path, line number, current code snippet, and precise explanation of the failure.

### 🟡 Category B: PARTIALLY REAL / MITIGATED / CONTEXTUAL
- The report identified a real phenomenon, but either:
  1. It is partially mitigated by another mechanism (e.g., fallback guards, secondary handlers).
  2. It is an intentional design trade-off rather than a crash bug.
  3. It only affects certain edge cases.

### 🔴 Category C: FALSE POSITIVE / HALLUCINATION / FAKE
- The agent made a false claim, misunderstood the code architecture, or hallucinated a bug that does not exist.
- Explain clearly why the claim is FALSE with direct code evidence.

### 🔄 Category D: COMMON CONSENSUS CLAIMS (Reported by Multiple Agents)
- Identify all claims independently reported by 2, 3, or all 4 agents (e.g. Item 16 duplicate `stroke-width`, Item 47 dark mode contrast, Items 91–95 option count, click-speed modal visibility).
- Determine if the consensus is genuinely a real bug or a shared misconception.

### ⚔️ Category E: CLASHES & CONFLICTS (Direct Agent vs Agent Contradictions)
- Identify every contradiction between the reports.
- **Example Clash 1 (Russian Answer Keys):**
  - *Nemotron DEFECT-001:* Claims RU bank has 40 wrong answer keys because EN/ID always have correct answer at option id=1, whereas RU has answers at ids 2–6.
  - *Muse Spark DEF-020:* Explains that EN/ID have an "answer-position bias" where 52/52 items have correct answer fixed at index 0 (id=1), while RU was deliberately randomized to prevent cueing.
  - *Your Adjudication:* Check `src/data/item-bank-ru.json` vs `src/data/item-bank.json`. Does RU have the correct content mapped to `isCorrect: true`, or are the answers mathematically wrong? Who is right?
- **Example Clash 2 (Tool & Game Parity):**
  - *Report claims:* Missing games or tools in RU/ID (e.g. click-speed, 4 missing tools in RU).
  - *Your Adjudication:* Check actual files on disk in `src/pages/id/` and `src/pages/ru/` (including localized filenames like `silogisme.astro`, `generator-white-noise-cokelat.astro`).
- **Example Clash 3 (Math Sprint Distractor Logic):**
  - Compare the claimed distractor bug across EN, ID, RU files.

---

## 4. DETAILED ADJUDICATION CHECKLIST

You must specifically inspect and adjudicate the following key areas:

### 1. Item Banks & Questions (All 100 Items in EN, ID, RU)
- [ ] **Item 16 SVG XML Syntax:** Check if `src/data/item-bank.json` item 16 has an unclosed `<g>` tag (col 3441) and duplicate `stroke-width="2" stroke-width="5"` attributes. Check ID and RU variants.
- [ ] **Item 47 Dark Mode Contrast:** Check if polygons in Item 47 use `stroke="#18181b"` without `dark:stroke-zinc-200` across EN, ID, and RU.
- [ ] **Items 91–95 Option Count:** Check if verbal items 91–95 have 3 options instead of 4 in all 3 item banks.
- [ ] **Indonesian Logic Flaws (ID 74, 78, 84):** Check if ID 74 (probability $2/35$ vs $4/35$), ID 78 (analogy kayu:meja::besi:pagar), and ID 84 (antonym terbit:tenggelam) have wrong `isCorrect` flags.
- [ ] **Indonesian Domain Descriptions (ID 28–52):** Check if ID prompts and explanations describe 3D cube rotation for 2D matrix/strip/net items.
- [ ] **Russian Answer Keys (RU 1–52):** Check if RU answer keys are randomized valid options or corrupted answer keys.
- [ ] **DistractorType Semantic Tag on Correct Answers (37 items):** Check if `distractorType: "random"` is present on `isCorrect: true` options.

### 2. Cognitive Mini-Games (11 Games)
- [ ] **Math Sprint:** Check distractor generation code across `src/pages/games/math-sprint.astro`, `src/pages/id/permainan/math-sprint.astro`, and `src/pages/ru/games/math-sprint.astro`. Check for zero distractors, scale awareness, streak bonus differences (10+15 vs 10+5), and score formulas.
- [ ] **Stroop Clash:** Check congruent/incongruent ratio (40/60 vs 50/50), Escape key handling, and composite formula weighting (50/40/10 vs 50/35/15).
- [ ] **Flanker Test:** Check premature response guard ($<150\text{ms}$) and neutral trial handling.
- [ ] **N-Back:** Check whether $d'$ (sensitivity index) is computed or if only raw accuracy is reported.
- [ ] **Mental Rotation:** Check whether DIFFERENT trials use true chiral 3D reflection (mirror enantiomorph) or merely face-color alteration.
- [ ] **Memory Matrix:** Check grid scaling ($5 \times 5$ vs $6 \times 6$), strike logic (2 vs 3 lives), and retention timing.
- [ ] **Syllogisms:** Check 29 vs 32 items, timer pause on help modal, and formal validity flags.
- [ ] **Click Speed Test:** Check parity across EN, ID, RU, results modal class toggling, and initial click count.

### 3. Clinical Tools, Screening & Utilities
- [ ] **RU Tools Parity:** Verify whether `calorie-calculator`, `circle-of-control`, `memento-mori`, and `brown-noise` exist in `src/pages/ru/`.
- [ ] **ID Mic Test DOM Mapping:** Check whether `src/pages/id/tes-mikrofon.astro` mounts match `mic-tester-id.js` element IDs.
- [ ] **Color Blind Test:** Check whether "Unsure" counts as an error and whether Tritanopia claims are supported by plate data.
- [ ] **Eye Test Parity:** Check whether instructions are localized in ID and whether print/share DOM elements exist.
- [ ] **Crisis Helplines:** Check whether Russian depression/anxiety tests list local crisis numbers or only US/UK.

### 4. Storage, Lifecycle & Results Engine
- [ ] **Shared Storage Keys:** Check whether `localStorage` keys for best scores and active sessions collide between EN, ID, and RU.
- [ ] **DOMContentLoaded Race in Results:** Check `src/pages/results.astro` and locale variants for DOMContentLoaded event listener timing.
- [ ] **Demo Fallback Score Display:** Check whether visiting `/results` without taking a test displays a demo score (IQ 124) with shareable certificate.

---

## 5. REQUIRED OUTPUT REPORT STRUCTURE

Your output must be formatted as an exhaustive, definitive master report:

```markdown
# 🏛️ FINAL ADJUDICATED MASTER AUDIT REPORT

## 1. EXECUTIVE ADJUDICATION SUMMARY
- Total Claims Evaluated across 4 Reports: [Total Count]
- 🟢 Verified Real Defect (Confirmed in Code): [Count]
- 🟡 Partially True / Mitigated / Contextual: [Count]
- 🔴 False Positive / Hallucination / Fake: [Count]
- 🔄 Common Consensus Claims (Multi-Agent): [Count]
- ⚔️ Clashes & Conflicts Resolved: [Count]

---

## 2. ⚔️ CLASH RESOLUTION TABLE (Agent vs Agent Conflicts)
| Topic / Claim | Agent A Position | Agent B Position | Codebase Ground Truth | Verdict & Technical Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **RU Answer Keys** | Nemotron: 40 wrong keys | Muse Spark: Position shuffle | [Actual Code Reality] | [Verdict] |
| **Math Sprint Formula** | [Report X claim] | [Report Y claim] | [Actual Code Reality] | [Verdict] |
| **Tool / Game Parity** | [Report X claim] | [Report Y claim] | [Actual Code Reality] | [Verdict] |

---

## 3. 🔴 FALSE POSITIVES & HALLUCINATIONS LOG (Debunked Claims)
*List every claim from the 4 reports that was proven false upon inspecting the real code, explaining why.*

---

## 4. 🟢 VERIFIED REAL DEFECT LOG (Confirmed Ground Truth)
*List every confirmed defect grouped by severity (P0, P1, P2, P3) in the standard review format:*
- 📍 **Location:** `src/...` (Exact file & line)
- ❌ **Issue Type & Severity:** [P0/P1/P2/P3] — [Bug / Logic Error / Contrast / Accessibility]
- 🔍 **What Is Wrong:** [Detailed description of verified code state]
- 💡 **What the Fix Would Be:** [Words-only remediation plan]
- 📑 **Report Source(s):** [Which of the 4 reports originally flagged this]

---

## 5. 🎯 FINAL ACTIONABLE REMEDIATION ROADMAP
*Prioritized list of fixes required to achieve 100% perfection across all 3 locales.*
```

> **EXECUTION DIRECTIVE:**
> Begin line-by-line inspection and cross-verification now. Read the 4 report files, inspect the corresponding code in `E:\Antigravity\freeiqexam.com`, and deliver the definitive adjudicated truth.
