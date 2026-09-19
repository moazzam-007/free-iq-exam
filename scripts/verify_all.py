# -*- coding: utf-8 -*-
"""
Verification script for Batches 3, 4, 5 (all 26 Russian pages).
Checks:
- Title length & brand suffix
- Description length
- Single H1 presence
- Details tag count (> 0)
- FAQPage absence in schema (0 FAQPage)
"""

import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

all_26 = [
    # Batch 3
    'src/pages/ru/average-iq-by-age.astro',
    'src/pages/ru/iq-classification-scale.astro',
    'src/pages/ru/iq-score-chart.astro',
    'src/pages/ru/iq-percentile-calculator.astro',
    'src/pages/ru/high-iq-societies.astro',
    'src/pages/ru/methodology.astro',
    'src/pages/ru/practice.astro',
    'src/pages/ru/results.astro',
    'src/pages/ru/leaderboard.astro',
    # Batch 4
    'src/pages/ru/games/click-speed-test.astro',
    'src/pages/ru/games/stroop-clash.astro',
    'src/pages/ru/games/digit-span.astro',
    'src/pages/ru/games/flanker-test.astro',
    'src/pages/ru/games/math-sprint.astro',
    'src/pages/ru/games/memory-matrix.astro',
    'src/pages/ru/games/n-back.astro',
    'src/pages/ru/games/rotation.astro',
    'src/pages/ru/games/sequence-rush.astro',
    'src/pages/ru/games/syllogism.astro',
    'src/pages/ru/games/symbol-match.astro',
    # Batch 5
    'src/pages/ru/games.astro',
    'src/pages/ru/tools.astro',
    'src/pages/ru/about.astro',
    'src/pages/ru/blog.astro',
    'src/pages/ru/contact.astro',
    'src/pages/ru/profile.astro',
]

print(f"{'File':<35} | {'Title Len':<9} | {'Desc Len':<8} | {'H1s':<3} | {'FAQs':<4} | {'No FAQPage'}")
print("-" * 80)

all_passed = True
for fpath in all_26:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Title
    t_match = re.search(r'const title = ["\'](.*?)["\'];', content)
    title = t_match.group(1) if t_match else "MISSING"

    # Description
    d_match = re.search(r'const description = ["\'](.*?)["\'];', content)
    desc = d_match.group(1) if d_match else "MISSING"

    # H1
    h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)

    # Details
    details_count = content.count('<details')

    # FAQPage check
    has_faq_page = 'FAQPage' in content

    t_ok = 40 <= len(title) <= 85 and ('FreeIQExam' in title or 'IQ' in title)
    d_ok = 100 <= len(desc) <= 185
    h1_ok = len(h1_matches) == 1
    faq_ok = details_count >= 3
    schema_ok = not has_faq_page

    status = "OK" if (t_ok and d_ok and h1_ok and faq_ok and schema_ok) else "WARN"
    if status == "WARN":
        all_passed = False

    print(f"{fname:<35} | {len(title):<9} | {len(desc):<8} | {len(h1_matches):<3} | {details_count:<4} | {schema_ok} [{status}]")

print("-" * 80)
print("All 26 pages verified:", "PASS" if all_passed else "SOME WARNINGS")
