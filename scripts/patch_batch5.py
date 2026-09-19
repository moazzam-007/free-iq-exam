# -*- coding: utf-8 -*-
"""
Script to apply Russian SEO and localization optimizations to remaining Batch 5 pages:
1. src/pages/ru/tools.astro
2. src/pages/ru/about.astro
3. src/pages/ru/blog.astro
4. src/pages/ru/contact.astro
5. src/pages/ru/profile.astro
"""

import os
import sys

def patch_tools():
    path = 'src/pages/ru/tools.astro'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update title and description
    old_title = 'const title = "Бесплатные инструменты и калькуляторы: сон, калории, IQ | FreeIQExam";'
    new_title = 'const title = "Инструменты для мозга и калькуляторы здоровья онлайн | FreeIQExam";'
    assert old_title in content, "old title not found in tools.astro"
    content = content.replace(old_title, new_title)

    old_desc = 'const description = "Все бесплатные инструменты FreeIQExam: калькулятор сна, калорий и TDEE, таблица баллов IQ и калькулятор процентилей, проверка микрофона и генератор шума. Без регистрации.";'
    new_desc = 'const description = "Каталог бесплатных когнитивных инструментов и калькуляторов здоровья FreeIQExam: сон, калории, TDEE, слух, зрение, микрофон и шкалы IQ. Без регистрации.";'
    assert old_desc in content, "old desc not found in tools.astro"
    content = content.replace(old_desc, new_desc)

    # 2. Purge FAQPage from schema
    schema_start = content.find('const schema = [')
    schema_end = content.find('];', schema_start) + 2
    assert schema_start != -1 and schema_end != -1, "schema not found in tools.astro"

    new_schema = """const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Инструменты для мозга и калькуляторы здоровья онлайн — FreeIQExam",
    "url": "https://freeiqexam.com/ru/tools",
    "description": description,
    "isPartOf": {
      "@type": "WebSite",
      "name": "FreeIQExam",
      "url": "https://freeiqexam.com"
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
        "name": "Инструменты",
        "item": "https://freeiqexam.com/ru/tools/"
      }
    ]
  }
];"""
    content = content[:schema_start] + new_schema + content[schema_end:]

    # 3. Fix mixed English in FAQ #2
    old_faq2 = 'No. The calculators, generators, and diagnostics all execute client-side in your browser using standard web APIs. Sleep timings, body metrics, microphone samples, and worry lists are never transmitted to a server. Сохранённые результаты живут только в локальном хранилище вашего браузера и удаляются вместе с данными сайта. Подробности — в <a href="/ru/privacy" class="text-blue-600 dark:text-blue-400 hover:underline">политике конфиденциальности</a>.'
    new_faq2 = 'Нет. Все калькуляторы, генераторы и диагностические инструменты работают исключительно на стороне клиента в вашем браузере с использованием стандартных веб-API. Время сна, параметры тела, аудиозаписи с микрофона никогда не передаются на сервер. Сохранённые результаты живут только в локальном хранилище вашего браузера и удаляются вместе с данными сайта. Подробности — в <a href="/ru/privacy" class="text-blue-600 dark:text-blue-400 hover:underline">политике конфиденциальности</a>.'
    assert old_faq2 in content, "old faq2 not found in tools.astro"
    content = content.replace(old_faq2, new_faq2)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched tools.astro successfully")


