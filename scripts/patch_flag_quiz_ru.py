# -*- coding: utf-8 -*-
import re

with open('src/pages/ru/flag-quiz.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace title & description
content = content.replace(
    'const title = "Тест на знание флагов мира | Тренажёр географической памяти по 195+ странам";',
    'const title = "Флаги стран мира: тест на знание флагов онлайн | Угадай флаг | FreeIQExam";'
)
content = content.replace(
    'const description = "Проверьте зрительную память и знание флагов 195+ суверенных государств. Четыре режима: спринт из 20 вопросов, выживание на выбывание, обратный подбор и сложный режим вексиллологии.";',
    'const description = "Проверьте зрительную память и географические знания в интерактивном тесте на флаги стран мира. Угадайте флаги 195+ государств онлайн: режимы спринта и выживания.";'
)

# Replace WebApplication name
content = content.replace(
    '"name": "FreeIQExam Тест на знание флагов мира и географической памяти",',
    '"name": "Флаги стран мира: тест на знание флагов онлайн FreeIQExam",'
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
        "name": "Игры",
        "item": "https://freeiqexam.com/ru/games"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Тест на знание флагов мира",
        "item": "https://freeiqexam.com/ru/flag-quiz"
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
        "name": "Флаги стран мира",
        "item": "https://freeiqexam.com/ru/flag-quiz"
      }
    ]
  }'''

content = content.replace(old_breadcrumb, new_breadcrumb)

# Remove FAQPage from schema
content = re.sub(
    r'\n  \{\n    "@context": "https://schema\.org",\n    "@type": "FAQPage",.+?\n  \}\n\];',
    '\n];',
    content,
    flags=re.DOTALL
)

# Update HTML Breadcrumbs Nav
old_nav = '''      <!-- Navigation Breadcrumb -->
      <nav class="flex items-center justify-center gap-2 text-[13px] font-mono text-zinc-500 dark:text-zinc-400 mb-6" aria-label="Хлебные крошки">
        <a href="/ru/" class="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">Главная</a>
        <span>/</span>
        <a href="/ru/games" class="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">Игры</a>
        <span>/</span>
        <span class="text-zinc-800 dark:text-zinc-200">Тест на знание флагов мира</span>
      </nav>'''

new_nav = '''      <!-- Navigation Breadcrumb -->
      <nav class="flex items-center justify-center gap-2 text-[13px] font-mono text-zinc-500 dark:text-zinc-400 mb-6" aria-label="Хлебные крошки">
        <a href="/ru" class="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">Главная</a>
        <span>/</span>
        <a href="/ru/tools" class="hover:text-[#0066cc] dark:hover:text-[#2997ff] transition-colors">Инструменты</a>
        <span>/</span>
        <span class="text-zinc-800 dark:text-zinc-200">Флаги стран мира</span>
      </nav>'''

content = content.replace(old_nav, new_nav)

# Update H1
old_h1 = '''      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.025em] leading-[1.08] text-zinc-950 dark:text-white mb-4">
        Тест на знание флагов мира и <span class="text-[#0066cc] dark:text-[#2997ff]">географическая арена</span>
      </h1>'''

new_h1 = '''      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.025em] leading-[1.08] text-zinc-950 dark:text-white mb-4">
        Флаги стран мира: <span class="text-[#0066cc] dark:text-[#2997ff]">тест на знание флагов</span>
      </h1>'''

content = content.replace(old_h1, new_h1)

with open('src/pages/ru/flag-quiz.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully patched flag-quiz.astro!")
