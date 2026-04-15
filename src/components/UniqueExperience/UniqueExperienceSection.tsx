"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function UniqueExperienceSection() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Sezione: Un'esperienza unica */}
      <section className="bg-white py-16 md:py-28">
        <div className="max-w-[1440px] mx-auto px-8 md:px-[32px] flex flex-col md:flex-row items-center gap-12 md:gap-0">

          {/* Sinistra: collage immagini */}
          <div className="w-full md:w-1/2 relative h-[360px] md:h-[520px] shrink-0">
            {/* Immagine 1: statua (sfondo, top-left) */}
            <div className="absolute top-0 left-0 w-[52%] h-[72%] overflow-hidden">
              <Image
                src="/san-damiano-assets/statua-home.webp"
                alt="Studio San Damiano"
                fill
                sizes="(max-width: 768px) 52vw, 280px"
                className="object-cover object-top"
              />
            </div>
            {/* Immagine 2: interno studio (foreground, bottom-right) */}
            <div className="absolute bottom-0 right-0 w-[65%] h-[72%] overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/san-damiano-assets/img-about-home-page-a-540x375.jpg"
                alt="Interno Studio San Damiano"
                fill
                sizes="(max-width: 768px) 65vw, 360px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Destra: testo + CTA */}
          <div className="w-full md:w-1/2 md:pl-20 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-grey/50 mb-5 font-open-sans font-bold">
              Un&rsquo;esperienza unica
            </span>
            <h2 className="text-4xl md:text-[52px] font-raleway font-bold text-brand-grey leading-[1.1] mb-6">
              Una perla nel centro storico di Milano.
            </h2>
            <p className="text-base text-brand-grey/60 font-open-sans font-light leading-relaxed mb-8 max-w-[400px]">
              Professionalità, tecnologia ed estrema attenzione sono i pilastri grazie ai quali diventa possibile vivere un&rsquo;esperienza unica.
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-fit bg-brand-grey text-white px-8 py-4 uppercase tracking-widest text-[10px] font-bold font-open-sans hover:bg-black transition-colors duration-300"
            >
              Scopri di più
            </button>
          </div>
        </div>
      </section>

      {/* FilosofiaDrawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />

            {/* Pannello */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 h-full w-full md:max-w-[660px] bg-white z-[101] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header fisso */}
              <div className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-b border-brand-grey/8 bg-white/95 backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-grey/40 font-open-sans font-bold">
                  Filosofia
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-brand-grey/5 rounded-full transition-colors"
                  aria-label="Chiudi"
                >
                  <X className="w-6 h-6 text-brand-grey" strokeWidth={1.5} />
                </button>
              </div>

              {/* Contenuto scrollabile */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="px-8 md:px-14 py-12">

                  {/* Titolo con O decorativa */}
                  <div className="relative mb-10">
                    <div className="absolute -top-6 -left-8 w-36 h-36 opacity-[0.04] pointer-events-none select-none">
                      <Image
                        src="/san-damiano-assets/icona-o-footer-b.webp"
                        alt=""
                        fill
                        className="object-contain"
                        sizes="144px"
                      />
                    </div>
                    <h2 className="text-4xl md:text-[50px] font-raleway font-bold text-brand-grey leading-[1.1] relative z-10">
                      La O come simbolo<br />d&rsquo;unione.
                    </h2>
                  </div>

                  {/* Paragrafi filosofia */}
                  <div className="space-y-5 text-brand-grey/65 font-open-sans font-light leading-relaxed text-[15px] mb-12">
                    <p>
                      Studio San Damiano nasce da una visione: quella di un luogo dove la medicina si fa esperienza sensoriale, dove l'eccellenza clinica si fonde con un'estetica curata in ogni dettaglio.
                    </p>
                    <p>
                      La &ldquo;O&rdquo; — simbolo del nostro studio — rappresenta l&rsquo;unione tra salute e bellezza, tra scienza e arte, tra il paziente e il professionista che lo accompagna nel proprio percorso di cura.
                    </p>
                    <p>
                      Situati nel cuore storico di Milano, offriamo trattamenti all&rsquo;avanguardia in un ambiente che invita alla calma e alla fiducia. Ogni visita è pensata per essere un momento di cura totale: della persona, non solo del paziente.
                    </p>
                  </div>

                  {/* Immagine principale */}
                  <div className="relative w-full h-[260px] md:h-[360px] mb-12 overflow-hidden">
                    <Image
                      src="/san-damiano-assets/img-about-home-page-a-540x375.jpg"
                      alt="Interno Studio San Damiano"
                      fill
                      sizes="(max-width: 768px) 100vw, 660px"
                      className="object-cover"
                    />
                  </div>

                  {/* Secondo paragrafo */}
                  <div className="space-y-5 text-brand-grey/65 font-open-sans font-light leading-relaxed text-[15px] mb-12">
                    <p>
                      Il nostro team multidisciplinare di medici ed esperti lavora in sinergia per garantire risultati naturali e duraturi, con la massima attenzione alla sicurezza e al benessere di ogni persona che ci affida la propria cura.
                    </p>
                    <p>
                      Perché per noi la bellezza non è un ideale irraggiungibile, ma l&rsquo;espressione autentica di chi sei.
                    </p>
                  </div>

                  {/* Placeholder secondo immagine */}
                  <div className="w-full h-[200px] bg-[#F6E4D8] mb-12 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-brand-grey/30 font-open-sans">
                      Immagine Studio
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="border-t border-brand-grey/10 pt-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-grey/40 mb-5 font-open-sans font-bold">
                      Inizia il tuo percorso
                    </p>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="w-full md:w-auto bg-brand-grey text-white px-10 py-4 uppercase tracking-widest text-[10px] font-bold font-open-sans hover:bg-black transition-colors duration-300"
                    >
                      Prenota una consultazione
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
