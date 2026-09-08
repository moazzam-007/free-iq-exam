Building a scientifically defensible online cognitive assessment requires adhering to the psychometric standards established by the American Educational Research Association (AERA), the American Psychological Association (APA), and the National Council on Measurement in Education (NCME) in the *Standards for Educational and Psychological Testing* (2014). Most commercial online "IQ tests" lack construct validity, publish no technical manuals, utilize unstandardized convenience samples, and rely on arbitrary scoring algorithms designed for user retention rather than latent trait estimation.

---

## 1. Theoretical Framework & Latent Construct Architecture

Modern psychometrics rejects single-attribute theories of intelligence in favor of hierarchical factor-analytic models. The empirical gold standard is the **Cattell-Horn-Carroll (CHC) theory of cognitive abilities** (Schneider & McGrew, 2018; McGrew, 2009).

```
                      [ General Intelligence (g) ]
                                    |
     +-------------------+----------+----------+-------------------+
     |                   |                     |                   |
[ Fluid (Gf) ]   [ Visual (Gv) ]       [ Short-Term (Gwm) ] [ Speed (Gs) ]
     |                   |                     |                   |
 - Induction         - Visualization       - Working Memory    - Perceptual Speed
 - General           - Mental Rotation       Capacity          - Rate-of-Test-
   Sequential                              - Memory Search       Taking

```

### Core CHC Broad Domains for an Online Battery

* **Fluid Reasoning ($G_f$):** The capacity to solve novel, abstract problems independent of acquired cultural knowledge (Carroll, 1993). Measures induction ($I$), general sequential reasoning ($RG$), and quantitative reasoning ($RQ$). It exhibits the highest $g$-factor loading ($\lambda \approx 0.80 - 0.95$) across demographic groups (Jensen, 1998).
* **Visual Processing ($G_v$):** The ability to perceive, analyze, synthesize, and manipulate visual patterns and spatial configurations (Lohman, 1996). Sub-facets include visualization ($V_z$) and mental rotation ($SR$).
* **Working Memory / Short-Term Memory ($G_{wm}$):** The ability to maintain and manipulate information in active consciousness under cognitive load (Baddeley, 2000; Engle, 2002). Working memory capacity correlates strongly with $G_f$ ($r = 0.60 - 0.85$), but remains psychometrically distinct (Kane et al., 2005).
* **Processing Speed ($G_s$):** The rate at which elementary cognitive tasks are executed fluently without error (Kyllonen & Christal, 1990).
* **Excluded Domain — Crystallized Knowledge ($G_c$):** Vocabulary, verbal analogies, and general information load heavily on schooling and language proficiency. For a global, culture-reduced online battery, **$G_c$ should be excluded** or isolated into an optional language-specific module to eliminate cultural and linguistic bias (Raven, 2000; Suzuki et al., 2005).

> **Test Design Directive:** Structure the core battery as a tri-factor assessment measuring **$G_f$ (50% weight)**, **$G_v$ (30% weight)**, and **$G_{wm}$ (20% weight)**. This isolates high-$g$ constructs while eliminating cultural-linguistic dependencies.

---

## 2. Validated Item Typologies & Algorithmic Item Generation (AIG)

Proprietary tests guard their item pools through copyright. To build a sustainable, unhackable online platform, you must generate items using **Algorithmic Item Generation (AIG)** (Irvine & Kyllonen, 2002; Gierl & Haladyna, 2012) grounded in cognitive processing models.

### Matrix Reasoning ($G_f$)

Based on the computational cognitive architecture established by **Carpenter, Just, and Shell (1990)** (*Psychological Review*), item difficulty in $3 \times 3$ geometric matrix reasoning is governed by the number and combination of underlying rules rather than superficial visual styling.

* **Quantitative Progression:** Elements systematically increase or decrease in size, count, or position across rows or columns ($\Delta x = +1, -1, +2$).
* **Figure Addition/Subtraction (Boolean Operations):** Visual elements in column 3 represent the XOR, OR, or AND union of columns 1 and 2.
* **Distribution of Three Values:** Three distinct shapes, textures, or orientations occur exactly once in each row and column (Latin Square property).
* **Distribution of Two Values (Alternation):** Elements alternate between binary states (e.g., black/white fill) across subsequent steps.

```
+-----------+-----------+-----------+
|     *     |    * *    |   * * *   |  Rule 1: Count increases horizontally (+1)
+-----------+-----------+-----------+
|     ^     |    ^ ^    |   ^ ^ ^   |  Rule 2: Shape is constant across rows
+-----------+-----------+-----------+
|     o     |    o o    |   [ ? ]   |  Target: [ o o o ]
+-----------+-----------+-----------+

```

### 3D Mental Rotation & Spatial Visualization ($G_v$)

Grounded in **Shepard and Metzler (1971)** and **Vandenberg and Kuse (1978)**:

* **Task:** The respondent views a target 3D block figure constructed of 8–10 connected cubes and identifies which two of four comparison figures are identical to the target under pure rigid spatial rotation (angular disparity from $40^\circ$ to $180^\circ$).
* **Distractors:** Created via structural reflection (chiral mirror images) or topological modification (cubes shifted by 1 unit).

### Letter-Number Series Induction ($G_f / RQ$)

Grounded in **Holyoak and Nisbett (1988)** and **Sun, Liu, and Luo (2019)**:

* **Structure:** Interleaved arithmetic or alphabetic sequences with identifiable step periodicity (e.g., Sequence A increases by $+2$, Sequence B multiplies by $2$).
* *Sample:* `B, 4, D, 8, G, 16, K, 32, [ ? ]` $\to$ Answer: `P, 64` (Letters advance by $+2, +3, +4, +5$; numbers double).

### Linear Logistic Test Model (LLTM) for Item Calibration

