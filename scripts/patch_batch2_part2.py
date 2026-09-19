# -*- coding: utf-8 -*-
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# -------------------------------------------------------------
# 19. matrix-reasoning-test.astro
# -------------------------------------------------------------
p_mat = 'src/pages/ru/matrix-reasoning-test.astro'
with open(p_mat, 'r', encoding='utf-8') as f:
    mat = f.read()

mat = re.sub(
    r'const title = ".*?";',
    'const title = "Матрицы Равена и матричный тест IQ: правила решения и примеры | FreeIQExam";',
    mat,
    count=1
)
mat = re.sub(
    r'const description = ".*?";',
    'const description = "Разбор прогрессивных матриц Равена: правила логики, XOR, ротация и распределение признаков. Бесплатные примеры невербального теста интеллекта.";',
    mat,
    count=1
)

# Remove FAQPage from schema
mat = re.sub(
    r',\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?\}\s*\];',
    '\n];',
    mat
)

# Update breadcrumb / url slashes
mat = mat.replace('https://freeiqexam.com/ru/matrix-reasoning-test/', 'https://freeiqexam.com/ru/matrix-reasoning-test')

with open(p_mat, 'w', encoding='utf-8') as f:
    f.write(mat)
print("Updated matrix-reasoning-test.astro")

# -------------------------------------------------------------
# 20. fluid-reasoning-test.astro
# -------------------------------------------------------------
p_fl = 'src/pages/ru/fluid-reasoning-test.astro'
with open(p_fl, 'r', encoding='utf-8') as f:
    fl = f.read()

fl = re.sub(
    r'const title = ".*?";',
    'const title = "Тест на логическое мышление онлайн: подвижный интеллект (Gf) | FreeIQExam";',
    fl,
    count=1
)
fl = re.sub(
    r'const description = ".*?";',
    'const description = "Пройдите тест на логическое мышление и подвижный интеллект (Gf): 16 невербальных заданий на индукцию правил. Оценка фактора g по психометрической шкале.";',
    fl,
    count=1
)
fl = fl.replace('"@type": "Quiz",', '"@type": "WebApplication",\n    "applicationCategory": "EducationalApplication",\n    "operatingSystem": "All",\n    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },')
fl = fl.replace('https://freeiqexam.com/ru/fluid-reasoning-test/', 'https://freeiqexam.com/ru/fluid-reasoning-test')

# Add FAQ accordion before "Другие специализированные когнитивные батареи"
faq_html_fluid = """      <!-- User-Facing FAQ Accordion -->
      <div class="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Частые вопросы о подвижном интеллекте (Gf)
        </h3>
        <div class="space-y-3 pt-2">
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>В чём разница между подвижным (Gf) и кристаллизованным (Gc) интеллектом?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Подвижный интеллект (Gf) — это способность рассуждать логически и решать принципиально новые задачи без опоры на прошлые знания. Кристаллизованный интеллект (Gc) опирается на накопленный словарный запас, образование и культурный опыт.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Почему задания на подвижный интеллект считаются свободными от языка?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              В тестах Gf используются абстрактные геометрические матрицы, символы и формы. Участникам не требуется владение специальной терминологией или знанием конкретного языка, что обеспечивает кросс-культурную справедливость оценки.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Можно ли развить подвижный интеллект регулярными тренировками?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Хотя биологический фактор Gf имеет сильную генетическую основу, целенаправленная практика развивает метакогнитивные стратегии: умение декомпозировать признаки (размер, поворот, XOR), исключать дистракторы и эффективнее распределять объем рабочей памяти.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Какова связь подвижного интеллекта со шкалой IQ?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              В факторном анализе Спирмена и современной модели Кателла-Хорна-Кэрролла (CHC) подвижный интеллект имеет наибольшую нагрузку на общий фактор интеллекта (g ≈ 0.8–0.9), что делает его ключевым предиктором общего уровня IQ.
            </p>
          </details>
        </div>
      </div>\n\n"""

target_marker = '      <!-- Links to other batteries -->'
if target_marker in fl and 'Частые вопросы о подвижном интеллекте' not in fl:
    fl = fl.replace(target_marker, faq_html_fluid + target_marker)

with open(p_fl, 'w', encoding='utf-8') as f:
    f.write(fl)
print("Updated fluid-reasoning-test.astro")

