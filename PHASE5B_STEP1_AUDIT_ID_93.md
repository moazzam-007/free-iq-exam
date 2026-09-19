# PHASE 5B STEP 1 — 93-route structural audit (worktree vs EN dc0d0ca)

| # | ID route | EN master | ID sec/lines | EN sec/lines | Class | Notes |
|---|---|---|---|---|---|---|
| 1 | `src/pages/id/404.astro` | `src/pages/404.astro` | 0sec/55l | 0sec/55l | MATCH | Sec 0==0 but lines differ 55 vs 55 (shallow pages, verify DOM manually) |
| 2 | `src/pages/id/about.astro` | `src/pages/about.astro` | 3sec/220l | 6sec/283l | FAMILY DRIFT | Info/trust family: ID 3sec/220l vs EN 6sec/283l |
| 3 | `src/pages/id/aim-trainer.astro` | `src/pages/aim-trainer.astro` | 0sec/3l | 9sec/809l | MISSING-OR-EXTRA STRUCTURE | 3-line 301 redirect to /id/pelatih-akurasi-aim; no EN structure transplanted |
| 4 | `src/pages/id/average-iq-by-age.astro` | `src/pages/average-iq-by-age.astro` | 5sec/344l | 5sec/345l | MATCH | Sec 5==5, lines 344 vs 345 |
| 5 | `src/pages/id/blog.astro` | `src/pages/blog.astro` | 2sec/174l | 3sec/229l | ISOLATED DRIFT | ID 2sec/174l vs EN 3sec/229l |
| 6 | `src/pages/id/contact.astro` | `src/pages/contact.astro` | 0sec/195l | 0sec/285l | MATCH | Sec 0==0 but lines differ 195 vs 285 (shallow pages, verify DOM manually) |
| 7 | `src/pages/id/fluid-reasoning-test.astro` | `src/pages/fluid-reasoning-test.astro` | 0sec/90l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 90l/0sec vs EN 180l/1sec |
| 8 | `src/pages/id/games.astro` | `src/pages/games.astro` | 2sec/434l | 3sec/576l | FAMILY DRIFT | Games family: ID 2sec/434l vs EN 3sec/576l |
| 9 | `src/pages/id/games/digit-span.astro` | `src/pages/games/digit-span.astro` | 2sec/869l | 2sec/890l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 10 | `src/pages/id/games/flanker-test.astro` | `src/pages/games/flanker-test.astro` | 2sec/800l | 2sec/821l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 11 | `src/pages/id/games/math-sprint.astro` | `src/pages/games/math-sprint.astro` | 2sec/911l | 2sec/933l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 12 | `src/pages/id/games/memory-matrix.astro` | `src/pages/games/memory-matrix.astro` | 2sec/774l | 2sec/984l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 13 | `src/pages/id/games/n-back.astro` | `src/pages/games/n-back.astro` | 2sec/941l | 2sec/946l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 14 | `src/pages/id/games/rotation.astro` | `src/pages/games/rotation.astro` | 2sec/894l | 2sec/909l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 15 | `src/pages/id/games/sequence-rush.astro` | `src/pages/games/sequence-rush.astro` | 2sec/810l | 2sec/827l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 16 | `src/pages/id/games/stroop-clash.astro` | `src/pages/games/stroop-clash.astro` | 2sec/889l | 2sec/969l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 17 | `src/pages/id/games/syllogism.astro` | `src/pages/games/syllogism.astro` | 2sec/1136l | 2sec/1150l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 18 | `src/pages/id/games/symbol-match.astro` | `src/pages/games/symbol-match.astro` | 2sec/920l | 2sec/934l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 19 | `src/pages/id/generator-white-noise-cokelat.astro` | `src/pages/brown-noise.astro` | 1sec/12l | 8sec/762l | MISSING-OR-EXTRA STRUCTURE | Stub shell: 12 lines / 1 sec vs EN 762 lines / 8 sec; preserves JS hook IDs in hidden div but missing guide/FAQ sections |
| 20 | `src/pages/id/hasil.astro` | `src/pages/results.astro` | 9sec/1317l | 10sec/1503l | ISOLATED DRIFT | ID 9sec/1317l vs EN 10sec/1503l |
| 21 | `src/pages/id/high-iq-societies.astro` | `src/pages/high-iq-societies.astro` | 4sec/388l | 7sec/755l | ISOLATED DRIFT | ID 4sec/388l vs EN 7sec/755l |
| 22 | `src/pages/id/index.astro` | `src/pages/index.astro` | 11sec/1542l | 10sec/1518l | ISOLATED DRIFT | ID 11sec/1542l vs EN 10sec/1518l |
| 23 | `src/pages/id/iq-classification-scale.astro` | `src/pages/iq-classification-scale.astro` | 5sec/410l | 7sec/544l | ISOLATED DRIFT | ID 5sec/410l vs EN 7sec/544l |
| 24 | `src/pages/id/iq-percentile-calculator.astro` | `src/pages/iq-percentile-calculator.astro` | 5sec/630l | 6sec/783l | ISOLATED DRIFT | ID 5sec/630l vs EN 6sec/783l |
| 25 | `src/pages/id/iq-score-chart.astro` | `src/pages/iq-score-chart.astro` | 6sec/561l | 6sec/527l | MATCH | Sec 6==6, lines 561 vs 527 |
| 26 | `src/pages/id/kalkulator-kalori.astro` | `src/pages/calorie-calculator.astro` | 1sec/36l | 9sec/877l | MISSING-OR-EXTRA STRUCTURE | Stub shell: 36 lines / 1 sec vs EN 877 lines / 9 sec; preserves JS hook IDs in hidden div but missing guide/FAQ sections |
| 27 | `src/pages/id/kalkulator-persentil-iq.astro` | `src/pages/iq-percentile-calculator.astro` | 5sec/630l | 6sec/783l | ISOLATED DRIFT | ID 5sec/630l vs EN 6sec/783l |
| 28 | `src/pages/id/kalkulator-tidur.astro` | `src/pages/sleep-calculator.astro` | 13sec/1928l | 15sec/2065l | ISOLATED DRIFT | ID 13sec/1928l vs EN 15sec/2065l |
| 29 | `src/pages/id/kebijakan-privasi.astro` | `src/pages/privacy.astro` | 5sec/121l | 6sec/150l | FAMILY DRIFT | Info/trust family: ID 5sec/121l vs EN 6sec/150l |
| 30 | `src/pages/id/komunitas-iq-tinggi.astro` | `src/pages/high-iq-societies.astro` | 4sec/388l | 7sec/755l | ISOLATED DRIFT | ID 4sec/388l vs EN 7sec/755l |
| 31 | `src/pages/id/kontak.astro` | `src/pages/contact.astro` | 0sec/195l | 0sec/285l | MATCH | Sec 0==0 but lines differ 195 vs 285 (shallow pages, verify DOM manually) |
| 32 | `src/pages/id/kuis-bendera-dunia.astro` | `src/pages/flag-quiz.astro` | 0sec/4l | 7sec/673l | MATCH | Alias wrapper imports kuis-bendera (full 7-sec render at runtime); section count 0 is import indirection |
| 33 | `src/pages/id/kuis-bendera.astro` | `src/pages/flag-quiz.astro` | 7sec/683l | 7sec/673l | MATCH | Sec 7==7, lines 683 vs 673 |
| 34 | `src/pages/id/latihan-tes-mensa.astro` | `src/pages/mensa-iq-test-practice.astro` | 6sec/391l | 6sec/341l | MATCH | Sec 6==6, lines 391 vs 341 |
| 35 | `src/pages/id/latihan.astro` | `src/pages/practice.astro` | 2sec/245l | 4sec/486l | ISOLATED DRIFT | ID 2sec/245l vs EN 4sec/486l |
| 36 | `src/pages/id/leaderboard.astro` | `src/pages/leaderboard.astro` | 1sec/109l | 3sec/234l | FAMILY DRIFT | Info/trust family: ID 1sec/109l vs EN 3sec/234l |
| 37 | `src/pages/id/lingkaran-kendali.astro` | `src/pages/circle-of-control.astro` | 1sec/9l | 8sec/751l | MISSING-OR-EXTRA STRUCTURE | Stub shell: 9 lines / 1 sec vs EN 751 lines / 8 sec; preserves JS hook IDs in hidden div but missing guide/FAQ sections |
| 38 | `src/pages/id/matrix-reasoning-test.astro` | `src/pages/matrix-reasoning-test.astro` | 3sec/224l | 5sec/411l | ISOLATED DRIFT | ID 3sec/224l vs EN 5sec/411l |
| 39 | `src/pages/id/memento-mori.astro` | `src/pages/memento-mori.astro` | 1sec/9l | 8sec/663l | MISSING-OR-EXTRA STRUCTURE | Stub shell: 9 lines / 1 sec vs EN 663 lines / 8 sec; preserves JS hook IDs in hidden div but missing guide/FAQ sections |
| 40 | `src/pages/id/mensa-iq-test-practice.astro` | `src/pages/mensa-iq-test-practice.astro` | 6sec/391l | 6sec/341l | MATCH | Sec 6==6, lines 391 vs 341 |
| 41 | `src/pages/id/methodology.astro` | `src/pages/methodology.astro` | 10sec/775l | 9sec/825l | ISOLATED DRIFT | ID 10sec/775l vs EN 9sec/825l |
| 42 | `src/pages/id/metodologi.astro` | `src/pages/methodology.astro` | 10sec/775l | 9sec/825l | ISOLATED DRIFT | ID 10sec/775l vs EN 9sec/825l |
| 43 | `src/pages/id/papan-peringkat.astro` | `src/pages/leaderboard.astro` | 1sec/109l | 3sec/234l | FAMILY DRIFT | Info/trust family: ID 1sec/109l vs EN 3sec/234l |
| 44 | `src/pages/id/pelatih-akurasi-aim.astro` | `src/pages/aim-trainer.astro` | 0sec/4l | 9sec/809l | MISSING-OR-EXTRA STRUCTURE | 4-line wrapper imports ./aim-trainer (which is redirect) = circular stub; EN aim-trainer has 9 sec/809 lines |
| 45 | `src/pages/id/permainan.astro` | `src/pages/games.astro` | 2sec/434l | 3sec/576l | FAMILY DRIFT | Games family: ID 2sec/434l vs EN 3sec/576l |
| 46 | `src/pages/id/permainan/click-speed-test.astro` | `src/pages/games/click-speed-test.astro` | 4sec/685l | 4sec/663l | SHARED-TEMPLATE DRIFT | Sec count MATCH (4) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 47 | `src/pages/id/permainan/digit-span.astro` | `src/pages/games/digit-span.astro` | 2sec/869l | 2sec/890l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 48 | `src/pages/id/permainan/flanker-test.astro` | `src/pages/games/flanker-test.astro` | 2sec/800l | 2sec/821l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 49 | `src/pages/id/permainan/math-sprint.astro` | `src/pages/games/math-sprint.astro` | 2sec/911l | 2sec/933l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 50 | `src/pages/id/permainan/memory-matrix.astro` | `src/pages/games/memory-matrix.astro` | 2sec/774l | 2sec/984l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 51 | `src/pages/id/permainan/n-back.astro` | `src/pages/games/n-back.astro` | 2sec/941l | 2sec/946l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 52 | `src/pages/id/permainan/rotasi-mental.astro` | `src/pages/games/rotation.astro` | 2sec/894l | 2sec/909l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 53 | `src/pages/id/permainan/rotation.astro` | `src/pages/games/rotation.astro` | 2sec/894l | 2sec/909l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 54 | `src/pages/id/permainan/sequence-rush.astro` | `src/pages/games/sequence-rush.astro` | 2sec/810l | 2sec/827l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 55 | `src/pages/id/permainan/silogisme.astro` | `src/pages/games/syllogism.astro` | 2sec/1136l | 2sec/1150l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 56 | `src/pages/id/permainan/simbol-cocok.astro` | `src/pages/games/symbol-match.astro` | 2sec/920l | 2sec/934l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 57 | `src/pages/id/permainan/stroop-clash.astro` | `src/pages/games/stroop-clash.astro` | 2sec/889l | 2sec/969l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 58 | `src/pages/id/permainan/syllogism.astro` | `src/pages/games/syllogism.astro` | 2sec/1136l | 2sec/1150l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 59 | `src/pages/id/permainan/symbol-match.astro` | `src/pages/games/symbol-match.astro` | 2sec/920l | 2sec/934l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 60 | `src/pages/id/permainan/tes-flanker.astro` | `src/pages/games/flanker-test.astro` | 2sec/800l | 2sec/821l | SHARED-TEMPLATE DRIFT | Sec count MATCH (2) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 61 | `src/pages/id/practice.astro` | `src/pages/practice.astro` | 2sec/245l | 4sec/486l | ISOLATED DRIFT | ID 2sec/245l vs EN 4sec/486l |
| 62 | `src/pages/id/privacy.astro` | `src/pages/privacy.astro` | 5sec/121l | 6sec/150l | FAMILY DRIFT | Info/trust family: ID 5sec/121l vs EN 6sec/150l |
| 63 | `src/pages/id/profil.astro` | `src/pages/profile.astro` | 2sec/137l | 4sec/978l | FAMILY DRIFT | Info/trust family: ID 2sec/137l vs EN 4sec/978l |
| 64 | `src/pages/id/profile.astro` | `src/pages/profile.astro` | 2sec/137l | 4sec/978l | FAMILY DRIFT | Info/trust family: ID 2sec/137l vs EN 4sec/978l |
| 65 | `src/pages/id/quantitative-reasoning-test.astro` | `src/pages/quantitative-reasoning-test.astro` | 0sec/89l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 89l/0sec vs EN 180l/1sec |
| 66 | `src/pages/id/quick-test.astro` | `src/pages/quick-test.astro` | 0sec/1053l | 0sec/1018l | MATCH | Sec 0==0, lines 1053 vs 1018 |
| 67 | `src/pages/id/rata-rata-iq-berdasarkan-usia.astro` | `src/pages/average-iq-by-age.astro` | 5sec/344l | 5sec/345l | MATCH | Sec 5==5, lines 344 vs 345 |
| 68 | `src/pages/id/results.astro` | `src/pages/results.astro` | 9sec/1317l | 10sec/1503l | ISOLATED DRIFT | ID 9sec/1317l vs EN 10sec/1503l |
| 69 | `src/pages/id/skala-klasifikasi-iq.astro` | `src/pages/iq-classification-scale.astro` | 5sec/410l | 7sec/544l | ISOLATED DRIFT | ID 5sec/410l vs EN 7sec/544l |
| 70 | `src/pages/id/spatial-reasoning-test.astro` | `src/pages/spatial-reasoning-test.astro` | 0sec/89l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 89l/0sec vs EN 180l/1sec |
| 71 | `src/pages/id/syarat-dan-ketentuan.astro` | `src/pages/terms.astro` | 4sec/107l | 5sec/117l | FAMILY DRIFT | Info/trust family: ID 4sec/107l vs EN 5sec/117l |
| 72 | `src/pages/id/tabel-skor-iq.astro` | `src/pages/iq-score-chart.astro` | 6sec/561l | 6sec/527l | MATCH | Sec 6==6, lines 561 vs 527 |
| 73 | `src/pages/id/tentang-kami.astro` | `src/pages/about.astro` | 3sec/220l | 6sec/283l | FAMILY DRIFT | Info/trust family: ID 3sec/220l vs EN 6sec/283l |
| 74 | `src/pages/id/terms.astro` | `src/pages/terms.astro` | 4sec/107l | 5sec/117l | FAMILY DRIFT | Info/trust family: ID 4sec/107l vs EN 5sec/117l |
| 75 | `src/pages/id/tes-adhd.astro` | `src/pages/adhd-test.astro` | 14sec/509l | 14sec/475l | MATCH | Sec 14==14, lines 509 vs 475 |
| 76 | `src/pages/id/tes-autisme.astro` | `src/pages/autism-test.astro` | 13sec/508l | 13sec/500l | MATCH | Sec 13==13, lines 508 vs 500 |
| 77 | `src/pages/id/tes-buta-warna.astro` | `src/pages/color-blind-test.astro` | 1sec/907l | 1sec/929l | MATCH | Sec 1==1, lines 907 vs 929 |
| 78 | `src/pages/id/tes-depresi.astro` | `src/pages/depression-test.astro` | 12sec/601l | 12sec/582l | SHARED-TEMPLATE DRIFT | Sec count MATCH (12) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 79 | `src/pages/id/tes-kecemasan.astro` | `src/pages/anxiety-test.astro` | 8sec/860l | 8sec/849l | MATCH | Sec 8==8, lines 860 vs 849 |
| 80 | `src/pages/id/tes-kecepatan-mengetik.astro` | `src/pages/typing-test.astro` | 6sec/618l | 8sec/718l | ISOLATED DRIFT | ID 6sec/618l vs EN 8sec/718l |
| 81 | `src/pages/id/tes-kuantitatif.astro` | `src/pages/quantitative-reasoning-test.astro` | 0sec/89l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 89l/0sec vs EN 180l/1sec |
| 82 | `src/pages/id/tes-mata.astro` | `src/pages/eye-test.astro` | 15sec/817l | 15sec/784l | SHARED-TEMPLATE DRIFT | Sec count MATCH (15) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 83 | `src/pages/id/tes-mikrofon.astro` | `src/pages/mic-test.astro` | 13sec/684l | 14sec/1117l | ISOLATED DRIFT | ID 13sec/684l vs EN 14sec/1117l |
| 84 | `src/pages/id/tes-penalaran-fluida.astro` | `src/pages/fluid-reasoning-test.astro` | 0sec/90l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 90l/0sec vs EN 180l/1sec |
| 85 | `src/pages/id/tes-penalaran-matriks.astro` | `src/pages/matrix-reasoning-test.astro` | 3sec/224l | 5sec/411l | FAMILY DRIFT | Reasoning-battery family: ID stub 224l/3sec vs EN 411l/5sec |
| 86 | `src/pages/id/tes-pendengaran.astro` | `src/pages/hearing-test.astro` | 7sec/918l | 7sec/910l | MATCH | Sec 7==7, lines 918 vs 910 |
| 87 | `src/pages/id/tes-singkat.astro` | `src/pages/quick-test.astro` | 0sec/1053l | 0sec/1018l | MATCH | Sec 0==0, lines 1053 vs 1018 |
| 88 | `src/pages/id/tes-spasial.astro` | `src/pages/spatial-reasoning-test.astro` | 0sec/89l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 89l/0sec vs EN 180l/1sec |
| 89 | `src/pages/id/tes-verbal.astro` | `src/pages/verbal-reasoning-test.astro` | 0sec/89l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 89l/0sec vs EN 180l/1sec |
| 90 | `src/pages/id/tes-waktu-reaksi.astro` | `src/pages/reaction-time-test.astro` | 6sec/1082l | 11sec/1566l | ISOLATED DRIFT | ID 6sec/1082l vs EN 11sec/1566l |
| 91 | `src/pages/id/tes.astro` | `src/pages/test.astro` | 0sec/1067l | 0sec/1042l | SHARED-TEMPLATE DRIFT | Sec count MATCH (0) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 92 | `src/pages/id/test.astro` | `src/pages/test.astro` | 0sec/1067l | 0sec/1042l | SHARED-TEMPLATE DRIFT | Sec count MATCH (0) but interaction tokens drift: ID uses active:scale-95/0.99 vs EN active:scale-[0.97/0.98] |
| 93 | `src/pages/id/verbal-reasoning-test.astro` | `src/pages/verbal-reasoning-test.astro` | 0sec/89l | 1sec/180l | FAMILY DRIFT | Reasoning-battery family: ID stub 89l/0sec vs EN 180l/1sec |

