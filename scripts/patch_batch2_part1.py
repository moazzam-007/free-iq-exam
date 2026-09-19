# -*- coding: utf-8 -*-
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

# -------------------------------------------------------------
# 1. adhd-test.astro
# -------------------------------------------------------------
p_adhd = 'src/pages/ru/adhd-test.astro'
with open(p_adhd, 'r', encoding='utf-8') as f:
    adhd_content = f.read()

adhd_content = re.sub(
    r"const title = '.*?';",
    "const title = 'Тест на СДВГ у взрослых онлайн: бесплатный опросник ASRS v1.1 | FreeIQExam';",
    adhd_content,
    count=1
)
adhd_content = re.sub(
    r"const description = '.*?';",
    "const description = 'Пройдите бесплатный скрининг СДВГ у взрослых по методике WHO ASRS v1.1. Оценка симптомов невнимательности и гиперактивности, тест Go/No-Go. Без регистрации.';",
    adhd_content,
    count=1
)
# aspect: 'Diagnostic' -> 'Screening'
adhd_content = adhd_content.replace("aspect: 'Diagnostic',", "aspect: 'Screening',")

# Remove FAQPage from schemas in adhd-test.astro
# Find the FAQPage block in schemas
adhd_content = re.sub(
    r"\s*\{\s*'@context': 'https://schema\.org',\s*'@type': 'FAQPage',[\s\S]*?mainEntity: faqItems\.map\([\s\S]*?\),\s*\},",
    "",
    adhd_content
)

with open(p_adhd, 'w', encoding='utf-8') as f:
    f.write(adhd_content)
print("Updated adhd-test.astro")

# -------------------------------------------------------------
# 2. anxiety-test.astro
# -------------------------------------------------------------
p_anx = 'src/pages/ru/anxiety-test.astro'
with open(p_anx, 'r', encoding='utf-8') as f:
    anx_content = f.read()

anx_content = re.sub(
    r"const title = '.*?';",
    "const title = 'Тест на тревожность онлайн: бесплатный скрининг GAD-7 и уровень тревоги | FreeIQExam';",
    anx_content,
    count=1
)
anx_content = re.sub(
    r"const description = '.*?';",
    "const description = 'Пройдите клинический скрининг тревожности GAD-7 онлайн. Оценка симптомов генерализованной тревоги (ГТР), соматического напряжения и уровня стресса бесплатно.';",
    anx_content,
    count=1
)
anx_content = anx_content.replace("aspect: 'Diagnostic',", "aspect: 'Screening',")

# Remove FAQPage from schemas in anxiety-test.astro
anx_content = re.sub(
    r"\s*\{\s*'@context': 'https://schema\.org',\s*'@type': 'FAQPage',[\s\S]*?mainEntity: faqItems\.map\([\s\S]*?\)\s*\},?",
    "",
    anx_content
)

with open(p_anx, 'w', encoding='utf-8') as f:
    f.write(anx_content)
print("Updated anxiety-test.astro")

# -------------------------------------------------------------
# 3. autism-test.astro
# -------------------------------------------------------------
p_aut = 'src/pages/ru/autism-test.astro'
with open(p_aut, 'r', encoding='utf-8') as f:
    aut_content = f.read()

aut_content = re.sub(
    r"const title = '.*?';",
    "const title = 'Тест на аутизм у взрослых онлайн: бесплатный опросник AQ-10 | FreeIQExam';",
    aut_content,
    count=1
)
aut_content = re.sub(
    r"const description = '.*?';",
    "const description = 'Пройдите бесплатный тест на аутизм у взрослых (AQ-10). Разбор черт аутистического спектра: социальная коммуникация, сенсорные особенности и переключение внимания.';",
    aut_content,
    count=1
)
# idPath fix
aut_content = aut_content.replace('idPath="/tes-autisme"', 'idPath="/id/tes-autisme"')
# Breadcrumb item 2 fix
aut_content = aut_content.replace(
    "{ '@type': 'ListItem', position: 2, name: 'Когнитивные игры', item: 'https://freeiqexam.com/ru/games' }",
    "{ '@type': 'ListItem', position: 2, name: 'Тесты', item: 'https://freeiqexam.com/ru/test' }"
)
aut_content = aut_content.replace(
    '<a href="/ru/games" class="hover:text-[#0066cc] dark:hover:text-[#2997ff]">Когнитивные игры</a>',
    '<a href="/ru/test" class="hover:text-[#0066cc] dark:hover:text-[#2997ff]">Тесты</a>'
)