# -------------------------------------------------------------
# 21. spatial-reasoning-test.astro
# -------------------------------------------------------------
p_sp = 'src/pages/ru/spatial-reasoning-test.astro'
with open(p_sp, 'r', encoding='utf-8') as f:
    sp = f.read()

sp = re.sub(
    r'const title = ".*?";',
    'const title = "Тест на пространственное мышление онлайн: ментальное вращение 3D (Gv) | FreeIQExam";',
    sp,
    count=1
)
sp = re.sub(
    r'const description = ".*?";',
    'const description = "Пройдите тест на пространственное мышление (Gv): 16 заданий на ментальное вращение 3D-фигур, развёртки куба и проекции. Бесплатный результат с процентилем.";',
    sp,
    count=1
)
sp = sp.replace('"@type": "Quiz",', '"@type": "WebApplication",\n    "applicationCategory": "EducationalApplication",\n    "operatingSystem": "All",\n    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },')
sp = sp.replace('https://freeiqexam.com/ru/spatial-reasoning-test/', 'https://freeiqexam.com/ru/spatial-reasoning-test')

faq_html_spatial = """      <!-- User-Facing FAQ Accordion -->
      <div class="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Частые вопросы о пространственном мышлении (Gv)
        </h3>
        <div class="space-y-3 pt-2">
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Что такое ментальное вращение (mental rotation)?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Ментальное вращение — это когнитивный процесс мысленного поворота двухмерных или трехмерных объектов в пространстве. В классических исследованиях Шепарда и Мецлер было доказано, что время реакции прямо пропорционально углу поворота фигуры.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Для каких профессий критически важно пространственное мышление?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Фактор Gv критически необходим инженерам, архитекторам, 3D-дизайнерам, хирургам, пилотам и физикам, где требуется мысленно прогнозировать взаимодействие сложных трехмерных структур.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Как отличить поворот фигуры от её зеркального отражения?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Используйте метод «якорной вершины»: зафиксируйте положение трех смежных граней или меток вокруг одной точки. При простом повороте их взаимное расположение (по часовой или против часовой стрелки) сохраняется, а при зеркальном отражении меняется на противоположное.
            </p>
          </details>
        </div>
      </div>\n\n"""

if target_marker in sp and 'Частые вопросы о пространственном мышлении' not in sp:
    sp = sp.replace(target_marker, faq_html_spatial + target_marker)

with open(p_sp, 'w', encoding='utf-8') as f:
    f.write(sp)
print("Updated spatial-reasoning-test.astro")

# -------------------------------------------------------------
# 22. quantitative-reasoning-test.astro
# -------------------------------------------------------------
p_qn = 'src/pages/ru/quantitative-reasoning-test.astro'
with open(p_qn, 'r', encoding='utf-8') as f:
    qn = f.read()

qn = re.sub(
    r'const title = ".*?";',
    'const title = "Математический тест на логику и числовой интеллект (Gq) | FreeIQExam";',
    qn,
    count=1
)
qn = re.sub(
    r'const description = ".*?";',
    'const description = "Пройдите математический тест на количественное мышление (Gq): 16 числовых заданий на ряды и арифметическую логику. Бесплатная психометрическая оценка.";',
    qn,
    count=1
)
qn = qn.replace('"@type": "Quiz",', '"@type": "WebApplication",\n    "applicationCategory": "EducationalApplication",\n    "operatingSystem": "All",\n    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },')
qn = qn.replace('https://freeiqexam.com/ru/quantitative-reasoning-test/', 'https://freeiqexam.com/ru/quantitative-reasoning-test')

faq_html_quant = """      <!-- User-Facing FAQ Accordion -->
      <div class="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Частые вопросы о количественном мышлении (Gq)
        </h3>
        <div class="space-y-3 pt-2">
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Чем тест количественного мышления отличается от экзамена по математике?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Экзамен по математике проверяет знание формул, тригонометрии и интегралов. Тест фактора Gq проверяет дедуктивную способность замечать алгоритмические закономерности между числами (арифметические прогрессии, разности второго порядка, геометрические ряды), требуя только базовых операций счета.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Что делать, если числовой ряд кажется абсолютно хаотичным?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Вычислите разности между соседними числами. Если разности не образуют постоянный шаг, вычислите разности разностей (второй порядок). Также проверьте чередующиеся ряды (когда нечетные и четные позиции подчиняются двум независимым правилам).
            </p>
          </details>
        </div>
      </div>\n\n"""

if target_marker in qn and 'Частые вопросы о количественном мышлении' not in qn:
    qn = qn.replace(target_marker, faq_html_quant + target_marker)

