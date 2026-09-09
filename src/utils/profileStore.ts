/**
 * Profile Storage Engine & Client-Side State Manager
 * Source of Truth: Scrachpad/PROFILE_DATA_SCHEMA.md
 * 
 * Manages local-first user session records, assessments, cognitive game drills,
 * rolling median domain aggregates, and secure JSON import/export.
 */

export type AssessmentType =
  | 'flagship-24'
  | 'quick-12'
  | 'category-fluid'
  | 'category-spatial'
  | 'category-quantitative'
  | 'category-verbal';

export interface AssessmentRecord {
  id: string;
  schemaVersion: 1;
  assessmentType: AssessmentType;
  assessmentVersion: string;
  completedAt: string;
  durationSeconds: number;
  rawScore: number;
  totalQuestions: number;
  theta: number;
  sem: number;
  iqEstimate: number;
  confidenceInterval: [number, number];
  percentile: number;
  domainBreakdown?: Record<string, {
    rawScore: number;
    total: number;
    theta: number;
    standardScore: number;
    percentile: number;
  }>;
}

export type GameId =
  | 'n-back'
  | 'rotation'
  | 'math-sprint'
  | 'symbol-match'
  | 'syllogism'
  | 'stroop-clash'
  | 'memory-matrix'
  | 'digit-span'
  | 'flanker-test'
  | 'sequence-rush';

export interface GameMetrics {
  performanceScore: number; // 0 - 100
  accuracy: number;        // 0.00 - 1.00
  trialsCompleted: number;
  correctCount: number;
  errorCount: number;
  medianRT?: number;       // ms
  bestStreak?: number;
  maxLevel?: string | number;
  maxSpan?: number;
  interferenceCostMs?: number;
}

export interface GameSessionRecord {
  id: string;
  schemaVersion: 1;
  gameId: GameId;
  gameVersion: string;
  completedAt: string;
  durationSeconds: number;
  mode: 'standard' | 'practice' | 'forward' | 'backward';
  metrics: GameMetrics;
}

export interface UserProfileData {
  schemaVersion: 1;
  appVersion: string;
  createdAt: string;
  lastActiveAt: string;
  assessments: AssessmentRecord[];
  games: GameSessionRecord[];
}

export type ActivityDomainKey =
  | 'working-memory'
  | 'visual-spatial'
  | 'processing-speed'
  | 'quantitative'
  | 'fluid-reasoning';

export interface DomainActivitySummary {
  domainKey: ActivityDomainKey;
  displayTitle: string;
  chcReference: string;
  score: number; // 0 - 100 (median of recent sessions)
  sessionsCount: number;
  confidenceLabel: string;
  trend: 'improving' | 'steady' | 'fluctuating' | 'none';
  personalBest: number;
  recentScores: number[];
}

const STORAGE_KEY = 'fiq_profile_v1';
const CURRENT_SCHEMA_VERSION = 1;
const APP_VERSION = '1.0.0';
const ID_REGEX = /^[a-zA-Z0-9_-]{6,50}$/;

const VALID_ASSESSMENT_TYPES: readonly AssessmentType[] = [
  'flagship-24',
  'quick-12',
  'category-fluid',
  'category-spatial',
  'category-quantitative',
  'category-verbal',
];

const VALID_GAME_IDS: readonly GameId[] = [
  'n-back',
  'rotation',
  'math-sprint',
  'symbol-match',
  'syllogism',
  'stroop-clash',
  'memory-matrix',
  'digit-span',
  'flanker-test',
  'sequence-rush',
];

const VALID_MODES: readonly ('standard' | 'practice' | 'forward' | 'backward')[] = [
  'standard',
  'practice',
  'forward',
  'backward',
];

const LEGACY_STORAGE_KEY_MAP: Partial<Record<GameId, string>> = {
  'n-back': 'fiq_game_nback_best',
  'rotation': 'fiq_game_rotation_best',
  'math-sprint': 'fiq_game_math_best',
  'symbol-match': 'fiq_game_symbol_best',
  'syllogism': 'fiq_game_syllogism_best',
};

