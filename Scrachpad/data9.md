I'll do this properly — that means real searches across each of these areas, not a single pass. Let me work through the clusters systematically: psychometric theory, item types, open/legal datasets, IRT and scoring, cultural/practice effects, online testing validity, and a competitive audit of existing tests. I'll compile everything with sources at the end.

Let me start.# Building a Scientifically Credible Online IQ Test — Research Findings

This covers test theory, item types, open vs. copyrighted content, psychometrics, fairness, timing, cheating prevention, and a competitive audit — each with sources, evidence, and what it means for your build. I've flagged marketing claims separately from peer-reviewed evidence throughout.

## 1. What to measure: theoretical foundation

The dominant, empirically-supported model is **Cattell-Horn-Carroll (CHC) theory** — a three-stratum hierarchy with general intelligence (*g*) at the top, ~8-10 broad abilities (fluid reasoning Gf, crystallized knowledge Gc, working memory, processing speed, visual-spatial processing, etc.) in the middle, and 70+ narrow abilities at the base. CHC is the dominant empirical framework for modeling cognitive structure, and over the past three decades nearly all major human IQ tests have adopted the CHC approach for test construction and interpretation. It's the result of decades of psychometric research merging Cattell-Horn's Gf-Gc model with Carroll's three-stratum hierarchy derived from factor-analyzing hundreds of datasets.

**Design implication:** Don't invent your own taxonomy of "intelligence domains." Map every subtest explicitly to a CHC broad ability (Gf, Gc, Gwm, Gs, Gv at minimum) — this is what separates a defensible test from an arbitrary puzzle collection, and it's exactly the credibility gap that critiques of amateur online tests point to. A scientifically valid IQ test must be based on established psychological theory, not intuition about what seems intelligent — the most widely accepted framework is CHC, and when a test claims to measure intelligence without aligning to any recognized theory, that's a red flag.

The WAIS-IV — the clinical gold standard — operationalizes this with 15 subtests (10 core, 5 supplemental) organized into four first-order index scores (Verbal Comprehension, Perceptual Reasoning, Working Memory, Processing Speed) and a higher-order Full Scale IQ, and factor-analytic studies with the full 15-subtest battery reveal a 5-factor structure aligned with CHC (acquired knowledge, fluid intelligence, short-term memory, visual processing, processing speed). Importantly, the second-order g factor accounts for the large majority of variance while the first-order group factors account for comparatively little — meaning the WAIS-IV's real strength is measuring g, and clinical interpretation should center there. Design takeaway: don't over-promise on subscale precision (e.g., "your spatial IQ is 118, verbal is 104") — with an online test's shorter subtests, per-domain scores will be far less reliable than the composite.

## 2. Item types with real psychometric track records

