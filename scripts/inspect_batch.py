import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')

files = [
    'src/pages/ru/index.astro',
    'src/pages/ru/test.astro',
    'src/pages/ru/color-blind-test.astro',
    'src/pages/ru/depression-test.astro',
    'src/pages/ru/typing-test.astro',
    'src/pages/ru/mic-test.astro',
    'src/pages/ru/calorie-calculator.astro',
    'src/pages/ru/brown-noise.astro',
    'src/pages/ru/sleep-calculator.astro',
    'src/pages/ru/memento-mori.astro',
    'src/pages/ru/reaction-time-test.astro',
    'src/pages/ru/aim-trainer.astro',
    'src/pages/ru/flag-quiz.astro'
]

for f in files:
    if not os.path.exists(f):
        print(f"MISSING: {f}")
        continue
    content = open(f, 'r', encoding='utf-8').read()
    m_title = re.search(r'const\s+title\s*=\s*["\'](.+?)["\'];', content)
    m_desc = re.search(r'const\s+description\s*=\s*["\'](.+?)["\'];', content)
    has_faq_schema = 'FAQPage' in content
    has_details = '<details' in content
    has_h1 = re.search(r'<h1[^>]*>(.+?)</h1>', content, re.DOTALL)
    h1_txt = re.sub(r'<[^>]+>', '', has_h1.group(1)).strip() if has_h1 else 'NO H1'
    h1_txt = ' '.join(h1_txt.split())[:60]
    title_txt = m_title.group(1) if m_title else 'NO TITLE'
    desc_txt = m_desc.group(1) if m_desc else 'NO DESC'
    print(f"{os.path.basename(f)}:")
    print(f"  Title: {title_txt}")
    print(f"  Desc:  {desc_txt[:80]}...")
    print(f"  H1:    {h1_txt}")
    print(f"  FAQ Schema: {has_faq_schema}, HTML Details: {has_details}")
