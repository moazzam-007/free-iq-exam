# -*- coding: utf-8 -*-
import re

with open('src/pages/ru/aim-trainer.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace title & description
content = content.replace(
    'const title = "Бесплатный онлайн FPS-тренажёр аима | Точность мыши и скорость реакции";',
    'const title = "Aim Trainer онлайн: тренировка аима, точности мыши и реакции | FreeIQExam";'
)
content = content.replace(
    'const description = "Развивайте точность мыши, скорость реакции и меткость фликов в бесплатном браузерном FPS-тренажёре аима. Режимы Gridshot, плавного трекинга и точных микро-целей, конвертер чувствительности eDPI. Без загрузки и регистрации.";',
    'const description = "Бесплатный FPS Aim Trainer онлайн для тренировки аима, точности мыши и фликов. Режимы Gridshot и трекинга, конвертер чувствительности eDPI для CS2 и Valorant.";'
)

# Replace WebApplication name
content = content.replace(
    '"name": "FreeIQExam - FPS-тренажёр аима и тест точности мыши",',
    '"name": "Aim Trainer онлайн и тест точности мыши FreeIQExam",'
)

# Replace BreadcrumbList
old_breadcrumb = '''  {
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
        "name": "Инструменты",
        "item": "https://freeiqexam.com/ru/games"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "FPS-тренажёр аима",
        "item": "https://freeiqexam.com/ru/aim-trainer"
      }
    ]
  },'''

new_breadcrumb = '''  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://freeiqexam.com/ru"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Инструменты",
        "item": "https://freeiqexam.com/ru/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Aim Trainer",
        "item": "https://freeiqexam.com/ru/aim-trainer"
      }
    ]
  }'''

content = content.replace(old_breadcrumb, new_breadcrumb)

# Remove FAQPage from schema
# Search from `  {\n    "@context": "https://schema.org",\n    "@type": "FAQPage",` to `  }\n];`
content = re.sub(
    r'\n  \{\n    "@context": "https://schema\.org",\n    "@type": "FAQPage",.+?\n  \}\n\];',
    '\n];',
    content,
    flags=re.DOTALL
)

# Insert Breadcrumbs in main HTML before Hero Header
breadcrumbs_html = '''  <main class="min-h-screen bg-white dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">

    <!-- Breadcrumbs -->
    <div class="pt-6 px-4 sm:px-6 max-w-5xl mx-auto">
      <nav class="flex items-center text-xs font-mono text-zinc-500 dark:text-zinc-400" aria-label="Хлебные крошки">
        <a href="/ru" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Главная</a>
        <span class="mx-2">/</span>
        <a href="/ru/tools" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Инструменты</a>
        <span class="mx-2">/</span>
        <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Aim Trainer</span>
      </nav>
    </div>'''

content = content.replace(
    '  <main class="min-h-screen bg-white dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">',
    breadcrumbs_html
)

with open('src/pages/ru/aim-trainer.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully patched aim-trainer.astro!")
