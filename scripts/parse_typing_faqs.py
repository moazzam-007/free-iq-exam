# -*- coding: utf-8 -*-
with open('scripts/typing_faq_extracted.txt', 'r', encoding='utf-8') as f:
    text = f.read()

import re
match = re.search(r'"@type":\s*"FAQPage".+?mainEntity":\s*(\[.+?\])\s*\}\s*\];', text, re.DOTALL)
if match:
    with open('scripts/typing_faqs_only.json', 'w', encoding='utf-8') as out:
        out.write(match.group(1))
    print("Found and wrote typing FAQs!")
else:
    print("Could not match FAQPage")
