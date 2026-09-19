(() => {
  'use strict';

  /* ------------------------------------------------------------------ *
   * PHQ-9 — Patient Health Questionnaire 9-item depression module
   * Spitzer, Williams & Kroenke. Scored 0–27 across 9 DSM-5 criterion
   * items over a 2-week recall window, plus a supplementary functional
   * impairment item (item 10) reported separately from the total.
   *
   * This engine produces screening information only. It is not a
   * diagnostic instrument and cannot establish or exclude a diagnosis.
   * ------------------------------------------------------------------ */

  const LIKERT_OPTIONS = [
    { value: 0, label: 'Ei lainkaan', detail: '0 päivää' },
    { value: 1, label: 'Useana päivänä', detail: '1–6 päivää' },
    { value: 2, label: 'Yli puolena päivistä', detail: '7–11 päivää' },
    { value: 3, label: 'Lähes joka päivä', detail: '12–14 päivää' }
  ];

  const FUNCTIONAL_OPTIONS = [
    { value: 0, label: 'Ei lainkaan vaikeaa', detail: 'Ei haittaa' },
    { value: 1, label: 'Jonkin verran vaikeaa', detail: 'Lievä haitta' },
    { value: 2, label: 'Erittäin vaikeaa', detail: 'Merkittävä haitta' },
    { value: 3, label: 'Äärimmäisen vaikeaa', detail: 'Vakava haitta' }
  ];

  const QUESTIONS = [
    {
      id: 1,
      axis: 'affective',
      context: 'Vähäinen kiinnostus tai ilo asioiden tekemisestä',
      text: 'Vähäinen kiinnostus tai ilo asioiden tekemisestä (anhedonia)'
    },
    {
      id: 2,
      axis: 'affective',
      context: 'Masentunut, surullinen tai toivoton olo',
      text: 'Masentunut, surullinen tai toivoton olo (depressed mood)'
    },
    {
      id: 3,
      axis: 'somatic',
      context: 'Vaikeuksia nukkua tai pysyä hereillä, tai nukkua liikaa',
      text: 'Vaikeuksia nukkua tai pysyä hereillä, tai nukkua liikaa (sleep)'
    },
    {
      id: 4,
      axis: 'somatic',
      context: 'Väsynyt tai vähäinen energia',
      text: 'Väsynyt tai vähäinen energia (fatigue)'
    },
    {
      id: 5,
      axis: 'somatic',
      context: 'Huono ruokahalu tai liiallinen syöminen',
      text: 'Huono ruokahalu tai liiallinen syöminen (appetite)'
    },
    {
      id: 6,
      axis: 'affective',
      context: 'Pahasta olosta itsestäsi — tai että olet epäonnistunut tai pettänyt itseäsi tai perhettä',
      text: 'Pahasta olosta itsestäsi — tai että olet epäonnistunut tai pettänyt itseäsi tai perhettä (worthlessness)'
    },
    {
      id: 7,
      axis: 'cognitive',
      context: 'Vaikeuksia keskittyä asioihin, kuten lehden lukemiseen tai television katsomiseen',
      text: 'Vaikeuksia keskittyä asioihin, kuten lehden lukemiseen tai television katsomiseen (concentration)'
    },
    {
      id: 8,
      axis: 'cognitive',
      context: 'Liikuta tai puhu niin hitaasti, että muut ovat huomanneet — tai päinvastoin, olla niin arastava tai levoton, että olet liikkunut paljon enemmän kuin tavallisesti',
      text: 'Liikuta tai puhu niin hitaasti, että muut ovat huomanneet — tai päinvastoin, olla niin arastava tai levoton, että olet liikkunut paljon enemmän kuin tavallisesti (psychomotor)'
    },
    {
      id: 9,
      axis: 'cognitive',
      context: 'Ajatuksia siitä, että sinun olisi parempi olla kuollut, tai satuttaa itseäsi jollain tavalla',
      text: 'Ajatuksia siitä, että sinun olisi parempi olla kuollut, tai satuttaa itseäsi jollain tavalla (self-harm, critical: true)',
      critical: true
    }
  ];

  const FUNCTIONAL_ITEM = {
    id: 10,
    axis: 'functional',
    context: 'Lisäkohte · Toimintahäiriö',
    text: 'Jos merkitsit jokin ongelmista, kuinka vaikeaksi nämä ongelmat ovat tehneet työssä asioiden hoitamisen, kotitöiden tekemisen tai muiden ihmisten kanssa toimeentulemisen?'
  };

  const TOTAL_STEPS = QUESTIONS.length + 1;

  const SEVERITY_BANDS = [
    {
      key: 'minimal',
      min: 0,
      max: 4,
      label: 'Ei merkittäviä masennusoireita',
      badge: 'Ei merkittäviä masennusoireita',
      tone: 'minimal',
      summary: 'Vastauksesi ovat alla kynnysarvon, joka yleensä liittyy kliinisesti merkittävään masennukseen.',
      narrative:
        'Kokonaispisteesi on vähäisellä alueella. Tämä tarkoittaa, että olet ilmoittanut vähäisistä masennusoireista tai ilmoittanut niistä vain satunnaisesti viime kahden viikon aikana. Tällä alueella oleva pistemäärä ei tarkoita, että vaikeat tunteet olisivat merkittömiä — se tarkoittaa, että tämän instrumentin tallentama oirekuva ei ole tällä hetkellä korostunut.',
      steps: [
        'Tämän pistemäärän perusteella ei tarvita hoitoa.',
        'Jos sinulla on vielä vaikeuksia, pistemäärä ei ole koko totuus. Jatkuva ahdistus ansaitsee keskustelun ammattilaisen kanssa riippumatta numerosta.',
        'Uudelleenseuloa, jos mielialasi, unesi, energiasi tai kiinnostuksesi arjen asioihin muuttuu merkittävästi.',
        'Ylläpidä mielialaa suojelivia perusasioita: säännöllinen nukkumis- ja heräämisajat, päivänvalon altistuminen, aerobinen liikunta ja säännöllinen sosiaalinen kanssakäyminen.'
      ]
    },
    {
      key: 'mild',
      min: 5,
      max: 9,
      label: 'Lievät masennusoireet',
      badge: 'Lievät masennusoireet',
      tone: 'mild',
      summary: 'Olet ilmoittanut useista oireista matalalla tahtiin. Tämä on alla hoitokynnystä mutta yläpuolella täysin selkeää seulontaa.',
      narrative:
        'Lievällä alueella olevaa pistemäärää on parasta lukea varhaismerkkinä eikä tuomiona. Tällä tasolla olevat oireet usein reagoivat hyvin rakennettuihin käyttäytymiseen ja elämäntapainterventioihin, ja seuraavien viikkojen odotus on oikeutettu kliininen strategia — edellyttäen, että oireita todella seurataan. Uudelleenseuloa kahden neljän viikon kuluttua nähdäksesi, vakiuntuuko vai tiivistyykö oirekuva.',
      steps: [
        'Seuraavien viikkojen odotus on järkevällä tasolla, mutta sen pitäisi olla aktiivista: seuraa oireitasi sen sijaan, että odotat pahenemista.',
        'Käyttäytymisen aktivointi auttaa. Suunnittele pieniä, saavutettavissa olevia, aiemmin mieluisia aktiviteetteja, vaikka motivaatio ei olisikaan vielä saapunut — motivaatio seuraa yleensä toimintaa eikä edellistä sitä.',
        'Suojaa unirakennetta. Säännölliset heräämisajat ankkuroivat circadian rytmää tehokkaammin kuin säännölliset nukkumaanmenoaikat.',
        'Kohtuullisen intensiteetin aerobinen harjoittelu on mitattavissa oleva masennuslääke vaikutus tällä vakavuustasolla.',
        'Uudelleenseuloa kahden neljän viikon kuluttua ja hae ammattilaista neuvoa, jos pistemäärä nousee tai arjen toiminta heikkenee.'
      ]
    },
    {
      key: 'moderate',
      min: 10,
      max: 14,
      label: 'Kohtalaiset masennusoireet',
      badge: 'Kohtalaiset masennusoireet — kliininen arviointi suositellaan',
      tone: 'moderate',
      summary: 'Pistemääräsi täyttää PHQ-9 standardin kynnysarvon 10 todennäköisestä masennusoireyhtymästä.',
      narrative:
        'Pistemäärä 10 tai enemmän on laajimmin validoitu kynnysarvo PHQ-9:ssä, yhdistetystä herkkyydestä ja tarkkuudesta noin 88% suureen depressiiviseen häiriöön verrattuna rakennettuun kliiniseen haastatteluun. Tällä tasolla suositellaan muodollista kliinistä arviointia. Tämä on se piste, jossa rakennettua psykoterapiaa tai lääkityshoitoa yleensä harkitaan, ja jossa hyödyn ja seuraavien viikkojen odotuksen tasapaino kallistuu aktiivisia hoitoa kohti.',
      steps: [
        'Järjestä kliininen arviointi perusterveudenhuollon ammattilaisen, psykiatrin tai psykologin kanssa.',
        'Ota mukaan tämän yhteenvedon kopio. Rakennettu oirekirja lyhentää arviointia ja parantaa diagnostista tarkkuutta.',
        'Näyttöön perustuva psykoterapia — erityisesti kognitiivinen käyttäytymisterapia ja käyttäytymisen aktivointi — on vahvasti tuettu tällä vakavuustasolla.',
        'Keskustele, sopiiko lääkitys sinun historiasi mukaan, ja kysy odotettua aloitusaikaa, joka on tyypillisesti kaksi neljä viikkoa.',
        'Uudelleenseuloa kahden viikon välein, jos aloitat hoidon, jotta vaste voidaan mitata eikä arvata.'
      ]
    },
    {
      key: 'moderately-severe',
      min: 15,
      max: 19,
      label: 'Keskivaikeat masennusoireet',
      badge: 'Keskivaikeat masennusoireet — aktiivinen hoito osoitettu',
      tone: 'high',
      summary: 'Pistemääräsi on selvästi diagnostisen kynnysarvon yläpuolella ja alueella, jossa aktiivinen hoito on osoitettu.',
      narrative:
        'Tällä alueella olevat pistemäärät liittyvät suureen todennäköisyyteen suureen depressiiviseen häiriöön ja merkittävään toimintahäiriöön. Tällä tasolla yhdistetty hoito — psykoterapia plus lääkityshoito — yleensä voittaa kumpikaan yksinään, ja hoitamattomuuden riski on merkittävä. Jos olet hallinnut tätä ilman ammatillista tukea, tämä pistemäärä on selvä merkki siitä, että tasapaino on muuttunut.',
      steps: [
        'Hae kliinistä arviointia pikaisesti sen sijaan, että seuraisit tätä itse.',
        'Yhdistetty psykoterapia ja lääkityshoito on yleensä ensilinjan lähestymistapa tällä vakavuustasolla.',
        'Kysy ammattilaiseltasi toimintahäiriökohteesta tässä yhteenvedossa — se tallentaa häiriötä, jota oireiden kokonaismäärä yksin ei tallenna.',
        'Jos unesi, ruokahalusi tai energiasi ovat heikentyneet merkittävästi tai olet lopettanut perushuoltoasi, sano se selvästi vastaanottotilanteessa.',
        'Älä keskeytä tai muuta lääkitystä ilman lääkärin neuvoa ensin.'
      ]
    },
    {
      key: 'severe',
      min: 20,
      max: 27,
      label: 'Vaikeat masennusoireet',
      badge: 'Vaikeat masennusoireet — pikainen kattava arviointi',
      tone: 'severe',
      summary: 'Pistemääräsi on PHQ-9:n korkeimmalla vakavuusalueella.',
      narrative:
        'Pistemäärä 20 tai enemmän edustaa vakavaa oiretaakkaa ja liittyy suureen todennäköisyyteen suureen depressiiviseen häiriöön, merkittävään toimintahäiriöon ja kohonneeseen riskiin. Tämä oikeuttaa pikaisen, kattavan lääketieteellisen ja psykiatrisen arviointion. Tällä tasolla oleva vakavuus ei ole luonteen puute eikä pysyvä — se on hoidettavissa oleva kliininen tila, mutta se tarvitsee hoitoa eikä itsehoitoa.',
      steps: [
        'Järjestä kattava lääketieteellinen ja psykiatrisen arviointi pikaisesti. Jos et saa aikaa nopeasti, ota yhteyttä kriisipuhelinlinjaan tai kiireelliseen hoitoon.',
        'Pyydä luotettu henkilö auttamaan sinua koordinoimaan aikoja ja kuljetusta. Vaikea masennus heikentää juuri niitä toiminnallisia kykyjä, joita hoidon järjestämiseen tarvitaan.',
        'Yhdistetty lääkityshoito ja psykoterapia on standardi, ja ammattilaisesi voi keskustella muista toimenpiteistä, kuten sähköhoitosta tai ketamiiniin perustuvasta hoidosta vaikeissa tai hoitoresistenteissä tapauksissa.',
        'Anna tämän yhteenvedon kopio arvioijalle ja ole rehellinen itsetuhoisesta kohteesta — ammattilaiset kysyvät, koska se muuttaa hoitosuunnitelmaa, ei koska se muuttaa heidän suhtautumistaan sinuun.',
        'Jos sinulla on ajatuksia elämän päättämisestä tai itsensä vahingoittamisesta, ota yhteyttä hätäpalveluihin tai kriisipuhelinlinjaan nyt. Älä odota aikaa.'
      ]
    }
  ];

  const state = {
    currentStep: 0,
    answers: {},
    functional: undefined,
    transitionTimer: null,
    transitionLocked: false,
    sessionId: '',
    startedAt: null,
    crisisAcknowledged: false
  };

  const $ = (id) => document.getElementById(id);

  function sessionId() {
    return `PHQ9-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function announce(message) {
    const live = $('depression-live-region');
    if (live) live.textContent = message;
  }

  function answeredCount() {
    return Object.keys(state.answers).length + (state.functional !== undefined ? 1 : 0);
  }

  function currentItem() {
    return state.currentStep < QUESTIONS.length ? QUESTIONS[state.currentStep] : FUNCTIONAL_ITEM;
  }

  function currentOptions() {
    return state.currentStep < QUESTIONS.length ? LIKERT_OPTIONS : FUNCTIONAL_OPTIONS;
  }

  function currentValue() {
    const item = currentItem();
    return item.id === 10 ? state.functional : state.answers[item.id];
  }

  function setCurrentValue(value) {
    const item = currentItem();
    if (item.id === 10) state.functional = value;
    else state.answers[item.id] = value;
  }

  /* ---------------------------------------------------------------- *
   * Rendering
   * ---------------------------------------------------------------- */

  function renderQuestion() {
    const item = currentItem();
    const options = currentOptions();
    const selected = currentValue();
    const stepNumber = state.currentStep + 1;

    $('question-number').textContent =
      item.id === 10 ? 'Viimeinen kysymys' : `Kysymys ${item.id} / 9`;
    $('question-part').textContent =
      item.id === 10 ? 'Lisäkohte · Toimintahäiriö' : 'PHQ-9 · Viime 2 viikkoa';
    $('question-domain').textContent = axisLabel(item.axis);
    $('question-heading').textContent = item.text;
    $('question-context').textContent = item.context;

    const answered = answeredCount();
    $('progress-fill').style.width = `${Math.max(4, (stepNumber / TOTAL_STEPS) * 100)}%`;
    $('progress-label').textContent = `${Math.round((answered / TOTAL_STEPS) * 100)}% vastattu`;

    const container = $('likert-options');
    container.innerHTML = '';

    const isCritical = Boolean(item.critical);

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'likert-option';
      if (isCritical && option.value > 0) button.classList.add('safety-zone');
      if (selected === option.value) button.classList.add('selected');
      button.setAttribute('aria-pressed', selected === option.value ? 'true' : 'false');
      button.setAttribute('aria-label', `${option.label}: ${item.text}`);
      button.innerHTML = `
        <span class="likert-key">${index + 1}</span>
        <span class="likert-label">${option.label}</span>
        <span class="likert-detail">${option.detail}</span>
      `;
      button.addEventListener('click', () => selectAnswer(option.value));
      container.appendChild(button);
    });

    const safetyNote = $('question-safety-note');
    if (safetyNote) safetyNote.classList.toggle('hidden', !isCritical);

    $('back-button').disabled = state.currentStep === 0 || state.transitionLocked;
    $('next-button').disabled = selected === undefined || state.transitionLocked;
    $('next-button').textContent =
      state.currentStep === TOTAL_STEPS - 1 ? 'Näytä tulokseni' : 'Seuraava kysymys';

    announce(`Kysymys ${stepNumber} / ${TOTAL_STEPS}. ${item.text}`);
  }

  function axisLabel(axis) {
    if (axis === 'affective') return 'Affektiivinen · mieliala ja anhedonia';
    if (axis === 'somatic') return 'Somaattinen · neovegatiiviset oireet';
    if (axis === 'cognitive') return 'Kognitiivinen ja motorinen · keskittyminen, psikomineninen, toivo';
    return 'Toiminnallinen · arjen haitta';
  }

  function selectAnswer(value) {
    if (state.transitionLocked) return;

    setCurrentValue(value);

    // Safety interlock: any endorsement of item 9 pauses the flow so the
    // crisis panel is seen rather than skipped past on the way to results.
    const item = currentItem();
    if (item.id === 9 && value >= 1 && !state.crisisAcknowledged) {
      renderQuestion();
      openCrisisInterstitial();
      return;
    }

    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    renderQuestion();

    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;

      if (state.currentStep < TOTAL_STEPS - 1) {
        state.currentStep += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 180);
  }

  function goNext() {
    if (state.transitionLocked) return;
    if (currentValue() === undefined) return;

    if (state.currentStep < TOTAL_STEPS - 1) {
      state.currentStep += 1;
      renderQuestion();
    } else {
      displayResults();
    }
  }

  function goBack() {
    if (state.transitionLocked) return;
    if (state.currentStep > 0) {
      state.currentStep -= 1;
      renderQuestion();
    }
  }

  /* ---------------------------------------------------------------- *
   * Crisis interstitial — shown the moment item 9 is endorsed.
   * ---------------------------------------------------------------- */

  function openCrisisInterstitial() {
    const panel = $('crisis-interstitial');
    if (!panel) return;
    // Modal: hide the questionnaire so background Likert buttons and nav
    // controls cannot be clicked while the safety resources are showing.
    $('questionnaire-section')?.classList.add('hidden');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const focusTarget = $('crisis-continue');
    if (focusTarget) focusTarget.focus({ preventScroll: true });
    announce('Tukiresurssit ovat saatavilla. Katsos ennen jatkamista.');
  }

  function closeCrisisInterstitial() {
    const panel = $('crisis-interstitial');
    if (panel) panel.classList.add('hidden');
    state.crisisAcknowledged = true;
    state.transitionLocked = true;
    window.clearTimeout(state.transitionTimer);
    state.transitionTimer = window.setTimeout(() => {
      state.transitionTimer = null;
      state.transitionLocked = false;
      $('questionnaire-section')?.classList.remove('hidden');
      if (state.currentStep < TOTAL_STEPS - 1) {
        state.currentStep += 1;
        renderQuestion();
      } else {
        displayResults();
      }
    }, 120);
  }

  /* ---------------------------------------------------------------- *
   * Scoring
   * ---------------------------------------------------------------- */

  function calculateScores() {
    let total = 0;
    const axisTotals = { affective: 0, somatic: 0, cognitive: 0 };
    let elevatedItems = 0;
    let coreElevated = false;

    QUESTIONS.forEach((q) => {
      const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
      total += value;
      axisTotals[q.axis] += value;
      if (value >= 2) elevatedItems += 1;
      if ((q.id === 1 || q.id === 2) && value >= 2) coreElevated = true;
    });

    const band =
      SEVERITY_BANDS.find((entry) => total >= entry.min && total <= entry.max) ||
      SEVERITY_BANDS[SEVERITY_BANDS.length - 1];

    const item9 = Number.isFinite(state.answers[9]) ? state.answers[9] : 0;
    const functional = Number.isFinite(state.functional) ? state.functional : null;

    return {
      total,
      band,
      item9,
      item9Flag: item9 >= 1,
      functional,
      axisTotals,
      elevatedItems,
      coreElevated,
      meetsAlgorithm: elevatedItems >= 5 && coreElevated,
      meetsCutoff: total >= 10
    };
  }

  /* ---------------------------------------------------------------- *
   * Results
   * ---------------------------------------------------------------- */

  function updateBar(id, value, max) {
    const el = $(id);
    if (el) el.style.width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  }

  function axisStatus(value, max) {
    const ratio = value / max;
    if (ratio >= 0.67) return 'Selvästi koholla';
    if (ratio >= 0.45) return 'Koholla';
    if (ratio >= 0.22) return 'Lievästi koholla';
    return 'Alempi hyväksyntä';
  }

  function displayResults() {
    const results = calculateScores();

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.remove('hidden');
    $('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

    const crisisBanner = $('crisis-banner');
    if (crisisBanner) crisisBanner.classList.toggle('hidden', !results.item9Flag);

    const badge = $('result-badge');
    badge.textContent = results.band.badge;
    badge.className = `result-badge ${results.band.tone}`;

    $('result-classification').textContent = results.band.label;
    $('result-score').textContent = `${results.total} / 27`;
    $('result-narrative').textContent = results.band.narrative;

    $('affective-score').textContent = `${results.axisTotals.affective} / 9`;
    $('somatic-score').textContent = `${results.axisTotals.somatic} / 9`;
    $('cognitive-score').textContent = `${results.axisTotals.cognitive} / 9`;
    $('affective-status').textContent = axisStatus(results.axisTotals.affective, 9);
    $('somatic-status').textContent = axisStatus(results.axisTotals.somatic, 9);
    $('cognitive-status').textContent = axisStatus(results.axisTotals.cognitive, 9);

    updateBar('affective-bar', results.axisTotals.affective, 9);
    updateBar('somatic-bar', results.axisTotals.somatic, 9);
    updateBar('cognitive-bar', results.axisTotals.cognitive, 9);

    $('functional-score').textContent =
      results.functional === null ? 'Ei vastattu' : FUNCTIONAL_OPTIONS[results.functional].label;

    $('algorithm-status').textContent = results.meetsAlgorithm
      ? 'Täytetty — oirekuva vastaa suurta depressiivista häiriötä'
      : results.meetsCutoff
        ? 'Kokonaispisteet kynnysarvon yläpuolella, algoritmin kriteerit eivät täyty kokonaan'
        : 'Ei täytetty';

    $('cutoff-status').textContent = results.meetsCutoff
      ? 'Validoidun kynnysarvon 10 tasalla tai yläpuolella'
      : 'Validoidun kynnysarvon 10 alapuolella';

    $('next-steps-list').innerHTML = results.band.steps
      .map((step) => `<li class="next-step">${step}</li>`)
      .join('');

    renderMatrix(results);
    renderSeverityScale(results);
    renderPrintReport(results);
  }

  function renderMatrix(results) {
    const axes = [
      ['Affektiivinen (mieliala, anhedonia, syyllisyys)', results.axisTotals.affective, 9],
      ['Somaattinen (uni, energia, ruokahalu)', results.axisTotals.somatic, 9],
      ['Kognitiivinen / motorinen (keskittyminen, psikomineninen, toivo)', results.axisTotals.cognitive, 9],
      ['Oireiden leveys (kohteet pisteet ≥ 2)', results.elevatedItems, 9]
    ];

    $('profile-matrix').innerHTML = axes
      .map(([label, value, max]) => {
        const percent = Math.round(Math.max(0, Math.min(100, (value / max) * 100)));
        return `<div class="matrix-row"><div class="matrix-label"><span>${label}</span><strong>${value} / ${max}</strong></div><div class="matrix-track"><span style="width:${percent}%"></span></div></div>`;
      })
      .join('');
  }

  function renderSeverityScale(results) {
    const container = $('severity-scale');
    if (!container) return;

    container.innerHTML = SEVERITY_BANDS.map((band) => {
      const active = band.key === results.band.key;
      return `<div class="severity-tier${active ? ' active' : ''}">
        <span class="severity-range">${band.min}–${band.max}</span>
        <span class="severity-name">${band.label}</span>
        ${active ? '<span class="severity-marker">Olet tässä</span>' : ''}
      </div>`;
    }).join('');
  }

  function renderPrintReport(results) {
    const dateEl = $('report-date');
    if (!dateEl) return;

    dateEl.textContent = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date());
    $('report-session').textContent = state.sessionId;
    $('print-total').textContent = `${results.total} / 27 — ${results.band.label}`;
    $('print-cutoff').textContent = results.meetsCutoff
      ? 'Validoidun kynnysarvon 10 tasalla tai yläpuolella'
      : 'Validoidun kynnysarvon 10 alapuolella';
    $('print-algorithm').textContent = results.meetsAlgorithm ? 'Kriteerit täytetty' : 'Kriteerit eivät täytty';
    $('print-affective').textContent = `${results.axisTotals.affective} / 9`;
    $('print-somatic').textContent = `${results.axisTotals.somatic} / 9`;
    $('print-cognitive').textContent = `${results.axisTotals.cognitive} / 9`;
    $('print-functional').textContent =
      results.functional === null
        ? 'Ei vastattu'
        : FUNCTIONAL_OPTIONS[results.functional].label;
    $('print-item9').textContent = results.item9Flag
      ? `ILMOITETTU — ${LIKERT_OPTIONS[results.item9].label}`
      : 'Ei ilmoitettu';

    const crisisRow = $('print-crisis-row');
    if (crisisRow) crisisRow.classList.toggle('hidden', !results.item9Flag);

    $('print-answer-body').innerHTML = [
      ...QUESTIONS.map((q) => {
        const value = Number.isFinite(state.answers[q.id]) ? state.answers[q.id] : 0;
        const flagged = q.id === 9 && value >= 1;
        return `<tr${flagged ? ' class="flagged"' : ''}><td>${q.id}</td><td>${axisShort(q.axis)}</td><td>${q.text}</td><td>${value}</td><td>${LIKERT_OPTIONS[value].label}</td></tr>`;
      }),
      `<tr><td>10</td><td>Toiminnallinen</td><td>${FUNCTIONAL_ITEM.text}</td><td>${results.functional === null ? '—' : results.functional}</td><td>${results.functional === null ? 'Ei vastattu' : FUNCTIONAL_OPTIONS[results.functional].label}</td></tr>`
    ].join('');
  }

  function axisShort(axis) {
    if (axis === 'affective') return 'Affektiivinen';
    if (axis === 'somatic') return 'Somaattinen';
    return 'Kognitiivinen';
  }

  /* ---------------------------------------------------------------- *
   * Share / reset
   * ---------------------------------------------------------------- */

  async function shareResult() {
    const results = calculateScores();
    const text = `Suoritin FreeIQExam PHQ-9 masennusseulonnan. Pistemäärä: ${results.total}/27 (${results.band.label}). Tämä on seulontatietoa, ei diagnoosia.`;

    try {
      if (navigator.share) {
        await navigator.share({ title: 'FreeIQExam PHQ-9 seulonta', text, url: window.location.href });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showToast('Seulontayhteenveto kopioitu.');
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      showToast('Seulontayhteenveto kopioitu.');
    } catch (error) {
      if (error?.name !== 'AbortError') showToast('Jakaminen ei ollut käytettävissä.');
    }
  }

  function showToast(message) {
    const toast = $('share-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-3');
    window.setTimeout(() => toast.classList.add('opacity-0', 'translate-y-3'), 2200);
  }

  function resetAssessment() {
    window.clearTimeout(state.transitionTimer);

    state.currentStep = 0;
    state.answers = {};
    state.functional = undefined;
    state.transitionTimer = null;
    state.transitionLocked = false;
    state.crisisAcknowledged = false;
    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('results-section').classList.add('hidden');
    $('questionnaire-section').classList.add('hidden');
    $('crisis-interstitial')?.classList.add('hidden');
    $('crisis-banner')?.classList.add('hidden');
    $('assessment-intro').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    announce('Arviointi nollattu. Valmis aloittamaan uudelleen.');
  }

  /* ---------------------------------------------------------------- *
   * Init
   * ---------------------------------------------------------------- */

  function beginAssessment() {
    $('assessment-intro').classList.add('hidden');
    $('questionnaire-section').classList.remove('hidden');
    state.currentStep = 0;
    renderQuestion();
    $('questionnaire-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    if (!$('depression-app')) return;

    state.sessionId = sessionId();
    state.startedAt = Date.now();

    $('begin-assessment')?.addEventListener('click', beginAssessment);
    $('next-button')?.addEventListener('click', goNext);
    $('back-button')?.addEventListener('click', goBack);
    $('crisis-continue')?.addEventListener('click', closeCrisisInterstitial);
    $('share-result')?.addEventListener('click', shareResult);
    $('print-result')?.addEventListener('click', () => window.print());
    $('retake-result')?.addEventListener('click', resetAssessment);

    document.addEventListener('keydown', (event) => {
      // Crisis interstitial is modal: it captures its own keys.
      if ($('crisis-interstitial') && !$('crisis-interstitial').classList.contains('hidden')) {
        if (event.key === 'Escape' || event.key === 'Enter') {
          event.preventDefault();
          closeCrisisInterstitial();
        }
        return;
      }

      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName || '');
      if (typing) return;
      if ($('questionnaire-section')?.classList.contains('hidden')) return;

      if (['1', '2', '3', '4'].includes(event.key)) {
        event.preventDefault();
        selectAnswer(Number(event.key) - 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goBack();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    });

    $('questionnaire-section').classList.add('hidden');
    $('results-section').classList.add('hidden');
    $('crisis-interstitial')?.classList.add('hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();