def patch_about():
    path = 'src/pages/ru/about.astro'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update title and description
    old_title = 'const title = "О проекте FreeIQExam — миссия и научный подход";'
    new_title = 'const title = "О проекте FreeIQExam: миссия, психометрическая методология и команда | FreeIQExam";'
    assert old_title in content, "old title not found in about.astro"
    content = content.replace(old_title, new_title)

    old_desc = 'const description = "FreeIQExam — бесплатная когнитивная оценка на основе модели 2PL IRT и структуры CHC: прозрачная методология, без регистрации и оплаты.";'
    new_desc = 'const description = "О миссии FreeIQExam: бесплатная научная оценка когнитивных способностей по модели 2PL IRT и CHC, этические стандарты, прозрачность и редакция.";'
    assert old_desc in content, "old desc not found in about.astro"
    content = content.replace(old_desc, new_desc)

    # 2. Replace schema (purge FAQPage, qualify AboutPage & Organization in Russian)
    schema_start = content.find('const schema = [')
    schema_end = content.find('];', schema_start) + 2
    assert schema_start != -1 and schema_end != -1, "schema not found in about.astro"

    new_schema = """const schema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "О проекте FreeIQExam: миссия, психометрика и прозрачность",
    "url": "https://freeiqexam.com/ru/about/",
    "description": "Узнайте о миссии FreeIQExam: научно обоснованное, прозрачное и бесплатное когнитивное тестирование на основе психометрической модели CHC и 2PL IRT."
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FreeIQExam",
    "url": "https://freeiqexam.com/ru/",
    "logo": "https://freeiqexam.com/ru/logo-horizontal.svg",
    "sameAs": [
      "https://github.com/freeiqexam"
    ],
    "description": "Открытая платформа для научной оценки когнитивных способностей и тренировки мозга с приоритетом приватности и без платных барьеров."
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
        "name": "О проекте",
        "item": "https://freeiqexam.com/ru/about/"
      }
    ]
  }
];"""
    content = content[:schema_start] + new_schema + content[schema_end:]

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched about.astro successfully")