| Item type | What it measures | Evidence base |
|---|---|---|
| Matrix reasoning (Raven's-style) | Fluid reasoning, abstraction | Normed in over 35 countries, considered one of the most valid measures of g, especially as a culture-reduced measure — with roughly 23,400 empirical studies in Google Scholar |
| Number/letter series | Fluid reasoning, inductive logic | Used in ICAR and WAIS; automatically generatable with known difficulty (below) |
| Verbal analogies / vocabulary | Crystallized intelligence (Gc) | Core WAIS Verbal Comprehension content |
| 3D mental rotation | Visual-spatial (Gv) | ICAR "Three-Dimensional Rotation" item type |
| Digit/spatial span, n-back | Working memory (Gwm) | Standard WAIS/WMS content; n-back is more contested (see §12) |
| Symbol search / coding | Processing speed (Gs) | Classic speeded subtests on the Wechsler scales — symbol search and coding — where score is the number of correct matches found within a time limit |

**Sample-item source you can actually see:** Condon & Revelle's original ICAR paper describes item construction directly: Matrix Reasoning stimuli are 3×3 arrays of geometric shapes with one shape missing, and participants pick which of six response options completes the pattern; Verbal Reasoning includes logic, vocabulary and general-knowledge questions; Three-Dimensional Rotation shows cube renderings and asks which response option is a possible rotation of the target. That's a legally reusable, published item-construction template (more in §3).

## 3. Legally reusable vs. copyrighted — this matters more than anything else here

This is the single most important thing to get right before writing any items.

**Copyrighted / restricted-access (do NOT copy or closely paraphrase):**
- WAIS, WISC, WMS, WASI — Pearson requires purchasers to hold a professional postgraduate qualification and training in clinical or educational psychology to even buy these tests. When Wechsler tests appeared for resale on eBay, the publisher (then Harcourt) formally asked eBay to restrict sales, citing risk of coaching misuse — publishers actively police secondary markets. Pearson has issued legal notices stating that any unauthorized source selling their tests is subject to legal action.
- Raven's Progressive Matrices — still commercially published and protected, notwithstanding its wide academic use.
- Stanford-Binet, Woodcock-Johnson, Cattell Culture Fair Test — all commercially licensed.

**Legitimately open / public-domain (usable as a foundation):**
- **ICAR (International Cognitive Ability Resource)** — developed specifically because the field lacked a public-domain method for large-scale remote cognitive data collection, with the original 60-item instrument spanning four constructs later expanded, with an international consortium, to over 1,000 items across 19 lower-level constructs. **Critical caveat:** despite being called "public-domain," the maintainers now state "Please note that ICAR is intended for academic use exclusively", and a related archive explicitly notes "A public use license feels less likely to preserve the integrity of the item material (e.g., the scoring keys)". **Design implication:** treat ICAR as a methodological template and a research benchmark to validate against — not as a drop-in item bank for a commercial or public-facing product. If you want to use actual ICAR items commercially, you'd need to contact the maintainers (TU Dortmund / Northwestern) directly for clarification, or — safer — write original items using the same automatic-item-generation logic (§11).
- **IPIP (International Personality Item Pool)** — the sister project for personality, explicitly public domain, has grown to over 3,000 items translated into at least 48 languages. Good precedent for the licensing model to emulate for genuinely open content, though it's personality, not cognition.
- **OpenPsychometrics.org raw data** — datasets are anonymized, users consented to research use, and the data has been used in 25+ published papers; freely available on GitHub/Kaggle mirrors. Their IQ-style test is explicitly built on a named academic model (next point) rather than invented from scratch.
- **Standards for Educational and Psychological Testing (AERA/APA/NCME)** — the current edition has been freely downloadable in PDF/ePub in English and Spanish since March 2021. This is the actual rulebook, not proprietary.

**Design implication — the legally clean path:** build new items from scratch using validated *item-generation templates* (radicals/features known to control difficulty) documented in the open literature — described next — rather than reusing anyone's specific stimuli.

## 4. Automatic item generation (AIG) — how to scale a legally clean item bank

AIG links test construction with computer programming: a test specialist creates a template called an item model, then an algorithm generates test items from it, expected to produce items spanning a wide difficulty range, with fewer construction errors and higher comparability because of the systematic item-model definition. This is exactly how ICAR scaled: ICAR "makes use of automatic item generation techniques, which produce test items with predictable psychometric properties".

Concretely, for number-series items: a study built an automated number-series item generator, validated construct validity against the 16-item ICAR sample test, and found that under a Linear Logistic Test Model all the cognitive operators used to construct items were significant predictors of item difficulty, with high correlations to the ICAR Letter-Number-Series items. That means: **you can generate an unlimited, non-infringing pool of number-series items whose difficulty is predictable in advance from the generation rule**, rather than manually writing and piloting each one.

More broadly: research has built five open-source item generators, showing that a "weak theory" approach to designing generators was just as credible as a "strong theory" approach, and estimated the psychometric properties of generated items using IRT models. And on the test-security side specifically: automatic item generation potentially addresses test-security concerns for unproctored online cognitive testing because once the elements driving item difficulty are calibrated, an unlimited supply of items with known psychometric properties can be produced with little to no human review before use — directly solving your item-exposure problem (§9) and your legal-content problem (§3) at once.

## 5. Item-writing quality control

Even with AIG, distractor design and wording matter. The field standard is Haladyna, Downing & Rodriguez (2002), which validated a taxonomy of 31 multiple-choice item-writing guidelines through two evidence sources: consensus across 27 testing textbooks, and a review of 27 published research studies. Practical rules that survived empirical testing include using three effective options rather than four or five (with only one correct answer, positioned in varying order), keeping distractors homogeneous in content and grammar and roughly equal in length, avoiding "none/all of the above," and phrasing stems positively without unnecessary "window dressing". One specific empirical finding to apply directly: a pilot experiment found that when the correct option was noticeably longer than distractors or shared more wording with the stem, this measurably affected the item's psychometric properties — i.e., don't accidentally make the correct answer identifiable by its length or phrasing echo.

## 6. Item difficulty, discrimination, and Item Response Theory (IRT)

This is the actual math that turns "a pile of puzzle questions" into a measurement instrument.

**Classical Test Theory basics** (easy to implement, good for pilot/small-N stage): the difficulty index (proportion correct) should optimally sit between 0.30 and 0.70 for maximum discrimination, and point-biserial correlation — correlating an item's score with the total test score — should be at or above 0.30 for adequate items, 0.40 for good items. Negative discrimination (weaker test-takers outperforming stronger ones on a specific item) is the single most diagnostic red flag in CTT, almost always indicating a mis-keyed or flawed item.

**IRT (needed once you have real response data, and essential for adaptive testing):**
- The *a* parameter is item discrimination — the steepness of the item response curve; the *b* parameter is item difficulty — the ability level at which a test-taker has a 50% chance of a correct response; the *c* parameter is the pseudo-guessing floor.
- The 1PL/Rasch model estimates only difficulty (assumes all items equally discriminating); the 2PL adds a per-item discrimination parameter; the 3PL adds guessing. Rule of thumb: 2PL needs roughly 500+ respondents per item to calibrate stably, 3PL needs 1000+. For multiple-choice items, guessing parameters typically cluster around 0.20 for 5-option items and 0.25 for 4-option items.
- A more advanced finding directly relevant to matrix-reasoning-style items: a 4PL IRT analysis of Raven's Colored Progressive Matrices found non-zero guessing parameters — meaning even a "pure reasoning" nonverbal test shows measurable lucky-guessing effects — and recommended variable estimation methods rather than assuming zero guessing.

**Design implication:** launch with CTT-vetted items (cheap, fast), but architect your data pipeline from day one to log every response with timestamp and item ID so you can fit IRT models once you have a few hundred respondents per item — this is also the prerequisite for computerized adaptive testing (§9).

## 7. Reliability

Cronbach's alpha thresholds are commonly interpreted as: 0.90+ very highly reliable, 0.80–0.90 highly reliable, 0.70–0.79 reliable, 0.60–0.69 marginal, below 0.60 unacceptably low. But treat 0.70 as a floor, not a target: Nunnally's actual recommendation was 0.70 only for early-stage research, 0.80 for basic research, and 0.90 as the minimum where decisions hinge on individual scores — and importantly, a high alpha does not by itself prove a scale measures one thing, since it's a lower-bound estimate that rises mechanically as you add items. There's also a documented meta-scientific problem worth knowing about: reported alpha values in the psychology literature show suspicious clustering right at the .70/.80/.90 thresholds, consistent with "alpha-hacking" to clear a bar rather than genuine reliability — don't design toward a magic number, report your actual computed value.

For Raven's-type matrices specifically, published benchmarks you can compare against: test-retest reliability around r = .84, internal consistency Cronbach's α ≥ .76, split-half reliability ≥ .89.

## 8. Validity — and an important controversy to know about

Construct validity for reasoning-type items is well established: Raven's-type matrices show significant correlations with other cognitive-ability measures, supporting that they capture underlying general cognitive skill across diverse populations.

For predictive/criterion validity (does IQ predict real-world outcomes), be aware of an active, unresolved debate rather than citing the classic number uncritically. The frequently-cited claim is Schmidt & Hunter's 1998 meta-analysis finding cognitive ability predicts job performance at approximately r = .51. But: Sackett et al. (2022) critiqued that figure, offering a mean corrected validity of .31 by integrating prior meta-analyses of 20th-century data; and a follow-up study using only studies from 2000–2021 found a mean corrected validity of just .22 — a much smaller estimate than Schmidt & Hunter's .51, concluding cognitive ability is related to job performance but the magnitude is lower than earlier estimates. **Design implication:** if your test's marketing ever cites predictive validity, cite it honestly as a contested and declining estimate, not a fixed .51 — this exact kind of overclaim is what separates rigorous positioning from marketing fluff.

## 9. Norms and scoring methodology

Standard IQ scoring uses a mean of 100 and standard deviation of 15, with roughly two-thirds of scores falling between 85 and 115. This is "deviation IQ" — your raw score is converted into where you fall in a **normative sample's** distribution, not an absolute quantity.

Getting norms right is genuinely the hardest and most resource-intensive part: a sample is representative only if the proportions of relevant subgroups (age, sex, education, SES, ethnicity) match the reference population's actual proportions — establishing this is one of the hardest parts of test construction, especially with limited resources. There's a modern statistical shortcut worth knowing: continuous/regression-based norming (the cNORM approach) can achieve with roughly 100 respondents per age cohort the same precision that conventional norming needs 400+ for, and post-stratification weighting (raking) can correct a non-representative convenience sample after the fact using known population proportions on stratification variables — directly useful since your initial test-takers (people who find an online IQ test) will skew young, educated, and self-selected.

IQ classification labels are conventional, not scientific facts: the category labels for IQ score ranges are specific to each test publisher — there's no uniform practice, and psychologists are advised to specify which test was used since a "gifted" cutoff on one instrument isn't equivalent to another's. A commonly used version (WAIS-IV-style): 130+ Very Superior, 120–129 Superior, 109–119 High Average, 90–109 Average, 80–89 Low Average, 70–79 Borderline, 69 and below Extremely Low. Use a labeled scale like this but disclose which convention you're using and that it's descriptive shorthand, not a diagnostic category.

## 10. Age, culture, and language effects

**The Flynn effect** (scores rising generationally) is one of the most robust findings in the field: Trahan et al. found the effect averages about 2.93 IQ points per decade across Stanford-Binet and Wechsler tests with no evidence of diminishing, though Pietschnig & Voracek's meta-analysis of nearly 4 million participants found the effect has decreased in recent decades and differs by domain — 0.41 points/year for fluid, 0.30 for spatial, 0.28 for full-scale, and only 0.21 for crystallized IQ — and is stronger in adults than children. Design implication: **your norms will go stale.** Plan to re-norm periodically (every 5-10 years is standard practice for professional tests) rather than treating a launch-year normative sample as permanent.

**Culture and language fairness** — be epistemically honest here, because "culture-fair" is widely overclaimed. Score differences alone aren't evidence of bias — bias specifically means a group has a systematic advantage for reasons unrelated to the actual construct being measured, and it's possible to have real group differences on an unbiased test. More importantly: "culture-reduced" is the more defensible term than "culture-fair" — nonverbal tests are real improvements over heavily verbal measures for cross-cultural use, but no test is completely culture-neutral, because culture shapes how people approach problems, not just what vocabulary they know. The statistical tool for actually checking this empirically is **Differential Item Functioning (DIF)**: DIF exists when people from different groups with the same underlying ability have different probabilities of answering an item correctly — it doesn't automatically mean bias, but requires review and judgment. Standard DIF detection methods include Mantel-Haenszel, logistic regression, IRT-based likelihood-ratio tests, and SIBTEST, with a recommended sample size of at least 200-250 per comparison group for adequate statistical power.

**Design implication:** run DIF analysis by gender, age band, and (where you have data) region/language as soon as you have enough respondents per group — flag or retire items that show DIF against your intended interpretation, and don't market the test as "culture-fair" — market it as "designed to minimize language and cultural dependency, validated for DIF across [groups]."

## 11. Timing and test length: speed vs. power

There's a formal distinction you should build around deliberately: a power test uses items without a meaningful time limit, so individual differences in score reflect ability rather than speed, versus a speeded test uses a set of relatively easy items with a deliberately short time limit, so that no test-taker can finish, and the score mainly reflects processing speed rather than knowledge. Most professional reasoning tests are power tests with a generous — not brutal — time limit: generous time limits produce more positive candidate perceptions than tight speed tests, are fairer to non-native speakers who need more time to read questions, and unlimited time would open the door to cheating and collusion, so a limit is still needed, just a generous one calibrated from actual completion-time data during piloting.

On length/duration for reference: WAIS-IV full battery is roughly 60-90 minutes; the openly-documented professional online alternative, RIOT, runs 15 subtests across five cognitive indices, completed in 60 minutes or less; Mensa's own admission test is two parts, taking 1-2 hours total. **Design implication:** for an online consumer test, 20-40 minutes across 4-5 domains with generous per-item timing (piloted, not guessed) is a defensible middle ground — long enough for adequate reliability, short enough to avoid fatigue-driven score decay partway through.

## 12. Practice effects and retesting

This is a real, well-quantified confound you must design around: a meta-analysis of 50 studies (107 samples, 134,436 participants) found an adjusted overall practice-effect size of .26 on cognitive ability retests, larger when practice was combined with coaching and when identical test forms were reused. A more recent and more granular meta-analysis: Scharfen, Peters & Holling (2018) analyzed 174 samples from 122 studies (786 test outcomes, N=153,185) across up to four test administrations, finding significant retest effects with no further score gains after the third administration, moderated by the cognitive operation and content tested, whether equivalent test forms were used, the retest interval, and participant age.

**Design implication:** (1) build multiple parallel/equivalent forms from your item bank so repeat test-takers don't just relearn the same items; (2) if you let people retake the test, show them a note that scores typically rise ~0.2-0.3 SD on retest for reasons unrelated to real ability change; (3) don't let someone "practice" your test and then present a later score as more accurate — it isn't necessarily, it's partly artifact.

## 13. Online/unproctored accuracy vs. clinical administration

This is good news for your use case, with real nuance. In personnel-selection research directly comparable to your setting: a study of 537 candidates in the Norwegian Armed Forces compared proctored fixed-length tests against an at-home unproctored computerized-adaptive battery, and found convergent validity coefficients did not significantly differ between proctored and unproctored conditions — no evidence of score inflation or deflation in the unproctored group. Similarly for cognitive batteries generally: prior reports show moderate correlations between web-based assessments and paper-and-pencil versions, and moderate-to-high correlations between parallel computerized versions administered in-lab vs. at-home or supervised vs. unsupervised — suggesting web-based assessment can be a viable alternative to in-person testing, and one specific unsupervised trial found global cognition composites showed excellent test-retest reliability (ICC > 0.8) over a one-month unsupervised follow-up, though individual measures varied more (ICC 0.20–0.83).

The honest caveat: validity held up better at the *aggregate/composite* level than for individual subtests, and this research is mostly on working-age or older adult samples completing established batteries — not on brand-new unvalidated items. **Design implication:** report a composite score with high confidence; be more conservative about precision on individual subscale scores, and say so explicitly in your results UI.

## 14. Anti-cheating, randomization, and item-bank security

Three complementary layers, each with evidence:

**1. Item exposure control (statistical).** If the same handful of best-discriminating items get shown to everyone, they leak. The Sympson-Hetter method inserts a probabilistic gate between item selection and administration so no single item is shown to more than a target fraction of test-takers, protecting against memorization and item-sharing, and simulation research comparing exposure-control methods found the "Fade Away" method distributed item exposure more evenly and achieved higher test security than the Sympson-Hetter baseline, without meaningfully hurting measurement precision.

**2. Item generation (structural).** As covered in §4 — a large, algorithmically-generated item pool with known difficulty parameters means no fixed set of "the 60 questions" for someone to leak or memorize in the first place.

**3. Behavioral/statistical fraud detection.** A 2026 method directly built for this: "CHIPS" (CHeater Identification using Interim Person-fit Statistic) uses response-time patterns to compute a statistic at each step of an adaptive test, flagging likely item-preknowledge or cheating in real time rather than only after the full test is scored. On lighter-weight identity/attention checks: an experimental comparison of identical online courses found cheating was measurably occurring in unproctored exam conditions, and webcam-based remote proctoring was effective at mitigating it — though a separate controlled study found more mixed results: no statistically significant score difference between a webcam-proctored group and an unproctored group, with the unproctored group actually scoring slightly higher. And for general online data-quality hygiene, careless/inattentive responding is a distinct problem from cheating: standard detection methods include long-string/straightlining indices, response-time-based "speeding" flags, and psychometric attention-check items.

**Design implication:** you almost certainly don't need identity-verifying webcam proctoring for a consumer product (it hurts UX more than the evidence justifies for non-high-stakes use) — invest instead in (a) a large generated item pool with exposure control, (b) response-time-based flags for implausibly fast completions, and (c) randomized item order/parallel forms per session.

## 15. Existing online IQ tests — what's actually good vs. marketing

**The scientifically-documented benchmark that most resembles what you want to build:** the **RIOT (Reasoning and Intelligence Online Test)** by psychologist Dr. Russell T. Warne, released 2025. It's the closest existing precedent to "credible test built specifically for online self-administration": 15 subtests across five CHC-aligned indices, completed in under 60 minutes, and standardized on a U.S. norm sample representative of the general population, built around a clear theory of intelligence, refined through multiple pilot-testing and analysis stages, and developed in accordance with AERA/APA/NCME standards. Worth noting honestly: its technical manual is still "in progress" with only a summary currently public, and as a new test it is still the subject of ongoing research — i.e., even the best current example is early-stage and not yet fully peer-reviewed/independently validated. Good north star, not a finished template to copy.

**The academically-grounded free test:** OpenPsychometrics' IQ-style test is based on the model of intelligence proposed by Hampshire, Highfield, Parkin & Owen (2012), which the site states they chose because it fits best on internet populations — this is at least a named, published model rather than invented content, though it's a repurposed research instrument, not a standardized/normed commercial test.

**What's actually wrong with most of the rest of the market**, per a professional critique aligned with everything above: most online IQ tests are created by people without training in psychometrics — questions lack calibration, scoring is arbitrary, and claimed accuracy is unsupported by evidence; many sites inflate scores to drive paid "certificate" upsells; and results have no relationship to established measures because the tests lack norm data and peer review. Specific documented failure modes: most online tests have never been through peer review, don't meet AERA/APA/NCME standards, and use self-selected internet visitors as their "norm sample" — which distorts scores because that sample isn't representative of any real population.

**A marketing claim to flag explicitly (not scientific evidence):** a "Real IQ Online" press release claims a baseline study of over 3,500 participants and a "notable correlation of 0.9" and elsewhere claims accuracy "within 1.8%" of in-person tests. This is a company press release, not a peer-reviewed study — no methodology, no independent replication, no published manual. Treat this the way you should treat any of your future competitors' claims: as marketing until an actual technical report or peer-reviewed paper backs it.

## 16. Games/benchmarks and cognitive-training research — a design caution

Two findings should shape how you talk about your test, especially if you're tempted to add "brain training" framing:

Hampshire, Highfield, Parkin & Owen (2012) analyzed factor models of both individual performance and brain functional organization, finding that different components of intelligence map onto distinct brain networks rather than a single unified system, with the higher-order "g" factor emerging because cognitive tasks jointly recruit multiple networks — useful theoretical backing for a multi-domain (not single-score-only) design, but note this is a contested reframing of g, not a consensus replacement for it.

More directly relevant as a guardrail: Owen et al.'s landmark 2010 Nature study trained 11,430 participants on reasoning, memory, planning, visuospatial and attention tasks for six weeks and found improvements on every trained task, but no evidence of transfer to untrained tasks — even when those tasks were cognitively closely related. The "dual n-back raises fluid intelligence" claim is genuinely contested in the literature: the original Jaeggi et al. 2008 PNAS study claimed training effects were dosage-dependent and transferred to fluid intelligence measures, but a controlled replication with 93 participants found no significant improvement in fluid intelligence or working memory capacity after 8 or 20 days of matched dual n-back training. **Design implication:** don't market your IQ test (or any adjacent "training" feature) with claims that repeated play "raises your IQ" or "improves your brain" — the strongest current evidence says practice raises scores on the *specific trained task*, not the underlying construct, and any transfer claims are actively disputed rather than settled science.

## 17. Data-privacy consideration worth flagging to counsel

Under GDPR, "special category" personal data includes data concerning health, and inferences about a person are treated as special-category data based on the type of information being inferred, regardless of the statistical confidence of that inference. Cognitive-ability scores aren't explicitly listed as special-category data the way medical diagnoses are, but if your product ever frames results in clinical terms (e.g., implying learning-disability screening) that framing could pull it into that category. This is genuinely a gray area rather than settled law — worth a real legal review before launch, not something to resolve from search results alone.

---

## Bringing it together: a synthesis, not a recommendation to follow blindly

- **Theory:** Anchor every item to CHC (Gf, Gc, Gwm, Gs, Gv minimum).
- **Content:** Build new items via automatic item generation using published, non-proprietary item-model logic (number series, matrix reasoning, 3D rotation) rather than adapting ICAR/WAIS/Raven's stimuli directly — ICAR's own maintainers restrict it to academic use.
- **Structure:** 20-40 minutes, power-test format with generous piloted time limits, 4-5 domains, parallel forms.
- **Psychometrics:** CTT vetting pre-launch (p between .3-.7, point-biserial ≥ .3), migrate to 2PL/3PL IRT once you have a few hundred responses per item; report actual computed reliability, target ≥.80.
- **Norms:** Collect demographics, use post-stratification weighting against census data rather than assuming your early users are representative; plan to re-norm every ~5-10 years given Flynn-effect drift.
- **Fairness:** Run DIF checks by gender/age/region as soon as N allows; describe the test as "culture-reduced," never "culture-free."
- **Security:** Large generated item pool + exposure-control algorithm + response-time anomaly flags, skip invasive webcam proctoring for a consumer product.
- **Honesty layer:** Disclose norm-sample composition, current reliability/validity estimates, and that scores are estimates with confidence intervals — this transparency is precisely what's missing from the tests criticized above, and precisely what would differentiate yours.

## Source list (grouped)

**Theory/structure:** Wiley CHC overview (onlinelibrary.wiley.com/doi/full/10.1002/9781118660584.ese0431) · Wikipedia CHC theory · iapsych.com/chcbrief.htm · PMC Carroll 3-stratum theory (pmc.ncbi.nlm.nih.gov/articles/PMC9959556) · WAIS-IV factor structure (pmc.ncbi.nlm.nih.gov/articles/PMC10681435, ux1.eiu.edu Canivez & Watkins 2010)

**Item banks/open data:** Condon & Revelle 2014, *Intelligence* (researchgate.net/publication/260232260) · icar-project.com · ICAR ScienceDirect review (sciencedirect.com/science/article/pii/S0191886920300957) · Revelle, Dworak & Condon 2020, *Current Directions in Psych Science* (journals.sagepub.com/doi/10.1177/0963721420922178) · IPIP background (same ScienceDirect source) · openpsychometrics GitHub mirror (github.com/haghish/openpsychometrics)

**Raven's/matrices validity:** pmc.ncbi.nlm.nih.gov/articles/PMC8883956 (4PL IRT guessing) · pmc.ncbi.nlm.nih.gov/articles/PMC12351228 (short-form validation) · pubmed.ncbi.nlm.nih.gov/35658791 (abridged APM)

**IRT/psychometrics:** assess.com (difficulty, discrimination, guessing parameter explainers) · metricgate.com/docs/irt-2pl-vs-3pl-explained · jmp.com item-response-curve-models

**Reliability:** psychologicalscience.org/journals/ampps (alpha-hacking) · support.sas.com Cronbach's coefficient documentation

**Validity/predictive:** stafforini.com Schmidt & Hunter 1998 · experts.umn.edu Sackett et al. contemporary GCA-performance study · gwern.net/doc/iq/ses/2023-sackett.pdf

**Flynn effect:** pmc.ncbi.nlm.nih.gov/articles/PMC3008673 (Pietschnig, Voracek & Formann 2010) · kcl.ac.uk news on Wongupparaj meta-analysis · en.wikipedia.org/wiki/Flynn_effect

**Culture/fairness/DIF:** en.wikipedia.org/wiki/Differential_item_functioning · pmc.ncbi.nlm.nih.gov/articles/PMC8961895 (DIF + missing data) · riotiq.com articles on culture-fair testing

**Practice/retest effects:** gwern.net/doc/iq/2018-scharfen.pdf (Scharfen, Peters & Holling) · ecommons.cornell.edu (Hausknecht et al. 2007) · pmc.ncbi.nlm.nih.gov/articles/PMC6963292 (retest + anxiety)

**Online vs. proctored validity:** ebsco.com (Norrøne & Nordmo 2025) · jmir.org/2020/8/e16792 (CANTAB web vs. lab) · cogstate.com/?p=17951

**Test security/CAT:** psicothema.com/pdf/3632.pdf (exposure control methods) · metricgate.com/docs/sympson-hetter-exposure-control · link.springer.com/article/10.1007/s00180-026-01739-1 (CHIPS)

**Item writing/AIG:** experts.umn.edu (Haladyna, Downing & Rodriguez 2002) · en.wikipedia.org/wiki/Automatic_item_generation · pmc.ncbi.nlm.nih.gov/articles/PMC6480725 (ANSIG number-series generator) · doaj.org SAGE Open (Ryoo et al. 2022)

**Standards/legal:** en.wikipedia.org/wiki/Standards_for_Educational_and_Psychological_Testing · aera.net open-access announcement · psy.plymouth.ac.uk Pearson qualification requirements (WAIS-III/IV, WMS, WASI, WISC) · pearsonclinical.in/notice · technologyreview.com (eBay case)

**Mensa/comparators:** us.mensa.org/join/testscores · riotiq.com (Mensa & high-IQ societies) · riotiq.com (RIOT main site + articles on online-test legitimacy)

**Cognitive-training caveats:** owenlab.uwo.ca/pdf/2010-Owen-Nature (brain training) · owenlab.uwo.ca/pdf/2012-Hampshire-Neuron (Fractionating Human Intelligence) · en.wikipedia.org/wiki/N-back

**Speed vs. power/timing:** assess.com/?p=45459 · talentlens.com Watson-Glaser III whitepaper · doaj.org (Kyllonen & Zu 2016, response-time review)

**Norms/standardization:** pmc.ncbi.nlm.nih.gov/articles/PMC11289220 (cNORM tutorial) · psychometrica.de/cNorm_preparation_en.html

**Aging/fluid-crystallized:** pmc.ncbi.nlm.nih.gov/articles/PMC8809681 (Tucker-Drob et al. 2022, *Science Advances*)

**Privacy:** ico.org.uk / dataprotection.ie special-category-data guidance

Let me know if you want me to go deeper on any one piece — e.g., actually drafting a CHC-mapped item-generation spec, a norming/sampling plan, or the IRT calibration pipeline in code.