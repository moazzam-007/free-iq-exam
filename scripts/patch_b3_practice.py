# -*- coding: utf-8 -*-
with open('src/pages/ru/practice.astro', 'r', encoding='utf-8') as f:
    content = f.read()

marker1 = 'const title = '
marker2 = '\n---\n\n<Layout'

idx1 = content.find(marker1)
idx2 = content.find(marker2)

new_frontmatter = '''const title = "Тренировка IQ: практические задания для ума по доменам CHC | FreeIQExam";
const description = "Тренировка IQ и тесты для ума: практические задания по 4 доменам CHC с пошаговыми разборами решений, развитие логики и подвижного интеллекта бесплатно.";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Практический когнитивный центр",
    "url": "https://freeiqexam.com/ru/practice/",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "description": "Интерактивная платформа когнитивных тренировок: практика без времени и пошаговые разборы решений в 4 доменах интеллекта CHC.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://freeiqexam.com/ru/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Практический центр",
        "item": "https://freeiqexam.com/ru/practice/"
      }
    ]
  }
];'''

new_content = content[:idx1] + new_frontmatter + content[idx2:]
with open('src/pages/ru/practice.astro', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("SUCCESS practice.astro")
