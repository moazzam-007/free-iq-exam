# Build 100-Item Calibrated Cognitive Bank
import json, os

with open('src/data/questions.ts', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('export const QUESTION_ITEMS: QuestionItem[] = ') + len('export const QUESTION_ITEMS: QuestionItem[] = ')
end = text.rfind('];') + 1
core_24 = json.loads(text[start:end].strip())

items = []

# Map existing 24 items
domain_chc_map = {
    'matrix_reasoning': 'fluid',
    'topological_series': 'fluid',
    'cube_rotation': 'spatial',
    'cube_nets': 'spatial'
}

for item in core_24:
    item['chcDomain'] = domain_chc_map.get(item['domain'], 'fluid')
    item['promptType'] = 'svg'
    item['promptText'] = 'Select the option that logically completes the pattern or rotation:'
    for opt in item['options']:
        opt['text'] = ''
    items.append(item)

print(f'Imported {len(items)} core SVG items (Fluid & Spatial).')