# Remove FAQPage from schemas
aut_content = re.sub(
    r"\s*\{\s*'@context': 'https://schema\.org',\s*'@type': 'FAQPage',[\s\S]*?mainEntity: faqItems\.map\([\s\S]*?\)\s*\},?",
    "",
    aut_content
)

with open(p_aut, 'w', encoding='utf-8') as f:
    f.write(aut_content)
print("Updated autism-test.astro")

# -------------------------------------------------------------
# 4. eye-test.astro
# -------------------------------------------------------------
p_eye = 'src/pages/ru/eye-test.astro'
with open(p_eye, 'r', encoding='utf-8') as f:
    eye_content = f.read()

eye_content = re.sub(
    r"const title = '.*?';",
    "const title = 'Проверка зрения онлайн: тест на астигматизм и таблица Сивцева / Снеллена | FreeIQExam';",
    eye_content,
    count=1
)
eye_content = re.sub(
    r"const description = '.*?';",
    "const description = 'Проверьте остроту зрения онлайн бесплатно: таблица Сивцева/Снеллена, оптотипы Ш / E, лучистая фигура для теста на астигматизм и дуохромный тест с калибровкой.';",
    eye_content,
    count=1
)

# Update schemas in eye-test
eye_content = eye_content.replace(
    "name: 'Online Visual Acuity, Astigmatism and Duochrome Screener',",
    "name: 'Онлайн-проверка зрения: таблица Сивцева / Снеллена, тест на астигматизм и дуохромный баланс',",
)
eye_content = eye_content.replace("aspect: 'Diagnostic',", "aspect: 'Screening',\n    inLanguage: 'ru',")
eye_content = eye_content.replace(
    "name: 'Free Online Eye Test - Snellen, Astigmatism Dial and Duochrome',",
    "name: 'Бесплатная онлайн-проверка зрения: тест на астигматизм и оптотипы',",
)
eye_content = eye_content.replace(
    "accessibilitySummary: 'Keyboard-operable direction responses, on-screen directional controls, full-card calibration slider, visible focus states, live announcements, and a printable screening summary.'",
    "accessibilitySummary: 'Управление ответами с клавиатуры (стрелки), экранные кнопки, калибровка по банковской карте, семантические заголовки и версия для печати.'"
)
eye_content = eye_content.replace(
    """      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://freeiqexam.com/' },
      { '@type': 'ListItem', position: 2, name: 'Assessments', item: 'https://freeiqexam.com/test' },
      { '@type': 'ListItem', position: 3, name: 'Eye Test', item: canonicalUrl }""",
    """      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://freeiqexam.com/ru/' },
      { '@type': 'ListItem', position: 2, name: 'Инструменты', item: 'https://freeiqexam.com/ru/tools' },
      { '@type': 'ListItem', position: 3, name: 'Проверка зрения', item: canonicalUrl }"""
)

# Remove FAQPage from schemas in eye-test
eye_content = re.sub(
    r"\s*\{\s*'@context': 'https://schema\.org',\s*'@type': 'FAQPage',[\s\S]*?mainEntity: faqItems\.map\([\s\S]*?\)\s*\},?",
    "",
    eye_content
)

