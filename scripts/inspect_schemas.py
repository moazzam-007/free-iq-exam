# -*- coding: utf-8 -*-
import os
import re

all_files = [
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
    'src/pages/ru/profile.astro'
]

for f in all_files:
    if not os.path.exists(f):
        print(f"MISSING: {f}")
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    types = re.findall(r'["\']@type["\']\s*:\s*["\']([A-Za-z]+)["\']', c)
    unique_types = sorted(list(set(types)))
    has_faq_markup = len(re.findall(r'<details', c))
    print(f"{os.path.basename(f)}: types={unique_types} | details_faq_count={has_faq_markup}")
