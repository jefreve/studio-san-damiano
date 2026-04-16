# Booking Widget — Documentazione Tecnica

> Versione di riferimento: `src-core/` — build target `widget-v2.js`

---

## Indice

1. [Overview](#1-overview)
2. [Quick Start](#2-quick-start)
3. [Configurazione — `window.RB_WIDGET_CONFIG`](#3-configurazione--windowrb_widget_config)
   - [Campi radice](#31-campi-radice)
   - [branding](#32-branding)
   - [services](#33-services)
   - [doctors](#34-doctors)
   - [insurances](#35-insurances)
   - [texts](#36-texts)
   - [trigger](#37-trigger)
   - [useMinimalForm](#38-useminimalform)
4. [Flusso utente (step-by-step)](#4-flusso-utente-step-by-step)
5. [Slot Timer e Session Recovery](#5-slot-timer-e-session-recovery)
6. [API JavaScript esterna](#6-api-javascript-esterna)
7. [Build e Deploy](#7-build-e-deploy)
8. [Personalizzazione Branding](#8-personalizzazione-branding)
9. [Limitazioni note e Pitfall](#9-limitazioni-note-e-pitfall)

---

## 1. Overview

Il Booking Widget è un componente React embeddable che consente ai pazienti di prenotare appuntamenti direttamente da qualsiasi sito web. Si integra con un singolo tag `<script>` e non richiede alcuna modifica al codice del sito ospitante.

**Architettura:**
- **Frontend-only**: tutta la logica risiede nel browser. Non esiste ancora un backend; il form di contatto è pronto per essere agganciato ad un endpoint API tramite callback.
- **Shadow DOM**: il widget è isolato dagli stili globali del sito ospitante tramite Shadow DOM, evitando conflitti CSS.
- **Config-driven**: dati di clinica (nome, servizi, medici, branding) vengono passati via `window.RB_WIDGET_CONFIG` prima del caricamento dello script.
- **Session persistence**: lo stato della prenotazione viene salvato in `localStorage` con TTL di 30 minuti.

**File prodotti dal build:**
| File | Descrizione |
|------|-------------|
| `dist/widget-v2.js` | Bundle UMD — compatibile con tutti i browser, si include direttamente |
| `dist/widget-v2.mjs` | Bundle ES Module — per ambienti moderni |
| `dist/widget-v2.css` | Foglio di stile compilato (Tailwind) |

---

## 2. Quick Start

Aggiungi questo snippet all'HTML del sito, **prima della chiusura del `</body>`**:

```html
<!-- 1. Configura il widget PRIMA di caricare lo script (CSS incluso nel bundle) -->
<script>
  window.RB_WIDGET_CONFIG = {
    name: "Studio Dentistico Rossi",
    phone: "+39 02 1234567",
    dashboardUrl: "https://mio-studio.it/area-personale",

    branding: {
      primaryColor: "#C8B49A",      // beige header
      secondaryColor: "#3D3D3D",    // grigio scuro card
      accentColor: "#C8B49A",
      backgroundColor: "#3D3D3D",  // sfondo corpo widget
      foregroundColor: "#FFFFFF",   // testo bianco su scuro
      fontFamily: "'Cormorant Garamond', serif",
      borderRadius: "0rem"
    },

    services: [
      { id: "visita",  name: "Visita Generale",  description: "Controllo completo della salute orale", duration: "30 min" },
      { id: "igiene",  name: "Igiene Orale",      description: "Pulizia professionale e levigatura",   duration: "45 min" },
      { id: "estetica", name: "Odontoiatria Estetica", description: "Sbiancamento e faccette dentali",  duration: "60 min" }
    ],

    doctors: [
      { id: "rossi",    name: "Dott. Marco Rossi",    role: "Odontoiatra",           avatar: "MR" },
      { id: "ferrari",  name: "Dott.ssa Laura Ferrari", role: "Igienista Dentale",    avatar: "LF" }
    ],

    insurances: ["Previmedical", "Unisalute", "Metasalute"],

    texts: {
      mainButton: "Prenota Online",
      treatmentTitle: "Scegli il trattamento"
    },

    trigger: {
      text: "Prenota Ora",
      show: true,
      position: "bottom-right"
    }
  };
</script>

<!-- 2. Carica il widget -->
<script src="https://cdn.tuo-dominio.it/widget-v2.js"></script>
```

Il widget si auto-inizializza al caricamento del DOM. Comparirà un pulsante floating in basso a destra con il testo configurato.

---

## 3. Configurazione — `window.RB_WIDGET_CONFIG`

Il widget cerca `window.RB_WIDGET_CONFIG` all'avvio. Se non è presente, usa i valori di default descritti di seguito. La configurazione supporta una fusione parziale (shallow merge): puoi sovrascrivere solo i campi che ti interessano.

---

### 3.1 Campi radice

| Campo | Tipo | Default | Obbligatorio | Descrizione |
|-------|------|---------|:---:|-------------|
| `name` | `string` | `"Studio Dentistico"` | — | Nome dello studio, mostrato nell'header e nella schermata di conferma |
| `phone` | `string` | `"+39 000 000 0000"` | — | Numero di telefono usato nel pulsante "Contatta lo Studio" nella schermata di errore |
| `logoUrl` | `string` | — | — | URL del logo dello studio. **Attualmente non renderizzato** — riservato per sviluppi futuri |
| `dashboardUrl` | `string` | `"#"` | — | URL dell'area personale/dashboard del sito. Usato nel pulsante "Area Personale" nella schermata di successo |

---

### 3.2 `branding`

Controlla l'aspetto visivo del widget. I colori vengono iniettati come CSS custom properties nel Shadow DOM, senza toccare il documento host.

#### Shorthand (campi semplificati)

Coprono i casi comuni con un singolo valore per ruolo:

| Campo | Default | Mappa su | Ruolo visivo |
|-------|---------|----------|--------------|
| `primaryColor` | `"#0f172a"` | `--primary` | Sfondo header, pulsanti CTA principali |
| `secondaryColor` | `"#f1f5f9"` | `--secondary` | Sfondo card, elementi secondari |
| `accentColor` | `"#3b82f6"` | `--accent` | Badge, timer, stati selezionati |
| `backgroundColor` | `"#ffffff"` | `--background` | Sfondo corpo del widget |
| `foregroundColor` | `"#000000"` | `--foreground` | Testo principale |
| `fontFamily` | `"'Inter', sans-serif"` | `font-family` | Font globale (Google Fonts auto-caricato) |
| `borderRadius` | `"0.5rem"` | `--radius` | Border radius globale |
| `inputBorderRadius` | `"9999px"` | `--input-radius` | Border radius specifico degli input |

#### `cssVars` — controllo granulare completo

Per controllo preciso su ogni aspetto visivo, usa `cssVars` per sovrascrivere direttamente le CSS variables interne del widget. **I valori in `cssVars` hanno precedenza sugli shorthand.**

```js
branding: {
  fontFamily: "'Raleway', sans-serif",
  borderRadius: "0px",
  cssVars: {
    "--background":          "#3D3D3D",   // sfondo corpo widget
    "--foreground":          "#FFFFFF",   // testo principale
    "--primary":             "#F0E2CC",   // header background + pulsanti CTA
    "--primary-foreground":  "#2A1F14",   // testo su header e pulsanti CTA
    "--secondary":           "#4A4A4A",   // sfondo card e step content
    "--secondary-foreground":"#FFFFFF",   // testo su card
    "--muted":               "#505050",   // sfondo input, aree neutre
    "--muted-foreground":    "#AAAAAA",   // testo placeholder, label secondarie
    "--accent":              "#F0E2CC",   // elementi evidenziati, slot selezionato
    "--accent-foreground":   "#2A1F14",   // testo su accent
    "--border":              "#555555",   // bordi e divisori
    "--input":               "#4A4A4A",   // sfondo campi input
    "--ring":                "#F0E2CC",   // anello di focus
    "--destructive":         "#EF4444",   // stati di errore
  }
}
```

**Riferimento completo variabili:**

| Variabile | Ruolo visivo |
|-----------|-------------|
| `--background` | Sfondo principale del corpo widget |
| `--foreground` | Testo principale |
| `--primary` | Header, pulsanti CTA, chip attivi nel footer |
| `--primary-foreground` | Testo su `--primary` (titolo header, testo bottoni) |
| `--secondary` | Sfondo card trattamenti, step content |
| `--secondary-foreground` | Testo su `--secondary` |
| `--muted` | Input fields, aree neutre, skeleton loader |
| `--muted-foreground` | Placeholder, label, testo dimmed |
| `--accent` | Slot ora selezionato, elementi highlighted |
| `--accent-foreground` | Testo su `--accent` |
| `--border` | Bordi card, divisori, bordi input |
| `--input` | Background campi input |
| `--ring` | Anello focus accessibilità |
| `--destructive` | Messaggi errore, validazione fallita |
| `--radius` | Border radius globale |

---

### 3.3 `services`

Array di servizi/trattamenti offerti dalla clinica. Vengono mostrati nel primo step di selezione.

```ts
services: Array<{
  id: string;          // Identificatore univoco (usato internamente e nel footer summary)
  name: string;        // Nome mostrato nella card del trattamento
  description: string; // Descrizione breve mostrata sotto il nome
  duration: string;    // Durata testuale mostrata nel chip (es. "30 min")
}>
```

**Comportamento:**
- Se non configurato, il widget usa 2 servizi di default (Visita Generale e Igiene Orale).
- I servizi vengono mostrati come card selezionabili. Una volta selezionato, il `name` del servizio appare nel footer summary di navigazione.
- Il campo `id` viene usato per risolvere il nome del servizio nella schermata di conferma finale.

**Esempio:**
```js
services: [
  { id: "visita",   name: "VISITA GENERALE",   description: "Controllo completo della bocca",     duration: "30 min" },
  { id: "igiene",   name: "IGIENE ORALE",       description: "Pulizia professionale dei denti",    duration: "45 min" },
  { id: "implanto", name: "IMPLANTOLOGIA",      description: "Consulenza per impianti dentali",    duration: "60 min" },
  { id: "ortodon",  name: "ORTODONZIA",         description: "Apparecchi fissi e mobili",          duration: "30 min" }
]
```

---

### 3.4 `doctors`

Array dei medici dello studio. Vengono mostrati nello step di selezione dottore.

```ts
doctors: Array<{
  id: string;    // Identificatore univoco
  name: string;  // Nome completo con titolo (es. "Dott. Marco Rossi")
  role: string;  // Specializzazione mostrata sotto il nome
  avatar: string; // Iniziali per l'avatar circolare (es. "MR")
}>
```

**Comportamento:**
- Se non configurato, viene usato un dottore generico di default (`"Dottore dello Studio"`).
- **Auto-skip**: se l'array contiene **esattamente 1 dottore**, lo step di selezione dottore viene saltato automaticamente e il dottore viene pre-selezionato. Il flusso passa direttamente da datetime → contact.
- Il prefisso "Dott./Dott.ssa" viene rimosso automaticamente nella schermata di conferma finale per brevità.
- Il campo `avatar` è testuale (initials), non un URL immagine. Viene usato per generare un avatar circolare colorato.

**Esempio:**
```js
doctors: [
  { id: "bianchi", name: "Dott. Roberto Bianchi", role: "Chirurgo Orale",      avatar: "RB" },
  { id: "verdi",   name: "Dott.ssa Anna Verdi",   role: "Ortodontista",         avatar: "AV" },
  { id: "neri",    name: "Dott. Luca Neri",        role: "Igienista Dentale",   avatar: "LN" }
]
```

---

### 3.5 `insurances`

Array di nomi di compagnie assicurative accettate dalla clinica.

```ts
insurances?: string[]  // es. ["Previmedical", "Unisalute", "Metasalute"]
```

**Comportamento:**
- Se configurato (anche con array vuoto `[]`), un selector "Assicurazione" appare nel form contatti.
- Include sempre l'opzione default **"Privato (Nessuna)"** in cima alla lista.
- Il selector ha una barra di ricerca integrata per filtrare le opzioni.
- Se omesso (campo non presente nella config), il selector non viene mostrato.

---

### 3.6 `texts`

Override opzionali per i testi dell'interfaccia.

```ts
texts?: {
  mainButton?: string;        // Testo del pulsante nel pannello home (default: "Prenota Online")
  treatmentTitle?: string;    // Titolo dello step selezione servizio (default: "I nostri servizi")
  treatmentSubtitle?: string; // Sottotitolo dello step selezione servizio
  welcomeTitle?: string;      // Titolo del pannello home quando il widget è aperto
}
```

---

### 3.7 `trigger`

Configura il pulsante floating che apre il widget.

```ts
trigger?: {
  text?: string;                              // Testo del pulsante (default: "Prenota Ora")
  show?: boolean;                             // Mostra/nascondi il pulsante (default: true)
  position?: 'bottom-right' | 'bottom-left'; // Posizione sullo schermo (default: 'bottom-right')
}
```

**Note:**
- Se `show: false`, il pulsante floating non viene renderizzato. Il widget può comunque essere aperto programmaticamente via `window.rbOpenWidget()`.
- Il pulsante scompare con una transizione quando il widget è aperto.

---

### 3.8 `useMinimalForm`

```ts
useMinimalForm?: boolean  // default: false
```

Quando `true`, il form contatti mostra i campi senza label visibili, usando solo i placeholder. Adatto a design minimalisti o spazi ridotti.

---

## 4. Flusso utente (step-by-step)

```
[HOME]
  Pannello chiuso con pulsante floating "Prenota Ora"
  └─► click pulsante → apre il widget

[STEP 1 — TREATMENT]
  L'utente sceglie il trattamento tra le card disponibili
  └─► selezione → passa a DATETIME
      (il trattamento appare nel footer summary)

[STEP 2 — DATETIME]
  L'utente seleziona giorno e ora disponibili
  Calendario con 30 giorni (escluse domeniche), slot orari per giorno
  └─► selezione → il SLOT TIMER si avvia (3 minuti)
                → se config.doctors ha >1 dottore: passa a DOCTOR
                → se config.doctors ha 1 dottore: salta a CONTACT

[STEP 3 — DOCTOR]  ← saltato se singolo dottore
  L'utente seleziona il medico dalla lista
  └─► selezione → passa a CONTACT

[STEP 4 — CONTACT]
  L'utente compila il form:
  - Nome, Cognome (obbligatori)
  - Email (obbligatoria, validazione @)
  - Telefono (obbligatorio, 10 cifre, con country code selector)
  - Assicurazione (opzionale, se configurata)
  - Note aggiuntive (opzionale)
  - Consenso privacy (obbligatorio)
  └─► submit → passa a SUCCESS (o ERROR se backend segnala problema)

[STEP 5 — OUTCOME]
  Schermata di successo:
    - Riepilogo prenotazione (servizio, data/ora, medico)
    - Pulsante "Area Personale" (link a dashboardUrl)
    - Pulsante "Nuova visita" (torna a TREATMENT)

  Schermata di errore (slot scaduto / errore tecnico):
    - Messaggio di errore personalizzato
    - Pulsante "Riprova" (torna allo step configurato)
    - Pulsante "Contatta lo Studio" (link tel: a phone)
```

### Navigazione non-distruttiva (footer summary)

Dopo aver completato il STEP 1, un footer compare in basso con chip cliccabili per ogni selezione effettuata (trattamento, data/ora, dottore, paziente). Cliccando un chip, l'utente torna allo step corrispondente **senza perdere le selezioni degli step successivi**. Se però modifica la selezione di un dato step, i dati degli step dipendenti vengono resettati (es. cambiare data/ora azzera la selezione del dottore).

### Pulsante Back

Il pulsante `←` in alto a sinistra naviga allo step precedente. Anche questo è non-distruttivo: i dati dello step che si abbandona vengono mantenuti.

---

## 5. Slot Timer e Session Recovery

### Slot Timer

Quando l'utente seleziona data e ora, lo slot viene "riservato" per **3 minuti**. Un timer visivo appare in cima al widget durante gli step DOCTOR e CONTACT.

- Quando il timer scade, viene mostrato un banner "Slot scaduto". L'utente può comunque completare il form, ma la prenotazione potrebbe fallire lato server.
- A 60 secondi dalla scadenza, il timer diventa rosso (stato urgente) per avvertire l'utente.
- Il formato del timer è `M:SS` (es. `2:45`).

### Session Recovery (localStorage)

Lo stato della prenotazione viene salvato automaticamente in `localStorage` con una TTL di **30 minuti**. Se l'utente chiude la pagina e la riapre entro questo tempo:

- Il widget ripristina l'ultimo step raggiunto.
- Vengono recuperati: trattamento scelto, data/ora, dottore, dati del paziente già inseriti, e la scadenza dello slot residua.

**Chiavi localStorage usate:**

| Chiave | Contenuto | TTL |
|--------|-----------|-----|
| `booking_step` | Step corrente | 30 min |
| `booking_data` | Trattamento, data/ora, dottore | 30 min |
| `patient_data` | Dati form contatti | 30 min |
| `booking_timestamp` | Timestamp di inizio sessione | — |
| `slot_expires_at` | Timestamp scadenza slot (ms) | — |

Se la sessione è scaduta (>30 min), tutte le chiavi vengono cancellate e il widget reinizia dall'home.

---

## 6. API JavaScript esterna

Il widget espone due funzioni globali per controllarlo programmaticamente dall'esterno:

```js
// Apre il widget (equivalente a cliccare il pulsante floating)
window.rbOpenWidget();

// Chiude il widget
window.rbCloseWidget();
```

Queste funzioni sono disponibili dopo il caricamento dello script. Utili per integrare l'apertura del widget in pulsanti CTA esistenti nel sito:

```html
<button onclick="window.rbOpenWidget()">
  Prenota un appuntamento
</button>
```

Se vuoi nascondere il pulsante floating di default e usare solo il tuo CTA:

```js
window.RB_WIDGET_CONFIG = {
  trigger: { show: false },
  // ...resto config
};
```

---

## 7. Build e Deploy

### Prerequisiti

```bash
node >= 18
npm install
```

### Build

```bash
npm run build
```

Produce nella cartella `dist/`:
- `widget-v2.js` — bundle UMD self-contained (CSS incluso, da usare con tag `<script>`)
- `widget-v2.mjs` — bundle ES Module self-contained

Il CSS è iniettato automaticamente nel bundle JS — **non esiste un file `.css` separato da distribuire**.

### Struttura file prodotti

```
dist/
├── widget-v2.js      ← UMD bundle, include React + CSS
└── widget-v2.mjs     ← ES module bundle, include React + CSS
```

### Inclusione nel sito

Il widget è pubblicato su Vercel. **Non includere file locali** (`/dist/widget-v2.js`) — usa sempre l'URL pubblico qui sotto.

**HTML statico:**
```html
<body>
  <script>
    window.RB_WIDGET_CONFIG = { /* ... */ };
  </script>
  <script src="https://booking-crm-prototype.vercel.app/widget-v2.js"></script>
</body>
```

**Next.js (App Router):**
```tsx
import Script from "next/script";

// Nel layout o nella pagina:
<Script id="rb-widget-config" strategy="beforeInteractive">
  {`window.RB_WIDGET_CONFIG = { /* ... */ };`}
</Script>
<Script
  src="https://booking-crm-prototype.vercel.app/widget-v2.js"
  strategy="afterInteractive"
/>
```

> **Importante:** La config (`window.RB_WIDGET_CONFIG`) deve essere definita **prima** del tag `<script>` del widget (`strategy="beforeInteractive"`), altrimenti il widget si inizializza con i valori di default.

### Dev server

```bash
npm run dev
```

Avvia Vite in modalità development con HMR. Punta al file `src/main.tsx` (versione demo). Per sviluppare su `src-core/`, modifica temporaneamente `vite.config.ts` in modalità app (non library) o usa la versione demo come wrapper.

---

## 8. Personalizzazione Branding

Il widget è **completamente isolato** dal sito ospite. Tutto il CSS (Tailwind incluso) viene iniettato esclusivamente nel Shadow DOM — nessuna classe o variabile CSS del widget tocca il documento host. Non è necessario alcun prefisso o namespace.

Il branding viene applicato tramite **CSS custom properties** iniettate nel Shadow DOM. Le variabili disponibili sono:

| Variabile CSS | Corrisponde a | Default |
|---------------|---------------|---------|
| `--primary` | `branding.primaryColor` | — |
| `--secondary` | `branding.secondaryColor` | — |
| `--accent` | `branding.accentColor` | — |
| `--radius` | `branding.borderRadius` | — |
| `--background` | `branding.backgroundColor` | `#ffffff` |
| `--foreground` | `branding.foregroundColor` | `#000000` |

### Override avanzato

Poiché il widget usa Shadow DOM, gli stili del sito ospitante **non penetrano** all'interno. Per customizzazioni CSS avanzate al di là del branding config, occorre modificare il file `src-core/WidgetContainer.tsx` nella sezione `styleNode.textContent = ...`.

### Google Fonts

Il widget carica automaticamente il font configurato da Google Fonts se il nome corrisponde a un font disponibile. Il link viene iniettato nel `<head>` del documento. Assicurarsi che il nome del font sia esatto:

```js
branding: {
  fontFamily: "'Montserrat', sans-serif"  // Il widget cercherà "Montserrat" su Google Fonts
}
```

---

## 9. Limitazioni note e Pitfall

Questa sezione documenta le limitazioni attuali del widget, tutte relative al fatto che si tratta di un **prototipo frontend-only**.

---

### 🔴 CRITICI — da risolvere prima del deploy in produzione

#### 1. Nessun invio dati al backend

**File:** [src-core/App.tsx](src-core/App.tsx) — step "contact" → `setStep('success')`

Il form contatti non invia nulla. La prenotazione viene sempre mostrata come "confermata" a prescindere.

**Fix consigliato:** Aggiungere un campo `onBookingSubmit` in `WidgetConfig`:

```js
window.RB_WIDGET_CONFIG = {
  onBookingSubmit: async (bookingData) => {
    const res = await fetch('/api/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
    if (!res.ok) throw new Error('Booking failed');
  }
}
```

---

#### 3. Slot disponibili sono mock hardcoded

**File:** [src-core/components/DateTimeSelector.tsx](src-core/components/DateTimeSelector.tsx) — `MOCK_DAYS`

I giorni e gli orari disponibili sono generati con dati fittizi. Ogni slot appare come disponibile (tranne domeniche).

**Fix consigliato:** Aggiungere un campo `fetchAvailableSlots` in `WidgetConfig` per delegare il fetch al sito ospitante:

```js
window.RB_WIDGET_CONFIG = {
  fetchAvailableSlots: async (serviceId, doctorId) => {
    const res = await fetch(`/api/slots?service=${serviceId}`);
    return res.json(); // Array di { date, time, available }
  }
}
```

---

### 🟡 SIGNIFICATIVI — da tenere presenti

#### 4. Stili del sito ospitante clonati nel Shadow DOM

**File:** [src-core/WidgetContainer.tsx:35-38](src-core/WidgetContainer.tsx#L35)

Tutti i tag `<style>` del documento host vengono clonati nel Shadow DOM (con esclusione parziale di `body {}` e `html {}`). Questo può introdurre stili indesiderati dall'host nel widget.

**Workaround:** Se il widget appare visivamente anomalo in un sito specifico, commentare le righe 35-38 in `WidgetContainer.tsx` e affidarsi esclusivamente agli stili del bundle.

---

#### 5. Google Fonts iniettato nel documento host

**File:** [src-core/WidgetContainer.tsx:54-58](src-core/WidgetContainer.tsx#L54)

Il link al Google Font viene inserito in `document.head`, non nel Shadow DOM. Il font caricato diventa disponibile anche per il sito ospitante (leak intenzionale, ma potenzialmente indesiderato).

---

#### 6. `src-core/clinicConfig.ts` è un file orfano

**File:** [src-core/clinicConfig.ts](src-core/clinicConfig.ts)

Questo file è un residuo della versione `src/` e non è importato da nessun componente `src-core`. Non ha effetto sul widget. Può essere eliminato per evitare confusione.

---

#### 7. Campo `logoUrl` definito ma non usato

**File:** [src-core/WidgetContext.tsx](src-core/WidgetContext.tsx) — interface `WidgetConfig`

Il campo `logoUrl` è definito nell'interface di configurazione ma nessun componente lo renderizza. È riservato per sviluppi futuri (header del widget).

---

#### 8. Validazione telefono solo per numeri italiani

**File:** [src-core/components/ContactForm.tsx:64](src-core/components/ContactForm.tsx#L64)

```ts
phone.replace(/\D/g, '').length === 10
```

La validazione richiede esattamente 10 cifre. Non è compatibile con numeri internazionali (es. numeri UK a 11 cifre). Il country code selector è presente ma la validazione non tiene conto del prefisso selezionato.

---

### 🟢 COMPORTAMENTALI — da comunicare agli utenti finali

#### 9. Auto-skip del dottore con singolo medico

Se `config.doctors` contiene **un solo elemento**, lo step di selezione dottore viene saltato silenziosamente. Il flusso è: TREATMENT → DATETIME → CONTACT. Il medico viene pre-selezionato automaticamente e appare nel riepilogo.

#### 10. Session recovery automatica (30 min)

Se l'utente ha interagito con il widget negli ultimi 30 minuti e ricarica la pagina, il widget ripristina l'ultimo step. Questo può sorprendere l'utente finale o interferire con test manuali del widget.

**Per resettare manualmente:**
```js
// In console del browser, per cancellare la sessione
['booking_step','booking_data','patient_data','booking_timestamp','slot_expires_at']
  .forEach(k => localStorage.removeItem(k));
```

#### 11. Trigger speciali per test (solo in `src/`)

La versione demo (`src/App.tsx`) include numeri di telefono speciali per simulare scenari di errore nel form contatti:

| Numero | Comportamento simulato |
|--------|------------------------|
| `0000000000` | Slot non disponibile (se timer scaduto) |
| `1111111111` | Errore di connessione tecnico |
| `2222222222` | Prenotazione fallita generica |

Questi trigger esistono **solo in `src/`**, non in `src-core/`. Non sono presenti nel bundle di produzione.
