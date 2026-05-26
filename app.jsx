// React è già caricato tramite CDN
const { useState, useEffect, useCallback, useRef } = React;

const PC={1:"#1B4332",2:"#7B3F00",3:"#1a237e"};
const PL={1:"TRENO",2:"VAN",3:"FINALE"};
const PE={1:"🚄",2:"🚐",3:"✈️"};
const SC={ok:"#1B4332",bozza:"#856404",tbd:"#888",critical:"#C1121F"};
const SBG={ok:"#D8F3DC",bozza:"#FFF3CD",tbd:"#F5F5F5",critical:"#FFE5E5"};
const CY={bozza:"ok",ok:"tbd",tbd:"bozza"};
const CATS=[
  {k:"food",l:"🍜 Cibo",c:"#C62828"},{k:"acc",l:"🏠 Alloggio",c:"#1B4332"},
  {k:"move",l:"🚌 Trasporto",c:"#1565C0"},{k:"act",l:"🎌 Attività",c:"#6A1040"},
  {k:"shop",l:"🛍️ Shopping",c:"#7B3F00"},{k:"other",l:"💴 Altro",c:"#555"},
];
const MEMO_CATS=[
  {k:"conf",l:"✅ Confermati",c:"#1B4332"},{k:"pack",l:"🧳 Da portare",c:"#1565C0"},
  {k:"book",l:"⚠️ Da prenotare",c:"#C1121F"},{k:"know",l:"📚 Da sapere",c:"#1B4332"},
  {k:"idea",l:"💡 Idee",c:"#7B3F00"},{k:"doc",l:"📄 Documenti",c:"#555"},
];
const PRANGE={1:"28 MAG → 17 GIU · 21 notti",2:"18 GIU → 9 LUG · 22 notti",3:"9 LUG → 15 LUG · 7 notti FINALE"};
const TM={train:"🚆",shin:"🚄",local:"🚇",bus:"🚌",van:"🚐",ferry:"⛴️",plane:"✈️",walk:"🚶"};

// ========================================
// DATI ESTERNI: GUIDA, MAPPA, VALIGIA
// ========================================
const MAPPA_CONFIG = {
  embedUrl: "https://www.google.com/maps/d/u/0/embed?mid=1a6QEfV5NpZtAQ3dNUq9x3x8LQa91jkA&ehbc=2E312F",
  editUrl: "https://www.google.com/maps/d/u/0/edit?hl=it&mid=1a6QEfV5NpZtAQ3dNUq9x3x8LQa91jkA&ll=31.99517871990121%2C134.4167778&z=5",
  title: "🗺️ Mappa Itinerario Giappone 49 Giorni"
};

const GUIDA_INFO = {
  title: "📖 GUIDA DETTAGLIATA COMPLETA",
  subtitle: "Tutti i dettagli del viaggio - 49 giorni",
  fileLink: "GUIDA-DETTAGLIATA.md",
  description: "Per visualizzare la guida completa con tutti i dettagli, orari, consigli e chicche nascoste, apri il file GUIDA-DETTAGLIATA.md nella cartella del progetto.",
  sections: [
    { name: "FASE 1", range: "G1-11", desc: "Tokyo & Tōhoku - TeamLab, Nikkō, Sendai, Tazawa 20km, macachi Nagano" },
    { name: "FASE 2", range: "G12-14", desc: "Alpi Giapponesi - Kamikōchi, Suwa 16km, Shirakawa-gō, Kanazawa" },
    { name: "FASE 3", range: "G15-21", desc: "Nagoya & Kyoto & Osaka - Ghibli, Fushimi alba, USJ" },
    { name: "VAN LIFE", range: "G22-42", desc: "21 notti road trip Kyushu/Shikoku completo" },
    { name: "OKINAWA", range: "G43-47", desc: "5 giorni tropici, Kerama Blue, snorkeling" },
    { name: "FINALE", range: "G48-49", desc: "Gion Matsuri Yoiyama → Tokyo → Volo" }
  ]
};

const LISTA_VALIGIA = {
  title: "🧳 LISTA VALIGIA COMPLETA - 50 GIORNI",
  subtitle: "Viaggio: 28 Maggio - 15 Luglio 2026 (49 giorni)",
  note: "Setup: Valigia stiva + Bagaglio a mano + Daypack",
  
  sezioni: [
    {
      nome: "💼 SETUP BAGAGLI",
      items: [
        "Valigia rigida/semirigida 20-23kg (protezione, durabilità)",
        "Bagaglio a mano / trolley cabina 7-8kg",
        "Daypack 20-25L per giri giornalieri"
      ]
    },
    {
      nome: "👕 ABBIGLIAMENTO",
      items: [
        "8-10x T-shirt (mix colori, asciugatura rapida)",
        "3x Maglie a manica lunga (treni AC, montagne)",
        "2x Felpa/hoodie (1 leggera, 1 media Alpi)",
        "2x Jeans",
        "2x Pantaloni tecnici",
        "1x Pantaloni eleganti (ristoranti)",
        "2x Shorts casual",
        "2x Pantaloncini running",
        "10x Boxer",
        "6x Paia calze normali",
        "6x Paia calze running",
        "2x Calze compressione voli"
      ]
    },
    {
      nome: "🧥 GIACCHE & IMPERMEABILI",
      items: [
        "1x Giacca antipioggia packable (rainy season!)",
        "1x Giacca leggera casual",
        "1x Windbreaker (Alpi, van notti)"
      ]
    },
    {
      nome: "👟 SCARPE (4 PAIA)",
      items: [
        "1x Scarpe running (13 sessioni!)",
        "1x Sneakers casual/walking",
        "1x Scarpe eleganti casual",
        "1x Ciabatte/sandali (onsen, spiaggia)"
      ]
    },
    {
      nome: "🏃 RUNNING KIT",
      items: [
        "3x Maglie running tecniche",
        "Fascia/bandana sudore",
        "Marsupio/FlipBelt",
        "OPZIONALE: Chiodi pista (Haruno Kochi)"
      ]
    },
    {
      nome: "🏊 OKINAWA MARE",
      items: [
        "2x Costume da bagno",
        "1x Rashguard UV (snorkeling)",
        "1x Telo mare",
        "Maschera snorkeling",
        "Sacchetto waterproof"
      ]
    },
    {
      nome: "📱 TECH & ELETTRONICA",
      items: [
        "Smartphone + cavo",
        "Powerbank 20000mAh (van life!)",
        "Adattatore Giappone tipo A/B",
        "Cuffie bluetooth",
        "Caricatore auto USB (van!)",
        "Cavi extra backup",
        "OPZIONALE: GoPro/action cam"
      ]
    },
    {
      nome: "🧴 TOILETRIES & IGIENE",
      items: [
        "Spazzolino + dentifricio",
        "Shampoo + balsamo",
        "Deodorante",
        "Rasoio",
        "Crema solare SPF50+ (Okinawa!)",
        "Crema solare reef-safe",
        "Asciugamano microfibra"
      ]
    },
    {
      nome: "💊 FARMACI & PRIMO SOCCORSO",
      items: [
        "Antidolorifici/paracetamolo",
        "Anti-diarrea",
        "Antistaminico",
        "Cerotti vari (vesciche running!)",
        "Disinfettante mani gel",
        "Pillole anticinetosi (curve van!)",
        "Farmaci personali prescritti (50gg!)"
      ]
    },
    {
      nome: "🚐 VAN LIFE ESSENTIALS (21 NOTTI!)",
      items: [
        "Sacco a pelo leggero",
        "Cuscino gonfiabile",
        "Tappi orecchie + mascherina occhi",
        "Fornelletto portatile (se non incluso)",
        "Thermos caffè",
        "Borraccia termica 1L",
        "Torcia frontale/headlamp",
        "Coltellino multiuso"
      ]
    },
    {
      nome: "📄 DOCUMENTI & MONEY",
      items: [
        "Passaporto (validità 6+ mesi!)",
        "Copia digitale passaporto",
        "Conferme Agoda stampate",
        "Assicurazione viaggio stampa+PDF",
        "Patente internazionale (VAN!)",
        "2x Carte credito Visa/Mastercard",
        "Cash JPY (50,000¥ iniziali)"
      ]
    },
    {
      nome: "🧰 VARIE ESSENZIALI",
      items: [
        "Lucchetto TSA (valigia + lockers)",
        "Sacchetti zip-lock varie misure",
        "Ombrello pieghevole (rainy season!)",
        "Fazzoletti/tissue (bagni SENZA CARTA!)",
        "Kit cucito mini",
        "Packing cubes organizzazione"
      ]
    },
    {
      nome: "🎮 CONSOLE HUNTING (11 NEGOZI!)",
      items: [
        "Cash extra JPY (negozi solo contanti!)",
        "Lista wish console/giochi",
        "Spazio daypack per acquisti",
        "Bubble wrap protezione"
      ]
    },
    {
      nome: "📦 TAKKYUBIN STRATEGIA",
      note: "Morioka (G7) → Kanazawa (G14)",
      items: [
        "Spedire valigia 20kg fine G7",
        "Tenere daypack 3-4 giorni (G8-13)",
        "Includere: running gear Tazawa G9 + Suwa G13!"
      ]
    }
  ],
  
  pesoTarget: {
    valigiaStiva: "18-20kg (sotto 23kg limite)",
    bagaglioMano: "7-8kg (sotto 10kg limite)",
    daypack: "1kg vuoto",
    totale: "~27kg gestibile"
  },
  
  proTips: [
    "✅ Packing cubes per organizzazione categorie",
    "✅ Scarpe fondo valigia riempite con calze",
    "✅ Vestiti roll method = meno pieghe",
    "✅ Vacuum bag per Alpi gear dopo uso",
    "✅ Lava ogni 5-6 giorni (coin laundry ostelli)",
    "✅ Uniqlo Giappone: compra tech wear se serve",
    "✅ Riserva 3-4kg valigia ritorno per souvenirs"
  ],
  
  apps: [
    "Google Maps offline (van life!)",
    "Google Translate offline giapponese",
    "Hyperdia (orari treni)",
    "Tabelog (ristoranti)",
    "Suica/PASMO digitale",
    "Navitime Japan"
  ]
};

