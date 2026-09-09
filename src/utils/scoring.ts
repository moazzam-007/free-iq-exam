import { type CHCDomain, type QuestionItem } from '../data/questions';

export interface DomainIndexScore {
  rawScore: number;
  total: number;
  theta: number;
  standardScore: number; // Mean 100, SD 15, clamped 60-160
  percentile: number;
}

export interface AssessmentResult {
  rawScore: number;
  totalQuestions: number;
  theta: number;
  sem: number;
  iqEstimate: number; // Standardized IQ (Mean 100, SD 15)
  confidenceInterval: [number, number]; // [lower, upper]
  percentile: number;
  domainBreakdown: Record<CHCDomain, DomainIndexScore>;
  testType: 'quick' | 'standard';
}

// Numerical approximation of error function (Abramowitz and Stegun 7.1.26)
function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-absX * absX);
  return sign * y;
}

// Standard Normal Cumulative Distribution Function
export function normalCdf(z: number): number {
  return 0.5 * (1.0 + erf(z / Math.SQRT2));
}

// 2PL IRT Probability Function with D = 1.702 scaling constant
export function itemProbability(theta: number, a: number, b: number): number {
  const D = 1.702;
  const exponent = -D * a * (theta - b);
  // Guard against numerical overflow
  if (exponent > 40) return 0;
  if (exponent < -40) return 1;
  return 1.0 / (1.0 + Math.exp(exponent));
}

/**
 * Bayesian Expected A Posteriori (EAP) estimation for a given response vector.
 *
 * Uses 81 Gaussian quadrature points from theta = -4.0 to +4.0 with a
 * standard normal prior N(0, 1).
 *
 * Domain Safeguard (Correction 5): For very small item vectors (e.g. 3 items)
 * extreme all-correct or all-incorrect patterns are pulled toward the prior
 * mean via the Bayesian framework itself. We additionally clamp the posterior
 * variance floor at 0.25 (SEM floor = 0.5) to prevent artificially tight CIs
 * on small vectors.
 *
 * Returns { theta, posteriorVariance }.
 */
function eapEstimate(
  responseVector: { a: number; b: number; isCorrect: boolean }[]
): { theta: number; posteriorVariance: number } {
  const numQuadPoints = 81;
  const minTheta = -4.0;
  const maxTheta = 4.0;
  const step = (maxTheta - minTheta) / (numQuadPoints - 1);

  const quadPoints: number[] = [];
  const logPriors: number[] = [];

  for (let i = 0; i < numQuadPoints; i++) {
    const q = minTheta + i * step;
    quadPoints.push(q);
    logPriors.push(-0.5 * q * q); // log of N(0,1)
  }

  // Calculate log-likelihood for each quadrature point
  const logLikelihoods: number[] = [];
  for (const q of quadPoints) {
    let logLik = 0;
    for (const item of responseVector) {
      const p = itemProbability(q, item.a, item.b);
      const clampedP = Math.max(1e-7, Math.min(1 - 1e-7, p));
      logLik += item.isCorrect ? Math.log(clampedP) : Math.log(1 - clampedP);
    }
    logLikelihoods.push(logLik);
  }

  // Log-posterior to avoid underflow
  const logPosteriors: number[] = [];
  for (let i = 0; i < numQuadPoints; i++) {
    logPosteriors.push(logLikelihoods[i] + logPriors[i]);
  }

  const maxLogPosterior = Math.max(...logPosteriors);
  const unnormalizedWeights: number[] = [];
  let sumWeights = 0;

  for (const lp of logPosteriors) {
    const w = Math.exp(lp - maxLogPosterior);
    unnormalizedWeights.push(w);
    sumWeights += w;
  }

  let estimatedTheta = 0;
  // Domain safeguard: floor posterior variance to prevent extreme shrinkage
  // on small item vectors (3-item quick test domains).
  let posteriorVariance = 0.5;

  if (sumWeights > 0) {
    const normalizedWeights = unnormalizedWeights.map((w) => w / sumWeights);
    estimatedTheta = normalizedWeights.reduce((acc, w, idx) => acc + quadPoints[idx] * w, 0);
    const rawVariance = normalizedWeights.reduce(
      (acc, w, idx) => acc + Math.pow(quadPoints[idx] - estimatedTheta, 2) * w,
      0
    );
    // Apply variance floor: max(0.25, computed) to guard small item vectors
    posteriorVariance = Math.max(0.25, rawVariance);
  }

  return { theta: estimatedTheta, posteriorVariance };
}

