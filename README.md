# karawana

Interaktywna mapa Bliskiego Wschodu: ofensywa Huti w Jemenie (lipiec–październik 2026).
Każdy news = osobna warstwa (`data.js` → `EVENTS`), z datą, opisem i źródłami. Suwak czasu, filtry kategorii, schematyczne strefy kontroli.

Statyczna strona (Leaflet w `vendor/`), serwowana przez gateway nginx na https://karawana.lakis.pro.
Aktualizacja: dopisz obiekt do `EVENTS` w `data.js` — zmiana jest od razu na żywo.
