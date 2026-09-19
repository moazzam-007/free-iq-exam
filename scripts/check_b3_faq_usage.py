# -*- coding: utf-8 -*-
import sys
import os
import re

sys.stdout.reconfigure(encoding='utf-8')

b3_files = [
    'src/pages/ru/average-iq-by-age.astro',
    'src/pages/ru/iq-classification-scale.astro',
    'src/pages/ru/iq-score-chart.astro',
    'src/pages/ru/iq-percentile-calculator.astro',
    'src/pages/ru/high-iq-societies.astro',
    'src/pages/ru/methodology.astro',
    'src/pages/ru/practice.astro',
    'src/pages/ru/results.astro',
    'src/pages/ru/leaderboard.astro',
]

for f in b3_files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        matches = re.findall(r'schema\[\d+\]', content)
        has_main_entity = 'mainEntity' in content
        print(f"{f}: schema[x] matches={matches}, has_main_entity={has_main_entity}")