def patch_blog():
    path = 'src/pages/ru/blog.astro'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Title and description
    old_title = 'const title = "Блог о когнитивной науке и психометрии | FreeIQExam";'
    new_title = 'const title = "Блог о когнитивных науках и психометрии: статьи и исследования | FreeIQExam";'
    assert old_title in content, "old title not found in blog.astro"
    content = content.replace(old_title, new_title)

    old_desc = 'const description = "Научно обоснованные разборы: шкала IQ, процентили, эффект Флинна, матричное мышление и подготовка к Mensa.";'
    new_desc = 'const description = "Статьи и исследования по психометрии: шкала IQ, нормальные распределения, эффект Флинна, методология тестирования и тренировка когнитивных способностей.";'
    assert old_desc in content, "old desc not found in blog.astro"
    content = content.replace(old_desc, new_desc)

    # 2. Featured post
    old_featured = """const featuredPost = {
  title: "The Comprehensive IQ Шкала классификации: WAIS-IV, Stanford-Binet 5, and the Колоколообразная кривая",
  slug: "/iq-classification-scale",
  category: "Psychometrics & Scales",
  categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
  readTime: "8 min read",
  date: "September 2026",
  author: "Psychometrics Research Group",
  excerpt: "A deep comparative analysis of modern intelligence classifications. Learn how Wechsler, Stanford-Binet, and Woodcock-Johnson define Very Superior, Gifted, and Average cognitive ability across the standard normal distribution."
};"""
    new_featured = """const featuredPost = {
  title: "Шкала классификации IQ: WAIS-IV, Стэнфорд-Бине 5 и колоколообразная кривая",
  slug: "/ru/iq-classification-scale",
  category: "Психометрия и шкалы",
  categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
  readTime: "8 мин чтения",
  date: "Сентябрь 2026",
  author: "Группа психометрических исследований",
  excerpt: "Сравнительный анализ современных классификаций интеллекта: как Векслер, Стэнфорд-Бине и Вудкок-Джонсон определяют одарённость, норму и границы способностей по кривой нормального распределения."
};"""
    assert old_featured in content, "old featured not found in blog.astro"
    content = content.replace(old_featured, new_featured)

    # 3. Articles array
    art_start = content.find('const articles = [')
    art_end = content.find('];', art_start) + 2
    assert art_start != -1 and art_end != -1, "articles not found in blog.astro"

    new_articles = """const articles = [
  {
    title: "Сообщества высокого IQ: Mensa, Intertel и Общество Triple Nine",
    slug: "/ru/high-iq-societies",
    category: "Сообщества высокого IQ",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
    readTime: "7 мин чтения",
    date: "Сентябрь 2026",
    author: "Группа психометрических исследований",
    excerpt: "Пороги поступления, квалификационные тесты (SAT, GRE, ACT) и критерии членства в ведущих мировых организациях для людей с высоким IQ."
  },
  {
    title: "5 правил Карпентера: расшифровка матриц Равена и абстрактного мышления",
    slug: "/ru/matrix-reasoning-test",
    category: "Когнитивная тренировка",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
    readTime: "6 мин чтения",
    date: "Сентябрь 2026",
    author: "Команда когнитивных наук",
    excerpt: "Изучите когнитивную иерархию правил Карпентера, Джаста и Шелл (1990): логическое сложение XOR, количественные прогрессии и пространственные сдвиги."
  },
  {
    title: "Средний IQ по возрасту: возрастные траектории интеллекта и эффект Флинна",
    slug: "/ru/average-iq-by-age",
    category: "Возрастная психология",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
    readTime: "7 мин чтения",
    date: "Сентябрь 2026",
    author: "Группа возрастной психологии",
    excerpt: "Почему медиана популяционного IQ всегда равна 100 в любом возрасте? Графики подвижного (Gf) и кристаллизовавшегося (Gc) интеллекта и межпоколенческий дрейф."
  },
  {
    title: "Подготовка к тесту Mensa: культурно-нейтральные задания и стратегия сдачи",
    slug: "/ru/mensa-iq-test-practice",
    category: "Подготовка к тестам",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
    readTime: "6 мин чтения",
    date: "Сентябрь 2026",
    author: "Команда подготовки к тестам",
    excerpt: "Практические стратегии сдачи вступительного теста Менса: разбор невербальной индукции матриц и скоростного пространственного мышления на время."
  },
  {
    title: "Колоколообразная кривая IQ: стандартные отклонения, редкость и процентили",
    slug: "/ru/iq-score-chart",
    category: "Статистика и измерения",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
    readTime: "5 мин чтения",
    date: "Сентябрь 2026",
    author: "Группа психометрических исследований",
    excerpt: "Диапазоны гауссова распределения, конвертация стандартных отклонений (SD 15, SD 16, SD 24) и точное статистическое значение балла IQ в популяции."
  },
  {
    title: "Двухпараметрическая модель IRT (2PL) и байесовское оценивание EAP",
    slug: "/ru/methodology",
    category: "Методология",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/80",
    readTime: "12 мин чтения",
    date: "Сентябрь 2026",
    author: "Команда психометрики",
    excerpt: "Полная математическая документация модели 2PL IRT, квадратуры Гаусса-Эрмита по 81 узлу, 95% апостериорных доверительных интервалов и валидация."
  }
];"""
    content = content[:art_start] + new_articles + content[art_end:]

    # 4. Schema
    old_schema = """const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "FreeIQExam Когнитивная наука & Psychometrics Блог",
  "description": description,
  "url": "https://freeiqexam.com/ru/blog"
};"""
    new_schema = """const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Блог FreeIQExam о когнитивных науках и психометрии",
  "description": description,
  "url": "https://freeiqexam.com/ru/blog"
};"""
    assert old_schema in content, "old schema not found in blog.astro"
    content = content.replace(old_schema, new_schema)

    # 5. Breadcrumb & Hero
    content = content.replace(
        '<span class="text-zinc-900 dark:text-zinc-100 font-semibold">Блог &amp; Articles</span>',
        '<span class="text-zinc-900 dark:text-zinc-100 font-semibold">Блог и статьи</span>'
    )
    content = content.replace(
        'COGNITIVE RESEARCH &bull; PSYCHOMETRIC GUIDES &bull; ARTICLES',
        'ИССЛЕДОВАНИЯ &bull; ПСИХОМЕТРИЯ &bull; РУКОВОДСТВА'
    )
    content = content.replace(
        'Cognitive Science &amp; Psychometrics Блог',
        'Блог о когнитивных науках и психометрии'
    )
    content = content.replace(
        'Evidence-based guides, psychometric methodologies, and empirical research on human intelligence, matrix reasoning, and cognitive measurement.',
        'Научно обоснованные руководства, психометрические методики и эмпирические исследования интеллекта человека, матричного мышления и когнитивных измерений.'
    )
    content = content.replace('Featured Research Guide', 'Избранное руководство')
    content = content.replace('<span>Read Full Guide</span>', '<span>Читать руководство</span>')
    content = content.replace('All Research Guides &amp; Articles', 'Все руководства и статьи')
    content = content.replace('{articles.length + 1} Publications', '{articles.length + 1} публикаций')
    content = content.replace('<span>Read Article</span>', '<span>Читать статью</span>')

    # 6. Add visible FAQ accordions before CTA Banner
    old_cta_start = '<!-- Assessment CTA Banner -->'
    assert old_cta_start in content, "cta banner not found in blog.astro"
    
    faq_section = """<!-- PAA FAQs Accordion -->
    <section class="mb-14 sm:mb-16 p-6 sm:p-10 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
      <h2 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white mb-6">
        Часто задаваемые вопросы о публикациях блога
      </h2>
      <div class="space-y-4">
        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Кто является автором и рецензентом статей в блоге?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Все материалы подготовлены междисциплинарной исследовательской группой FreeIQExam, включающей специалистов по психометрике, теории тестирования и когнитивным наукам. Статьи проходят проверку на соответствие актуальным стандартам психометрических измерений.
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>На каких научных источниках основываются материалы?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Публикации опираются на рецензируемые академические работы: факторную модель Кэттелла-Хорна-Кэрролла (CHC), современную теорию тестовых заданий (IRT), исследования Джеймса Флинна по межпоколенческой динамике и технические руководства стандартизированных батарей (WAIS-IV, Stanford-Binet 5).
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Как часто обновляются данные и нормативные таблицы?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Наши статистические модели и таблицы калибруются по мере накопления анонимизированных психометрических выборок и публикации новых метаанализов когнитивных показателей. Каждое обновление сопровождается пересчётом параметров заданий по модели 2PL IRT.
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Можно ли цитировать статьи блога в исследовательских работах?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Да. Материалы блога и технического отчёта (Whitepaper) открыты для образовательного и исследовательского цитирования с указанием активной гиперссылки на первоисточник FreeIQExam.com и соответствующих авторов.
          </p>
        </details>
      </div>
    </section>

    """
    content = content.replace(old_cta_start, faq_section + old_cta_start)

    # 7. Localize CTA Banner
    content = content.replace('Put the Theory into Практика', 'Примените теорию на практике')
    content = content.replace(
        'Test your abstract matrix reasoning, 3D cube rotations, quantitative logic, and verbal deductions on our standardized, free assessment.',
        'Проверьте абстрактное матричное мышление, пространственные вращения 3D-фигур, числовую логику и вербальные дедукции в стандартизированном бесплатном тесте.'
    )
    content = content.replace('<span>Take Standard Test (20 мин)</span>', '<span>Пройти стандартный тест (20 мин)</span>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched blog.astro successfully")


def patch_contact():
    path = 'src/pages/ru/contact.astro'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Title and description
    old_title = 'const title = "Контакты — поддержка FreeIQExam";'
    new_title = 'const title = "Контакты FreeIQExam: обратная связь, поддержка и сотрудничество | FreeIQExam";'
    assert old_title in content, "old title not found in contact.astro"
    content = content.replace(old_title, new_title)

    old_desc = 'const description = "Свяжитесь с командой FreeIQExam: вопросы о психометрии, результатах тестов и сотрудничестве.";'
    new_desc = 'const description = "Свяжитесь с командой FreeIQExam: вопросы по результатам тестирования, обратная связь, научное сотрудничество и сообщения об ошибках.";'
    assert old_desc in content, "old desc not found in contact.astro"
    content = content.replace(old_desc, new_desc)

    # 2. Add visible FAQ accordions before </main>
    faq_section = """    <!-- PAA FAQs Accordion -->
    <section class="p-6 sm:p-10 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
      <h2 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white mb-6">
        Часто задаваемые вопросы о поддержке и связи
      </h2>
      <div class="space-y-4">
        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>В течение какого времени служба поддержки отвечает на обращения?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Мы обрабатываем все входящие запросы в течение 24–48 часов по рабочим дням. Вопросы, касающиеся технических неполадок или предложений по улучшению заданий, имеют наивысший приоритет.
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Передаются ли мои персональные данные при обращении?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Нет. Форма обратной связи формирует прямое почтовое сообщение через ваш почтовый клиент (mailto) либо копирует текст в буфер обмена. Мы не сохраняем ваши черновики или персональную переписку на веб-серверах платформы.
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Принимаются ли заявки на научное и академическое сотрудничество?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Да. Мы активно сотрудничаем с исследователями, аспирантами и лабораториями в области когнитивной психологии, машинного обучения и психометрии. Выберите тему «Партнёрство и исследования» при отправке сообщения.
          </p>
        </details>
      </div>
    </section>
  </main>"""

    main_end = '</main>'
    assert main_end in content, "</main> not found in contact.astro"
    content = content.replace(main_end, faq_section, 1)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched contact.astro successfully")


def patch_profile():
    path = 'src/pages/ru/profile.astro'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Title, description and schema
    old_title = 'const title = "Мой когнитивный профиль и история | FreeIQExam";'
    new_title = 'const title = "Личный когнитивный профиль: история тестов и динамика IQ | FreeIQExam";'
    assert old_title in content, "old title not found in profile.astro"
    content = content.replace(old_title, new_title)

    old_desc = 'const description = "Личный когнитивный профиль: история оценок, прогресс по доменам Gf/Gv/Gq/Gc, экспорт данных. Всё хранится локально.";'
    new_desc = 'const description = "Ваш персональный когнитивный профиль: история оценок по доменам Gf, Gv, Gq, Gc, динамика результатов и экспорт данных. 100% приватно в вашем браузере.";'
    assert old_desc in content, "old desc not found in profile.astro"
    content = content.replace(old_desc, new_desc)

    old_schema = """const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "name": "Личный когнитивный профиль",
  "description": description,
  "url": "https://freeiqexam.com/ru/profile"
};"""
    new_schema = """const schema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "name": "Личный когнитивный профиль — FreeIQExam",
  "description": description,
  "url": "https://freeiqexam.com/ru/profile"
};"""
    assert old_schema in content, "old schema not found in profile.astro"
    content = content.replace(old_schema, new_schema)

    # 2. Template strings localization
    content = content.replace('<span class="text-zinc-900 dark:text-zinc-100 font-semibold">My Profile</span>', '<span class="text-zinc-900 dark:text-zinc-100 font-semibold">Личный профиль</span>')
    content = content.replace('Client-Side Only &bull; 100% Private (No Account, Zero Telemetry)', 'Только в браузере &bull; 100% приватно (без аккаунта и телеметрии)')
    content = content.replace('Personal Cognitive Profile & Activity Log', 'Личный когнитивный профиль и история активности')
    content = content.replace(
        'All test sessions and game drills are stored locally in your browser storage. You have full ownership of your data with instant JSON backup export, offline restore, and complete zero-telemetry privacy.',
        'Все сессии тестов и результаты тренировок сохраняются локально в вашем браузере. Вы полностью контролируете свои данные: мгновенный экспорт в JSON, офлайн-восстановление и полная конфиденциальность без сбора телеметрии.'
    )

    # Empty state
    content = content.replace('Build Your Personal Cognitive Profile', 'Создайте свой когнитивный профиль')
    content = content.replace(
        'You have not completed any assessments or training games on this device yet. Complete an IQ assessment or train with a cognitive mini-game, and your personal benchmark history will appear here automatically.',
        'На этом устройстве пока нет завершённых тестов или тренировочных игр. Пройдите оценку IQ или сыграйте в когнитивную микроигру, и история ваших результатов автоматически появится здесь.'
    )
    content = content.replace('<span>Take Официальный Полный тест на IQ (20 мин)</span>', '<span>Пройти полный тест на IQ (20 мин)</span>')
    content = content.replace('<span>Quick 10-Minute Screening</span>', '<span>Экспресс-тест (10 мин)</span>')
    content = content.replace('<span>Explore 10 Когнитивные игры</span>', '<span>Открыть 10 когнитивных игр</span>')

    # Section 1
    content = content.replace('Section 1 &bull; Psychometric IRT (2PL)', 'Раздел 1 &bull; Психометрика IRT (2PL)')
    content = content.replace('Formal Assessment History', 'История формальных тестирований')
    content = content.replace(
        'Calibrated Item Response Theory estimates, posterior credible intervals, and standardized population percentiles.',
        'Калиброванные оценки по теории IRT, апостериорные доверительные интервалы и стандартизированные популяционные процентили.'
    )
    content = content.replace('<span>Retake Assessment</span>', '<span>Пройти тест повторно</span>')
    content = content.replace('Assessment Session Logs', 'Журнал сессий тестирования')
    content = content.replace('<th scope="col" class="px-5 py-3">Completed Date</th>', '<th scope="col" class="px-5 py-3">Дата завершения</th>')
    content = content.replace('<th scope="col" class="px-5 py-3">Assessment Type</th>', '<th scope="col" class="px-5 py-3">Тип теста</th>')
    content = content.replace('<th scope="col" class="px-5 py-3">Raw Счёт</th>', '<th scope="col" class="px-5 py-3">Сырой балл</th>')
    content = content.replace('<th scope="col" class="px-5 py-3">IQ Estimate</th>', '<th scope="col" class="px-5 py-3">Оценка IQ</th>')
    content = content.replace('<th scope="col" class="px-5 py-3">95% Credible Interval</th>', '<th scope="col" class="px-5 py-3">95% Доверительный интервал</th>')
    content = content.replace('<th scope="col" class="px-5 py-3">Duration</th>', '<th scope="col" class="px-5 py-3">Длительность</th>')

    # Section 2
    content = content.replace('Section 2 &bull; CHC Cognitive Task Groupings', 'Раздел 2 &bull; Группы когнитивных задач CHC')
    content = content.replace('Cognitive Training Activity Profiles', 'Профили когнитивных тренировок')
    content = content.replace(
        'Rolling performance medians across 5 core domains from task-specific mini-game drills.',
        'Скользящие медианы показателей по 5 ключевым доменам когнитивных микроигр.'
    )
    content = content.replace('Практика Effects Notice:', 'Эффект тренировки:')
    content = content.replace(
        'Repeated practice on cognitive games develops task-specific operational fluency and reflex pacing. These drills reflect task performance agility and do not indicate a permanent increase in general psychometric intelligence (g).',
        'Повторные тренировки развивают специфическую скорость выполнения конкретных задач и рефлексы. Эти показатели отражают навыки в конкретных упражнениях и не означают постоянного изменения общего психометрического фактора интеллекта (g).'
    )

    # Section 3
    content = content.replace('Section 3 &bull; Chronological History', 'Раздел 3 &bull; Хронологическая история')
    content = content.replace('Recent Activity Feed', 'История недавней активности')
    content = content.replace('<span>Play Training Игры</span>', '<span>Когнитивные игры</span>')

    # Section 4
    content = content.replace('Data Portability & Privacy Controls', 'Управление данными и конфиденциальность')
    content = content.replace(
        'Export your profile to an offline JSON backup, restore existing records, generate a print-ready report, or clear your local browser storage.',
        'Экспортируйте профиль в офлайн JSON-бэкап, восстанавливайте записи, формируйте отчёт для печати или очищайте локальное хранилище браузера.'
    )
    content = content.replace('<span>Print / PDF Report</span>', '<span>Печать / PDF отчёт</span>')
    content = content.replace('<span>Clear All Data</span>', '<span>Удалить все данные</span>')

    # Modal
    content = content.replace('Clear Local Profile?', 'Очистить локальный профиль?')
    content = content.replace('<p class="text-xs text-zinc-500 dark:text-zinc-400">Irreversible action</p>', '<p class="text-xs text-zinc-500 dark:text-zinc-400">Необратимое действие</p>')
    content = content.replace(
        'This action will permanently delete all stored IQ assessment estimates, domain scores, and cognitive mini-game records from this browser. Make sure you export a JSON backup first if you want to keep your records.',
        'Это действие навсегда удалит все сохранённые оценки IQ, показатели по доменам и историю тренировок из этого браузера. Если вы хотите сохранить данные, предварительно экспортируйте резервную копию в JSON.'
    )
    content = content.replace('Cancel\n        </button>', 'Отмена\n        </button>')
    content = content.replace('Yes, Delete Everything\n        </button>', 'Да, удалить всё\n        </button>')

    # 3. Add visible FAQ accordions before </main>
    faq_section = """    <!-- PAA FAQs Accordion -->
    <section class="mt-12 p-6 sm:p-10 rounded-3xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
      <h2 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white mb-6">
        Часто задаваемые вопросы о когнитивном профиле
      </h2>
      <div class="space-y-4">
        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Где сохраняются мои результаты тестирования?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Все данные ваших сессий, баллы IQ и показатели в тренировочных играх сохраняются исключительно в локальном хранилище (localStorage) вашего браузера на вашем устройстве. Мы не передаём и не храним ваши результаты на внешних серверах платформы.
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Как перенести историю результатов на другое устройство?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Используйте кнопку «Экспорт JSON Резервная копия» в разделе управления данными. Файл резервной копии можно сохранить на флешку или отправить себе, а затем загрузить на новом компьютере или смартфоне через кнопку «Импорт JSON Резервная копия».
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Что произойдёт при очистке данных браузера?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Если вы удалите историю и кэш сайта в настройках браузера, локальные записи будут стёрты без возможности автоматического восстановления. Поэтому перед очисткой браузера рекомендуется сделать экспорт JSON-файла.
          </p>
        </details>

        <details class="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-colors open:bg-white dark:open:bg-zinc-900">
          <summary class="flex justify-between items-center font-heading font-semibold text-zinc-900 dark:text-white cursor-pointer list-none select-none text-sm sm:text-base">
            <span>Как формируются показатели по 5 доменам способностей?</span>
            <span class="ml-4 transition-transform group-open:rotate-180 text-zinc-400">&darr;</span>
          </summary>
          <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Оценки рассчитываются на основе скользящей медианы ваших результатов в микроиграх платформы по теории Кэттелла-Хорна-Кэрролла (CHC): подвижный интеллект (Gf), пространственная визуализация (Gv), кратковременная память (Gsm), скорость обработки (Gs) и количественное мышление (Gq).
          </p>
        </details>
      </div>
    </section>
  </main>"""

    main_end = '</main>'
    assert main_end in content, "</main> not found in profile.astro"
    content = content.replace(main_end, faq_section, 1)

    # 4. Localize text inside client script safely (labels & messages only)
    content = content.replace('No Trend', 'Без тренда')
    content = content.replace('No recent sessions', 'Нет недавних сессий')
    content = content.replace('Rolling Median Score', 'Скользящий медианный балл')
    content = content.replace('Personal Рекорд', 'Личный рекорд')
    content = content.replace('Confidence / Sample', 'Надёжность / Выборка')
    content = content.replace("summary.personalBest + ' pts'", "summary.personalBest + ' очков'")
    content = content.replace('Recent Session Scores', 'Баллы недавних сессий')
    content = content.replace('Standard Psychometric Assessment', 'Стандартный психометрический тест')
    content = content.replace('Latest Ориентир', 'Последний результат')
    content = content.replace('Standard Счёт (SD 15)', 'Стандартный балл (SD 15)')
    content = content.replace('Процентиль Standing', 'Положение по процентилям')
    content = content.replace('Exceeds ${escapeHtml(latest.percentile.toFixed(1))}% из standardized reference population.', 'Превосходит ${escapeHtml(latest.percentile.toFixed(1))}% стандартизированной выборки.')
    content = content.replace('Вопрос Response Diagnostics', 'Диагностика по теории IRT')
    content = content.replace('Ability (&theta;):', 'Способность (&theta;):')
    content = content.replace('Std Error (SEM):', 'Станд. ошибка (SEM):')
    content = content.replace('Raw Accuracy:', 'Сырая точность:')
    content = content.replace('${escapeHtml(latest.rawScore)} / ${escapeHtml(latest.totalQuestions)} items', '${escapeHtml(latest.rawScore)} / ${escapeHtml(latest.totalQuestions)} заданий')
    content = content.replace('No Activity', 'Нет активности')
    content = content.replace('&uarr; Improving', '&uarr; Рост')
    content = content.replace('&darr; Fluctuating', '&darr; Колебания')
    content = content.replace('&rarr; Steady', '&rarr; Стабильно')
    content = content.replace('No formal psychometric assessments completed yet.', 'Формальные психометрические тесты ещё не пройдены.')
    content = content.replace('Take the official IRT-calibrated assessment to establish your standardized cognitive baseline.', 'Пройдите официальный тест по модели IRT, чтобы определить свой базовый стандартизированный уровень.')
    content = content.replace('<span>Take 20-Min Assessment</span>', '<span>Пройти 20-минутный тест</span>')
    content = content.replace('No assessment session records found.', 'Записи сессий тестирования не найдены.')
    content = content.replace('Formal Assessment', 'Формальное тестирование')
    content = content.replace('${asm.percentile.toFixed(1)}th %ile', '${asm.percentile.toFixed(1)}-й процентиль')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched profile.astro successfully")


if __name__ == '__main__':
    patch_tools()
    patch_about()
    patch_blog()
    patch_contact()
    patch_profile()
    print("All 5 Batch 5 files successfully patched!")
