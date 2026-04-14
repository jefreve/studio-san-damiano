export interface Review {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  platform: "google";
}

export const reviewsData: Review[] = [
  {
    id: "review-1",
    author: "Claudio Giordano",
    role: "12 recensioni",
    avatar: "/reviews/claudio-giordano-profile-pic.png",
    rating: 5,
    date: "un anno fa",
    text: "Ho avuto il piacere di rivolgermi allo studio San Damiano per un trattamento di medicina estetica e l’esperienza è stata semplicemente impeccabile. Lo studio è elegante, moderno e accogliente; poi il Dott. Longo ed il suo staff al di là della grande professionalità e simpatia dimostrano una attenzione ai dettagli innata e che sicuramente non è da tutti.\nI risultati sono stati eccellenti e in linea con le mie aspettative.",
    platform: "google",
  },
  {
    id: "review-2",
    author: "Giulia Mastracci",
    role: "11 recensioni",
    avatar: "/reviews/giulia-mastracci-profile-pic.png",
    rating: 5,
    date: "un anno fa",
    text: "Mi sono rivolta allo Studio San Damiano per il trattamento DrSmile e mi sono trovata benissimo. Équipe professionale e preparata! Un grazie in particolare a Silvia che è sempre gentilissima e disponibile 💫 …",
    platform: "google",
  },
  {
    id: "review-3",
    author: "Diego",
    role: "1 recensione",
    avatar: "/reviews/diego-profile-pic.png",
    rating: 5,
    date: "3 mesi fa",
    text: "Ho scelto lo Studio Odontoiatrico San Damiano per un'igiene dentale e l’esperienza è stata eccellente. Fin dall’accoglienza, il personale si è dimostrato cortese e professionale, mentre gli ambienti sono moderni e curati nei minimi dettagli.\n\nIl dottore è stato preciso e delicato, spiegandomi ogni fase del trattamento e dandomi utili consigli per la cura quotidiana dei denti. Ho apprezzato molto la loro attenzione al paziente, ed i miei Denti sono tornati perfettamente puliti e una piacevole sensazione di freschezza.",
    platform: "google",
  },
  {
    id: "review-4",
    author: "Matteo Giuseppe Brundu",
    role: "Local Guide · 11 recensioni",
    avatar: "/reviews/matteo-giuseppe-brundu-profile-pic.png",
    rating: 5,
    date: "un anno fa",
    text: "Ottimo studio in centro a Milano, ho trovato la dottoressa molto competente, precisa e attenta ai dettagli, non mancano gentilezza e comprensione! Eseguite pulizia, ricostruzione e allineamento senza nessun problema.",
    platform: "google",
  },
  {
    id: "review-5",
    author: "Francesca Giannopulo",
    role: "1 recensione",
    avatar: "", // No profile pic
    rating: 5,
    date: "un mese fa",
    text: "Fantastici! Alessandro, Silvia e tutto il team, sempre attentissimi al paziente, meticolosi nella cura e soluzione della problematica, adottando un approccio personalizzato a seconda del paziente. Gentilezza estrema e massima disponibilità.",
    platform: "google",
  },
];
