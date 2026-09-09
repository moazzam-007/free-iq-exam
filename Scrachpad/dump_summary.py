import json

with open('Scrachpad/raw_competitor_parsed.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

with open('Scrachpad/competitor_summary.txt', 'w', encoding='utf-8') as out:
    for item in items:
        opts_str = ' | '.join(item['options'])
        out.write(f"ID {item['id']}: {item['prompt']}\nOptions: [{opts_str}]\n\n")

print(f"Wrote {len(items)} items to Scrachpad/competitor_summary.txt")
