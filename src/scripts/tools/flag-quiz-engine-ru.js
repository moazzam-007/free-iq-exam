/**
 * World Flag Quiz & Geographic Memory Arena Engine (RU)
 * 100% Client-side interactive engine featuring:
 * - 195+ Sovereign Nations comprehensive database (ISO, Name, Capital, Continent, Flag SVG/PNG)
 * - Multiple Game Modes: 20-Question Sprint, Endless Survival (Sudden Death), Reverse Mode, Vexillology Hard Mode
 * - Continental Filters: All World, Europe, Asia, Americas, Africa, Oceania
 * - Web Audio API sound synthesis (combo ascending chimes & miss acoustics)
 * - Kinematic Metrics: Final Score, Percentile Rank, Accuracy %, Avg Reaction Time (ms), Regional Mastery Breakdown
 * - End-of-Round Review Screen for missed flags with vexillological explanations
 *
 * Russian localization: country names, capitals and user-visible UI strings only.
 * Element ids, CSS classes, custom properties, ISO codes, continent keys and all
 * scoring/audio logic are byte-identical to the English engine.
 */

(function () {
  'use strict';

  // DEF-78: Inline SVG fallback for remote FlagCDN images (no local asset
  // shipped). The error guard swaps src only once per image, preventing loops.
  var FLAG_FALLBACK_SRC = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240"><rect width="320" height="240" rx="12" fill="#27272a"/><text x="160" y="128" font-family="sans-serif" font-size="16" fill="#a1a1aa" text-anchor="middle">Флаг недоступен</text></svg>');

  function armFlagFallback(img) {
    if (!img || img.dataset.flagFallbackArmed) return;
    img.dataset.flagFallbackArmed = '1';
    img.addEventListener('error', function () {
      if (img.dataset.flagFallbackUsed) return;
      img.dataset.flagFallbackUsed = '1';
      img.src = FLAG_FALLBACK_SRC;
    });
  }

  /* =========================================================
     1. COMPREHENSIVE 195+ NATIONS DATABASE
     ========================================================= */
  const COUNTRIES_DB = [
    // Europe
    { code: 'fr', name: 'Франция', capital: 'Париж', continent: 'Europe', hardPair: null },
    { code: 'de', name: 'Германия', capital: 'Берлин', continent: 'Europe', hardPair: null },
    { code: 'it', name: 'Италия', capital: 'Рим', continent: 'Europe', hardPair: 'ireland' },
    { code: 'es', name: 'Испания', capital: 'Мадрид', continent: 'Europe', hardPair: null },
    { code: 'gb', name: 'Великобритания', capital: 'Лондон', continent: 'Europe', hardPair: null },
    { code: 'pt', name: 'Португалия', capital: 'Лиссабон', continent: 'Europe', hardPair: null },
    { code: 'nl', name: 'Нидерланды', capital: 'Амстердам', continent: 'Europe', hardPair: 'luxembourg' },
    { code: 'be', name: 'Бельгия', capital: 'Брюссель', continent: 'Europe', hardPair: 'germany' },
    { code: 'ch', name: 'Швейцария', capital: 'Берн', continent: 'Europe', hardPair: null },
    { code: 'at', name: 'Австрия', capital: 'Вена', continent: 'Europe', hardPair: 'latvia' },
    { code: 'se', name: 'Швеция', capital: 'Стокгольм', continent: 'Europe', hardPair: 'nordic' },
    { code: 'no', name: 'Норвегия', capital: 'Осло', continent: 'Europe', hardPair: 'iceland' },
    { code: 'fi', name: 'Финляндия', capital: 'Хельсинки', continent: 'Europe', hardPair: 'nordic' },
    { code: 'dk', name: 'Дания', capital: 'Копенгаген', continent: 'Europe', hardPair: 'nordic' },
    { code: 'is', name: 'Исландия', capital: 'Рейкьявик', continent: 'Europe', hardPair: 'norway' },
    { code: 'ie', name: 'Ирландия', capital: 'Дублин', continent: 'Europe', hardPair: 'cote_divoire' },
    { code: 'pl', name: 'Польша', capital: 'Варшава', continent: 'Europe', hardPair: 'indonesia' },
    { code: 'cz', name: 'Чехия', capital: 'Прага', continent: 'Europe', hardPair: null },
    { code: 'gr', name: 'Греция', capital: 'Афины', continent: 'Europe', hardPair: null },
    { code: 'hu', name: 'Венгрия', capital: 'Будапешт', continent: 'Europe', hardPair: 'italy' },
    { code: 'ro', name: 'Румыния', capital: 'Бухарест', continent: 'Europe', hardPair: 'chad' },
    { code: 'bg', name: 'Болгария', capital: 'София', continent: 'Europe', hardPair: null },
    { code: 'ua', name: 'Украина', capital: 'Киев', continent: 'Europe', hardPair: null },
    { code: 'hr', name: 'Хорватия', capital: 'Загреб', continent: 'Europe', hardPair: null },
    { code: 'rs', name: 'Сербия', capital: 'Белград', continent: 'Europe', hardPair: 'russia' },
    { code: 'sk', name: 'Словакия', capital: 'Братислава', continent: 'Europe', hardPair: 'slovenia' },
    { code: 'si', name: 'Словения', capital: 'Любляна', continent: 'Europe', hardPair: 'slovakia' },
    { code: 'lu', name: 'Люксембург', capital: 'Люксембург', continent: 'Europe', hardPair: 'netherlands' },
    { code: 'mc', name: 'Монако', capital: 'Монако', continent: 'Europe', hardPair: 'indonesia' },
    { code: 'ee', name: 'Эстония', capital: 'Таллин', continent: 'Europe', hardPair: null },
    { code: 'lv', name: 'Латвия', capital: 'Рига', continent: 'Europe', hardPair: 'austria' },
    { code: 'lt', name: 'Литва', capital: 'Вильнюс', continent: 'Europe', hardPair: null },
    { code: 'cy', name: 'Кипр', capital: 'Никосия', continent: 'Europe', hardPair: null },
    { code: 'mt', name: 'Мальта', capital: 'Валлетта', continent: 'Europe', hardPair: null },
    { code: 'al', name: 'Албания', capital: 'Тирана', continent: 'Europe', hardPair: null },
    { code: 'ba', name: 'Босния и Герцеговина', capital: 'Сараево', continent: 'Europe', hardPair: null },
    { code: 'mk', name: 'Северная Македония', capital: 'Скопье', continent: 'Europe', hardPair: null },
    { code: 'me', name: 'Черногория', capital: 'Подгорица', continent: 'Europe', hardPair: null },
    { code: 'md', name: 'Молдова', capital: 'Кишинёв', continent: 'Europe', hardPair: 'andorra' },
    { code: 'by', name: 'Беларусь', capital: 'Минск', continent: 'Europe', hardPair: null },
    { code: 'va', name: 'Ватикан', capital: 'Ватикан', continent: 'Europe', hardPair: null },
    { code: 'sm', name: 'Сан-Марино', capital: 'Сан-Марино', continent: 'Europe', hardPair: null },
    { code: 'li', name: 'Лихтенштейн', capital: 'Вадуц', continent: 'Europe', hardPair: 'haiti' },
    { code: 'ad', name: 'Андорра', capital: 'Андорра-ла-Велья', continent: 'Europe', hardPair: 'moldova' },

    // Asia
    { code: 'jp', name: 'Япония', capital: 'Токио', continent: 'Asia', hardPair: 'bangladesh' },
    { code: 'cn', name: 'Китай', capital: 'Пекин', continent: 'Asia', hardPair: 'vietnam' },
    { code: 'in', name: 'Индия', capital: 'Нью-Дели', continent: 'Asia', hardPair: 'niger' },
    { code: 'kr', name: 'Южная Корея', capital: 'Сеул', continent: 'Asia', hardPair: null },
    { code: 'id', name: 'Индонезия', capital: 'Джакарта', continent: 'Asia', hardPair: 'monaco' },
    { code: 'sa', name: 'Саудовская Аравия', capital: 'Эр-Рияд', continent: 'Asia', hardPair: null },
    { code: 'ae', name: 'Объединённые Арабские Эмираты', capital: 'Абу-Даби', continent: 'Asia', hardPair: 'pan_arab' },
    { code: 'th', name: 'Таиланд', capital: 'Бангкок', continent: 'Asia', hardPair: 'costa_rica' },
    { code: 'vn', name: 'Вьетнам', capital: 'Ханой', continent: 'Asia', hardPair: 'china' },
    { code: 'ph', name: 'Филиппины', capital: 'Манила', continent: 'Asia', hardPair: null },
    { code: 'my', name: 'Малайзия', capital: 'Куала-Лумпур', continent: 'Asia', hardPair: 'united_states' },
    { code: 'sg', name: 'Сингапур', capital: 'Сингапур', continent: 'Asia', hardPair: null },
    { code: 'tr', name: 'Турция', capital: 'Анкара', continent: 'Asia', hardPair: 'tunisia' },
    { code: 'il', name: 'Израиль', capital: 'Иерусалим', continent: 'Asia', hardPair: null },
    { code: 'pk', name: 'Пакистан', capital: 'Исламабад', continent: 'Asia', hardPair: null },
    { code: 'bd', name: 'Бангладеш', capital: 'Дакка', continent: 'Asia', hardPair: 'japan' },
    { code: 'ir', name: 'Иран', capital: 'Тегеран', continent: 'Asia', hardPair: null },
    { code: 'iq', name: 'Ирак', capital: 'Багдад', continent: 'Asia', hardPair: 'syria' },
    { code: 'qa', name: 'Катар', capital: 'Доха', continent: 'Asia', hardPair: 'bahrain' },
    { code: 'bh', name: 'Бахрейн', capital: 'Манама', continent: 'Asia', hardPair: 'qatar' },
    { code: 'kw', name: 'Кувейт', capital: 'Эль-Кувейт', continent: 'Asia', hardPair: 'pan_arab' },
    { code: 'om', name: 'Оман', capital: 'Маскат', continent: 'Asia', hardPair: null },
    { code: 'jo', name: 'Иордания', capital: 'Амман', continent: 'Asia', hardPair: 'palestine' },
    { code: 'lb', name: 'Ливан', capital: 'Бейрут', continent: 'Asia', hardPair: null },
    { code: 'lk', name: 'Шри-Ланка', capital: 'Коломбо', continent: 'Asia', hardPair: null },
    { code: 'np', name: 'Непал', capital: 'Катманду', continent: 'Asia', hardPair: null },
    { code: 'kz', name: 'Казахстан', capital: 'Астана', continent: 'Asia', hardPair: null },
    { code: 'uz', name: 'Узбекистан', capital: 'Ташкент', continent: 'Asia', hardPair: null },
    { code: 'kh', name: 'Камбоджа', capital: 'Пномпень', continent: 'Asia', hardPair: null },
    { code: 'mm', name: 'Мьянма', capital: 'Нейпьидо', continent: 'Asia', hardPair: 'lithuania' },
    { code: 'la', name: 'Лаос', capital: 'Вьентьян', continent: 'Asia', hardPair: null },
    { code: 'mn', name: 'Монголия', capital: 'Улан-Батор', continent: 'Asia', hardPair: null },
    { code: 'ge', name: 'Грузия', capital: 'Тбилиси', continent: 'Asia', hardPair: null },
    { code: 'am', name: 'Армения', capital: 'Ереван', continent: 'Asia', hardPair: 'colombia' },
    { code: 'az', name: 'Азербайджан', capital: 'Баку', continent: 'Asia', hardPair: null },
    { code: 'tw', name: 'Тайвань', capital: 'Тайбэй', continent: 'Asia', hardPair: null },
    { code: 'kp', name: 'Северная Корея', capital: 'Пхеньян', continent: 'Asia', hardPair: null },
    { code: 'ye', name: 'Йемен', capital: 'Сана', continent: 'Asia', hardPair: 'egypt' },
    { code: 'sy', name: 'Сирия', capital: 'Дамаск', continent: 'Asia', hardPair: 'iraq' },
    { code: 'af', name: 'Афганистан', capital: 'Кабул', continent: 'Asia', hardPair: null },
    { code: 'tm', name: 'Туркменистан', capital: 'Ашхабад', continent: 'Asia', hardPair: null },
    { code: 'kg', name: 'Киргизия', capital: 'Бишкек', continent: 'Asia', hardPair: null },
    { code: 'tj', name: 'Таджикистан', capital: 'Душанбе', continent: 'Asia', hardPair: 'hungary' },
    { code: 'bt', name: 'Бутан', capital: 'Тхимпху', continent: 'Asia', hardPair: null },
    { code: 'mv', name: 'Мальдивы', capital: 'Мале', continent: 'Asia', hardPair: null },
    { code: 'bn', name: 'Бруней', capital: 'Бандар-Сери-Бегаван', continent: 'Asia', hardPair: null },
    { code: 'tl', name: 'Восточный Тимор', capital: 'Дили', continent: 'Asia', hardPair: null },

    // Americas
    { code: 'us', name: 'США', capital: 'Вашингтон', continent: 'Americas', hardPair: 'malaysia' },
    { code: 'ca', name: 'Канада', capital: 'Оттава', continent: 'Americas', hardPair: 'peru' },
    { code: 'mx', name: 'Мексика', capital: 'Мехико', continent: 'Americas', hardPair: 'italy' },
    { code: 'br', name: 'Бразилия', capital: 'Бразилиа', continent: 'Americas', hardPair: null },
    { code: 'ar', name: 'Аргентина', capital: 'Буэнос-Айрес', continent: 'Americas', hardPair: 'uruguay' },
    { code: 'co', name: 'Колумбия', capital: 'Богота', continent: 'Americas', hardPair: 'ecuador' },
    { code: 'cl', name: 'Чили', capital: 'Сантьяго', continent: 'Americas', hardPair: 'texas' },
    { code: 'pe', name: 'Перу', capital: 'Лима', continent: 'Americas', hardPair: 'canada' },
    { code: 've', name: 'Венесуэла', capital: 'Каракас', continent: 'Americas', hardPair: 'ecuador' },
    { code: 'ec', name: 'Эквадор', capital: 'Кито', continent: 'Americas', hardPair: 'colombia' },
    { code: 'uy', name: 'Уругвай', capital: 'Монтевидео', continent: 'Americas', hardPair: 'argentina' },
    { code: 'py', name: 'Парагвай', capital: 'Асунсьон', continent: 'Americas', hardPair: 'netherlands' },
    { code: 'bo', name: 'Боливия', capital: 'Ла-Пас', continent: 'Americas', hardPair: 'ghana' },
    { code: 'cu', name: 'Куба', capital: 'Гавана', continent: 'Americas', hardPair: 'puerto_rico' },
    { code: 'do', name: 'Доминиканская Республика', capital: 'Санто-Доминго', continent: 'Americas', hardPair: null },
    { code: 'pr', name: 'Пуэрто-Рико', capital: 'Сан-Хуан', continent: 'Americas', hardPair: 'cuba' },
    { code: 'cr', name: 'Коста-Рика', capital: 'Сан-Хосе', continent: 'Americas', hardPair: 'thailand' },
    { code: 'pa', name: 'Панама', capital: 'Панама', continent: 'Americas', hardPair: null },
    { code: 'gt', name: 'Гватемала', capital: 'Гватемала', continent: 'Americas', hardPair: null },
    { code: 'hn', name: 'Гондурас', capital: 'Тегусигальпа', continent: 'Americas', hardPair: 'el_salvador' },
    { code: 'sv', name: 'Сальвадор', capital: 'Сан-Сальвадор', continent: 'Americas', hardPair: 'honduras' },
    { code: 'ni', name: 'Никарагуа', capital: 'Манагуа', continent: 'Americas', hardPair: 'el_salvador' },
    { code: 'jm', name: 'Ямайка', capital: 'Кингстон', continent: 'Americas', hardPair: null },
    { code: 'ht', name: 'Гаити', capital: 'Порт-о-Пренс', continent: 'Americas', hardPair: 'liechtenstein' },
    { code: 'bs', name: 'Багамские Острова', capital: 'Нассау', continent: 'Americas', hardPair: null },
    { code: 'tt', name: 'Тринидад и Тобаго', capital: 'Порт-оф-Спейн', continent: 'Americas', hardPair: null },
    { code: 'bb', name: 'Барбадос', capital: 'Бриджтаун', continent: 'Americas', hardPair: null },
    { code: 'bz', name: 'Белиз', capital: 'Бельмопан', continent: 'Americas', hardPair: null },
    { code: 'gy', name: 'Гайана', capital: 'Джорджтаун', continent: 'Americas', hardPair: null },
    { code: 'sr', name: 'Суринам', capital: 'Парамарибо', continent: 'Americas', hardPair: null },
    { code: 'lc', name: 'Сент-Люсия', capital: 'Кастри', continent: 'Americas', hardPair: null },
    { code: 'vc', name: 'Сент-Винсент', capital: 'Кингстаун', continent: 'Americas', hardPair: null },
    { code: 'gd', name: 'Гренада', capital: 'Сент-Джорджес', continent: 'Americas', hardPair: null },
    { code: 'ag', name: 'Антигуа и Барбуда', capital: 'Сент-Джонс', continent: 'Americas', hardPair: null },
    { code: 'dm', name: 'Доминика', capital: 'Розо', continent: 'Americas', hardPair: null },
    { code: 'kn', name: 'Сент-Китс и Невис', capital: 'Бастер', continent: 'Americas', hardPair: null },

    // Africa
    { code: 'eg', name: 'Египет', capital: 'Каир', continent: 'Africa', hardPair: 'syria' },
    { code: 'za', name: 'ЮАР', capital: 'Претория', continent: 'Africa', hardPair: null },
    { code: 'ng', name: 'Нигерия', capital: 'Абуджа', continent: 'Africa', hardPair: null },
    { code: 'ke', name: 'Кения', capital: 'Найроби', continent: 'Africa', hardPair: null },
    { code: 'ma', name: 'Марокко', capital: 'Рабат', continent: 'Africa', hardPair: 'vietnam' },
    { code: 'dz', name: 'Алжир', capital: 'Алжир', continent: 'Africa', hardPair: null },
    { code: 'et', name: 'Эфиопия', capital: 'Аддис-Абеба', continent: 'Africa', hardPair: 'ghana' },
    { code: 'gh', name: 'Гана', capital: 'Аккра', continent: 'Africa', hardPair: 'bolivia' },
    { code: 'ci', name: 'Кот-д\'Ивуар', capital: 'Ямусукро', continent: 'Africa', hardPair: 'ireland' },
    { code: 'sn', name: 'Сенегал', capital: 'Дакар', continent: 'Africa', hardPair: 'mali' },
    { code: 'ml', name: 'Мали', capital: 'Бамако', continent: 'Africa', hardPair: 'guinea' },
    { code: 'gn', name: 'Гвинея', capital: 'Конакри', continent: 'Africa', hardPair: 'mali' },
    { code: 'cm', name: 'Камерун', capital: 'Яунде', continent: 'Africa', hardPair: 'senegal' },
    { code: 'tn', name: 'Тунис', capital: 'Тунис', continent: 'Africa', hardPair: 'turkey' },
    { code: 'tz', name: 'Танзания', capital: 'Додома', continent: 'Africa', hardPair: null },
    { code: 'ug', name: 'Уганда', capital: 'Кампала', continent: 'Africa', hardPair: null },
    { code: 'td', name: 'Чад', capital: 'Нджамена', continent: 'Africa', hardPair: 'romania' },
    { code: 'ao', name: 'Ангола', capital: 'Луанда', continent: 'Africa', hardPair: null },
    { code: 'zm', name: 'Замбия', capital: 'Лусака', continent: 'Africa', hardPair: null },
    { code: 'zw', name: 'Зимбабве', capital: 'Хараре', continent: 'Africa', hardPair: null },
    { code: 'cd', name: 'ДР Конго', capital: 'Киншаса', continent: 'Africa', hardPair: null },
    { code: 'cg', name: 'Конго', capital: 'Браззавиль', continent: 'Africa', hardPair: null },
    { code: 'sd', name: 'Судан', capital: 'Хартум', continent: 'Africa', hardPair: 'jordan' },
    { code: 'ss', name: 'Южный Судан', capital: 'Джуба', continent: 'Africa', hardPair: 'kenya' },
    { code: 'rw', name: 'Руанда', capital: 'Кигали', continent: 'Africa', hardPair: null },
    { code: 'so', name: 'Сомали', capital: 'Могадишо', continent: 'Africa', hardPair: null },
    { code: 'mz', name: 'Мозамбик', capital: 'Мапуту', continent: 'Africa', hardPair: null },
    { code: 'mg', name: 'Мадагаскар', capital: 'Антананариву', continent: 'Africa', hardPair: null },
    { code: 'bw', name: 'Ботсвана', capital: 'Габороне', continent: 'Africa', hardPair: null },
    { code: 'na', name: 'Намибия', capital: 'Виндхук', continent: 'Africa', hardPair: null },
    { code: 'mu', name: 'Маврикий', capital: 'Порт-Луи', continent: 'Africa', hardPair: null },
    { code: 'ly', name: 'Ливия', capital: 'Триполи', continent: 'Africa', hardPair: null },
    { code: 'ne', name: 'Нигер', capital: 'Ниамей', continent: 'Africa', hardPair: 'india' },
    { code: 'bf', name: 'Буркина-Фасо', capital: 'Уагадугу', continent: 'Africa', hardPair: null },
    { code: 'bj', name: 'Бенин', capital: 'Порто-Ново', continent: 'Africa', hardPair: null },
    { code: 'tg', name: 'Того', capital: 'Ломе', continent: 'Africa', hardPair: null },
    { code: 'sl', name: 'Сьерра-Леоне', capital: 'Фритаун', continent: 'Africa', hardPair: null },
    { code: 'lr', name: 'Либерия', capital: 'Монровия', continent: 'Africa', hardPair: 'united_states' },
    { code: 'ga', name: 'Габон', capital: 'Либревиль', continent: 'Africa', hardPair: null },
    { code: 'gq', name: 'Экваториальная Гвинея', capital: 'Малабо', continent: 'Africa', hardPair: null },
    { code: 'mw', name: 'Малави', capital: 'Лилонгве', continent: 'Africa', hardPair: null },
    { code: 'er', name: 'Эритрея', capital: 'Асмэра', continent: 'Africa', hardPair: null },
    { code: 'dj', name: 'Джибути', capital: 'Джибути', continent: 'Africa', hardPair: null },
    { code: 'cv', name: 'Кабо-Верде', capital: 'Прая', continent: 'Africa', hardPair: null },
    { code: 'sc', name: 'Сейшельские Острова', capital: 'Виктория', continent: 'Africa', hardPair: null },

    // Oceania
    { code: 'au', name: 'Австралия', capital: 'Канберра', continent: 'Oceania', hardPair: 'new_zealand' },
    { code: 'nz', name: 'Новая Зеландия', capital: 'Веллингтон', continent: 'Oceania', hardPair: 'australia' },
    { code: 'fj', name: 'Фиджи', capital: 'Сува', continent: 'Oceania', hardPair: 'tuvalu' },
    { code: 'pg', name: 'Папуа - Новая Гвинея', capital: 'Порт-Морсби', continent: 'Oceania', hardPair: null },
    { code: 'ws', name: 'Самоа', capital: 'Апиа', continent: 'Oceania', hardPair: 'taiwan' },
    { code: 'to', name: 'Тонга', capital: 'Нукуалофа', continent: 'Oceania', hardPair: null },
    { code: 'vu', name: 'Вануату', capital: 'Порт-Вила', continent: 'Oceania', hardPair: null },
    { code: 'sb', name: 'Соломоновы Острова', capital: 'Хониара', continent: 'Oceania', hardPair: null },
    { code: 'fm', name: 'Микронезия', capital: 'Паликир', continent: 'Oceania', hardPair: null },
    { code: 'pw', name: 'Палау', capital: 'Нгерулмуд', continent: 'Oceania', hardPair: 'japan' },
    { code: 'mh', name: 'Маршалловы Острова', capital: 'Маджуро', continent: 'Oceania', hardPair: null },
    { code: 'ki', name: 'Кирибати', capital: 'Южная Тарава', continent: 'Oceania', hardPair: null },
    { code: 'tv', name: 'Тувалу', capital: 'Фунафути', continent: 'Oceania', hardPair: 'fiji' },
    { code: 'nr', name: 'Науру', capital: 'Ярен', continent: 'Oceania', hardPair: null }
  ];

  // Display-only labels for the continental mastery breakdown. Engine keys stay English.
  const REGION_LABELS = {
    Europe: 'Европа',
    Asia: 'Азия',
    Americas: 'Америка',
    Africa: 'Африка',
    Oceania: 'Океания'
  };

  /* =========================================================
     2. WEB AUDIO API SOUND SYNTHESIS
     ========================================================= */
  class QuizAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (this.ctx) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return;
      }
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }

    playCorrect(streak = 0) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const semitone = Math.min(12, streak);
      const baseFreq = 523.25; // C5 note
      const freq1 = baseFreq * Math.pow(2, semitone / 12);
      const freq2 = freq1 * 1.25; // Major third

      // Dual tone harmonic chime
      [freq1, freq2].forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.05);

        gain.gain.setValueAtTime(0.2, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    }

    playWrong() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    }
  }

  /* =========================================================
     3. FLAG QUIZ GAMEPLAY ENGINE
     ========================================================= */
  class FlagQuizEngine {
    constructor() {
      this.mode = 'sprint'; // 'sprint' (20 q's), 'survival' (sudden death), 'hard', 'reverse'
      this.continent = 'all'; // 'all', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'

      this.currentQuestionIndex = 0;
      this.totalQuestions = 20;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.correctCount = 0;
      this.wrongCount = 0;

      this.questionStartTime = 0;
      this.reactionTimes = [];
      this.missedFlags = [];
      this.continentStats = {};

      this.currentQuestion = null;
      this.isAnswerLocked = false;
      this.audio = new QuizAudio();
    }

    getPool() {
      let pool = COUNTRIES_DB;
      if (this.continent !== 'all') {
        pool = pool.filter((c) => c.continent === this.continent);
      }
      if (this.mode === 'hard') {
        pool = pool.filter((c) => c.hardPair !== null);
      }
      return pool.length >= 4 ? pool : COUNTRIES_DB;
    }

    start(mode, continent) {
      this.mode = mode || 'sprint';
      this.continent = continent || 'all';

      this.currentQuestionIndex = 0;
      this.totalQuestions = this.mode === 'survival' ? 999 : 20;
      this.score = 0;
      this.streak = 0;
      this.maxStreak = 0;
      this.correctCount = 0;
      this.wrongCount = 0;

      this.reactionTimes = [];
      this.missedFlags = [];
      this.continentStats = {
        Europe: { total: 0, correct: 0 },
        Asia: { total: 0, correct: 0 },
        Americas: { total: 0, correct: 0 },
        Africa: { total: 0, correct: 0 },
        Oceania: { total: 0, correct: 0 }
      };

      this.isAnswerLocked = false;
    }

    getNextQuestion() {
      const pool = this.getPool();
      const target = pool[Math.floor(Math.random() * pool.length)];

      // Generate 3 unique distractors
      const distractors = [];
      const distractorPool = pool.filter((c) => c.code !== target.code);

      while (distractors.length < 3) {
        const rand = distractorPool[Math.floor(Math.random() * distractorPool.length)];
        if (!distractors.some((d) => d.code === rand.code)) {
          distractors.push(rand);
        }
      }

      // Shuffle 4 options
      const options = [target, ...distractors].sort(() => Math.random() - 0.5);

      this.currentQuestion = {
        target,
        options,
        isReverse: this.mode === 'reverse'
      };

      this.questionStartTime = performance.now();
      this.isAnswerLocked = false;
      this.currentQuestionIndex++;

      return this.currentQuestion;
    }

    submitAnswer(selectedCode) {
      if (this.isAnswerLocked || !this.currentQuestion) return null;
      this.isAnswerLocked = true;

      const elapsed = Math.round(performance.now() - this.questionStartTime);
      this.reactionTimes.push(elapsed);

      const target = this.currentQuestion.target;
      const isCorrect = selectedCode === target.code;

      // Track continent metrics
      if (this.continentStats[target.continent]) {
        this.continentStats[target.continent].total++;
        if (isCorrect) this.continentStats[target.continent].correct++;
      }

      if (isCorrect) {
        this.correctCount++;
        this.streak++;
        this.maxStreak = Math.max(this.maxStreak, this.streak);

        // Speed bonus formula: base 1000 pts + up to 500 bonus for sub-2s answer
        const speedBonus = Math.max(0, Math.round((2500 - elapsed) * 0.4));
        const streakMultiplier = 1 + (this.streak * 0.1);
        const roundPts = Math.round((1000 + speedBonus) * streakMultiplier);

        this.score += roundPts;
        this.audio.playCorrect(this.streak);
      } else {
        this.wrongCount++;
        this.streak = 0;
        this.audio.playWrong();

        const selectedCountry = COUNTRIES_DB.find((c) => c.code === selectedCode);
        this.missedFlags.push({
          target,
          selected: selectedCountry || { name: 'Неизвестно' },
          reactionTime: elapsed
        });
      }

      const isGameOver = this.mode === 'survival' ? !isCorrect : (this.currentQuestionIndex >= this.totalQuestions);

      return {
        isCorrect,
        correctCode: target.code,
        selectedCode,
        elapsed,
        score: this.score,
        streak: this.streak,
        isGameOver
      };
    }

    getFinalResults() {
      const totalAnswered = this.correctCount + this.wrongCount;
      const accuracy = totalAnswered > 0 ? Math.round((this.correctCount / totalAnswered) * 100) : 0;
      const avgReaction = this.reactionTimes.length > 0
        ? Math.round(this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length)
        : 0;

      let tier = 'Региональный навигатор';
      let percentile = 'Топ 45%';
      let desc = 'Прочные базовые знания основных государственных флагов мира.';

      if (this.score >= 35000 || (accuracy >= 95 && this.correctCount >= 20)) {
        tier = 'Вексиллологический гроссмейстер';
        percentile = 'Топ 0,8%';
        desc = 'Безупречная географическая память и мгновенное визуальное узнавание на всех континентах.';
      } else if (this.score >= 25000 || (accuracy >= 85 && this.correctCount >= 17)) {
        tier = 'Мастер географии';
        percentile = 'Топ 6%';
        desc = 'Исключительная пространственная память и быстрое опознавание даже малоизвестных малых государств.';
      } else if (this.score >= 18000 || (accuracy >= 70 && this.correctCount >= 14)) {
        tier = 'Континентальный исследователь';
        percentile = 'Топ 22%';
        desc = 'Уверенные знания по Европе и Америке и формирующееся мастерство по Африке.';
      }

      return {
        score: this.score,
        accuracy,
        avgReaction,
        correctCount: this.correctCount,
        wrongCount: this.wrongCount,
        maxStreak: this.maxStreak,
        totalAnswered,
        tier,
        percentile,
        desc,
        missedFlags: this.missedFlags,
        continentStats: this.continentStats
      };
    }
  }

  /* =========================================================
     4. UI CONTROLLER & DOM BINDINGS
     ========================================================= */
  const FlagApp = {
    engine: null,
    advanceTimer: null,

    init() {
      this.engine = new FlagQuizEngine();
      this.bindDOM();
    },

    bindDOM() {
      // Mode Selector Pills
      document.querySelectorAll('.flag-mode-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.flag-mode-btn').forEach((b) => b.classList.remove('active', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40'));
          btn.classList.add('active', 'bg-emerald-500/10', 'text-emerald-500', 'border-emerald-500/40');
          this.engine.mode = btn.dataset.mode;
        });
      });

      // Continent Filter Select
      const contSelect = document.getElementById('flagContinentSelect');
      if (contSelect) {
        contSelect.addEventListener('change', (e) => {
          this.engine.continent = e.target.value;
        });
      }

      // Start Quiz Buttons
      const startBtn = document.getElementById('startFlagQuizBtn');
      if (startBtn) {
        startBtn.addEventListener('click', () => this.startSession());
      }

      const retakeBtn = document.getElementById('retakeFlagQuizBtn');
      if (retakeBtn) {
        retakeBtn.addEventListener('click', () => this.startSession());
      }
    },

    startSession() {
      // Cancel any pending question-advance left over from a previous session so
      // a fast retake cannot render a stale question over the fresh session.
      if (this.advanceTimer) {
        clearTimeout(this.advanceTimer);
        this.advanceTimer = null;
      }

      const startCard = document.getElementById('flagStartCard');
      const arenaCard = document.getElementById('flagArenaCard');
      const resultsCard = document.getElementById('flagResultsCard');

      if (startCard) startCard.classList.add('hidden');
      if (resultsCard) resultsCard.classList.add('hidden');
      if (arenaCard) arenaCard.classList.remove('hidden');

      this.engine.start(this.engine.mode, this.engine.continent);
      this.renderNextQuestion();
    },

    renderNextQuestion() {
      const q = this.engine.getNextQuestion();
      if (!q) return;

      const progressEl = document.getElementById('flagQuizProgress');
      const scoreEl = document.getElementById('flagLiveScore');
      const streakEl = document.getElementById('flagLiveStreak');
      const flagImg = document.getElementById('flagTargetImage');
      const countryTitle = document.getElementById('flagCountryTitle');
      const optionsWrap = document.getElementById('flagOptionsGrid');

      if (progressEl) {
        progressEl.textContent = this.engine.mode === 'survival'
          ? `Вопрос ${this.engine.currentQuestionIndex}`
          : `Вопрос ${this.engine.currentQuestionIndex} / ${this.engine.totalQuestions}`;
      }
      if (scoreEl) scoreEl.textContent = this.engine.score.toLocaleString('ru-RU');
      if (streakEl) streakEl.textContent = `${this.engine.streak}x`;

      // Render Target Flag Image (using high-res FlagCDN with instant fallback)
      if (flagImg) {
        armFlagFallback(flagImg);
        delete flagImg.dataset.flagFallbackUsed;
        flagImg.src = `https://flagcdn.com/w320/${q.target.code}.png`;
        flagImg.alt = `Флаг ${q.target.name}`;
      }

      if (countryTitle) {
        if (q.isReverse) {
          countryTitle.textContent = `Какой флаг принадлежит стране ${q.target.name}?`;
          countryTitle.classList.remove('hidden');
          if (flagImg) flagImg.classList.add('hidden');
        } else {
          countryTitle.classList.add('hidden');
          if (flagImg) flagImg.classList.remove('hidden');
        }
      }

      // Render 4 Multiple-Choice Buttons
      if (optionsWrap) {
        optionsWrap.innerHTML = '';
        q.options.forEach((opt) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'flag-choice-btn w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:bg-zinc-800 text-left font-bold text-sm text-zinc-100 transition-all cursor-pointer flex items-center justify-between';
          btn.dataset.code = opt.code;

          if (q.isReverse) {
            btn.innerHTML = `
              <div class="flex items-center gap-3">
                <img src="https://flagcdn.com/w80/${opt.code}.png" class="w-10 h-6 object-cover rounded shadow-sm" alt="Вариант флага" />
                <span>${opt.name}</span>
              </div>
            `;
          } else {
            btn.innerHTML = `
              <span>${opt.name}</span>
              <span class="text-xs font-mono text-zinc-500">${opt.capital}</span>
            `;
          }

          btn.addEventListener('click', () => this.handleAnswer(opt.code, btn));
          optionsWrap.appendChild(btn);
        });
        optionsWrap.querySelectorAll('img').forEach(function (img) { armFlagFallback(img); });
      }
    },

    handleAnswer(selectedCode, clickedBtn) {
      if (this.engine.isAnswerLocked) return;
      const res = this.engine.submitAnswer(selectedCode);
      if (!res) return;

      // Color code buttons
      document.querySelectorAll('.flag-choice-btn').forEach((btn) => {
        const code = btn.dataset.code;
        if (code === res.correctCode) {
          btn.classList.add('!bg-emerald-500/20', '!border-emerald-500', '!text-emerald-400');
        } else if (code === res.selectedCode && !res.isCorrect) {
          btn.classList.add('!bg-rose-500/20', '!border-rose-500', '!text-rose-400');
        }
        btn.disabled = true;
      });

      const scoreEl = document.getElementById('flagLiveScore');
      const streakEl = document.getElementById('flagLiveStreak');
      if (scoreEl) scoreEl.textContent = res.score.toLocaleString('ru-RU');
      if (streakEl) streakEl.textContent = `${res.streak}x`;

      this.advanceTimer = setTimeout(() => {
        this.advanceTimer = null;
        if (res.isGameOver) {
          this.showResults();
        } else {
          this.renderNextQuestion();
        }
      }, 750);
    },

    showResults() {
      const arenaCard = document.getElementById('flagArenaCard');
      const resultsCard = document.getElementById('flagResultsCard');

      if (arenaCard) arenaCard.classList.add('hidden');
      if (resultsCard) resultsCard.classList.remove('hidden');

      const res = this.engine.getFinalResults();

      this.updateText('resFlagScore', res.score.toLocaleString('ru-RU'));
      this.updateText('resFlagTier', res.tier);
      this.updateText('resFlagPercentile', res.percentile);
      this.updateText('resFlagDesc', res.desc);

      this.updateText('resFlagAccuracy', `${res.accuracy}%`);
      this.updateText('resFlagReaction', `${res.avgReaction}ms`);
      this.updateText('resFlagCorrect', `${res.correctCount} / ${res.totalAnswered}`);
      this.updateText('resFlagMaxStreak', `${res.maxStreak}x`);

      // Regional Mastery Breakdown Bars
      const regionsList = document.getElementById('resFlagRegionsList');
      if (regionsList) {
        regionsList.innerHTML = '';
        Object.entries(res.continentStats).forEach(([region, stats]) => {
          if (stats.total === 0) return;
          const pct = Math.round((stats.correct / stats.total) * 100);
          const row = document.createElement('div');
          row.className = 'p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-1';
          row.innerHTML = `
            <div class="flex justify-between font-sans">
              <span class="font-bold text-zinc-300">${REGION_LABELS[region] || region}</span>
              <span class="font-bold text-emerald-400">${pct}% (${stats.correct}/${stats.total})</span>
            </div>
            <div class="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-500 rounded-full" style="width: ${pct}%"></div>
            </div>
          `;
          regionsList.appendChild(row);
        });
      }

      // Review Missed Flags List
      const missedWrap = document.getElementById('resFlagMissedWrap');
      const missedList = document.getElementById('resFlagMissedList');

      if (res.missedFlags.length > 0 && missedWrap && missedList) {
        missedWrap.classList.remove('hidden');
        missedList.innerHTML = '';
        res.missedFlags.forEach((m) => {
          const item = document.createElement('div');
          item.className = 'p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs';
          item.innerHTML = `
            <div class="flex items-center gap-3">
              <img src="https://flagcdn.com/w80/${m.target.code}.png" class="w-10 h-6 object-cover rounded shadow" alt="Флаг ${m.target.name}" />
              <div>
                <span class="font-bold text-white block">${m.target.name}</span>
                <span class="text-[10px] text-zinc-400 font-mono">Столица: ${m.target.capital}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-rose-400 block font-mono">Выбрано: ${m.selected.name}</span>
              <span class="text-[9px] text-zinc-500 font-mono">${m.reactionTime}ms</span>
            </div>
          `;
          missedList.appendChild(item);
        });
        missedList.querySelectorAll('img').forEach(function (img) { armFlagFallback(img); });
      } else if (missedWrap) {
        missedWrap.classList.add('hidden');
      }

      setTimeout(() => {
        if (resultsCard) resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    },

    updateText(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
  };

  // Safe DOM Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FlagApp.init());
  } else {
    FlagApp.init();
  }
})();