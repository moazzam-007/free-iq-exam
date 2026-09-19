# -*- coding: utf-8 -*-
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

p_coc = 'src/pages/ru/circle-of-control.astro'
with open(p_coc, 'r', encoding='utf-8') as f:
    coc = f.read()

# Frontmatter replacement
new_fm = """---
import Layout from '../../components/ru/LayoutRu.astro';
import Header from '../../components/ru/HeaderRu.astro';
import Footer from '../../components/ru/FooterRu.astro';

const alternates = {
  en: '/circle-of-control',
  id: '/id/lingkaran-kendali'
};

const title = 'Круг контроля и влияния: интерактивная практика стоицизма | FreeIQExam';
const description = 'Интерактивный круг контроля Эпиктета и Кови: распределите заботы, влияние и личный контроль. Практика стоицизма и ясности ума онлайн.';
const canonicalUrl = 'https://freeiqexam.com/ru/circle-of-control';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Интерактивный круг контроля и влияния: стоическая практика ясности',
    'url': 'https://freeiqexam.com/ru/circle-of-control',
    'applicationCategory': 'LifestyleApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Требуется поддержка JavaScript',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Интерактивная 3-зонная модель кругов (Контроль, Влияние, Заботы)',
      'Быстрая сортировка тревог и ситуаций с авто-определением радиуса',
      '4 готовых стоических сценария (работа, отношения, финансы, здоровье)',
      'Расчет индекса личного контроля и коэффициента влияния в реальном времени',
      'Стоический инструмент переосмысления (рефрейминг) по Эпиктету',
      'Экспорт плана действий (.txt), печать карточки ясности и копирование',
      '100% конфиденциальность: локальные вычисления в браузере без отправки данных'
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Главная',
        'item': 'https://freeiqexam.com/ru/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Инструменты',
        'item': 'https://freeiqexam.com/ru/tools'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Круг контроля',
        'item': 'https://freeiqexam.com/ru/circle-of-control'
      }
    ]
  }
];
---"""

# Replace frontmatter
coc = re.sub(r'^---[\s\S]*?---\n', new_fm + '\n', coc)

# Fix Layout & Header attributes
coc = coc.replace('idPath="/lingkaran-kendali"', 'idPath="/id/lingkaran-kendali"')
coc = coc.replace('currentPath="/ru/circle-of-control"', 'currentPath="/circle-of-control"')

# Hero section replacements
coc = coc.replace('OBSERVATORIUM KONSENTRIS · KEJERNIHAN STOIK', 'ИНТЕРАКТИВНАЯ ПРАКТИКА · СТОИЧЕСКАЯ ЯСНОСТЬ')
coc = coc.replace('Круг контроля & Agensi Mental', 'Круг контроля и личное влияние')
coc = coc.replace(
    'Pisahkan apa yang dapat Anda kendalikan, apa yang dapat Anda pengaruhi, dan apa yang harus Anda lepaskan. Ubah kecemasan mental menjadi rencana aksi Stoik yang terukur.',
    'Разделите то, чем вы управляете напрямую, на что можете влиять косвенно и что находится вне вашей власти. Превратите тревогу в ясный план действий.'
)

# Aria-label
coc = coc.replace('aria-label="Observatorium lingkaran kendali interaktif"', 'aria-label="Интерактивный круг контроля"')
coc = coc.replace('Tuliskan satu kekhawatiran, tekanan, atau situasi', 'Запишите тревогу, мысль или ситуацию')
coc = coc.replace('Contoh: Apa pendapat atasan tentang kinerja saya…', 'Пример: Что думает руководитель о моем отчете…')

# Buttons in form
coc = coc.replace('Kuasa Kendali Penuh', 'Полный контроль')
coc = coc.replace('Dapat Dipengaruhi', 'Могу влиять')
coc = coc.replace('Di Luar Kendali', 'Вне контроля')
coc = coc.replace('Pilih contoh untuk langsung ditambahkan:', 'Выберите пример для быстрого добавления:')

