# Studio San Damiano — Piano Tecnico

> Procedere **uno step alla volta**, attendere conferma prima di proseguire.

## Regole mandatorie
- **Styling**: Tailwind CSS esclusivamente
- **Animazioni**: `framer-motion` per tutte le transizioni
- **Architettura**: separazione Client/Server; React Portals o Radix/Headless UI per modali
- **Workflow**: un step alla volta, mostrare risultato, attendere approvazione

---

## Step 1 — Modale Filosofia (Sheet Laterale)
Pulsante "Scopri di più" → pannello slide-in da destra.

1. Trovare il pulsante nella sezione "Un'esperienza unica", aggiungere trigger stato modale.
2. Creare `FilosofiaDrawer` con `framer-motion` (slide-in da destra).
3. Replicare layout/testi/font da `public/screenshots/filosofia-page.png`.
4. Backdrop scuro/sfocato; click → chiude il drawer.

## Step 2 — Refactoring CTA (Navbar & Burger)
Unico CTA: "Prenota ora".

1. Desktop: rimuovere CTA secondarie, "Prenota ora" all'estrema destra (bottone primario).
2. Mobile: ultima voce burger menu = "Prenota ora", stesso stile.
3. Verificare link → widget prenotazione / sezione schedule.

## Step 3 — Widget Chat Multicanale
Widget flottante (WhatsApp, SMS, Messenger).

1. Componente base `ChatWidget` chiuso (ref: `public/screenshots/widget-1.png`).
2. Animazione espansione → opzioni WhatsApp, SMS, Messenger.
3. Fisso basso-destra, z-index alto, distanziato dal bottone "scroll to top".

## Step 4 — Sezione "Chi Siamo" (Home Page)
Layout editoriale asimmetrico e premium.

1. Estrarre testi, foto team e citazioni da `public/screenshots/chi-siamo.-page.png`.
2. Griglia `grid-cols-12` asimmetrica in Home Page.
3. Animazioni fade-in-up on scroll per ogni elemento della griglia.
