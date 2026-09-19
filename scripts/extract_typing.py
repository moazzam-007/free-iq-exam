# -*- coding: utf-8 -*-
import subprocess

out = subprocess.check_output(['git', 'show', 'HEAD:src/pages/ru/typing-test.astro'], encoding='utf-8')
with open('scripts/typing_faq_extracted.txt', 'w', encoding='utf-8') as f:
    f.write(out)

print("Wrote typing test HEAD to scripts/typing_faq_extracted.txt")
