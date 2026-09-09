# Generate Master 100-Item Cognitive Assessment Bank
import json

# 1. Load the 24 core SVG items from src/data/questions.ts
with open('src/data/questions.ts', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('export const QUESTION_ITEMS: QuestionItem[] = ') + len('export const QUESTION_ITEMS: QuestionItem[] = ')
end = text.rfind('];') + 1
core_24 = json.loads(text[start:end].strip())

item_bank = []
current_id = 1

# Helper to normalize SVG options
for item in core_24:
    domain_map = {
        'matrix_reasoning': ('fluid', 'matrix_reasoning'),
        'topological_series': ('fluid', 'topological_series'),
        'cube_rotation': ('spatial', 'cube_rotation'),
        'cube_nets': ('spatial', 'cube_nets')
    }
    chc, sub = domain_map.get(item['domain'], ('fluid', 'matrix_reasoning'))
    
    formatted_options = []
    for opt in item['options']:
        formatted_options.append({
            'id': opt['id'],
            'text': '',
            'svgContent': opt.get('svgContent', ''),
            'isCorrect': opt.get('isCorrect', False),
            'distractorType': opt.get('distractorType', 'random')
        })
    
    item_bank.append({
        'id': current_id,
        'domain': chc,
        'subType': sub,
        'promptType': 'svg',
        'promptText': 'Analyze the pattern logic across the matrix rows and columns. Select the missing figure that logically completes the system.',
        'promptSvg': item['promptSvg'],
        'options': formatted_options,
        'a': item['a'],
        'b': item['b'],
        'explanation': item['explanation'],
        'sourceRef': 'FreeIQExam Core Calibrated Benchmarks (2PL IRT)'
    })
    current_id += 1

print(f"Added {len(item_bank)} core SVG items (16 Fluid, 8 Spatial). Current count: {len(item_bank)}")
