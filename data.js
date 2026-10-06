// Dane warstw: każde zdarzenie (news) = osobna warstwa.
// Współrzędne miejscowości przybliżone; tam gdzie źródło nie podaje miejsca, zaznaczono to w opisie.
// geom: m = punkt [lat,lng,etykieta], arc = tor pocisku [z, do], arrow = oś natarcia [punkty...], poly = obszar [punkty...]

const P = {
  sanaa: [15.369, 44.191], sanaaAirport: [15.476, 44.219], saada: [16.94, 43.76], amran: [15.66, 43.94],
  hodeidah: [14.80, 42.95], hajjah: [15.69, 43.60], hays: [13.93, 43.48], khawkhah: [13.81, 43.26],
  mokha: [13.32, 43.25], dhubab: [12.94, 43.42], perim: [12.66, 43.42], hanish: [13.72, 42.73],
  babMandeb: [12.58, 43.33], taiz: [13.58, 44.02], jabalHabashi: [13.52, 43.83], maqbanah: [13.42, 43.66],
  waziiyah: [13.27, 43.62], samea: [13.47, 44.16], misrakh: [13.46, 44.06], turbah: [13.21, 43.95],
  safiya: [13.28, 44.33], aghbarah: [13.12, 43.80], arbaeen: [13.62, 44.03], jabalHan: [13.57, 43.92],
  marib: [15.46, 45.33], raghwan: [15.80, 45.05], helan: [15.42, 45.20], harib: [14.93, 45.50],
  alHazm: [16.16, 44.78], labanat: [16.08, 44.95], yatma: [16.62, 44.88], bayda: [13.98, 45.57],
  dhiNaim: [14.20, 45.28], dhale: [13.70, 44.73], bayhan: [14.80, 45.72], ain: [14.70, 45.55],
  markha: [14.55, 46.20], wadiah: [17.05, 47.10], aden: [12.79, 45.03], djibouti: [11.59, 43.15],
  riyadhKKIA: [24.96, 46.70], riyadh: [24.71, 46.68], jizan: [16.89, 42.55], jizanRef: [16.70, 42.66],
  yanbu: [24.09, 38.06], khamis: [18.30, 42.73], abha: [18.22, 42.50], najran: [17.49, 44.13],
  taif: [21.27, 40.42], mecca: [21.30, 39.85], eilat: [29.56, 34.95], beersheba: [31.25, 34.79],
  telAviv: [32.08, 34.78], benGurion: [32.00, 34.88], tehran: [35.69, 51.39]
};
const PT = (k, label) => [...P[k], label];

const CATS = {
  huti:    { name: 'Ofensywa lądowa Huti',        color: '#ef4444' },
  rakiety: { name: 'Uderzenia rakietowe/dronowe Huti', color: '#f97316' },
  morze:   { name: 'Morze / blokada',             color: '#eab308' },
  plc:     { name: 'Kontrofensywa rządu (PLC)',   color: '#3b82f6' },
  naloty:  { name: 'Naloty saudyjskie / koalicji', color: '#22d3ee' },
  human:   { name: 'Humanitarne',                 color: '#c084fc' },
  kontekst:{ name: 'Kontekst',                    color: '#9ca3af' }
};

// Schematyczne strefy kontroli (NIE dokładna linia frontu)
const ZONES = [
  { id: 'z-huti-core', name: 'Strefa Huti (rdzeń sprzed 2026, schemat)', color: '#ef4444', date: '2026-07-01',
    pts: [[17.35,43.25],[17.45,44.10],[16.95,44.60],[16.60,45.00],[16.05,45.05],[15.80,44.95],[15.55,45.15],[15.20,45.15],[14.95,45.30],[14.50,45.10],[14.10,44.90],[13.85,44.60],[13.70,44.30],[13.70,44.10],[13.62,43.95],[13.75,43.80],[14.05,43.55],[14.55,43.20],[14.70,42.95],[15.20,42.70],[15.90,42.75],[16.40,42.80],[16.80,42.85],[17.35,43.25]] },
  { id: 'z-coast', name: 'Wybrzeże zdobyte przez Huti 10–11.09 (schemat)', color: '#dc2626', date: '2026-09-10',
    pts: [[14.05,43.55],[13.75,43.80],[13.62,43.70],[13.30,43.55],[12.95,43.55],[12.62,43.50],[12.62,43.33],[12.90,43.38],[13.30,43.22],[13.75,43.22],[14.05,43.12],[14.05,43.55]] }
];