const TRANSPORT={
  1:{from:"Narita",to:"Asakusa",mode:"train",min:60,yen:1330,jrp:false,note:"🚨 Keisei Access Express (Skyaccess) diretto 1h · NON Narita Express!"},
  2:{from:"Tokyo",to:"Tokyo",mode:"local",min:0,yen:1000,jrp:false,note:"Metro IC giornaliero"},
  3:{from:"Tokyo",to:"Nikkō",mode:"train",min:110,yen:3330,jrp:false,note:"Tobu Limited Express Kegon — ⚠️ NON coperto JR Pass!"},
  4:{from:"Nikkō",to:"Fukushima",mode:"train",min:240,yen:2350,jrp:true,note:"JR via Utsunomiya + Kōriyama · JR Pass ✓"},
  5:{from:"Fukushima",to:"Sendai",mode:"train",min:90,yen:4210,jrp:true,note:"JR Tōhoku Line · JR Pass ✓"},
  6:{from:"Sendai",to:"Matsushima+Yamadera",mode:"train",min:120,yen:2400,jrp:true,note:"Senseki + Senzan Line · JR Pass ✓"},
  7:{from:"Sendai",to:"Matsushima",mode:"train",min:40,yen:420,jrp:true,note:"Senseki Line locale · 40min · JR Pass ✓"},
  8:{from:"Morioka",to:"Morioka",mode:"walk",min:0,yen:500,jrp:false,note:"Giro a piedi + bus locale"},
  9:{from:"Morioka",to:"Tazawako",mode:"shin",min:40,yen:2900,jrp:true,note:"Shinkansen Komachi · JR Pass ✓"},
  10:{from:"Tazawa",to:"Nagano",mode:"shin",min:240,yen:22000,jrp:true,note:"Komachi→Omiya + Hokuriku Shinkansen · JR Pass ✓"},
  11:{from:"Nagano",to:"Jigokudani",mode:"bus",min:80,yen:2000,jrp:false,note:"Nagaden Bus da Yudanaka Stn A/R"},
  12:{from:"Nagano",to:"Suwa",mode:"train",min:180,yen:4640,jrp:false,note:"JR→Matsumoto + trenino+bus Kamikōchi + treno Suwa"},
  13:{from:"Suwa",to:"Shirakawa-gō",mode:"train",min:240,yen:10900,jrp:true,note:"JR Suwa→Toyama (JR Pass ✓) + bus Toyama→Shirakawa-gō 1.900¥"},
  14:{from:"Shirakawa-gō",to:"Kanazawa",mode:"bus",min:75,yen:1850,jrp:false,note:"Bus Hokutetsu diretto · ~1h15"},
  15:{from:"Kanazawa",to:"Nagoya",mode:"train",min:200,yen:8500,jrp:true,note:"Thunderbird→Tsuruga + Shinkansen · JR Pass ✓"},
  16:{from:"Nagoya",to:"Kyoto",mode:"shin",min:35,yen:6100,jrp:true,note:"Shinkansen Hikari/Kodama · JR Pass ✓"},
  17:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro IC Kyoto"},
  18:{from:"Kyoto",to:"Arashiyama",mode:"local",min:30,yen:1000,jrp:false,note:"Randen tram + bus locali"},
  19:{from:"Kyoto",to:"Osaka",mode:"train",min:28,yen:570,jrp:false,note:"JR Kyoto→Osaka Rapid Service"},
  20:{from:"Osaka",to:"USJ",mode:"local",min:25,yen:1000,jrp:false,note:"JR Osaka→Universal City"},
  21:{from:"Osaka",to:"Osaka",mode:"local",min:0,yen:800,jrp:false,note:"Metro locale Osaka"},
  22:{from:"Osaka",to:"Ine",mode:"van",min:180,yen:4000,jrp:false,note:"Van ~160km via Amanohashidate · carburante + pedaggi"},
  23:{from:"Ine",to:"Tottori",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~200km costa est"},
  24:{from:"Tottori",to:"Matsue",mode:"van",min:150,yen:3500,jrp:false,note:"Van ~150km San'in Coast"},
  25:{from:"Matsue",to:"Hiroshima",mode:"van",min:210,yen:5000,jrp:false,note:"Van ~230km attraverso Honshu"},
  26:{from:"Hiroshima",to:"Miyajima",mode:"ferry",min:10,yen:400,jrp:false,note:"Traghetto JR Miyajima A/R · ~400¥"},
  27:{from:"Hiroshima",to:"Etajima",mode:"ferry",min:20,yen:800,jrp:false,note:"Traghetto Hiroshima→Etajima A/R"},
  28:{from:"Hiroshima",to:"Nagato",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~200km costa nord"},
  29:{from:"Nagato",to:"Fukuoka",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~100km + Kanmon Tunnel"},
  30:{from:"Fukuoka",to:"Yanagawa",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~60km + Nanzo-in"},
  31:{from:"Yanagawa",to:"Kumamoto",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~100km"},
  32:{from:"Kumamoto",to:"Takachiho",mode:"van",min:120,yen:3000,jrp:false,note:"Van ~120km montagna"},
  33:{from:"Takachiho",to:"Kurokawa",mode:"van",min:90,yen:2000,jrp:false,note:"Van ~80km via Aso"},
  34:{from:"Kurokawa",to:"Beppu",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~90km via Hita + Bungo-Mori"},
  35:{from:"Beppu",to:"Kunisaki",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~60km"},
  36:{from:"Kunisaki",to:"Matsuyama",mode:"ferry",min:90,yen:12800,jrp:false,note:"⛴️ Traghetto veicolare Beppu→Matsuyama · prenotato ✓"},
  37:{from:"Matsuyama",to:"Onomichi",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~200km via Shimonada"},
  38:{from:"Onomichi",to:"Onomichi",mode:"van",min:120,yen:1500,jrp:false,note:"Shimanami Kaidō + bici noleggio"},
  39:{from:"Onomichi",to:"Naruto",mode:"van",min:180,yen:5000,jrp:false,note:"Van ~230km + pedaggi Shikoku"},
  40:{from:"Naruto",to:"Awaji",mode:"van",min:30,yen:1000,jrp:false,note:"Van locale Awaji"},
  41:{from:"Awaji",to:"Nara",mode:"van",min:120,yen:3500,jrp:false,note:"Van ~160km"},
  42:{from:"Nara",to:"Osaka",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~50km verso Osaka"},
  43:{from:"Osaka KIX",to:"Okinawa",mode:"plane",min:130,yen:10000,jrp:false,note:"✈️ Jetstar GK357 KIX→OKA"},
  44:{from:"Naha",to:"Kerama",mode:"ferry",min:50,yen:2500,jrp:false,note:"Ferry Tomari Port→Zamami A/R"},
  45:{from:"Okinawa",to:"Kyoto",mode:"plane",min:150,yen:13000,jrp:false,note:"✈️ Jetstar GK352 OKA→KIX + Haruka train KIX→Kyoto"},
  46:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro Kyoto"},
  47:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro Kyoto"},
  48:{from:"Kyoto",to:"Tokyo",mode:"shin",min:135,yen:13750,jrp:true,note:"🚨 Shinkansen Hikari · PARTENZA 16:30-17:00 per Fuji! Siediti lato DESTRO 🗻"},
  49:{from:"Tokyo",to:"Haneda",mode:"local",min:20,yen:500,jrp:false,note:"Keikyu Line o Monorail → Haneda Terminal 3"},
};
const VAN_RENTAL_YEN=280000;

const MEMO0=[
  {id:101,cat:"conf",txt:"✅ PLAT HOSTEL KEIKYU ASAKUSA KARIN — 28-30 maggio 2026 · 34,85€ · Agoda"},
  {id:102,cat:"conf",txt:"✅ GUEST HOUSE KITOEDA — Nikkō · 30-31 maggio · 28€ · Confermato"},
  {id:103,cat:"conf",txt:"✅ YUMORI ONSEN HOSTEL — Fukushima · 31/05-01/06 · Confermato"},
  {id:104,cat:"conf",txt:"✅ KATAKURINOHANA — 5-6 giugno 2026 · 86€ con colazione · Vista Lago Tazawa · Booking #655173907"},
  {id:106,cat:"conf",txt:"✅ HOTEL LAFONTEINE SUWA — 8-9 giugno 2026 · 23,81€ · Camera con vasca onsen privata · Booking #655184791"},
  {id:105,cat:"conf",txt:"✅ MINSHUKU KANJIYA (Shirakawa-gō) — 9-10 giugno 2026 · 33.050¥ (~190€) cena+colazione · Booking #655176115"},
  {id:110,cat:"conf",txt:"✅ JETSTAR GK357 — 09/07 KIX 15:25 → OKA 17:40 · Booking ZNBWPP · Check-in chiude 14:45"},
  {id:111,cat:"conf",txt:"✅ JETSTAR GK352 — 13/07 OKA 12:30 → KIX 14:40 · Booking ZNBWPP · Check-in chiude 11:50"},
  {id:1,cat:"pack",txt:"Quaderno bianco per i timbri goshuin ⛩️ (acquistane uno a Sensō-ji il Gg.1)"},
  {id:2,cat:"pack",txt:"Tegaderm (cerotti impermeabili trasparenti) per coprire il tatuaggio in onsen"},
  {id:3,cat:"pack",txt:"🚨 GORE-TEX leggero — Stagione Tsuyu (piogge) attiva! Obbligatorio per Yamadera e Tazawa"},
  {id:4,cat:"pack",txt:"Scarpe comode per camminare molto (Yamadera 1015 scalini, Kamikochi, Tazawa 20km)"},
  {id:5,cat:"pack",txt:"Power bank grande — giornate lunghe fuori casa"},
  {id:6,cat:"pack",txt:"Yukata per Yoiyama il 14 lug 👘 (o comprarne uno in Giappone ~3.000¥)"},
  {id:7,cat:"book",txt:"GHIBLI PARK Nagoya (Gg.16, 12/06) — biglietti il 10 del mese! l-tike.com/statics/ghiblipark-en/"},
  {id:10,cat:"book",txt:"Dōgo Onsen kashikiri (Gg.37) — prenotare 1-2 mesi prima"},
  {id:11,cat:"book",txt:"Kurokawa Onsen kashikiri (Gg.33) — prenotare in anticipo"},
  {id:21,cat:"book",txt:"🍳 KICHI KICHI OMURICE Kyoto (Gg.17) — tableall.com · esaurito settimane prima!"},
  {id:25,cat:"book",txt:"🎮 USJ Express Pass Osaka (Gg.20) — FONDAMENTALE in estate: usj.co.jp o Klook"},
  {id:42,cat:"book",txt:"🌆 SHIBUYA SKY (Gg.2, 29/05) — slot tramonto aprono ora! shibuya-scramble-square.com"},
  {id:43,cat:"book",txt:"🐾 CAFE CAPYBA (Gg.2, 29/05 ore 16:00) — slot maggio aprono ora"},
  {id:50,cat:"book",txt:"🚨 SHINKANSEN Kyoto→Tokyo (Gg.48) — CAMBIA ORARIO da 20:00 a 16:30-17:00 per Fuji!"},
  {id:12,cat:"doc",txt:"Patente internazionale ✓ già pronta"},
  {id:13,cat:"doc",txt:"JR Pass — valutare se conviene considerando i tratti coperti"},
  {id:14,cat:"doc",txt:"eSIM o SIM giapponese — Airalo o IIJmio, attivare prima della partenza"},
  {id:15,cat:"know",txt:"Goshuin (御朱印): porta il quaderno in OGNI tempio/santuario del percorso"},
  {id:16,cat:"know",txt:"Michi-no-eki (道の駅): aree sosta van legali — app: 車中泊マップ"},
  {id:17,cat:"know",txt:"7-Eleven ATM: unico ATM affidabile per carte estere"},
  {id:18,cat:"know",txt:"Tatuaggio: Tegaderm in onsen pubbliche. Kashikiri = bagno privato = sempre ok"},
  {id:36,cat:"know",txt:"App GO taxi: come Uber in Giappone — scaricare prima di partire"},
  {id:37,cat:"know",txt:"App LINE: messaggistica giapponese — fondamentale per comunicare con locali"},
  {id:38,cat:"know",txt:"App EX / Smart EX: prenotare posti shinkansen — collegare alla Suica"},
  {id:51,cat:"know",txt:"🌧️ Stagione TSUYU (piogge): calcola +30% tempo per attività outdoor in caso pioggia"},
  {id:19,cat:"idea",txt:"📓 Momenti di silenzio per il diario — Kamikochi, Tazawa, Kurokawa"},
  {id:20,cat:"idea",txt:"🗣️ Interagire in giapponese appena possibile — Van Life = zero inglese"},
  {id:33,cat:"idea",txt:"🗻 Fuji dal treno Gg.48: siediti lato DESTRO (finestrino E) + parti PRIMA del tramonto!"},
];

const D0=[
{n:1,d:"28/05",dow:"Gio",c:"Tokyo",j:"東京",p:1,sl:"✅ Plat Hostel Keikyu Asakusa Karin — 34,85€ 2 notti",
 a:["Arrivo Narita 9:10 · Keisei Skyaccess → Asakusa","⛩️ Sensō-ji + quaderno Goshuin + Melonpan Kagetsudo","🎌 Ochanomizu: ponte Hijiribashi (3 treni spot!)","🎌 YOUR NAME: Suga Shrine Otokozaka","🥢 Tsukishima Monja Street","✅ TeamLab Planets 20:00"],
 m:["🎌 CHAINSAW MAN/SUZUME: ponte Hijiribashi Ochanomizu","🎌 YOUR NAME: Suga Shrine Otokozaka Yotsuya"],b:82,st:"ok",
 nt:"✅ TEAMLAB 20:00 · HEADOUT-20260430-KUPX NON cancellabile · 🚨 TRASPORTO: Keisei Skyaccess (NON Narita Express!) · 💡 Pantaloni arrotolabili (acqua) · 🎯 EVENTI: Humanoids Summit (AI/robotica Takanawa) · Oedo Beer Festival Nakano · Pokemon Go Fest Odaiba",
 schedule:[
   {id:1,time:"09:10",txt:"L'Arrivo · Atterraggio Narita"},
   {id:2,time:"10:30",txt:"🚨 Correzione Trasporto & Check-in · **IMPORTANTE:** Prendi il **Keisei Access Express (Skyaccess)** e **NON il Narita Express!**"},
   {id:3,time:"13:30",txt:"⛩️ Asakusa · Sensō-ji"},
   {id:4,time:"15:00",txt:"🎌 Ochanomizu · Ponte Hijiribashi (Chainsaw Man/Suzume spot)"},
   {id:5,time:"16:30",txt:"🎌 Yotsuya · Suga Shrine Otokozaka: le scale di Your Name"},
   {id:6,time:"18:15",txt:"🥢 Cena pre-evento · Fermati a **Tsukishima** (sulla stessa linea, a una fermata da Toyosu)"},
   {id:7,time:"20:00",txt:"✅ TeamLab Planets Toyosu · Booking: **HEADOUT-20260430-KUPX** · NON cancellabile"},
   {id:8,time:"22:00",txt:"🎮 OPZIONALE: Prima Caccia Console · Se hai ancora energie dopo TeamLab, **Akihabara** è a 15min di metro"},
 ],exp:[]},

{n:2,d:"29/05",dow:"Ven",c:"Tokyo",j:"東京",p:1,sl:"✅ Plat Hostel Keikyu Asakusa Karin (stessa prenotazione)",
 a:["🐟 Tsukiji colazione sushi","🏙️ Shibuya Sky mattina (10:00 cielo limpido!)","🛍️ Nakano Broadway + Oedo Beer Festival","🐾 Cafe Capyba 16:00","🛍️ Akihabara sera neon"],
 m:["🎌 Akihabara: la tana otaku di Tokyo"],b:63,st:"ok",
 nt:"🎯 EVENTI: Oedo Beer Festival Nakano 16:00+ · Pokemon Go Fest Odaiba · 🚨 ORDINE OTTIMIZZATO: no ping-pong Est-Ovest!",
 schedule:[
   {id:1,time:"06:00",txt:"🐟 Tsukiji Outer Market (IL PESCE FRESCO) · Sveglia prestissimo e vai diretto a Tsukiji"},
   {id:2,time:"09:15",txt:"🚇 Spostamento verso Shibuya"},
   {id:3,time:"10:00",txt:"🏙️ Shibuya Sky · Vista mattutina pazzesca col cielo limpido"},
   {id:4,time:"12:00",txt:"🚇 Spostamento verso Nakano · Comodissimo con la Yamanote fino a Shinjuku e poi Chuo Line"},
   {id:5,time:"12:30",txt:"🛍️ Nakano Broadway · Pranzo al volo nella galleria Sun Mall · Immersione totale nei Mandarake"},
   {id:6,time:"15:00",txt:"🚇 Rientro in zona Cafe Capyba"},
   {id:7,time:"16:00",txt:"🐾 Cafe Capyba · Relax totale"},
   {id:8,time:"17:30",txt:"🛍️ Akihabara · La sera Akiba dà il meglio di sé · Neon illuminati · Sale giochi · SURUGA-YA, TRADER"},
 ],exp:[]},

{n:3,d:"30/05",dow:"Sab",c:"Tokyo → Nikkō",j:"東京→日光",p:1,sl:"✅ Guest House KITOEDA — Nikkō · 28€",
 a:["🚃 Tobu Express Asakusa→Nikkō","🌉 Shinkyo Bridge rosso sacro","⛩️ Tōshō-gū + Inner Shrine 200 gradini","💦 Cascata Kegon (ascensore base)","🐉 Ryuzu Falls scalinate fiume"],
 m:["🎌 Tōshō-gū: cedri + oro = atmosfera anime fantasy"],b:84,st:"ok",
 nt:"🚨 Tobu Express NON coperto JR Pass · 🎫 Biglietti Tōshō-gū alla stazione · 🚌 Chuzenji Pass 2000¥ · Bus ogni 40min! · 🎆 Possibili Light-up serali Futarasan/Rinno-ji",
 schedule:[
   {id:1,time:"06:00",txt:"🏃‍♂️ CORSA 2: Pista Oda Field (Yoyogi) · Ultima corsa a Tokyo prima del Tōhoku"},
   {id:2,time:"07:30",txt:"🚃 Tobu Limited Express Kegon · Partenza da Asakusa"},
   {id:3,time:"09:30",txt:"Arrivo a Nikkō & Logistica · Deposita i bagagli alla **Guest House KITOEDA**"},
   {id:4,time:"10:00",txt:"🌉 Shinkyo Bridge · Il ponte rosso sacro di Nikkō"},
   {id:5,time:"10:30",txt:"⛩️ Tōshō-gū Shrine · Il gigantesco mausoleo dedicato a Tokugawa Ieyasu"},
   {id:6,time:"13:30",txt:"🚌 Spostamento verso Okunikko & Cascata Kegon · Si sale verso le montagne"},
   {id:7,time:"16:00",txt:"🐉 Ryuzu Falls (Se le tempistiche reggono) · Queste \"cascate della testa di drago\" hanno un ottimo punto panoramico dotato di ristorante"},
 ],exp:[]},

{n:4,d:"31/05",dow:"Dom",c:"Nikkō → Aizu → Fukushima",j:"日光→会津→福島",p:1,sl:"✅ YUMORI ONSEN HOSTEL — con onsen integrato ♨️",
 a:["🚆 Nikkō→Aizu (JR Pass Shinkansen!)","🌀 Sazaedo doppia elica + storia Byakkotai","🥢 Sauce Katsudon Aizu","🏯 Tsuruga-jo tegole rosse + sala tè Rinkaku","♨️ Relax onsen hostel Fukushima"],
 m:["🎌 Sazaedo: spirale mistica · Byakkotai tropo anime (Gintama, Rurouni Kenshin)"],b:58,st:"ok",
 nt:"💡 JR Pass: Shinkansen Yamabiko/Nasuno Utsunomiya-Kōriyama! · 🚌 Bus Haikara-san/Akabe · 🎌 Byakkotai (Tigre Bianche) seppuku Iimoriyama · 🍵 Sala tè Rinkaku · ♨️ Onsen integrato hostel · Nessun matsuri = tranquillità",
 schedule:[
   {id:1,time:"08:00",txt:"🚆 Spostamento verso il Tōhoku (La risalita) · Percorso: Nikkō → Utsunomiya → Kōriyama → Aizu-Wakamatsu"},
   {id:2,time:"11:30",txt:"🎒 Arrivo ad Aizu-Wakamatsu & Logistica · Molla i bagagli nei **coin locker in stazione**"},
   {id:3,time:"12:00",txt:"🌀 Sazaedo Temple (Monte Iimori) · Il tempio in legno a doppia elica"},
   {id:4,time:"13:30",txt:"🥢 Pranzo Esplosivo (Sauce Katsudon)"},
   {id:5,time:"14:30",txt:"🏯 Castello Tsuruga-jo · L'**unico castello in Giappone con le tegole rosse**"},
   {id:6,time:"17:00",txt:"🚆 Treno verso Fukushima & Relax Termale · Ritorno verso Kōriyama e poi treno per Fukushima"},
 ],exp:[]},

{n:5,d:"01/06",dow:"Lun",c:"Fukushima → Sendai",j:"福島→仙台",p:1,sl:"Sendai Guest House Umebachi",
 a:["🦊 Zao Fox Village (spiriti Kitsune!)","🌳 Jozenji-dori viale alberato","🏯 Castello Aoba + statua Date Masamune","🍡 Zunda Shake edamame","🐮 Gyutan lingua manzo Kisuke/Rikyu","🍻 Kokubuncho izakaya"],
 m:["🎌 ZAO FOX VILLAGE: tana spiriti Kitsune 🦊"],b:70,st:"ok",
 nt:"🚨 TAXI SHARING 4000¥ Fox Village (bus inesistenti!) · 🦊 Regole: no abbassarsi, no accarezzare · 💡 JR Pass Shinkansen Yamabiko 15min · 🍡 Zunda Shake ovunque · 📸 Statua Date Masamune vista oceano",
 schedule:[
   {id:1,time:"08:30",txt:"🚆 Spostamento verso il villaggio · Treno da Fukushima a Shiroishi-Zao"},
   {id:2,time:"09:30",txt:"🦊 Zao Fox Village (Miyagi Zao Kitsune Mura)"},
   {id:3,time:"12:00",txt:"🚆 Rientro e Arrivo a Sendai · Treno verso Sendai"},
   {id:4,time:"14:00",txt:"🌳 Esplorazione di Jozenji-dori · Passeggiata lungo il viale alberato simbolo della città"},
   {id:5,time:"16:00",txt:"🏯 Rovine del Castello di Aoba (Spot Aggiuntivo)"},
   {id:6,time:"18:30",txt:"🐮 La Cena dei Campioni: Gyutan · Location: **Kokubuncho** (il quartiere della vita notturna)"},
 ],exp:[]},

{n:6,d:"02/06",dow:"Mar",c:"Sendai (Yamadera day trip)",j:"仙台(山寺日帰り)",p:1,sl:"Sendai Guest House Umebachi",
 a:["⛩️ Yamadera 1015 gradini cedri sacri","🌅 Gododō tempio sospeso + haiku Bashō","🍜 Yamadera Chikara Soba + Tama Konnyaku","🚇 Sendai Daikannon statua 100m","🏙️ AER Building tramonto gratis","🍸 Bar K speakeasy eleganza sartoriale"],
 m:["⛩️ Yamadera: opening anime fantasy · silenzio totale"],b:55,st:"critical",
 nt:"🚨 TSUYU stagione piogge! Gore-Tex obbligatorio · gradini scivolosi +30% tempo · 📓 Quaderno Goshuin · 🍜 Chikara Soba energia · 🚇 Daikannon = mech 100m · 🍸 Bar K keigo elegante",
 schedule:[
   {id:1,time:"08:00",txt:"🎒 Preparazione zaino · Lasci il bagaglio grosso alla Sendai Guest House Umebachi"},
   {id:2,time:"08:30",txt:"🚃 Senzan Line · Treno Sendai → Yamadera (~1h)"},
   {id:3,time:"09:30",txt:"⛩️ L'Attacco ai 1015 Gradini · Arrivo alla stazione e inizio della salita nel bosco di cedri sacri"},
   {id:4,time:"11:30",txt:"🌅 La Cima: Gododō"},
   {id:5,time:"13:00",txt:"🍜 Pranzo Post-Hike · Sceso alla base, punta alle taverne tradizionali davanti alla stazione"},
   {id:6,time:"14:00",txt:"🚃 Rientro verso Sendai · Senzan Line per tornare in città"},
   {id:7,time:"15:30",txt:"🚇 Il Gigante Bianco Nascosto (Sendai Daikannon) · Prendi un bus verso il quartiere di **Izumi**"},
   {id:8,time:"18:00",txt:"🏙️ Tramonto dall'AER Building (Gratis)"},
   {id:9,time:"19:00",txt:"🥢 Cena \"Lenta\": Gyutan · Vai da Rikyu o in un ristorante specializzato in Gyutan (lingua di manzo)"},
   {id:10,time:"20:30",txt:"🚶 Passeggiata Notturna · Percorri il viale alberato di **Jozenji-dori**"},
   {id:11,time:"21:30",txt:"🍸 Estetica e Conversazione: Bar, K · Entra in questo **speakeasy classico** a Kokubuncho"},
   {id:12,time:"23:00",txt:"📓 Rientro · Rientro in ostello, doccia e stesura degli appunti della giornata sul diario"},
 ],exp:[]},

{n:7,d:"03/06",dow:"Mer",c:"Sendai (Matsushima day trip)",j:"仙台(松島日帰り)",p:1,sl:"Sendai Guest House Umebachi",
 a:["🚢 Crociera baia Matsushima (3 viste Giappone!)","🍵 Kanrantei casa tè matcha vista","🌉 Fukuura Bridge 252m fortuna","⛩️ Zuigan-ji + Entsu-in motivi 1600","🦪 Kaki Goya ostriche fresche","🏃‍♂️ Corsa fiume Hirose defaticamento","📚 Librerie Maruzen/Tsutaya artbook"],
 m:["🌊 Matsushima: bonsai giganti in mare · uno dei 3 paesaggi sacri"],b:50,st:"ok",
 nt:"✅ Senseki Line locale 40min · 🍵 Kanrantei matcha vista baia · 🦪 Ostriche all-you-can-eat · 📦 PREP TAKKYUBIN: bagaglio → Kanazawa domani!",
 schedule:[
   {id:1,time:"09:00",txt:"🚃 Spostamento verso l'Oceano · Prendi la **Senseki Line** da Sendai fino a **Matsushima-Kaigan** (circa 40 minuti)"},
   {id:2,time:"09:45",txt:"🚢 Crociera nella Baia di Matsushima · Sali sul traghetto per il giro turistico"},
   {id:3,time:"11:00",txt:"🍵 Matcha con Vista (Chicca Aggiuntiva) · Sceso dal traghetto e prima di andare al ponte, fermati alla **Kanrantei**"},
   {id:4,time:"11:45",txt:"🌉 Fukuura Bridge"},
   {id:5,time:"12:30",txt:"⛩️ Templi: Zuigan-ji ed Entsu-in · Visita lo **Zuigan-ji**, il tempio zen principale incastonato nella roccia"},
   {id:6,time:"14:00",txt:"🦪 Pranzo: Kaki Goya · La specialità assoluta di Matsushima sono le **ostriche**"},
   {id:7,time:"15:30",txt:"🚃 Rientro a Sendai · Riprendi la Senseki Line per tornare in città"},
   {id:8,time:"16:30",txt:"🏃‍♂️ Scarico lungo il fiume Hirose"},
   {id:9,time:"18:30",txt:"🥢 Cena: La Variazione sul Tema"},
   {id:10,time:"20:30",txt:"📚 Materiale e Ricerca Notturna"},
   {id:11,time:"22:00",txt:"🏠 Rientro in Ostello e Logistica · Rientro all'Umebachi"},
 ],exp:[]},

{n:8,d:"04/06",dow:"Gio",c:"Sendai → Morioka",j:"仙台→盛岡",p:1,sl:"Ostello Morioka",
 a:["📦 Takkyubin valigia 20kg → Kanazawa","🚄 Shinkansen Hayabusa 50min","🌸 Ishiwarizakura ciliegio spacca-roccia","🍡 Konzaya miso storico","🍜 WANKO SOBA CHALLENGE 100+","🏯 Morioka Castle digestione","🏛️ Bank Red Brick 1911","🍜 Reimen anguria cena leggera"],
 m:["🍜 Wanko Soba: ritmo costante · NO bere brodo!"],b:86,st:"ok",
 nt:"📦 Takkyubin konbini/reception · denpyo pratica giapponese · 🚄 Hayabusa posti prenotati! · 🍜 Wanko Soba: ritmo come 800m · NO strappo · 🍉 Reimen con anguria/mela",
 schedule:[
   {id:1,time:"08:30",txt:"📦 Logistica vitale: Takkyubin"},
   {id:2,time:"09:30",txt:"🚄 Il Proiettile Verde · **Shinkansen Hayabusa:** Sendai → Morioka (50min)"},
   {id:3,time:"10:30",txt:"🎒 Arrivo a Morioka"},
   {id:4,time:"11:00",txt:"🌸 Ishiwarizakura (Il Ciliegio Spacca-Roccia)"},
   {id:5,time:"12:00",txt:"🍡 Konzaya · Visita a questo storico negozio di **miso e salsa di soia** ospitato in un edificio secolare"},
   {id:6,time:"13:00",txt:"🍜 Wanko Soba Challenge da Azumaya · Il **main event della giornata**"},
   {id:7,time:"15:00",txt:"🏯 Passeggiata Digestiva: Morioka Castle Ruins Park (Iwate Park) · Dopo oltre 100 ciotole di soba, avrai bisogno di camminare"},
   {id:8,time:"16:30",txt:"🏛️ Architettura Classica: Bank of Iwate Red Brick Building"},
   {id:9,time:"18:30",txt:"🥢 Cena Leggera: Morioka Reimen · Considerando il pranzo titanico, la sera potresti non avere una fame da lupi"},
   {id:10,time:"20:30",txt:"🛏️ Rientro e Riposo"},
 ],exp:[]},

{n:9,d:"05/06",dow:"Ven",c:"Morioka → Tazawa Lake",j:"盛岡→田沢湖",p:1,sl:"✅ Katakurinohana — 86€ · Booking #655173907",
 a:["🚄 Shinkansen Komachi rosso fuoco","🏃 RUN 1: Lago Tazawa 20.4km blu indaco","📍 Tatsuko statua dorata drago maledetto","🥢 Kiritanpo riso spiedini cedro","♨️ Nyuto Onsen kashikiri acqua lattiginosa","🌲 Tsurunoyu ryokan storico bosco"],
 m:["♨️ Nyuto Onsen: acqua lattiginosa bosco vulcanico","🌊 Lago Tazawa: blu indaco irreale · più profondo Giappone"],b:132,st:"critical",
 nt:"🚄 Komachi rosso si stacca da Hayabusa verde! · 🚨 TSUYU: Gore-Tex · pioggia/nebbia epica · 🏃 Pacing: fondo aerobico NO cronometro · ♨️ Kashikiri tatuaggio OK · 🚌 Bus orari RARI!",
 schedule:[
   {id:1,time:"08:00",txt:"🚄 Il Proiettile Rosso · **Shinkansen Komachi:** Morioka → Tazawako (40 min)"},
   {id:2,time:"09:00",txt:"🎒 Arrivo e Drop Bagagli · Check-in (o deposito zaino se la stanza non è pronta) al **Katakurinohana**"},
   {id:3,time:"09:30",txt:"🏃‍♂️ RUN 1: Giro del Lago Tazawa (20.4 km)"},
   {id:4,time:"12:00",txt:"📍 La Statua di Tatsuko (Km ~10) · A metà del percorso esatto troverai questa **statua dorata lucentissima** che emerge dall'acqua"},
   {id:5,time:"13:00",txt:"🏁 Fine Corsa e Ricarica Carboidrati · Rientro al Katakurinohana. Doccia rapida."},
   {id:6,time:"14:30",txt:"🚌 Spostamento verso i Monti · Prendi il bus locale (dalla stazione o dalle fermate sul lago) in direzione **Nyuto Onsen**"},
   {id:7,time:"16:00",txt:"♨️ Nyuto Onsen (Kashikiri) · Questa è un'area composta da **7 ryokan storici** (il più antico e iconico è lo **Tsurunoyu**)"},
   {id:8,time:"18:30",txt:"🚌 Rientro e Cena · Riprendi l'ultimo bus per scendere a valle"},
 ],exp:[]},

{n:10,d:"06/06",dow:"Sab",c:"Tazawa → Nagano",j:"田沢湖→長野",p:1,sl:"1166 Backpackers Nagano",
 a:["🍳 Vista lago indaco addio","🚄 Komachi 3h Tazawako→Omiya","🍱 Ekiben culture Ecute Omiya","🚄 Hokuriku Shinkansen → Nagano","🎌 Summer Wars anime vibe","⛩️ Zenkō-ji gigante legno","🌑 Okaidan Meguri BUIO TOTALE Chiave Paradiso","🥢 Shinshu Soba vera","🍘 Oyaki street food"],
 m:["🌑 Okaidan Meguri: tunnel buio assoluto · deprivazione sensoriale · Chiave Paradiso"],b:178,st:"ok",
 nt:"🚄 3h Komachi (Minna no Nihongo N4!) · 🍱 Ekiben Omiya (bento nazionale!) · 🎌 Nagano = Summer Wars Hosoda · 🏠 1166 Backpackers legno conversazione · 🌑 Tunnel ZERO luci · 🍘 Oyaki melanzane miso",
 schedule:[
   {id:1,time:"07:30",txt:"🍳 Colazione e Check-out · Ultima vista sull'acqua indaco del Lago Tazawa"},
   {id:2,time:"09:00",txt:"🚄 Il Proiettile Rosso: Shinkansen Komachi · Da Tazawako a Omiya (circa 3 ore)"},
   {id:3,time:"12:00",txt:"🍱 Hub di Omiya: La cultura dell'Ekiben · Omiya è uno degli snodi ferroviari più imponenti del paese"},
   {id:4,time:"13:00",txt:"🚄 Verso le Alpi: Hokuriku Shinkansen · Prendi lo Shinkansen (linea **Kagayaki** o **Hakutaka**) in direzione Nagano (circa 1h)"},
   {id:5,time:"14:30",txt:"🎒 Arrivo a Nagano e Logistica · Arrivo in stazione e spostamento verso il **1166 Backpackers**"},
   {id:6,time:"15:30",txt:"⛩️ Il Gigante di Legno: Zenkō-ji · Incamminati lungo la via **Omotesando** fino al tempio"},
   {id:7,time:"16:30",txt:"🌑 Okaidan Meguri: Il Tunnel del Paradiso · Sotto la sala principale del tempio c'è un passaggio sotterraneo"},
   {id:8,time:"18:30",txt:"🥢 Cena: La Vera Shinshu Soba"},
   {id:9,time:"20:00",txt:"🍘 Snack Serale: Oyaki · Sulla via del ritorno in ostello, cerca qualche bottega ancora aperta che venda gli **Oyaki**"},
 ],exp:[]},

{n:11,d:"07/06",dow:"Dom",c:"Nagano (Jigokudani + Obuse)",j:"長野(地獄谷+小布施)",p:1,sl:"1166 Backpackers Nagano",
 a:["🎫 Snow Monkey Pass","🚃 Nagaden treni Tokyo anni '90!","🚌 Bus + hike 2km bosco cedri","🐒 Jigokudani Monkey Park macachi","🏯 OBUSE città Hokusai","🦅 Gansho-in Fenice soffitto 30m²","🌰 Castagne gelato Mont Blanc","🥩 Shinshu Beef cena mele"],
 m:["🐒 Jigokudani: macachi onsen · NO fissare occhi!","🦅 Hokusai 89 anni: Fenice ti segue"],b:57,st:"ok",
 nt:"🎫 Snow Monkey Pass copre tutto · 🚃 Nagaden = treni Tokyo dismessi anni '90! · 🐒 Regole: NO fissare NO abbassarsi zaino chiuso · 🏯 Obuse Hokusai ultimi anni · 🦅 Fenice 89 anni soffitto · 🌰 Kuri castagne · 🥩 Bestiame nutrito mele",
 schedule:[
   {id:1,time:"08:00",txt:"🎫 Acquisto Pass e Partenza · Vai alla stazione di Nagano (sotterranea per la linea Nagaden) e acquista lo **Snow Monkey Pass**"},
   {id:2,time:"08:30",txt:"🚃 Treno Nagaden: Nagano → Yudanaka · Sali sul treno locale"},
   {id:3,time:"09:30",txt:"🚌 Bus & Hike nel bosco · Arrivato a Yudanaka, prendi il bus per **Kanbayashi Onsen**"},
   {id:4,time:"10:15",txt:"🐒 Jigokudani Monkey Park · Sei nel regno dei **macachi giapponesi**"},
   {id:5,time:"12:30",txt:"🚶 Rientro verso la civiltà · Rifatti i 2 km a piedi nel bosco per tornare alla fermata del bus e scendere a **Yudanaka Station**"},
   {id:6,time:"13:30",txt:"🚃 La Tappa Segreta: Treno per Obuse · Riprendi il treno Nagaden verso Nagano, ma scendi a metà strada, alla stazione di **Obuse**"},
   {id:7,time:"14:00",txt:"🏯 Obuse: La città di Hokusai"},
   {id:8,time:"15:30",txt:"🦅 Gansho-in Temple (L'opera finale) · Spostati in questo piccolo tempio a Obuse"},
   {id:9,time:"16:30",txt:"🌰 Merenda a Obuse: Il regno delle Castagne · La specialità assoluta di Obuse è la **castagna (Kuri)**"},
   {id:10,time:"17:30",txt:"🚃 Rientro Definitivo a Nagano · Riprendi la Nagaden Line e in 30 minuti sei di nuovo a Nagano"},
   {id:11,time:"19:00",txt:"🥩 Cena: Shinshu Beef · Per variare rispetto alla soba della sera precedente, stasera punta sulla carne"},
   {id:12,time:"21:00",txt:"🏠 Rientro in Ostello · Rientro al 1166 Backpackers, relax nell'area comune in legno"},
 ],exp:[]},

{n:12,d:"08/06",dow:"Lun",c:"Nagano → Kamikōchi → Suwa",j:"長野→上高地→諏訪",p:1,sl:"✅ Hotel Lafonteine Suwa — Booking #655184791",
 a:["Treno→Matsumoto + bus KAMIKŌCHI","🏔️ HIKE: Taisho Pond → Kappabashi Bridge","Fiume Azusa azzurro + Alpi 3000m"],
 m:["🎌 Kamikōchi: fiume azzurro + Alpi anime","🏔️ Location Kimi no Na wa 🌠"],b:78,st:"ok",
 nt:"Lafonteine Suwa: vasca onsen privata in camera.",
 schedule:[
   {id:1,time:"07:30",txt:"🚃 Spostamento verso i Monti · Prendi il treno da Nagano in direzione Matsumoto"},
   {id:2,time:"08:30",txt:"🚌 La Salita a Kamikōchi · Cambio a Matsumoto: prendi la **Matsumoto Dentetsu Line** e poi il **bus diretto per Kamikōchi**"},
   {id:3,time:"10:00",txt:"🏔️ Taisho Pond (L'Inizio dell'Hike) · Scendi alla fermata del **Taisho Pond** prima del capolinea"},
   {id:4,time:"11:00",txt:"🌊 Kappabashi Bridge · Percorri i sentieri nel bosco fino al celebre **ponte Kappabashi**"},
   {id:5,time:"12:30",txt:"🍱 Pranzo Alpino · Fermati in una delle aree di sosta attorno al ponte"},
   {id:6,time:"14:00",txt:"🚌 Rientro e Cambio a Matsumoto"},
   {id:7,time:"16:00",txt:"🎒 Arrivo a Suwa e Check-in · Arrivo a destinazione e check-in all'**Hotel Lafonteine Suwa**"},
   {id:8,time:"16:30",txt:"🌠 L'Ascesa al Tateishi Park (Your Name) · Prendi un **taxi** o affronta l'**hike** per arrivare al **Tateishi Park** in tempo per il tramonto"},
   {id:9,time:"18:45",txt:"🥢 Cena a Suwa · Scendi verso il centro"},
   {id:10,time:"20:30",txt:"♨️ Il Lusso Privato: Onsen in Camera · Rientro all'Hotel Lafonteine Suwa"},
   {id:11,time:"22:00",txt:"📓 Relax e Pianificazione"},
 ],exp:[]},

{n:13,d:"09/06",dow:"Mar",c:"Suwa → Toyama → Shirakawa-gō",j:"諏訪→富山→白川郷",p:1,sl:"✅ Minshuku Kanjiya · Booking #655176115",
 a:["🏃 RUN 2: GIRO LAGO SUWA (16km)","♨️ ONSEN KATAKURAKAN","Treno Suwa→Toyama","🚌 ULTIMO BUS 17:00 Toyama→Shirakawa-gō","🏠 Cena intorno irori"],
 m:["🌠 Tateishi Park: cratere Itomori — Your Name!","🏠 Shirakawa-gō: senza tempo dopo tramonto"],b:281,st:"critical",
 nt:"🚨 FIX GEMINI CRITICO: VERIFICA CENA INCLUSA in prenotazione! Villaggio chiuso 17:00 = nessun ristorante. 🚨 ULTIMO BUS 17:00!",
 schedule:[
   {id:1,time:"06:30",txt:"🏃‍♂️ RUN 2: Il Giro del Lago Suwa (16km)"},
   {id:2,time:"10:30",txt:"♨️ Recupero: Onsen Katakurakan · Dopo la corsa, fermati in questo **bagno termale storico**"},
   {id:3,time:"12:30",txt:"🚃 Treno verso il Mar del Giappone · Prendi la linea JR da Suwa a Matsumoto, e da lì il **Limited Express verso Toyama** (~3h)"},
   {id:4,time:"15:30",txt:"🎒 Arrivo a Toyama & Sprint · Arrivi a Toyama"},
   {id:5,time:"17:00",txt:"🚨 ULTIMO BUS: Toyama → Shirakawa-gō · **CRITICO:** Non c'è margine di errore"},
   {id:6,time:"18:30",txt:"🏠 Arrivo nel Villaggio del Tempo Sospeso · Arrivo a **Shirakawa-gō** e check-in al **Minshuku Kanjiya**"},
   {id:7,time:"19:00",txt:"🥢 Cena Tradizionale"},
   {id:8,time:"20:30",txt:"🌌 Passeggiata Notturna tra i Gassho-zukuri · Questa è la **vera magia** di dormire qui"},
 ],exp:[]},

{n:14,d:"10/06",dow:"Mer",c:"Shirakawa-gō → Kanazawa",j:"白川郷→金沢",p:1,sl:"Kanazawa Share House GAOoo",
 a:["🌅 Passeggiata mattutina — Gassho-zukuri nebbia","Bus Shirakawa-gō→Kanazawa","📦 RITIRO VALIGIA (Takkyubin)!","🌳 KENROKU-EN","🏘️ HIGASHI CHAYA","🍣 Omicho Market"],
 m:["🌳 Kenroku-en: paesaggio classico","🏯 Nagamachi: atmosfera samurai"],b:61,st:"ok",
 nt:"Bus Hokutetsu 1.850¥. 📦 Ritiro valigia!",
 schedule:[
   {id:1,time:"06:30",txt:"🌅 L'Alba Esclusiva · Sveglia presto e passeggiata nel villaggio **prima che arrivino i primi pullman da Tokyo**"},
   {id:2,time:"08:30",txt:"🚌 Spostamento in Città · Bus Hokutetsu da Shirakawa-gō a Kanazawa (~1h15)"},
   {id:3,time:"10:00",txt:"📦 Il Ricongiungimento Logistico · Arrivo a Kanazawa e **ritiro della valigia da 20kg** spedita tramite **Takkyubin**!"},
   {id:4,time:"11:00",txt:"🌳 Kenroku-en · Esplorazione di uno dei **tre giardini paesaggistici più belli di tutto il Giappone**"},
   {id:5,time:"13:00",txt:"🦞 Omicho Market e Kaisendon · Il **mercato coperto di Kanazawa**"},
   {id:6,time:"15:00",txt:"🏘️ Higashi Chaya · Il **quartiere storico delle geishe**, perfettamente conservato"},
   {id:7,time:"17:00",txt:"🏯 Nagamachi (Quartiere dei Samurai) · Prima che faccia buio, fai un salto a **Nagamachi**"},
   {id:8,time:"18:00",txt:"🏃‍♂️ CORSA 6: Fiume Saigawa (Il \"Rodano di Kanazawa\")"},
   {id:9,time:"19:00",txt:"🥢 Cena Speciale: Nodoguro · Per cena, cerca una buona izakaya in centro (zona **Korinbo** o **Katamachi**)"},
   {id:10,time:"20:30",txt:"🎨 L'Arte Digitale Serale: TeamLab Castle Kanazawa"},
   {id:11,time:"22:00",txt:"🍻 Serata a Katamachi · Se hai ancora energie, **Katamachi** è il quartiere del divertimento di Kanazawa"},
 ],exp:[]},

{n:15,d:"11/06",dow:"Gio",c:"Kanazawa → Gujo → Nagoya",j:"金沢→郡上→名古屋",p:1,sl:"2025 Renewal Open - Anshin Oyado Nagoya",
 a:["🎨 STAGNO DI MONET (Seki): acqua cristallina + carpe koi — GRATIS","🏯 GUJO HACHIMAN: castello + città canali","Treno Nagoya pomeriggio"],
 m:["🎨 Stagno Monet: a giugno perfetto","🏯 Gujo Hachiman: atmosfera RPG"],b:96,st:"ok",
 nt:"⚠️ Bus per Namonaki Ike rarissimi — controlla orari!",
 schedule:[
   {id:1,time:"07:30",txt:"🚃 Spostamento Logistico: Kanazawa → Gifu"},
   {id:2,time:"10:00",txt:"🚌 La Missione per lo Stagno di Monet · Arrivato a Gifu, deposita subito il grosso nei **locker in stazione**"},
   {id:3,time:"11:30",txt:"🎨 Namonaki Ike (Stagno di Monet) · L'impatto visivo è **surreale**"},
   {id:4,time:"13:30",txt:"🚌 Spostamento verso i Canali · Riprendi i bus locali per spostarti verso **Gujo Hachiman**"},
   {id:5,time:"14:30",txt:"🏯 Gujo Hachiman"},
   {id:6,time:"17:00",txt:"🚃 Rientro a Gifu e Treno per Nagoya · Rientra a Gifu, recupera lo zaino e prendi un **treno rapidissimo** (**20 minuti**) per Nagoya"},
   {id:7,time:"18:00",txt:"🎒 Arrivo a Nagoya e Check-in · Check-in all'**Anshin Oyado Nagoya**"},
   {id:8,time:"19:30",txt:"🍗 Cena Culinaria Pesante: Tebasaki"},
 ],exp:[]},

{n:16,d:"12/06",dow:"Ven",c:"Nagoya (Ghibli Park) → Kyoto",j:"名古屋→京都",p:1,sl:"Guesthouse KYOTO COMPASS",
 a:["🌳 GHIBLI PARK (Expo City Aichi) — minimo 5-6h","Locker stazione → parco → shinkansen","🚄 Shinkansen Nagoya→Kyoto (35min)"],
 m:["🌳 GHIBLI PARK: personaggi Miyazaki"],b:133,st:"ok",
 nt:"📌 Biglietti 10 aprile — l-tike.com/statics/ghiblipark-en/",
 schedule:[
   {id:1,time:"08:30",txt:"🎒 Sfratto e Logistica · Check-out dall'**Anshin Oyado** e fiondati alla stazione di Nagoya"},
   {id:2,time:"09:30",txt:"👾 Esplorazione Osu Shopping District · Prendi la metro fino a **Osu Kannon**"},
   {id:3,time:"11:30",txt:"🛍️ La Scorta Ghibli (Piano B)"},
   {id:4,time:"12:30",txt:"🥩 Pranzo Ignorante: Misokatsu · A Nagoya non puoi non mangiare il **Misokatsu**"},
   {id:5,time:"13:45",txt:"🚄 Il Salto Temporale: Shinkansen per Kyoto · Recupera lo zaino ai locker e salta sul primo **Shinkansen Hikari o Kodama**"},
   {id:6,time:"14:30",txt:"📚 Kyoto International Manga Museum · Sceso a Kyoto, posa i bagagli o vai diretto qui (vicino a **Karasuma Oike**)"},
   {id:7,time:"17:30",txt:"🏠 Check-in: Guesthouse KYOTO COMPASS · Raggiungi la guesthouse"},
   {id:8,time:"19:00",txt:"🏮 L'Atmosfera di Pontocho · Spostati verso il **fiume Kamo**"},
   {id:9,time:"20:00",txt:"🥢 Cena e Fiume Kamo · Cena in una delle **izakaya del vicolo**"},
 ],exp:[]},

{n:17,d:"13/06",dow:"Sab",c:"Kyoto Centro",j:"京都",p:1,sl:"Guesthouse KYOTO COMPASS",
 a:["🌅 Fushimi Inari ALL'ALBA — prima 6:00","Sannenzaka + Higashiyama","🍡 MOCHI MOCHI live","🍳 Sera: KICHI KICHI OMURICE","🛍️ POKEMON CENTER KYOTO"],
 m:["🦊 Fushimi Inari alba","🍳 Kichi Kichi: show omurice virale"],b:63,st:"ok",
 nt:"📌 Kichi Kichi: prenota settimane prima. Piano B: Menbaka Fire Ramen.",
 schedule:[
   {id:1,time:"05:30",txt:"⏰ La Sveglia Brutale (Ma Necessaria)"},
   {id:2,time:"06:00",txt:"⛩️ Fushimi Inari-taisha · A quest'ora l'impatto con i **tunnel di torii rossi** è **mistico**"},
   {id:3,time:"10:00",txt:"☕ Colazione/Recupero post-scalata"},
   {id:4,time:"10:30",txt:"🏛️ Kiyomizu-dera & Le Strade Storiche"},
   {id:5,time:"14:00",txt:"🛍️ Pokemon Center Kyoto · Vai verso **Kawaramachi** ed entra al **Takashimaya T8**"},
   {id:6,time:"16:00",txt:"🍵 Relax a Gion"},
   {id:7,time:"19:00",txt:"🍳 Spettacolo e Cena: Kichi Kichi o Menbaka · Entrambi sono pura **teatralità** e **maestria tecnica**:"},
   {id:8,time:"20:30",txt:"🏃‍♂️ CORSA 7: Fiume Kamogawa (Il Grande Classico)"},
   {id:9,time:"21:00",txt:"🌉 Passeggiata sul Kamogawa · Torna verso il **fiume Kamo**"},
 ],exp:[]},

{n:18,d:"14/06",dow:"Dom",c:"Kyoto Ovest (Arashiyama)",j:"京都・嵐山",p:1,sl:"Guesthouse KYOTO COMPASS",
 a:["🎍 Arashiyama: foresta bambù alba + Tenryu-ji","🗿 OTAGI NENBUTSUJI: 1200 statue — nascosto!","🎵 ORGEL-DO: carillon","🏯 Kinkaku-ji pomeriggio"],
 m:["🗿 Otagi Nenbutsuji: ogni statua scolpita da devoto"],b:51,st:"ok",
 nt:"Otagi Nenbutsuji: 20min a piedi da bambù — zero turisti.",
 schedule:[
   {id:1,time:"07:00",txt:"🎍 Arashiyama: La Foresta di Bambù · Arriva **prestissimo** e punta dritto al bosco"},
   {id:2,time:"08:00",txt:"⛩️ Tenryu-ji e le Simmetrie · Visita il **giardino zen** di questo tempio **patrimonio UNESCO**"},
   {id:3,time:"09:00",txt:"🗿 Otagi Nenbutsuji (La Perla Nascosta) · Fatti la camminata in salita (circa **20-30 minuti**) per allontanarti dalla folla"},
   {id:4,time:"11:00",txt:"🎵 Kyoto Orgel-Dō · Sulla via del ritorno verso la stazione, fermati in questo **negozio specializzato in carillon**"},
   {id:5,time:"13:00",txt:"🥢 Nishiki Market: Street Food · Spostati nel centro di Kyoto"},
   {id:6,time:"15:00",txt:"🏯 Kinkaku-ji (Il Padiglione d'Oro)"},
   {id:7,time:"18:00",txt:"🏠 Rientro e Cena Libera · Rientro alla Compass"},
 ],exp:[]},

{n:19,d:"15/06",dow:"Lun",c:"Kyoto → Osaka",j:"京都→大阪",p:1,sl:"Guesthouse U-En Osaka",
 a:["Mattina: Nishiki + shopping","Kyoto→Osaka (~30min)","🌃 DOTONBORI — neon, takoyaki","🦞 Kuromon Ichiba","🌃 Shinsekai + Torre Tsūtenkaku"],
 m:["🌃 Dotonbori: l'Osaka da anime"],b:47,st:"ok",
 nt:"Zona ostello: Namba o Shinsaibashi.",
 schedule:[
   {id:1,time:"10:00",txt:"🛍️ Ultime compere a Kyoto"},
   {id:2,time:"11:00",txt:"🚃 Lo Shinkaisoku (Special Rapid) · Sali sul **treno locale veloce**"},
   {id:3,time:"12:00",txt:"🎒 Check-in Guesthouse U-En Osaka"},
   {id:4,time:"13:30",txt:"🏙️ Shinsekai: Retro-Futurismo · Punta dritto a sud"},
   {id:5,time:"15:30",txt:"🦞 Kuromon Ichiba Market · Rispetto al mercato di Kyoto, qui le porzioni sono **più grandi, sfacciate e ignoranti**"},
   {id:6,time:"17:30",txt:"🌃 Dotonbori: I Neon si Accendono · Passeggiata lungo il canale"},
   {id:7,time:"18:30",txt:"🐙 Takoyaki Kukuru & Okonomiyaki · Mettiti in fila per le **polpette di polpo roventi** da **Kukuru**"},
 ],exp:[]},

{n:20,d:"16/06",dow:"Mar",c:"Osaka — USJ",j:"大阪",p:1,sl:"Guesthouse U-En Osaka",
 a:["🎮 UNIVERSAL STUDIOS JAPAN — full day!","Super Nintendo World (Mario/Zelda/DK)","Harry Potter Wizarding World","💡 Express Pass FONDAMENTALE"],
 m:["🎌 Super Nintendo World: Mario, Zelda, DK"],b:195,st:"ok",
 nt:"📌 Express Pass Klook. Nintendo World senza lotteria.",
 schedule:[
   {id:1,time:"08:00",txt:"🚃 Spostamento verso il Parco"},
   {id:2,time:"09:00",txt:"🎮 Super Nintendo World · Sfrutta l'**Express Pass** per saltare i drammi"},
   {id:3,time:"11:00",txt:"🎢 Le Attrazioni Anime a Tempo Limitato"},
   {id:4,time:"14:30",txt:"⚡ Wizarding World of Harry Potter · L'impatto con **Hogwarts ricreata in scala** e il villaggio di **Hogsmeade** è pazzesco"},
   {id:5,time:"20:00",txt:"🍜 Rientro Collassato · La giornata al parco ti **svuoterà completamente le energie**"},
 ],exp:[]},

{n:21,d:"17/06",dow:"Mer",c:"Osaka — Den Den Town",j:"大阪",p:1,sl:"Guesthouse U-En Osaka",
 a:["🎌 DEN DEN TOWN: shopping otaku","🐾 ANIMEAL Cafe: capybara 12:00-15:30","🎣 ZAUO Fishing Restaurant","💼 PREPARAZIONE ZAINI VAN"],
 m:["🎌 Den Den Town: tana otaku Osaka","🐾 Animeal: capybara + esotici"],b:130,st:"ok",
 nt:"Ultima notte letto normale 3 settimane — bucato!",
 schedule:[
   {id:1,time:"10:00",txt:"🎌 Den Den Town: La Caccia · La risposta di Osaka ad Akihabara"},
   {id:2,time:"12:00",txt:"🐾 ANIMEAL Cafe Shinsaibashi"},
   {id:3,time:"18:30",txt:"🎣 La Cena Sfida: ZAUO Fishing Restaurant Namba"},
   {id:4,time:"21:00",txt:"💼 PREPARAZIONE VAN: La Svolta Logistica · Rientro in ostello"},
 ],exp:[]},

{n:22,d:"18/06",dow:"Gio",c:"Osaka → Amanohashidate → Ine",j:"大阪→天橋立→伊根",p:2,sl:"🚐 Van (Michi-no-Eki)",
 a:["🚐 Ritiro van mattina","🛒 Spesa grossa supermercato","🌉 AMANOHASHIDATE: mata-nozoki — uno dei 3 più belli!","🌊 INE NO FUNAYA: case-barca tramonto","🌅 Prima notte van"],
 m:["🚐 INIZIO VAN LIFE!","🌉 Amanohashidate: passaggio Osaka"],b:55,st:"ok",
 nt:"Guida sinistra! Amanohashidate ~2h da Osaka, poi 20min Ine.",
 schedule:[
   {id:1,time:"08:30",txt:"🚐 Il Passaggio di Consegne · Ritiro del van"},
   {id:2,time:"09:30",txt:"🛒 Missione Sopravvivenza (Mega-Spesa) · Tappa in un **Gyomu Super**, **AEON** o **MaxValu** fuori dal centro"},
   {id:3,time:"14:00",txt:"🌉 Amanohashidate (Il Ponte verso il Cielo) · Arrivo sulla costa"},
   {id:4,time:"16:30",txt:"🚗 Strada Costiera verso Nord · Guidata panoramica lungo il **Mar del Giappone**"},
   {id:5,time:"17:30",txt:"🌊 Ine no Funaya (Tramonto) · Arrivo al **villaggio galleggiante**"},
   {id:6,time:"20:00",txt:"🏕️ Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:23,d:"19/06",dow:"Ven",c:"Ine → Tottori",j:"伊根→鳥取",p:2,sl:"🚐 Michi-no-Eki",
 a:["🌊 URADOME COAST: hike scogliere — grotte marine","🏜️ DUNE SABBIA TOTTORI: Sahara giapponese — corsa tramonto!","🎨 Sand Museum"],
 m:["🏜️ Dune Tottori: immagine anti-Giappone"],b:50,st:"ok",
 nt:"Tottori: granchi e pesce fresco porto.",
 schedule:[
   {id:1,time:"10:00",txt:"🌊 Uradome Coast: L'Hike delle Scogliere · Arrivo in questa sezione del **parco nazionale geologico**"},
   {id:2,time:"14:00",txt:"🎨 The Sand Museum · Subito prima delle dune, fermati in questo **museo unico al mondo**"},
   {id:3,time:"16:00",txt:"🏜️ Dune di Tottori (Tottori Sakyu) · Il **\"Sahara del Giappone\"**"},
   {id:4,time:"18:30",txt:"🦀 Cena al Porto · Tottori è famosa per i **granchi (Matsuba-gani)** e il pesce bianco"},
   {id:5,time:"20:30",txt:"🏕️ Database Sosta Notturna (A scelta dal Mood)"},
 ],exp:[]},

{n:24,d:"20/06",dow:"Sab",c:"Tottori → Matsue",j:"鳥取→松江",p:2,sl:"🚐 Michi-no-Eki",
 a:["🕵️ HOKUEI: Museo Detective Conan + statue","🏯 MATSUE-JŌ: uno dei 12 castelli originali","🌅 Lago Shinjiko tramonto"],
 m:["🎌 DETECTIVE CONAN: Hokuei = hometown creatore 🕵️"],b:50,st:"ok",
 nt:"Matsue-jo: castello originale — legno scuro.",
 schedule:[
   {id:1,time:"10:00",txt:"🕵️ Conan Town (Hokuei) · Il **paese natale** dell'autore di **Detective Conan**"},
   {id:2,time:"13:30",txt:"🏯 Il Castello di Matsue · Uno dei soli **12 castelli originali** rimasti in Giappone (**non ricostruiti in cemento**)"},
   {id:3,time:"15:30",txt:"🛶 Horikawa Pleasure Boat"},
   {id:4,time:"17:30",txt:"🌅 Il Tramonto sul Lago Shinji · Parcheggia il van lungo la **sponda del lago**"},
   {id:5,time:"20:30",txt:"🏕️ Database Sosta Notturna (A scelta dal Mood)"},
 ],exp:[]},

{n:25,d:"21/06",dow:"Dom",c:"Matsue → Hiroshima",j:"松江→広島",p:2,sl:"🚐 Van",
 a:["⛩️ IZUMO TAISHA: tra santuari più sacri","Guida sud attraverso Honshu","Arrivo Hiroshima sera"],
 m:["⛩️ Izumo Taisha: gravità diversa — si percepisce"],b:45,st:"ok",
 nt:"Shimenawa gigante — tutti dei Giappone si riuniscono qui.",
 schedule:[
   {id:1,time:"08:00",txt:"⛩️ Izumo Taisha (Il Santuario degli Dei) · Uno dei **santuari scintoisti più antichi e sacri** in assoluto"},
   {id:2,time:"11:00",txt:"🚗 Il Taglio di Honshu · Inizia la **guidata verso sud**"},
   {id:3,time:"18:30",txt:"🏙️ Arrivo a Hiroshima & Il Tempio del Cibo · Arrivo a destinazione"},
   {id:4,time:"21:00",txt:"🏕️ Database Sosta Notturna (A scelta dal Mood)"},
 ],exp:[]},

{n:26,d:"22/06",dow:"Lun",c:"Hiroshima / Miyajima",j:"広島・宮島",p:2,sl:"🚐 Van",
 a:["🚐 Van al porto — parcheggio","⛴️ Traghetto MIYAJIMA (~10min)","⛩️ ITSUKUSHIMA SHRINE: torii nell'acqua","🦌 Cervi liberi isola"],
 m:["⛩️ Itsukushima: torii acqua — icona Giappone"],b:55,st:"ok",
 nt:"Torii galleggiante alta marea — controlla maree!",
 schedule:[
   {id:1,time:"08:30",txt:"🚗 Arrivo e Abbandono del Van · Punta dritto a **Miyajimaguchi**"},
   {id:2,time:"09:00",txt:"⛴️ La Traversata (10 minuti)"},
   {id:3,time:"09:30",txt:"⛩️ Itsukushima Shrine (Alta Marea) · Arrivo sull'isola e **slalom tra i cervi liberi**"},
   {id:4,time:"11:00",txt:"🏔️ L'Ascesa al Monte Misen · Salita in **funivia** e poi **a piedi** (circa 30 minuti) fino alla vetta"},
   {id:5,time:"13:30",txt:"🦪 Ostriche e Acero (Street Food) · Sceso dal monte, fiondati su **Omotesando Street**"},
   {id:6,time:"14:30",txt:"🛍️ Esplorazione e Artigianato · Gira per i **vicoli interni meno battuti**"},
   {id:7,time:"16:00",txt:"⛩️ Il Torii a Bassa Marea (La Camminata sul Fondo) · Torna verso il **grande portale rosso**"},
   {id:8,time:"17:30",txt:"⛴️ Traghetto al Tramonto · Riprendi il traghetto verso la terraferma"},
   {id:9,time:"18:00",txt:"🚐 Ritiro Van e Pit-stop Logistico · Recupera il mezzo dal parcheggio di Miyajimaguchi"},
   {id:10,time:"19:00",txt:"🥢 Cena Locale · Prima di isolarti nello spot notturno, mangia qualcosa in zona"},
   {id:11,time:"20:30",txt:"🚐 Spostamento verso il Campo Base · Metti in moto e dirigi il van verso lo **spot notturno** che hai selezionato sull'app:"},
   {id:12,time:"21:30",txt:"🌌 Setup Serale e Relax · Arrivo, spegnimento del motore"},
 ],exp:[]},

{n:27,d:"23/06",dow:"Mar",c:"Etajima",j:"江田島",p:2,sl:"🚐 Van",
 a:["⛴️ Traghetto ETAJIMA — isola rurale Mare Seto","Esplorazione van — natura, zero turisti","Giornata lenta 🌿"],
 m:[],b:45,st:"ok",
 nt:"Strade costiere deserte, agrumi picco mare. Guida pura.",
 schedule:[
   {id:1,time:"06:30",txt:"☕ L'Alba sul Cruscotto · Il bello del van è che **non devi aspettare le colazioni degli hotel**"},
   {id:2,time:"08:30",txt:"⛩️ Motonosumi Shrine (Il Drago sulla Scogliera) · Arrivi qui che c'è solo il **rumore dell'oceano**"},
   {id:3,time:"11:30",txt:"🌉 Tsunoshima Bridge (L'Illusione Ottica) · Proseguendo sulla **statale costiera**, il paesaggio cambia"},
   {id:4,time:"14:30",txt:"🚗 La Discesa verso il Confine"},
   {id:5,time:"18:00",txt:"🗼 Kaikyo Yume Tower (La Mappa di Luce) · Parcheggia il van e sali a **143 metri d'altezza** su questa torre di vetro"},
   {id:6,time:"19:30",txt:"🐡 Il Rischio Calcolato: Sashimi di Fugu · Shimonoseki non è una città normale, è la **capitale mondiale del Fugu** (il pesce palla)"},
   {id:7,time:"21:30",txt:"♨️ Sento di Confine e Chiusura"},
 ],exp:[]},

{n:28,d:"24/06",dow:"Mer",c:"Hiroshima → Nagato",j:"広島→長門",p:2,sl:"🚐 Michi-no-Eki",
 a:["⛩️ MOTONOSUMI SHRINE: 123 torii rossi bordo scogliera!","🌉 TSUNOSHIMA: ponte bianco mare turchese"],
 m:["⛩️ Motonosumi: iconico","🌉 Tsunoshima: irreale"],b:45,st:"ok",
 nt:"Domani Kanmon Tunnel → Kyushu.",
 schedule:[
   {id:1,time:"08:00",txt:"🕳️ Il Salto Sottomarino (Kanmon Tunnel) · Niente ponti panoramici stamattina"},
   {id:2,time:"09:30",txt:"🗡️ Shohachiman Shrine (La Reliquia nel Bosco) · Addentrati nei **boschi intorno a Kitakyushu**"},
   {id:3,time:"13:00",txt:"🏙️ L'Impatto con Fukuoka (Daimyo District) · Lasciati la natura alle spalle ed entra nel **caos stradaiolo di Fukuoka**"},
   {id:4,time:"17:30",txt:"🏃‍♂️ CORSA 8: Ohori Park (La Pista sul Lago) · Prima della cena, vai al **Ohori Park**"},
   {id:5,time:"19:00",txt:"🏮 Nakasu Yatai (La Notte del Brodo)"},
   {id:6,time:"22:00",txt:"🍻 Oyafuko Dori (L'Underground) · Non si torna al van"},
 ],exp:[]},

{n:29,d:"25/06",dow:"Gio",c:"Nagato → Fukuoka",j:"長門→福岡",p:2,sl:"🚐 Van",
 a:["🗡️ SHOHACHIMAN SHRINE: pietra DEMON SLAYER — Tanjiro spaccata qui!","Kanmon Tunnel → Kyushu","🏮 YATAI Nakasu: bancarelle fiume"],
 m:["🎌 DEMON SLAYER: Shohachiman = pietra Tanjiro!"],b:55,st:"ok",
 nt:"Kanmon Tunnel ~1.000¥. Yatai: dal tramonto.",
 schedule:[
   {id:1,time:"08:30",txt:"🗿 Nanzo-in (Il Peso del Metallo) · Guidi fuori dalla metropoli in direzione dei **monti di Sasaguri**"},
   {id:2,time:"11:30",txt:"🚗 Taglio verso le Pianure del Sud · Rimettiti alla guida"},
   {id:3,time:"13:00",txt:"🚣 Yanagawa (Il Ritmo Sospeso) · Arrivi a **Yanagawa**, la **città dell'acqua**"},
   {id:4,time:"15:30",txt:"🍣 Il Piatto della Leggenda: Unagi no Seiro Mushi · Sceso dalla barca, l'**odore di carbone e salsa di soia dolce** ti guida nei vicoli"},
   {id:5,time:"17:30",txt:"🚗 La Deviazione Hardcore: Kurume · La giornata non è finita"},
   {id:6,time:"19:30",txt:"🍜 Taiho Ramen (Il Battesimo del Fuoco)"},
   {id:7,time:"21:30",txt:"🍶 I Vicoli degli Spiedini"},
 ],exp:[]},

{n:30,d:"26/06",dow:"Ven",c:"Fukuoka → Yanagawa",j:"福岡→柳川",p:2,sl:"🚐 Van",
 a:["🗿 NANZO-IN: Buddha sdraiato più grande bronzo mondo (41m!)","🚣 YANAGAWA RIVER CRUISE: barche piatte canali","🍣 Unaju: anguilla laccata"],
 m:["🗿 Nanzo-in: quasi nessun turista straniero"],b:55,st:"ok",
 nt:"Nanzo-in: stazione Kido-Nanzoin-mae.",
 schedule:[
   {id:1,time:"07:30",txt:"☕ L'Aria del Mattino e il Check delle Maree · Sveglia"},
   {id:2,time:"09:30",txt:"🌊 Nagabeta Seabed Road (Il Treno di Chihiro) · Guidi fino alla costa del **mare di Ariake**"},
   {id:3,time:"12:00",txt:"🏴‍☠️ La Caccia al Tesoro: Jinbe e One Piece · Scendi verso **Kumamoto**"},
   {id:4,time:"15:00",txt:"🏯 Kumamoto Castle (Le Cicatrici di Pietra) · Entri nel cuore di **Kumamoto**"},
   {id:5,time:"18:30",txt:"🥩 Il Sapore di Kumamoto: Basashi · Parcheggi e ti infili nella **galleria commerciale di Shimotori**"},
   {id:6,time:"21:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:31,d:"27/06",dow:"Sab",c:"Yanagawa → Kumamoto",j:"柳川→熊本",p:2,sl:"🚐 Van",
 a:["🌊 NAGABETA SEABED ROAD: pali mare ⚠️ Verificare maree!","🏴‍☠️ Statua Jinbe ONE PIECE","🏴‍☠️ KUMAMOTO CITY: statue One Piece bronzo"],
 m:["🎌 Nagabeta: Spirited Away realtà!","🏴‍☠️ ONE PIECE Kumamoto"],b:45,st:"ok",
 nt:"📌 Calcola marea prima partire!",
 schedule:[
   {id:1,time:"07:30",txt:"🚗 L'Autostrada verso Sud · Sveglia e si guida decisi verso l'**estremo sud**"},
   {id:2,time:"10:30",txt:"🌋 L'Impatto con Kagoshima e il Sakurajima · Arrivi in città e lo vedi subito"},
   {id:3,time:"12:30",txt:"⛴️ Il Traghetto Vulcanico (Col Van) · Non lo guardiamo da lontano"},
   {id:4,time:"13:30",txt:"🪨 Arimura Lava Observatory · Guidi il van sulla **strada che costeggia il vulcano**"},
   {id:5,time:"16:30",txt:"♨️ Pediluvio e Rientro · Fermati al **Nagisa Foot Bath** sul vulcano"},
   {id:6,time:"17:30",txt:"🏃‍♂️ CORSA 9: Sakurajima Waterfront (Il Vulcano che Fuma) · Dopo il pediluvio, allaccia le scarpe per una **corsa lungo la costa di Kagoshima**"},
   {id:7,time:"19:00",txt:"🥢 Il Trionfo della Ciccia: Kurobuta Tonkatsu"},
   {id:8,time:"21:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:32,d:"28/06",dow:"Dom",c:"Kumamoto → Takachiho",j:"熊本→高千穂",p:2,sl:"🚐 Van",
 a:["🌿 KAMISHIKIMI KUMANOIMASU: scalinata magica foresta","🏞️ GOLA TAKACHIHO: canyon sacro mitologia","🚣 Barca gola — cascate + acqua smeraldo (~25€)"],
 m:["🎌 Takachiho: luogo sacro — atmosfera anime"],b:65,st:"ok",
 nt:"Barca: prenotare o arrivare presto. Kamishikimi ~30min.",
 schedule:[
   {id:1,time:"07:30",txt:"🚗 Taglio Verso la Costa del Pacifico · Sveglia, metti in moto e attraversi la penisola puntando a est"},
   {id:2,time:"10:30",txt:"🌴 Aoshima e la Tavola del Lavandaio · Parcheggi e cammini sul **ponte** che collega la costa alla minuscola **isola di Aoshima**"},
   {id:3,time:"13:00",txt:"🍗 Calorie e Aceto: Il Chicken Nanban · Miyazaki ha inventato il **Chicken Nanban**"},
   {id:4,time:"15:30",txt:"⛩️ Udo Jingu (Il Santuario nella Grotta) · Guida verso sud lungo la scenografica **Statale 220**, affacciata a **strapiombo sull'oceano**"},
   {id:5,time:"17:30",txt:"🏃‍♂️ Corsa al Tramonto sulla Costa Nichinan · Fai retrofront verso nord"},
   {id:6,time:"18:45",txt:"♨️ Aoshima Onsen (Via il Sale)"},
   {id:7,time:"20:00",txt:"🏮 Il Labirinto di Nishitachi · Guida fino al centro di Miyazaki"},
   {id:8,time:"21:00",txt:"🔥 Fumo e Jidori (La Cena delle Fiamme) · Miyazaki ha un'altra specialità oltre al pollo fritto: il **Jidori** (il **pollo ruspante locale**)"},
   {id:9,time:"23:30",txt:"🏕️ Rientro Barcollante al Van · Adesso la giornata è finita per davvero"},
 ],exp:[]},

{n:33,d:"29/06",dow:"Lun",c:"Takachiho → Kurokawa",j:"高千穂→黒川",p:2,sl:"🚐 Van",
 a:["🌋 MONTE ASO: corsa bordo cratere attivo — paesaggio lunare","♨️ KUROKAWA ONSEN: kashikiri bosco — tatuaggio ok!","Relax vulcanico 🌿"],
 m:["🌋 Monte Aso: cratere attivo — alieno"],b:55,st:"ok",
 nt:"📌 Aso: verifica attività vulcanica! Kurokawa kashikiri: prenotare.",
 schedule:[
   {id:1,time:"07:30",txt:"☕ Risveglio tra le Montagne · L'aria qui è **pungente**"},
   {id:2,time:"09:00",txt:"🌿 Kamishikimi Kumanoimasu Shrine (Il Portale) · Arrivi qui **prima dei turisti**"},
   {id:3,time:"11:30",txt:"🚗 Rientro in Prefettura di Miyazaki · Guidata tra i **tornanti** per scendere verso la cittadina di **Takachiho**"},
   {id:4,time:"13:00",txt:"🥢 Pranzo: Nagashi Somen · Fermati da **Chiho no Ie** vicino alla gola"},
   {id:5,time:"14:30",txt:"🏞️ La Gola di Takachiho e la Barca · Scendi nel **canyon vulcanico** di Takachiho"},
   {id:6,time:"18:00",txt:"🥩 Cena: Manzo di Takachiho · Trovati un'**izakaya** o un ristorante **Yakiniku** in paese"},
   {id:7,time:"20:00",txt:"👹 Yokagura (La Danza degli Dei) · Non si dorme ancora"},
   {id:8,time:"21:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:34,d:"30/06",dow:"Mar",c:"Kurokawa → Yufuin → Beppu",j:"黒川→由布院→別府",p:2,sl:"🚐 Michi-no-Eki Beppu",
 a:["⚔️ HITA CITY — ŌYAMA DAM: Eren+Mikasa+Armin bronzo — Wall Maria!","🚂 BUNGO-MORI: LA PORTA DI SUZUME 🎌","🌋 YUFUIN: onsen village","Arrivo Beppu"],
 m:["🎌 ATTACK ON TITAN: Ōyama Dam = Wall Maria!","🎌 SUZUME: porta reale Shinkai"],b:55,st:"ok",
 nt:"App 'Attack on Titan in Hita' per AR Colossal Titan.",
 schedule:[
   {id:1,time:"07:30",txt:"📱 Check Vulcanico e Partenza · Sveglia"},
   {id:2,time:"09:30",txt:"🌋 Kusasenri-ga-hama (La Corsa sull'Altopiano) · Arrivi sulla **caldera esterna**"},
   {id:3,time:"11:30",txt:"🔥 Cratere Nakadake (Se Aperto) · Se l'allerta lo permette, sali fino al **bordo del cratere principale**"},
   {id:4,time:"13:00",txt:"🚗 La Traversata del Kuju · Rimettiti alla guida verso nord"},
   {id:5,time:"15:00",txt:"♨️ Kurokawa Onsen (Il Bagno Privato)"},
   {id:6,time:"19:00",txt:"🍶 Atmosfera Notturna a Kurokawa · Il paese di sera si illumina solo con **lanterne di carta** sul fiume"},
   {id:7,time:"21:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:35,d:"01/07",dow:"Mer",c:"Beppu → Kunisaki",j:"別府→国東",p:2,sl:"🚐 Van",
 a:["🔴🔵 JIGOKU MEGURI: 9 hell hot springs (~15€)","Sunamushi: sabbia vulcanica calda","⛩️ Kunisaki: templi nascosti foresta"],
 m:["🎌 Beppu: colori non esistono natura"],b:50,st:"ok",
 nt:"Jigoku Meguri ~1.500¥. Sunamushi ~1.500¥.",
 schedule:[
   {id:1,time:"08:00",txt:"🚗 Avvicinamento a Shiganshina · Guida scendendo dalle **montagne di Aso** verso la **valle di Hita**"},
   {id:2,time:"09:30",txt:"🧱 Oyama Dam (La Disperazione dei Bambini) · Inizia da qui"},
   {id:3,time:"11:30",txt:"🖼️ Attack on Titan in HITA Museum (Annex) · Vai al **museo dedicato** (ingresso **gratuito**, si trova proprio nel **Michi-no-Eki di Oyama**)"},
   {id:4,time:"13:30",txt:"🥢 Pranzo: Hita Yakisoba · Spostati verso il centro città"},
   {id:5,time:"15:00",txt:"🏙️ Il Centro Storico: Mameda-machi · Oltre ad AOT, Hita è chiamata la **\"Piccola Kyoto del Kyushu\"**"},
   {id:6,time:"17:30",txt:"⚔️ Hita Station (Il Capitano Levi) · Torna in piazza alla stazione centrale"},
   {id:7,time:"19:30",txt:"🍻 Serata a Kuma-machi · Vai verso il **fiume Mikuma**"},
   {id:8,time:"21:30",txt:"🏕️ Database Sosta Notturna Hita (Le 3 Opzioni Tattiche)"},
 ],exp:[]},

{n:36,d:"02/07",dow:"Gio",c:"Kunisaki → Matsuyama (Shikoku)",j:"国東→松山",p:2,sl:"🚐 Van",
 a:["🗿 USUKI STONE BUDDHAS — 59 buddha foresta (~5€)","⛴️ TRAGHETTO VEICOLARE → Matsuyama 🚢","Arrivo Shikoku"],
 m:["🎌 Shikoku: isola più autentica"],b:110,st:"ok",
 nt:"Traghetto veicolare: prenotato ✓",
 schedule:[
   {id:1,time:"07:30",txt:"☕ L'Uscita dalla Valle · Sveglia a Hita"},
   {id:2,time:"08:30",txt:"🚂 Bungo-Mori Roundhouse (La Porta verso l'Altrove) · A soli 30 minuti di guida arrivi alla **stazione di Bungo-Mori**"},
   {id:3,time:"11:00",txt:"🚗 L'Arrampicata verso Yufuin · La strada inizia a **salire**, il paesaggio si apre"},
   {id:4,time:"11:45",txt:"🥩 Yunotsubo Street & Bungo Beef (L'Estetica dell'Onsen) · Arrivi a **Yufuin**, molli il van al primo coin parking"},
   {id:5,time:"13:30",txt:"🌫️ Lago Kinrin · Alla fine della via principale trovi questo **piccolo lago**"},
   {id:6,time:"15:30",txt:"🚗 La Discesa su Beppu (Steampunk City) · Rimettiti alla guida"},
   {id:7,time:"17:00",txt:"♨️ Takegawara Onsen (Il Bagno del Popolo) · Vai nel cuore storico di Beppu"},
   {id:8,time:"19:30",txt:"🍗 Toriten e Shochu · Asciugato e rigenerato, infilati in un'**izakaya** nei vicoli di Beppu"},
   {id:9,time:"21:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:37,d:"03/07",dow:"Ven",c:"Matsuyama → Onomichi",j:"松山→尾道",p:2,sl:"🚐 Van",
 a:["🛁 DŌGO ONSEN: 3000 anni — ispirazione Spirited Away! Kashikiri 🎌","🚂 SHIMONADA STATION: stazione nel mare 📸","🌊 Arrivo ONOMICHI: città artisti e gatti"],
 m:["🎌 DŌGO ONSEN = bagni Yubaba!","🎌 Shimonada: stazione mare"],b:55,st:"ok",
 nt:"📌 Dōgo kashikiri: prenotare. Shimonada: pochi treni giorno.",
 schedule:[
   {id:1,time:"07:30",txt:"☕ L'Odore di Zolfo · Colazione veloce"},
   {id:2,time:"09:00",txt:"🔴🔵 Jigoku Meguri (I Sette Inferni di Beppu) · Fai il tour degli **\"Inferni\"**"},
   {id:3,time:"11:30",txt:"🏖️ Beppu Kaihin Sand Bath (Sepolti Vivi) · Spostati sul **lungomare di Shoningahama**"},
   {id:4,time:"13:00",txt:"🚗 Taglio Verso Sud (Rotta per Usuki) · Recuperi il van e guidi verso sud lungo la **Statale 10** per circa un'ora"},
   {id:5,time:"14:30",txt:"🗿 Usuki Stone Buddhas (Usuki Sekibutsu) · Arrivi nel bosco di Usuki (~5€ l'ingresso)"},
   {id:6,time:"16:30",txt:"⛴️ L'Imbarco (Porto di Usuki / Yawatahama) · **Mossa Logistica:** Visto che sei già a Usuki, te ne sbatti di tornare a Beppu"},
   {id:7,time:"17:30",txt:"🌊 La Traversata del Bungo Channel · La nave molla gli ormeggi"},
   {id:8,time:"20:00",txt:"🚗 Sbarco nello Shikoku (Yawatahama → Matsuyama) · Sbarco a **Yawatahama** (Prefettura di **Ehime**, isola di **Shikoku**)"},
   {id:9,time:"21:30",txt:"🏯 Dogo Onsen (Passeggiata Notturna) · Arrivi a Matsuyama"},
   {id:10,time:"23:00",txt:"🏕️ Database Sosta Notturna Matsuyama (A Scelta dal Mood)"},
 ],exp:[]},

{n:38,d:"04/07",dow:"Sab",c:"Shimanami Kaidō",j:"しまなみ海道",p:2,sl:"🚐 Van",
 a:["🚴 SHIMANAMI KAIDŌ: corsa/ciclovia ponti Mare Seto","Noleggio bici se non corri (~20€)","Soste Ōshima, Hakata-jima 🌊"],
 m:["🎌 Shimanami Kaidō: percorsi ciclabili più belli mondo"],b:45,st:"ok",
 nt:"Bici: Giant noleggio Onomichi Station.",
 schedule:[
   {id:1,time:"07:30",txt:"🏰 L'Addio a Matsuyama · Caffè, metti in moto e punta il muso a sud"},
   {id:2,time:"12:30",txt:"🌊 Katsurahama Beach (Il Pacifico Selvaggio) · Arrivi a Kochi, ma prima di entrare in città vai dritto sulla costa"},
   {id:3,time:"15:00",txt:"🏯 Kochi Castle · Entri in città"},
   {id:4,time:"17:00",txt:"🏃‍♂️ CORSA 11: Pista Haruno Athletic Park (Tartan Blu)"},
   {id:5,time:"18:30",txt:"🔥 Hirome Ichiba (Il Caos e il Tonno) · Parcheggia il van per la serata"},
   {id:6,time:"22:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:39,d:"05/07",dow:"Dom",c:"Onomichi → Naruto",j:"尾道→鳴門",p:2,sl:"🚐 Michi-no-Eki Naruto",
 a:["Attraversamento Shikoku","🌀 UZUSHIO: barca vortici Naruto 🍥","Uzu-no-Michi: passerella vetro"],
 m:["🎌 NARUTO: vortici = simbolo Uzumaki 🍥"],b:60,st:"ok",
 nt:"Barca vortici: verificare orari marea.",
 schedule:[
   {id:1,time:"08:00",txt:"🚗 Salita nell'Abisso Verde · Lasci Kochi e punti a nord-est verso le **montagne di Tokushima**"},
   {id:2,time:"11:00",txt:"🌉 Iya Kazurabashi (Il Ponte di Liane) · Arrivi al **ponte sospeso**"},
   {id:3,time:"13:30",txt:"🍜 Pranzo: Iya Soba · Nelle **baracche** vicino al ponte mangia la **soba locale**"},
   {id:4,time:"15:00",txt:"🚯 Il Bambino che fa Pipì (Peeing Boy Statue) · Guidi fino al punto **più alto e pericoloso** della strada della gola"},
   {id:5,time:"18:00",txt:"♨️ Iya Onsen (Il Cavo Sospeso) · Cerca un **onsen** in zona (come l'**Hotel Iyaonsen**, che fa entrare i visitatori)"},
   {id:6,time:"20:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:40,d:"06/07",dow:"Lun",c:"Naruto → Awaji Island",j:"鳴門→淡路島",p:2,sl:"🚐 Van",
 a:["🎌 NIJIGEN NO MORI — NARUTO × BORUTO PARK (~25€)","🌄 SONI HIGHLANDS: altipiani erbosi — quasi nessun turista"],
 m:["🎌 Naruto × Boruto Park: almeno 3-4h"],b:70,st:"ok",
 nt:"Nijigen no Mori: verificare orari.",
 schedule:[
   {id:1,time:"08:00",txt:"🚗 Discesa verso la Costa Est"},
   {id:2,time:"11:30",txt:"🌀 I Vortici di Naruto (Uzushio) · Arrivi allo **Stretto di Naruto**"},
   {id:3,time:"14:00",txt:"🌉 L'Attraversamento dell'Onaruto Bridge · Riprendi il van, entri in autostrada e attraversi il **ponte sospeso**"},
   {id:4,time:"15:30",txt:"🧅 Il Tramonto su Awaji"},
   {id:5,time:"18:00",txt:"🥩 Cena: Awaji Beef"},
   {id:6,time:"20:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:41,d:"07/07",dow:"Mar",c:"Awaji → Nara",j:"淡路島→奈良",p:2,sl:"🚐 Van",
 a:["🦌 NARA: cervi liberi parco","🙏 TŌDAI-JI: Grande Buddha legno più grande mondo","🎋 TANABATA MATSURI: festival stelle!"],
 m:[],b:55,st:"critical",
 nt:"🚨 FIX GEMINI: PARCHEGGIA VAN FUORI NARA! Chiusure stradali Tanabata. 🚗 Avvicinati a piedi festival.",
 schedule:[
   {id:1,time:"08:30",txt:"🏛️ Tadao Ando's Water Temple (Honpukuji) · Prima di lasciare Awaji, immergiti nell'**architettura brutalista**"},
   {id:2,time:"11:00",txt:"🌉 Il Salto Finale: Akashi Kaikyo Bridge"},
   {id:3,time:"12:30",txt:"🚗 Bypass Urbano verso Nara"},
   {id:4,time:"14:30",txt:"🦌 Nara Park e l'Immensità di Legno · Arrivo a **Nara**, prima **capitale fissa del Giappone**"},
   {id:5,time:"17:30",txt:"🏮 Naramachi (Il Quartiere dei Mercanti)"},
   {id:6,time:"20:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"},
 ],exp:[]},

{n:42,d:"08/07",dow:"Mer",c:"Nara → Osaka",j:"奈良→大阪",p:2,sl:"🚐 Van / Area sosta",
 a:["⛩️ KATSUOJI TEMPLE (Minoh): migliaia daruma 🎎","Guida Osaka","🚐 Pulizia van + preparazione bagagli","Ultima notte van"],
 m:["🎌 Katsuoji: daruma charm portare casa!"],b:40,st:"ok",
 nt:"Prepara tutto domani consegna van.",
 schedule:[
   {id:1,time:"07:00",txt:"🏃‍♂️ Corsa all'Alba a Nara Park · L'**ultimo scarico** prima di riconsegnare il van"},
   {id:2,time:"10:30",txt:"🧽 Check Logistico del Van · Fermati in un **autolavaggio self-service** o in una **stazione di servizio** ampia"},
   {id:3,time:"12:00",txt:"🚗 La Discesa nel Gorgo: Osaka · Prendi la **Daini-Hanna Toll Road** e fiondati nel cuore di Osaka"},
   {id:4,time:"14:30",txt:"🏙️ Shimokitazawa del Kansai: Nakazaki-cho o Amerikamura · Parcheggia il bestione"},
   {id:5,time:"19:00",txt:"🐙 Shinsekai o Dotonbori (L'Abbuffata Finale) · La tua **ultima notte vera** nell'Honshu"},
   {id:6,time:"23:00",txt:"🏕️ L'Ultimo Parcheggio (Osaka) · Dimentica la natura"},
 ],exp:[]},

{n:43,d:"09/07",dow:"Gio",c:"Osaka → Okinawa",j:"大阪→沖縄",p:3,sl:"Guesthouse Okinawa",
 a:["🚐 Consegna van — fine Fase Van! 22 giorni road 🎉","✈️ GK357 KIX 15:25 → OKA 17:40 (Jetstar · ZNBWPP)","Arrivo 17:40 — Giappone tropicale 🌺"],
 m:[],b:70,st:"ok",
 nt:"✅ VOLO CONFERMATO: GK357 · Check-in chiude 40min prima",
 schedule:[
   {id:1,time:"08:30",txt:"🚐 La Fine dell'Asfalto · Sveglia, l'**ultimo caffè sul fornelletto**"},
   {id:2,time:"09:30",txt:"🔑 Riconsegna del Mezzo · Controllo danni, chiusura del contratto"},
   {id:3,time:"10:30",txt:"🚉 Spostamento Verso l'Aeroporto"},
   {id:4,time:"12:30",txt:"✈️ Check-in e Pranzo Aeroportuale · Sbriga le pratiche, imbarca il bagaglio"},
   {id:5,time:"15:25",txt:"🛫 Volo per Okinawa · Decollo"},
   {id:6,time:"17:30",txt:"🛬 Muro d'Umidità · Atterri all'**aeroporto di Naha**"},
   {id:7,time:"19:00",txt:"🔑 Check-in all'Umikaji · Sali al **terzo piano** ed entri nel **dormitorio**"},
   {id:8,time:"20:30",txt:"🏮 Il Labirinto di Sakaemachi Market · Molla la roba e cammina dritto verso il **vecchio mercato di Sakaemachi**"},
 ],exp:[]},

{n:44,d:"10/07",dow:"Ven",c:"Okinawa / Kerama",j:"沖縄・慶良間",p:3,sl:"Guesthouse Okinawa",
 a:["🤿 ISOLE KERAMA: snorkeling — tra migliori Asia","Coralli, pesci tropicali, tartarughe marine 🐢","Giornata libertà Pacifico"],
 m:[],b:65,st:"ok",
 nt:"⚠️ Stagione tifoni luglio: monitorare meteo!",
 schedule:[
   {id:1,time:"08:00",txt:"🚢 Il Porto di Tomari (Tomarin) · Sveglia nella **capsula**"},
   {id:2,time:"10:00",txt:"🌊 Aharen Beach (L'Acqua Elettrica)"},
   {id:3,time:"16:30",txt:"🏃‍♂️ Scarico Aerobico sul Lungomare · Prendi il traghetto di rientro e torni a **Naha**"},
   {id:4,time:"20:00",txt:"🥃 Il Rito dello Yuntaku in Terrazza · Doccia veloce in ostello"},
 ],exp:[]},

{n:45,d:"11/07",dow:"Sab",c:"Okinawa / Kerama",j:"沖縄・慶良間",p:3,sl:"Guesthouse Okinawa",
 a:["🤿 Secondo giorno Kerama — snorkeling libero","🌺 Esplora Naha: Kokusai-dori, mercato Makishi","Cucina okinawana: goya champuru + awamori 🍶"],
 m:[],b:60,st:"ok",
 nt:"Giornata libera — senza fretta.",
 schedule:[
   {id:1,time:"08:30",txt:"🚌 Spostamento Verso Centro Isola: Yomitan Village"},
   {id:2,time:"10:30",txt:"🧱 Yachimun no Sato (Il Villaggio della Terra) · Arrivi in questa **comunità di artigiani** immersa nel bosco"},
   {id:3,time:"13:00",txt:"🍜 Il Grasso Sacro: Sōki Soba · Fermati in una **taverna di legno** lungo la strada"},
   {id:4,time:"15:30",txt:"🌴 Corsa a Cape Zanpa"},
   {id:5,time:"19:30",txt:"🧄 L'Inferno di Aglio da Marutama · Rientra a Naha"},
 ],exp:[]},

{n:46,d:"12/07",dow:"Dom",c:"Okinawa",j:"沖縄",p:3,sl:"Guesthouse Okinawa",
 a:["🏯 Shuri Castle: antico regno Ryūkyū","Ultime passeggiate Naha","🍺 Awamori e street food serale — ultima notte tropicale"],
 m:[],b:55,st:"ok",
 nt:"Ultima notte Okinawa. Prepara bagaglio domani.",
 schedule:[
   {id:1,time:"08:00",txt:"🚢 Rotta per Aka Island (L'Isolamento) · Torni al **porto di Tomari**"},
   {id:2,time:"09:30",txt:"🦌 Nishibama Beach e i Cervi di Ryukyu"},
   {id:3,time:"16:30",txt:"🧱 I Muri di Pietra di Tsuboya · Rientra col **traghetto serale** a Naha"},
   {id:4,time:"20:00",txt:"🪕 L'Ultima Cena al Suono del Sanshin"},
 ],exp:[]},

{n:47,d:"13/07",dow:"Lun",c:"Okinawa → Kyoto (Pre-festival)",j:"沖縄→京都",p:3,sl:"Ostello Kyoto",
 a:["✈️ GK352 OKA 12:30 → KIX 14:40 (Jetstar · ZNBWPP)","🚄 Haruka train KIX→Kyoto (~75min)","Arrivo ~16:30 — deposita bagaglio","🏮 Passeggiata Gion — atmosfera pre-festival"],
 m:["🎌 Gion: setting Kimetsu no Yaiba"],b:75,st:"ok",
 nt:"✅ VOLO: GK352 · Check-in chiude 11:50",
 schedule:[
   {id:1,time:"08:00",txt:"🏃‍♂️ L'Ultima Sessione Tropicale · Sveglia nella tua **capsula dal 16 letti**"},
   {id:2,time:"09:30",txt:"🧽 Svuotamento Capsula e Check-out · Torni all'**Umikaji**, ti fai la doccia, recuperi lo zaino dal **locker** e **saluti lo staff**"},
   {id:3,time:"10:30",txt:"🛂 Aeroporto di Naha (OKA) & Check-in · Cammini verso la **monorotaia Yui Rail** in direzione **Naha Airport (OKA)**"},
   {id:4,time:"12:30",txt:"🛫 Volo GK352 - Decollo · Il bestione **Jetstar** stacca le ruote dalla pista"},
   {id:5,time:"14:40",txt:"🛬 Atterraggio a KIX (Kansai International) · Tocchi terra a **Osaka**"},
   {id:6,time:"15:15",txt:"🚄 Il Treno Rapido \"Haruka\""},
   {id:7,time:"16:45",txt:"🔑 Arrivo a Kyoto & Deposito Zaino · Sbarchi a **Kyoto Station**"},
   {id:8,time:"18:30",txt:"🏮 L'Anticipazione del Gion Matsuri (I Primi Carri) · Ti fiondi verso il centro (zona **Shijo-dori / Karasuma-dori**)"},
   {id:9,time:"20:30",txt:"🍜 Cena di Rientro · Infilati in un vicolo lungo il **fiume Kamogawa** (zona **Pontocho**) o vicino a **Karasuma**"},
 ],exp:[]},

{n:48,d:"14/07",dow:"Mar",c:"Kyoto → Tokyo (Yoiyama 🔥)",j:"京都→東京",p:3,sl:"Ostello Tokyo (Shinagawa/Kamata)",
 a:["🦊 Fushimi Inari alba — PRIMA 6:00","Philosopher's Path + Ginkaku-ji mattino","🔥 YOIYAMA pomeriggio/sera: strade chiuse, float illuminati 🎌","Indossa yukata 👘","🚄 Shinkansen Kyoto→Tokyo (lato DESTRO Fuji 🗻)"],
 m:["🎌 Yoiyama: festival 1100 anni — sii nel momento 🔥"],b:85,st:"critical",
 nt:"🚨 FIX GEMINI: PARTENZA SHINKANSEN 16:30-17:00 (NON 20:00!) per vedere Fuji! Tramonto ~19:00. Siediti lato DESTRO sedile E.",
 schedule:[
   {id:1,time:"09:30",txt:"🪵 L'Immensità dei Carri (Yamaboko) · Ti svegli a Kyoto"},
   {id:2,time:"18:00",txt:"🏮 Il Delirio di Lanterne e Street Food · Il sole cala e le strade diventano un **fiume umano ininterrotto**"},
   {id:3,time:"21:00",txt:"🏃‍♂️ Lo Strappo e la Corsa alla Stazione · Qui devi essere un **soldato**"},
   {id:4,time:"21:38",txt:"🚄 L'Ultimo Treno per Tokyo (Nozomi 64) · Salti a bordo dell'**ultimo Shinkansen veloce** della sera diretto a **Tokyo**"},
   {id:5,time:"23:45",txt:"🏙️ Arrivo a Tokyo & Logistica Notturna · Il treno frena a **Tokyo Station** a ridosso della mezzanotte"},
 ],exp:[]},

{n:49,d:"15/07",dow:"Mer",c:"Tokyo → Italia ✈️",j:"東京→🇮🇹",p:3,sl:"—",
 a:["⏰ Sveglia presto!","✈️ Volo HANEDA ore 09:25 — arrivare 2h prima!","Fine avventura. 48 notti. 🎌"],
 m:["🎌 Ultimo giorno Giappone — volo mattina"],b:0,st:"ok",
 nt:"⚠️ Volo Haneda 09:25 — sveglia 06:30! Haneda più vicino centro vs Narita.",
 schedule:[
   {id:1,time:"05:00",txt:"🏃‍♂️ CORSA 14: Palazzo Imperiale (Il Giro d'Onore) - OPZIONALE · **Solo se hai fatto Opzione B (Shinagawa capsule)** la notte prima"},
   {id:2,time:"06:30",txt:"🛂 Controllo Bagagli e Faccia da Zombie"},
   {id:3,time:"07:30",txt:"☕ L'Ultimo Tè Verde al Terminal 3 · Sei dentro l'**area duty-free**"},
   {id:4,time:"08:45",txt:"✈️ Imbarco Gate · Chiamano il tuo volo"},
   {id:5,time:"09:25",txt:"🛫 Il Decollo Finale · I motori spingono, l'aereo **stacca le ruote**"},
 ],exp:[]},
];
// GUIDA CONDENSATA - Punti chiave per ogni giorno

// Totale giorni: 49


function SLabel({children,color,mt}){
  return <div style={{fontSize:8,fontWeight:900,letterSpacing:".12em",textTransform:"uppercase",color:color||"#AAA",marginBottom:5,marginTop:mt||0}}>{children}</div>;
}

function EditTransportModal({dayN,transport,onClose,onSave}){
  const [from,setFrom]=useState(transport?.from||"");
  const [to,setTo]=useState(transport?.to||"");
  const [mode,setMode]=useState(transport?.mode||"train");
  const [minutes,setMinutes]=useState(transport?.min||0);
  const [yen,setYen]=useState(transport?.yen||0);
  const [note,setNote]=useState(transport?.note||"");
  const [jrp,setJrp]=useState(transport?.jrp||false);

  const save=()=>{
    onSave(dayN,{from,to,mode,min:Number(minutes)||0,yen:Number(yen)||0,note,jrp});
    onClose();
  };

  const deleteTransport=()=>{
    if(confirm("🗑️ Eliminare questo trasporto?")){
      onSave(dayN,{from:"",to:"",mode:"walk",min:0,yen:0,note:"",jrp:false});
      onClose();
    }
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"white",width:"100%",maxWidth:600,maxHeight:"85vh",borderTopLeftRadius:12,borderTopRightRadius:12,overflow:"hidden",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:"#0D0D0D",color:"#F4F0E6",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:16,fontWeight:900}}>🚆 Modifica Trasporto</div>
            <div style={{fontSize:10,color:"rgba(244,240,230,.5)",marginTop:2}}>Giorno {dayN}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(244,240,230,.5)",fontSize:24,cursor:"pointer",padding:0,lineHeight:1}}>×</button>
        </div>
        
        <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px"}}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>🚩 Da</label>
            <input value={from} onChange={e=>setFrom(e.target.value)} placeholder="Tokyo" style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>📍 A</label>
            <input value={to} onChange={e=>setTo(e.target.value)} placeholder="Kyoto" style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>🚌 Mezzo</label>
            <select value={mode} onChange={e=>setMode(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}>
              <option value="train">🚆 Treno locale</option>
              <option value="shin">🚄 Shinkansen</option>
              <option value="bus">🚌 Bus</option>
              <option value="van">🚐 Van</option>
              <option value="ferry">⛴️ Traghetto</option>
              <option value="plane">✈️ Aereo</option>
              <option value="local">🚇 Metro</option>
              <option value="walk">🚶 A piedi</option>
            </select>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>⏱ Durata (minuti)</label>
            <input type="number" value={minutes} onChange={e=>setMinutes(e.target.value)} placeholder="120" style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>💴 Costo (¥)</label>
            <input type="number" value={yen} onChange={e=>setYen(e.target.value)} placeholder="5000" style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>📝 Note</label>
            <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Shinkansen Hikari" style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
              <input type="checkbox" checked={jrp} onChange={e=>setJrp(e.target.checked)} style={{width:18,height:18}}/>
              <span style={{fontSize:13,fontWeight:700,color:"#1B4332"}}>✓ Coperto da JR Pass</span>
            </label>
          </div>

          <button onClick={deleteTransport} style={{background:"#FFE5E5",color:"#C1121F",border:"1px solid #C1121F",padding:"8px 12px",fontSize:12,fontWeight:700,borderRadius:4,cursor:"pointer",width:"100%"}}>
            🗑️ Elimina trasporto
          </button>
        </div>

        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #EEE",padding:"12px 16px",display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,background:"#EEE",color:"#666",border:"none",padding:"10px",fontSize:14,fontWeight:700,borderRadius:6,cursor:"pointer"}}>Annulla</button>
          <button onClick={save} style={{flex:1,background:"#1B4332",color:"white",border:"none",padding:"10px",fontSize:14,fontWeight:700,borderRadius:6,cursor:"pointer"}}>💾 Salva</button>
        </div>
      </div>
    </div>
  );
}

function TransportRow({dayN,transportOverrides,onEdit}){
  const defaultTransport=TRANSPORT[dayN];
  const t=transportOverrides[dayN]||defaultTransport;
  if(!t||t.yen===0)return null;
  const eur=(t.yen/160).toFixed(0);
  const icon=TM[t.mode]||"🚌";
  const bg=t.mode==="plane"?"#EEF2FF":t.mode==="van"?"#FDF3E8":t.mode==="ferry"?"#E8F4FD":"#F0F7F0";
  const dur=t.min>=60?`${Math.floor(t.min/60)}h${t.min%60?`${t.min%60}m`:""}`:t.min>0?`${t.min}min`:"";
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",background:bg,borderBottom:"1px solid #EDEAE2",flexWrap:"wrap"}}>
      <span style={{fontSize:15}}>{icon}</span>
      <div style={{flex:1,minWidth:0}}>
        <span style={{fontSize:11,fontWeight:700,color:"#2D2D2D"}}>{t.from} → {t.to}</span>
        <span style={{fontSize:9,color:"#888",marginLeft:8}}>{t.note}</span>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
        {dur&&<span style={{fontSize:9,color:"#666",fontWeight:600}}>⏱ {dur}</span>}
        <span style={{fontSize:11,fontWeight:800,color:"#1565C0"}}>{t.yen.toLocaleString()}¥</span>
        <span style={{fontSize:10,fontWeight:700,color:"#555"}}>~{eur}€</span>
        {t.jrp&&<span style={{fontSize:8,background:"#1B4332",color:"white",padding:"1px 6px",fontWeight:900,borderRadius:2}}>✓ JR Pass</span>}
        <button onClick={(e)=>{e.stopPropagation();onEdit();}} style={{background:"transparent",border:"1px solid #DDD",color:"#666",padding:"4px 8px",fontSize:9,fontWeight:700,borderRadius:3,cursor:"pointer"}}>
          ✏️ Modifica
        </button>
      </div>
    </div>
  );
}

function ExpenseTracker({expenses,onAdd,onDel}){
  const [amt,setAmt]=useState("");
  const [lbl,setLbl]=useState("");
  const [cat,setCat]=useState("food");
  const [cur,setCur]=useState("eur");
  const total=expenses.reduce((a,e)=>a+(e.eur||0),0);
  const doAdd=()=>{
    const n=parseFloat(amt);if(!n||isNaN(n))return;
    const eur=cur==="yen"?+(n/160).toFixed(2):+n.toFixed(2);
    onAdd({id:Date.now(),lbl:lbl||(CATS.find(c=>c.k===cat)?.l||cat),cat,eur,raw:n,cur});
    setAmt("");setLbl("");
  };
  const catTotals=CATS.map(c=>({...c,tot:expenses.filter(e=>e.cat===c.k).reduce((a,e)=>a+(e.eur||0),0)})).filter(c=>c.tot>0);
  return(
    <div style={{borderTop:"1px solid #EDEAE2",padding:"8px 12px 10px",background:"#FDF8F2"}}>
      <SLabel color="#C1121F">💴 Tracker Spese</SLabel>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8,alignItems:"center"}}>
        <input value={amt} onChange={e=>setAmt(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doAdd()} placeholder="Importo" type="number"
          style={{width:80,border:"1px solid #DDD",padding:"5px 7px",fontSize:11,outline:"none",background:"white",borderRadius:2}}/>
        <select value={cur} onChange={e=>setCur(e.target.value)} style={{border:"1px solid #DDD",padding:"5px 6px",fontSize:10,background:"white",cursor:"pointer",fontWeight:700,borderRadius:2}}>
          <option value="eur">€</option><option value="yen">¥</option>
        </select>
        <select value={cat} onChange={e=>setCat(e.target.value)} style={{border:"1px solid #DDD",padding:"5px 6px",fontSize:10,background:"white",cursor:"pointer",flex:1,minWidth:100,borderRadius:2}}>
          {CATS.map(c=><option key={c.k} value={c.k}>{c.l}</option>)}
        </select>
        <input value={lbl} onChange={e=>setLbl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doAdd()} placeholder="Descrizione"
          style={{flex:2,minWidth:90,border:"1px solid #DDD",padding:"5px 7px",fontSize:11,outline:"none",background:"white",borderRadius:2}}/>
        <button onClick={doAdd} style={{background:"#C1121F",color:"white",border:"none",padding:"5px 14px",fontSize:13,fontWeight:900,cursor:"pointer",borderRadius:2}}>+</button>
      </div>
      {expenses.length>0&&(
        <div style={{marginBottom:7,border:"1px solid #EEE",borderRadius:2,overflow:"hidden"}}>
          {expenses.map(e=>{const cc=CATS.find(c=>c.k===e.cat);return(
            <div key={e.id} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 8px",borderBottom:".5px solid #F0EDE4",background:"white"}}>
              <span style={{fontSize:8,background:cc?.c||"#555",color:"white",padding:"1px 5px",fontWeight:800,flexShrink:0,borderRadius:2}}>{cc?.l||e.cat}</span>
              <span style={{fontSize:11,color:"#333",flex:1}}>{e.lbl}</span>
              <span style={{fontSize:11,fontWeight:700,color:"#333",flexShrink:0}}>{e.raw}{e.cur==="yen"?"¥":""} → <strong>{e.eur}€</strong></span>
              <button onClick={()=>onDel(e.id)} style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:14,padding:"0 2px"}}>×</button>
            </div>
          );})}
        </div>
      )}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {catTotals.map(c=><span key={c.k} style={{fontSize:9,background:c.c,color:"white",padding:"2px 7px",fontWeight:800,borderRadius:2}}>{c.l} {c.tot.toFixed(0)}€</span>)}
          {expenses.length===0&&<span style={{fontSize:10,color:"#CCC",fontWeight:700}}>Nessuna spesa</span>}
        </div>
        <div style={{fontSize:13,fontWeight:900,color:"#C1121F"}}>Totale: {total.toFixed(0)}€</div>
      </div>
    </div>
  );
}

function DaySchedule({dayN,schedule,onSave}){
  const [items,setItems]=useState(schedule||[]);
  const [time,setTime]=useState("");
  const [txt,setTxt]=useState("");
  useEffect(()=>setItems(schedule||[]),[schedule]);
  const add=()=>{
    if(!txt.trim())return;
    const newItems=[...items,{id:Date.now(),time,txt:txt.trim()}];
    setItems(newItems);onSave(newItems);
    setTime("");setTxt("");
  };
  const del=(id)=>{const newItems=items.filter(i=>i.id!==id);setItems(newItems);onSave(newItems);};
  const move=(idx,dir)=>{
    const newItems=[...items];
    const swap=idx+dir;
    if(swap<0||swap>=newItems.length)return;
    [newItems[idx],newItems[swap]]=[newItems[swap],newItems[idx]];
    setItems(newItems);onSave(newItems);
  };
  return(
    <div style={{padding:"10px 12px 12px",background:"#FAFAF7",borderTop:"1px solid #EDEAE2"}}>
      <SLabel color="#1565C0">🗓️ Programma del Giorno</SLabel>
      {items.length>0&&(
        <div style={{marginBottom:10,border:"1px solid #E8E4DC",borderRadius:3,overflow:"hidden"}}>
          {items.map((item,idx)=>(
            <div key={item.id} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",
              borderBottom:idx<items.length-1?"1px solid #EDEAE2":"none",background:"white"}}>
              <div style={{display:"flex",flexDirection:"column",gap:1,flexShrink:0}}>
                <button onClick={()=>move(idx,-1)} disabled={idx===0}
                  style={{background:"none",border:"none",cursor:idx===0?"default":"pointer",
                    color:idx===0?"#DDD":"#999",fontSize:10,padding:"0 2px",lineHeight:1}}>▲</button>
                <button onClick={()=>move(idx,1)} disabled={idx===items.length-1}
                  style={{background:"none",border:"none",cursor:idx===items.length-1?"default":"pointer",
                    color:idx===items.length-1?"#DDD":"#999",fontSize:10,padding:"0 2px",lineHeight:1}}>▼</button>
              </div>
              <div style={{width:2,alignSelf:"stretch",background:"#1565C0",borderRadius:2,opacity:.4,flexShrink:0}}/>
              {item.time&&(
                <span style={{fontSize:11,fontWeight:800,color:"#1565C0",flexShrink:0,minWidth:38}}>{item.time}</span>
              )}
              <span style={{fontSize:11,color:"#2D2D2D",flex:1,lineHeight:1.4}}>{item.txt}</span>
              <button onClick={()=>del(item.id)}
                style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:14,
                  padding:"0 2px",flexShrink:0,lineHeight:1}}
                onMouseEnter={e=>e.target.style.color="#C1121F"}
                onMouseLeave={e=>e.target.style.color="#CCC"}>×</button>
            </div>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        <input value={time} onChange={e=>setTime(e.target.value)} placeholder="09:00"
          style={{width:60,border:"1px solid #DDD",padding:"5px 7px",fontSize:11,
            outline:"none",background:"white",borderRadius:2,textAlign:"center"}}/>
        <input value={txt} onChange={e=>setTxt(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&add()}
          placeholder="Attività... (invio per aggiungere)"
          style={{flex:1,minWidth:180,border:"1px solid #DDD",padding:"5px 8px",
            fontSize:11,outline:"none",background:"white",borderRadius:2}}/>
        <button onClick={add}
          style={{background:"#1565C0",color:"white",border:"none",padding:"5px 14px",
            fontSize:13,fontWeight:900,cursor:"pointer",borderRadius:2}}>+</button>
      </div>
      {items.length===0&&(
        <div style={{textAlign:"center",padding:"12px 0 2px",fontSize:10,color:"#CCC",fontWeight:600}}>
          Nessuna attività pianificata — aggiungile sopra
        </div>
      )}
    </div>
  );
}

function EditModal({day,onClose,onSave}){
  const [city,setCity]=useState(day.c);
  const [cityJp,setCityJp]=useState(day.j);
  const [lodging,setLodging]=useState(day.sl);
  const [budget,setBudget]=useState(day.b);
  const [activities,setActivities]=useState(day.a||[]);
  const [animeSpots,setAnimeSpots]=useState(day.m||[]);
  const [editingActivity,setEditingActivity]=useState(null);
  const [editingAnime,setEditingAnime]=useState(null);

  const save=()=>{
    onSave({...day,c:city,j:cityJp,sl:lodging,b:Number(budget)||0,a:activities,m:animeSpots});
    onClose();
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:9999,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"white",width:"100%",maxWidth:600,maxHeight:"85vh",borderTopLeftRadius:12,borderTopRightRadius:12,overflow:"hidden",display:"flex",flexDirection:"column"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:"#0D0D0D",color:"#F4F0E6",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:16,fontWeight:900}}>✏️ Modifica Giorno {day.n}</div>
            <div style={{fontSize:10,color:"rgba(244,240,230,.5)",marginTop:2}}>{day.d} {day.dow}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(244,240,230,.5)",fontSize:24,cursor:"pointer",padding:0,lineHeight:1}}>×</button>
        </div>
        
        <div style={{flex:1,overflowY:"auto",padding:"16px 16px 80px"}}>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>📍 Città</label>
            <input value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>🇯🇵 Nome Giapponese</label>
            <input value={cityJp} onChange={e=>setCityJp(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>🏠 Alloggio</label>
            <input value={lodging} onChange={e=>setLodging(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:13}}/>
          </div>

          <div style={{marginBottom:20}}>
            <label style={{fontSize:11,fontWeight:700,color:"#666",display:"block",marginBottom:4}}>💰 Budget stimato (€)</label>
            <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #DDD",borderRadius:4,fontSize:14}}/>
          </div>

          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#666",marginBottom:6}}>📅 Attività</div>
            {activities.map((act,i)=>(
              <div key={i} style={{background:"#F8F5EE",padding:"8px 10px",marginBottom:4,borderRadius:4,display:"flex",alignItems:"center",gap:8}}>
                {editingActivity===i?(
                  <input autoFocus value={act} onChange={e=>{const n=[...activities];n[i]=e.target.value;setActivities(n);}}
                    onBlur={()=>setEditingActivity(null)}
                    onKeyDown={e=>e.key==="Enter"&&setEditingActivity(null)}
                    style={{flex:1,padding:"4px 6px",border:"1px solid #DDD",borderRadius:2,fontSize:12}}/>
                ):(
                  <span style={{flex:1,fontSize:12,color:"#2D2D2D"}} onClick={()=>setEditingActivity(i)}>{act}</span>
                )}
                <button onClick={()=>setEditingActivity(i)} style={{background:"none",border:"none",color:"#999",cursor:"pointer",fontSize:12,padding:"0 4px"}}>✏️</button>
                <button onClick={()=>setActivities(activities.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:16,padding:"0 4px"}}>×</button>
              </div>
            ))}
            <button onClick={()=>setActivities([...activities,"Nuova attività"])} style={{background:"#1565C0",color:"white",border:"none",padding:"6px 12px",fontSize:12,fontWeight:700,borderRadius:4,cursor:"pointer",marginTop:4}}>+ Aggiungi attività</button>
          </div>

          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#666",marginBottom:6}}>🎌 Spot Anime/Manga</div>
            {animeSpots.map((spot,i)=>(
              <div key={i} style={{background:"#FFF3F8",padding:"8px 10px",marginBottom:4,borderRadius:4,display:"flex",alignItems:"center",gap:8}}>
                {editingAnime===i?(
                  <input autoFocus value={spot} onChange={e=>{const n=[...animeSpots];n[i]=e.target.value;setAnimeSpots(n);}}
                    onBlur={()=>setEditingAnime(null)}
                    onKeyDown={e=>e.key==="Enter"&&setEditingAnime(null)}
                    style={{flex:1,padding:"4px 6px",border:"1px solid #DDD",borderRadius:2,fontSize:12}}/>
                ):(
                  <span style={{flex:1,fontSize:12,color:"#6A1040"}} onClick={()=>setEditingAnime(i)}>{spot}</span>
                )}
                <button onClick={()=>setEditingAnime(i)} style={{background:"none",border:"none",color:"#E89FC4",cursor:"pointer",fontSize:12,padding:"0 4px"}}>✏️</button>
                <button onClick={()=>setAnimeSpots(animeSpots.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:16,padding:"0 4px"}}>×</button>
              </div>
            ))}
            <button onClick={()=>setAnimeSpots([...animeSpots,"Nuovo spot anime"])} style={{background:"#6A1040",color:"white",border:"none",padding:"6px 12px",fontSize:12,fontWeight:700,borderRadius:4,cursor:"pointer",marginTop:4}}>+ Aggiungi spot</button>
          </div>
        </div>

        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #EEE",padding:"12px 16px",display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,background:"#EEE",color:"#666",border:"none",padding:"10px",fontSize:14,fontWeight:700,borderRadius:6,cursor:"pointer"}}>Annulla</button>
          <button onClick={save} style={{flex:1,background:"#1B4332",color:"white",border:"none",padding:"10px",fontSize:14,fontWeight:700,borderRadius:6,cursor:"pointer"}}>💾 Salva</button>
        </div>
      </div>
    </div>
  );
}

function DayCard({day,open,onToggle,onNote,onAddExp,onDelExp,onSaveSchedule,onEdit,transportOverrides,onEditTransport}){
  const pc=PC[day.p]||"#333";
  const hasAnime=day.m?.length>0;
  const isCritical=day.st==="critical";
  const isUrgent=day.nt?.toUpperCase().includes("URGENTE")||day.nt?.includes("🚨");
  const dayReal=(day.exp||[]).reduce((a,e)=>a+(e.eur||0),0);
  const [note,setNote]=useState(day.nt||"");
  const [activeTab,setActiveTab]=useState("info");
  useEffect(()=>setNote(day.nt||""),[day.nt]);
  
  const alertColor=isCritical?"#C1121F":isUrgent?"#E9C46A":"#E0DDD4";
  const alertBg=isCritical?"#FFE5E5":isUrgent?"#FFFBEA":"white";
  
  return(
    <div style={{marginBottom:2,background:"white",borderLeft:`4px solid ${pc}`,border:`1px solid ${alertColor}`,boxShadow:open?"0 2px 8px rgba(0,0,0,.06)":"none"}}>
      <div style={{display:"flex",cursor:"pointer",alignItems:"stretch",background:open?"#FAFAF6":"white"}} onClick={onToggle}>
        <div style={{background:pc,color:"white",minWidth:42,width:42,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"7px 2px",position:"relative",flexShrink:0}}>
          <div style={{fontSize:7,fontWeight:800,opacity:.5,letterSpacing:".05em",textTransform:"uppercase"}}>Gg</div>
          <div style={{fontSize:17,fontWeight:900,lineHeight:1}}>{day.n}</div>
          {dayReal>0&&<div style={{position:"absolute",bottom:3,left:0,right:0,textAlign:"center",fontSize:7,fontWeight:800,color:"rgba(255,255,255,.7)"}}>{dayReal}€</div>}
          {isCritical&&<div style={{position:"absolute",top:2,right:2,fontSize:10}}>🚨</div>}
        </div>
        <div style={{flex:1,padding:"8px 10px",minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:2,flexWrap:"wrap"}}>
            <span style={{fontSize:9,color:"#999",fontWeight:700}}>{day.d} {day.dow}</span>
            <span style={{fontSize:8,background:pc,color:"white",padding:"1px 5px",fontWeight:900,borderRadius:2}}>{PL[day.p]}</span>
            {hasAnime&&<span style={{fontSize:8,background:"#6A1040",color:"white",padding:"1px 5px",fontWeight:900,borderRadius:2}}>🎌 ANIME</span>}
            {isCritical&&<span style={{fontSize:8,background:"#C1121F",color:"white",padding:"1px 5px",fontWeight:900,borderRadius:2}}>🚨 CRITICO</span>}
          </div>
          <div style={{marginBottom:2}}>
            <span style={{fontSize:15,fontWeight:900,color:"#0D0D0D"}}>{day.c}</span>
            <span style={{fontSize:10,color:"#C0BDB5",marginLeft:6}}>{day.j}</span>
          </div>
          <div style={{fontSize:11,color:"#777",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{day.a[0]}{day.a.length>1?` · +${day.a.length-1}`:""}</div>
        </div>
        <div style={{padding:"8px 10px",display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",gap:4,flexShrink:0}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:14,fontWeight:900,color:"#0D0D0D"}}>~{day.b}€</div>
            {dayReal>0&&<div style={{fontSize:9,color:"#C1121F",fontWeight:700}}>✓{dayReal.toFixed(0)}€</div>}
          </div>
          <div style={{fontSize:11,color:open?"#C1121F":"#CCC",fontWeight:900}}>{open?"▲":"▼"}</div>
        </div>
      </div>
      {open&&(
        <div style={{borderTop:"1px solid #EDEAE2"}}>
          <TransportRow dayN={day.n} transportOverrides={transportOverrides} onEdit={()=>onEditTransport(day.n)}/>
          <div style={{display:"flex",borderBottom:"1px solid #EDEAE2",background:"#FAFAF6",alignItems:"center"}}>
            {[{k:"info",l:"📋 Info"},{k:"programma",l:"🗓️ Programma"},{k:"spese",l:"💴 Spese"},{k:"note",l:"📝 Note"}].map(t=>(
              <button key={t.k} onClick={()=>setActiveTab(t.k)}
                style={{background:"transparent",border:"none",borderBottom:`2px solid ${activeTab===t.k?pc:"transparent"}`,
                  color:activeTab===t.k?pc:"#999",padding:"7px 12px",fontSize:10,fontWeight:900,
                  cursor:"pointer",letterSpacing:".04em",whiteSpace:"nowrap",marginBottom:-1}}>
                {t.l}
              </button>
            ))}
            <div style={{flex:1}}/>
            <button onClick={(e)=>{e.stopPropagation();onEdit();}}
              style={{background:"transparent",border:"none",color:"#999",padding:"7px 12px",fontSize:10,fontWeight:900,
                cursor:"pointer",letterSpacing:".04em",whiteSpace:"nowrap"}}>
              ✏️ Modifica
            </button>
          </div>
          {activeTab==="info"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <div style={{padding:"10px 12px",borderRight:"1px solid #EDEAE2"}}>
                <SLabel color={pc}>📅 Attività</SLabel>
                {day.a.map((x,i)=>(
                  <div key={i} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                    <div style={{width:3,minWidth:3,background:pc,borderRadius:2,alignSelf:"stretch",opacity:.7,marginTop:2}}/>
                    <div style={{fontSize:11,color:"#2D2D2D",lineHeight:1.45}}>{x}</div>
                  </div>
                ))}
                <SLabel color="#666" mt={10}>🏠 Alloggio</SLabel>
                <div style={{fontSize:11,color:"#555",background:"#F8F5EE",padding:"5px 8px",borderRadius:2}}>{day.sl}</div>
              </div>
              <div style={{padding:"10px 12px"}}>
                {hasAnime?(
                  <>
                    <SLabel color="#6A1040">🎌 Anime / Manga</SLabel>
                    {day.m.map((x,i)=>(
                      <div key={i} style={{display:"flex",gap:7,marginBottom:5,alignItems:"flex-start"}}>
                        <div style={{width:3,minWidth:3,background:"#6A1040",borderRadius:2,alignSelf:"stretch",marginTop:2}}/>
                        <div style={{fontSize:11,color:"#6A1040",fontWeight:500,lineHeight:1.45}}>{x}</div>
                      </div>
                    ))}
                  </>
                ):(
                  <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#CCC",fontSize:10,fontWeight:700}}>Nessuno spot anime</div>
                )}
                {day.nt&&(
                  <div style={{marginTop:8,background:alertBg,border:`1.5px solid ${alertColor}`,padding:"6px 9px",fontSize:10,lineHeight:1.5,color:isCritical||isUrgent?"#C1121F":"#7D4E00",fontWeight:isCritical||isUrgent?700:400,borderRadius:2}}>
                    {isCritical||isUrgent?"🚨 ":"📌 "}{day.nt}
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab==="programma"&&(
            <DaySchedule dayN={day.n} schedule={day.schedule} onSave={onSaveSchedule}/>
          )}
          {activeTab==="spese"&&(
            <ExpenseTracker expenses={day.exp||[]} onAdd={onAddExp} onDel={onDelExp}/>
          )}
          {activeTab==="note"&&(
            <div style={{padding:"10px 12px 12px",background:"#FAFAF7"}}>
              <SLabel color="#555">📝 Note personali</SLabel>
              <textarea value={note} onChange={e=>setNote(e.target.value)} onBlur={()=>onNote(note)}
                placeholder={`Note per il Giorno ${day.n}...`}
                style={{width:"100%",minHeight:100,border:"1px solid #DDD",padding:"6px 8px",fontSize:11,fontFamily:"system-ui",resize:"vertical",background:"white",outline:"none",display:"block",marginBottom:5,borderRadius:2}}/>
              <button onClick={()=>onNote(note)} style={{background:"#0D0D0D",color:"white",border:"none",padding:"5px 14px",fontSize:9,fontWeight:900,letterSpacing:".08em",cursor:"pointer",textTransform:"uppercase",borderRadius:2}}>💾 Salva</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseDivider({phase}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,margin:"16px 0 7px"}}>
      <div style={{background:PC[phase],color:"white",padding:"5px 14px",fontSize:11,fontWeight:900,letterSpacing:".08em",whiteSpace:"nowrap"}}>
        {PE[phase]} FASE {phase} · {PRANGE[phase]}
      </div>
      <div style={{flex:1,height:1,background:PC[phase],opacity:.15}}/>
    </div>
  );
}

function MemoBoard({memos,open,onToggle,onAdd,onDel,onToggleDone}){
  const [newTxt,setNewTxt]=useState("");
  const [newCat,setNewCat]=useState("pack");
  const [activeCat,setActiveCat]=useState("all");
  const done=memos.filter(m=>m.done).length;
  const show=activeCat==="all"?memos:memos.filter(m=>m.cat===activeCat);
  return(
    <div style={{background:"#0D0D0D",marginBottom:6,border:"1px solid #2A2A2A"}}>
      <div style={{display:"flex",alignItems:"center",padding:"8px 12px",cursor:"pointer",borderBottom:open?"1px solid #2A2A2A":"none"}} onClick={onToggle}>
        <div style={{flex:1}}>
          <span style={{fontSize:12,fontWeight:900,color:"#F4F0E6"}}>📌 MEMO & PROMEMORIA</span>
          <span style={{fontSize:9,color:"rgba(244,240,230,.3)",fontWeight:700,marginLeft:8}}>{done}/{memos.length} completati</span>
        </div>
        <div style={{display:"flex",gap:4}}>
          {MEMO_CATS.map(c=>{const cnt=memos.filter(m=>m.cat===c.k&&!m.done).length;if(!cnt)return null;
            return <span key={c.k} style={{background:c.c,color:"white",fontSize:8,fontWeight:900,padding:"1px 6px",borderRadius:2}}>{cnt}</span>;})}
        </div>
        <span style={{color:"rgba(244,240,230,.3)",fontSize:11,fontWeight:900,marginLeft:8}}>{open?"▲":"▼"}</span>
      </div>
      {open&&(
        <>
          <div style={{display:"flex",borderBottom:"1px solid #2A2A2A",overflowX:"auto"}}>
            {[{k:"all",l:"Tutti",c:"#444"},...MEMO_CATS].map(c=>(
              <button key={c.k} onClick={()=>setActiveCat(c.k)}
                style={{background:activeCat===c.k?c.c:"transparent",border:"none",color:activeCat===c.k?"white":"rgba(244,240,230,.4)",
                  padding:"6px 10px",fontSize:9,fontWeight:900,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,textTransform:"uppercase"}}>
                {c.l}
              </button>
            ))}
          </div>
          <div style={{maxHeight:220,overflowY:"auto"}}>
            {show.length===0&&<div style={{textAlign:"center",padding:18,fontSize:10,color:"rgba(244,240,230,.2)",fontWeight:700}}>Nessun memo</div>}
            {show.map(m=>{const cc=MEMO_CATS.find(c=>c.k===m.cat);return(
              <div key={m.id} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"6px 12px",borderBottom:".5px solid #1A1A1A",opacity:m.done?.6:1}}>
                <button onClick={()=>onToggleDone(m.id)}
                  style={{background:m.done?"#1B4332":"transparent",border:`1.5px solid ${m.done?"#1B4332":"rgba(244,240,230,.2)"}`,
                    width:14,height:14,flexShrink:0,cursor:"pointer",marginTop:1,color:"white",fontSize:9,fontWeight:900,
                    display:"flex",alignItems:"center",justifyContent:"center",borderRadius:2,padding:0}}>
                  {m.done?"✓":""}
                </button>
                <span style={{fontSize:8,background:cc?.c||"#555",color:"white",padding:"1px 5px",fontWeight:900,flexShrink:0,borderRadius:2,marginTop:1}}>{cc?.l||m.cat}</span>
                <span style={{fontSize:11,color:"#D4D0C8",flex:1,lineHeight:1.45,textDecoration:m.done?"line-through":"none"}}>{m.txt}</span>
                <button onClick={()=>onDel(m.id)} style={{background:"none",border:"none",color:"rgba(244,240,230,.2)",cursor:"pointer",fontSize:14,padding:"0 2px",flexShrink:0}}>×</button>
              </div>
            );})}
          </div>
          <div style={{padding:"8px 12px 9px",borderTop:"1px solid #2A2A2A",display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
            <select value={newCat} onChange={e=>setNewCat(e.target.value)}
              style={{background:"#1A1A1A",border:"1px solid #333",color:"#F4F0E6",padding:"5px 6px",fontSize:9,fontWeight:800,cursor:"pointer",borderRadius:2,textTransform:"uppercase"}}>
              {MEMO_CATS.map(c=><option key={c.k} value={c.k}>{c.l}</option>)}
            </select>
            <input value={newTxt} onChange={e=>setNewTxt(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&(onAdd(newCat,newTxt),setNewTxt(""))}
              placeholder="Nuovo memo..."
              style={{flex:1,minWidth:180,background:"#1A1A1A",border:"1px solid #333",color:"#F4F0E6",padding:"5px 8px",fontSize:11,outline:"none",borderRadius:2}}/>
            <button onClick={()=>{onAdd(newCat,newTxt);setNewTxt("");}}
              style={{background:"#C1121F",color:"white",border:"none",padding:"5px 14px",fontSize:13,fontWeight:900,cursor:"pointer",borderRadius:2}}>+</button>
          </div>
        </>
      )}
    </div>
  );
}

// ========================================
// COMPONENTI NUOVE VISTE
// ========================================

function GuideView(){
  const [content,setContent]=useState("");
  const [loading,setLoading]=useState(true);
  const [editing,setEditing]=useState(false);
  const [saving,setSaving]=useState(false);
  const [editContent,setEditContent]=useState("");
  
  useEffect(()=>{
    loadGuide();
  },[]);
  
  async function loadGuide(){
    try {
      // Prima prova a caricare da Firebase (versione modificata)
      const docRef = doc(db, 'userData', 'guide-content');
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists() && docSnap.data().content){
        setContent(docSnap.data().content);
        setEditContent(docSnap.data().content);
        setLoading(false);
      } else {
        // Se non c'è in Firebase, carica da file .md
        const response = await fetch('./GUIDA-DETTAGLIATA.md');
        const text = await response.text();
        setContent(text);
        setEditContent(text);
        setLoading(false);
      }
    } catch(err) {
      console.error('Error loading guide:', err);
      setContent("⚠️ Errore caricamento guida.");
      setLoading(false);
    }
  }
  
  async function saveGuide(){
    setSaving(true);
    try {
      const docRef = doc(db, 'userData', 'guide-content');
      await setDoc(docRef, {
        content: editContent,
        lastModified: new Date().toISOString()
      });
      setContent(editContent);
      setEditing(false);
      alert("✅ Guida salvata con successo!");
    } catch(err) {
      console.error('Error saving guide:', err);
      alert("❌ Errore nel salvataggio!");
    }
    setSaving(false);
  }
  
  async function resetGuide(){
    if(!confirm("⚠️ Vuoi ripristinare la guida originale? Perderai tutte le modifiche!")){
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('./GUIDA-DETTAGLIATA.md');
      const text = await response.text();
      setContent(text);
      setEditContent(text);
      
      // Rimuovi da Firebase
      const docRef = doc(db, 'userData', 'guide-content');
      await setDoc(docRef, {content: "", lastModified: ""});
      
      setEditing(false);
      alert("✅ Guida ripristinata all'originale!");
    } catch(err) {
      console.error('Error resetting guide:', err);
      alert("❌ Errore nel ripristino!");
    }
    setLoading(false);
  }
  
  if(loading){
    return(
      <div style={{maxWidth:1200,margin:"0 auto",padding:"40px 12px",textAlign:"center"}}>
        <div style={{fontSize:18,color:"#666"}}>⏳ Caricamento guida completa...</div>
      </div>
    );
  }
  
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"16px 12px"}}>
      {/* Header con pulsanti */}
      <div style={{background:"white",borderRadius:8,padding:"16px",marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,.08)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:900,color:"#1B4332"}}>
            📖 GUIDA DETTAGLIATA - 49 GIORNI
          </h2>
          <p style={{margin:"4px 0 0",fontSize:13,color:"#666"}}>
            {editing ? "✏️ Modalità modifica attiva" : "👁️ Visualizzazione"}
          </p>
        </div>
        <div style={{display:"flex",gap:8}}>
          {!editing ? (
            <>
              <button 
                onClick={()=>{setEditing(true); setEditContent(content);}}
                style={{padding:"10px 20px",background:"#1976D2",color:"white",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:14}}
              >
                ✏️ Modifica
              </button>
              <button 
                onClick={resetGuide}
                style={{padding:"10px 20px",background:"#F44336",color:"white",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:14}}
              >
                🔄 Ripristina
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={saveGuide}
                disabled={saving}
                style={{padding:"10px 20px",background:saving?"#ccc":"#4CAF50",color:"white",border:"none",borderRadius:6,cursor:saving?"not-allowed":"pointer",fontWeight:700,fontSize:14}}
              >
                {saving ? "⏳ Salvataggio..." : "💾 Salva"}
              </button>
              <button 
                onClick={()=>{setEditing(false); setEditContent(content);}}
                style={{padding:"10px 20px",background:"#FF9800",color:"white",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:14}}
              >
                ❌ Annulla
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Contenuto */}
      <div style={{background:"white",borderRadius:8,padding:"24px",boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
        {editing ? (
          <textarea
            value={editContent}
            onChange={(e)=>setEditContent(e.target.value)}
            style={{
              width:"100%",
              minHeight:"600px",
              padding:"16px",
              fontFamily:"'Monaco','Menlo','Ubuntu Mono','Consolas',monospace",
              fontSize:13,
              lineHeight:1.7,
              border:"2px solid #E0E0E0",
              borderRadius:6,
              resize:"vertical",
              background:"#FAFAFA"
            }}
          />
        ) : (
          <pre style={{
            whiteSpace:"pre-wrap",
            fontFamily:"system-ui,-apple-system,sans-serif",
            fontSize:14,
            lineHeight:1.7,
            color:"#333",
            margin:0
          }}>
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}

function MapView(){
  return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"16px 12px"}}>
      <div style={{background:"white",borderRadius:8,padding:"20px",boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
        <h2 style={{margin:"0 0 16px",fontSize:24,fontWeight:900,color:"#1B4332"}}>
          {MAPPA_CONFIG.title}
        </h2>
        
        <div style={{position:"relative",width:"100%",paddingBottom:"75%",background:"#F0F0F0",borderRadius:6,overflow:"hidden",marginBottom:16}}>
          <iframe 
            src={MAPPA_CONFIG.embedUrl}
            style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
            loading="lazy"
          />
        </div>

        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href={MAPPA_CONFIG.editUrl} target="_blank" rel="noopener noreferrer"
            style={{flex:1,minWidth:200,background:"#1B4332",color:"white",textAlign:"center",padding:"12px 20px",borderRadius:6,textDecoration:"none",fontWeight:700,fontSize:14}}>
            ✏️ Modifica Mappa (Google Maps)
          </a>
          <a href={MAPPA_CONFIG.embedUrl} target="_blank" rel="noopener noreferrer"
            style={{flex:1,minWidth:200,background:"#1565C0",color:"white",textAlign:"center",padding:"12px 20px",borderRadius:6,textDecoration:"none",fontWeight:700,fontSize:14}}>
            🔍 Apri a Schermo Intero
          </a>
        </div>

        <div style={{marginTop:16,padding:12,background:"#FFF3CD",borderRadius:6,fontSize:12,color:"#856404"}}>
          <strong>💡 Tip:</strong> La mappa è completamente interattiva. Puoi modificarla cliccando su "Modifica Mappa" 
          e aggiungere punti di interesse, cambiare percorsi, o personalizzare i marker.
        </div>
      </div>
    </div>
  );
}

function ValiggiaView({checks,onToggle}){
  const totalItems = LISTA_VALIGIA.sezioni.reduce((sum,sez)=>sum+sez.items.length,0);
  const checkedItems = Object.values(checks).filter(Boolean).length;
  const progress = totalItems > 0 ? (checkedItems/totalItems*100).toFixed(0) : 0;

  return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"16px 12px"}}>
      <div style={{background:"white",borderRadius:8,padding:"20px",boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>
        <h2 style={{margin:"0 0 8px",fontSize:24,fontWeight:900,color:"#1B4332"}}>
          {LISTA_VALIGIA.title}
        </h2>
        <p style={{margin:"0 0 16px",fontSize:14,color:"#666",fontWeight:600}}>
          {LISTA_VALIGIA.subtitle}
        </p>

        {/* Progress Bar */}
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,fontWeight:700,color:"#333"}}>
              Completamento: {checkedItems}/{totalItems} items
            </span>
            <span style={{fontSize:12,fontWeight:700,color:"#1B4332"}}>{progress}%</span>
          </div>
          <div style={{height:8,background:"#E0E0E0",borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",background:"linear-gradient(to right,#4CAF50,#1B4332)",width:`${progress}%`,transition:"width 0.3s"}}/>
          </div>
        </div>

        {/* Peso Target */}
        <div style={{background:"#F0F7FF",padding:"12px 16px",borderRadius:6,marginBottom:20,border:"1px solid #90CAF9"}}>
          <h3 style={{margin:"0 0 8px",fontSize:14,fontWeight:800,color:"#1565C0"}}>⚖️ Peso Target</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8,fontSize:12}}>
            <div><strong>Valigia stiva:</strong> {LISTA_VALIGIA.pesoTarget.valigiaStiva}</div>
            <div><strong>Bagaglio mano:</strong> {LISTA_VALIGIA.pesoTarget.bagaglioMano}</div>
            <div><strong>Daypack:</strong> {LISTA_VALIGIA.pesoTarget.daypack}</div>
            <div><strong>Totale:</strong> {LISTA_VALIGIA.pesoTarget.totale}</div>
          </div>
        </div>

        {/* Sezioni Valigia */}
        {LISTA_VALIGIA.sezioni.map((sez,i)=>{
          const sezId = `sez-${i}`;
          const sezChecked = sez.items.filter((_,idx)=>checks[`${sezId}-${idx}`]).length;
          return(
            <div key={i} style={{marginBottom:16,border:"1px solid #E0E0E0",borderRadius:6,overflow:"hidden"}}>
              <div style={{background:"#1B4332",color:"white",padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:15,fontWeight:800}}>{sez.nome}</span>
                <span style={{fontSize:11,background:"rgba(255,255,255,.2)",padding:"2px 8px",borderRadius:12,fontWeight:700}}>
                  {sezChecked}/{sez.items.length}
                </span>
              </div>
              {sez.note && (
                <div style={{background:"#FFF9E6",padding:"8px 16px",fontSize:11,color:"#856404",borderBottom:"1px solid #E0E0E0"}}>
                  <strong>📌 Nota:</strong> {sez.note}
                </div>
              )}
              <div style={{padding:"8px 12px"}}>
                {sez.items.map((item,idx)=>{
                  const itemId = `${sezId}-${idx}`;
                  const isChecked = checks[itemId] || false;
                  return(
                    <label key={idx} style={{display:"flex",alignItems:"center",padding:"6px 8px",cursor:"pointer",background:isChecked?"#E8F5E9":"transparent",borderRadius:4,marginBottom:4}}>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={()=>onToggle(itemId)}
                        style={{marginRight:10,width:16,height:16,cursor:"pointer"}}
                      />
                      <span style={{fontSize:13,color:isChecked?"#2E7D32":"#333",textDecoration:isChecked?"line-through":"none",flex:1}}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Pro Tips */}
        <div style={{background:"#E8F5E9",padding:"16px",borderRadius:6,marginTop:20,border:"1px solid #4CAF50"}}>
          <h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:800,color:"#2E7D32"}}>💡 Pro Tips</h3>
          {LISTA_VALIGIA.proTips.map((tip,i)=>(
            <div key={i} style={{fontSize:12,color:"#1B5E20",marginBottom:6,lineHeight:1.5}}>
              {tip}
            </div>
          ))}
        </div>

        {/* Apps Consigliate */}
        <div style={{background:"#F3E5F5",padding:"16px",borderRadius:6,marginTop:16,border:"1px solid #BA68C8"}}>
          <h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:800,color:"#7B1FA2"}}>📱 App da Scaricare</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:8}}>
            {LISTA_VALIGIA.apps.map((app,i)=>(
              <div key={i} style={{fontSize:12,color:"#4A148C",fontWeight:600}}>
                ✓ {app}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App(){
  const [days,setDays]=useState(D0);
  const [memos,setMemos]=useState(MEMO0);
  const [transportOverrides,setTransportOverrides]=useState({});
  const [ready,setReady]=useState(false);
  const [open,setOpen]=useState(null);
  const [filter,setFilter]=useState(0);
  const [memoOpen,setMemoOpen]=useState(true);
  const [editingDay,setEditingDay]=useState(null);
  const [editingTransport,setEditingTransport]=useState(null);
  const [viewMode,setViewMode]=useState("itinerario"); // itinerario, guida, mappa, valigia
  const [valigiaChecks,setValigiaChecks]=useState({});
  const [isSaving,setIsSaving]=useState(false);

  useEffect(()=>{
    if (!window.firebaseDB) {
      console.error('Firebase not ready!');
      setReady(true);
      return;
    }
    
    const db = window.firebaseDB;
    const docRef = db.collection('userData').doc('default');
    
    // Setup real-time listener
    const unsubscribe = docRef.onSnapshot((doc) => {
      // Ignore updates while we're saving to avoid race conditions
      if (isSaving) {
        console.log('⏸️ Ignoring Firebase update (currently saving)');
        return;
      }
      
      if (doc.exists) {
        const data = doc.data();
        console.log('☁️ Data from cloud:', data);
        
        // Merge with defaults
        if (data.days && Array.isArray(data.days) && data.days.length > 0) {
          console.log('✅ Using days from Firebase:', data.days.length, 'days');
          setDays(data.days);
        } else {
          console.log('⚠️ No valid days in Firebase, using defaults');
          setDays(D0);
        }
        
        if (data.memos) setMemos(data.memos);
        
        if (data.transportOverrides) setTransportOverrides(data.transportOverrides);
        
        // Check backup reminder
        const lastBackup = data.lastBackup || 0;
        const now = Date.now();
        if (now - lastBackup > 7 * 24 * 60 * 60 * 1000) {
          setTimeout(() => {
            if (confirm("💾 Backup consigliato!\n\nÈ passata una settimana. Vuoi esportare un backup dei tuoi dati?")) {
              document.getElementById("exportBtn")?.click();
            }
          }, 3000);
        }
      } else {
        // First time - create document with defaults
        console.log('📝 Creating initial data...');
        docRef.set({
          days: D0,
          memos: MEMO0,
          transportOverrides: {},
          lastBackup: Date.now(),
          createdAt: Date.now()
        }).then(() => {
          console.log('✅ Initial data saved to Firebase');
          setDays(D0);
          setMemos(MEMO0);
        }).catch(err => {
          console.error('❌ Error saving initial data:', err);
          alert('Errore inizializzazione Firebase!\n\n' + err.message);
          setDays(D0);
          setMemos(MEMO0);
        });
      }
      
      setReady(true);
    }, (error) => {
      console.error('Firestore error:', error);
      setReady(true);
    });
    
    return () => unsubscribe();
  }, []);

  const persist = useCallback(async (d) => {
    if (!window.firebaseDB || !ready) return;
    setIsSaving(true);
    try {
      const db = window.firebaseDB;
      await db.collection('userData').doc('default').set({
        days: d
      }, { merge: true });
      console.log('💾 Days saved to cloud');
      // Note: onSnapshot will trigger and reload data automatically
    } catch(e) {
      console.error('Save error:', e);
    } finally {
      setTimeout(() => setIsSaving(false), 500); // Reset after 500ms
    }
  }, [ready]);
  
  const persistM = useCallback(async (m) => {
    if (!window.firebaseDB || !ready) return;
    setIsSaving(true);
    try {
      const db = window.firebaseDB;
      await db.collection('userData').doc('default').set({
        memos: m
      }, { merge: true });
      console.log('💾 Memos saved to cloud');
    } catch(e) {
      console.error('Save error:', e);
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  }, [ready]);
  
  const persistT = useCallback(async (t) => {
    if (!window.firebaseDB || !ready) return;
    setIsSaving(true);
    try {
      const db = window.firebaseDB;
      await db.collection('userData').doc('default').set({
        transportOverrides: t
      }, { merge: true });
      console.log('💾 Transports saved to cloud');
    } catch(e) {
      console.error('Save error:', e);
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  }, [ready]);
  
  useEffect(() => { if (ready) persist(days); }, [days, ready, persist]);
  useEffect(() => { if (ready) persistM(memos); }, [memos, ready, persistM]);
  useEffect(() => { if (ready) persistT(transportOverrides); }, [transportOverrides, ready, persistT]);

  const addMemo=(cat,txt)=>{if(!txt.trim())return;setMemos(p=>[...p,{id:Date.now(),cat,txt:txt.trim()}]);};
  const delMemo=(id)=>setMemos(p=>p.filter(m=>m.id!==id));
  const toggleDone=(id)=>setMemos(p=>p.map(m=>m.id===id?{...m,done:!m.done}:m));
  const updateNote=(n,v)=>setDays(p=>p.map(d=>d.n===n?{...d,nt:v}:d));
  const addExp=(n,e)=>setDays(p=>p.map(d=>d.n===n?{...d,exp:[...(d.exp||[]),e]}:d));
  const delExp=(n,id)=>setDays(p=>p.map(d=>d.n===n?{...d,exp:(d.exp||[]).filter(e=>e.id!==id)}:d));
  const saveSchedule=(n,s)=>setDays(p=>p.map(d=>d.n===n?{...d,schedule:s}:d));
  const saveEditedDay=(edited)=>setDays(p=>p.map(d=>d.n===edited.n?edited:d));
  const saveTransportOverride=(dayN,transport)=>setTransportOverrides(p=>({...p,[dayN]:transport}));

  const conf=days.filter(d=>d.sl.startsWith("✅")).length;
  const budEst=days.reduce((a,d)=>a+(d.b||0),0);
  const budReal=days.reduce((a,d)=>a+(d.exp||[]).reduce((b,e)=>b+(e.eur||0),0),0);
  const animeCnt=days.filter(d=>d.m?.length>0).length;
  const criticalCnt=days.filter(d=>d.st==="critical").length;
  const transpEur=Math.round((Object.values(TRANSPORT).reduce((a,t)=>a+t.yen,0)+VAN_RENTAL_YEN)/160);
  const jrpSavings=Math.round(Object.values(TRANSPORT).filter(t=>t.jrp).reduce((a,t)=>a+t.yen,0)/160);
  const show=filter===0?days:days.filter(d=>d.p===filter);

  // Export/Import functions
  const exportData = async () => {
    try {
      const data = {
        version: "v7-firebase",
        exportDate: new Date().toISOString(),
        days,
        memos,
        transportOverrides
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `giappone-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Update last backup in Firestore
      if (window.firebaseDB) {
        const db = window.firebaseDB;
        await db.collection('userData').doc('default').set({
          lastBackup: Date.now()
        }, { merge: true });
      }
      
      alert("✅ Backup esportato!\n\nSalva il file in un posto sicuro (Files app, iCloud)");
    } catch(e) {
      alert("❌ Errore export: " + e.message);
    }
  };

  const importData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      try {
        const file = e.target.files[0];
        if (!file) return;
        const text = await file.text();
        const data = JSON.parse(text);
        if (!data.version || (!data.version.startsWith("v7"))) {
          if (!confirm("⚠️ Versione diversa. Continuare?")) return;
        }
        if (!confirm(`📥 Importare backup del ${new Date(data.exportDate).toLocaleDateString()}?\n\nI dati attuali saranno sovrascritti!`)) return;
        
        setDays(data.days || D0);
        setMemos(data.memos || MEMO0);
        setTransportOverrides(data.transportOverrides || {});
        
        // Save to Firestore
        if (window.firebaseDB) {
          const db = window.firebaseDB;
          await db.collection('userData').doc('default').set({
            days: data.days || D0,
            memos: data.memos || MEMO0,
            transportOverrides: data.transportOverrides || {},
            lastBackup: Date.now()
          }, { merge: true });
        }
        
        alert("✅ Backup importato!\n\nDati ripristinati con successo.");
        window.location.reload();
      } catch(e) {
        alert("❌ Errore import: " + e.message);
      }
    };
    input.click();
  };

  return(
    <div style={{background:"#F4F0E6",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      <div style={{background:"#0D0D0D",position:"sticky",top:0,zIndex:50,borderBottom:"3px solid #C1121F"}}>
        <div style={{maxWidth:860,margin:"0 auto",padding:"12px 12px 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:6}}>
            <div>
              <span style={{fontSize:"clamp(18px,4.5vw,28px)",fontWeight:900,color:"#F4F0E6"}}>冒険<span style={{color:"#C1121F"}}>の記録</span></span>
              <span style={{fontSize:9,fontWeight:700,color:"rgba(244,240,230,.3)",letterSpacing:".1em",marginLeft:10,textTransform:"uppercase"}}>v7 · 49 GIORNI</span>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(244,240,230,.35)",letterSpacing:".12em",textTransform:"uppercase",marginTop:3}}>
                28 Maggio → 15 Luglio 2026 · 49 giorni
              </div>
            </div>
          </div>
          
          {/* TAB VISTA PRINCIPALE */}
          <div style={{display:"flex",gap:0,marginBottom:8,borderBottom:"1px solid rgba(255,255,255,.1)"}}>
            {[
              {id:"itinerario",label:"🗓️ Itinerario",icon:"🗓️"},
              {id:"guida",label:"📖 Guida",icon:"📖"},
              {id:"mappa",label:"🗺️ Mappa",icon:"🗺️"},
              {id:"valigia",label:"🧳 Valigia",icon:"🧳"}
            ].map(tab=>(
              <button key={tab.id} onClick={()=>setViewMode(tab.id)}
                style={{background:viewMode===tab.id?"rgba(193,18,31,.2)":"transparent",border:"none",
                  color:viewMode===tab.id?"#F4F0E6":"rgba(244,240,230,.4)",
                  padding:"8px 14px",fontSize:11,fontWeight:800,letterSpacing:".05em",cursor:"pointer",
                  textTransform:"uppercase",borderBottom:viewMode===tab.id?"3px solid #C1121F":"3px solid transparent",
                  marginBottom:-1,transition:"all 0.2s"}}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* STATS - Solo in vista itinerario */}
          {viewMode==="itinerario"&&(
          <>
          <div style={{display:"flex",gap:4,marginBottom:8,flexWrap:"wrap"}}>
            {[
              {l:"🏠 Confermati",v:`${conf}`,c:"#6FCF97"},
              {l:"Stimato",v:`~${budEst}€`},
              {l:"Speso",v:`${budReal.toFixed(0)}€`,c:budReal>0?"#FF8A8A":null},
              {l:"🚄 Trasporti",v:`~${transpEur}€`,c:"#60A5FA"},
              {l:"JR Pass save",v:`~${jrpSavings}€`,c:"#6FCF97"},
              {l:"🎌 Anime",v:`${animeCnt}gg`,c:"#E89FC4"},
              {l:"🚨 Critici",v:`${criticalCnt}gg`,c:"#FF6B6B"},
            ].map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",padding:"3px 8px",borderRadius:2}}>
                <span style={{fontSize:9,color:"rgba(244,240,230,.35)",fontWeight:700}}>{s.l} </span>
                <span style={{fontSize:10,fontWeight:900,color:s.c||"#F4F0E6"}}>{s.v}</span>
              </div>
            ))}
          </div>
          <div style={{height:3,background:"rgba(255,255,255,.08)",marginBottom:7,borderRadius:2}}>
            <div style={{height:"100%",background:"linear-gradient(to right,#1B4332,#7B3F00,#1a237e)",width:`${(conf/50)*100}%`,borderRadius:2}}/>
          </div>
          </>
          )}

          {/* FILTRI FASE - Solo in vista itinerario */}
          {viewMode==="itinerario"&&(
          <div style={{display:"flex",gap:0}}>
            {["Tutti","🚄 Treno","🚐 Van","✈️ Finale"].map((l,i)=>(
              <button key={i} onClick={()=>setFilter(i)}
                style={{background:"transparent",border:"none",color:filter===i?"#F4F0E6":"rgba(244,240,230,.38)",
                  padding:"7px 11px",fontSize:9,fontWeight:900,letterSpacing:".07em",cursor:"pointer",
                  textTransform:"uppercase",borderBottom:filter===i?"3px solid #C1121F":"3px solid transparent",marginBottom:-3}}>
                {l}
              </button>
            ))}
            <div style={{flex:1}}/>
            <button id="exportBtn" onClick={exportData}
              style={{background:"transparent",border:"none",color:"rgba(244,240,230,.4)",padding:"7px 8px",fontSize:8,cursor:"pointer",fontWeight:700,marginBottom:-3}}>
              📤 export
            </button>
            <button onClick={importData}
              style={{background:"transparent",border:"none",color:"rgba(244,240,230,.4)",padding:"7px 8px",fontSize:8,cursor:"pointer",fontWeight:700,marginBottom:-3}}>
              📥 import
            </button>
            <button onClick={()=>{if(window.confirm("Reset ai dati originali? Le note e spese salvate andranno perse."))setDays(D0);}}
              style={{background:"transparent",border:"none",color:"rgba(244,240,230,.18)",padding:"7px 8px",fontSize:8,cursor:"pointer",fontWeight:700,marginBottom:-3}}>
              ↺ reset
            </button>
          </div>
          )}
        </div>
      </div>

      {/* CONTENUTO DINAMICO BASATO SU VIEW MODE */}
      {viewMode==="guida"&&<GuideView/>}
      {viewMode==="mappa"&&<MapView/>}
      {viewMode==="valigia"&&<ValiggiaView checks={valigiaChecks} onToggle={(id)=>setValigiaChecks(p=>({...p,[id]:!p[id]}))}/>}

      {viewMode==="itinerario"&&(
      <>
      <div style={{maxWidth:860,margin:"0 auto",padding:"8px 8px 0"}}>
        <MemoBoard memos={memos} open={memoOpen} onToggle={()=>setMemoOpen(p=>!p)}
          onAdd={addMemo} onDel={delMemo} onToggleDone={toggleDone}/>
      </div>

      <div style={{padding:"6px 8px 60px",maxWidth:860,margin:"0 auto"}}>
        {show.map((day,i)=>{
          const prev=show[i-1];
          return(
            <div key={day.n}>
              {(!prev||prev.p!==day.p)&&<PhaseDivider phase={day.p}/>}
              <DayCard day={day} open={open===day.n}
                onToggle={()=>setOpen(open===day.n?null:day.n)}
                onNote={v=>updateNote(day.n,v)}
                onAddExp={e=>addExp(day.n,e)}
                onDelExp={id=>delExp(day.n,id)}
                onSaveSchedule={s=>saveSchedule(day.n,s)}
                onEdit={()=>setEditingDay(day)}
                transportOverrides={transportOverrides}
                onEditTransport={(dayN)=>{
                  const defaultTransport=TRANSPORT[dayN];
                  const currentTransport=transportOverrides[dayN]||defaultTransport||{};
                  setEditingTransport({dayN,transport:currentTransport});
                }}
              />
            </div>
          );
        })}
      </div>
      </>
      )}

      {editingDay&&<EditModal day={editingDay} onClose={()=>setEditingDay(null)} onSave={saveEditedDay}/>}
      {editingTransport&&<EditTransportModal dayN={editingTransport.dayN} transport={editingTransport.transport} onClose={()=>setEditingTransport(null)} onSave={saveTransportOverride}/>}

      <div style={{textAlign:"center",padding:16,fontSize:9,color:"#AAA",fontWeight:700,letterSpacing:".08em",borderTop:"2px solid #111",background:"#F4F0E6"}}>
        冒険の記録 · v7 · 49 GIORNI · 28 Maggio → 15 Luglio 2026 🎌
      </div>
    </div>
  );
}

// Render app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
