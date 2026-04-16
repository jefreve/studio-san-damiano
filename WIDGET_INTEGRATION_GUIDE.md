# Guida Integrazione Widget di Prenotazione (Agnostic v2)

Il widget che stiamo integrando è una versione agnostica e isolata tramite Shadow DOM. Non deve interferire con gli stili globali del sito.

## 1. Asset del Widget
I file sono già presenti nella cartella `/public/dist/`:
- `widget-v2.js`: Il bundle logico del widget.
- `booking-crm-prototype.css`: Lo stile (gestito internamente dallo script).

## 2. Configurazione (`layout.tsx`)
Il widget richiede un oggetto di configurazione globale `window.RB_WIDGET_CONFIG`. 
**IMPORTANTE**: Non caricare il CSS con un tag `<link>` nel `<head>`. Il widget lo caricherà da solo per evitare di rompere il sito host.

### Schema Configurazione da implementare:
```javascript
window.RB_WIDGET_CONFIG = {
  name: "Studio San Damiano",
  phone: "02 8342 1276",
  branding: {
    primaryColor: "#5a5a5a", // Grigio scuro del brand
    accentColor: "#f5e4d7",  // Beige/Pesca del brand
    fontFamily: "Raleway, sans-serif", // Usare il nome diretto del font
    borderRadius: "2px"
  },
  trigger: { show: false }, // Nascondiamo il trigger flottante per usare i bottoni della Navbar
  services: [
    // Estrarre qui i servizi reali dai componenti Trattamenti/Dictionary
  ],
  doctors: [
    // Estrarre qui i nomi dei medici presenti nel sito
  ],
  texts: {
    welcomeTitle: "Prenota il tuo appuntamento",
    welcomeSubtitle: "Scegli il servizio e l'orario più comodo per te"
  }
};
```

## 3. Integrazione Tecnica
1. **Script**: Inserire `<script src="/dist/widget-v2.js" defer></script>` prima della chiusura del `body`.
2. **Container**: Inserire `<div id="rb-booking-widget"></div>` in fondo al layout.
3. **Trigger Esterni**: Il widget espone la funzione `window.rbOpenWidget()`.
   - Localizza i bottoni "Prenota Ora" (Desktop e Mobile) nella `Navbar.tsx`.
   - Cambia la loro azione di click: `onClick={() => window.rbOpenWidget()}`.

## 4. Troubleshooting
- Se il sito host si vede "rotto" (font o margini cambiati), rimuovi ogni riferimento a `booking-crm-prototype.css` o `style.css` dal `<head>`. Il widget deve caricarlo privatamente.
- Assicurati che la configurazione sia caricata **prima** del caricamento dello script del widget.
