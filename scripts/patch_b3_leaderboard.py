# -*- coding: utf-8 -*-
with open('src/pages/ru/leaderboard.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Update frontmatter
fm_start = 'const title = '
fm_end = '\n---\n\n<Layout'
idx1 = content.find(fm_start)
idx2 = content.find(fm_end)

new_fm = '''const title = "Рейтинг IQ и таблица рекордов: глобальные результаты когорт | FreeIQExam";
const description = "Глобальный рейтинг IQ и таблица рекордов: когортные бенчмарки по стандартизированной шкале SD 15, процентили и античит-валидация результатов онлайн.";

const topScorers = [
  { rank: 1, code: "US", country: "США", name: "Alex_V.", score: 146, percentile: "99.9-й", domain: "Подвижный интеллект (FRI: 148)", hash: "v8f9-2a1c" },
  { rank: 2, code: "JP", country: "Япония", name: "Hana_K.", score: 142, percentile: "99.7-й", domain: "Визуально-пространственное (VSI: 145)", hash: "k4m2-9d3e" },
  { rank: 3, code: "DE", country: "Германия", name: "Marcus_S.", score: 138, percentile: "99.4-й", domain: "Количественное мышление (QRI: 141)", hash: "s7x1-0p8b" },
  { rank: 4, code: "CA", country: "Канада", name: "Elena_R.", score: 135, percentile: "99.0-й", domain: "Вербальная логика (VCI: 137)", hash: "r3c8-5w2y" },
  { rank: 5, code: "GB", country: "Великобритания", name: "David_L.", score: 132, percentile: "98.3-й", domain: "Подвижный интеллект (FRI: 134)", hash: "l9b6-4h7q" },
  { rank: 6, code: "AU", country: "Австралия", name: "Sarah_M.", score: 131, percentile: "98.1-й", domain: "Количественное мышление (QRI: 133)", hash: "m2t5-8n1z" },
  { rank: 7, code: "KR", country: "Южная Корея", name: "Kenji_T.", score: 130, percentile: "97.7-й", domain: "Визуально-пространственное (VSI: 132)", hash: "t6v4-1k9x" },
  { rank: 8, code: "IN", country: "Индия", name: "Priya_N.", score: 129, percentile: "97.3-й", domain: "Подвижный интеллект (FRI: 131)", hash: "n5p7-3m8f" },
  { rank: 9, code: "FR", country: "Франция", name: "Lukas_B.", score: 128, percentile: "96.9-й", domain: "Вербальная логика (VCI: 130)", hash: "b8q3-7r4d" },
  { rank: 10, code: "NL", country: "Нидерланды", name: "Chloe_D.", score: 127, percentile: "96.4-й", domain: "Визуально-пространственное (VSI: 129)", hash: "d1w9-6v5s" }
];

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Рейтинг IQ и глобальная таблица рекордов | FreeIQExam",
    "description": description,
    "url": "https://freeiqexam.com/ru/leaderboard"
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
        "name": "Рейтинг IQ",
        "item": "https://freeiqexam.com/ru/leaderboard"
      }
    ]
  }
];'''

content = content[:idx1] + new_fm + content[idx2:]

# Update H1
h1_old = '''      <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight mb-4">
        Иллюстративные мировые результаты
      </h1>'''

h1_new = '''      <h1 class="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight mb-4">
        Рейтинг IQ и глобальная таблица рекордов
      </h1>'''

content = content.replace(h1_old, h1_new)

# Update FAQ section from static <p> to <details><summary>
faq_old_marker = '    <!-- FAQ Section -->'
faq_idx = content.find(faq_old_marker)
main_end = content.find('  </main>')

faq_new = '''    <!-- FAQ Section -->
    <section class="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Часто задаваемые вопросы о рейтинге IQ и когортных рекордах
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Методология бенчмарков, стандартизация по модели 2PL IRT и валидация результатов.
        </p>
      </div>

      <div class="space-y-3">
        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Как рассчитываются баллы в таблице рекордов?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Показатели референтных когорт калибруются с помощью двухпараметрической теории моделирования заданий (2PL IRT) на основе параметров стандартного нормального распределения (среднее 100, стандартное отклонение SD 15). Они отражают латентную способность (тета) и веса правильных ответов по четырём субдоменам CHC.
          </p>
        </details>

        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Являются ли результаты теста официальным клиническим диагнозом?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Нет. Наша онлайн-оценка — образовательный инструмент для самопознания и тренировки когнитивных способностей. Она не является клиническим диагнозом и не заменяет очное психологическое обследование под руководством сертифицированного специалиста (например, батареи WAIS-IV или Stanford-Binet V).
          </p>
        </details>

        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Как работает защита от читерства и скриптов?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Платформа отслеживает латентность ответов на каждый вопрос, паттерны кликов и целостность токенов сессии. Попытки автоматического перебора, сверхбыстрых неправдоподобных кликов (&lt;500 мс на сложные матрицы) или модификации клиентского хранилища дисквалифицируются при валидации скоринга.
          </p>
        </details>

        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Когда появится возможность опубликовать свой результат в живом рейтинге?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Функционал отправки верифицированных результатов и сезонных таблиц лидеров сообщества находится в активной разработке. Сейчас вы можете сохранить свой результат локально в <a href="/ru/profile" class="text-blue-600 dark:text-blue-400 hover:underline">личном профиле</a> или сгенерировать официальный сертификат.
          </p>
        </details>
      </div>
    </section>
'''

content = content[:faq_idx] + faq_new + content[main_end:]

with open('src/pages/ru/leaderboard.astro', 'w', encoding='utf-8') as f:
    f.write(content)
print("SUCCESS leaderboard.astro")