# Presets
coc = coc.replace('>Kelelahan Kerja<', '>Рабочая перегрузка<')
coc = coc.replace('>Tenggat · atasan · hasil<', '>Дедлайны · руководство · задачи<')
coc = coc.replace('>Hubungan & Sosial<', '>Отношения и социум<')
coc = coc.replace('>Validasi · integritas · obrolan<', '>Одобрение · границы · диалог<')
coc = coc.replace('>Ketidakpastian Finansial<', '>Финансовая неопределенность<')
coc = coc.replace('>Inflasi · pasar · anggaran<', '>Инфляция · рынок · бюджет<')
coc = coc.replace('>Здоровье & Penuaan<', '>Здоровье и самочувствие<')
coc = coc.replace('>Kebiasaan · genetik · fisik<', '>Привычки · генетика · сон<')

# Concentric Arena
coc = coc.replace('Observatorium Konsentris', 'Интерактивные сферы')
coc = coc.replace('0 refleksi di observatorium', '0 ситуаций на круге')
coc = coc.replace('<span>Kendali</span>', '<span>Контроль</span>')
coc = coc.replace('<span>Pengaruh</span>', '<span>Влияние</span>')
coc = coc.replace('<span>Perhatian</span>', '<span>Заботы</span>')
coc = coc.replace(
    'aria-label="Lingkaran konsentris interaktif. Tarik refleksi ke cincin atau gunakan tombol pada kartu."',
    'aria-label="Интерактивные круги. Перетаскивайте карточки по радиусам или используйте кнопки."'
)

# Text inside arena SVG / markup
coc = coc.replace('LINGKARAN KENDALI (100% ANDA)', 'КРУГ КОНТРОЛЯ (100% ВАША ВОЛЯ)')
coc = coc.replace('LINGKARAN PENGARUH (KOLABORASI)', 'КРУГ ВЛИЯНИЯ (КОСВЕННОЕ ВЛИЯНИЕ)')
coc = coc.replace('LINGKARAN PERHATIAN (LEPASKAN)', 'КРУГ ЗАБОТ (ВНЕ ВАШЕЙ ВЛАСТИ)')

# Commit input & action plan
coc = coc.replace(
    'placeholder="Komitmen mikro saya hari ini (5–20 menit): contoh: Tulis draf email selama 15 menit…"',
    'placeholder="Мое микро-действие сегодня (5–20 минут): например, составить план письма за 15 минут…"'
)
coc = coc.replace('Simpan komitmen', 'Сохранить действие')
coc = coc.replace('Salin Ringkasan', 'Скопировать план')
coc = coc.replace('Unduh Rencana (.txt)', 'Скачать план (.txt)')
coc = coc.replace('Cetak Kartu Kejernihan', 'Распечатать карточку')
coc = coc.replace('>Reset<', '>Сброс<')

# Reframing engine
coc = coc.replace('⇄ Mesin Reframing · Konversi Epictetus', '⇄ Стоический рефрейминг · Правило Эпиктета')
coc = coc.replace('Ubah kekhawatiran menjadi langkah terkendali', 'Превратите беспокойство в практическое действие')
coc = coc.replace(
    'Untuk setiap hal di luar kendali, Stoikisme mengajukan satu pertanyaan kunci: <em>“Bagaimana cara mengubah kekhawatiran ini menjadi tindakan yang dapat saya kendalikan?”</em> Pilih kekhawatiran, tentukan kebajikan pemandu, dan dapatkan pembingkaian ulang instan beserta langkah 5–20 menit.',
    'Для любой ситуации вне вашего контроля стоицизм предлагает вопрос: <em>«Какое конкретное действие находится в моей власти прямо сейчас?»</em> Выберите беспокойство, определите ключевую добродетель и получите формулировку действия на 5–20 минут.'
)
coc = coc.replace('Pilih kekhawatiran untuk dibingkai ulang', 'Выберите ситуацию для переосмысления')
coc = coc.replace('Tidak ada kekhawatiran saat ini - benteng pikiran tenang', 'Нет внешних тревог — внутренняя крепость спокойна')
coc = coc.replace('Pilih kebajikan pemandu', 'Выберите добродетель')
coc = coc.replace('“Sebagian hal berada dalam kendali kita dan sebagian lainnya tidak.”', '«Одни вещи подвластны нам, другие — нет. Подвластны нам наше мнение, стремление, желание, уклонение — одним словом, все наши действия.»')
coc = coc.replace(
    '<strong>Catatan:</strong> Индекс контроля adalah visualisasi reflektif dari situasi yang Anda masukkan—bukan instrumen diagnostik klinis untuk kecemasan.',
    '<strong>Примечание:</strong> Индекс контроля — инструмент рефлексии и осознанности, а не клинический опросник тревожных расстройств.'
)

