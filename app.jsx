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
  27:{from:"Hiroshima",to:"Yamaguchi",mode:"van",min:120,yen:3000,jrp:false,note:"Van verso costa nord"},
  28:{from:"Yamaguchi",to:"Shimonoseki",mode:"van",min:240,yen:5500,jrp:false,note:"Van costa nord · Motonosumi + Tsunoshima"},
  29:{from:"Shimonoseki",to:"Fukuoka",mode:"van",min:90,yen:2500,jrp:false,note:"Van + Kanmon Tunnel sottomarino"},
  30:{from:"Fukuoka",to:"Yanagawa",mode:"van",min:60,yen:1500,jrp:false,note:"Van ~60km + Nanzo-in Buddha"},
  31:{from:"Yanagawa",to:"Kagoshima",mode:"van",min:240,yen:6000,jrp:false,note:"Van ~250km verso sud estremo Kyushu"},
  32:{from:"Kagoshima",to:"Miyazaki",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~180km costa Pacifico"},
  33:{from:"Miyazaki",to:"Takachiho",mode:"van",min:120,yen:3000,jrp:false,note:"Van ~120km montagna sacra"},
  34:{from:"Takachiho",to:"Aso",mode:"van",min:90,yen:2500,jrp:false,note:"Van via Kurokawa Onsen"},
  35:{from:"Aso",to:"Hita",mode:"van",min:120,yen:3000,jrp:false,note:"Van ~100km Attack on Titan town"},
  36:{from:"Hita",to:"Beppu",mode:"van",min:90,yen:2000,jrp:false,note:"Van via Yufuin + Bungo-Mori"},
  37:{from:"Beppu",to:"Matsuyama",mode:"ferry",min:180,yen:12800,jrp:false,note:"⛴️ Traghetto veicolare → Shikoku"},
  38:{from:"Matsuyama",to:"Kochi",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~180km via UFO Line"},
  39:{from:"Kochi",to:"Iya Valley",mode:"van",min:180,yen:4500,jrp:false,note:"Van ~180km montagne Tokushima"},
  40:{from:"Iya Valley",to:"Naruto",mode:"van",min:120,yen:3000,jrp:false,note:"Van discesa verso costa"},
  41:{from:"Naruto",to:"Awaji",mode:"van",min:60,yen:2000,jrp:false,note:"Van Awaji + Tadao Ando"},
  42:{from:"Awaji",to:"Osaka",mode:"van",min:90,yen:2500,jrp:false,note:"Van ~90km rientro Kansai"},
  43:{from:"Osaka KIX",to:"Okinawa",mode:"plane",min:130,yen:10000,jrp:false,note:"✈️ Jetstar GK357 KIX→OKA"},
  44:{from:"Naha",to:"Kerama",mode:"ferry",min:50,yen:2500,jrp:false,note:"Ferry Tomari Port→Zamami A/R"},
  45:{from:"Okinawa",to:"Kyoto",mode:"plane",min:150,yen:13000,jrp:false,note:"✈️ Jetstar GK352 OKA→KIX + Haruka train KIX→Kyoto"},
  46:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro Kyoto"},
  47:{from:"Kyoto",to:"Kyoto",mode:"local",min:0,yen:1200,jrp:false,note:"Bus/metro Kyoto"},
  48:{from:"Kyoto",to:"Tokyo",mode:"shin",min:135,yen:13750,jrp:true,note:"🚨 Shinkansen Hikari · PARTENZA 16:30-17:00 per Fuji! Siediti lato DESTRO 🗻"},
  49:{from:"Tokyo",to:"Haneda",mode:"local",min:20,yen:500,jrp:false,note:"Keikyu Line o Monorail → Haneda Terminal 3"},
};const VAN_RENTAL_YEN=280000;

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
{n:1,d:"28/05",dow:"Mar",c:"L\'Arrivo a Tokyo",j:"L\'Arrivo a Tokyo",p:1,sl:"Tokyo",
 a:["L\'Arrivo","🚨 Correzione Trasporto & Check-in","Asakusa","Ochanomizu","Yotsuya"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"09:10",txt:"L\'Arrivo"},
     {id:2,time:"10:30",txt:"🚨 Correzione Trasporto & Check-in"},
     {id:3,time:"13:30",txt:"⛩️ Asakusa"},
     {id:4,time:"15:00",txt:"🎌 Ochanomizu"},
     {id:5,time:"16:30",txt:"🎌 Yotsuya"},
     {id:6,time:"18:15",txt:"🥢 Cena pre-evento"},
     {id:7,time:"20:00",txt:"✅ TeamLab Planets Toyosu"},
     {id:8,time:"22:00",txt:"🎮 OPZIONALE: Prima Caccia Console"}
   ],exp:[]},
{n:2,d:"29/05",dow:"Mer",c:"Tokyo Ottimizzato",j:"Tokyo Ottimizzato",p:1,sl:"Tokyo",
 a:["🐟 Tsukiji Outer Market","🚇 Spostamento verso Shibuya","Shibuya Sky","🚇 Spostamento verso Nakano","🛍️ Nakano Broadway"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"06:00",txt:"🐟 Tsukiji Outer Market (IL PESCE FRESCO)"},
     {id:2,time:"09:15",txt:"🚇 Spostamento verso Shibuya"},
     {id:3,time:"10:00",txt:"🏙️ Shibuya Sky"},
     {id:4,time:"12:00",txt:"🚇 Spostamento verso Nakano"},
     {id:5,time:"12:30",txt:"🛍️ Nakano Broadway"},
     {id:6,time:"15:00",txt:"🚇 Rientro in zona Cafe Capyba"},
     {id:7,time:"16:00",txt:"🐾 Cafe Capyba"},
     {id:8,time:"17:30",txt:"🛍️ Akihabara"}
   ],exp:[]},
{n:3,d:"30/05",dow:"Gio",c:"L\'Incanto di Nikkō",j:"L\'Incanto di Nikkō",p:1,sl:"Nikkō",
 a:["CORSA 2: Pista Oda Field","🚃 Tobu Limited Express Kegon","Arrivo a Nikkō & Logistica","Shinkyo Bridge","Tōshō-gū Shrine"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"06:00",txt:"🏃‍♂️ CORSA 2: Pista Oda Field (Yoyogi)"},
     {id:2,time:"07:30",txt:"🚃 Tobu Limited Express Kegon"},
     {id:3,time:"09:30",txt:"Arrivo a Nikkō & Logistica"},
     {id:4,time:"10:00",txt:"🌉 Shinkyo Bridge"},
     {id:5,time:"10:30",txt:"⛩️ Tōshō-gū Shrine"},
     {id:6,time:"13:30",txt:"🚌 Spostamento verso Okunikko & Cascata Kegon"},
     {id:7,time:"16:00",txt:"🐉 Ryuzu Falls (Se le tempistiche reggono)"}
   ],exp:[]},
{n:4,d:"31/05",dow:"Ven",c:"Nikkō → Utsunomiya",j:"L\'Anima dei Samurai nel Tōhoku",p:1,sl:"Fukushima",
 a:["🚆 Spostamento verso il Tōhoku","🎒 Arrivo ad Aizu-Wakamatsu & Logistica","🌀 Sazaedo Temple","Pranzo Esplosivo","Castello Tsuruga-jo"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚆 Spostamento verso il Tōhoku (La risalita)"},
     {id:2,time:"11:30",txt:"🎒 Arrivo ad Aizu-Wakamatsu & Logistica"},
     {id:3,time:"12:00",txt:"🌀 Sazaedo Temple (Monte Iimori)"},
     {id:4,time:"13:30",txt:"🥢 Pranzo Esplosivo (Sauce Katsudon)"},
     {id:5,time:"14:30",txt:"🏯 Castello Tsuruga-jo"},
     {id:6,time:"17:00",txt:"🚆 Treno verso Fukushima & Relax Termale"}
   ],exp:[]},
{n:5,d:"01/06",dow:"Sab",c:"Spiriti Kitsune e la Città degli Alberi",j:"Spiriti Kitsune e la Città degli Alberi",p:1,sl:"Sendai",
 a:["🚆 Spostamento verso il villaggio","🦊 Zao Fox Village","🚆 Rientro e Arrivo a Sendai","🌳 Esplorazione di Jozenji-dori","Rovine del Castello di Aoba"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🚆 Spostamento verso il villaggio"},
     {id:2,time:"09:30",txt:"🦊 Zao Fox Village (Miyagi Zao Kitsune Mura)"},
     {id:3,time:"12:00",txt:"🚆 Rientro e Arrivo a Sendai"},
     {id:4,time:"14:00",txt:"🌳 Esplorazione di Jozenji-dori"},
     {id:5,time:"16:00",txt:"🏯 Rovine del Castello di Aoba (Spot Aggiuntivo)"},
     {id:6,time:"18:30",txt:"🐮 La Cena dei Campioni: Gyutan"}
   ],exp:[]},
{n:6,d:"02/06",dow:"Dom",c:"Treno Sendai → Yamadera",j:"L\'Ascesa a Yamadera e l\'Estetica di Sendai",p:1,sl:"Sendai",
 a:["🎒 Preparazione zaino","🚃 Senzan Line","L\'Attacco ai 1015 Gradini","La Cima: Gododō","Pranzo Post-Hike"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🎒 Preparazione zaino"},
     {id:2,time:"08:30",txt:"🚃 Senzan Line"},
     {id:3,time:"09:30",txt:"⛩️ L\'Attacco ai 1015 Gradini"},
     {id:4,time:"11:30",txt:"🌅 La Cima: Gododō"},
     {id:5,time:"13:00",txt:"🍜 Pranzo Post-Hike"},
     {id:6,time:"14:00",txt:"🚃 Rientro verso Sendai"},
     {id:7,time:"15:30",txt:"🚇 Il Gigante Bianco Nascosto (Sendai Daikannon)"},
     {id:8,time:"18:00",txt:"🏙️ Tramonto dall\'AER Building (Gratis)"},
     {id:9,time:"19:00",txt:"🥢 Cena \"Lenta\": Gyutan"},
     {id:10,time:"20:30",txt:"🚶 Passeggiata Notturna"},
     {id:11,time:"21:30",txt:"🍸 Estetica e Conversazione: Bar, K"},
     {id:12,time:"23:00",txt:"📓 Rientro"}
   ],exp:[]},
{n:7,d:"03/06",dow:"Lun",c:"Le Isole di Pini e il Tramonto sul Fiume",j:"Le Isole di Pini e il Tramonto sul Fiume",p:1,sl:"Sendai",
 a:["🚃 Spostamento verso l\'Oceano","🚢 Crociera nella Baia di Matsushima","🍵 Matcha con Vista","Fukuura Bridge","Templi: Zuigan-ji ed Entsu-in"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"09:00",txt:"🚃 Spostamento verso l\'Oceano"},
     {id:2,time:"09:45",txt:"🚢 Crociera nella Baia di Matsushima"},
     {id:3,time:"11:00",txt:"🍵 Matcha con Vista (Chicca Aggiuntiva)"},
     {id:4,time:"11:45",txt:"🌉 Fukuura Bridge"},
     {id:5,time:"12:30",txt:"⛩️ Templi: Zuigan-ji ed Entsu-in"},
     {id:6,time:"14:00",txt:"🦪 Pranzo: Kaki Goya"},
     {id:7,time:"15:30",txt:"🚃 Rientro a Sendai"},
     {id:8,time:"16:30",txt:"🏃‍♂️ Scarico lungo il fiume Hirose"},
     {id:9,time:"18:30",txt:"🥢 Cena: La Variazione sul Tema"},
     {id:10,time:"20:30",txt:"📚 Materiale e Ricerca Notturna"},
     {id:11,time:"22:00",txt:"🏠 Rientro in Ostello e Logistica"}
   ],exp:[]},
{n:8,d:"04/06",dow:"Mar",c:"Sendai → Morioka",j:"Tradizione, Granito e la Sfida della Soba",p:1,sl:"Morioka",
 a:["📦 Logistica vitale: Takkyubin","🚄 Il Proiettile Verde","🎒 Arrivo a Morioka","Ishiwarizakura","🍡 Konzaya"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"📦 Logistica vitale: Takkyubin"},
     {id:2,time:"09:30",txt:"🚄 Il Proiettile Verde"},
     {id:3,time:"10:30",txt:"🎒 Arrivo a Morioka"},
     {id:4,time:"11:00",txt:"🌸 Ishiwarizakura (Il Ciliegio Spacca-Roccia)"},
     {id:5,time:"12:00",txt:"🍡 Konzaya"},
     {id:6,time:"13:00",txt:"🍜 Wanko Soba Challenge da Azumaya"},
     {id:7,time:"15:00",txt:"🏯 Passeggiata Digestiva: Morioka Castle Ruins Park (Iwate Park)"},
     {id:8,time:"16:30",txt:"🏛️ Architettura Classica: Bank of Iwate Red Brick Building"},
     {id:9,time:"18:30",txt:"🥢 Cena Leggera: Morioka Reimen"},
     {id:10,time:"20:30",txt:"🛏️ Rientro e Riposo"}
   ],exp:[]},
{n:9,d:"05/06",dow:"Mer",c:"Morioka → Tazawako",j:"Il Lago Indaco e l\'Acqua Lattiginosa",p:1,sl:"Tazawako",
 a:["🚄 Il Proiettile Rosso","🎒 Arrivo e Drop Bagagli","RUN 1: Giro del Lago Tazawa","📍 La Statua di Tatsuko","🏁 Fine Corsa e Ricarica Carboidrati"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚄 Il Proiettile Rosso"},
     {id:2,time:"09:00",txt:"🎒 Arrivo e Drop Bagagli"},
     {id:3,time:"09:30",txt:"🏃‍♂️ RUN 1: Giro del Lago Tazawa (20.4 km)"},
     {id:4,time:"12:00",txt:"📍 La Statua di Tatsuko (Km ~10)"},
     {id:5,time:"13:00",txt:"🏁 Fine Corsa e Ricarica Carboidrati"},
     {id:6,time:"14:30",txt:"🚌 Spostamento verso i Monti"},
     {id:7,time:"16:00",txt:"♨️ Nyuto Onsen (Kashikiri)"},
     {id:8,time:"18:30",txt:"🚌 Rientro e Cena"}
   ],exp:[]},
{n:10,d:"06/06",dow:"Gio",c:"Il Grande Salto e la Chiave del Paradiso",j:"Il Grande Salto e la Chiave del Paradiso",p:1,sl:"Nagano",
 a:["🍳 Colazione e Check-out","🚄 Il Proiettile Rosso: Shinkansen Komachi","Hub di Omiya: La cultura dell\'Ekiben","🚄 Verso le Alpi: Hokuriku Shinkansen","🎒 Arrivo a Nagano e Logistica"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"🍳 Colazione e Check-out"},
     {id:2,time:"09:00",txt:"🚄 Il Proiettile Rosso: Shinkansen Komachi"},
     {id:3,time:"12:00",txt:"🍱 Hub di Omiya: La cultura dell\'Ekiben"},
     {id:4,time:"13:00",txt:"🚄 Verso le Alpi: Hokuriku Shinkansen"},
     {id:5,time:"14:30",txt:"🎒 Arrivo a Nagano e Logistica"},
     {id:6,time:"15:30",txt:"⛩️ Il Gigante di Legno: Zenkō-ji"},
     {id:7,time:"16:30",txt:"🌑 Okaidan Meguri: Il Tunnel del Paradiso"},
     {id:8,time:"18:30",txt:"🥢 Cena: La Vera Shinshu Soba"},
     {id:9,time:"20:00",txt:"🍘 Snack Serale: Oyaki"}
   ],exp:[]},
{n:11,d:"07/06",dow:"Ven",c:"Nagano → Yudanaka",j:"I Macachi e il Ritiro di Hokusai",p:1,sl:"Nagano",
 a:["🎫 Acquisto Pass e Partenza","🚃 Treno Nagaden: Nagano → Yudanaka","🚌 Bus & Hike nel bosco","🐒 Jigokudani Monkey Park","Rientro verso la civiltà"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🎫 Acquisto Pass e Partenza"},
     {id:2,time:"08:30",txt:"🚃 Treno Nagaden: Nagano → Yudanaka"},
     {id:3,time:"09:30",txt:"🚌 Bus & Hike nel bosco"},
     {id:4,time:"10:15",txt:"🐒 Jigokudani Monkey Park"},
     {id:5,time:"12:30",txt:"🚶 Rientro verso la civiltà"},
     {id:6,time:"13:30",txt:"🚃 La Tappa Segreta: Treno per Obuse"},
     {id:7,time:"14:00",txt:"🏯 Obuse: La città di Hokusai"},
     {id:8,time:"15:30",txt:"🦅 Gansho-in Temple (L\'opera finale)"},
     {id:9,time:"16:30",txt:"🌰 Merenda a Obuse: Il regno delle Castagne"},
     {id:10,time:"17:30",txt:"🚃 Rientro Definitivo a Nagano"},
     {id:11,time:"19:00",txt:"🥩 Cena: Shinshu Beef"},
     {id:12,time:"21:00",txt:"🏠 Rientro in Ostello"}
   ],exp:[]},
{n:12,d:"08/06",dow:"Sab",c:"Le Alpi e il Cratere di Itomori",j:"Le Alpi e il Cratere di Itomori",p:1,sl:"Suwa",
 a:["🚃 Spostamento verso i Monti","🚌 La Salita a Kamikōchi","🏔️ Taisho Pond","Kappabashi Bridge","Pranzo Alpino"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"🚃 Spostamento verso i Monti"},
     {id:2,time:"08:30",txt:"🚌 La Salita a Kamikōchi"},
     {id:3,time:"10:00",txt:"🏔️ Taisho Pond (L\'Inizio dell\'Hike)"},
     {id:4,time:"11:00",txt:"🌊 Kappabashi Bridge"},
     {id:5,time:"12:30",txt:"🍱 Pranzo Alpino"},
     {id:6,time:"14:00",txt:"🚌 Rientro e Cambio a Matsumoto"},
     {id:7,time:"16:00",txt:"🎒 Arrivo a Suwa e Check-in"},
     {id:8,time:"16:30",txt:"🌠 L\'Ascesa al Tateishi Park (Your Name)"},
     {id:9,time:"18:45",txt:"🥢 Cena a Suwa"},
     {id:10,time:"20:30",txt:"♨️ Il Lusso Privato: Onsen in Camera"},
     {id:11,time:"22:00",txt:"📓 Relax e Pianificazione"}
   ],exp:[]},
{n:13,d:"09/06",dow:"Dom",c:"Corsa sul Lago e Corsa contro il Tempo",j:"Corsa sul Lago e Corsa contro il Tempo",p:1,sl:"Shirakawa-gō",
 a:["RUN 2: Il Giro del Lago Suwa","Recupero: Onsen Katakurakan","🚃 Treno verso il Mar del Giappone","🎒 Arrivo a Toyama & Sprint","🚨 ULTIMO BUS: Toyama → Shirakawa-gō"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"06:30",txt:"🏃‍♂️ RUN 2: Il Giro del Lago Suwa (16km)"},
     {id:2,time:"10:30",txt:"♨️ Recupero: Onsen Katakurakan"},
     {id:3,time:"12:30",txt:"🚃 Treno verso il Mar del Giappone"},
     {id:4,time:"15:30",txt:"🎒 Arrivo a Toyama & Sprint"},
     {id:5,time:"17:00",txt:"🚨 ULTIMO BUS: Toyama → Shirakawa-gō"},
     {id:6,time:"18:30",txt:"🏠 Arrivo nel Villaggio del Tempo Sospeso"},
     {id:7,time:"19:00",txt:"🥢 Cena Tradizionale"},
     {id:8,time:"20:30",txt:"🌌 Passeggiata Notturna tra i Gassho-zukuri"}
   ],exp:[]},
{n:14,d:"10/06",dow:"Lun",c:"Dalla Nebbia all\'Oro di Kanazawa",j:"Dalla Nebbia all\'Oro di Kanazawa",p:1,sl:"Kanazawa",
 a:["L\'Alba Esclusiva","🚌 Spostamento in Città","📦 Il Ricongiungimento Logistico","🌳 Kenroku-en","🦞 Omicho Market e Kaisendon"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"06:30",txt:"🌅 L\'Alba Esclusiva"},
     {id:2,time:"08:30",txt:"🚌 Spostamento in Città"},
     {id:3,time:"10:00",txt:"📦 Il Ricongiungimento Logistico"},
     {id:4,time:"11:00",txt:"🌳 Kenroku-en"},
     {id:5,time:"13:00",txt:"🦞 Omicho Market e Kaisendon"},
     {id:6,time:"15:00",txt:"🏘️ Higashi Chaya"},
     {id:7,time:"17:00",txt:"🏯 Nagamachi (Quartiere dei Samurai)"},
     {id:8,time:"18:00",txt:"🏃‍♂️ CORSA 6: Fiume Saigawa (Il \"Rodano di Kanazawa\")"},
     {id:9,time:"19:00",txt:"🥢 Cena Speciale: Nodoguro"},
     {id:10,time:"20:30",txt:"🎨 L\'Arte Digitale Serale: TeamLab Castle Kanazawa"},
     {id:11,time:"22:00",txt:"🍻 Serata a Katamachi"}
   ],exp:[]},
{n:15,d:"11/06",dow:"Mar",c:"Kanazawa → Gifu",j:"Acque di Cristallo e Castelli nella Valle",p:1,sl:"Nagoya",
 a:["🚃 Spostamento Logistico: Kanazawa → Gifu","🚌 La Missione per lo Stagno di Monet","Namonaki Ike","🚌 Spostamento verso i Canali","Gujo Hachiman"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"🚃 Spostamento Logistico: Kanazawa → Gifu"},
     {id:2,time:"10:00",txt:"🚌 La Missione per lo Stagno di Monet"},
     {id:3,time:"11:30",txt:"🎨 Namonaki Ike (Stagno di Monet)"},
     {id:4,time:"13:30",txt:"🚌 Spostamento verso i Canali"},
     {id:5,time:"14:30",txt:"🏯 Gujo Hachiman"},
     {id:6,time:"17:00",txt:"🚃 Rientro a Gifu e Treno per Nagoya"},
     {id:7,time:"18:00",txt:"🎒 Arrivo a Nagoya e Check-in"},
     {id:8,time:"19:30",txt:"🍗 Cena Culinaria Pesante: Tebasaki"}
   ],exp:[]},
{n:16,d:"12/06",dow:"Mer",c:"L\'Underground di Nagoya e l\'Archivio di Kyoto",j:"L\'Underground di Nagoya e l\'Archivio di Kyoto",p:1,sl:"Kyoto",
 a:["🎒 Sfratto e Logistica","👾 Esplorazione Osu Shopping District","🛍️ La Scorta Ghibli","🥩 Pranzo Ignorante: Misokatsu","🚄 Il Salto Temporale: Shinkansen per Kyoto"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🎒 Sfratto e Logistica"},
     {id:2,time:"09:30",txt:"👾 Esplorazione Osu Shopping District"},
     {id:3,time:"11:30",txt:"🛍️ La Scorta Ghibli (Piano B)"},
     {id:4,time:"12:30",txt:"🥩 Pranzo Ignorante: Misokatsu"},
     {id:5,time:"13:45",txt:"🚄 Il Salto Temporale: Shinkansen per Kyoto"},
     {id:6,time:"14:30",txt:"📚 Kyoto International Manga Museum"},
     {id:7,time:"17:30",txt:"🏠 Check-in: Guesthouse KYOTO COMPASS"},
     {id:8,time:"19:00",txt:"🏮 L\'Atmosfera di Pontocho"},
     {id:9,time:"20:00",txt:"🥢 Cena e Fiume Kamo"}
   ],exp:[]},
{n:17,d:"13/06",dow:"Gio",c:"L\'Alba Vermiglia e i Fuochi della Cucina",j:"L\'Alba Vermiglia e i Fuochi della Cucina",p:1,sl:"Kyoto",
 a:["⏰ La Sveglia Brutale","Fushimi Inari-taisha","Colazione/Recupero post-scalata","🏛️ Kiyomizu-dera & Le Strade Storiche","🛍️ Pokemon Center Kyoto"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"05:30",txt:"⏰ La Sveglia Brutale (Ma Necessaria)"},
     {id:2,time:"06:00",txt:"⛩️ Fushimi Inari-taisha"},
     {id:3,time:"10:00",txt:"☕ Colazione/Recupero post-scalata"},
     {id:4,time:"10:30",txt:"🏛️ Kiyomizu-dera & Le Strade Storiche"},
     {id:5,time:"14:00",txt:"🛍️ Pokemon Center Kyoto"},
     {id:6,time:"16:00",txt:"🍵 Relax a Gion"},
     {id:7,time:"19:00",txt:"🍳 Spettacolo e Cena: Kichi Kichi o Menbaka"},
     {id:8,time:"20:30",txt:"🏃‍♂️ CORSA 7: Fiume Kamogawa (Il Grande Classico)"},
     {id:9,time:"21:00",txt:"🌉 Passeggiata sul Kamogawa"}
   ],exp:[]},
{n:18,d:"14/06",dow:"Ven",c:"Le 1200 Facce e l\'Oro Riflesso",j:"Le 1200 Facce e l\'Oro Riflesso",p:1,sl:"Kyoto",
 a:["🎍 Arashiyama: La Foresta di Bambù","Tenryu-ji e le Simmetrie","Otagi Nenbutsuji","🎵 Kyoto Orgel-Dō","Nishiki Market: Street Food"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:00",txt:"🎍 Arashiyama: La Foresta di Bambù"},
     {id:2,time:"08:00",txt:"⛩️ Tenryu-ji e le Simmetrie"},
     {id:3,time:"09:00",txt:"🗿 Otagi Nenbutsuji (La Perla Nascosta)"},
     {id:4,time:"11:00",txt:"🎵 Kyoto Orgel-Dō"},
     {id:5,time:"13:00",txt:"🥢 Nishiki Market: Street Food"},
     {id:6,time:"15:00",txt:"🏯 Kinkaku-ji (Il Padiglione d\'Oro)"},
     {id:7,time:"18:00",txt:"🏠 Rientro e Cena Libera"}
   ],exp:[]},
{n:19,d:"15/06",dow:"Sab",c:"L\'Impatto con il Caos del Kansai",j:"L\'Impatto con il Caos del Kansai",p:1,sl:"Osaka",
 a:["🛍️ Ultime compere a Kyoto","🚃 Lo Shinkaisoku","🎒 Check-in Guesthouse U-En Osaka","Shinsekai: Retro-Futurismo","🦞 Kuromon Ichiba Market"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"10:00",txt:"🛍️ Ultime compere a Kyoto"},
     {id:2,time:"11:00",txt:"🚃 Lo Shinkaisoku (Special Rapid)"},
     {id:3,time:"12:00",txt:"🎒 Check-in Guesthouse U-En Osaka"},
     {id:4,time:"13:30",txt:"🏙️ Shinsekai: Retro-Futurismo"},
     {id:5,time:"15:30",txt:"🦞 Kuromon Ichiba Market"},
     {id:6,time:"17:30",txt:"🌃 Dotonbori: I Neon si Accendono"},
     {id:7,time:"18:30",txt:"🐙 Takoyaki Kukuru & Okonomiyaki"}
   ],exp:[]},
{n:20,d:"16/06",dow:"Dom",c:"USJ e la Pura Adrenalina",j:"USJ e la Pura Adrenalina",p:1,sl:"Osaka",
 a:["🚃 Spostamento verso il Parco","🎮 Super Nintendo World","🎢 Le Attrazioni Anime a Tempo Limitato","⚡ Wizarding World of Harry Potter","Rientro Collassato"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚃 Spostamento verso il Parco"},
     {id:2,time:"09:00",txt:"🎮 Super Nintendo World"},
     {id:3,time:"11:00",txt:"🎢 Le Attrazioni Anime a Tempo Limitato"},
     {id:4,time:"14:30",txt:"⚡ Wizarding World of Harry Potter"},
     {id:5,time:"20:00",txt:"🍜 Rientro Collassato"}
   ],exp:[]},
{n:21,d:"17/06",dow:"Lun",c:"Otaku Culture, Capibara e Preparativi",j:"Otaku Culture, Capibara e Preparativi",p:1,sl:"Osaka",
 a:["Den Den Town: La Caccia","🐾 ANIMEAL Cafe Shinsaibashi","🎣 La Cena Sfida: ZAUO Fishing Restaurant Namba","💼 PREPARAZIONE VAN: La Svolta Logistica"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"10:00",txt:"🎌 Den Den Town: La Caccia"},
     {id:2,time:"12:00",txt:"🐾 ANIMEAL Cafe Shinsaibashi"},
     {id:3,time:"18:30",txt:"🎣 La Cena Sfida: ZAUO Fishing Restaurant Namba"},
     {id:4,time:"21:00",txt:"💼 PREPARAZIONE VAN: La Svolta Logistica"}
   ],exp:[]},
{n:22,d:"18/06",dow:"Mar",c:"Le Case sull\'Acqua e la Prima Notte su Ruote",j:"Le Case sull\'Acqua e la Prima Notte su Ruote",p:2,sl:"🚐 Van",
 a:["🚐 Il Passaggio di Consegne","🛒 Missione Sopravvivenza","Amanohashidate","Strada Costiera verso Nord","Ine no Funaya"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🚐 Il Passaggio di Consegne"},
     {id:2,time:"09:30",txt:"🛒 Missione Sopravvivenza (Mega-Spesa)"},
     {id:3,time:"14:00",txt:"🌉 Amanohashidate (Il Ponte verso il Cielo)"},
     {id:4,time:"16:30",txt:"🚗 Strada Costiera verso Nord"},
     {id:5,time:"17:30",txt:"🌊 Ine no Funaya (Tramonto)"},
     {id:6,time:"20:00",txt:"🏕️ Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:23,d:"19/06",dow:"Mer",c:"Dalle Grotte Marine al \"Sahara Giapponese\"",j:"Dalle Grotte Marine al \"Sahara Giapponese\"",p:2,sl:"🚐 Van",
 a:["Uradome Coast: L\'Hike delle Scogliere","The Sand Museum","🏜️ Dune di Tottori","🦀 Cena al Porto","🏕️ Database Sosta Notturna"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"10:00",txt:"🌊 Uradome Coast: L\'Hike delle Scogliere"},
     {id:2,time:"14:00",txt:"🎨 The Sand Museum"},
     {id:3,time:"16:00",txt:"🏜️ Dune di Tottori (Tottori Sakyu)"},
     {id:4,time:"18:30",txt:"🦀 Cena al Porto"},
     {id:5,time:"20:30",txt:"🏕️ Database Sosta Notturna (A scelta dal Mood)"}
   ],exp:[]},
{n:24,d:"20/06",dow:"Gio",c:"Dai Manga al Legno Scuro dei Samurai",j:"Dai Manga al Legno Scuro dei Samurai",p:2,sl:"🚐 Van",
 a:["🕵️ Conan Town","Il Castello di Matsue","🛶 Horikawa Pleasure Boat","Il Tramonto sul Lago Shinji","🏕️ Database Sosta Notturna"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"10:00",txt:"🕵️ Conan Town (Hokuei)"},
     {id:2,time:"13:30",txt:"🏯 Il Castello di Matsue"},
     {id:3,time:"15:30",txt:"🛶 Horikawa Pleasure Boat"},
     {id:4,time:"17:30",txt:"🌅 Il Tramonto sul Lago Shinji"},
     {id:5,time:"20:30",txt:"🏕️ Database Sosta Notturna (A scelta dal Mood)"}
   ],exp:[]},
{n:25,d:"21/06",dow:"Ven",c:"La Cordigliera e la Piastra di Hiroshima",j:"La Cordigliera e la Piastra di Hiroshima",p:2,sl:"🚐 Van",
 a:["Izumo Taisha","Il Taglio di Honshu","Arrivo a Hiroshima & Il Tempio del Cibo","🏕️ Database Sosta Notturna"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"⛩️ Izumo Taisha (Il Santuario degli Dei)"},
     {id:2,time:"11:00",txt:"🚗 Il Taglio di Honshu"},
     {id:3,time:"18:30",txt:"🏙️ Arrivo a Hiroshima & Il Tempio del Cibo"},
     {id:4,time:"21:00",txt:"🏕️ Database Sosta Notturna (A scelta dal Mood)"}
   ],exp:[]},
{n:26,d:"22/06",dow:"Sab",c:"Il Torii Galleggiante e il Mare di Seto",j:"Il Torii Galleggiante e il Mare di Seto",p:2,sl:"🚐 Van",
 a:["Arrivo e Abbandono del Van","⛴️ La Traversata","Itsukushima Shrine","🏔️ L\'Ascesa al Monte Misen","🦪 Ostriche e Acero"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🚗 Arrivo e Abbandono del Van"},
     {id:2,time:"09:00",txt:"⛴️ La Traversata (10 minuti)"},
     {id:3,time:"09:30",txt:"⛩️ Itsukushima Shrine (Alta Marea)"},
     {id:4,time:"11:00",txt:"🏔️ L\'Ascesa al Monte Misen"},
     {id:5,time:"13:30",txt:"🦪 Ostriche e Acero (Street Food)"},
     {id:6,time:"14:30",txt:"🛍️ Esplorazione e Artigianato"},
     {id:7,time:"16:00",txt:"⛩️ Il Torii a Bassa Marea (La Camminata sul Fondo)"},
     {id:8,time:"17:30",txt:"⛴️ Traghetto al Tramonto"},
     {id:9,time:"18:00",txt:"🚐 Ritiro Van e Pit-stop Logistico"},
     {id:10,time:"19:00",txt:"🥢 Cena Locale"},
     {id:11,time:"20:30",txt:"🚐 Spostamento verso il Campo Base"},
     {id:12,time:"21:30",txt:"🌌 Setup Serale e Relax"}
   ],exp:[]},
{n:27,d:"23/06",dow:"Dom",c:"Vento Salmastro, Acque Cobalto e il Veleno nel Piatto",j:"Vento Salmastro, Acque Cobalto e il Veleno nel Piatto",p:2,sl:"🚐 Van",
 a:["L\'Alba sul Cruscotto","Motonosumi Shrine","Tsunoshima Bridge","La Discesa verso il Confine","Kaikyo Yume Tower"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"06:30",txt:"☕ L\'Alba sul Cruscotto"},
     {id:2,time:"08:30",txt:"⛩️ Motonosumi Shrine (Il Drago sulla Scogliera)"},
     {id:3,time:"11:30",txt:"🌉 Tsunoshima Bridge (L\'Illusione Ottica)"},
     {id:4,time:"14:30",txt:"🚗 La Discesa verso il Confine"},
     {id:5,time:"18:00",txt:"🗼 Kaikyo Yume Tower (La Mappa di Luce)"},
     {id:6,time:"19:30",txt:"🐡 Il Rischio Calcolato: Sashimi di Fugu"},
     {id:7,time:"21:30",txt:"♨️ Sento di Confine e Chiusura"}
   ],exp:[]},
{n:28,d:"24/06",dow:"Lun",c:"La Pietra Spaccata, Sartoria Urbana e i Bassifondi",j:"La Pietra Spaccata, Sartoria Urbana e i Bassifondi",p:2,sl:"🚐 Van",
 a:["Il Salto Sottomarino","Shohachiman Shrine","L\'Impatto con Fukuoka","CORSA 8: Ohori Park","Nakasu Yatai"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🕳️ Il Salto Sottomarino (Kanmon Tunnel)"},
     {id:2,time:"09:30",txt:"🗡️ Shohachiman Shrine (La Reliquia nel Bosco)"},
     {id:3,time:"13:00",txt:"🏙️ L\'Impatto con Fukuoka (Daimyo District)"},
     {id:4,time:"17:30",txt:"🏃‍♂️ CORSA 8: Ohori Park (La Pista sul Lago)"},
     {id:5,time:"19:00",txt:"🏮 Nakasu Yatai (La Notte del Brodo)"},
     {id:6,time:"22:00",txt:"🍻 Oyafuko Dori (L\'Underground)"}
   ],exp:[]},
{n:29,d:"25/06",dow:"Mar",c:"Il Gigante di Bronzo e le Vere Origini del Sapore",j:"Il Gigante di Bronzo e le Vere Origini del Sapore",p:2,sl:"🚐 Van",
 a:["Nanzo-in","Taglio verso le Pianure del Sud","🚣 Yanagawa","🍣 Il Piatto della Leggenda: Unagi no Seiro Mushi","La Deviazione Hardcore: Kurume"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🗿 Nanzo-in (Il Peso del Metallo)"},
     {id:2,time:"11:30",txt:"🚗 Taglio verso le Pianure del Sud"},
     {id:3,time:"13:00",txt:"🚣 Yanagawa (Il Ritmo Sospeso)"},
     {id:4,time:"15:30",txt:"🍣 Il Piatto della Leggenda: Unagi no Seiro Mushi"},
     {id:5,time:"17:30",txt:"🚗 La Deviazione Hardcore: Kurume"},
     {id:6,time:"19:30",txt:"🍜 Taiho Ramen (Il Battesimo del Fuoco)"},
     {id:7,time:"21:30",txt:"🍶 I Vicoli degli Spiedini"}
   ],exp:[]},
{n:30,d:"26/06",dow:"Mer",c:"Pali nell\'Acqua, Bronzo e Carne Cruda",j:"Pali nell\'Acqua, Bronzo e Carne Cruda",p:2,sl:"🚐 Van",
 a:["L\'Aria del Mattino e il Check delle Maree","Nagabeta Seabed Road","🏴‍☠️ La Caccia al Tesoro: Jinbe e One Piece","Kumamoto Castle","🥩 Il Sapore di Kumamoto: Basashi"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"☕ L\'Aria del Mattino e il Check delle Maree"},
     {id:2,time:"09:30",txt:"🌊 Nagabeta Seabed Road (Il Treno di Chihiro)"},
     {id:3,time:"12:00",txt:"🏴‍☠️ La Caccia al Tesoro: Jinbe e One Piece"},
     {id:4,time:"15:00",txt:"🏯 Kumamoto Castle (Le Cicatrici di Pietra)"},
     {id:5,time:"18:30",txt:"🥩 Il Sapore di Kumamoto: Basashi"},
     {id:6,time:"21:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:31,d:"27/06",dow:"Gio",c:"Cenere, Maiali Neri e il Cratere Fumante",j:"Cenere, Maiali Neri e il Cratere Fumante (KAGOSHIMA)",p:2,sl:"🚐 Van",
 a:["L\'Autostrada verso Sud","🌋 L\'Impatto con Kagoshima e il Sakurajima","⛴️ Il Traghetto Vulcanico","🪨 Arimura Lava Observatory","Pediluvio e Rientro"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"🚗 L\'Autostrada verso Sud"},
     {id:2,time:"10:30",txt:"🌋 L\'Impatto con Kagoshima e il Sakurajima"},
     {id:3,time:"12:30",txt:"⛴️ Il Traghetto Vulcanico (Col Van)"},
     {id:4,time:"13:30",txt:"🪨 Arimura Lava Observatory"},
     {id:5,time:"16:30",txt:"♨️ Pediluvio e Rientro"},
     {id:6,time:"17:30",txt:"🏃‍♂️ CORSA 9: Sakurajima Waterfront (Il Vulcano che Fuma)"},
     {id:7,time:"19:00",txt:"🥢 Il Trionfo della Ciccia: Kurobuta Tonkatsu"},
     {id:8,time:"21:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:32,d:"28/06",dow:"Ven",c:"Palme, Fiamme Nere e le Lanterne di Nishitachi",j:"Palme, Fiamme Nere e le Lanterne di Nishitachi",p:2,sl:"🚐 Van",
 a:["Taglio Verso la Costa del Pacifico","🌴 Aoshima e la Tavola del Lavandaio","🍗 Calorie e Aceto: Il Chicken Nanban","Udo Jingu","Corsa al Tramonto sulla Costa Nichinan"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"🚗 Taglio Verso la Costa del Pacifico"},
     {id:2,time:"10:30",txt:"🌴 Aoshima e la Tavola del Lavandaio"},
     {id:3,time:"13:00",txt:"🍗 Calorie e Aceto: Il Chicken Nanban"},
     {id:4,time:"15:30",txt:"⛩️ Udo Jingu (Il Santuario nella Grotta)"},
     {id:5,time:"17:30",txt:"🏃‍♂️ Corsa al Tramonto sulla Costa Nichinan"},
     {id:6,time:"18:45",txt:"♨️ Aoshima Onsen (Via il Sale)"},
     {id:7,time:"20:00",txt:"🏮 Il Labirinto di Nishitachi"},
     {id:8,time:"21:00",txt:"🔥 Fumo e Jidori (La Cena delle Fiamme)"},
     {id:9,time:"23:30",txt:"🏕️ Rientro Barcollante al Van"}
   ],exp:[]},
{n:33,d:"29/06",dow:"Sab",c:"La Foresta degli Spiriti e la Gola di Smeraldo",j:"La Foresta degli Spiriti e la Gola di Smeraldo",p:2,sl:"🚐 Van",
 a:["Risveglio tra le Montagne","🌿 Kamishikimi Kumanoimasu Shrine","Rientro in Prefettura di Miyazaki","Pranzo: Nagashi Somen","La Gola di Takachiho e la Barca"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"☕ Risveglio tra le Montagne"},
     {id:2,time:"09:00",txt:"🌿 Kamishikimi Kumanoimasu Shrine (Il Portale)"},
     {id:3,time:"11:30",txt:"🚗 Rientro in Prefettura di Miyazaki"},
     {id:4,time:"13:00",txt:"🥢 Pranzo: Nagashi Somen"},
     {id:5,time:"14:30",txt:"🏞️ La Gola di Takachiho e la Barca"},
     {id:6,time:"18:00",txt:"🥩 Cena: Manzo di Takachiho"},
     {id:7,time:"20:00",txt:"👹 Yokagura (La Danza degli Dei)"},
     {id:8,time:"21:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:34,d:"30/06",dow:"Dom",c:"Corsa sul Cratere e le Terme Nascoste",j:"Corsa sul Cratere e le Terme Nascoste",p:2,sl:"🚐 Van",
 a:["📱 Check Vulcanico e Partenza","🌋 Kusasenri-ga-hama","🔥 Cratere Nakadake","La Traversata del Kuju","Kurokawa Onsen"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"📱 Check Vulcanico e Partenza"},
     {id:2,time:"09:30",txt:"🌋 Kusasenri-ga-hama (La Corsa sull\'Altopiano)"},
     {id:3,time:"11:30",txt:"🔥 Cratere Nakadake (Se Aperto)"},
     {id:4,time:"13:00",txt:"🚗 La Traversata del Kuju"},
     {id:5,time:"15:00",txt:"♨️ Kurokawa Onsen (Il Bagno Privato)"},
     {id:6,time:"19:00",txt:"🍶 Atmosfera Notturna a Kurokawa"},
     {id:7,time:"21:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:35,d:"01/07",dow:"Lun",c:"Il Giorno del Giudizio",j:"Il Giorno del Giudizio (HITA - ATTACK ON TITAN)",p:2,sl:"🚐 Van",
 a:["Avvicinamento a Shiganshina","🧱 Oyama Dam","🖼️ Attack on Titan in HITA Museum","Pranzo: Hita Yakisoba","Il Centro Storico: Mameda-machi"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚗 Avvicinamento a Shiganshina"},
     {id:2,time:"09:30",txt:"🧱 Oyama Dam (La Disperazione dei Bambini)"},
     {id:3,time:"11:30",txt:"🖼️ Attack on Titan in HITA Museum (Annex)"},
     {id:4,time:"13:30",txt:"🥢 Pranzo: Hita Yakisoba"},
     {id:5,time:"15:00",txt:"🏙️ Il Centro Storico: Mameda-machi"},
     {id:6,time:"17:30",txt:"⚔️ Hita Station (Il Capitano Levi)"},
     {id:7,time:"19:30",txt:"🍻 Serata a Kuma-machi"},
     {id:8,time:"21:30",txt:"🏕️ Database Sosta Notturna Hita (Le 3 Opzioni Tattiche)"}
   ],exp:[]},
{n:36,d:"02/07",dow:"Mar",c:"Le Porte di Suzume, Crocchette e l\'Inferno di Vapore",j:"Le Porte di Suzume, Crocchette e l\'Inferno di Vapore",p:2,sl:"🚐 Van",
 a:["L\'Uscita dalla Valle","Bungo-Mori Roundhouse","L\'Arrampicata verso Yufuin","🥩 Yunotsubo Street & Bungo Beef","🌫️ Lago Kinrin"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"☕ L\'Uscita dalla Valle"},
     {id:2,time:"08:30",txt:"🚂 Bungo-Mori Roundhouse (La Porta verso l\'Altrove)"},
     {id:3,time:"11:00",txt:"🚗 L\'Arrampicata verso Yufuin"},
     {id:4,time:"11:45",txt:"🥩 Yunotsubo Street & Bungo Beef (L\'Estetica dell\'Onsen)"},
     {id:5,time:"13:30",txt:"🌫️ Lago Kinrin"},
     {id:6,time:"15:30",txt:"🚗 La Discesa su Beppu (Steampunk City)"},
     {id:7,time:"17:00",txt:"♨️ Takegawara Onsen (Il Bagno del Popolo)"},
     {id:8,time:"19:30",txt:"🍗 Toriten e Shochu"},
     {id:9,time:"21:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:37,d:"03/07",dow:"Mer",c:"Sangue, Pietra e l\'Imbarco per lo Shikoku",j:"Sangue, Pietra e l\'Imbarco per lo Shikoku",p:2,sl:"🚐 Van",
 a:["L\'Odore di Zolfo","🔴🔵 Jigoku Meguri","🏖️ Beppu Kaihin Sand Bath","Taglio Verso Sud","Usuki Stone Buddhas"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"☕ L\'Odore di Zolfo"},
     {id:2,time:"09:00",txt:"🔴🔵 Jigoku Meguri (I Sette Inferni di Beppu)"},
     {id:3,time:"11:30",txt:"🏖️ Beppu Kaihin Sand Bath (Sepolti Vivi)"},
     {id:4,time:"13:00",txt:"🚗 Taglio Verso Sud (Rotta per Usuki)"},
     {id:5,time:"14:30",txt:"🗿 Usuki Stone Buddhas (Usuki Sekibutsu)"},
     {id:6,time:"16:30",txt:"⛴️ L\'Imbarco (Porto di Usuki / Yawatahama)"},
     {id:7,time:"17:30",txt:"🌊 La Traversata del Bungo Channel"},
     {id:8,time:"20:00",txt:"🚗 Sbarco nello Shikoku (Yawatahama → Matsuyama)"},
     {id:9,time:"21:30",txt:"🏯 Dogo Onsen (Passeggiata Notturna)"},
     {id:10,time:"23:00",txt:"🏕️ Database Sosta Notturna Matsuyama (A Scelta dal Mood)"}
   ],exp:[]},
{n:38,d:"04/07",dow:"Gio",c:"Il Taglio delle Montagne e il Mercato del Fuoco",j:"Il Taglio delle Montagne e il Mercato del Fuoco",p:2,sl:"🚐 Van",
 a:["🏰 L\'Addio a Matsuyama","Katsurahama Beach","Kochi Castle","CORSA 11: Pista Haruno Athletic Park","🔥 Hirome Ichiba"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:30",txt:"🏰 L\'Addio a Matsuyama"},
     {id:2,time:"12:30",txt:"🌊 Katsurahama Beach (Il Pacifico Selvaggio)"},
     {id:3,time:"15:00",txt:"🏯 Kochi Castle"},
     {id:4,time:"17:00",txt:"🏃‍♂️ CORSA 11: Pista Haruno Athletic Park (Tartan Blu)"},
     {id:5,time:"18:30",txt:"🔥 Hirome Ichiba (Il Caos e il Tonno)"},
     {id:6,time:"22:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:39,d:"05/07",dow:"Ven",c:"L\'Extra Day: La Valle Nascosta dei Samurai",j:"L\'Extra Day: La Valle Nascosta dei Samurai (IYA VALLEY)",p:2,sl:"🚐 Van",
 a:["Salita nell\'Abisso Verde","Iya Kazurabashi","Pranzo: Iya Soba","🚯 Il Bambino che fa Pipì","Iya Onsen"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚗 Salita nell\'Abisso Verde"},
     {id:2,time:"11:00",txt:"🌉 Iya Kazurabashi (Il Ponte di Liane)"},
     {id:3,time:"13:30",txt:"🍜 Pranzo: Iya Soba"},
     {id:4,time:"15:00",txt:"🚯 Il Bambino che fa Pipì (Peeing Boy Statue)"},
     {id:5,time:"18:00",txt:"♨️ Iya Onsen (Il Cavo Sospeso)"},
     {id:6,time:"20:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:40,d:"06/07",dow:"Sab",c:"Vortici Mortali e l\'Isola di Awaji",j:"Vortici Mortali e l\'Isola di Awaji",p:2,sl:"🚐 Van",
 a:["Discesa verso la Costa Est","🌀 I Vortici di Naruto","L\'Attraversamento dell\'Onaruto Bridge","🧅 Il Tramonto su Awaji","🥩 Cena: Awaji Beef"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚗 Discesa verso la Costa Est"},
     {id:2,time:"11:30",txt:"🌀 I Vortici di Naruto (Uzushio)"},
     {id:3,time:"14:00",txt:"🌉 L\'Attraversamento dell\'Onaruto Bridge"},
     {id:4,time:"15:30",txt:"🧅 Il Tramonto su Awaji"},
     {id:5,time:"18:00",txt:"🥩 Cena: Awaji Beef"},
     {id:6,time:"20:30",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:41,d:"07/07",dow:"Dom",c:"Cemento Brutalista e il Rientro nel Kansai",j:"Cemento Brutalista e il Rientro nel Kansai (NARA)",p:2,sl:"🚐 Van",
 a:["🏛️ Tadao Ando\'s Water Temple","Il Salto Finale: Akashi Kaikyo Bridge","Bypass Urbano verso Nara","Nara Park e l\'Immensità di Legno","Naramachi"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🏛️ Tadao Ando\'s Water Temple (Honpukuji)"},
     {id:2,time:"11:00",txt:"🌉 Il Salto Finale: Akashi Kaikyo Bridge"},
     {id:3,time:"12:30",txt:"🚗 Bypass Urbano verso Nara"},
     {id:4,time:"14:30",txt:"🦌 Nara Park e l\'Immensità di Legno"},
     {id:5,time:"17:30",txt:"🏮 Naramachi (Il Quartiere dei Mercanti)"},
     {id:6,time:"20:00",txt:"🏕️ Database Sosta Notturna (A Scelta dal Mood)"}
   ],exp:[]},
{n:42,d:"08/07",dow:"Lun",c:"Scarico Aerobico, Rientro e l\'Ultima Notte a Osaka",j:"Scarico Aerobico, Rientro e l\'Ultima Notte a Osaka",p:2,sl:"Osaka",
 a:["Corsa all\'Alba a Nara Park","🧽 Check Logistico del Van","La Discesa nel Gorgo: Osaka","Shimokitazawa del Kansai: Nakazaki-cho o Amerikamura","🐙 Shinsekai o Dotonbori"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"07:00",txt:"🏃‍♂️ Corsa all\'Alba a Nara Park"},
     {id:2,time:"10:30",txt:"🧽 Check Logistico del Van"},
     {id:3,time:"12:00",txt:"🚗 La Discesa nel Gorgo: Osaka"},
     {id:4,time:"14:30",txt:"🏙️ Shimokitazawa del Kansai: Nakazaki-cho o Amerikamura"},
     {id:5,time:"19:00",txt:"🐙 Shinsekai o Dotonbori (L\'Abbuffata Finale)"},
     {id:6,time:"23:00",txt:"🏕️ L\'Ultimo Parcheggio (Osaka)"}
   ],exp:[]},
{n:43,d:"09/07",dow:"Mar",c:"Il Passaggio di Consegne e il Volo a Sud",j:"Il Passaggio di Consegne e il Volo a Sud",p:3,sl:"Okinawa",
 a:["🚐 La Fine dell\'Asfalto","🔑 Riconsegna del Mezzo","🚉 Spostamento Verso l\'Aeroporto","✈️ Check-in e Pranzo Aeroportuale","🛫 Volo per Okinawa"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🚐 La Fine dell\'Asfalto"},
     {id:2,time:"09:30",txt:"🔑 Riconsegna del Mezzo"},
     {id:3,time:"10:30",txt:"🚉 Spostamento Verso l\'Aeroporto"},
     {id:4,time:"12:30",txt:"✈️ Check-in e Pranzo Aeroportuale"},
     {id:5,time:"15:25",txt:"🛫 Volo per Okinawa"},
     {id:6,time:"17:30",txt:"🛬 Muro d\'Umidità"},
     {id:7,time:"19:00",txt:"🔑 Check-in all\'Umikaji"},
     {id:8,time:"20:30",txt:"🏮 Il Labirinto di Sakaemachi Market"}
   ],exp:[]},
{n:44,d:"10/07",dow:"Mer",c:"Il Salto nel \"Kerama Blue\"",j:"Il Salto nel \"Kerama Blue\"",p:3,sl:"Okinawa",
 a:["🚢 Il Porto di Tomari","Aharen Beach","Scarico Aerobico sul Lungomare","🥃 Il Rito dello Yuntaku in Terrazza"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚢 Il Porto di Tomari (Tomarin)"},
     {id:2,time:"10:00",txt:"🌊 Aharen Beach (L\'Acqua Elettrica)"},
     {id:3,time:"16:30",txt:"🏃‍♂️ Scarico Aerobico sul Lungomare"},
     {id:4,time:"20:00",txt:"🥃 Il Rito dello Yuntaku in Terrazza"}
   ],exp:[]},
{n:45,d:"11/07",dow:"Gio",c:"Canne da Zucchero, Forni di Fango e Pollo all\'Aglio",j:"Canne da Zucchero, Forni di Fango e Pollo all\'Aglio",p:3,sl:"Kyoto",
 a:["🚌 Spostamento Verso Centro Isola: Yomitan Village","🧱 Yachimun no Sato","Il Grasso Sacro: Sōki Soba","🌴 Corsa a Cape Zanpa","🧄 L\'Inferno di Aglio da Marutama"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:30",txt:"🚌 Spostamento Verso Centro Isola: Yomitan Village"},
     {id:2,time:"10:30",txt:"🧱 Yachimun no Sato (Il Villaggio della Terra)"},
     {id:3,time:"13:00",txt:"🍜 Il Grasso Sacro: Sōki Soba"},
     {id:4,time:"15:30",txt:"🌴 Corsa a Cape Zanpa"},
     {id:5,time:"19:30",txt:"🧄 L\'Inferno di Aglio da Marutama"}
   ],exp:[]},
{n:46,d:"12/07",dow:"Ven",c:"I Cervi Selvatici della Spiaggia Bianca",j:"I Cervi Selvatici della Spiaggia Bianca",p:3,sl:"Kyoto",
 a:["🚢 Rotta per Aka Island","Nishibama Beach e i Cervi di Ryukyu","🧱 I Muri di Pietra di Tsuboya","🪕 L\'Ultima Cena al Suono del Sanshin"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🚢 Rotta per Aka Island (L\'Isolamento)"},
     {id:2,time:"09:30",txt:"🦌 Nishibama Beach e i Cervi di Ryukyu"},
     {id:3,time:"16:30",txt:"🧱 I Muri di Pietra di Tsuboya"},
     {id:4,time:"20:00",txt:"🪕 L\'Ultima Cena al Suono del Sanshin"}
   ],exp:[]},
{n:47,d:"13/07",dow:"Sab",c:"L\'Ultimo Respiro di Oceano e il Ritorno a Kyoto",j:"L\'Ultimo Respiro di Oceano e il Ritorno a Kyoto",p:3,sl:"Kyoto",
 a:["L\'Ultima Sessione Tropicale","🧽 Svuotamento Capsula e Check-out","🛂 Aeroporto di Naha (OKA) & Check-in","🛫 Volo GK352 - Decollo","🛬 Atterraggio a KIX"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"08:00",txt:"🏃‍♂️ L\'Ultima Sessione Tropicale"},
     {id:2,time:"09:30",txt:"🧽 Svuotamento Capsula e Check-out"},
     {id:3,time:"10:30",txt:"🛂 Aeroporto di Naha (OKA) & Check-in"},
     {id:4,time:"12:30",txt:"🛫 Volo GK352 - Decollo"},
     {id:5,time:"14:40",txt:"🛬 Atterraggio a KIX (Kansai International)"},
     {id:6,time:"15:15",txt:"🚄 Il Treno Rapido \"Haruka\""},
     {id:7,time:"16:45",txt:"🔑 Arrivo a Kyoto & Deposito Zaino"},
     {id:8,time:"18:30",txt:"🏮 L\'Anticipazione del Gion Matsuri (I Primi Carri)"},
     {id:9,time:"20:30",txt:"🍜 Cena di Rientro"}
   ],exp:[]},
{n:48,d:"14/07",dow:"Dom",c:"Il Gion Matsuri e lo Shinkansen della Morte",j:"Il Gion Matsuri e lo Shinkansen della Morte",p:3,sl:"Tokyo",
 a:["🪵 L\'Immensità dei Carri","Il Delirio di Lanterne e Street Food","Lo Strappo e la Corsa alla Stazione","🚄 L\'Ultimo Treno per Tokyo","Arrivo a Tokyo & Logistica Notturna"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"09:30",txt:"🪵 L\'Immensità dei Carri (Yamaboko)"},
     {id:2,time:"18:00",txt:"🏮 Il Delirio di Lanterne e Street Food"},
     {id:3,time:"21:00",txt:"🏃‍♂️ Lo Strappo e la Corsa alla Stazione"},
     {id:4,time:"21:38",txt:"🚄 L\'Ultimo Treno per Tokyo (Nozomi 64)"},
     {id:5,time:"23:45",txt:"🏙️ Arrivo a Tokyo & Logistica Notturna"}
   ],exp:[]},
{n:49,d:"15/07",dow:"Lun",c:"Il Gate e i Titoli di Coda",j:"Il Gate e i Titoli di Coda",p:3,sl:"Tokyo",
 a:["CORSA 14: Palazzo Imperiale (Il Giro d\'Onore) - OPZIONALE","🛂 Controllo Bagagli e Faccia da Zombie","L\'Ultimo Tè Verde al Terminal 3","✈️ Imbarco Gate","🛫 Il Decollo Finale"],m:[],b:55,st:"ok",nt:"",
   schedule:[
     {id:1,time:"05:00",txt:"🏃‍♂️ CORSA 14: Palazzo Imperiale (Il Giro d\'Onore) - OPZIONALE"},
     {id:2,time:"06:30",txt:"🛂 Controllo Bagagli e Faccia da Zombie"},
     {id:3,time:"07:30",txt:"☕ L\'Ultimo Tè Verde al Terminal 3"},
     {id:4,time:"08:45",txt:"✈️ Imbarco Gate"},
     {id:5,time:"09:25",txt:"🛫 Il Decollo Finale"}
   ],exp:[]},
];          <div style={{marginBottom:16}}>
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
  const [isSaving,setIsSaving]=useState(false);
  
  useEffect(()=>{
    loadGuide();
    
    // Listen to Firebase changes
    const unsubscribe = db.collection('userData').doc('guide-content')
      .onSnapshot((doc) => {
        if (!isSaving && doc.exists && doc.data().content) {
          console.log('📡 Guide updated from Firebase');
          setContent(doc.data().content);
          if (!editing) {
            setEditContent(doc.data().content);
          }
        }
      });
    
    return () => unsubscribe();
  },[isSaving, editing]);
  
  async function loadGuide(){
    try {
      // Try Firebase first
      const docSnap = await db.collection('userData').doc('guide-content').get();
      
      if(docSnap.exists && docSnap.data().content){
        console.log('✅ Loaded guide from Firebase');
        setContent(docSnap.data().content);
        setEditContent(docSnap.data().content);
        setLoading(false);
      } else {
        // Load from file
        console.log('📄 Loading guide from file');
        const response = await fetch('./GUIDA-DETTAGLIATA.md');
        const text = await response.text();
        setContent(text);
        setEditContent(text);
        setLoading(false);
        
        // Save to Firebase for future
        await db.collection('userData').doc('guide-content').set({
          content: text,
          lastModified: new Date().toISOString()
        });
      }
    } catch(err) {
      console.error('❌ Error loading guide:', err);
      // Fallback to file
      try {
        const response = await fetch('./GUIDA-DETTAGLIATA.md');
        const text = await response.text();
        setContent(text);
        setEditContent(text);
      } catch(e){
        console.error('❌ Failed to load from file too:', e);
      }
      setLoading(false);
    }
  }
  
  async function saveGuide(){
    if(!editContent.trim()){
      alert('❌ Cannot save empty content');
      return;
    }
    
    setSaving(true);
    setIsSaving(true);
    
    try {
      await db.collection('userData').doc('guide-content').set({
        content: editContent,
        lastModified: new Date().toISOString()
      });
      
      setContent(editContent);
      setEditing(false);
      console.log('✅ Guide saved successfully');
      
      // Wait a bit before re-enabling Firebase listener
      setTimeout(() => setIsSaving(false), 1000);
    } catch(err) {
      console.error('❌ Error saving guide:', err);
      alert('❌ Errore salvataggio: ' + err.message);
      setIsSaving(false);
    } finally {
      setSaving(false);
    }
  }
  
  if(loading) return <div className="loading">📖 Caricamento guida...</div>;
  
  return (
    <div className="guide-view">
      <div className="guide-header">
        <h2>📖 Guida Dettagliata</h2>
        <div className="guide-actions">
          {!editing ? (
            <button onClick={()=>{setEditing(true);setEditContent(content)}}>
              ✏️ Modifica
            </button>
          ) : (
            <>
              <button onClick={saveGuide} disabled={saving}>
                {saving ? '💾 Salvataggio...' : '💾 Salva'}
              </button>
              <button onClick={()=>{setEditing(false);setEditContent(content)}}>
                ❌ Annulla
              </button>
            </>
          )}
        </div>
      </div>
      
      {editing ? (
        <textarea
          className="guide-editor"
          value={editContent}
          onChange={(e)=>setEditContent(e.target.value)}
          placeholder="Scrivi la tua guida..."
        />
      ) : (
        <div className="guide-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
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
