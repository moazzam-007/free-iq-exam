# -*- coding: utf-8 -*-
import subprocess, json

def inspect(file_path):
    out = subprocess.check_output(['git', 'show', f'HEAD:{file_path}'], encoding='utf-8')
    lines = out.splitlines()
    print(f"=== {file_path} ===")
    recording = False
    block = []
    for line in lines:
        if '"@type": "FAQPage"' in line:
            recording = True
        if recording:
            block.append(line)
            if line.strip() == '}' and len(block) > 10:
                break
    print("\n".join(block[:30]))

inspect('src/pages/ru/color-blind-test.astro')
inspect('src/pages/ru/typing-test.astro')
