"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#5A5A5A] text-white min-h-[750px] md:h-[600px] overflow-hidden font-open-sans">
      {/* Container con margini laterali: aumentati a 140px su desktop e 40px su mobile */}
      <div className="w-full h-full px-10 md:px-[140px] pt-10 pb-16 font-open-sans">
        {/* Griglia principale: 1 colonna mobile, 2 colonne desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 h-full font-open-sans">
          
          {/* PARTE SINISTRA: Divisa in 4 righe */}
          <div className="flex flex-col gap-0 h-full font-open-sans">
            {/* Riga 1: Logo */}
            <div className="relative w-[300px] h-[148px]">
              <Image
                src="/logo-footer.png"
                alt="Studio San Damiano Logo"
                fill
                sizes="300px"
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Riga 2: Headers Bold (17px) */}
            <div className="font-open-sans md:-mt-4">
              <p className="text-[17px] font-bold font-open-sans tracking-normal leading-tight uppercase">
                MVL MEDICAL GROUP SRL
              </p>
              <p className="text-[17px] font-bold font-open-sans tracking-normal leading-tight uppercase">
                MEDICINA ESTETICA |
              </p>
              <p className="text-[17px] font-bold font-open-sans tracking-normal leading-tight uppercase">
                ODONTOIATRIA
              </p>
            </div>

            {/* Riga 3: Info & Contatti (17px) */}
            <div className="space-y-1 text-[17px] font-open-sans tracking-[0.08em] leading-tight uppercase mt-8 md:mt-6">
              <p>Via San Damiano 2</p>
              <p>20122 Milano</p>
              <p>Tel. 02 8342 1276</p>
              <p>info@studiosandamiano.it</p>
              <p>P.IVA 11497140969</p>
            </div>

            {/* Riga 4: Direttori (14px) & Note Legali (11px) */}
            <div className="space-y-6 md:space-y-4 font-open-sans mt-10 md:mt-8">
              <div className="text-[14px] leading-[1.6] font-open-sans max-w-xl tracking-wider">
                <p>
                  Direttore Sanitario Dott. Mario Valentino Longo - Iscritto all&apos;Ordine dei Medici Chirurghi di Milano n.32047 e 
                  Responsabile Odontoiatria Dott.ssa Ozana G. Cristea - Iscritta all&apos;Ordine dei Medici Odontoiatri di Milano n.06059
                </p>
              </div>
              <div className="text-[11px] leading-[1.8] font-open-sans max-w-2xl tracking-wide">
                <p>
                  Il messaggio informativo nel presente sito è diramato nel rispetto della linea guida inerente l&apos;applicazione 
                  degli artt. 55-56-57 del Codice di Deontologia Medica - Comunicato all&apos;Ordine Provinciale dei Medici 
                  Chirurghi e degli Odontoiatri di Milano in data 26 maggio 2022
                </p>
              </div>
            </div>
          </div>

          {/* PARTE DESTRA / BASSO: Per la O */}
          <div className="flex flex-col justify-end items-end h-full mt-4 md:mt-0">
            {/* La O - Grande su mobile */}
            <div className="relative w-full aspect-[165/73] md:w-[650px] md:h-[288px] animate-float-smooth">
              <Image
                src="/san-damiano-assets/icona-o-footer-b.webp"
                alt="San Damiano Icon"
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-contain object-right-bottom"
              />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