# Translate the article text in eye-test.astro to Russian
old_guide = """      <article class="mx-auto mt-16 max-w-4xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
        <section>
          <p class="eyebrow">Optometric guide</p>
          <h2 class="mt-3 section-title">How vision testing actually works</h2>
          <p class="mt-6">Vision feels like a single sense, but what an eye chart measures is only one narrow slice of it: the ability to resolve fine detail at high contrast, at a specific distance, under specific lighting. Understanding what the measurement does and does not capture is the difference between a useful screening result and a misleading number.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">1. Анатомия и оптическая система глаза</h2>
          <p class="mt-5">Light entering the eye is refracted twice before it reaches the retina. The <strong>cornea</strong> does most of the work - roughly two thirds of the eye's total refractive power, about 43 dioptres - because the air-to-tissue boundary produces the largest change in refractive index along the path. The <strong>crystalline lens</strong> contributes the remaining third, around 19 dioptres at rest, and its soft, layered structure allows its curvature to change.</p>
          <p class="mt-5">That change is <strong>accommodation</strong>. The ciliary muscle contracts, relaxing the zonular fibres that hold the lens under tension, and the lens becomes rounder and optically more powerful. This lets a healthy young eye shift focus from infinity to roughly 10 centimetres. The amplitude of accommodation declines steadily with age as the lens nucleus stiffens and the cortex loses elasticity - from about 14 dioptres in childhood to under 2 dioptres by the mid-fifties. That decline is presbyopia, and it is a normal mechanical consequence of ageing rather than a disease.</p>
          <p class="mt-5">For a sharp image, the optical power of cornea and lens together must place the focal point precisely on the retinal photoreceptor layer. The <strong>refractive index</strong> of the media matters here: the cornea sits near 1.376, the aqueous and vitreous humours near 1.336, and the lens varies from about 1.386 in the cortex to 1.406 in the nucleus. That gradient is deliberate - it lets the lens bend light progressively rather than abruptly, reducing spherical aberration. When the eye's axial length and its optical power fall out of step, the focal point lands in front of or behind the retina, and the result is a refractive error.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">2. Как измеряется острота зрения</h2>
          <p class="mt-5">Visual acuity is not measured in millimetres. It is measured in <strong>visual angle</strong> - how much of your field of view a target occupies. The standard, set by Snellen in 1862 and still in use, is that a normal eye can just resolve an optotype that subtends <strong>5 minutes of arc</strong> at the viewing distance. Each stroke of that optotype, and each gap between strokes, subtends 1 minute of arc. That 1-arcminute stroke is the actual limit being probed.</p>
          <p class="mt-5">This is why the Snellen fraction is written 20/20 rather than as a size. The numerator is the test distance in feet; the denominator is the distance at which a person with standard acuity could read the same letter. A 20/40 letter at 20 feet subtends the same angle as a 20/20 letter at 40 feet. At 6 metres, the 20/20 optotype is 8.73 mm tall - a convenient physical size, and the reason 6 metres (20 feet) became the standard testing distance. At 1 metre the same optotype would need to be just 1.45 mm, which is precisely why screen-based testing at short distances runs into hard physical limits.</p>
          <p class="mt-5">Acuity better than 20/20 is common, especially in young people. Roughly a third of healthy young adults reach <strong>20/15</strong>, and a few reach 20/10. This reflects the cone spacing in the fovea, where photoreceptors are packed at their tightest and each cone has a near-private line to the visual cortex. Beyond about 20/10 the optics of the eye itself - not the retina - become the limiting factor, because corneal and lenticular aberrations blur the image before it reaches the photoreceptors.</p>
          <p class="mt-5">The <strong>Tumbling E</strong> used in this test is a Snellen E rotated to point in one of four directions. Because the viewer reports a direction rather than naming a letter, the measurement is unaffected by literacy, language, or familiarity with the Latin alphabet. It is the standard optotype for young children and for anyone who cannot read the chart's script - and it makes a fair comparison possible across every language this site serves.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">3. Виды аномалий рефракции</h2>
          <p class="mt-5"><strong>Myopia</strong> (short-sightedness) occurs when the eye's optical power is too strong for its axial length, so the focal point falls in front of the retina. Distant objects blur; near objects stay clear because they require less optical power to focus. It affects roughly 30% of the world's population and is rising fast in urban East Asia, where prevalence among young adults now exceeds 80% in some cities. Time spent outdoors in childhood appears protective, while prolonged near work is associated with progression. Myopia is corrected with minus (concave) lenses, which diverge light before the cornea so the focal point moves back onto the retina.</p>
          <p class="mt-5"><strong>Hyperopia</strong> (long-sightedness) is the reverse: the focal point falls behind the retina. Young hyperopes often compensate by accommodating, which is why hyperopia can stay hidden for decades and then surface in the late thirties as eye strain, headaches, and reading difficulty when accommodative reserve finally runs down. It is corrected with plus (convex) lenses.</p>
          <p class="mt-5"><strong>Astigmatism</strong> is a difference in optical power between two perpendicular meridians. A perfectly spherical cornea curves equally in every direction; an astigmatic one is shaped more like a rugby ball, so light in one meridian focuses at a different point from light in the meridian at right angles to it. The result is that no single spherical lens can sharpen the image - lines in one orientation stay blurred while perpendicular ones look crisp. Astigmatism is corrected with a cylindrical component, which adds power in one meridian only, and the <strong>axis</strong> specifies which meridian that is. The clock dial in this test probes exactly that asymmetry.</p>
          <p class="mt-5"><strong>Presbyopia</strong> is not a refractive error in the same sense - the eye's optics are unchanged, but the lens can no longer change shape enough to focus on near objects. It becomes noticeable in the early to mid-forties and progresses until about sixty. It is corrected with reading additions, bifocals, progressives, or multifocal contact lenses.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">4. Физические принципы мишени и дуохромного теста</h2>
          <p class="mt-5"><strong>The astigmatism dial.</strong> A clock dial presents radiating lines in twelve meridians. If the eye has no cylindrical error, every meridian focuses at the same point and all twelve lines look equally sharp. If it does have cylindrical error, the meridian in which the eye is focused closest to the retina produces a sharply defined line on the retina, while the perpendicular meridian - where focus is furthest from the retina - produces a blurred one. The observer reports which lines stand out. The estimated axis is the meridian those lines occupy, measured in degrees from horizontal between 0 and 180. Note that the two perpendicular directions of a single line are optically the same meridian, which is why the axis is conventionally reported modulo 180 rather than as a full 360-degree bearing.</p>
          <p class="mt-5"><strong>The duochrome test</strong> exploits <em>longitudinal chromatic aberration</em>. The refractive index of any medium varies with wavelength, and the eye is no exception: shorter wavelengths are refracted more strongly than longer ones. In practice, green light at about 535 nm focuses roughly 0.50 dioptres in front of where red light at about 650 nm focuses. This is a real, measurable property of the human eye, not an artifact of the display.</p>
          <p class="mt-5">The clinical trick follows directly. If the eye is emmetropic, the red and green foci straddle the retina symmetrically and both panels look equally sharp. If the eye is myopic, the whole focal range shifts forward and the red focus - further back to begin with - lands closer to the retina, so <strong>red looks sharper</strong>. If the eye is hyperopic, the range shifts backward and the green focus lands closer to the retina, so <strong>green looks sharper</strong>. An optometrist uses this to fine-tune the spherical endpoint by about a quarter of a dioptre, which is finer than most people can reliably judge on an acuity chart alone.</p>
          <p class="mt-5">One caveat specific to this medium: a clinical duochrome testing uses calibrated optical filters with controlled transmission spectra. An RGB screen emits broad, overlapping peaks, and the exact dominant wavelength varies between panels and displays. The screen version preserves the direction of the effect but cannot reproduce its precision, which is why the result here is described as a shift rather than a measurement.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">5. Компьютерный зрительный синдром и правило 20-20-20</h2>
          <p class="mt-5">Sustained screen work produces a characteristic cluster of symptoms - burning, dryness, blurred distance vision after prolonged near focus, and frontal headache. The mechanism is not damage but fatigue. When you look at a screen, the ciliary muscle holds accommodation at a fixed near distance far longer than it evolved to, and the convergence system holds a matching posture. Both accumulate fatigue over hours.</p>
          <p class="mt-5">The most measurable change is in <strong>blink rate</strong>. Normal blinking occurs roughly 15 to 20 times a minute. During concentrated screen reading it falls by more than half, and the blinks that remain are often incomplete - the upper lid does not fully meet the lower, so the lower tear film is never refreshed. The tear film then breaks up between blinks, exposing the corneal epithelium and producing the burning and paradoxical reflex watering that people report as "dry but watery" eyes.</p>
          <p class="mt-5">The <strong>20-20-20 rule</strong> is the standard countermeasure: every 20 minutes, look at something about 20 feet (6 metres) away for at least 20 seconds. The distance matters because looking at infinity allows the ciliary muscle to relax completely, and the duration matters because the tear film needs several seconds of uninterrupted spreading to restabilise. The rule works best as a prompt to blink deliberately as well as to refocus.</p>
          <p class="mt-5">Supporting measures that have reasonable evidence behind them include positioning the screen 50 to 70 centimetres away and slightly below eye level, so the palpebral aperture is narrower and the exposed corneal surface smaller; matching screen brightness to the ambient room rather than leaving the display far brighter than its surroundings; using a humidifier in dry or air-conditioned rooms; and treating underlying dry eye with preservative-free lubricants if symptoms persist. If you wear glasses for near work, ensure the prescription is current - a stale prescription is a common and easily missed cause of persistent strain.</p>
          <p class="mt-5">Finally, note what this test cannot see. Acuity, refraction, and meridional blur are only part of visual function. Glaucoma can destroy a large fraction of peripheral vision before any central acuity change appears, and diabetic retinopathy and macular degeneration are invisible to an acuity chart in their early stages. That is the strongest argument for a regular dilated examination on the schedule your optometrist recommends, independent of how well you read the chart today.</p>
        </section>"""