Developed by **Fischer (1973, 2005)**, LLTM decomposes the Item Response Theory (IRT) difficulty parameter ($\beta_i$) into a linear combination of cognitive operations required to solve the item:

$$\beta_i = \sum_{m=1}^{M} w_{im} \eta_m + c$$

Where:

* $\eta_m$ is the empirically calibrated cognitive load/cost of cognitive rule $m$.
* $w_{im}$ is the weight (frequency/presence: 0 or 1) of rule $m$ in item $i$.
* $c$ is a normalization constant.

```
+------------------------------------+--------------------------+
| Cognitive Operation Radical        | Mean Empirical Cost (η)  |
+------------------------------------+--------------------------+
| Single Latin-Square Rule           | Baseline (0.00)          |
| Directional Progression (+1 / -1)  | +0.42 logits             |
| Boolean XOR Figure Combination     | +0.98 logits             |
| 2 Intersecting Rules (Simultaneous)| +1.35 logits             |
| 3 Rules + High Perceptual Noise    | +2.40 logits             |
+------------------------------------+--------------------------+

```

> **Test Design Directive:** Encode Carpenter-Just-Shell transform rules into parametric SVG/Canvas generators. Calculate preliminary item difficulty directly via the LLTM formula before administering items, ensuring immediate structural validity.

---

## 3. Psychometric Modeling: IRT & Computerized Adaptive Testing (CAT)

Classical Test Theory (CTT; raw sum scores) is inadequate for online testing because raw scores depend entirely on the specific items seen. You must implement **Item Response Theory (IRT)** (Lord, 1980; Embretson & Reise, 2000).

```
Probability P(θ)
1.0 |                                       ___--- (3PL: c > 0)
    |                                 _--'"`
0.5 |                        _--'"`   <- Inflection point = b (Difficulty)
    |                  _--'"`            Slope at inflection = a (Discrimination)
0.0 |________...--'"` (Asymptote = c: Guessing)
    +-------------------------------------------------------------
        -3           -2           -1            0           +1           +2           +3    Latent Trait (θ)

```

### The 2-Parameter vs. 3-Parameter Logistic Model

For non-speeded, multiple-choice cognitive testing, use the **3-Parameter Logistic (3PL) IRT Model** (Birnbaum, 1968) to account for random guessing:

$$P_i(\theta) = c_i + (1 - c_i) \frac{1}{1 + e^{-D a_i (\theta - b_i)}}$$

* $\theta$: The latent cognitive ability of the respondent ($\theta \sim \mathcal{N}(0, 1)$).
* $b_i$: Item difficulty parameter (in logits; typically $-3.0 \le b_i \le +3.0$).
* $a_i$: Item discrimination parameter (slope of the item characteristic curve; values $> 1.2$ denote high discrimination).
* $c_i$: Pseudo-guessing parameter (for an 8-option matrix, $c_i \approx \frac{1}{8} = 0.125$).
* $D$: Scaling constant ($D = 1.702$ aligns the logistic function with the normal ogive).

### Computerized Adaptive Testing (CAT) Engine

A static 60-item test causes fatigue at the low end and boredom at the high end. A CAT algorithm (van der Linden & Glas, 2000; Wainer et al., 2000) matches item difficulty to the test-taker's estimated ability after every response.

```
       [ Start: Initialize θ_0 = 0.0, SEM = 1.0 ]
                           |
                           v
      +--> [ Select Item maximizing Fisher Information: ]
      |    [ I_i(θ) from eligible unadministered pool   ]
      |                    |
      |                    v
      |    [ Administer Item -> Capture Accuracy (u_i)  ]
      |    [ and Item Latency (RT_i)                    ]
      |                    |
      |                    v
      |    [ Re-estimate θ using Expected A Posteriori  ]
      |    [ (EAP) or Maximum Likelihood (MLE)          ]
      |                    |
      |                    v
      |    [ Update Standard Error of Measurement:      ]
      |    [ SEM(θ) = 1 / sqrt(Sum(I_i(θ)))             ]
      |                    |
      |                    v
      +--- < Does SEM(θ) <= 0.28 OR Item Count == 25? >
                           |
                     YES (Met)
                           |
                           v
       [ Terminate Test -> Map θ to Standardized IQ ]

```

#### Selection Criterion: Maximum Fisher Information (MFI)

The algorithm selects the unadministered item $i$ that maximizes:

$$I_i(\theta) = \frac{a_i^2 (1 - c_i) P_i^*(\theta)^2}{[c_i + (1 - c_i) P_i^*(\theta)] [1 - P_i^*(\theta)]}$$

Where $P_i^*(\theta) = \frac{1}{1 + e^{-D a_i (\theta - b_i)}}$.

#### Stopping Rules

* **Precision Rule:** Test terminates when $SEM(\theta) \le 0.28$ (corresponds to a reliability coefficient $r_{xx} \ge 0.92$, calculated as $r_{xx} = 1 - SEM^2 = 1 - 0.28^2 = 0.921$).
* **Safety Ceiling:** Maximum of 25 items to prevent cognitive fatigue.

---

## 4. Standardization, Continuous Norming, and Demographic Fairness

### Transforming Latent Trait $\theta$ to Deviation IQ

A clinical IQ scale has a population mean $\mu = 100$ and standard deviation $\sigma = 15$ (Wechsler standard). Convert latent trait $\theta$ directly:

$$\text{IQ} = 100 + 15 \cdot \left(\frac{\theta - \mu_{\text{norm}}}{\sigma_{\text{norm}}}\right)$$

$$\text{Percentile Rank} = \Phi\left(\frac{\text{IQ} - 100}{15}\right) \times 100$$

Where $\Phi$ is the standard normal cumulative distribution function.

### Continuous Norming via cNORM

Traditional norming slices samples into arbitrary discrete age brackets (e.g., 20–24, 25–29), requiring 200–300 participants per bin and introducing step-function artifacts at age boundaries.

Instead, apply **Continuous Norming** (Lenhard, Lenhard, & Gary, 2018; Lenhard & Lenhard, 2020 via the R package `cNORM`). This models ability as a smooth, continuous bivariate Taylor polynomial over raw score ($r$) and explanatory variables (e.g., Age $A$):

$$\text{Norm Score} = \sum_{i=0}^{k_1} \sum_{j=0}^{k_2} \beta_{ij} \cdot r^i \cdot A^j$$

* **Sample Efficiency:** Reduces required normative sample sizes by $70–75\%$ while providing precise percentile ranks for any exact fractional age (e.g., 23.4 years).
* **Outlier Robustness:** Minimizes local sampling errors in the tails of the distribution ($\text{IQ} > 130$ and $\text{IQ} < 70$).

```
Raw Score vs. Age Curves: Continuous Norming (cNORM) Smooth Trajectories
Raw
Score |
  60  |                      . - - - - - - - - . (98th Percentile / IQ 130)
      |                . - '
  40  |          . - ' - - - - - - - - - - - - . (50th Percentile / IQ 100)
      |    . - '
  20  |  ' - - - - - - - - - - - - - - - - - - . (2nd Percentile / IQ 70)
      +-------------------------------------------------------------
        16      20      30      40      50      60      70+       Age

