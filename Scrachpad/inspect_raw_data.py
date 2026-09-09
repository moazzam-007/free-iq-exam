import json

with open('Scrachpad/raw_competitor_parsed.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

for item in items:
    p = item['prompt'].strip()
    print(f"ID {item['id']}: {p[:80]}")
