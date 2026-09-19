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

b4_files = [
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
]

b5_files = [
    'src/pages/ru/games.astro',
    'src/pages/ru/tools.astro',
    'src/pages/ru/about.astro',
    'src/pages/ru/blog.astro',
    'src/pages/ru/contact.astro',
    'src/pages/ru/profile.astro',
]

def analyze_batch(name, files):
    print(f"\n=======================================================\n{name} ({len(files)} files)\n=======================================================")
    for f in files:
        if not os.path.exists(f):
            print(f"FILE NOT FOUND: {f}")
            continue
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        
        t_match = re.search(r'title\s*=\s*["\']([^"\']+)["\']', content)
        d_match = re.search(r'description\s*=\s*["\']([^"\']+)["\']', content)
        has_schema = 'schema' in content
        has_faq_page = 'FAQPage' in content
        details_count = len(re.findall(r'<details', content, re.IGNORECASE))
        h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL | re.IGNORECASE)
        h2_matches = re.findall(r'<h2[^>]*>(.*?)</h2>', content, re.DOTALL | re.IGNORECASE)
        
        # Clean tags from h1
        clean_h1 = [re.sub(r'<[^>]+>', '', h).strip() for h in h1_matches]
        
        print(f"--- {f} ---")
        print(f"Title: {t_match.group(1) if t_match else 'None'}")
        print(f"Desc: {d_match.group(1)[:100] + '...' if d_match else 'None'}")
        print(f"H1: {clean_h1}")
        print(f"H2 count: {len(h2_matches)}, Details/FAQ count: {details_count}")
        print(f"Has schema: {has_schema}, Has FAQPage: {has_faq_page}")

analyze_batch("BATCH 3: Statistical Authority (9 Pages)", b3_files)
analyze_batch("BATCH 4: Brain Games (11 Pages)", b4_files)
analyze_batch("BATCH 5: Entity & Trust (6 Pages)", b5_files)
