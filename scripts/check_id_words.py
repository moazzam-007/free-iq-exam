# -*- coding: utf-8 -*-
import re

id_words = ['suara', 'tidur', 'hidup', 'minggu', 'tahun', 'usia', 'anda', 'adalah', 'dengan', 'apakah', 'bagaimana', 'mengapa', 'dalam', 'untuk', 'pada', 'dari', 'yang', 'tanpa', 'pilihan', 'putus', 'menit', 'derau', 'gelombang', 'kipas', 'hujan', 'ombak', 'guruh', 'kematian', 'hari', 'waktu']

with open('src/pages/ru/memento-mori.astro', 'r', encoding='utf-8') as f:
    text = f.read()

clean_text = text.replace('idPath="/memento-mori"', '').replace("id: '/id/memento-mori'", '')

found = {}
for w in id_words:
    matches = len(re.findall(r'\b' + w + r'\b', clean_text, re.I))
    if matches:
        found[w] = matches

print("Indonesian words found in memento-mori.astro:", found)