new_guide = """      <article class="mx-auto mt-16 max-w-4xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-lg">
        <section>
          <p class="eyebrow">Офтальмологический гид</p>
          <h2 class="mt-3 section-title">Как устроена проверка зрения и измерение остроты глаз</h2>
          <p class="mt-6">Зрение кажется целостным процессом, но офтальмологическая таблица проверяет лишь один его компонент: способность различать мелкие детали высокой контрастности на фиксированном расстоянии при заданном освещении. Понимание того, что именно измеряет скрининг, отличает полезную первичную самопроверку от ошибочных выводов.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">1. Анатомия и оптическая система глаза</h2>
          <p class="mt-5">Световой луч преломляется дважды до попадания на сетчатку. Основную преломляющую силу обеспечивает <strong>роговица</strong> — примерно две трети общей оптической силы глаза (около 43 диоптрий), поскольку именно на границе воздуха и ткани происходит наибольший перепад коэффициента преломления. <strong>Хрусталик</strong> обеспечивает оставшуюся треть (около 19 диоптрий в покое), а его эластичная капсула позволяет динамически изменять кривизну.</p>
          <p class="mt-5">Этот процесс изменения кривизны называется <strong>аккомодацией</strong>. Цилиарная мышца сокращается, ослабляя натяжение цинновых связок, и хрусталик становится более выпуклым, увеличивая оптическую силу. Это позволяет здоровому глазу переключать фокус с бесконечности на расстояние около 10 см. С возрастом вещество хрусталика уплотняется, а капсула теряет эластичность — объем аккомодации снижается с 14 диоптрий в детстве до менее чем 2 диоптрий к 50–55 годам. Это состояние называется пресбиопией и является естественным возрастным изменением.</p>
          <p class="mt-5">Для получения четкого изображения суммарный фокус роговицы и хрусталика должен попадать строго на фоторецепторный слой сетчатки. <strong>Показатель преломления</strong> оптических сред сбалансирован: роговица имеет индекс около 1,376, водянистая влага и стекловидное тело — 1,336, а хрусталик — от 1,386 в коре до 1,406 в ядре. Этот градиент снижает сферические аберрации. Если переднезадняя ось глаза не соответствует оптической силе, фокус смещается вперед или назад, формируя аномалию рефракции.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">2. Как измеряется острота зрения: таблица Сивцева и оптотипы Снеллена</h2>
          <p class="mt-5">Острота зрения измеряется не в миллиметрах или сантиметрах, а в <strong>угловых минутах</strong> — какую долю поля зрения занимает объект. По международному стандарту, предложенному Германом Снелленом в 1862 году и адаптированному в отечественной офтальмологии Дмитрием Сивцевым, нормальный глаз (острота 1,0 или 20/20) способен различить оптотип, видимый под углом <strong>5 угловых минут</strong>. При этом толщина каждой линии оптотипа и просвет между ними равны ровно 1 угловой минуте.</p>
          <p class="mt-5">В отечественной практике острота зрения выражается десятичной дробью от 0,1 до 2,0 по <strong>таблице Сивцева</strong> (где 1,0 означает норму при дистанции 5 метров). В англоязычных странах используется дробь Снеллена (20/20 на дистанции 20 футов или 6 метров). На расстоянии 5 метров оптотип для остроты 1,0 имеет высоту около 7,3 мм, а на расстоянии 1 метра — всего 1,45 мм. Именно поэтому онлайн-проверка зрения на мониторе требует точной калибровки по банковской карте для вычисления DPI экрана.</p>
          <p class="mt-5">Острота выше 1,0 (например, 1,2 или 1,5) нередко встречается у молодых людей и обусловлена высокой плотностью колбочек в центральной ямке сетчатки (фовеа). В этом онлайн-тесте используется оптотип <strong>Ш-типа (Tumbling E)</strong> — аналог буквы «Ш» из таблицы Головина. Пользователь указывает лишь направление открытой стороны, что полностью исключает влияние грамотности, языка и запоминания буквенных рядов.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">3. Виды аномалий рефракции: близорукость, дальнозоркость и астигматизм</h2>
          <p class="mt-5"><strong>Миопия (близорукость)</strong> возникает, когда оптическая сила глаза чрезмерно велика относительно длины глазного яблока, либо глаз излишне удлинен. Фокус формируется перед сетчаткой, из-за чего удаленные предметы кажутся размытыми, а близкие видны четко. Корректируется рассеивающими (минусовыми) линзами.</p>
          <p class="mt-5"><strong>Гиперметропия (дальнозоркость)</strong> — обратная ситуация: фокус оптической системы проецируется позади сетчатки. Молодые люди способны долго компенсировать дальнозоркость постоянным напряжением аккомодации, что нередко приводит к зрительной утомляемости и головным болям. Корректируется собирающими (плюсовыми) линзами.</p>
          <p class="mt-5"><strong>Астигматизм</strong> обусловлен асферичной формой роговицы или хрусталика. Вместо правильной сферы преломляющая поверхность напоминает овал, из-за чего световые лучи в двух взаимно перпендикулярных меридианах преломляются с разной силой. Без коррекции изображение двоится, искажается по краям или размывается в одном направлении. Корректируется цилиндрическими линзами с точным указанием оси в градусах.</p>
          <p class="mt-5"><strong>Пресбиопия (возрастное зрение)</strong> связана с естественным отвердеванием вещества хрусталика после 40–45 лет. Это не дефект строения роговицы, а физиологическое снижение диапазона аккомодации, требующее очков для чтения или прогрессивных линз.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">4. Физические принципы мишени и дуохромного теста</h2>
          <p class="mt-5"><strong>Лучистая фигура (тест на астигматизм).</strong> Радиальная круговая мишень состоит из линий, расходящихся под разными углами. При нормальном сферическом зрении все лучи кажутся одинаково резкими и черными. При астигматизме меридиан с наилучшей фокусировкой выглядит максимально контрастным, тогда как перпендикулярный меридиан заметно размыт. Это позволяет быстро заподозрить неравномерную кривизну оптических сред глаза.</p>
          <p class="mt-5"><strong>Дуохромный тест</strong> основан на явлении <em>продольной хроматической аберрации</em> глаза. Коротковолновый зеленый свет (около 535 нм) преломляется средами глаза сильнее, чем длинноволновый красный свет (около 650 нм). Фокус зеленого излучения формируется примерно на 0,5 диоптрии впереди красного.</p>
          <p class="mt-5">Если рефракция сбалансирована (эмметропия), сетчатка оказывается точно посередине между красным и зеленым фокусами, и знаки на обоих фонах видны одинаково четко. Если более четкими кажутся символы на <strong>красном фоне</strong> — преобладает близорукая (миопическая) тенденция. Если резче знаки на <strong>зеленом фоне</strong> — преобладает дальнозоркая (гиперметропическая) направленность.</p>
        </section>

        <section class="guide-section">
          <h2 class="section-title">5. Компьютерный зрительный синдром и правило 20-20-20</h2>
          <p class="mt-5">Многочасовая работа за экранами компьютеров и смартфонов вызывает характерный комплекс зрительной усталости (астенопию): сухость, жжение, покраснение глаз, затуманивание зрения вдаль и боли в области надбровий. Причина кроется в непрерывном спазме цилиарной мышцы и резком снижении частоты моргания.</p>
          <p class="mt-5">В норме человек моргает 15–20 раз в минуту, равномерно обновляя защитную слезную пленку роговицы. При сосредоточенном чтении с монитора частота моргания падает в 2–3 раза, а многие моргания становятся неполными. Слезная пленка быстро испаряется, обнажая эпителий роговицы, что провоцирует сухость и компенсаторное рефлекторное слезотечение.</p>
          <p class="mt-5"><strong>Правило 20-20-20</strong> — международный стандарт зрительной гигиены: каждые 20 минут непрерывной работы переводите взгляд на предмет на расстоянии не менее 20 футов (около 6 метров) на протяжении как минимум 20 секунд. Взгляд вдаль позволяет цилиарной мышце полностью расслабиться, а несколько осознанных морганий восстанавливают слезную пленку.</p>
        </section>"""

