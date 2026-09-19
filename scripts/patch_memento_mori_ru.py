# -*- coding: utf-8 -*-
import os

code = """---
import Layout from '../../components/ru/LayoutRu.astro';
import Header from '../../components/ru/HeaderRu.astro';
import Footer from '../../components/ru/FooterRu.astro';

const alternates = {
  en: '/memento-mori',
  id: '/id/memento-mori'
};

const title = 'Календарь жизни Memento Mori онлайн: 4 000 недель в жизни человека | FreeIQExam';
const description = 'Наглядный стоический интерактивный календарь жизни в неделях и актуарный калькулятор продолжительности жизни. Оцените ваши 4 000 недель, скачайте постер бесплатно.';
const canonicalUrl = 'https://freeiqexam.com/ru/memento-mori';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Интерактивный календарь жизни Memento Mori (4 000 недель) FreeIQExam',
    'url': 'https://freeiqexam.com/ru/memento-mori',
    'applicationCategory': 'LifestyleApplication',
    'operatingSystem': 'All',
    'browserRequirements': 'Требуется поддержка JavaScript',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': [
      'Интерактивная сетка 4 000 недель жизни (визуализация жизни по неделям от 0 до 90+ лет)',
      '4 ключевые эпохи жизни: Формирование (0-18), Амбиции и рост (18-35), Мастерство (35-60) и Наследие (60+)',
      'Актуарный калькулятор ожидаемой продолжительности жизни с биометрическими модификаторами (спорт, сон, питание, курение, стресс)',
      'Интерактивные подсказки для каждой недели с точным возрастом, датой и этапом жизни',
      'Коллекция ежедневных стоических размышлений Марка Аврелия, Сенеки и Эпиктета',
      'Скачивание персонального постера высокого разрешения PNG 1200x675',
      '100% локальная обработка в браузере без передачи персональных данных'
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
        'item': 'https://freeiqexam.com/ru'
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
        'name': 'Календарь жизни Memento Mori',
        'item': 'https://freeiqexam.com/ru/memento-mori'
      }
    ]
  }
];
---

<Layout
  title={title}
  description={description}
  canonicalUrl={canonicalUrl}
  schema={schema}
  alternates={alternates}
  enPath="/memento-mori"
  idPath="/memento-mori"
>
  <Header currentPath="/ru/memento-mori" enPath="/memento-mori" idPath="/memento-mori" />

  <main class="min-h-screen bg-white dark:bg-[#000000] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
    
    <!-- Breadcrumbs -->
    <div class="pt-6 px-4 sm:px-6 max-w-5xl mx-auto">
      <nav class="flex items-center text-xs font-mono text-zinc-500 dark:text-zinc-400" aria-label="Хлебные крошки">
        <a href="/ru" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Главная</a>
        <span class="mx-2">/</span>
        <a href="/ru/tools" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Инструменты</a>
        <span class="mx-2">/</span>
        <span class="text-zinc-900 dark:text-zinc-100 font-semibold">Memento Mori: календарь жизни</span>
      </nav>
    </div>

    <!-- Hero Header -->
    <section class="pt-8 pb-6 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-[13px] font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#0066cc] dark:bg-[#2997ff]"></span>
          <span>4 000 НЕДЕЛЬ · СТОИЧЕСКАЯ ФИЛОСОФИЯ И ОСОЗНАННОСТЬ</span>
        </div>

        <h1 class="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-[-0.025em] text-zinc-950 dark:text-white mb-4">
          Memento Mori: ваша жизнь в неделях
        </h1>

        <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          «Не мало времени мы имеем, а много теряем». Визуализируйте ваши конечные 4 000 недель на Земле, рассчитайте актуарную продолжительность жизни и проживайте каждый день с ясной стоической осознанностью.
        </p>
    </section>

    <!-- Main Tool Container -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
      
      <!-- Biometric & Lifestyle Input Deck -->
      <div class="bg-zinc-50 dark:bg-[#090a0f] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-5 sm:p-8 mb-8 shadow-sm">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
          
          <!-- Date of Birth Input -->
          <div>
            <label for="mementoDob" class="block text-[13px] font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>Дата рождения</span>
            </label>
            <input
              type="date"
              id="mementoDob"
              class="w-full min-h-[44px] bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-4 py-2 text-zinc-900 dark:text-zinc-100 font-mono text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <!-- Biological Sex Selector -->
          <div>
            <label class="block text-[13px] font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v2" /><path d="M20 12h-2" /><path d="M12 20v-2" /><path d="M4 12h2" /></svg>Биологический пол</span>
            </label>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="memento-gender-btn active min-h-[44px] flex-1 py-2 rounded-xl text-[13px] font-semibold border border-blue-600 bg-blue-600/10 text-blue-600 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400 transition-all duration-160 active:scale-[0.97] cursor-pointer"
                data-gender="male"
              >
                ♂ Мужской
              </button>
              <button
                type="button"
                class="memento-gender-btn min-h-[44px] flex-1 py-2 rounded-xl text-[13px] font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-160 active:scale-[0.97] cursor-pointer"
                data-gender="female"
              >
                ♀ Женский
              </button>
            </div>
          </div>

          <!-- Poster Download Action Button -->
          <div class="flex flex-col justify-end">
            <button
              type="button"
              id="downloadMementoPosterBtn"
              class="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#0066cc] hover:bg-[#0052a3] dark:bg-[#2997ff] dark:hover:bg-[#1a82e6] text-white font-semibold text-[14px] shadow-sm transition-all duration-160 active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>Скачать постер жизни (PNG)</span>
            </button>
          </div>

        </div>

        <!-- Longevity & Lifestyle Modifiers Toggle -->
        <div class="pt-6">
          <label class="block text-[13px] font-mono font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3">
            <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0-7-7h1" /><path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" /><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" /></svg>Факторы образа жизни и актуарный прогноз долголетия</span>
          </label>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500/50 transition-colors min-h-[44px]">
              <input type="checkbox" id="modExercise" checked class="w-4 h-4 rounded accent-[#0066cc] dark:accent-[#2997ff] cursor-pointer" />
              <div>
                <span class="font-semibold block text-zinc-900 dark:text-zinc-100 text-[13px]">Спорт 150+ мин</span>
                <span class="text-[13px] text-emerald-600 dark:text-emerald-400 font-mono">+3.8 года</span>
              </div>
            </label>

            <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500/50 transition-colors min-h-[44px]">
              <input type="checkbox" id="modSleep" checked class="w-4 h-4 rounded accent-[#0066cc] dark:accent-[#2997ff] cursor-pointer" />
              <div>
                <span class="font-semibold block text-zinc-900 dark:text-zinc-100 text-[13px]">Сон 7-8 часов</span>
                <span class="text-[13px] text-emerald-600 dark:text-emerald-400 font-mono">+2.4 года</span>
              </div>
            </label>

            <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500/50 transition-colors min-h-[44px]">
              <input type="checkbox" id="modDiet" checked class="w-4 h-4 rounded accent-[#0066cc] dark:accent-[#2997ff] cursor-pointer" />
              <div>
                <span class="font-semibold block text-zinc-900 dark:text-zinc-100 text-[13px]">Здоровое питание</span>
                <span class="text-[13px] text-emerald-600 dark:text-emerald-400 font-mono">+2.8 года</span>
              </div>
            </label>

            <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500/50 transition-colors min-h-[44px]">
              <input type="checkbox" id="modSmoking" class="w-4 h-4 rounded accent-[#0066cc] dark:accent-[#2997ff] cursor-pointer" />
              <div>
                <span class="font-semibold block text-zinc-900 dark:text-zinc-100 text-[13px]">Курение / Вейпинг</span>
                <span class="text-[13px] text-rose-600 dark:text-rose-400 font-mono">-8.5 лет</span>
              </div>
            </label>

            <label class="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500/50 transition-colors min-h-[44px]">
              <input type="checkbox" id="modStress" class="w-4 h-4 rounded accent-[#0066cc] dark:accent-[#2997ff] cursor-pointer" />
              <div>
                <span class="font-semibold block text-zinc-900 dark:text-zinc-100 text-[13px]">Хронический стресс</span>
                <span class="text-[13px] text-rose-600 dark:text-rose-400 font-mono">-2.5 года</span>
              </div>
            </label>

          </div>
        </div>

      </div>

      <!-- Life Metrics Scorecard -->
      <div class="bg-zinc-950 text-white border border-zinc-800/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          
          <div class="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/80 text-center">
            <span class="text-[13px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Прожито недель</span>
            <span id="statLivedWeeks" class="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-100">1.460</span>
            <span class="text-[13px] text-zinc-400 block mt-1">Пройденный путь</span>
          </div>

          <div class="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/80 text-center">
            <span class="text-[13px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Осталось недель</span>
            <span id="statRemainingWeeks" class="text-3xl sm:text-4xl font-extrabold font-mono text-[#0066cc] dark:text-[#2997ff]">2.700</span>
            <span class="text-[13px] text-zinc-400 block mt-1">Будущий потенциал</span>
          </div>

          <div class="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/80 text-center">
            <span class="text-[13px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Прожито от срока</span>
            <span id="statPercentSpent" class="text-3xl sm:text-4xl font-extrabold font-mono text-zinc-300">35.1%</span>
            <span class="text-[13px] text-zinc-400 block mt-1">Процент времени</span>
          </div>

          <div class="bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800/80 text-center">
            <span class="text-[13px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Ожидаемый возраст</span>
            <span id="statLifeExpectancy" class="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">87.2 лет</span>
            <span class="text-[13px] text-zinc-400 block mt-1">Актуарный прогноз</span>
          </div>

        </div>

        <!-- Life Progress Bar -->
        <div class="space-y-1.5 mb-6">
          <div class="flex justify-between text-[13px] font-mono text-zinc-400">
            <span>Возраст 0</span>
            <span id="statAgeYears" class="text-[#0066cc] dark:text-[#2997ff] font-bold">28.0 лет</span>
            <span>Целевой возраст</span>
          </div>
          <div class="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 p-0.5">
            <div id="lifeProgressBar" class="h-full bg-[#0066cc] dark:bg-[#2997ff] rounded-full transition-all duration-500" style="width: 35.1%;"></div>
          </div>
        </div>

        <!-- Deep Time Breakdown -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80 text-center font-mono text-[13px] text-zinc-400">
          <div>
            <span class="text-[13px] text-zinc-400 uppercase block">Осталось дней</span>
            <span id="statRemainingDays" class="font-bold text-white text-[15px]">18.900</span>
          </div>
          <div>
            <span class="text-[13px] text-zinc-400 uppercase block">Осталось часов</span>
            <span id="statRemainingHours" class="font-bold text-white text-[15px]">453.600</span>
          </div>
          <div>
            <span class="text-[13px] text-zinc-400 uppercase block">Осталось ударов сердца</span>
            <span id="statRemainingHeartbeats" class="font-bold text-[#0066cc] dark:text-[#2997ff] text-[15px]">1.959.552.000</span>
          </div>
        </div>

      </div>

      <!-- 4,000 Weeks Interactive Grid Arena -->
      <div class="bg-zinc-50 dark:bg-[#090a0f] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-4 sm:p-8 shadow-sm">
        
        <!-- Legend & Eras Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800/80">
          <div>
            <h2 class="font-heading font-bold text-lg sm:text-xl text-zinc-950 dark:text-white tracking-[-0.02em]">
              Сетка 4 000 недель жизни
            </h2>
            <p class="text-[13px] text-zinc-500 dark:text-zinc-400">
              Каждый квадрат обозначает 1 неделю (52 недели в одном горизонтальном ряду = 1 полный год).
            </p>
          </div>

          <!-- Dot Legend -->
          <div class="flex flex-wrap items-center gap-4 text-[13px] font-mono">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-sm bg-zinc-900 dark:bg-zinc-100"></span>
              <span class="text-zinc-600 dark:text-zinc-400">Прожитые недели</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-sm bg-[#0066cc] dark:bg-[#2997ff] shadow-[0_0_6px_rgba(41,151,255,0.6)] animate-pulse"></span>
              <span class="text-zinc-600 dark:text-zinc-400">Текущая неделя</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-sm border border-zinc-300 dark:border-zinc-700/80"></span>
              <span class="text-zinc-600 dark:text-zinc-400">Оставшееся время</span>
            </div>
          </div>
        </div>

        <!-- Life Eras Key -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 text-[13px] font-mono">
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
            <span class="block font-bold text-[13px]">Возраст 0 – 18</span>
            <span class="text-[13px] text-zinc-500 dark:text-zinc-400">Формирование и детство</span>
          </div>
          <div class="p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            <span class="block font-bold text-[13px]">Возраст 18 – 35</span>
            <span class="text-[13px] text-zinc-500 dark:text-zinc-400">Амбиции, образование и рост</span>
          </div>
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
            <span class="block font-bold text-[13px]">Возраст 35 – 60</span>
            <span class="text-[13px] text-zinc-500 dark:text-zinc-400">Мастерство и зрелость</span>
          </div>
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200">
            <span class="block font-bold text-[13px]">Возраст 60 – 85+</span>
            <span class="text-[13px] text-zinc-500 dark:text-zinc-400">Мудрость и наследие</span>
          </div>
        </div>

        <!-- Interactive Grid Container -->
        <div class="relative overflow-x-auto py-2">
          <div id="lifeGridContainer" class="min-w-[640px] space-y-1 select-none"></div>

          <!-- Floating Inspection Tooltip -->
          <div
            id="gridTooltip"
            class="hidden fixed z-50 bg-zinc-950/95 text-white border border-zinc-800 p-3 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none text-[13px]"
          ></div>
        </div>

      </div>

      <!-- Daily Stoic Meditation Card -->
      <div class="mt-8 bg-zinc-50 dark:bg-[#090a0f] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[13px] font-mono uppercase tracking-wider text-[#0066cc] dark:text-[#2997ff] font-bold flex items-center gap-1.5">
            <span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" /></svg>Ежедневное размышление стоиков</span>
          </span>
          <button
            type="button"
            id="nextQuoteBtn"
            class="min-h-[36px] px-3 py-1.5 rounded-xl text-[13px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono transition-all duration-160 active:scale-[0.97] cursor-pointer"
          >
            ↻ Следующая цитата
          </button>
        </div>

        <blockquote class="text-lg sm:text-xl font-serif italic text-zinc-900 dark:text-zinc-100 leading-relaxed mb-4">
          <span id="stoicQuoteText">«Не мало времени мы имеем, а много теряем. Жизнь достаточно длинна, и нам дан щедрый срок для совершения величайших дел, если мы умеем им распорядиться».</span>
        </blockquote>

        <div class="flex items-center justify-between text-[13px] text-zinc-500 font-mono">
          <span id="stoicQuoteAuthor" class="font-bold text-zinc-900 dark:text-zinc-100 text-[14px]">Сенека</span>
          <span id="stoicQuoteSource" class="text-zinc-500 dark:text-zinc-400">О краткости жизни</span>
        </div>
      </div>

    </section>

    <!-- Philosophical & Actuarial Guide -->
    <article class="max-w-4xl mx-auto px-4 sm:px-6 pb-24 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px] space-y-12">
      
      <!-- Section 1: Roman & Stoic Origins -->
      <section class="space-y-4">
        <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 dark:text-white tracking-[-0.02em]">
          1. Истоки философии: Memento Mori и Amor Fati в Риме
        </h2>
        <p class="text-[17px] leading-[1.62] text-zinc-700 dark:text-zinc-300">
          В Древнем Риме во время триумфального шествия за спиной полководца в золотой колеснице стоял раб, который держал над его головой лавровый венец и непрерывно шептал на ухо: <em>«Respice post te. Hominem te esse memento. Memento mori»</em> («Оглянись назад. Помни, что ты всего лишь человек. Помни о смерти»).
        </p>
        <p class="text-[17px] leading-[1.62] text-zinc-700 dark:text-zinc-300">
          В стоической философии — основанной Зеноном и развитой <strong>Сенекой, Эпиктетом и императором Марком Аврелием</strong> — смерть никогда не считалась поводом для уныния. Напротив, памятование о бренности служило мощнейшим стимулом к добродетельной жизни, мгновенно растворяя иллюзии эго, мелочные обиды, зависть и прокрастинацию.
        </p>
        <p class="text-[17px] leading-[1.62] text-zinc-700 dark:text-zinc-300">
          Неотделима от <em>Memento Mori</em> и концепция <strong>Amor Fati</strong> («Любовь к судьбе»). Стоик не просто смиряется с ограниченным числом отпущенных ему недель, а принимает любые обстоятельства, трудности и радости как ценный материал для закалки характера и проявления мудрости.
        </p>
      </section>

      <!-- Section 2: Actuarial Science & Janet's Theory -->
      <section class="space-y-4">
        <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 dark:text-white tracking-[-0.02em]">
          2. Психология времени: почему годы летят быстрее с возрастом
        </h2>
        <p class="text-[17px] leading-[1.62] text-zinc-700 dark:text-zinc-300">
          Феномен субъективного ускорения времени объясняется <strong>пропорциональной теорией Поля Жане</strong>. Для 10-летнего ребенка один год составляет 10% от всей его прожитой жизни, поэтому он кажется бесконечным. Для 50-летнего человека тот же год составляет всего лишь 2% от жизненного опыта — в пять раз меньше.
        </p>
        <p class="text-[17px] leading-[1.62] text-zinc-700 dark:text-zinc-300">
          Кроме того, рутина взрослой жизни лишена новизны. Мозг оптимизирует обработку повторяющихся будней, объединяя монотонные дни в краткие обобщенные воспоминания. Наглядная сетка из 4 000 недель возвращает ощущение драгоценности каждого момента, помогая наполнять дни новыми впечатлениями и осмысленными поступками.
        </p>
      </section>

      <!-- Section 3: FAQ Accordion -->
      <section class="space-y-6 pt-4">
        <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-950 dark:text-white tracking-[-0.02em]">
          3. Часто задаваемые вопросы
        </h2>

        <div class="space-y-3">
          
          <details class="group bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between font-heading font-semibold text-zinc-950 dark:text-white cursor-pointer select-none text-base min-h-[44px]">
              <span>Что означает Memento Mori и зачем практиковать эту философию?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <p class="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
              Memento Mori — крылатое латинское выражение, означающее «Помни о смерти». Для стоиков размышление о конечности бытия служило не источником страха, а лучшим средством против лени, тревоги о пустяках и откладывания важных дел на потом.
            </p>
          </details>

          <details class="group bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between font-heading font-semibold text-zinc-950 dark:text-white cursor-pointer select-none text-base min-h-[44px]">
              <span>Сколько недель в средней продолжительности жизни человека?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <p class="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
              При продолжительности жизни в 80 лет человек проживает около 4 160 недель (80 × 52,1775). К 30 годам проходит примерно 1 560 недель (37,5%), а к 50 годам — уже 2 600 недель (62,5%). Визуализация жизни в виде сетки из 4 000 ячеек превращает абстрактное время в осязаемый конечный ресурс.
            </p>
          </details>

          <details class="group bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between font-heading font-semibold text-zinc-950 dark:text-white cursor-pointer select-none text-base min-h-[44px]">
              <span>В чем разница между продолжительностью жизни (lifespan) и периодом здоровья (healthspan)?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <p class="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
              Lifespan — это общее количество биологически прожитых лет. Healthspan — это период жизни, проведенный в полном физическом и когнитивном здравии, без тяжелых хронических болезней. Главная цель современной превентивной медицины — сделать healthspan максимально близким к общему сроку жизни.
            </p>
          </details>

          <details class="group bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between font-heading font-semibold text-zinc-950 dark:text-white cursor-pointer select-none text-base min-h-[44px]">
              <span>Как привычки и образ жизни влияют на ожидаемую продолжительность жизни?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <p class="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
              Эпидемиологические исследования Гарвардской школы общественного здравоохранения подтверждают: регулярная физическая активность (+3,5–4,5 года), полноценный сон 7–8 часов (+2,4 года), сбалансированная диета (+2,8 года) и отказ от курения (+8,5 лет) в совокупности продлевают активное долголетие более чем на десятилетие.
            </p>
          </details>

          <details class="group bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex items-center justify-between font-heading font-semibold text-zinc-950 dark:text-white cursor-pointer select-none text-base min-h-[44px]">
              <span>Сохраняется ли моя дата рождения или персональные данные на сервере?</span>
              <span class="text-zinc-400 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <p class="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/80 pt-3">
              Нет. Все вычисления, отрисовка сетки недель и формирование постера PNG выполняются исключительно локально в памяти вашего браузера. Никакие персональные данные никогда не передаются на сервер.
            </p>
          </details>

        </div>
      </section>

    </article>

  </main>

  <Footer />

  <script src="../../scripts/tools/memento-engine-ru.js"></script>
</Layout>
"""

with open('src/pages/ru/memento-mori.astro', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully replaced src/pages/ru/memento-mori.astro with Russian translation!")
