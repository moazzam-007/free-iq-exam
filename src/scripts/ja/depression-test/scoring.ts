/**
 * Patient Health Questionnaire-9 (PHQ-9)
 * Pure Scoring Logic and Question Definitions
 * Reference: Kroenke K, Spitzer RL, Williams JB (2001) J Gen Intern Med, 16(9), 606-613.
 */

export interface DepressionQuestion {
  id: number;
  text: string;
  context: string;
}

export const DEPRESSION_QUESTIONS_JA: DepressionQuestion[] = [
  {
    id: 1,
    text: '物事に対してほとんど興味がない、または楽しめない',
    context: '興味・喜びの喪失（アヘドニア）'
  },
  {
    id: 2,
    text: '気分が落ち込む、憂うつになる、または絶望的な気持ちになる',
    context: '抑うつ気分・絶望感'
  },
  {
    id: 3,
    text: '寝つきが悪い、途中で目がさめる、または逆に眠りすぎる',
    context: '睡眠障害（不眠または過眠）'
  },
  {
    id: 4,
    text: '疲れた感じがする、または気力・エネルギーがない',
    context: '易疲労性・エネルギー減退'
  },
  {
    id: 5,
    text: '食欲がない、または逆に食べすぎてしまう',
    context: '食欲不振または過食'
  },
  {
    id: 6,
    text: '自分はダメな人間だ、失敗者だと感じる、または自分や家族に申し訳ないと感じる',
    context: '無価値感・過剰な罪責感'
  },
  {
    id: 7,
    text: '新聞を読むことやテレビを見ることなど、物事に集中することが難しい',
    context: '集中力・思考力の減退'
  },
  {
    id: 8,
    text: '他の人が気づくほど動きや話し方が遅くなる、または逆に落ち着きがなくそわそわして動き回る',
    context: '精神運動焦燥または精神運動制止'
  },
  {
    id: 9,
    text: '死んだ方がましだ、あるいは自分を何らかの方法で傷つけようと思ったことがある',
    context: '自傷・希死念慮（セーフティゲート項目）'
  }
];

export const DEPRESSION_OPTIONS_JA = [
  { value: 0, label: '全くない' },
  { value: 1, label: '数日ある' },
  { value: 2, label: '半分以上の日数' },
  { value: 3, label: 'ほぼ毎日' }
];

export const DEPRESSION_IMPAIRMENT_OPTIONS_JA = [
  { value: 0, label: '困難ではなかった' },
  { value: 1, label: '少し困難だった' },
  { value: 2, label: 'とても困難だった' },
  { value: 3, label: '極めて困難だった' }
];

export type DepressionSeverityBand =
  | 'minimal'
  | 'mild'
  | 'moderate'
  | 'moderately_severe'
  | 'severe';

export interface DepressionSeverityInfo {
  band: DepressionSeverityBand;
  scoreRange: string;
  label: string;
  clinicalInterpretation: string;
  actionGuidance: string;
}

export const DEPRESSION_SEVERITY_MAP: Record<DepressionSeverityBand, DepressionSeverityInfo> = {
  minimal: {
    band: 'minimal',
    scoreRange: '0–4点',
    label: 'ほとんどなし（軽微）',
    clinicalInterpretation: '抑うつ症状はほとんど認められないか、日常生活に支障をきたさない軽微なレベルです。',
    actionGuidance: '現時点では積極的な治療介入は必要ないと判断されることが多いですが、十分な休養と睡眠、バランスのよい生活リズムを維持してください。'
  },
  mild: {
    band: 'mild',
    scoreRange: '5–9点',
    label: '軽度',
    clinicalInterpretation: '軽度の抑うつ傾向が見られます。疲労やストレスの蓄積が心身に影響を与えている可能性があります。',
    actionGuidance: '経過観察（経過を見守る）や生活習慣の見直し、ストレス軽減が推奨されます。症状が2週間以上続く場合や悪化する場合は専門機関への相談をご検討ください。'
  },
  moderate: {
    band: 'moderate',
    scoreRange: '10–14点',
    label: '中等度',
    clinicalInterpretation: '中等度の抑うつ状態を示唆しており、国際的な臨床基準においてうつ病（大うつ病エピソード）のカットオフ値（10点以上）に該当します。',
    actionGuidance: '心療内科や精神科などの専門医療機関を受診し、医師による詳しい診察やカウンセリングを受けることが推奨されます。'
  },
  moderately_severe: {
    band: 'moderately_severe',
    scoreRange: '15–19点',
    label: '中等度〜重度',
    clinicalInterpretation: '顕著な抑うつ症状が認められ、日常生活や仕事、対人関係に明確な支障が生じている可能性が高い状態です。',
    actionGuidance: '早期の専門医療機関（心療内科・精神科）受診が必要です。十分な休養と、医師の指導のもとでの適切な薬物療法や精神療法の検討が強く推奨されます。'
  },
  severe: {
    band: 'severe',
    scoreRange: '20–27点',
    label: '重度',
    clinicalInterpretation: '重度の抑うつ状態を示唆しています。心身の負担が非常に大きく、早急な専門的ケアを要する水準です。',
    actionGuidance: '一人で抱え込まず、できるだけ早く心療内科・精神科などの専門医を受診してください。身近な信頼できる人や各種相談窓口への連絡もご検討ください。'
  }
};

export interface DepressionItemResult {
  questionId: number;
  questionText: string;
  responseValue: number;
  responseLabel: string;
  points: number;
}

export interface DepressionScoreResult {
  totalScore: number;
  maxScore: number;
  hasItem9Risk: boolean; // Item 9 > 0
  item9Score: number;
  severity: DepressionSeverityInfo;
  itemResults: DepressionItemResult[];
}

/**
 * Pure scoring function for PHQ-9
 * @param answers Map of question ID (1..9) to response value (0..3)
 */
export function calculateDepressionScore(answers: Record<number, number>): DepressionScoreResult {
  let totalScore = 0;
  const itemResults: DepressionItemResult[] = [];

  for (const q of DEPRESSION_QUESTIONS_JA) {
    const val = answers[q.id] ?? 0;
    const clampedVal = Math.max(0, Math.min(3, val));
    totalScore += clampedVal;

    const opt = DEPRESSION_OPTIONS_JA.find((o) => o.value === clampedVal) || DEPRESSION_OPTIONS_JA[0];

    itemResults.push({
      questionId: q.id,
      questionText: q.text,
      responseValue: clampedVal,
      responseLabel: opt.label,
      points: clampedVal
    });
  }

  const item9Score = answers[9] ?? 0;
  const hasItem9Risk = item9Score > 0;

  let band: DepressionSeverityBand;
  if (totalScore <= 4) {
    band = 'minimal';
  } else if (totalScore <= 9) {
    band = 'mild';
  } else if (totalScore <= 14) {
    band = 'moderate';
  } else if (totalScore <= 19) {
    band = 'moderately_severe';
  } else {
    band = 'severe';
  }

  return {
    totalScore,
    maxScore: 27,
    hasItem9Risk,
    item9Score,
    severity: DEPRESSION_SEVERITY_MAP[band],
    itemResults
  };
}
