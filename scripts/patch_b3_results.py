# -*- coding: utf-8 -*-
with open('src/pages/ru/results.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace frontmatter
fm_start = 'const title = '
fm_end = '\n---\n\n<Layout'
idx1 = content.find(fm_start)
idx2 = content.find(fm_end)

new_fm = '''const title = "Результаты теста на IQ: расшифровка баллов, процентиль и профиль | FreeIQExam";
const description = "Результаты теста на IQ онлайн: подробная расшифровка баллов по шкале SD 15, процентильный ранг, доверительный интервал 95% и сертификат бесплатно.";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Результаты теста на IQ — Индивидуальный психометрический отчёт",
    "description": description,
    "url": "https://freeiqexam.com/ru/results"
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
        "name": "Результаты теста на IQ",
        "item": "https://freeiqexam.com/ru/results"
      }
    ]
  }
];'''

content = content[:idx1] + new_fm + content[idx2:]

# Now insert FAQ section right before <!-- Educational Disclaimer -->
disclaimer_marker = '    <!-- Educational Disclaimer -->'
idx_disc = content.find(disclaimer_marker)

faq_section = '''    <!-- Frequently Asked Questions -->
    <section class="print:hidden space-y-6">
      <div>
        <h2 class="font-heading text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">
          Часто задаваемые вопросы о результатах теста IQ
        </h2>
        <p class="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Разъяснения по интерпретации психометрических баллов, процентилей и интервалов достоверности.
        </p>
      </div>

      <div class="space-y-3">
        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Какой результат теста на IQ считается средним и нормальным?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            На стандартной шкале со средним значением 100 и стандартным отклонением SD 15 диапазон от 90 до 109 баллов представляет статистическую норму, охватывающую 50% популяции. Диапазон 110–119 считается высокой нормой, 120–129 — уровнем выше среднего, а 130 и выше (98-й процентиль) — порогом одарённости и критерием вступления в общество Mensa.
          </p>
        </details>

        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>В чём разница между баллом IQ и процентильным рангом?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Балл IQ — это стандартизированная оценка с фиксированным средним 100 и шагом шкалы SD 15. Процентиль показывает процент участников в референтной популяции, чей результат оказался равен или ниже вашего. Например, IQ 115 соответствует примерно 84-му процентилю (вы опередили 84% людей), а IQ 130 — 98-му процентилю.
          </p>
        </details>

        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Что показывает 95% доверительный интервал (ДИ)?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Ни одно психологическое тестирование не свободно от погрешности измерения. 95% доверительный интервал (например, 118–128) отражает диапазон, в котором с 95% вероятностью находится ваша истинная латентная способность (тета), с учётом стандартной ошибки измерения (SEM) модели 2PL IRT.
          </p>
        </details>

        <details class="group p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
          <summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white list-none">
            <span>Можно ли улучшить свой результат при повторном прохождении?</span>
            <svg class="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform duration-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            Да. Тренировка стратегий решения прогрессивных матриц в нашем <a href="/ru/practice" class="text-blue-600 dark:text-blue-400 hover:underline">практическом центре</a> помогает освоить типовые правила трансформаций (повороты, наложения XOR, инкременты) и устранить процедурные ошибки, что часто повышает измеряемый результат на 5–10 баллов.
          </p>
        </details>
      </div>
    </section>

'''

content = content[:idx_disc] + faq_section + content[idx_disc:]

with open('src/pages/ru/results.astro', 'w', encoding='utf-8') as f:
    f.write(content)
print("SUCCESS results.astro")