with open(p_qn, 'w', encoding='utf-8') as f:
    f.write(qn)
print("Updated quantitative-reasoning-test.astro")

# -------------------------------------------------------------
# 23. verbal-reasoning-test.astro
# -------------------------------------------------------------
p_vr = 'src/pages/ru/verbal-reasoning-test.astro'
with open(p_vr, 'r', encoding='utf-8') as f:
    vr = f.read()

vr = re.sub(
    r'const title = ".*?";',
    'const title = "Вербальный тест на логику и понимание: аналогии и силлогизмы (Gc) | FreeIQExam";',
    vr,
    count=1
)
vr = re.sub(
    r'const description = ".*?";',
    'const description = "Пройдите вербальный тест интеллекта (Gc): 16 заданий на логические аналогии, силлогизмы и семантические связи. Оценка кристаллизованного интеллекта.";',
    vr,
    count=1
)
vr = vr.replace('"@type": "Quiz",', '"@type": "WebApplication",\n    "applicationCategory": "EducationalApplication",\n    "operatingSystem": "All",\n    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },')
vr = vr.replace('https://freeiqexam.com/ru/verbal-reasoning-test/', 'https://freeiqexam.com/ru/verbal-reasoning-test')

faq_html_verbal = """      <!-- User-Facing FAQ Accordion -->
      <div class="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <h3 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Частые вопросы о вербальном понимании (Gc)
        </h3>
        <div class="space-y-3 pt-2">
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Что проверяет вербальный тест интеллекта?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Вербальный тест оценивает кристаллизованный интеллект (Gc): глубину понимания семантических отношений, способность устанавливать точные аналогии (род-вид, причина-следствие, часть-целое) и делать строгие силлогистические выводы.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Как решать формальные дедуктивные силлогизмы?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Опирайтесь исключительно на истинность посылок, абстрагируясь от бытовых представлений. Если в условии сказано, что «все кошки летают», а «Барсик — кошка», строго логичный дедуктивный вывод — «Барсик летает».
            </p>
          </details>
        </div>
      </div>\n\n"""

if target_marker in vr and 'Частые вопросы о вербальном понимании' not in vr:
    vr = vr.replace(target_marker, faq_html_verbal + target_marker)

with open(p_vr, 'w', encoding='utf-8') as f:
    f.write(vr)
print("Updated verbal-reasoning-test.astro")

# -------------------------------------------------------------
# 24. quick-test.astro
# -------------------------------------------------------------
p_qk = 'src/pages/ru/quick-test.astro'
with open(p_qk, 'r', encoding='utf-8') as f:
    qk = f.read()

qk = re.sub(
    r'const title = ".*?";',
    'const title = "Быстрый тест на IQ: экспресс-тест на 10 минут бесплатно | FreeIQExam";',
    qk,
    count=1
)
qk = re.sub(
    r'const description = ".*?";',
    'const description = "Пройдите быстрый тест на IQ онлайн: 12 вопросов за 10 минут, точный расчет балла по 2PL IRT и процентиль бесплатно без регистрации.";',
    qk,
    count=1
)

# Remove FAQPage from schema in quick-test
qk = re.sub(
    r',\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?\}\s*\];',
    '\n];',
    qk
)

with open(p_qk, 'w', encoding='utf-8') as f:
    f.write(qk)
print("Updated quick-test.astro")

# -------------------------------------------------------------
# 25. mensa-iq-test-practice.astro
# -------------------------------------------------------------
p_mn = 'src/pages/ru/mensa-iq-test-practice.astro'
with open(p_mn, 'r', encoding='utf-8') as f:
    mn = f.read()

mn = re.sub(
    r'const title = ".*?";',
    'const title = "Тест Менса (Mensa) онлайн: тренировочный тест IQ и подготовка | FreeIQExam";',
    mn,
    count=1
)
mn = re.sub(
    r'const description = ".*?";',
    'const description = "Подготовка к тесту Менса (Mensa): тренировочные задания на IQ для топ-2% населения (IQ 130+), матричная логика, тайм-менеджмент и разбор стратегий.";',
    mn,
    count=1
)

# Remove FAQPage from schema
mn = re.sub(
    r',\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?\}\s*\];',
    '\n];',
    mn
)

with open(p_mn, 'w', encoding='utf-8') as f:
    f.write(mn)
print("Updated mensa-iq-test-practice.astro")