```

### Eliminating Bias: Differential Item Functioning (DIF)

A test cannot be considered culture-reduced or fair without demonstrating the absence of Differential Item Functioning (Holland & Wainer, 1993; Osterlind & Everson, 2009). An item displays DIF if individuals with the *same latent ability* ($\theta$) have different probabilities of answering correctly based on their demographic group membership ($G$):

$$P(Y_i = 1 \mid \theta, G = \text{Focal}) \ne P(Y_i = 1 \mid \theta, G = \text{Reference})$$

* **Mantel-Haenszel (MH) Statistic:** Identifies uniform DIF across gender and cultural groups. Items exhibiting an odds ratio $\alpha_{\text{MH}}$ differing significantly from 1.0 ($\vert{}\Delta \text{MH}\vert{} \ge 1.5$ delta units) must be purged from the active item pool.
* **IRT Likelihood-Ratio Test:** Compares nested models where item parameters ($a, b, c$) are constrained to be equal across groups versus unconstrained (Thissen et al., 1993).

---

## 5. Test Administration: Timing Constraints, Question Count, and Practice Effects

### Power vs. Speeded Testing

Cognitive ability tests operate along a continuum from pure **power tests** (untimed, measuring maximum problem-solving depth) to pure **speeded tests** (simple items under intense time pressure) (Lu & Sireci, 2007).

* **The Problem with Speeded Tests:** Strict global timers confound fluid intelligence ($G_f$) with elementary perceptual speed ($G_s$) and induce construct-irrelevant test anxiety (Zeidner, 1998).
* **Recommended Hybrid Model:** Generous per-item limits. Allow **60 to 90 seconds per matrix reasoning item** and **45 seconds per spatial rotation item**.
* **Total Battery Duration:** Limit total assessment time to **25–35 minutes** (20–25 adaptive items). Performance deteriorates past 40 minutes due to ego depletion and cognitive fatigue, inflating the error variance $\sigma_e^2$ (Ackerman & Kanfer, 2009).

### Practice and Retest Effects

Extensive meta-analyses confirm that repeated administration of cognitive tests artificially inflates scores (Hausknecht et al., 2007; Scharfen, Jansen, & Holling, 2018).

```
+------------------+-----------------------+-----------------------------+
| Administration   | Mean Score Gain (Δ d) | Equivalent IQ Point Gain    |
+------------------+-----------------------+-----------------------------+
| 1st Retest (T2)  | +0.25 to +0.33 SD     | +3.75 to +5.00 IQ points    |
| 2nd Retest (T3)  | +0.10 to +0.15 SD     | +1.50 to +2.25 IQ points    |
| 3rd Retest (T4)  | Plateaus (< 0.05 SD)  | Nil (< 0.75 IQ points)      |
+------------------+-----------------------+-----------------------------+

```

#### Causes of the Retest Effect

1. **Item-Specific Memory:** Remembering the specific visual patterns and solution keys (eliminated by adaptive item cloning).
2. **Rule Familiarization:** Learning the underlying Carpenter-Just-Shell transform rules.
3. **Anxiety Reduction:** Familiarity with interface ergonomics and countdown mechanics.

#### Engineering Countermeasures

* **Algorithmic Item Regeneration:** Never show the exact same item seed twice. Swap surface features (incidentals: color palette, geometric shapes) while holding rule logic (radicals) constant.
* **Mandatory Retest Lockout:** Enforce a **30-day minimum cool-off period** between official administrations.
* **Retest Scoring Correction:** If retested within 6 months, apply a calibrated statistical correction factor ($\Delta \theta \approx -0.20$) based on empirical longitudinal validation (Lievens et al., 2007).

---

## 6. Open-Source Item Banks vs. Proprietary Instruments (Legal & Reusability Audit)

You must navigate copyright law and trade-secret protections carefully when assembling test content.

```
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| Instrument / Resource              | Legal Status             | Reusability           | Key Citations & Constraints                 |
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| International Cognitive Ability    | Creative Commons         | Fully Reusable        | Condon & Revelle (2014); Young et al. (2019)|
| Resource (ICAR)                    | Attribution (CC-BY 4.0)  | (Open Access)         | Validated 16- and 60-item public batteries. |
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| Synthetic Aperture Personality     | Open Access Academic     | Public Domain /       | Revelle, Dworak, & Condon (2020);           |
| Assessment (SAPA Project)          | Research                 | Research Use          | Massive online norming datasets (>1M users).|
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| Open-Source Psychometrics Project  | Public Domain (CC0)      | Fully Reusable        | OpenPsychometrics.org datasets (raw item-   |
| Datasets (FSIQ / IQ tests)         |                          | (Open Data)           | level response vectors available for norms).|
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| Raven's Progressive Matrices       | Proprietary Copyright    | STRICTLY PROHIBITED   | Raven (1938, 2000); Pearson Clinical. Exact |
| (SPM, APM, CPM)                    | Pearson Education / NCS  | (Infringement Risk)   | matrix illustrations & norms are protected. |
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| Wechsler Adult Intelligence Scale  | Proprietary Copyright    | STRICTLY PROHIBITED   | Wechsler (2008); Pearson Clinical. Test     |
| (WAIS-IV / WAIS-5)                 | Pearson Education / NCS  | (Infringement Risk)   | manuals, items, and tables are protected.   |
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+
| Culture Fair Intelligence Test     | Proprietary Copyright    | STRICTLY PROHIBITED   | Cattell & Cattell (1973); MHS Assessments.  |
| (CFIT Scale 2 & 3)                 | Multi-Health Systems     | (Infringement Risk)   | Cannot duplicate items or scoring sheets.   |
+------------------------------------+--------------------------+-----------------------+---------------------------------------------+