## Shared components (worktree vs dc0d0ca EN)
- `src/components/id/HeaderId.astro` (886l) vs `src/components/Header.astro` (1729l): SHARED-TEMPLATE DRIFT (see Step 2)
- `src/components/id/FooterId.astro` (106l) vs `src/components/Footer.astro` (151l): SHARED-TEMPLATE DRIFT (see Step 2)
- `src/components/id/LayoutId.astro` (168l) vs `src/layouts/Layout.astro` (236l): SHARED-TEMPLATE DRIFT (see Step 2)
- `src/components/id/CategoryTestRunnerId.astro` (1318l) vs `src/components/CategoryTestRunner.astro` (1317l): MATCH (CatRunner 1317 vs 1318)

## Prompt inventory-lock vs on-disk discrepancies (blockers)
- Prompt lists 68 root slugs including tes-iq, tes-kepribadian, tes-eq, tes-reaksi, tes-mengetik, kalkulator-tdee, tdee-calculator, trolley-problem, tentang, privasi, syarat, standar-psikometrik, masyarakat-iq-tinggi, brown-noise, sleep-calculator, calorie-calculator, circle-of-control, flag-quiz, aim-trainer (EN slugs) — NONE of these exist as files under src/pages/id/ on disk.
- On-disk 68 root files include hasil, tes, test, tes-singkat, quick-test, results, latihan, practice, latihan-tes-mensa, mensa-iq-test-practice, metodologi, methodology, tentang-kami, kontak, kebijakan-privasi, syarat-dan-ketentuan, profil, papan-peringkat, permainan, kuis-bendera, kuis-bendera-dunia, kalkulator-tidur, kalkulator-kalori, kalkulator-persentil-iq, generator-white-noise-cokelat, lingkaran-kendali, pelatih-akurasi-aim, tabel-skor-iq, skala-klasifikasi-iq, rata-rata-iq-berdasarkan-usia, komunitas-iq-tinggi, etc. — most NOT in prompt lock list.
- Count matches (68+10+15=93) but slug sets differ substantially. Recommendation: treat ON-DISK 93 as authoritative scope (frozen worktree), not prompt slug list, unless user directs renames/creations.
- EN tools.astro and preview-master-v3.astro have no ID counterpart (intentional; tools hub not localized). EN games/click-speed-test has no id/games counterpart (only id/permainan/click-speed-test).
- Duplicate coverage: 20+ EN concepts covered twice in ID (e.g., test=tes+test, quick=quick-test+tes-singkat, results=results+hasil, practice=practice+latihan, about=about+tentang-kami, contact=contact+kontak, privacy=privacy+kebijakan-privasi, terms=terms+syarat-dan-ketentuan, profile=profile+profil, leaderboard=leaderboard+papan-peringkat, games=games+permainan, mensa=mensa+latihan-tes-mensa, methodology=methodology+metodologi, flag-quiz=kuis-bendera+kuis-bendera-dunia, aim-trainer=aim-trainer+pelatih-akurasi-aim, rotation=rotation+rotasi-mental in permainan, etc.). No merges/renames per Phase 5B rule 4.