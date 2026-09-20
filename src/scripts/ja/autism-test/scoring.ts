/**
 * Autism-Spectrum Quotient (AQ-10 Adult)
 * Pure Scoring Logic and Question Definitions
 * Reference: Allison C, Auyeung B, Baron-Cohen S (2012) J Am Acad Child Adolesc Psychiatry, 51(2), 202-212.
 */

export interface AutismQuestion {
  id: number;
  text: string;
  context: string;
  scoreDirection: 'agree' | 'disagree'; // 'agree' -> points on Agree (0,1); 'disagree' -> points on Disagree (2,3)
}

export const AUTISM_QUESTIONS_JA: AutismQuestion[] = [
  {
    id: 1,
    text: '私は他の人が気づかないような小さな物音に気づくことがよくある。',
    context: '感覚の過敏性・細部への注意',
    scoreDirection: 'agree'
  },
  {
    id: 2,
    text: '物事を見るとき、細かい部分よりも全体像に集中することが多い。',
    context: '全体把握と細部への注目傾向',
    scoreDirection: 'disagree'
  },
  {
    id: 3,
    text: '人が集まる場でも、複数の人が話している会話を簡単に追うことができる。',
    context: '複数人での会話・注意の分割',
    scoreDirection: 'disagree'
  },
  {
    id: 4,
    text: '複数の異なる作業や活動を行ったり来たり切り替えるのは簡単である。',
    context: 'タスクの認知的切り替え・柔軟性',
    scoreDirection: 'disagree'
  },
  {
    id: 5,
    text: '相手が話しているとき、「行間を読む」（言葉の裏の意図を察する）ことは得意である。',
    context: '非言語的コミュニケーション・文脈理解',
    scoreDirection: 'disagree'
  },
  {
    id: 6,
    text: '自分の話を聞いている相手が退屈しているかどうかがすぐに分かる。',
    context: '相手の心理状態や反応の察知',
    scoreDirection: 'disagree'
  },
  {
    id: 7,
    text: '小説や物語を読んでいるとき、登場人物の意図や動機を理解するのが難しいと感じる。',
    context: '登場人物・他者の心理推論',
    scoreDirection: 'agree'
  },
  {
    id: 8,
    text: '特定のカテゴリ（車、鳥、電車、植物、データなど）の情報を収集・整理するのが好きである。',
    context: '特定の興味・体系化への志向',
    scoreDirection: 'agree'
  },
  {
    id: 9,
    text: '相手の表情を見るだけで、その人が何を考え、感じているかが簡単に分かる。',
    context: '表情からの感情・思考の読み取り',
    scoreDirection: 'disagree'
  },
  {
    id: 10,
    text: '他人の意図や気持ちを察したり想像したりすることが難しいと感じる。',
    context: '他者の視点取得・社会的想像力',
    scoreDirection: 'agree'
  }
];

export const AUTISM_OPTIONS_JA = [
  { value: 0, label: 'そうである' },
  { value: 1, label: 'どちらかといえばそうである' },
  { value: 2, label: 'どちらかといえばそうではない' },
  { value: 3, label: 'そうではない' }
];

export interface AutismItemResult {
  questionId: number;
  questionText: string;
  responseValue: number;
  responseLabel: string;
  points: number; // 0 or 1
  scoreDirection: 'agree' | 'disagree';
}

export interface AutismScoreResult {
  totalScore: number;
  maxScore: number;
  isPositiveScreen: boolean; // >= 6
  resultLabel: string;
  resultSummary: string;
  recommendation: string;
  itemResults: AutismItemResult[];
}

/**
 * Pure scoring function for AQ-10 Adult
 * @param answers Map of question ID (1..10) to response value (0..3)
 */
export function calculateAutismScore(answers: Record<number, number>): AutismScoreResult {
  let totalScore = 0;
  const itemResults: AutismItemResult[] = [];

  for (const q of AUTISM_QUESTIONS_JA) {
    const val = answers[q.id] ?? 3;
    let points = 0;

    if (q.scoreDirection === 'agree' && (val === 0 || val === 1)) {
      points = 1;
    } else if (q.scoreDirection === 'disagree' && (val === 2 || val === 3)) {
      points = 1;
    }

    totalScore += points;

    const opt = AUTISM_OPTIONS_JA.find((o) => o.value === val) || AUTISM_OPTIONS_JA[3];

    itemResults.push({
      questionId: q.id,
      questionText: q.text,
      responseValue: val,
      responseLabel: opt.label,
      points,
      scoreDirection: q.scoreDirection
    });
  }

  const isPositiveScreen = totalScore >= 6;

  const resultLabel = isPositiveScreen
    ? '自閉スペクトラム症（ASD）の特性傾向が高い目安（6点以上）'
    : '自閉スペクトラム症（ASD）の特性傾向は標準的な目安（6点未満）';

  const resultSummary = isPositiveScreen
    ? `AQ-10の採点結果は ${totalScore} / 10 点です。英国NICEガイドラインおよび原著研究における専門機関受診の推奨カットオフ値（6点以上）を満たしており、ASD（自閉スペクトラム症）に特徴的な認知・社会的コミュニケーションの特性傾向が多く見られます。`
    : `AQ-10の採点結果は ${totalScore} / 10 点です。一般的なカットオフ値（6点以上）を下回っており、ASDに特徴的な傾向の該当数は標準的な範囲にとどまっています。`;

  const recommendation = isPositiveScreen
    ? '感覚過敏、コミュニケーションのすれ違い、環境変化へのストレスなどにより日常生活や仕事で生きづらさを感じている場合は、心療内科・精神科や発達障害者支援センターなどの専門窓口への相談をおすすめします。'
    : 'このスクリーニングで点数が低くても、職場や対人関係での強い疲労感やストレスが続いている場合は、不安障害、気分障害、適応障害など他の要因も考えられます。必要に応じて専門機関にご相談ください。';

  return {
    totalScore,
    maxScore: AUTISM_QUESTIONS_JA.length,
    isPositiveScreen,
    resultLabel,
    resultSummary,
    recommendation,
    itemResults
  };
}