```

### The Legal Doctrine of Psychometric Copyright

In ***Applied Innovations, Inc. v. Regents of the University of Minnesota*** (876 F.2d 626, 8th Cir. 1989), the federal courts affirmed that:

1. **Test statements, graphic representations, and specific normative conversion tables** possess sufficient creative originality to be protected under statutory copyright.
2. Under the **Idea-Expression Merger Doctrine** (*Baker v. Selden*, 101 U.S. 99; *Feist Publications v. Rural Telephone*, 499 U.S. 340), the *underlying mathematical principles, psychological constructs, and abstract geometric rules* (e.g., XOR transforms, 3D spatial rotation, arithmetic progression) **cannot be copyrighted**.
3. **Legal Safe Harbor:** You may freely program algorithms that implement Carpenter-Just-Shell transformation rules, provided the code, rendering logic, SVG vector artwork, and normative datasets are developed independently from scratch.

---

## 7. Neuroimaging Batteries, Gamified Tasks, and AI Reasoning Benchmarks

Modern cognitive science extends beyond classic paper-and-pencil formats to dynamic tasks validated through neuroimaging and computational benchmarks.

### Cambridge Brain Sciences / Creyos Battery

Hampshire, Highfield, Parkin, and Owen (2012) (*Neuron*, 76(6), 1225–1237) analyzed >57,000 participants completing 12 online cognitive tasks while validating the underlying neural architectures using functional MRI (fMRI):

```
+-------------------+-------------------+-----------------------------------+-----------------------------------------+
| Cognitive Task    | CHC Domain        | Frontoparietal Neural Substrate   | Algorithmic Task Description            |
+-------------------+-------------------+-----------------------------------+-----------------------------------------+
| Spatial Planning  | Gf / Planning     | Mid-dorsolateral prefrontal       | Tower of London / Hanoi variant: Move   |
| (Tree / Beads)    |                   | cortex (DLPFC)                    | balls between pegs to match goal state. |
+-------------------+-------------------+-----------------------------------+-----------------------------------------+
| Deductive         | Gf / Induction    | Inferior frontal sulcus &         | Grid-based relation matching: Evaluate  |
| Reasoning         |                   | anterior insula                   | complex relational rules under load.    |
+-------------------+-------------------+-----------------------------------+-----------------------------------------+
| Spatial Rotation  | Gv / Spatial      | Superior parietal cortex &        | 3D wireframe polygon matching at        |
|                   |                   | frontal eye fields (FEF)          | varied rotational angles.               |
+-------------------+-------------------+-----------------------------------+-----------------------------------------+
| Feature Match     | Gs / Attention    | Bilateral occipitotemporal &      | Rapid perceptual matching: Compare two  |
|                   |                   | parietal regions                  | complex dot-grid panels for identity.   |
+-------------------+-------------------+-----------------------------------+-----------------------------------------+
| Paired Associates | Gwm / Associative | Intraparietal sulcus &            | Remember spatial positions of symbols   |
| Memory            |                   | DLPFC                             | hidden behind enclosed containers.      |
+-------------------+-------------------+-----------------------------------+-----------------------------------------+

```

### François Chollet’s Abstraction and Reasoning Corpus (ARC-AGI)

In *"On the Measure of Intelligence"* (Chollet, 2019, arXiv:1911.01547), intelligence is formalized as **skill-acquisition efficiency over novel tasks**, using four foundational *Core Knowledge Priors* innate to human cognition (Spelke & Kinzler, 2007):

1. **Objectness:** Cohesion, persistence, and boundary continuity of geometric shapes.
2. **Goal-Directedness:** Objects moving toward targets or overcoming obstacles.
3. **Geometry and Topology:** Symmetries, rotations, translations, and inclusions.
4. **Basic Arithmetic:** Counting, sorting, and magnitude comparison (1 to 10).

> **Test Design Directive:** Incorporate 5–6 dynamic ARC-style grid-transformation tasks alongside static matrix reasoning. These measure an individual's ability to extract novel transformation algorithms from 3 demonstration pairs and predict a 4th output, minimizing both format familiarity and LLM-based solver cheating.

---

## 8. Unproctored Online Integrity, Anti-Cheating, and Bot Detection

Unproctored Internet Testing (UIT) introduces threats to measurement validity: search-engine lookups, reverse image searching, programmatic automated solvers (LLMs/vision models), and collaborative cheating (Arthur et al., 2010; Nye et al., 2008).

```
                             [ User Browser Session ]
                                        |
     +------------------+---------------+---------------+------------------+
     |                  |                               |                  |
