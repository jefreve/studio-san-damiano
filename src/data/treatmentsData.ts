export interface FAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  tags?: string[]; // Per il filtraggio (inestetismi)
  faqs?: FAQ[];
  contactInfo?: {
    phone: string;
    email: string;
  };
}

export interface CategoryData {
  id: string;
  title: string;
  treatments: Treatment[];
}

export const treatmentsData: Record<string, CategoryData> = {
  "medicina-estetica": {
    id: "medicina-estetica",
    title: "Medicina estetica",
    treatments: [
      {
        id: "tossina-botulinica",
        title: "Tossina botulinica",
        shortDescription: "Trattamento per distendere le rughe d'espressione.",
        fullDescription: "La tossina botulinica è un trattamento efficace per ridurre temporaneamente le rughe d'espressione, donando al viso un aspetto più riposato e gioviale.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-botox-b.jpg",
        tags: ["rughe", "labbra", "iperidrosi"]
      },
      {
        id: "filler-viso",
        title: "Filler viso, zigomi e labbra",
        shortDescription: "Volumizzazione e ridefinizione dei tratti del volto.",
        fullDescription: "Infiltrazioni di acido ialuronico per ripristinare i volumi persi, definire gli zigomi o armonizzare il contorno delle labbra.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-filler-a.jpg",
        tags: ["acne-e-cicatrici", "pelle-spenta-e-secca", "rughe", "lassita-cutanea", "labbra"]
      },
      {
        id: "biorivitalizzazione",
        title: "Biorivitalizzazione",
        shortDescription: "Idratazione profonda e stimolazione del collagene.",
        fullDescription: "Trattamento biorivitalizzante che apporta nutrienti essenziali alla pelle, migliorandone elasticità, tono e luminosità.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-Biorivitalizzazioni-b.jpg",
        tags: ["acne-e-cicatrici", "pelle-spenta-e-secca", "rughe", "macchie-cutanee"]
      },
      {
        id: "iv-therapy",
        title: "I.V. Therapy",
        shortDescription: "Infusioni endovenose di vitamine e minerali.",
        fullDescription: "Supporto nutrizionale mirato tramite flebo di vitamine, minerali e antiossidanti per il benessere generale e della pelle.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-IV-therapy.jpg"
      },
      {
        id: "angoli-mandibolari",
        title: "Definizione angoli mandibolari",
        shortDescription: "Contouring del profilo mandibolare.",
        fullDescription: "Trattamento mirato a definire e scolpire il profilo della mandibola per un volto più strutturato e armonioso.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-Definizione-angoli-mandibolari-b.jpg",
        tags: ["lassita-cutanea"]
      },
      {
        id: "mesoterapia",
        title: "Mesoterapia",
        shortDescription: "Trattamento iniettivo per cellulite e adiposità.",
        fullDescription: "Micro-iniezioni di farmaci specifici per contrastare la ritenzione idrica, la cellulite e i piccoli acquuli adiposi.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-mesoterapia-a.jpg",
        tags: ["pelle-spenta-e-secca", "smagliature", "cellulite"]
      },
      {
        id: "microneedling",
        title: "Microneedling",
        shortDescription: "Rigenerazione cutanea tramite micro-perforazioni.",
        fullDescription: "Tecnica che stimola la produzione naturale di elastina e collagene per trattare cicatrici, rughe e imperfezioni della pelle.",
        image: "/categories/medicina-estetica/img-hero-trattamenti-medicina-estetica-Microlifting-a.jpg",
        tags: ["acne-e-cicatrici", "pelle-spenta-e-secca", "rughe", "macchie-cutanee"]
      },
      {
        id: "carbossiterapia",
        title: "Carbossiterapia",
        shortDescription: "Ossigenazione dei tessuti tramite anidride carbonica.",
        fullDescription: "Uso terapeutico dell'anidride carbonica per migliorare la microcircolazione, l'elasticità cutanea e contrastare la cellulite.",
        image: "/categories/medicina-estetica/img-hero-trattamenti-medicina-estetica-Carbossiterapia-a.jpg",
        tags: ["acne-e-cicatrici", "pelle-spenta-e-secca", "lassita-cutanea", "smagliature", "cellulite"]
      },
      {
        id: "peeling",
        title: "Peeling",
        shortDescription: "Esfoliazione chimica per il rinnovo cellulare.",
        fullDescription: "Trattamento esfoliante professionale per rimuovere le cellule morte, trattare macchie e uniformare la texture cutanea.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-Peeling-b.jpg",
        tags: ["acne-e-cicatrici", "pelle-spenta-e-secca", "macchie-cutanee"]
      },
      {
        id: "rinofiller",
        title: "Rinofiller",
        shortDescription: "Correzione non chirurgica del profilo nasale.",
        fullDescription: "Uso di filler per armonizzare il profilo del naso correggendo piccole gobbe o irregolarità senza bisturi.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-rinofiller-a.jpg"
      },
      {
        id: "polinucleotidi-capelli",
        title: "Polinucleotidi capelli",
        shortDescription: "Ringiovanimento e rinforzo del cuoio capelluto.",
        fullDescription: "Terapia rigenerativa a base di polinucleotidi per stimolare la crescita dei capelli e migliorarne la densità.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-Polinucleotidi-capelli-a.jpg"
      },
      {
        id: "vitamine-viso",
        title: "Vitamine viso",
        shortDescription: "Cocktail vitaminici per la radiosità cutanea.",
        fullDescription: "Iniezioni superficiali di vitamine e antiossidanti per combattere lo stress ossidativo e donare luce immediata al viso.",
        image: "/categories/medicina-estetica/img-banner-trattamenti-medicina-estetica-vitamine-viso-b.jpg",
        tags: ["pelle-spenta-e-secca", "rughe", "lassita-cutanea"]
      }
    ]
  },
  "odontoiatria": {
    id: "odontoiatria",
    title: "Odontoiatria",
    treatments: [
      {
        id: "conservativa",
        title: "Conservativa",
        shortDescription: "Cura delle carie e restauro dei denti.",
        fullDescription: "Trattamenti mirati a eliminare le carie e a restaurare la struttura dei denti tramite otturazioni e ricostruzioni estetiche.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-conservativa.jpg"
      },
      {
        id: "endodonzia",
        title: "Endodonzia",
        shortDescription: "Cura dei canali radicolari.",
        fullDescription: "Trattamento dello spazio interno al dente (polpa dentale) per salvare elementi seriamente compromessi da infezioni o traumi.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Endodonzia.jpg"
      },
      {
        id: "protesi-fissa",
        title: "Protesi fissa",
        shortDescription: "Corone e ponti per il ripristino dentale.",
        fullDescription: "Soluzioni definitive per il ripristino di denti mancanti o danneggiati tramite corone, ponti e faccette estetiche.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Protesi-Fissa.jpg"
      },
      {
        id: "ortodonzia",
        title: "Ortodonzia",
        shortDescription: "Allineamento dei denti e correzione morsi.",
        fullDescription: "Trattamenti per correggere la posizione dei denti e le malocclusioni, sia per bambini che per adulti, anche con tecniche invisibili.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Ortodonzia.jpg"
      },
      {
        id: "implantologia",
        title: "Implantologia",
        shortDescription: "Sostituzione dei denti con impianti in titanio.",
        fullDescription: "Inserimento di radici artificiali in titanio per sostituire denti mancanti in modo stabile, sicuro ed estetico.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Implantologia.jpg"
      },
      {
        id: "sbiancamento",
        title: "Sbiancamento",
        shortDescription: "Trattamento estetico per un sorriso più bianco.",
        fullDescription: "Procedure professionali per eliminare macchie e discromie, restituendo al sorriso la sua naturale luminosità.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Sbiancamento.jpg"
      },
      {
        id: "chirurgia",
        title: "Chirurgia",
        shortDescription: "Interventi chirurgici del cavo orale.",
        fullDescription: "Interventi di estrazione, chirurgia rigenerativa e piccoli interventi ambulatoriali gestiti con la massima cura e precisione.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Chirurgia.jpg"
      },
      {
        id: "parodontologia",
        title: "Parodontologia",
        shortDescription: "Cura delle gengive e dei tessuti di sostegno.",
        fullDescription: "Prevenzione e cura delle patologie che colpiscono i tessuti di supporto del dente, come gengivite e parodontite.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Parodontologia.jpg"
      },
      {
        id: "ablazione-tartaro",
        title: "Ablazione tartaro",
        shortDescription: "Igiene orale professionale profonda.",
        fullDescription: "Rimozione professionale di placca e tartaro per mantenere denti e gengive sani e prevenire patologie future.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Ablazione-tartaro.jpg"
      },
      {
        id: "protesi-mobile",
        title: "Protesi mobile",
        shortDescription: "Soluzioni mobili per edentulia parziale o totale.",
        fullDescription: "Protesi rimovibili progettate per garantire comfort, funzionalità e un aspetto naturale in casi di perdita estesa di denti.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Protesi-Mobile.jpg"
      },
      {
        id: "sedazione-cosciente",
        title: "Sedazione cosciente",
        shortDescription: "Trattamenti odontoiatrici senza ansia né dolore.",
        fullDescription: "Tecnica che permette al paziente di affrontare le cure in totale relax, pur rimanendo vigile e collaborativo.",
        image: "/categories/odontoiatria/img-banner-trattamenti-odontoiatria-Sedazione-Cosciente.jpg"
      }
    ]
  },
  "implantologia": {
    id: "implantologia",
    title: "Implantologia \"senza osso\"",
    treatments: [
      {
        id: "eaglegrid-milano",
        title: "EAGLEGRID® Milano",
        shortDescription: "La soluzione definitiva per chi ha poco osso residuo.",
        fullDescription: "EAGLEGRID® è un nuovo tipo di implantologia indicato per chi non può eseguire quella tradizionale (endossea) a causa della mancanza di osso residuo. La tecnica si basa sul posizionamento di una griglia in titanio realizzata su misura, che consente di avere denti fissi già alla fine dell’intervento.",
        image: "/categories/implantologia-senza-osso/Home-English-Eagle-Grid-Polska-Implanty-Podokostnowe.jpg",
        contactInfo: {
          phone: "02 8342 1276",
          email: "info@studiosandamiano.it"
        },
        logo: "/categories/implantologia-senza-osso/logo-studio-san-damiano_eaglegrid-milano-versione-a-1-1536x1086.png",
        faqs: [
          {
            question: "Tutti possono utilizzare gli impianti dentali EAGLEGRID?",
            answer: "Placeholder per la risposta..."
          },
          {
            question: "Gli impianti dentali EAGLEGRID hanno un costo paragonabile a una implantologia tradizionale?",
            answer: "Placeholder per la risposta..."
          },
          {
            question: "Ho una dentiera rimovibile, con gli impianti dentali EAGLEGRID posso avere i denti fissi?",
            answer: "Placeholder per la risposta..."
          },
          {
            question: "Dopo quanto tempo, con EAGLEGRID, ho i denti fissi?",
            answer: "Placeholder per la risposta..."
          },
          {
            question: "Ho avuto dei fallimenti coi precedenti impianti dentali, posso usare EAGLEGRID?",
            answer: "Placeholder per la risposta..."
          },
          {
            question: "Come si esegue l'intervento di implantologia?",
            answer: "Placeholder per la risposta..."
          },
          {
            question: "Ho il diabete, posso usare EAGLEGRID?",
            answer: "Placeholder per la risposta..."
          }
        ]
      }
    ]
  },
  "medicina-rigenerativa": {
    id: "medicina-rigenerativa",
    title: "Medicina Rigenerativa",
    treatments: [
      {
        id: "per-la-pelle",
        title: "Per la pelle",
        shortDescription: "Rigenerazione cutanea profonda e naturale.",
        fullDescription: "Trattamenti di medicina rigenerativa mirati a migliorare la qualità della pelle, stimolando i naturali processi di riparazione e ringiovanimento cellulare.",
        image: "/categories/medicina-rigenerativa/per-la-pelle.jpg"
      },
      {
        id: "per-i-capelli",
        title: "Per i capelli",
        shortDescription: "Terapie rigenerative per la vitalità dei capelli.",
        fullDescription: "Soluzioni innovative per contrastare il diradamento e migliorare la salute del cuoio capelluto attraverso tecniche rigenerative avanzate.",
        image: "/categories/medicina-rigenerativa/per-i-capelli.jpg"
      }
    ]
  }
};
