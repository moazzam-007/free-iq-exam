import rawBank from './item-bank-id.json';

// Taksonomi Domain Kemampuan CHC
export type CHCDomain = 'fluid' | 'spatial' | 'quantitative' | 'verbal';

export interface QuestionOption {
  id: number;
  text: string;
  svgContent?: string;
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
  a: number; // Parameter Diskriminasi (0.8 - 2.2)
  b: number; // Parameter Kesulitan (-2.5 hingga +2.7)
  explanation: string;
  sourceRef?: string;
}

export const QUESTION_BANK_ID: QuestionItem[] = rawBank as QuestionItem[];
export const QUESTION_BANK = QUESTION_BANK_ID;

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

function shuffleWithRng<T>(arr: T[], rng: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function sampleDomain(
  domain: CHCDomain,
  count: number,
  rng: () => number
): QuestionItem[] {
  const pool = QUESTION_BANK_ID.filter((item) => item.domain === domain);
  const shuffled = shuffleWithRng(pool, rng);
  return shuffled.slice(0, count);
}

/**
 * Mengembalikan tepat 12 soal untuk Tes Cepat (Skrining Cepat):
 * 3 soal dari masing-masing 4 domain CHC.
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
export const getQuickTestSetId = getQuickTestSet;

/**
 * Mengembalikan tepat 24 soal untuk Tes Standar Lengkap:
 * 6 soal dari masing-masing 4 domain CHC.
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
export const getStandardTestSetId = getStandardTestSet;

/**
 * Mengembalikan soal terfokus per domain CHC dengan stratified sampling.
 */
export function getDomainTestSet(
  domain: CHCDomain,
  count: number = 16,
  seed?: number
): QuestionItem[] {
  const pool = QUESTION_BANK_ID.filter((item) => item.domain === domain);
  if (pool.length <= count) {
    return [...pool].sort((a, b) => a.b - b.b);
  }

  const sorted = [...pool].sort((a, b) => a.b - b.b);
  const n = sorted.length;
  const t1 = Math.floor(n / 3);
  const t2 = Math.floor((2 * n) / 3);

  const easyPool = sorted.slice(0, t1);
  const mediumPool = sorted.slice(t1, t2);
  const hardPool = sorted.slice(t2);

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

  return selected.sort((a, b) => a.b - b.b);
}
export const getDomainTestSetId = getDomainTestSet;
