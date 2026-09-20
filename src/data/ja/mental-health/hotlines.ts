/**
 * FreeIQExam — Japanese (ja-JP) Mental Health & Emergency Hotlines Directory
 * Verified Japanese Crisis Resources adhering to YMYL & Medical Safety Standards
 */

export interface CrisisHotline {
  id: string;
  name: string;
  phone?: string;
  displayPhone?: string;
  hours: string;
  description: string;
  note?: string;
  url?: string;
  isEmergency?: boolean;
}

export const JAPANESE_CRISIS_HOTLINES: CrisisHotline[] = [
  {
    id: 'emergency-110-119',
    name: '緊急通報（警察 110番 / 救急 119番）',
    phone: '110',
    displayPhone: '110（警察） / 119（救急）',
    hours: '24時間対応・年中無休',
    description: '今すぐ生命の危険がある場合や緊急の医療対応が必要な場合は、ためらわずに直ちに通報してください。',
    isEmergency: true
  },
  {
    id: 'kokoro-dial',
    name: 'こころの健康相談統一ダイヤル',
    phone: '0570-064-556',
    displayPhone: '0570-064-556',
    hours: '自治体により対応日時が異なります',
    description: 'お近くの公的な相談機関に接続され、心の健康に関する総合的な相談が可能です。',
    note: '通話料がかかるナビダイヤル。電話をかけた地域の公的相談窓口に自動接続され、対応日時は自治体により異なります。'
  },
  {
    id: 'yorisoi-hotline',
    name: 'よりそいホットライン（一般社団法人 社会的包摂サポートセンター）',
    phone: '0120-279-338',
    displayPhone: '0120-279-338',
    hours: '24時間通話無料・年中無休',
    description: '生きづらさ、メンタルヘルス、暮らしの困りごとなど、どんな悩みでも相談できる窓口です。',
    note: '24時間通話無料・年中無休。岩手・宮城・福島からは 0120-279-226。'
  },
  {
    id: 'inochi-sos',
    name: '＃いのちSOS（NPO法人 自殺対策支援センター ライフリンク）',
    phone: '0120-061-338',
    displayPhone: '0120-061-338',
    hours: '24時間通話無料・年中無休',
    description: 'つらい気持ちや悩みを専門の相談員がじっくり聴き、支援や解決への道筋を一緒に考えます。',
    note: '24時間通話無料・年中無休。通話料無料のフリーダイヤル。'
  },
  {
    id: 'inochi-no-denwa',
    name: 'いのちの電話（一般社団法人 日本いのちの電話連盟）',
    phone: '0120-783-556',
    displayPhone: '0120-783-556',
    hours: '毎日 16:00〜21:00 / 毎月10日 8:00〜翌日 8:00',
    description: '孤独や不安、精神的な苦痛を抱えている方のための無料電話相談窓口です。',
    note: 'フリーダイヤル 毎日16:00〜21:00 / 毎月10日は8:00〜翌日8:00。ナビダイヤル（有料）は 0570-783-556（10:00〜22:00）。'
  },
  {
    id: 'tokyo-suicide-prevention',
    name: '東京自殺防止センター（認定NPO法人 国際ビフレンダーズ）',
    phone: '03-5286-9090',
    displayPhone: '03-5286-9090',
    hours: '夜間相談対応（20:00〜翌朝5:30・年中無休）',
    description: '夜間のつらい時間帯に、誰にも言えない苦しい気持ちを電話で受け止める相談窓口です。',
    note: '夜間相談対応 / 通話料有料'
  },
  {
    id: 'mhlw-sns-counseling',
    name: '厚生労働省「まもろうよ こころ」SNS・チャット相談',
    hours: '各窓口により受付時間が異なります',
    description: 'LINEやWebチャットなど、電話が難しい場合でもテキストで相談できる公認相談機関のポータルです。',
    url: 'https://www.mhlw.go.jp/mamorouyokokoro/',
    note: '厚生労働省による公的SNS・チャット相談窓口一覧案内サイト'
  }
];

export const CLINICAL_DISCLAIMER_JA = '【免責事項】本オンラインセルフチェックは、教育的自己理解およびスクリーニングを目的としたツールであり、医師、精神科医、公認心理師による医学的診断や専門的評価に代わるものではありません。心身の不調や日常生活における困難が続く場合は、必ず心療内科・精神科等の専門医療機関へご相談ください。';
