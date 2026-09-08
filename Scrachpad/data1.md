Completed the deep research and consolidated it into a **100-source evidence-backed design blueprint**.

[Download the full research report — Online IQ-Style Test Design Blueprint](sandbox:/mnt/data/online_iq_test_deep_research_design_report.docx)

### The most important conclusions

**1. Build a psychometric assessment, not a quiz.**
The strongest standards and validity literature says validity concerns the *interpretation and use of scores*, not simply whether a test produces a number. That means an online score cannot legitimately be marketed as clinically equivalent to WAIS/Raven merely because it uses similar-looking puzzles. ([The Standards for Testing][1])

**2. The best foundation is a reasoning-centered multi-domain test with IRT.**
The evidence supports a structure centered on matrix/figural induction, numerical/inductive reasoning, spatial reasoning, verbal abstraction, and optionally working memory. ICAR is particularly valuable because its original validation describes a public-domain cognitive measure with strong general-factor saturation and a very large online sample. ([ScienceDirect][2])

My recommended v1 architecture is **50 scored items**: 16 matrix/figural, 10 numerical, 8 spatial, 8 verbal, 8 working-memory, with a separate speed module rather than silently mixing speed into the core ability score.

**3. Norming is one of the biggest weaknesses of online IQ tests.**
You cannot take the mean/SD of website visitors and turn that into a population IQ distribution. Raven research demonstrates substantial effects of country, socioeconomic context and time, while a current 2026 Indian study illustrates how applying legacy norms to a different population can produce very large distortions. ([ScienceDirect][3])

The scoring pipeline I recommend is:

`responses → IRT ability θ → population-specific norm model → 100/15 score → percentile + confidence interval`

**4. Unsupervised online testing has a genuine validity/security problem.**
A peer-reviewed natural experiment found score inflation on an unproctored internet cognitive test. Meanwhile, current British Mensa testing demonstrates the opposite direction: secure/proctored online administration with identity and environment controls. ([ScienceDirect][4])

So the product should distinguish clearly between an **unsupervised reasoning estimate** and a **secure/high-stakes assessment**.

**5. Retakes are a serious measurement issue.**
A large meta-analysis covering 50 studies, 107 samples and 134,436 participants found measurable practice effects, with larger gains under coaching and identical forms. ([PubMed][5])
That makes alternate forms, large item pools, exposure controls and retest policies essential.

**6. “Culture-fair” should not be a marketing claim.**
Matrix tests reduce linguistic dependence, but the evidence does not justify assuming that visual reasoning is automatically culture-neutral. Measurement invariance and DIF need to be demonstrated for the populations you serve. ([PubMed Central (PMC)][6])

**7. The most promising commercial gap is surprisingly specific.**
The public market contains plenty of online “IQ tests,” but very few combine all of these: **open/cleared item provenance + large calibrated item bank + IRT + representative norms + multilingual invariance/DIF analysis + explicit SEM/uncertainty + retest/exposure controls + independent validation + public technical documentation**.

The report also separates **scientifically supported evidence from vendor marketing claims** for IQTest.com, 123test, ARealMe, Cambridge Brain Sciences, Mensa and other products.

### Legal/reuse conclusion

The safest route is to create **entirely original items, artwork and instructions**, while using genuinely open/public-domain resources only after verifying their current terms. ICAR is the strongest open starting point I found; WAIS/Pearson and Raven’s 2 should be treated as proprietary benchmarks, not question banks. U.S. copyright law distinguishes ideas/procedures from protected expression, but that does **not** make copying proprietary test items safe. ([Legal Information Institute][7])

Creative Commons terms also matter: CC BY permits commercial adaptation with attribution, whereas NC and ND restrictions can make material unsuitable for a commercial test. ([Creative Commons][8])

The report contains the full **100-source index with direct links, evidence classification, reuse notes, item examples, psychometric methodology, competitor audit, validation roadmap, anti-cheating strategy, and a concrete v1 specification**.

[1]: https://www.testingstandards.net/open-access-files.html?utm_source=chatgpt.com "Open Access Files - THE STANDARDS FOR EDUCATIONAL AND PSYCHOLOGICAL TESTING"
[2]: https://www.sciencedirect.com/science/article/pii/S0160289614000051?utm_source=chatgpt.com "The international cognitive ability resource: Development and initial validation of a public-domain measure - ScienceDirect"
[3]: https://www.sciencedirect.com/science/article/pii/S0010028599907351?utm_source=chatgpt.com "The Raven's Progressive Matrices: Change and Stability over Culture and Time - ScienceDirect"
[4]: https://www.sciencedirect.com/science/article/pii/S0747563209000260?utm_source=chatgpt.com "Internet testing: A natural experiment reveals test score inflation on a high-stakes, unproctored cognitive test - ScienceDirect"
[5]: https://pubmed.ncbi.nlm.nih.gov/17371085/ "https://pubmed.ncbi.nlm.nih.gov/17371085/"
[6]: https://pmc.ncbi.nlm.nih.gov/articles/PMC8816982/?utm_source=chatgpt.com "Cross-cultural differences in visuo-spatial processing and the culture-fairness of visuo-spatial intelligence tests: an integrative review and a model for matrices tasks - PMC"
[7]: https://www.law.cornell.edu/uscode/text/17/102 "https://www.law.cornell.edu/uscode/text/17/102"
[8]: https://creativecommons.org/reusing-cc-licensed-content/ "https://creativecommons.org/reusing-cc-licensed-content/"