[ Canvas/WebGL ] [ Blur/Focus Hooks ]         [ Response-Time ]     [ Aberrance ]
  Vector Render   Window blur & visibility      Log-Normal RT         Person-Fit (l_z)
  (Zero Static    change detection (flag        outlier filter        detection (filter
  DOM Images)     tab-switching lookups)        (<2s or >90s)         aberrant vectors)

```

### Technical Defenses Against Automated Solvers & Lookups

* **Dynamic Client-Side Canvas/WebGL Rendering:** Render items directly onto HTML5 `<canvas>` elements using procedural vector instructions. **Never serve static raster images (`.png`, `.jpg`) with predictable URLs** that can be scraped or fed into reverse-image search engines (Google Lens, TinEye).
* **Item Randomization via Seeding:** Procedurally randomize irrelevant incidental features (palette hues, coordinate rotations, distractor arrangements) on every session load.
* **Window Blur & Visibility Tracking:** Listen to the `visibilitychange` and `window.onblur` DOM API events. If a user unfocuses the browser tab for $> 3.0$ seconds during an item, flag the response vector for inspection.

### Psychometric Fraud Detection: Response Time Modeling & Person-Fit Statistics

#### Log-Normal Response Time Modeling (van der Linden, 2006, 2007)

Model the time $T_{ij}$ taken by person $j$ on item $i$:

$$\ln T_{ij} = \beta_i - \tau_j + \epsilon_{ij}, \quad \epsilon_{ij} \sim \mathcal{N}(0, \sigma_i^2)$$

Where:

* $\beta_i$ is the time intensity parameter of item $i$.
* $\tau_j$ is the latent speed of person $j$.
* **Rapid Guessing Filter:** A response time $T_{ij} < 2.5\text{ seconds}$ on a complex matrix indicates random guessing (compromised attention or time-dumping). Treat the response as an invalid observation rather than informative failure.
* **Lookup Anomaly Filter:** A user who spends 85 seconds inactive on a difficult item and selects the correct answer with zero preliminary cursor interactions may indicate an external solver lookup.

#### Person-Fit Aberrance Statistic ($l_z$) (Meijer & Sijtsma, 2001; Drasgow, Levine, & Williams, 1985)

Standardize the log-likelihood of a respondent’s response pattern under the fitted IRT model:

$$l_0 = \sum_{i=1}^N \left[ u_i \ln P_i(\theta) + (1 - u_i) \ln(1 - P_i(\theta)) \right]$$

$$l_z = \frac{l_0 - E(l_0)}{\sqrt{\text{Var}(l_0)}}$$

* $l_z \approx \mathcal{N}(0, 1)$ under normal test conditions.
* **Interpretation:** An $l_z$ value $< -2.0$ indicates an aberrant pattern (e.g., getting the 5 most difficult items correct while missing the 5 easiest items). Such profiles signify compromised test integrity or unauthorized assistance and must be excluded from normative standardization pools.

---

## 9. Critical Audit: Clinical Standards vs. Existing Online Tests

```
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Evaluation Metric    | Clinical Gold      | Mensa Online       | Typical Commercial | Your Proposed      |
|                      | Standard (WAIS-IV) | Practice Tests     | Sites (IQTest.com) | Validated System   |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Latent Trait Model   | IRT / CTT Combined | Raw Sum Score      | Arbitrary Linear   | 2PL/3PL IRT with   |
|                      | with Factor Norms  | Lookup Table       | Scaling Equation   | Marginal MLE / EAP |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Administration Type  | Proctored, 1-on-1  | Fixed Linear       | Fixed Linear       | Computerized       |
|                      | Clinical (60-90m)  | Form (35-40m)      | Form (15-20m)      | Adaptive (25-30m)  |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Standardization      | Representative     | Self-Selected Web  | Convenience Sample | Continuous Norming |
| Sample Quality       | Stratified (Census)| Visitors (Biased)  | or Fabricated Norms| (cNORM, N > 5,000) |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Construct Validity   | Full CHC Spectrum  | Pure Fluid / Gf    | Unverified Mix     | Factor-Pure Triad  |
| Evidence             | (10 Core Subtests) | (Matrix Only)      | (Verbal/Trivia)    | (Gf, Gv, Gwm)      |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Retest Controls      | Alternate Forms    | None (Identical    | None (Fixed Item   | Algorithmic AIG /  |
|                      | (Wait 1-2 years)   | Static Pool)       | Sequence)          | Seed Morphing      |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Integrity Verification| Proctored Clinical | None               | None               | RT Outlier +       |
|                      | Verification       |                    |                    | Person-Fit (lz)    |
+----------------------+--------------------+--------------------+--------------------+--------------------+
| Commercial Motive    | Clinical Diagnosis | Lead-Gen for Paid  | Paywalled PDF /    | Open-Access /      |
|                      | ($1,500 - $3,000)  | In-Person Tests    | Subscription Trap  | Defensible Science |
+----------------------+--------------------+--------------------+--------------------+--------------------+

```

### Flaws in Current Online Tests

1. **The "Lake Wobegon" Score Inflation:** Commercial online tests intentionally skew their scoring curves upward by $1.0 - 1.5$ standard deviations (reporting typical user IQs between 120 and 135) to encourage social sharing and conversion for paid certificates.
2. **Confounding $G_c$ with $G_f$:** Including English idioms, vocabulary definitions, and cultural trivia introduces severe cultural and socioeconomic bias, violating AERA/APA/NCME Test Standards (Standard 3.1–3.5).
3. **Absence of Published Technical Manuals:** No commercial test publisher provides peer-reviewed IRT parameters ($a, b, c$), split-half reliabilities ($\omega_h$), or confirmatory factor analyses demonstrating measurement invariance.

---

## 10. End-to-End Implementation & Engineering Blueprint

```
Phase 1: Item Engineering (Months 1-3)
  ├── Encode 20 Carpenter-Just-Shell transform rules into parametric SVG/Canvas generators
  ├── Build 15 3D mental rotation topologies (Shepard-Metzler wireframes)
  └── Implement LLTM difficulty-prediction model for initial pool stratification (N = 300 items)

