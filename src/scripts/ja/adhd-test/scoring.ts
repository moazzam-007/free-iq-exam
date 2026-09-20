/**
 * WHO Adult ADHD Self-Report Scale (ASRS v1.1) Part A 6-Question Screener
 * Pure Scoring Logic and Question Definitions
 * Reference: Kessler RC et al. (2005) Psychological Medicine, 35(2), 245-256.
 */

export interface ADHDQuestion {
  id: number;
  text: string;
  context: string;
  shadedThreshold: number; // 2 for items 1-3 ("時々ある"以上), 3 for items 4-6 ("しばしばある"以上)
}

export const ADHD_QUESTIONS_JA: ADHDQuestion[] = [
  {
    id: 1,
    text: '物事の段取りをつけたり、細かい詰めの段階で、最後までやり遂げるのが難しいと感じることがありますか？',
    context: 'プロジェクトの仕上げ・細部の完遂',
    shadedThreshold: 2
  },
  {
    id: 2,
    text: '計画性を要する作業を行う際、物事を順番に進めることが難しいと感じることがありますか？',
    context: 'タスクの順序立て・段取り',
    shadedThreshold: 2
  },
  {
    id: 3,
    text: '約束やしなければならない用事を忘れてしまうことがありますか？',
    context: '約束・スケジュールの記憶',
    shadedThreshold: 2
  },
  {
    id: 4,
    text: 'じっくりと考える必要がある作業を始めるのを避けたり、先延ばしにしたりすることがありますか？',
    context: '集中を要する作業の着手・先延ばし',
    shadedThreshold: 3
  },
  {
    id: 5,
    text: '長時間座っていなければならないとき、手足をそわそわ動かしたり、体をゆすったりすることがありますか？',
    context: '着席時の身体的そわそわ・微細運動',
    shadedThreshold: 3
  },
  {
    id: 6,
    text: 'まるで「何かに駆り立てられている」かのように、過剰に活動的になったり、じっとしていられなくなったりすることがありますか？',
    context: '内的駆動感・過剰な活動性',
    shadedThreshold: 3
  }
];

export const ADHD_OPTIONS_JA = [
  { value: 0, label: '全くない' },
  { value: 1, label: 'めったにない' },
  { value: 2, label: '時々ある' },
  { value: 3, label: 'しばしばある' },
  { value: 4, label: '非常に頻繁にある' }
];

export interface ADHDItemResult {
  questionId: number;
  questionText: string;
  responseValue: number;
  responseLabel: string;
  isShaded: boolean;
  thresholdLabel: string;
}

export interface ADHDScoreResult {
  shadedCount: number;
  totalQuestions: number;
  isPositiveScreen: boolean;
  resultLabel: string;
  resultSummary: string;
  recommendation: string;
  itemResults: ADHDItemResult[];
}

/**
 * Pure scoring function for WHO ASRS v1.1 Part A
 * @param answers Map of question ID (1..6) to response value (0..4)
 */
export function calculateADHDScore(answers: Record<number, number>): ADHDScoreResult {
  let shadedCount = 0;
  const itemResults: ADHDItemResult[] = [];

  for (const q of ADHD_QUESTIONS_JA) {
    const val = answers[q.id] ?? 0;
    const isShaded = val >= q.shadedThreshold;
    if (isShaded) {
      shadedCount += 1;
    }

    const opt = ADHD_OPTIONS_JA.find((o) => o.value === val) || ADHD_OPTIONS_JA[0];
    const thresholdLabel = q.shadedThreshold === 2 ? '「時々ある」以上' : '「しばしばある」以上';

    itemResults.push({
      questionId: q.id,
      questionText: q.text,
      responseValue: val,
      responseLabel: opt.label,
      isShaded,
      thresholdLabel
    });
  }

  const isPositiveScreen = shadedCount >= 4;

  const resultLabel = isPositiveScreen
    ? 'ADHDの症状と一致する項目が多い傾向'
    : 'ADHDの症状と一致する項目は少ない傾向';

  const resultSummary = isPositiveScreen
    ? `WHO ASRS v1.1の基準において、6項目中 ${shadedCount} 項目が基準値（濃色領域）を満たしています。大人のADHDに多く見られる特徴的な困りごとと一致する傾向が強く示唆されます。`
    : `WHO ASRS v1.1の基準において、6項目中 ${shadedCount} 項目が基準値を満たしています。現時点の回答では、大人のADHDに特徴的な症状の該当数は低〜中程度の範囲にとどまっています。`;

  const recommendation = isPositiveScreen
    ? '日常生活や仕事、人間関係などで困りごとが続いている場合は、自己判断せず、心療内科や精神科、または大人の発達障害専門外来へのご相談をご検討ください。本チェック結果をメモして持参いただくことで、医師への状況説明がスムーズになります。'
    : 'スコアが基準値未満であっても、集中力の低下や先延ばし、疲労感などで日常生活に支障をきたしている場合は、睡眠障害、ストレス、うつ状態など他の要因も考えられます。心身の不調が続く場合は医療機関にご相談ください。';

  return {
    shadedCount,
    totalQuestions: ADHD_QUESTIONS_JA.length,
    isPositiveScreen,
    resultLabel,
    resultSummary,
    recommendation,
    itemResults
  };
}