// Fallback in-memory cache for SSR or blocked storage environments
let memoryCache: UserProfileData | null = null;
let storageAvailable: boolean | null = null;

function isStorageAvailable(): boolean {
  if (storageAvailable !== null) return storageAvailable;
  if (typeof window === 'undefined') {
    storageAvailable = false;
    return false;
  }
  try {
    const testKey = '__fiq_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    storageAvailable = true;
    return true;
  } catch {
    storageAvailable = false;
    return false;
  }
}

function getDefaultProfile(): UserProfileData {
  const now = new Date().toISOString();
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    appVersion: APP_VERSION,
    createdAt: now,
    lastActiveAt: now,
    assessments: [],
    games: [],
  };
}

export function generateRecordId(prefix: string): string {
  const timestamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${prefix}_${timestamp}_${randomPart}`;
}

export function getProfile(): UserProfileData {
  if (!isStorageAvailable()) {
    if (!memoryCache) {
      memoryCache = getDefaultProfile();
    }
    return memoryCache;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultProfile = getDefaultProfile();
      saveProfileToStorage(defaultProfile);
      return defaultProfile;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      return getDefaultProfile();
    }

    // Ensure array properties exist
    parsed.assessments = Array.isArray(parsed.assessments) ? parsed.assessments : [];
    parsed.games = Array.isArray(parsed.games) ? parsed.games : [];
    memoryCache = parsed;
    return parsed;
  } catch (e) {
    console.warn('[ProfileStore] Failed to read profile from localStorage:', e);
    if (!memoryCache) {
      memoryCache = getDefaultProfile();
    }
    return memoryCache;
  }
}

function saveProfileToStorage(profile: UserProfileData): boolean {
  profile.lastActiveAt = new Date().toISOString();
  memoryCache = profile;

  if (!isStorageAvailable()) return true;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch (e) {
    console.warn('[ProfileStore] Failed to persist profile to localStorage:', e);
    return false;
  }
}

export function saveAssessmentRecord(
  data: Omit<AssessmentRecord, 'id' | 'schemaVersion'>
): AssessmentRecord {
  const profile = getProfile();
  const record: AssessmentRecord = {
    ...data,
    id: generateRecordId('asm'),
    schemaVersion: CURRENT_SCHEMA_VERSION,
    completedAt: data.completedAt || new Date().toISOString(),
  };

  profile.assessments.unshift(record);
  saveProfileToStorage(profile);
  return record;
}

export function saveGameRecord(
  data: Omit<GameSessionRecord, 'id' | 'schemaVersion' | 'gameVersion'>
): GameSessionRecord {
  const profile = getProfile();
  const record: GameSessionRecord = {
    ...data,
    id: generateRecordId(`gam_${data.gameId}`),
    schemaVersion: CURRENT_SCHEMA_VERSION,
    gameVersion: '1.0.0',
    completedAt: data.completedAt || new Date().toISOString(),
  };

  profile.games.unshift(record);
  saveProfileToStorage(profile);

  // Sync legacy personal-best storage keys for backward compatibility with existing headers
  try {
    if (isStorageAvailable()) {
      const legacyKey =
        LEGACY_STORAGE_KEY_MAP[data.gameId] ||
        `fiq_game_${data.gameId.replace(/-/g, '')}_best`;
      const existingBest = parseInt(window.localStorage.getItem(legacyKey) || '0', 10);
      if (data.metrics.performanceScore > existingBest) {
        window.localStorage.setItem(legacyKey, String(data.metrics.performanceScore));
      }
    }
  } catch (e) {}

  return record;
}

export function getAssessmentHistory(): AssessmentRecord[] {
  return getProfile().assessments;
}

export function getGameHistory(gameId?: GameId): GameSessionRecord[] {
  const allGames = getProfile().games;
  if (!gameId) return allGames;
  return allGames.filter((g) => g.gameId === gameId);
}

// Domain Activity Mapping
const DOMAIN_GAME_MAP: Record<ActivityDomainKey, GameId[]> = {
  'working-memory': ['n-back', 'memory-matrix', 'digit-span'],
  'visual-spatial': ['rotation', 'memory-matrix'],
  'processing-speed': ['symbol-match', 'flanker-test', 'math-sprint'],
  'quantitative': ['math-sprint'],
  'fluid-reasoning': ['syllogism', 'sequence-rush', 'stroop-clash'],
};

const DOMAIN_META: Record<ActivityDomainKey, { title: string; chc: string }> = {
  'working-memory': { title: 'Working Memory Activities', chc: 'Gwm: Active retention & span manipulation' },
  'visual-spatial': { title: 'Visual-Spatial Activities', chc: 'Gv: Mental rotation & spatial coordinates' },
  'processing-speed': { title: 'Processing Speed Activities', chc: 'Gs: Rapid visual scanning & decision throughput' },
  'quantitative': { title: 'Quantitative Activities', chc: 'Gq: Numerical operations & mathematical fluency' },
  'fluid-reasoning': { title: 'Fluid Reasoning Activities', chc: 'Gf: Pattern induction & abstract rule deduction' },
};

function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function getDomainActivitySummaries(): Record<ActivityDomainKey, DomainActivitySummary> {
  const profile = getProfile();
  const domains: ActivityDomainKey[] = [
    'working-memory',
    'visual-spatial',
    'processing-speed',
    'quantitative',
    'fluid-reasoning',
  ];

  const result = {} as Record<ActivityDomainKey, DomainActivitySummary>;

  domains.forEach((key) => {
    const relevantGameIds = DOMAIN_GAME_MAP[key];
    const matchingSessions = profile.games
      .filter((g) => relevantGameIds.includes(g.gameId) && typeof g.metrics?.performanceScore === 'number')
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

    const recentScores = matchingSessions.slice(0, 5).map((s) => s.metrics.performanceScore);
    const sessionCount = matchingSessions.length;
    const medianScore = recentScores.length > 0 ? calculateMedian(recentScores) : 0;
    const personalBest = matchingSessions.reduce((max, s) => Math.max(max, s.metrics.performanceScore), 0);

    // Confidence / Sample Size Labeling
    let confidenceLabel = 'No Activity Recorded';
    if (sessionCount === 1) {
      confidenceLabel = 'Early Estimate (1 session)';
    } else if (sessionCount >= 2 && sessionCount <= 3) {
      confidenceLabel = `Early Performance Trend (${sessionCount} sessions)`;
    } else if (sessionCount >= 4) {
      confidenceLabel = `Recent Activity Trend (${Math.min(5, sessionCount)} sessions)`;
    }

    // Trend calculation: compare median of latest 3 vs previous 3 (or latest 2 vs previous 2 if 4-5 sessions)
    let trend: 'improving' | 'steady' | 'fluctuating' | 'none' = 'none';
    if (matchingSessions.length >= 6) {
      const recentMedian = calculateMedian(matchingSessions.slice(0, 3).map((s) => s.metrics.performanceScore));
      const prevMedian = calculateMedian(matchingSessions.slice(3, 6).map((s) => s.metrics.performanceScore));
      const delta = recentMedian - prevMedian;
      if (delta >= 4) trend = 'improving';
      else if (delta <= -4) trend = 'fluctuating';
      else trend = 'steady';
    } else if (matchingSessions.length >= 4) {
      const recentMedian = calculateMedian(matchingSessions.slice(0, 2).map((s) => s.metrics.performanceScore));
      const prevMedian = calculateMedian(matchingSessions.slice(2, 4).map((s) => s.metrics.performanceScore));
      const delta = recentMedian - prevMedian;
      if (delta >= 4) trend = 'improving';
      else if (delta <= -4) trend = 'fluctuating';
      else trend = 'steady';
    }

    result[key] = {
      domainKey: key,
      displayTitle: DOMAIN_META[key].title,
      chcReference: DOMAIN_META[key].chc,
      score: medianScore,
      sessionsCount: sessionCount,
      confidenceLabel,
      trend,
      personalBest,
      recentScores,
    };
  });

  return result;
}

export function getPerformanceTier(score: number): { tier: string; description: string; badgeClass: string } {
  if (score >= 90) {
    return {
      tier: 'Exceptional Agility',
      description: 'Near-optimal speed-accuracy trade-off; mastery of task strategy and cognitive fluency.',
      badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    };
  }
  if (score >= 75) {
    return {
      tier: 'Strong Performance',
      description: 'High information throughput; rapid conflict resolution and low distractor drift.',
      badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    };
  }
  if (score >= 60) {
    return {
      tier: 'Solid Baseline',
      description: 'Strong accuracy; steady task-focused attention with few unforced errors.',
      badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    };
  }
  if (score >= 40) {
    return {
      tier: 'Developing',
      description: 'Consistent response accuracy; baseline operational rhythm under time constraints.',
      badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    };
  }
  return {
    tier: 'Getting Started',
    description: 'Operational reflexes are building up; familiarization with rules and response pace.',
    badgeClass: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
  };
}

export function exportProfileJson(): string {
  const profile = getProfile();
  const exportPayload = {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    appVersion: APP_VERSION,
    exportedAt: new Date().toISOString(),
    profile,
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importProfileJson(jsonStr: string): {
  success: boolean;
  importedCount: number;
  duplicateCount: number;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, importedCount: 0, duplicateCount: 0, error: 'Invalid JSON file format.' };
    }

    if (parsed.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      return {
        success: false,
        importedCount: 0,
        duplicateCount: 0,
        error: `Unsupported schema version (${parsed.schemaVersion}). Supported version is ${CURRENT_SCHEMA_VERSION}.`,
      };
    }

    const incomingProfile = parsed.profile && typeof parsed.profile === 'object'
      ? parsed.profile
      : (Array.isArray(parsed.assessments) || Array.isArray(parsed.games)) ? parsed : null;

    if (!incomingProfile || typeof incomingProfile !== 'object') {
      return { success: false, importedCount: 0, duplicateCount: 0, error: 'Missing profile data in backup file.' };
    }

    const currentProfile = getProfile();
    const existingAsmIds = new Set(currentProfile.assessments.map((a) => a.id));
    const existingGameIds = new Set(currentProfile.games.map((g) => g.id));

    let importedCount = 0;
    let duplicateCount = 0;

    // Validate and merge assessments
    if (Array.isArray(incomingProfile.assessments)) {
      for (const asm of incomingProfile.assessments) {
        if (!asm || typeof asm.id !== 'string') continue;
        if (!ID_REGEX.test(asm.id)) continue;

        if (existingAsmIds.has(asm.id)) {
          duplicateCount++;
          continue;
        }

        const parsedTime = Date.parse(asm.completedAt);
        const completedAt = (!isNaN(parsedTime) && parsedTime <= Date.now() + 60000)
          ? new Date(parsedTime).toISOString()
          : new Date().toISOString();

        const totalQuestions = Math.max(1, Math.round(Number(asm.totalQuestions) || 24));
        const rawScore = Math.max(0, Math.min(totalQuestions, Math.round(Number(asm.rawScore) || 0)));
        const assessmentType: AssessmentType = VALID_ASSESSMENT_TYPES.includes(asm.assessmentType)
          ? asm.assessmentType
          : 'flagship-24';

        const ci = Array.isArray(asm.confidenceInterval) && asm.confidenceInterval.length === 2
          ? [
              Math.max(50, Math.min(170, Math.round(Number(asm.confidenceInterval[0]) || 90))),
              Math.max(50, Math.min(170, Math.round(Number(asm.confidenceInterval[1]) || 110))),
            ]
          : [90, 110];

        const sanitizedAsm: AssessmentRecord = {
          id: asm.id,
          schemaVersion: CURRENT_SCHEMA_VERSION,
          assessmentType,
          assessmentVersion: String(asm.assessmentVersion || '2PL-EAP-v1').slice(0, 30),
          completedAt,
          durationSeconds: Math.max(0, Math.round(Number(asm.durationSeconds) || 0)),
          rawScore,
          totalQuestions,
          theta: Math.max(-4.0, Math.min(4.0, Number(asm.theta) || 0)),
          sem: Math.max(0.01, Math.min(1.0, Number(asm.sem) || 0.3)),
          iqEstimate: Math.max(50, Math.min(170, Math.round(Number(asm.iqEstimate) || 100))),
          confidenceInterval: ci as [number, number],
          percentile: Math.max(0.1, Math.min(99.9, Number(asm.percentile) || 50)),
          domainBreakdown: asm.domainBreakdown,
        };

        currentProfile.assessments.push(sanitizedAsm);
        existingAsmIds.add(sanitizedAsm.id);
        importedCount++;
      }
    }

    // Validate and merge games
    if (Array.isArray(incomingProfile.games)) {
      for (const gm of incomingProfile.games) {
        if (!gm || typeof gm.id !== 'string') continue;
        if (!ID_REGEX.test(gm.id)) continue;
        if (!VALID_GAME_IDS.includes(gm.gameId)) continue;

        if (existingGameIds.has(gm.id)) {
          duplicateCount++;
          continue;
        }

        const parsedTime = Date.parse(gm.completedAt);
        const completedAt = (!isNaN(parsedTime) && parsedTime <= Date.now() + 60000)
          ? new Date(parsedTime).toISOString()
          : new Date().toISOString();

        const mode = VALID_MODES.includes(gm.mode) ? gm.mode : 'standard';
        const metrics = gm.metrics || {};

        const sanitizedGame: GameSessionRecord = {
          id: gm.id,
          schemaVersion: CURRENT_SCHEMA_VERSION,
          gameId: gm.gameId,
          gameVersion: String(gm.gameVersion || '1.0.0').slice(0, 20),
          completedAt,
          durationSeconds: Math.max(0, Math.round(Number(gm.durationSeconds) || 0)),
          mode,
          metrics: {
            performanceScore: Math.max(0, Math.min(100, Math.round(Number(metrics.performanceScore) || 0))),
            accuracy: Math.max(0, Math.min(1.0, Number(metrics.accuracy) || 0)),
            trialsCompleted: Math.max(0, Math.round(Number(metrics.trialsCompleted) || 0)),
            correctCount: Math.max(0, Math.round(Number(metrics.correctCount) || 0)),
            errorCount: Math.max(0, Math.round(Number(metrics.errorCount) || 0)),
            medianRT: metrics.medianRT ? Math.max(50, Math.round(Number(metrics.medianRT))) : undefined,
            bestStreak: metrics.bestStreak ? Math.max(0, Math.round(Number(metrics.bestStreak))) : undefined,
            maxLevel: metrics.maxLevel,
            maxSpan: metrics.maxSpan ? Math.max(1, Math.round(Number(metrics.maxSpan))) : undefined,
            interferenceCostMs: metrics.interferenceCostMs ? Math.round(Number(metrics.interferenceCostMs)) : undefined,
          },
        };

        currentProfile.games.push(sanitizedGame);
        existingGameIds.add(sanitizedGame.id);
        importedCount++;
      }
    }

    // Re-sort history descending by completedAt
    currentProfile.assessments.sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    currentProfile.games.sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    saveProfileToStorage(currentProfile);

    return {
      success: true,
      importedCount,
      duplicateCount,
    };
  } catch (e: any) {
    return {
      success: false,
      importedCount: 0,
      duplicateCount: 0,
      error: `JSON parsing error: ${e?.message || 'Invalid format'}`,
    };
  }
}

export function clearProfile(): boolean {
  const fresh = getDefaultProfile();
  return saveProfileToStorage(fresh);
}