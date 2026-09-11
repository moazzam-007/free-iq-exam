import rawBank from './item-bank-ru.json';

// CHC Broad Ability Domain taxonomy
export type CHCDomain = 'fluid' | 'spatial' | 'quantitative' | 'verbal';

export interface QuestionOption {
  id: number;
  text: string;           // Option text for verbal/quantitative items, empty for pure SVG
  svgContent?: string;    // SVG snippet for visual options
  isCorrect: boolean;
  distractorType?: string;
}

export interface QuestionItem {
  id: number;
  domain: CHCDomain;
  subType: string;
  domainLabel: string;
  promptType: 'svg' | 'text' | 'hybrid';
  promptText: string;
  promptSvg?: string;
  options: QuestionOption[];
  a: number; // Discrimination parameter (0.8 - 2.2)
  b: number; // Difficulty parameter (-2.5 to +2.7)
  explanation: string;
  sourceRef?: string;
}

// Cast the raw JSON import to our typed interface
export const QUESTION_BANK: QuestionItem[] = rawBank as QuestionItem[];

// --- Sampler Helpers ---

/**
 * Deterministic seeded pseudo-random number generator (Mulberry32).
 * Returns a function that yields values in [0, 1).
 */
function createRng(seed: number): () => number {
  let s = seed >>> 0;
  return function (): number {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle using a provided RNG.
 */
function shuffleWithRng<T>(arr: T[], rng: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Sample N items uniformly from a domain pool using a seeded RNG (Fisher-Yates shuffle).
 * Uses seeded Mulberry32 RNG so identical seeds yield reproducible item sequences.
 */
function sampleDomain(
  domain: CHCDomain,
  count: number,
  rng: () => number
): QuestionItem[] {
  const pool = QUESTION_BANK.filter((item) => item.domain === domain);
  const shuffled = shuffleWithRng(pool, rng);
  return shuffled.slice(0, count);
}

/**
 * Returns exactly 12 items for the Quick Test:
 * 3 items from each of the 4 CHC domains.
 * @param seed - Optional seed for reproducibility. Defaults to a random seed.
 */
export function getQuickTestSet(seed?: number): QuestionItem[] {
  const effectiveSeed = seed ?? Math.floor(Math.random() * 0xffffffff);
  const rng = createRng(effectiveSeed);

  const domains: CHCDomain[] = ['fluid', 'spatial', 'quantitative', 'verbal'];
  const result: QuestionItem[] = [];

  for (const domain of domains) {
    const items = sampleDomain(domain, 3, rng);
    result.push(...items);
  }

  return result;
}

/**
 * Returns exactly 24 items for the Standard Test:
 * 6 items from each of the 4 CHC domains.
 * @param seed - Optional seed for reproducibility. Defaults to a random seed.
 */
export function getStandardTestSet(seed?: number): QuestionItem[] {
  const effectiveSeed = seed ?? Math.floor(Math.random() * 0xffffffff);
  const rng = createRng(effectiveSeed);

  const domains: CHCDomain[] = ['fluid', 'spatial', 'quantitative', 'verbal'];
  const result: QuestionItem[] = [];

  for (const domain of domains) {
    const items = sampleDomain(domain, 6, rng);
    result.push(...items);
  }

  return result;
}

/**
 * Returns up to `count` items from a single CHC domain for focused category tests.
 * Implements stratified sampling across difficulty terciles (Easy, Medium, Hard)
 * to eliminate ceiling effects and ensure full latent ability coverage (-2.0 to +2.5).
 * Items are sorted by difficulty (b parameter ascending) so tests progress naturally.
 *
 * @param domain - The CHC domain to sample from
 * @param count  - Number of items to return (default 16)
 * @param seed   - Optional seed for deterministic reproducibility
 */
export function getDomainTestSet(
  domain: CHCDomain,
  count: number = 16,
  seed?: number
): QuestionItem[] {
  const pool = QUESTION_BANK.filter((item) => item.domain === domain);
  if (pool.length <= count) {
    return [...pool].sort((a, b) => a.b - b.b);
  }

  // Sort domain pool by difficulty b ascending
  const sorted = [...pool].sort((a, b) => a.b - b.b);

  // Split pool into 3 terciles: Easy (bottom 33%), Medium (middle 33%), Hard (top 34%)
  const n = sorted.length;
  const t1 = Math.floor(n / 3);
  const t2 = Math.floor((2 * n) / 3);

  const easyPool = sorted.slice(0, t1);
  const mediumPool = sorted.slice(t1, t2);
  const hardPool = sorted.slice(t2);

  // Allocate items proportionally across terciles (e.g. 5 easy, 6 medium, 5 hard for count = 16)
  const easyCount = Math.floor(count / 3);
  const hardCount = Math.floor(count / 3);
  const mediumCount = count - easyCount - hardCount;

  const effectiveSeed = seed ?? Math.floor(Math.random() * 0xffffffff);
  const rng = createRng(effectiveSeed);

  const sampleTier = (tier: QuestionItem[], k: number): QuestionItem[] => {
    if (tier.length <= k) return [...tier];
    return shuffleWithRng(tier, rng).slice(0, k);
  };

  const selected = [
    ...sampleTier(easyPool, easyCount),
    ...sampleTier(mediumPool, mediumCount),
    ...sampleTier(hardPool, hardCount),
  ];

  // Sort final selected items by difficulty ascending (b ascending)
  return selected.sort((a, b) => a.b - b.b);
}