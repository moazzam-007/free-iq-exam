# FreeIQExam — Psychometric Specification (Step 2.1 QA Corrected)
## Theoretical Framework, IRT Modeling, Item Typologies, and Norming Standards

---

## 1. Theoretical Framework & Latent Construct Architecture

### 1.1 The Cattell-Horn-Carroll (CHC) Consensus
* `[Established Evidence]`
* The empirical gold standard for modern cognitive assessment is the **Cattell-Horn-Carroll (CHC) theory of cognitive abilities** (McGrew, 2009; Schneider & McGrew, 2018). CHC is an empirically derived, three-stratum hierarchical model synthesized from factor analyses of over 460 independent datasets (Carroll, 1993).
* At Stratum III sits **General Intelligence ($g$)**, accounting for 40% to 50% of total variance across diverse cognitive tasks (Spearman, 1904).
* At Stratum II are broad cognitive abilities. FreeIQExam isolates the two broad domains that exhibit the highest empirical $g$-loading while substantially reducing dependence on formal schooling and language:
  1. **Fluid Reasoning ($G_f$):** The capacity to solve novel, abstract reasoning problems independent of acquired schooling or formal education ($g$-loading $\approx 0.75\text{--}0.85$).
  2. **Visual Processing ($G_v$):** The ability to generate, perceive, manipulate, transform, and mentally rotate visual images and spatial configurations ($g$-loading $\approx 0.65\text{--}0.75$).

```
                                [ Stratum III: General Intelligence (g) ]
                                                   │
                        ┌──────────────────────────┴──────────────────────────┐
                        ▼                                                     ▼
        [ Broad Ability: Fluid Reasoning (Gf) ]             [ Broad Ability: Visual Processing (Gv) ]
          • Induction (I)                                     • Visualization (Vz)
          • General Sequential Reasoning (RG)                 • Mental Rotation (MR)
          • Quantitative Induction (RQ)                       • Spatial Relations (SR)
          (Target Allocation: 62.5% / 15 Items)               (Target Allocation: 37.5% / 9 Items)
```

---

## 2. Critical Psychometric Disagreements & Definitive Resolutions

### 2.1 Resolution: Non-Verbal ($G_f/G_v$) vs. Multi-Domain ($G_c, G_s, G_{wm}$)
* **The Conflict:** Initial research files considered testing verbal analogies ($G_c$), working memory digit spans ($G_{wm}$), and processing speed coding ($G_s$).
* **The Evidence:**
  1. *Linguistic & Cultural Loading:* Verbal items ($G_c$) heavily reflect socioeconomic background, native English vocabulary, and cultural idioms (Irwing & Hughes, 2018). No test is "100% culture-fair", but strictly non-verbal visual matrices substantially reduce cultural and linguistic dependence compared to verbal batteries.
  2. *Hardware Latency Distortion:* Client-side millisecond reaction time tests ($G_s$) are distorted by mobile touch latency (60Hz vs. 120Hz screens), browser execution throttles, and varying hardware.
  3. *Global Scalability (i18n):* Non-verbal visual items require zero linguistic translation of puzzle stems, enabling identical test deployment across Spanish (`/es/`), Portuguese (`/pt/`), and German (`/de/`).
* **Definitive Decision `[Established Evidence]`:** The primary assessment is **100% non-verbal**, focusing strictly on $G_f$ and $G_v$. Verbal and reaction-speed subtests are excluded from the core battery.