if old_guide in eye_content:
    eye_content = eye_content.replace(old_guide, new_guide)
    print("Replaced eye-test guide text with Russian")
else:
    print("WARNING: Could not find exact old_guide in eye-test.astro")

# Also update the disclaimer heading in eye-test
eye_content = eye_content.replace("Vision screening disclaimer", "Медицинский дисклеймер по проверке зрения")
eye_content = eye_content.replace(
    "This digital vision assessment is designed for informational and preliminary self-screening purposes. It does not replace a comprehensive, dilated eye examination by a licensed optometrist or ophthalmologist, and it cannot produce a prescription. Screen calibration, viewing distance, lighting, and display characteristics all introduce measurement error.",
    "Данный цифровой тест зрения носит исключительно информационный характер и предназначен для ориентировочного самоконтроля. Он не заменяет комплексный осмотр врачом-офтальмологом с расширением зрачка (мидриазом) и не является основанием для выписки очков или контактных линз. Калибровка экрана, внешнее освещение и дистанция просмотра влияют на точность результатов."
)
eye_content = eye_content.replace(
    "Seek immediate care for sudden vision loss, flashes of light, a sudden increase in floaters, a curtain or shadow across your field of view, double vision, or eye pain. If you have diabetes, glaucoma, or a family history of eye disease, follow the examination schedule your clinician recommends regardless of any result shown here.",
    "Немедленно обратитесь за неотложной медицинской помощью при внезапном ухудшении зрения, вспышках света, резком появлении темных пятен или «завесы» перед глазами, двоении или выраженной боли в глазу. При сахарном диабете или глаукоме строго соблюдайте график очных осмотров офтальмолога."
)