const EVENTS = [
  // ---- KONTEKST ----
  { id: 'iran-war', cat: 'kontekst', date: '2026-03-28', title: 'Huti dołączają do wojny z Iranem',
    text: 'Po ataku USA i Izraela na Iran (28.02.2026) Huti po miesiącu powściągliwości włączają się do wojny (28.03). Od marca do czerwca ostrzał Izraela: Beer Szewa, Ejlat, okolice Tel Awiwu, lotnisko Ben Guriona.',
    geom: [{ arc: [P.sanaa, P.beersheba] }, { arc: [P.sanaa, P.eilat] }, { arc: [P.sanaa, P.telAviv] },
           { m: PT('eilat','Ejlat (28.03, 6.04, 9.06)') }, { m: PT('beersheba','Beer Szewa (28.03)') }, { m: PT('telAviv','Tel Awiw (2.04, 8.06)') }, { m: PT('benGurion','Ben Gurion (4.04)') }],
    src: [['Wikipedia: 2026 Houthi strikes on Israel','https://en.wikipedia.org/wiki/2026_Houthi_strikes_on_Israel']] },

  { id: 'sanaa-airport', cat: 'naloty', date: '2026-07-13', title: 'Lotnisko w Sanie zbombardowane — koniec rozejmu',
    text: 'Samolot Mahan Air z dowódcami IRGC próbuje lądować w Sanie. Rząd Jemenu i Arabia Saudyjska bombardują pas startowy. Huti ogłaszają koniec rozejmu z 2022 r. z rządem i Arabią Saudyjską.',
    geom: [{ m: PT('sanaaAirport','Lotnisko Sana') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  { id: 'blockade', cat: 'morze', date: '2026-07-20', title: 'Huti ogłaszają blokadę morską Arabii Saudyjskiej',
    text: 'Huti ogłaszają blokadę morską Arabii Saudyjskiej na Morzu Czerwonym (w odpowiedzi na „saudyjskie oblężenie Jemenu”). Wcześniej grozili zamknięciem Bab al-Mandab, jeśli USA uderzą w irańską energetykę. We wrześniu Saree twierdził, że trafiono saudyjski okręt desantowy z eskortą (bez potwierdzenia).',
    geom: [{ poly: [[20.5,38.7],[20.5,39.9],[18.0,41.3],[16.0,42.4],[14.5,42.75],[13.2,43.2],[12.6,43.45],[12.5,43.3],[13.0,43.0],[14.0,42.4],[15.8,41.6],[18.0,40.3],[20.5,38.7]], label: 'Strefa deklarowanej blokady (schemat)' }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives'], ['Crypto Briefing: atak na saudyjski okręt','https://cryptobriefing.com/houthis-missile-attack-saudi-ship-red-sea/']] },

  { id: 'hodeidah-jul', cat: 'naloty', date: '2026-07-24', title: 'Saudyjskie naloty na Hudajdę',
    text: 'Arabia Saudyjska bombarduje cele Huti w Hudajdzie w odwecie za ataki na Morzu Czerwonym.',
    geom: [{ m: PT('hodeidah','Hudajda') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  { id: 'jizan-yanbu', cat: 'rakiety', date: '2026-07-26', title: 'Atak na rafinerię w Dżizanie i Janbu',
    text: 'Huti uderzają w rafinerię w Dżizanie i port Janbu nad Morzem Czerwonym. 6.08 zaczynają ostrzał sił rządowych w całym kraju rakietami i dronami.',
    geom: [{ arc: [P.saada, P.jizanRef] }, { arc: [P.sanaa, P.yanbu] }, { m: PT('jizanRef','Rafineria Dżizan') }, { m: PT('yanbu','Janbu') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  // ---- WRZESIEŃ ----
  { id: 'taiz-launch', cat: 'huti', date: '2026-09-03', title: 'Start ofensywy Huti w Taizz',
    text: '„Operacja Bóg jest potężniejszy…” — zmasowane natarcie w prowincji Taizz, cel: przeciąć drogę Taizz–Mocha. Co najmniej 129 zabitych w pierwszych starciach. Walki także w Al-Bajdzie, Ad-Dali i Hudajdzie. 4.09 rząd odbija wzgórza al-Chazan i al-Makahna (Dżabal Habaszi).',
    geom: [{ arrow: [P.taiz, P.jabalHabashi, P.maqbanah, [13.38,43.45], P.mokha] }, { m: PT('jabalHabashi','Dżabal Habaszi') }, { m: PT('maqbanah','Makbana') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives'], ['Al Jazeera 4.09','https://www.aljazeera.com/news/2026/9/4/houthi-attacks-on-yemens-taiz-escalate-triggering-new-displacement-wave']] },

  { id: 'jawf-plc', cat: 'plc', date: '2026-09-07', title: 'Rząd naciera w Al-Dżauf',
    text: 'PLC przejmuje obóz Al-Labanat i idzie na Al-Hazm; 8.09 zdobywa Jatmę i ogłasza ofensywę na Sanę. Według Huti saudyjski nalot na więzienie w Al-Hazm zabił 23 osoby. Rakieta trafia konwój w Hadramaucie zmierzający do bazy Al-Wadiah.',
    geom: [{ arrow: [[15.95,45.25], P.labanat, P.alHazm] }, { m: PT('labanat','Obóz Al-Labanat') }, { m: PT('yatma','Jatma (8.09)') }, { m: PT('alHazm','Al-Hazm — nalot na więzienie') }, { m: PT('wadiah','Konwój → Al-Wadiah') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  { id: 'bayda', cat: 'plc', date: '2026-09-08', title: 'Siły rządowe pod Dhi Na’im (Al-Bajda)',
    text: 'Siły prorządowe docierają na przedmieścia dystryktu Dhi Na’im w prowincji Al-Bajda.',
    geom: [{ arrow: [[13.95,45.55], P.dhiNaim] }, { m: PT('dhiNaim','Dhi Na’im') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  { id: 'saudi-south-0809', cat: 'rakiety', date: '2026-09-08', title: 'Salwy na południe Arabii Saudyjskiej',
    text: 'Drony i rakiety na Chamis Muszajt, Abhę, Dżizan i Nadżran — 73 rannych, uszkodzone instalacje naftowe. Tego samego dnia ostrzał Huti zabija 2 dzieci w obozie przesiedleńców w Maribie.',
    geom: [{ arc: [P.saada, P.khamis] }, { arc: [P.saada, P.abha] }, { arc: [P.saada, P.jizan] }, { arc: [P.saada, P.najran] },
           { m: PT('khamis','Chamis Muszajt') }, { m: PT('abha','Abha') }, { m: PT('jizan','Dżizan') }, { m: PT('najran','Nadżran') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives'], ['Al Jazeera 8.09','https://www.aljazeera.com/news/2026/9/8/saudi-houthi-fighting-in-yemen-escalates-what-happened-and-whats-next']] },

  { id: 'coast-collapse', cat: 'huti', date: '2026-09-10', title: 'Błyskawiczne natarcie wzdłuż wybrzeża: Hajs → Mocha → Bab al-Mandab',
    text: '10.09 Huti zdobywają Hajs, Al-Chauchę i port Mocha; siły rządowe wycofują się do Zubabu. 11.09 padają Zubab i wyspa Perim (Majjun) w cieśninie Bab al-Mandab, obóz al-Omari; niepotwierdzone doniesienia o Wyspach Hanisz. Huti ogłaszają kontrolę całego wybrzeża Morza Czerwonego (ok. 150 km) poza dystryktem Midi. Do niewoli trafia gen. bryg. Faruk al-Chaulani.',
    geom: [{ arrow: [P.hays, P.khawkhah, P.mokha, P.dhubab, P.perim] }, { m: PT('hays','Hajs (10.09)') }, { m: PT('khawkhah','Al-Chaucha (10.09)') }, { m: PT('mokha','Mocha (10.09)') }, { m: PT('dhubab','Zubab (11.09)') }, { m: PT('perim','Perim / Majjun (11.09)') }, { m: PT('hanish','Wyspy Hanisz (niepotw.)') }],
    zone: 'z-coast',
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives'], ['China Daily HK 2.10','https://www.chinadailyhk.com/article/640455']] },

  { id: 'f15', cat: 'rakiety', date: '2026-09-15', title: 'Taif, dron pod Mekką, zestrzelony F-15',
    text: '15.09 rakiety i drony na Chamis Muszajt, Abhę i Taif — 13 rannych cywilów; tego dnia Huti ruszają też z natarciem w Al-Dżauf. 16.09 saudyjska OPL strąca drona na południe od Mekki (Huti zaprzeczają, że celem była Mekka). Huti publikują nagranie rzekomo zestrzelonego F-15SR — źródła nie podają miejsca.',
    geom: [{ arc: [P.saada, P.taif] }, { arc: [P.saada, P.mecca] }, { m: PT('taif','Taif (15.09)') }, { m: PT('mecca','Dron strącony na pd. od Mekki (16.09)') }],
    src: [['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives'], ['CNN 17.09: F-15','https://www.cnn.com/2026/09/17/middleeast/houthi-saudi-f15-shootdown-intl-hnk-ml']] },

  { id: 'riyadh-kkia', cat: 'rakiety', date: '2026-09-19', title: 'Rijad: pożar składu paliwa lotniczego Aramco',
    text: 'Ok. 3:00 wybuchy przy lotnisku King Khalid; płonie skład paliwa lotniczego Aramco obok lotniska. Duże opóźnienia i odwołane loty, brak ofiar. Pierwsze bezpośrednie trafienie infrastruktury Rijadu od lipca. Kilka godzin wcześniej RB ONZ potępiła ataki Huti.',
    geom: [{ arc: [P.sanaa, P.riyadhKKIA] }, { m: PT('riyadhKKIA','Lotnisko KKIA + skład paliwa Aramco') }],
    src: [['Crypto Briefing (rel. agencyjna)','https://cryptobriefing.com/houthi-air-attack-riyadh-jet-fuel/']] },

  { id: 'taiz-fronts', cat: 'huti', date: '2026-10-01', title: 'Najcięższe od lat walki o Taizz — 5 frontów',
    text: 'Huti atakują jednocześnie na wielu odcinkach: nowy front w Sami’, walki w Bani Bakari (Dżabal Habaszi), Humajr (Makbana), Al-Akrud (Al-Misrach), duży atak na Al-Arba’in na północ od miasta odparty. Starcia w Lahidżu (Al-Aghbara) i na 4 frontach w Szabwie (Harib, Ajn, Bajhan, Górna Markha). Rząd: 30 zabitych i 50 rannych Huti w Al-Akrud.',
    geom: [{ m: PT('samea','Sami’ — nowy front') }, { m: PT('jabalHabashi','Bani Bakari') }, { m: PT('maqbanah','Humajr') }, { m: PT('misrakh','Al-Akrud / Al-Misrach') }, { m: PT('arbaeen','Al-Arba’in') }, { m: PT('aghbarah','Al-Aghbara (Lahidż)') },
           { m: PT('harib','Harib') }, { m: PT('ain','Ajn') }, { m: PT('bayhan','Bajhan') }, { m: PT('markha','Górna Markha') }],
    src: [['Asharq Al-Awsat 2.10','https://english.aawsat.com/arab-world/5325089-taiz-repels-simultaneous-houthi-attacks-fiercest-fighting-years'], ['China Daily HK 2.10','https://www.chinadailyhk.com/article/640455']] },

  { id: 'aramco-oct', cat: 'rakiety', date: '2026-10-03', title: 'Rakiety i drony na Aramco w Rijadzie',
    text: 'Rzecznik Huti Jahja Saree ogłasza atak rakietami balistycznymi i dronami na instalację Aramco w Rijadzie. To bezpośredni pretekst do ogłoszenia rządowej kontrofensywy następnego dnia.',
    geom: [{ arc: [P.sanaa, P.riyadh] }, { m: PT('riyadh','Aramco, Rijad') }],
    src: [['Haaretz 5.10','https://www.haaretz.com/middle-east-news/2026-10-05/ty-article/saudi-backed-yemeni-government-launches-military-campaign-against-houthis/000001a1-0ae5-dfcd-a1a5-aaefe5190000'], ['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  { id: 'taiz-cut', cat: 'huti', date: '2026-10-04', title: 'Taizz odcięte od Adenu: Al-Safija i At-Turba',
    text: 'Huti zajmują rejon Al-Safija i posterunek policji, przecinając główną drogę Taizz–Aden; po wycofaniu się sił PLC zdobywają miasto At-Turba. Taizz otoczone od północy, wschodu i zachodu. Lokalizacja Al-Safiji przybliżona.',
    geom: [{ arrow: [[13.45,44.30], P.safiya] }, { arrow: [P.jabalHabashi, P.turbah] }, { m: PT('safiya','Al-Safija — droga przecięta (przybl.)') }, { m: PT('turbah','At-Turba') },
           { line: [P.taiz, P.safiya, [13.05,44.55], [12.90,44.85], P.aden], label: 'Droga Taizz–Aden (schemat)' }],
    src: [['France 24 4.10','https://www.france24.com/en/middle-east/20261004-yemen-leader-announces-counter-offensive-as-houthis-cut-off-supply-route-besieged-city-taiz'], ['Wikipedia: 2026 Yemen offensives','https://en.wikipedia.org/wiki/2026_Yemen_offensives']] },

  { id: 'yemen-dawn', cat: 'naloty', date: '2026-10-04', title: '„Świt Jemenu”: 100 myśliwców, 324 cele',
    text: 'Prezydent Raszad al-Alimi ogłasza operację odzyskania „pozostałych terytoriów republiki”. Koalicja: 100 samolotów, 324 cele „wysokiej wartości” zniszczone na starcie, 97 nalotów 4.10. Uderzenia w Sanie (rejony Sanhan, Sawan), Saadzie, Al-Dżauf i pod Taizz.',
    geom: [{ m: PT('sanaa','Sana: Sanhan, Sawan') }, { m: PT('saada','Sa’da') }, { m: PT('alHazm','Al-Dżauf') }, { m: PT('amran','Amran') }],
    src: [['The National 5.10','https://www.thenationalnews.com/news/gulf/2026/10/05/yemen-government-forces-claim-bab-al-mandeb-gains-as-saudi-coalition-says-100-jets-join-houthi-offensive/'], ['France 24 4.10','https://www.france24.com/en/middle-east/20261004-yemen-leader-announces-counter-offensive-as-houthis-cut-off-supply-route-besieged-city-taiz']] },

  { id: 'mandeb-back', cat: 'plc', date: '2026-10-05', title: 'Rząd twierdzi: odbite Zubab, Mocha i Bab al-Mandab',
    text: 'Brygady Gigantów, Siły Tarczy Narodu, Opór Tihamy: odbity Zubab z lotniskiem, droga Zubab–Mocha i port Mocha. Setki bojowników Huti okrążone w Zubabie, część uciekła łodziami. Perim pozostaje przy Huti. Twierdzenia jednej strony — niepotwierdzone niezależnie.',
    geom: [{ arrow: [[12.75,43.75], P.dhubab, P.mokha] }, { m: PT('dhubab','Zubab + lotnisko') }, { m: PT('mokha','Mocha (wg rządu)') }, { m: PT('babMandeb','Bab al-Mandab') }],
    src: [['The National 5.10','https://www.thenationalnews.com/news/gulf/2026/10/05/yemen-government-forces-claim-bab-al-mandeb-gains-as-saudi-coalition-says-100-jets-join-houthi-offensive/'], ['Al Jazeera 5.10','https://www.aljazeera.com/news/2026/10/5/yemen-war-escalates-whats-the-latest-on-the-battlefield']] },

  { id: 'marib', cat: 'plc', date: '2026-10-05', title: 'Front Marib: natarcie na Raghwan, naloty pod Dżabal Helan',
    text: 'Siły rządowe atakują pozycje Huti na froncie Raghwan (północ prowincji), równolegle naloty: pozycje przy Dżabal Helan, skład broni i posiłki na pn.-zach. od Maribu. Marib = największe złoża ropy i gazu; Huti chcą eksportować ropę przez Morze Czerwone.',
    geom: [{ arrow: [[15.55,45.30], P.raghwan] }, { m: PT('raghwan','Front Raghwan') }, { m: PT('helan','Dżabal Helan') }, { m: PT('marib','Marib') }],
    src: [['Al Jazeera 5.10','https://www.aljazeera.com/news/2026/10/5/yemen-war-escalates-whats-the-latest-on-the-battlefield'], ['Ynet','https://www.ynetnews.com/article/ry4kaeeqfx']] },

  { id: 'humanitarian', cat: 'human', date: '2026-10-05', title: '200 tys. przesiedlonych, uchodźcy do Dżibuti, cholera',
    text: 'Od 6.08: ponad 5000 ofiar (959 zabitych), ok. 200 tys. przesiedlonych, 3600+ osób przepłynęło do Dżibuti. Liczba przypadków cholery potroiła się w 3 tygodnie.',
    geom: [{ arc: [P.dhubab, P.djibouti] }, { m: PT('djibouti','Dżibuti: 3600+ uchodźców') }, { m: PT('taiz','Taizz — setki tys. IDP') }, { m: PT('marib','Marib — obozy IDP') }],
    src: [['The National 5.10','https://www.thenationalnews.com/news/gulf/2026/10/05/yemen-government-forces-claim-bab-al-mandeb-gains-as-saudi-coalition-says-100-jets-join-houthi-offensive/']] }
];