Phase 2: Pilot Administration & Calibration (Months 4-6)
  ├── Administer item pool to N = 3,000 unproctored participants via SAPA matrix-sampling
  ├── Run Item Fit & Parameter Estimation using R 'mirt' package (calibrate a, b, c parameters)
  ├── Conduct Differential Item Functioning (DIF) across age and gender via Mantel-Haenszel
  └── Purge poorly discriminating items (a < 1.0) and severe DIF items

Phase 3: Norming & Adaptive Engine Deployment (Months 7-9)
  ├── Generate continuous norming curves across ages 16-75 using 'cNORM'
  ├── Build browser-based CAT engine using Maximum Fisher Information (MFI) & Bayes EAP
  ├── Implement log-normal response time verification and l_z person-fit filtering
  └── Establish stopping criteria: SEM(θ) <= 0.28 (r_xx >= 0.92) or 25 items max

Phase 4: Validation & Open Science Documentation (Months 10-12)
  ├── Correlate scores with ICAR-16 / ICAR-60 benchmarks (convergent validity target: r > 0.80)
  └── Publish an open Technical Manual documenting factor structure, norms, and IRT parameters

```

---

## 11. Primary Scientific Literature & Authoritative Reference Directory

### Factor Structure, Psychometric Foundations, and Construct Validity

* **AERA, APA, & NCME.** (2014). *Standards for Educational and Psychological Testing*. Washington, DC: American Educational Research Association.
* **Carroll, J. B.** (1993). *Human Cognitive Abilities: A Survey of Factor-Analytic Studies*. Cambridge University Press.
* **Cattell, R. B.** (1943). The measurement of adult intelligence. *Psychological Bulletin*, 40(3), 153–193.
* **Cattell, R. B.** (1963). Theory of fluid and crystallized intelligence: A critical experiment. *Journal of Educational Psychology*, 54(1), 1–22.
* **Cattell, R. B.** (1971). *Abilities: Their Structure, Growth, and Action*. Houghton Mifflin.
* **Engle, R. W.** (2002). Working memory capacity as executive attention. *Current Directions in Psychological Science*, 11(1), 19–23.
* **Horn, J. L., & Cattell, R. B.** (1966). Refinement and test of the theory of fluid and crystallized general intelligences. *Journal of Educational Psychology*, 57(5), 253–270.
* **Jensen, A. R.** (1998). *The g Factor: The Science of Mental Ability*. Westport, CT: Praeger.
* **Kane, M. J., Hambrick, D. Z., & Conway, A. R.** (2005). Working memory capacity and fluid intelligence are strongly related constructs. *Psychological Bulletin*, 131(1), 66–71.
* **Kyllonen, P. C., & Christal, R. E.** (1990). Reasoning ability is (little more than) working-memory capacity?! *Intelligence*, 14(4), 389–433.
* **Lohman, D. F.** (1996). Spatial ability and g. In I. Dennis & P. Tapsfield (Eds.), *Human Abilities: Their Nature and Measurement* (pp. 97–116). Lawrence Erlbaum.
* **McGrew, K. S.** (2005). The Cattell-Horn-Carroll theory of cognitive abilities: Past, present, and future. In D. P. Flanagan & P. L. Harrison (Eds.), *Contemporary Intellectual Assessment* (2nd ed., pp. 136–181). Guilford Press.
* **McGrew, K. S.** (2009). CHC theory and the human cognitive abilities project. *Intelligence*, 37(1), 1–10.
* **Schneider, W. J., & McGrew, K. S.** (2018). The Cattell-Horn-Carroll theory of cognitive abilities. In D. P. Flanagan & E. M. McDonough (Eds.), *Contemporary Intellectual Assessment* (4th ed., pp. 73–163). Guilford Press.
* **Spearman, C.** (1904). "General Intelligence," objectively determined and measured. *The American Journal of Psychology*, 15(2), 201–292.
* **Spearman, C.** (1927). *The Abilities of Man: Their Nature and Measurement*. Macmillan.

### Item Mechanics, Automatic Item Generation, and Cognitive Operations

* **Arendasy, M. E., & Sommer, M.** (2005). Automatically generating items for testing visual reasoning. *Review of Psychology*, 12(1), 5–18.
* **Arendasy, M. E., & Sommer, M.** (2010). Evaluating the impact of radical and incidental item features in automatic item generation. *Educational and Psychological Measurement*, 70(4), 601–615.
* **Arendasy, M. E., & Sommer, M.** (2012). Using automatic item generation to study the mental processing of number series items. *Intelligence*, 40(4), 369–381.
* **Arendasy, M. E., & Sommer, M.** (2013). Reducing gender differences in visuospatial reasoning using automatic item generation. *Intelligence*, 41(4), 219–229.
* **Blum, D., & Holling, H.** (2018). Automatic generation of figural analogies with the R package *genpath*. *Frontiers in Psychology*, 9, 1286.
* **Carpenter, P. A., Just, M. A., & Shell, P.** (1990). What one intelligence test measures: A theoretical account of the processing in the Raven Progressive Matrices Test. *Psychological Review*, 97(3), 404–431.
* **Embretson, S. E.** (1998). A cognitive design system approach to generating valid tests: Application to abstract reasoning. *Psychological Methods*, 3(3), 380–396.
* **Embretson, S. E.** (2002). Generating abstract reasoning items with cognitive theory. In S. H. Irvine & P. C. Kyllonen (Eds.), *Generating Items for Cognitive Tests* (pp. 219–242). Lawrence Erlbaum.
* **Fischer, G. H.** (1973). The linear logistic test model as an instrument in educational research. *Acta Psychologica*, 37(6), 359–374.
* **Fischer, G. H.** (2005). The linear logistic test model (LLTM). In K. Kempf-Leonard (Ed.), *Encyclopedia of Social Measurement* (Vol. 2, pp. 529–535). Elsevier.
* **Gierl, M. J., & Haladyna, T. M.** (Eds.). (2012). *Automatic Item Generation: Methods and Practice*. Routledge.
* **Holyoak, K. J., & Nisbett, R. E.** (1988). Induction. In R. J. Sternberg (Ed.), *The Psychology of Human Thought* (pp. 50–91). Cambridge University Press.
* **Irvine, S. H., & Kyllonen, P. C.** (Eds.). (2002). *Generating Items for Cognitive Tests: Theory and Practice*. Lawrence Erlbaum Associates.
* **Peters, M., Laeng, B., Latham, K., Jackson, M., Zaiyouna, R., & Richardson, C.** (1995). A redrawn Vandenberg and Kuse Mental Rotations Test: Different versions and new scoring rules. *Brain and Cognition*, 28(1), 39–58.
* **Shepard, R. N., & Metzler, J.** (1971). Mental rotation of three-dimensional objects. *Science*, 171(3972), 701–703.
* **Sun, L., Liu, Y., & Luo, F.** (2019). Automatic generation of number series reasoning items of high difficulty. *Frontiers in Psychology*, 10, 884.
* **Vandenberg, S. G., & Kuse, A. R.** (1978). Mental rotations, a group test of three-dimensional spatial visualization. *Perceptual and Motor Skills*, 47(2), 599–604.

### Open-Source Question Banks, Repositories, and Datasets

* **Condon, D. M., & Revelle, W.** (2014). The International Cognitive Ability Resource: Development and initial validation of a public-domain measure. *Journal of Research in Personality*, 51, 52–64.
* **Dworak, E. M., Revelle, W., & Condon, D. M.** (2020). Using the International Cognitive Ability Resource as an open source tool to explore individual differences in cognitive ability. *Personality and Individual Differences*, 169, 109906.
* **OpenPsychometrics.org.** (2020). *Raw Datasets from Online Cognitive and Personality Measures*. Available at: [https://openpsychometrics.org/_rawdata/](https://openpsychometrics.org/_rawdata/)
* **Revelle, W., Dworak, E. M., & Condon, D. M.** (2020). Exploring the persome: The power of the Synthetic Aperture Personality Assessment (SAPA). *Personality Science*, 1, 1–17.
* **Young, S. R., Keith, T. Z., & Bond, M. A.** (2019). Age and sex invariance of the International Cognitive Ability Resource (ICAR). *Intelligence*, 77, 101399.

### Psychometrics: Item Response Theory (IRT), CTT, and CAT

* **Birnbaum, A.** (1968). Some latent trait models and their use in inferring an examinee's ability. In F. M. Lord & M. R. Novick (Eds.), *Statistical Theories of Mental Test Scores* (pp. 395–479). Addison-Wesley.
* **Chang, H. H., & Ying, Z.** (1996). A global information approach to computerized adaptive testing. *Applied Psychological Measurement*, 20(3), 213–229.
* **Cronbach, L. J.** (1951). Coefficient alpha and the internal structure of tests. *Psychometrika*, 16(3), 297–334.
* **Dunn, T. J., Baguley, T., & Brunsden, V.** (2014). From alpha to omega: A practical solution to the pervasive problem of internal consistency estimation. *British Journal of Psychology*, 105(3), 399–412.
* **Embretson, S. E., & Reise, S. P.** (2000). *Item Response Theory for Psychologists*. Lawrence Erlbaum Associates.
* **Kingsbury, G. G., & Zara, A. R.** (1989). Procedures for selecting items for computerized adaptive tests. *Applied Measurement in Education*, 2(4), 359–375.
* **Lord, F. M.** (1980). *Applications of Item Response Theory to Practical Testing Problems*. Lawrence Erlbaum Associates.
* **McDonald, R. P.** (1999). *Test Theory: A Unified Treatment*. Lawrence Erlbaum Associates.
* **Revelle, W., & Zinbarg, R. E.** (2009). Coefficients alpha, beta, omega, and the glb: Comments on Sijtsma. *Psychometrika*, 74(1), 145–154.
* **Thissen, D., & Mislevy, R. J.** (2000). Testing algorithms. In H. Wainer (Ed.), *Computerized Adaptive Testing: A Primer* (2nd ed., pp. 101–134). Lawrence Erlbaum.
* **van der Linden, W. J., & Glas, C. A.** (Eds.). (2000). *Computerized Adaptive Testing: Theory and Practice*. Kluwer Academic Publishers.
* **Wainer, H., Dorans, N. J., Flaugher, R., Green, B. F., & Mislevy, R. J.** (2000). *Computerized Adaptive Testing: A Primer* (2nd ed.). Lawrence Erlbaum Associates.

### Norming, Demographics, Culture-Fairness, and Bias

* **Flynn, J. R.** (1984). The mean IQ of Americans: Massive gains 1932 to 1978. *Psychological Bulletin*, 95(1), 29–51.
* **Flynn, J. R.** (1987). Massive IQ gains in 14 nations: What IQ tests really measure. *Psychological Bulletin*, 101(2), 171–191.
* **Flynn, J. R.** (2007). *What is Intelligence? Beyond the Flynn Effect*. Cambridge University Press.
* **Gamliel, T.** (2009). Continuous norming for standardized psychometric tests. *Journal of Psychoeducational Assessment*, 27(6), 498–508.
* **Holland, P. W., & Wainer, H.** (Eds.). (1993). *Differential Item Functioning*. Lawrence Erlbaum Associates.
* **Lenhard, A., Lenhard, W., & Gary, S.** (2018). *cNORM: Continuous Norming*. CRAN: [https://cran.r-project.org/package=cNORM](https://cran.r-project.org/package=cNORM)
* **Lenhard, A., Lenhard, W., & Gary, S.** (2019). Continuous norming of psychometric tests: A simulation study. *Assessment*, 26(4), 565–577.
* **Lenhard, W., & Lenhard, A.** (2020). Improvement of norm score quality via continuous norming. *Psychological Test and Assessment Modeling*, 62(4), 485–514.
* **Mantel, N., & Haenszel, W.** (1959). Statistical aspects of the analysis of data from retrospective studies of disease. *Journal of the National Cancer Institute*, 22(4), 719–748.
* **Osterlind, S. J., & Everson, H. T.** (2009). *Differential Item Functioning*. SAGE Publications.
* **Pietschnig, J., & Voracek, M.** (2015). One century of global IQ gains: A formal meta-analysis of the Flynn effect (1909–2013). *Perspectives on Psychological Science*, 10(3), 282–306.
* **Suzuki, L. A., Ponterotto, J. G., & Meller, P. J.** (Eds.). (2005). *Handbook of Multicultural Assessment: Clinical, Psychological, and Educational Applications*. John Wiley & Sons.

### Timing, Fatigue, Practice Effects, and Retesting

* **Ackerman, P. L., & Kanfer, R.** (2009). Test length and cognitive fatigue: An investigation of effects on performance and test-taker reactions. *Journal of Experimental Psychology: Applied*, 15(2), 163–181.
* **Calamia, M., Markon, K., & Tranel, D.** (2012). Scoring higher the second time around: Meta-analyses of practice effects in neuropsychological assessment. *The Clinical Neuropsychologist*, 26(4), 543–570.
* **Hausknecht, J. P., Halpert, J. A., Di Paolo, N. T., & Moriarty Gerrard, M. O.** (2007). Retesting in selection: A meta-analysis of practice effects for cognitive ability, achievement, and personnel tests. *Journal of Applied Psychology*, 92(2), 373–385.
* **Lievens, F., Reeve, C. L., & Heggestad, E. D.** (2007). An examination of psychometric knowledge and practice effects across multiple test administrations in high-stakes selection. *International Journal of Selection and Assessment*, 15(3), 252–268.
* **Lu, Y., & Sireci, S. G.** (2007). Validity issues in test speededness. *Educational Measurement: Issues and Practice*, 26(4), 29–37.
* **Scharfen, J., Jansen, K., & Holling, H.** (2018). Retest effects in cognitive ability tests: A meta-analysis. *Intelligence*, 67, 44–66.
* **Zeidner, M.** (1998). *Test Anxiety: The State of the Art*. Springer Science & Business Media.

### Unproctored Online Testing, Cheating Detection, and Response Times

* **Arthur, W., Glaze, R. M., Villado, A. J., & Taylor, J. E.** (2010). Unproctored Internet-based tests of cognitive ability and personality: Magnitude of cheating and response distortion. *International Journal of Selection and Assessment*, 18(1), 1–16.
* **Beaty, J. C., Nye, C. D., Borneman, M. J., Kantrowitz, T. M., & Drasgow, F.** (2011). Proctored and unproctored internet tests: Equivalence of norms, reliability, and validity. *Journal of Business and Psychology*, 26(4), 411–421.
* **Drasgow, F., Levine, M. V., & Williams, E. A.** (1985). Appropriateness measurement with polychotomous item response models and standardized indices. *British Journal of Mathematical and Statistical Psychology*, 38(1), 67–86.
* **Fox, J. P., & Marianti, S.** (2016). Joint modeling of ability and speed in test-taking: Tracking cheat detection. *Psychometrika*, 81(2), 350–373.
* **Meijer, R. R., & Sijtsma, K.** (2001). Methodology review: Evaluating person fit. *Applied Psychological Measurement*, 25(2), 107–135.
* **Nye, C. D., Do, B. R., Drasgow, F., & Fine, S.** (2008). Two-step testing in personnel selection: Can unproctored internet testing be used safely? *International Journal of Selection and Assessment*, 16(3), 255–268.
* **van der Linden, W. J.** (2006). A lognormal model for response times on test items. *Journal of Educational and Behavioral Statistics*, 31(2), 181–204.
* **van der Linden, W. J.** (2007). A hierarchical framework for modeling speed and accuracy on test items. *Psychometrika*, 72(3), 287–308.

### Neuroimaging, Gamification, and AI Benchmarks

* **Chollet, F.** (2019). On the measure of intelligence. *arXiv preprint arXiv:1911.01547*.
* **Hampshire, A., Highfield, R. R., Parkin, B. L., & Owen, A. M.** (2012). Fractionating human intelligence. *Neuron*, 76(6), 1225–1237.
* **Shallice, T.** (1982). Specific impairments of planning. *Philosophical Transactions of the Royal Society of London. B, Biological Sciences*, 298(1089), 199–209.
* **Spelke, E. S., & Kinzler, K. D.** (2007). Core knowledge. *Developmental Science*, 10(1), 89–96.

### Legal Precedents and Clinical Reference Manuals

* **Applied Innovations, Inc. v. Regents of the University of Minnesota**, 876 F.2d 626 (8th Cir. 1989).
* **Baker v. Selden**, 101 U.S. 99 (1879).
* **Feist Publications, Inc. v. Rural Telephone Service Co.**, 499 U.S. 340 (1991).
* **Raven, J.** (2000). The Raven's Progressive Matrices: Change and stability over culture and time. *Cognitive Psychology*, 41(1), 1–48.
* **Raven, J. C.** (1938). *Progressive Matrices: A Perceptual Test of Intelligence*. London: H. K. Lewis.
* **Wechsler, D.** (2008). *Wechsler Adult Intelligence Scale–Fourth Edition (WAIS-IV) Technical and Interpretive Manual*. San Antonio, TX: Pearson Assessment.