with open(p_eye, 'w', encoding='utf-8') as f:
    f.write(eye_content)
print("Updated eye-test.astro")

# -------------------------------------------------------------
# 5. hearing-test.astro
# -------------------------------------------------------------
p_hear = 'src/pages/ru/hearing-test.astro'
with open(p_hear, 'r', encoding='utf-8') as f:
    hear_content = f.read()

hear_content = re.sub(
    r'const title = ".*?";',
    'const title = "Проверка слуха онлайн: тест слуха и аудиограмма частот | FreeIQExam";',
    hear_content,
    count=1
)
hear_content = re.sub(
    r'const description = ".*?";',
    'const description = "Проверьте слух онлайн бесплатно: тональная аудиометрия (125–8000 Гц), высокочастотный тест и калькулятор возраста ушей в браузере со стереонаушниками.";',
    hear_content,
    count=1
)

# Extract FAQ from schema[3] into const faqItems and remove FAQPage from schema
# Let's check how schema is defined in hearing-test.astro
# Lines 51-64 contain schema[3] FAQPage
hear_content = re.sub(
    r'\s*\{\s*"@context":\s*"https://schema\.org",\s*"@type":\s*"FAQPage",[\s\S]*?"mainEntity":\s*(\[[\s\S]*?\])\s*\}\s*',
    "",
    hear_content
)

