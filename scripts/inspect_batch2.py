# -*- coding: utf-8 -*-
import glob
import os

files = [
    'src/pages/ru/adhd-test.astro',
    'src/pages/ru/anxiety-test.astro',
    'src/pages/ru/autism-test.astro',
    'src/pages/ru/eye-test.astro',
    'src/pages/ru/hearing-test.astro',
    'src/pages/ru/matrix-reasoning-test.astro',
    'src/pages/ru/fluid-reasoning-test.astro',
    'src/pages/ru/spatial-reasoning-test.astro',
    'src/pages/ru/quantitative-reasoning-test.astro',
    'src/pages/ru/verbal-reasoning-test.astro',
    'src/pages/ru/quick-test.astro',
    'src/pages/ru/mensa-iq-test-practice.astro',
    'src/pages/ru/circle-of-control.astro',
]

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
            lines = content.split('\n')
            fm = []
            for line in lines[:80]:
                fm.append(line)
                if line.strip() == '---' and len(fm) > 1:
                    break
            print(f"=== {f} ({len(lines)} lines) ===")
            print('\n'.join(fm[:30]))
            print("...\n")
