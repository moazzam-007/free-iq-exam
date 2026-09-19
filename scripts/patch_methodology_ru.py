# -*- coding: utf-8 -*-
with open('src/pages/ru/methodology.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the schema block cleanly
marker = '      {\n        "@type": "ListItem",\n        "position": 2,\n        "name": "Психометрическая методология",\n        "item": "https://freeiqexam.com/ru/methodology/"\n      }\n    ]\n'
end_marker = '\n---\n\n<Layout'

idx1 = content.find(marker)
idx2 = content.find(end_marker)

if idx1 != -1 and idx2 != -1:
    new_content = content[:idx1 + len(marker)] + '  }\n];' + content[idx2:]
    with open('src/pages/ru/methodology.astro', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS")
else:
    print(f"FAILED to find markers: {idx1}, {idx2}")