/**
 * Calculates psychometrically calibrated assessment results using 2PL IRT EAP estimation.
 *
 * @param userAnswers - Map of question ID to selected option ID
 * @param activeQuestions - The specific question set used for this session
 * @param testType - 'quick' (12 items) or 'standard' (24 items)
 */
export function calculateScore(
  userAnswers: Record<number, number>,
  activeQuestions: QuestionItem[],
  testType: 'quick' | 'standard'
): AssessmentResult {
  let rawScore = 0;

  const domainRaw: Record<CHCDomain, { total: number; correct: number; items: { a: number; b: number; isCorrect: boolean }[] }> = {
    fluid: { total: 0, correct: 0, items: [] },
    spatial: { total: 0, correct: 0, items: [] },
    quantitative: { total: 0, correct: 0, items: [] },
    verbal: { total: 0, correct: 0, items: [] },
  };

  // Build global response vector and per-domain vectors
  const globalVector: { a: number; b: number; isCorrect: boolean }[] = [];

  for (const item of activeQuestions) {
    const domainKey = item.domain as CHCDomain;
    domainRaw[domainKey].total += 1;

    const selectedOptionId = userAnswers[item.id];
    const selectedOption = item.options.find((opt) => opt.id === selectedOptionId);
    const isCorrect = selectedOption ? selectedOption.isCorrect : false;

    if (isCorrect) {
      rawScore += 1;
      domainRaw[domainKey].correct += 1;
    }

    const itemEntry = { a: item.a, b: item.b, isCorrect };
    globalVector.push(itemEntry);
    domainRaw[domainKey].items.push(itemEntry);
  }

  // Global EAP estimation
  const { theta: globalTheta, posteriorVariance } = eapEstimate(globalVector);

  // Clamp global theta within plausible psychometric range [-3.0, +3.0]
  const clampedTheta = Math.max(-3.0, Math.min(3.0, globalTheta));
  const sem = Math.sqrt(posteriorVariance);

  // Standardized IQ Scale (Mean = 100, SD = 15)
  const rawIq = 100 + 15 * clampedTheta;
  const iqEstimate = Math.max(60, Math.min(160, Math.round(rawIq)));

  // SEM on 15-point IQ scale and 95% Confidence Interval
  const semIq = 15 * sem;
  const ciLower = Math.max(60, Math.round(iqEstimate - 1.96 * semIq));
  const ciUpper = Math.min(160, Math.round(iqEstimate + 1.96 * semIq));

  // Percentile rank derived from standard normal CDF
  const zScore = (iqEstimate - 100) / 15;
  const rawPercentile = normalCdf(zScore) * 100;
  const percentile = Math.max(0.1, Math.min(99.9, Math.round(rawPercentile * 10) / 10));

  // Per-domain EAP estimation and standard score computation
  const domainBreakdown = {} as Record<CHCDomain, DomainIndexScore>;
  const allDomains: CHCDomain[] = ['fluid', 'spatial', 'quantitative', 'verbal'];

  for (const domain of allDomains) {
    const dData = domainRaw[domain];

    let domainTheta = 0;
    if (dData.items.length > 0) {
      const { theta: dt } = eapEstimate(dData.items);
      domainTheta = Math.max(-3.0, Math.min(3.0, dt));
    }

    const rawDomainScore = 100 + 15 * domainTheta;
    const standardScore = Math.max(60, Math.min(160, Math.round(rawDomainScore)));
    const dZ = (standardScore - 100) / 15;
    const dPercentile = Math.max(0.1, Math.min(99.9, Math.round(normalCdf(dZ) * 1000) / 10));

    domainBreakdown[domain] = {
      rawScore: dData.correct,
      total: dData.total,
      theta: Math.round(domainTheta * 1000) / 1000,
      standardScore,
      percentile: dPercentile,
    };
  }

  return {
    rawScore,
    totalQuestions: activeQuestions.length,
    theta: Math.round(clampedTheta * 1000) / 1000,
    sem: Math.round(sem * 1000) / 1000,
    iqEstimate,
    confidenceInterval: [ciLower, ciUpper],
    percentile,
    domainBreakdown,
    testType,
  };
}