# Define faqItems in frontmatter if not present
if "const faqItems = [" not in hear_content:
    # insert faqItems
    faq_insert = """const faqItems = [
  { name: "Насколько точен онлайн-тест слуха?", acceptedAnswer: { text: "Онлайн-тесты слуха с использованием Web Audio API дают ориентировочную оценку; уровни звука браузера не эквивалентны калиброванной клинической аудиометрии в звукоизолированной кабине. Они помогают выявить асимметрию левого и правого уха или возрастное снижение слышимости высоких частот, требующие консультации сурдолога или ЛОР-врача." } },
  { name: "Нужны ли наушники для этого теста слуха?", acceptedAnswer: { text: "Да, стереонаушники или внутриканальные мониторы необходимы. Обычные динамики акустически смешивают каналы в комнате, делая невозможной независимую проверку левого и правого уха. Кроме того, динамики ноутбуков и телефонов срезают частоты выше 10 000 Гц." } },
  { name: "Что такое возраст ушей и как он рассчитывается?", acceptedAnswer: { text: "Биологический возраст уха основан на самой высокой слышимой частоте звука. Здоровые дети слышат частоты до 20 000 Гц. С возрастом волосковые клетки основания улитки изнашиваются (пресбиакузис): 19 кГц соответствует возрасту до 18 лет, 17 кГц — ~24 годам, 15 кГц — ~34 годам, 14 кГц — ~44 годам, 12 кГц — ~54 годам, 8 кГц — 65+ годам." } },
  { name: "В чём разница между герцами (Гц) и децибелами (дБ)?", acceptedAnswer: { text: "Герцы (Гц) измеряют частоту или высоту тона (низкий бас 250 Гц против ультразвукового писка 17 000 Гц). Децибелы (дБ) измеряют громкость по логарифмической шкале. В аудиологии нормальный разговор лежит в диапазоне 40–60 дБ HL." } },
  { name: "Что такое «речевой банан» на аудиограмме?", acceptedAnswer: { text: "Речевой банан — это область на аудиограмме (от 250 до 6 000 Гц при громкости 20–55 дБ HL), куда попадают все звуки человеческой речи. Снижение слуха в этой зоне приводит к тому, что речь становится неразборчивой («слышу звук, но не разбираю слова»)." } },
  { name: "Что такое правило безопасного прослушивания 60/60 ВОЗ?", acceptedAnswer: { text: "Всемирная организация здравоохранения (ВОЗ) рекомендует слушать наушники на громкости не более 60% от максимума не дольше 60 минут подряд, делая 10-минутный перерыв для предотвращения акустической травмы волосковых клеток." } }
];\n"""
    hear_content = hear_content.replace("const schema = [", faq_insert + "const schema = [")

