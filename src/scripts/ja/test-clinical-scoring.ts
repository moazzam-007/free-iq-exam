/**
 * Unit Test Suite for Japanese Clinical Scoring Modules
 * Boundary cases & Clinical validity checks
 */

import { calculateADHDScore } from './adhd-test/scoring.ts';
import { calculateAutismScore } from './autism-test/scoring.ts';
import { calculateDepressionScore } from './depression-test/scoring.ts';

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  passedTests++;
  console.log(`✅ PASS: ${message}`);
}

console.log('=== RUNNING JAPANESE CLINICAL SCORING UNIT TESTS ===\n');

// -------------------------------------------------------------
// 1. ADHD SCORING TESTS (WHO ASRS v1.1)
// -------------------------------------------------------------
console.log('--- 1. Testing ADHD Scoring (ASRS v1.1) ---');

// Case A: All 0 (Never) -> shadedCount = 0, negative screen
{
  const result = calculateADHDScore({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  assert(result.shadedCount === 0, 'ADHD: All 0 should give shadedCount = 0');
  assert(!result.isPositiveScreen, 'ADHD: All 0 should be negative screen');
}

// Case B: Boundary for Items 1-3 (Threshold = 2: "時々ある")
// Item 1 = 1 (Rarely) -> not shaded
// Item 1 = 2 (Sometimes) -> shaded
{
  const r1 = calculateADHDScore({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  assert(r1.shadedCount === 0, 'ADHD: Item 1 = 1 should not be shaded');

  const r2 = calculateADHDScore({ 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  assert(r2.shadedCount === 1, 'ADHD: Item 1 = 2 (時々ある) should be shaded');
}

// Case C: Boundary for Items 4-6 (Threshold = 3: "しばしばある")
// Item 4 = 2 (Sometimes) -> not shaded
// Item 4 = 3 (Often) -> shaded
{
  const r3 = calculateADHDScore({ 1: 0, 2: 0, 3: 0, 4: 2, 5: 0, 6: 0 });
  assert(r3.shadedCount === 0, 'ADHD: Item 4 = 2 should not be shaded');

  const r4 = calculateADHDScore({ 1: 0, 2: 0, 3: 0, 4: 3, 5: 0, 6: 0 });
  assert(r4.shadedCount === 1, 'ADHD: Item 4 = 3 (しばしばある) should be shaded');
}

// Case D: Exact Cut-off Threshold (3 vs 4 shaded items)
{
  // 3 shaded items (Items 1,2,3 shaded, items 4,5,6 not shaded)
  const rBelow = calculateADHDScore({ 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2 });
  assert(rBelow.shadedCount === 3, 'ADHD: Items 1,2,3 shaded, 4,5,6 not shaded -> shadedCount = 3');
  assert(!rBelow.isPositiveScreen, 'ADHD: 3 shaded items is below clinical threshold (negative screen)');

  // 4 shaded items (Items 1,2,3 + Item 4 at 3)
  const rAt = calculateADHDScore({ 1: 2, 2: 2, 3: 2, 4: 3, 5: 2, 6: 2 });
  assert(rAt.shadedCount === 4, 'ADHD: 4 shaded items -> shadedCount = 4');
  assert(rAt.isPositiveScreen, 'ADHD: 4 shaded items meets clinical threshold (positive screen)');
}

// Case E: Max score (All 4: Very Often) -> shadedCount = 6
{
  const rMax = calculateADHDScore({ 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4 });
  assert(rMax.shadedCount === 6, 'ADHD: All 4 should give shadedCount = 6');
  assert(rMax.isPositiveScreen, 'ADHD: Max score is positive screen');
}

// -------------------------------------------------------------
// 2. AUTISM SCORING TESTS (AQ-10)
// -------------------------------------------------------------
console.log('\n--- 2. Testing Autism Scoring (AQ-10) ---');

// Case A: All Disagree (Value = 3)
// Agree items (1, 7, 8, 10): 0 pts
// Disagree items (2, 3, 4, 5, 6, 9): 1 pt each -> 6 pts
{
  const rAllDisagree = calculateAutismScore({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3 });
  assert(rAllDisagree.totalScore === 6, 'AQ-10: All "そうではない" (3) should score 6 on reverse items');
  assert(rAllDisagree.isPositiveScreen, 'AQ-10: Score 6 is at cutoff (positive screen)');
}

// Case B: All Agree (Value = 0)
// Agree items (1, 7, 8, 10): 1 pt each -> 4 pts
// Disagree items (2, 3, 4, 5, 6, 9): 0 pts -> Total = 4 pts
{
  const rAllAgree = calculateAutismScore({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 });
  assert(rAllAgree.totalScore === 4, 'AQ-10: All "そうである" (0) should score 4 on forward items');
  assert(!rAllAgree.isPositiveScreen, 'AQ-10: Score 4 is below cutoff (negative screen)');
}

// Case C: Maximum Autistic Traits Endorsement (Score = 10)
// Items 1, 7, 8, 10 = 0 (Agree); Items 2, 3, 4, 5, 6, 9 = 3 (Disagree)
{
  const rMax = calculateAutismScore({
    1: 0, // Agree -> 1
    2: 3, // Disagree -> 1
    3: 3, // Disagree -> 1
    4: 3, // Disagree -> 1
    5: 3, // Disagree -> 1
    6: 3, // Disagree -> 1
    7: 0, // Agree -> 1
    8: 0, // Agree -> 1
    9: 3, // Disagree -> 1
    10: 0 // Agree -> 1
  });
  assert(rMax.totalScore === 10, 'AQ-10: Maximum autistic traits should score 10/10');
  assert(rMax.isPositiveScreen, 'AQ-10: Score 10 is positive screen');
}

// Case D: Minimum Autistic Traits Endorsement (Score = 0)
// Items 1, 7, 8, 10 = 3 (Disagree); Items 2, 3, 4, 5, 6, 9 = 0 (Agree)
{
  const rMin = calculateAutismScore({
    1: 3, // Disagree -> 0
    2: 0, // Agree -> 0
    3: 0, // Agree -> 0
    4: 0, // Agree -> 0
    5: 0, // Agree -> 0
    6: 0, // Agree -> 0
    7: 3, // Disagree -> 0
    8: 3, // Disagree -> 0
    9: 0, // Agree -> 0
    10: 3 // Disagree -> 0
  });
  assert(rMin.totalScore === 0, 'AQ-10: Neurotypical baseline should score 0/10');
  assert(!rMin.isPositiveScreen, 'AQ-10: Score 0 is negative screen');
}

// Case E: Threshold Boundary (5 vs 6)
{
  // 5 items endorsed
  const r5 = calculateAutismScore({ 1: 0, 7: 0, 8: 0, 10: 0, 2: 3, 3: 0, 4: 0, 5: 0, 6: 0, 9: 0 });
  assert(r5.totalScore === 5, 'AQ-10: 5 items endorsed gives score 5');
  assert(!r5.isPositiveScreen, 'AQ-10: Score 5 is below threshold (< 6)');

  // 6 items endorsed
  const r6 = calculateAutismScore({ 1: 0, 7: 0, 8: 0, 10: 0, 2: 3, 3: 3, 4: 0, 5: 0, 6: 0, 9: 0 });
  assert(r6.totalScore === 6, 'AQ-10: 6 items endorsed gives score 6');
  assert(r6.isPositiveScreen, 'AQ-10: Score 6 is at threshold (>= 6)');
}

// -------------------------------------------------------------
// 3. DEPRESSION SCORING TESTS (PHQ-9)
// -------------------------------------------------------------
console.log('\n--- 3. Testing Depression Scoring (PHQ-9) ---');

// Case A: Minimal band (0-4)
{
  const r0 = calculateDepressionScore({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
  assert(r0.totalScore === 0, 'PHQ-9: Score 0');
  assert(r0.severity.band === 'minimal', 'PHQ-9: 0 is minimal');
  assert(!r0.hasItem9Risk, 'PHQ-9: Item 9 is 0, no risk flag');

  const r4 = calculateDepressionScore({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 });
  assert(r4.totalScore === 4, 'PHQ-9: Score 4');
  assert(r4.severity.band === 'minimal', 'PHQ-9: 4 is minimal');
}

// Case B: Mild band (5-9)
{
  const r5 = calculateDepressionScore({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 });
  assert(r5.totalScore === 5, 'PHQ-9: Score 5');
  assert(r5.severity.band === 'mild', 'PHQ-9: 5 is mild');

  const r9 = calculateDepressionScore({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 });
  assert(r9.totalScore === 9, 'PHQ-9: Score 9');
  assert(r9.severity.band === 'mild', 'PHQ-9: 9 is mild');
  assert(r9.hasItem9Risk, 'PHQ-9: Item 9 = 1 triggers safety flag');
}

// Case C: Moderate band (10-14)
{
  const r10 = calculateDepressionScore({ 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 0, 7: 0, 8: 0, 9: 0 });
  assert(r10.totalScore === 10, 'PHQ-9: Score 10');
  assert(r10.severity.band === 'moderate', 'PHQ-9: 10 is moderate');

  const r14 = calculateDepressionScore({ 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 0, 9: 0 });
  assert(r14.totalScore === 14, 'PHQ-9: Score 14');
  assert(r14.severity.band === 'moderate', 'PHQ-9: 14 is moderate');
}

// Case D: Moderately Severe band (15-19)
{
  const r15 = calculateDepressionScore({ 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 1, 9: 0 });
  assert(r15.totalScore === 15, 'PHQ-9: Score 15');
  assert(r15.severity.band === 'moderately_severe', 'PHQ-9: 15 is moderately_severe');

  const r19 = calculateDepressionScore({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 0, 9: 0 });
  assert(r19.totalScore === 19, 'PHQ-9: Score 19');
  assert(r19.severity.band === 'moderately_severe', 'PHQ-9: 19 is moderately_severe');
}

// Case E: Severe band (20-27)
{
  const r20 = calculateDepressionScore({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 2, 8: 0, 9: 0 });
  assert(r20.totalScore === 20, 'PHQ-9: Score 20');
  assert(r20.severity.band === 'severe', 'PHQ-9: 20 is severe');

  const r27 = calculateDepressionScore({ 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3 });
  assert(r27.totalScore === 27, 'PHQ-9: Score 27');
  assert(r27.severity.band === 'severe', 'PHQ-9: 27 is severe');
  assert(r27.hasItem9Risk, 'PHQ-9: Item 9 = 3 triggers safety flag');
}

console.log(`\n🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
