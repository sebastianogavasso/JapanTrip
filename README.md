# 🇯🇵 JAPAN TRIP 2026 - APP PWA

**49 giorni in Giappone** (28 Maggio - 15 Luglio 2026)

---

## 🚀 INSTALLAZIONE RAPIDA (5 MINUTI)

### STEP 1: CARICA SU GITHUB

1. Hai già creato il repository GitHub (es: `Japan-Trip-2026`)
2. Scarica TUTTI i file di questa cartella
3. Caricali sul repository:
   - Drag & drop tutti i file su GitHub
   - Oppure usa Git da terminale (vedi sotto)

### STEP 2: ABILITA GITHUB PAGES

1. Vai su **Settings** del repository
2. Menu laterale → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** → Folder: **/ (root)**
5. Click **Save**
6. Aspetta 1-2 minuti → il sito sarà live!

### STEP 3: APRI L'APP

```
https://<tuo-username>.github.io/<nome-repo>/
```

Esempio:
```
https://itachisan-max.github.io/Japan-Trip-2026/
```

---

## 📁 FILE INCLUSI

```
app.jsx                  → App React (2118 righe)
index.html              → Entry point con Firebase config
manifest.json           → PWA configuration
service-worker.js       → Offline support
GUIDA-DETTAGLIATA.md    → Guida completa 49 giorni (2614 righe)
LISTA-VALIGIA-50GG.md   → Checklist 143 items
README.md               → Questo file
```

---

## 🔥 FIREBASE (OPZIONALE - MA CONSIGLIATO)

L'app ha già Firebase configurato per sincronizzare i dati tra dispositivi.

### OPZIONE A: USA IL PROGETTO ESISTENTE

Il file `index.html` ha già configurato:
- Project ID: `japan-50-days-trip`

**Funziona già!** Non devi fare niente.

### OPZIONE B: CREA NUOVO PROGETTO FIREBASE

Se vuoi partire da zero con Firebase:

1. Vai su https://console.firebase.google.com/
2. Click **"Add project"**
3. Nome: `japan-trip-2026` (o quello che vuoi)
4. Disabilita Google Analytics (opzionale)
5. Click **Create project**

6. Nel progetto → Click icona **"</>** (Web app)
7. App nickname: `japan-app`
8. ✅ Abilita **Firebase Hosting** (opzionale)
9. Click **Register app**

10. COPIA la configurazione che ti danno:
```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

11. Apri `index.html` → Sostituisci la config alla riga ~38

12. Nel menu Firebase → **Build** → **Firestore Database**
13. Click **Create database**
14. Location: `asia-northeast1` (Tokyo)
15. Security rules: **Start in test mode**
16. Click **Enable**

---

## 🎨 FUNZIONALITÀ APP

### 📅 ITINERARIO (49 Giorni)
- ✅ Tutti i giorni sincronizzati con GUIDA-DETTAGLIATA.md
- ✅ 350+ schedule entries con orari
- ✅ Tracker spese per giorno
- ✅ Editor trasporti
- ✅ Sync Firebase real-time

### 📖 GUIDA
- ✅ Carica GUIDA-DETTAGLIATA.md completa (2614 righe)
- ✅ Tutti i programmi giornalieri dettagliati
- ✅ Alloggi, attività, timing, note

### 🗺️ MAPPA
- ✅ Google Maps embed interattiva
- ✅ Visualizza rotta completa

### 🎒 VALIGIA
- ✅ 143 item checklist
- ✅ 14 categorie
- ✅ Progress tracker
- ✅ Running gear (13 sessioni)

---

## 🛠️ COMANDI GIT (OPZIONALE)

Se preferisci usare Git da terminale:

```bash
# Clona il repository
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>

# Copia tutti i file scaricati in questa cartella

# Commit e push
git add .
git commit -m "Initial commit - Japan trip app"
git push origin main
```

---

## 🐛 TROUBLESHOOTING

### L'app mostra pagina bianca
- ✅ Verifica che TUTTI i file siano stati caricati
- ✅ Apri Developer Tools (F12) → Console → vedi errori
- ✅ Verifica che GitHub Pages sia abilitato

### Gli schedule sono vecchi/mancanti
- ✅ Cancella cache browser (Ctrl+Shift+R)
- ✅ Cancella dati Firebase: F12 → Application → IndexedDB → Delete database
- ✅ Ricarica pagina

### La Guida non si carica
- ✅ Verifica che `GUIDA-DETTAGLIATA.md` sia nella root del repository
- ✅ Controlla Developer Tools → Network → vedi se il file viene scaricato

---

## 📊 STATISTICHE PROGETTO

- **Righe app.jsx**: 2,118
- **Righe guida completa**: 2,614
- **Giorni**: 49 (28/05 - 15/07)
- **Schedule entries**: 350+
- **Checklist items**: 143
- **Dimensione totale**: ~300 KB

---

## ✨ CREDITS

Developed with ❤️ for the ultimate Japan adventure!