# Add Russian FAQ section before Footer
faq_coc_html = """
    <!-- Russian Informational Guide & FAQ Accordion -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-zinc-200 dark:border-zinc-800 space-y-8">
      <div class="space-y-4">
        <span class="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Философия действия</span>
        <h2 class="font-heading font-extrabold text-2xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight">
          Дихотомия контроля Эпиктета и круги влияния Стивена Кови
        </h2>
        <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Фундаментальный принцип стоицизма — разделение мира на то, что находится в нашей абсолютной власти (ta eph' hemin), и то, что от нас не зависит (ta ouk eph' hemin). Позже Стивен Кови развил эту модель до трех концентрических сфер: круг забот (concern), круг влияния (influence) и круг контроля (control).
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <h3 class="font-bold text-base text-zinc-950 dark:text-white mb-2">1. Круг контроля (100%)</h3>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Ваши собственные мысли, суждения, приложенные усилия, реакции на события, привычки и распределение времени сегодня.
          </p>
        </div>
        <div class="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <h3 class="font-bold text-base text-zinc-950 dark:text-white mb-2">2. Круг влияния</h3>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            То, на что вы можете воздействовать косвенно: аргументы в переговорах, честный диалог, атмосфера в команде и подготовка к встрече.
          </p>
        </div>
        <div class="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <h3 class="font-bold text-base text-zinc-950 dark:text-white mb-2">3. Круг забот (0%)</h3>
          <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Прошлые события, погода, чужие мнения, геополитика, поведение других людей и рыночные флуктуации.
          </p>
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4 pt-6">
        <h3 class="font-heading font-bold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Частые вопросы о круге контроля и стоицизме
        </h3>
        <div class="space-y-3 pt-2">
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Что такое круг контроля и кто его придумал?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Концепция восходит к трудам древнегреческого стоика Эпиктета («Энхиридион», I век н.э.), сформулировавшего дихотомию контроля. В XX веке Стивен Кови в книге «7 навыков высокоэффективных людей» преобразовал её в модель концентрических кругов (круг забот и круг влияния), а Уильям Ирвин предложил стоическую трихотомию.
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Как перестать переживать о вещах вне моего контроля?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Стоики используют технику инверсии цели (рефрейминг): перенесите фокус с внешнего результата (который вам не принадлежит) на внутреннее качество усилий (которое зависит от вас на 100%). Вместо «я должен обязательно выиграть контракт» поставьте цель «я сделаю самую тщательную презентацию, на которую способен».
            </p>
          </details>
          <details class="group rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <summary class="flex cursor-pointer items-center justify-between font-heading font-bold text-sm sm:text-base text-zinc-900 dark:text-white select-none">
              <span>Сохраняются ли мои записи и переживания на сервере?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
              Нет. Инструмент работает полностью локально в вашем браузере. Все добавленные записи сохраняются в локальном хранилище (localStorage) вашего устройства и никогда не передаются на сторонние серверы.
            </p>
          </details>
        </div>
      </div>
    </section>
"""

if '<!-- Russian Informational Guide' not in coc:
    coc = coc.replace('  </main>', faq_coc_html + '  </main>')

with open(p_coc, 'w', encoding='utf-8') as f:
    f.write(coc)

print("Updated circle-of-control.astro")
