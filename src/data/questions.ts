import rawBank from './item-bank.json';

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
  b: number; // Difficulty parameter (-2.5 - +2.5)
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
 * Sample N items from a domain pool.
 * Items are sorted by difficulty (b parameter, ascending) within each domain before
 * sampling to ensure balanced difficulty spread when taking a slice.
 * Uses seeded RNG so the same seed always yields the same set.
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
 * Items are sorted by difficulty (b parameter ascending) so tests progress from
 * easiest to hardest, ensuring a natural and fair assessment experience.
 * This function is deterministic - same domain + count always returns same items.
 * @param domain - The CHC domain to sample from
 * @param count  - Number of items to return (default 16)
 */
export function getDomainTestSet(
  domain: CHCDomain,
  count: number = 16
): QuestionItem[] {
  const pool = QUESTION_BANK.filter((item) => item.domain === domain);
  // Sort by difficulty ascending (easiest first for natural progression)
  const sorted = [...pool].sort((a, b) => a.b - b.b);
  return sorted.slice(0, count);
}