# Replace schema[3].mainEntity.map with faqItems.map
hear_content = hear_content.replace(
    "{schema[3].mainEntity.map((item) => (",
    "{faqItems.map((item) => ("
)

# Update breadcrumb in hearing-test: Когнитивные игры -> Инструменты
hear_content = hear_content.replace(
    '{"@type": "ListItem", "position": 2, "name": "Когнитивные игры", "item": "https://freeiqexam.com/ru/games"}',
    '{"@type": "ListItem", "position": 2, "name": "Инструменты", "item": "https://freeiqexam.com/ru/tools"}'
)
hear_content = hear_content.replace(
    '{ "@type": "ListItem", "position": 2, "name": "Когнитивные игры", "item": "https://freeiqexam.com/ru/games" }',
    '{ "@type": "ListItem", "position": 2, "name": "Инструменты", "item": "https://freeiqexam.com/ru/tools" }'
)

# First schema item: MedicalWebPage
hear_content = hear_content.replace(
    '''    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Клиническая тональная аудиометрия и высокочастотный тест слуха",''',
    '''    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Онлайн-проверка слуха: тональная аудиометрия и тест возраста ушей",'''
)

with open(p_hear, 'w', encoding='utf-8') as f:
    f.write(hear_content)
print("Updated hearing-test.astro")
