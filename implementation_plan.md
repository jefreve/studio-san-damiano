# Piano di Implementazione: Replicazione Sito Medical/Luxury "San Damiano"

Questo documento delinea la strategia per la costruzione di un sito web bilingue ad alta fedeltà visiva utilizzando Next.js (App Router), TypeScript e Tailwind CSS.

## 1. Setup Ambientale e Configurazione

### Configurazione Framework
- **Project Init**: `npx create-next-app@latest . --typescript --tailwind --eslint`
- **Struttura Directory**: Utilizzo di `src/app`, `src/components`, `src/constants`, `src/dictionaries` (per i18n).

### Design System (Tailwind)
- **Palette Colori**: Estensione del file `tailwind.config.ts`:
  - `brand-light`: `#F9EFE9` (Sfondo principale)
  - `brand-dark`: `#3A3A3A` (Testi, CTA, Card)
  - `brand-white`: `#FFFFFF`
- **Tipografia**: Configurazione in `src/app/layout.tsx` tramite `next/font/google`:
  - `Raleway`: (Weight 300, 400, 500, 600) per titoli e accenti.
  - `Open Sans`: (Weight 300, 400, 600) per il corpo del testo.

### Strategia Internazionalizzazione (i18n)
- **Routing**: Struttura a cartelle dinamiche `[lang]/page.tsx`.
- **Dictionari**: Cartella `src/dictionaries/` con file `it.json` e `en.json`.
- **Middleware**: Implementazione di un middleware per il redirect automatico basato sulla lingua del browser o sul prefisso URL.

---

## 2. Architettura dei Componenti

### Componenti Globali (Layout)
- **`LangSwitcher`**: Toggle minimale (IT | EN) posizionato nella Navbar.
- **`Navbar`**: Layout "Sticky" con logo San Damiano (sinistra) e menu navigazione (centro/destra) con link eleganti.
- **`Footer`**: Sezione informativa multilingue con dettagli di contatto, sede e navigazione rapida.

### Componenti Atomici (Home Page)
- **`ServiceCard`**: Card scura (`bg-brand-dark`) con testo a sinistra e slot per `next/image` in formato circolare sulla destra.
- **`AsymmetricGrid`**: Layout personalizzato per la sezione "Chi Siamo".
- **`ContactForm`**: Form con input gestiti (Name, Email, Phone, Message) e validazione base.
- **`InstaCard`**: Singolo post della griglia social con effetto hover.

---

## 3. Strategia di Layout e Fedeltà al Design

### Sezione Servizi (Grid Strategy)
- **Proprietà**: Mappatura dalla costante `services` (che conterrà chiavi bilingue).
- **Layout**: `grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12`.
- **Visual**: Le immagini dei servizi saranno cerchi perfetti (`rounded-full`) parzialmente sovrapposti al bordo destro del contenitore card, replicando l'effetto "luxury breaking" dello screenshot.

### Sezione "Chi Siamo" (Asimmetria)
- **Grid System**: Utilizzo di una griglia a 12 colonne con distanze calcolate per le immagini sovrapposte.
- **Layering**:
  1. Base: Immagine statua (sinistra, `z-0`).
  2. Overlay 1: Immagine locale interno (centro-basso, `z-10`, con offset negativo).
  3. Overlay 2: Testo informativo (destra, centrato verticalmente).

### Sezione Stampa (Press Section)
- **Parla di noi**: Griglia di loghi in tonalità di grigio/nero con opacità controllata per un look minimalista.

---

## 4. Servizi e Dati (Costanti)

Verrà creato un file `src/constants/services.ts` con la seguente struttura:

```typescript
export const services = [
  {
    id: "medicina-estetica",
    title: { it: "Medicina estetica", en: "Aesthetic Medicine" },
    description: { it: "...", en: "..." },
    image: "/placeholders/service1.jpg"
  },
  // ... altri servizi
];
```

---

## 5. Fasi di Sviluppo

1.  **Fase 1 (Setup)**: Configurazione Tailwind, Font e middleware i18n.
2.  **Fase 2 (Layout)**: Navbar e Footer (struttura base).
3.  **Fase 3 (Sezione Servizi)**: Implementazione Grid e `ServiceCard`.
4.  **Fase 4 (Sezione Asimmetrica)**: Costruzione del layout "Chi Siamo".
5.  **Fase 5 (Form & Social)**: Implementazione Contact Form e Instagram Grid.
6.  **Fase 6 (Rifinitura)**: Ottimizzazione SEO-friendly e responsive mobile.