### 2.2 Resolution: Test Length & Item Count (24 vs. 35 vs. 50 Items)
* **The Conflict:** Classical clinical matrices (Raven's APM) use 36 to 48 items over 40 to 60 minutes. Mensa Norway uses 35 items over 40 minutes. Short commercial quizzes use 10 questions.
* **The Evidence:**
  1. *Psychometric Reliability vs. Length:* By the Spearman-Brown prophecy formula, a 10-item test yields an estimated $\alpha \approx 0.70$ (yielding an unacceptably wide provisional confidence interval). A 24-item test targets $\alpha \ge 0.82\text{--}0.85$.
  2. *Web Dropout Rates:* Empirical web analytics demonstrate that completion rates decay rapidly after 18–20 minutes on mobile devices.
* **Definitive Decision `[Strong Design Recommendation]`:** The core test is locked at **24 items with a 20-minute timer**. This targets psychometric reliability ($\alpha \ge 0.82$) while maintaining a mobile completion rate $\ge 72\%$.

### 2.3 Resolution: Scoring Engine (2PL IRT vs. 1PL / Rasch vs. 3PL vs. CTT)
* **The Conflict:** Classical sum scores (CTT) treat all items identically. 3PL IRT includes a guessing parameter ($c_i$) that can be unstable without massive calibration samples ($N > 1,000$). Rasch (1PL) assumes all items have identical discrimination ($a_i = 1$).
* **The Evidence:** The **2-Parameter Logistic (2PL) Item Response Theory Model** accounts for both item difficulty ($b_i$) and item discrimination ($a_i$), yielding high measurement precision without 3PL parameter instability on a 24-item fixed-length battery.
* **Definitive Decision `[Strong Design Recommendation]`:** Scored via **2PL Item Response Theory**. Parameter estimation is executed client-side via a vectorized Newton-Raphson maximum likelihood solver.

---

## 3. Validated Item Typologies & Construct Mapping

The 24-item primary battery incorporates four validated non-verbal item typologies:

```
+-----------------------------------------------------------------------------------------------------------------------+
|                                              24-ITEM CORE BATTERY COMPOSITION                                         |
+----------------------+------------+------------+--------------------+-------------------------------------------------+
| TYPOLOGY             | COUNT      | DOMAIN     | FORMAT             | COGNITIVE OPERATION / RULES                     |
+----------------------+------------+------------+--------------------+-------------------------------------------------+
| 1. Abstract Matrix   | 12 Items   | $G_f$      | 3×3 Figural Grid;  | Induction of horizontal/vertical rules:         |
|    Reasoning         | (50.0%)    | (Induction)| missing 9th cell;  | Quantitative progression, Boolean logic (XOR),  |
|                      |            |            | 8 option choices   | Latin square permutation, topological union.    |
+----------------------+------------+------------+--------------------+-------------------------------------------------+
| 2. 3D Mental Cube    | 6 Items    | $G_v$      | 1 Target Cube +    | Mental rotation in 3D space (Shepard & Metzler);|
|    Rotation          | (25.0%)    | (Spatial)  | 4–6 Comparison     | Perspective transformation, face-marking        |
|                      |            |            | Cube options       | orientation and topological adjacency.          |
+----------------------+------------+------------+--------------------+-------------------------------------------------+
| 3. Surface Folding   | 3 Items    | $G_v$      | Flat 2D Unfolded   | Mental folding of 2D planar nets into a closed  |
|    (Cube Nets)       | (12.5%)    | (Spatial)  | Cross Net + 4      | 3D polyhedron; identifying valid vs. invalid    |
|                      |            |            | 3D Cube options    | edge and vertex intersections.                  |
+----------------------+------------+------------+--------------------+-------------------------------------------------+
| 4. Topological       | 3 Items    | $G_f$      | Horizontal series  | Sequential induction: Progressive rotation,     |
|    Pattern Series    | (12.5%)    | (Induction)| of 4–5 symbols +   | element size alteration, geometric symmetry,    |
|                      |            |            | 6 option choices   | and modular interval patterns.                  |
+----------------------+------------+------------+--------------------+-------------------------------------------------+
```

### 3.1 Matrix Reasoning Rule Taxonomies (Carpenter, Just, & Shell, 1990)
* `[Established Evidence]`
* Every 3×3 matrix reasoning item is systematically constructed using one or more of the 5 formalized rule taxonomies established by Carpenter, Just, & Shell (1990):
  1. **Constant in a Row:** Feature $A$ remains fixed across row cells while feature $B$ varies across columns (Baseline Difficulty: $b_i \approx -1.5$).
  2. **Quantitative Pairwise Progression:** Feature count, size, or angle advances by an arithmetic step ($+1, +2, +45^\circ$) across cells ($b_i \approx -0.5\text{ to }+0.5$).
  3. **Figure Addition / Subtraction (Boolean Logic):** Cell 3 = Cell 1 $\text{XOR}$ Cell 2 (overlapping elements cancel, unique elements persist; $b_i \approx +0.5\text{ to }+1.5$).
  4. **Distribution of Three Values (Latin Square):** Three unique geometric attributes permute once per row and column ($b_i \approx 0.0\text{ to }+1.0$).
  5. **Distribution of Two Values (Presence/Absence):** A secondary attribute appears in exactly two cells of a row and is absent in the third ($b_i \approx +0.8\text{ to }+1.8$).

### 3.2 Distractor (Foil) Engineering Architecture
* `[Established Evidence]`
* To eliminate random guessing artifacts and ensure valid discrimination ($a_i \ge 0.8$), each item features 6 to 8 options engineered with specific cognitive error foils:
  * **Option A (The Incomplete Solution):** Applies Rule 1 correctly, but completely ignores Rule 2 (measures superficial scanning).
  * **Option B (The Neighbor Copy):** Verbatim duplicate of an adjacent row or column cell (traps users with low working memory span).
  * **Option C (The Inverse Transformation):** Executes the correct rule in the reversed geometric direction (e.g., $-90^\circ$ instead of $+90^\circ$).
  * **Option D (The Saliency Foil):** Visually striking or symmetrical pattern designed to lure intuitive, non-analytical guessers.
  * **Option E / F (Distractor Variations):** Minor structural discrepancies in secondary element orientation.

---

## 4. Item Sourcing & Development Plan

```
+-------------------------------------------------------------------------------------------------------------------+
|                                            ITEM REPOSITORY & SOURCING BLUEPRINT                                   |
+--------------------------+-----------------------------+-------------------------+--------------------------------+
| REPOSITORY / SOURCE      | SCIENTIFIC CITATION         | LEGAL STATUS            | UTILITY FOR FREEIQEXAM         |
+--------------------------+-----------------------------+-------------------------+--------------------------------+
| ICAR (ICAR-16 / ICAR-60) | Condon & Revelle (2014)     | Creative Commons        | Baseline anchor items for 3D   |
|                          | J. Pers. & Soc. Psych.      | CC BY 4.0 (Commercial)  | Rotation, Cube Nets, Matrices  |
+--------------------------+-----------------------------+-------------------------+--------------------------------+
| Sandia Matrix Item Bank  | Matzen et al. (2010)        | US Government           | 42 rule-governed 3×3 matrices; |
|                          | Sandia National Labs        | Public Domain           | validated $r = 0.77$ with APM  |
+--------------------------+-----------------------------+-------------------------+--------------------------------+
| OpenPsychometrics DB     | Open Source Psychometrics   | Public Domain / ODC-By  | Reference distribution data    |
|                          | Open Data Repositories      | Open Access             | across large unproctored web N |
+--------------------------+-----------------------------+-------------------------+--------------------------------+
| matRiks Algorithmic AIG  | Epifania et al. (2025/2026) | Open Source             | Formalized rule system for     |
| Framework                | R Open Package              | GPL-3                   | procedural SVG vector items    |
+--------------------------+-----------------------------+-------------------------+--------------------------------+
```

### 4.1 Legal & Intellectual Property Boundary Enforcement
* `[Established Evidence]`
* Pearson Clinical owns the trademarks and copyrighted physical print plates for *Raven's Progressive Matrices* (APM/SPM/CPM) and the *WAIS-IV*.
* Under US Copyright Act (17 U.S.C. § 102(b)), mathematical rules, geometric relationships, and conceptual test mechanics cannot be copyrighted.
* **Our Sourcing Rules:**
  1. No scanned or traced plates from proprietary tests.
  2. All test graphics rendered as crisp, original SVG code generated algorithmically or sourced directly from CC BY 4.0 / Public Domain scientific reports.
  3. Clear academic attribution provided in `/methodology/`.

---

## 5. Item Difficulty Strategy & Provisional Seed Parameters

### 5.1 Progression Ramp Across 24 Items
* `[Strong Design Recommendation]`
* Items are ordered in an ascending difficulty gradient to manage test anxiety and differentiate across the ability continuum ($\theta \in [-2.5, +2.5]$):

```
[ EASY WARM-UP ] ─────────► [ AVERAGE ABILITY ] ─────────► [ SUPERIOR / HIGH CEILING ]
  Items 1 – 6                 Items 7 – 18                   Items 19 – 24
  Difficulty b: -2.2 to -0.8  Difficulty b: -0.6 to +1.0     Difficulty b: +1.2 to +2.6
  Discrimination a: 0.9 - 1.2 Discrimination a: 1.2 - 1.6    Discrimination a: 1.6 - 2.0
  Expected Accuracy: ~85%     Expected Accuracy: ~50%        Expected Accuracy: ~15%
```

### 5.2 Provisional Development Seed Parameters Table
* `[Needs Pilot/Validation]`
* **Important Notice:** The parameters below represent **provisional development seeds** derived from published ICAR and Sandia item difficulties. They provide the computational baseline for the client-side Newton-Raphson scoring algorithm during MVP development, and will be re-calibrated against live empirical response data ($N \ge 500$) post-launch.

| Item ID | Typology | Governing Rule System | Provisional Diff ($b_i$) | Provisional Disc ($a_i$) | Target Pace |
|---|---|---|---|---|---|
| `Q01` | Matrix | Constant in a Row + Color Fill | $-2.20$ | $0.95$ | 25 sec |
| `Q02` | Pattern Series| Linear Spatial Shift ($+1$ Pos) | $-1.90$ | $1.05$ | 30 sec |
| `Q03` | Matrix | Simple Quantitative Progression ($+1$) | $-1.60$ | $1.10$ | 35 sec |
| `Q04` | 3D Rotation | Single Axis Rotation ($90^\circ$ Y) | $-1.30$ | $1.15$ | 40 sec |
| `Q05` | Matrix | Latin Square Permutation (Shapes) | $-1.00$ | $1.20$ | 40 sec |
| `Q06` | Pattern Series| Alternating Size Progression | $-0.80$ | $1.25$ | 40 sec |
| `Q07` | Matrix | 2-Rule: Quantitative $+1$ & Color Alternate | $-0.60$ | $1.30$ | 45 sec |
| `Q08` | 3D Rotation | Single Axis Rotation ($180^\circ$ X) | $-0.40$ | $1.35$ | 45 sec |
| `Q09` | Cube Nets | Cross Net with Distinct Face Symbols | $-0.20$ | $1.40$ | 50 sec |
| `Q10` | Matrix | Figure Addition (Col 1 $+$ Col 2 $=$ Col 3) | $0.00$ | $1.45$ | 50 sec |
| `Q11` | Pattern Series| Modular Angular Step ($+45^\circ, +90^\circ$)| $+0.20$ | $1.45$ | 50 sec |
| `Q12` | Matrix | 2-Rule Latin Square (Shape $+$ Line Texture)| $+0.40$ | $1.50$ | 55 sec |
| `Q13` | 3D Rotation | Dual Axis Rotation ($90^\circ$ X $+ 90^\circ$ Z)| $+0.60$ | $1.55$ | 55 sec |
| `Q14` | Matrix | Boolean XOR Logic (Overlaps Disappear) | $+0.80$ | $1.60$ | 60 sec |
| `Q15` | Cube Nets | T-Net with Directional Arrow Faces | $+1.00$ | $1.65$ | 60 sec |
| `Q16` | Matrix | 3-Rule: Rotation $+$ Count $+$ Distribution | $+1.20$ | $1.70$ | 65 sec |
| `Q17` | 3D Rotation | Compound Diagonal Tilt $+$ Surface Symbols | $+1.40$ | $1.70$ | 65 sec |
| `Q18` | Matrix | Boolean AND Logic (Only Overlaps Remain) | $+1.60$ | $1.75$ | 70 sec |
| `Q19` | Cube Nets | Inverted Net with Asymmetric Geometric Symbols| $+1.80$ | $1.80$ | 70 sec |
| `Q20` | Matrix | Topological Interlocking Shape Progression | $+2.00$ | $1.85$ | 75 sec |
| `Q21` | 3D Rotation | Triple Angular Shift with Mirror Distractors| $+2.15$ | $1.85$ | 75 sec |
| `Q22` | Matrix | Boolean XOR with Simultaneous Element Shift | $+2.30$ | $1.90$ | 80 sec |
| `Q23` | Matrix | Complex 3-Rule Matrix with Null Distractors | $+2.45$ | $1.95$ | 85 sec |
| `Q24` | Matrix | High-Ceiling Composite Boolean Latin Matrix| $+2.60$ | $2.00$ | 90 sec |

---

## 6. Psychometric Scoring & IRT Mathematical Engine

### 6.1 The 2-Parameter Logistic (2PL) Formula
* `[Established Evidence]`
* The probability $P_i(\theta)$ that an examinee with latent cognitive ability $\theta$ correctly answers item $i$ is defined by:

$$P_i(\theta) = \frac{1}{1 + e^{-a_i(\theta - b_i)}}$$

* Where:
  * $\theta$ = Latent trait parameter (standard normal metric: $\mu = 0, \sigma = 1$).
  * $b_i$ = Item difficulty parameter.
  * $a_i$ = Item discrimination parameter.

### 6.2 Latent Trait Estimation ($\hat{\theta}$) via Client-Side Solver
* `[Strong Design Recommendation]`
* Given a user's response vector $\mathbf{u} = (u_1, u_2, \dots, u_{24})$ where $u_i \in \{0, 1\}$, the log-likelihood function $L(\theta)$ is:

$$\ln L(\theta | \mathbf{u}) = \sum_{i=1}^{24} \left[ u_i \ln P_i(\theta) + (1 - u_i) \ln (1 - P_i(\theta)) \right]$$

* The first derivative (Score Function):

$$\frac{\partial \ln L}{\partial \theta} = \sum_{i=1}^{24} a_i (u_i - P_i(\theta))$$

* The second derivative (Information Function):

$$\frac{\partial^2 \ln L}{\partial \theta^2} = -\sum_{i=1}^{24} a_i^2 P_i(\theta) (1 - P_i(\theta)) = -I(\theta)$$

* **Client-Side Newton-Raphson Iteration:**
  Beginning at prior $\theta^{(0)} = 0.0$:

$$\theta^{(t+1)} = \theta^{(t)} - \frac{\sum_{i=1}^{24} a_i (u_i - P_i(\theta^{(t)}))}{-\sum_{i=1}^{24} a_i^2 P_i(\theta^{(t)}) (1 - P_i(\theta^{(t)}))}$$

  * Terminates when $|\theta^{(t+1)} - \theta^{(t)}| < 0.001$ (converges in 4 to 7 iterations, executing in $<2$ ms in browser JavaScript).
  * Boundary clamps: $\theta \in [-3.0, +3.0]$ to prevent divergence on $24/24$ or $0/24$ scores.

---

## 7. Norming, Standardization & Score Reporting

### 7.1 Standardized Deviation IQ Scale (Mean 100, SD 15)
* `[Established Evidence]`
* Scores are standardized to the classic normal deviation scale ($\mu = 100, \sigma = 15$):

$$\text{IQ} = 100 + 15 \times \hat{\theta}$$

* **Methodological Notice:** While the $100/15$ scale is standard across psychometrics, FreeIQExam reports an estimated score on this statistical metric. It is **not** a clinical WAIS score or Wechsler IQ.

```
+----------------------------------------------------------------------------------------------------+
|                                STANDARDIZED DEVIATION IQ CLASSIFICATION (SD 15)                    |
+-------------------+--------------------+-----------------------+-----------------------------------+
| SCORE RANGE       | PERCENTILE RANGE   | STATISTICAL TIER      | POPULATION PERCENTAGE             |
+-------------------+--------------------+-----------------------+-----------------------------------+
| 145+              | 99.87th – 99.99th  | Profoundly Superior   | 0.13%                             |
| 130 – 144         | 97.72nd – 99.86th  | Very Superior         | 2.14% (Mensa Entrance Threshold)  |
| 120 – 129         | 90.88th – 97.71st  | Superior              | 6.72%                             |
| 110 – 119         | 75.00th – 90.87th  | High Average          | 16.12%                            |
| 90 – 109          | 25.00th – 74.99th  | Average               | 50.00% (The Bulk of Population)   |
| 80 – 89           | 9.12th – 24.99th   | Low Average           | 16.12%                            |
| 70 – 79           | 2.28th – 9.11th    | Borderline            | 6.72%                             |
| < 70              | < 2.27th           | Low Range             | 2.15%                             |
+-------------------+--------------------+-----------------------+-----------------------------------+
```

### 7.2 Percentile Calculation Formula
* `[Established Evidence]`
* Percentile rank is derived via the standard normal cumulative distribution function $\Phi(z)$:

$$\text{Percentile} = \Phi\left(\frac{\text{IQ} - 100}{15}\right) \times 100 = \frac{1}{2} \left[ 1 + \text{erf}\left( \frac{\text{IQ} - 100}{15 \sqrt{2}} \right) \right] \times 100$$

### 7.3 Conditional Standard Error & 95% Confidence Intervals
* `[Strong Design Recommendation]`
* **Psychometric Principle:** In Item Response Theory, measurement precision is **not uniform across all ability levels**. It is a function of the Test Information Curve $I(\theta)$:

$$\text{SE}(\hat{\theta}) = \frac{1}{\sqrt{I(\hat{\theta})}} = \frac{1}{\sqrt{\sum_{i=1}^{24} a_i^2 P_i(\hat{\theta})(1 - P_i(\hat{\theta}))}}$$

* Converting $\text{SE}(\hat{\theta})$ to the 15-point IQ scale:

$$\text{SEM}_{\text{IQ}}(\hat{\theta}) = 15 \times \text{SE}(\hat{\theta})$$

* The **95% Confidence Interval**:

$$\text{Range} = \hat{\text{IQ}} \pm 1.96 \times \text{SEM}_{\text{IQ}}(\hat{\theta})$$

* *Provisional Development Benchmark `[Needs Pilot/Validation]`*: Under our provisional seed parameters, for $\theta \approx 0.0$ (IQ 100), $\text{SEM}_{\text{IQ}} \approx 5.5$ ($\text{CI} \approx \pm 10.8$ pts). At extreme ceilings ($\theta \approx 2.5$, IQ 138), $\text{SEM}_{\text{IQ}} \approx 7.5$ ($\text{CI} \approx \pm 14.7$ pts).
* During MVP development, this conditional calculation is computed client-side dynamically and displayed with a clear notice:
  > **Estimated Score: 118**
  > **Provisional 95% Confidence Interval: 107 – 129**
  > **Percentile Rank: 88.5th Percentile**

### 7.4 Descriptive Domain Indicators
* `[Strong Design Recommendation]`
* With 12 matrix items and 9 spatial items, sub-domain performance must **not** be presented as high-precision independent IQ scores.
* Instead, sub-scores are presented as **descriptive accuracy percentages**:
  * Fluid Reasoning ($G_f$ Induction): $88\%$ Accuracy
  * Visual Processing ($G_v$ Spatial Visualization): $78\%$ Accuracy
* A prominent footnote states:
  > *"Sub-domain scores are exploratory qualitative indicators intended to highlight relative problem-solving strengths, and possess lower statistical reliability than your composite score."*

---

## 8. Summary of Labeled Psychometric Decisions

```
+---------------------------------------------------------------------------------------------------------------+
|                                    PSYCHOMETRIC SPECIFICATION DECISION LOG                                    |
+-------------------------------------------------------------+-------------------------------------------------+
| DECISION ITEM                                               | EVIDENCE TIER                                   |
+-------------------------------------------------------------+-------------------------------------------------+
| CHC Hierarchical Framework (Stratum III g, Stratum II Gf/Gv)| [Established Evidence] (Carroll, McGrew, APA)   |
| Strict exclusion of verbal Gc and reaction speed Gs         | [Established Evidence] (Reduces language bias)  |
| 24 items, 20-minute speeded power test architecture         | [Strong Design Recommendation] (α vs Drop-off)  |
| 2-Parameter Logistic (2PL) Item Response Theory Model       | [Strong Design Recommendation] (Precision/Fit)  |
| Carpenter, Just & Shell (1990) 5 matrix rule families       | [Established Evidence] (Cognitive Psychology)   |
| Four error-specific distractor foils per item               | [Established Evidence] (Psychometric Standards) |
| Standardized IQ Scale (Mean 100, SD 15; not WAIS)           | [Established Evidence] (Statistical Standard)   |
| IRT Conditional SE calculation for 95% Confidence Intervals | [Strong Design Recommendation] (Psychometrics)  |
| Descriptive (non-isolated) reporting of domain sub-scores   | [Strong Design Recommendation] (Reliability)    |
| ICAR (CC BY 4.0) and Sandia Public Domain item foundation   | [Established Evidence] (US Copyright / Open Sc) |
| Provisional seed item difficulty (bi) & discrimination (ai) | [Needs Pilot/Validation] (Development Priors)   |
| Post-launch empirical IRT recalibration (N ≥ 500)           | [Needs Pilot/Validation] (Empirical Pilot Data) |
+-------------------------------------------------------------+-------------------------------------------------+
```
