"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const INTERVAL_MS = 10000;

const doctors = [
  {
    name: "Dott.ssa Silvia Bonfiglio",
    role: "Co-Founder",
    bio: "Silvia Bonfiglio, co-founder di Studio San Damiano, si avvale di un'esperienza decennale in clinic-management. Dopo una laurea in Fisioterapia, si avvicina alla Medicina Estetica e ne approfondisce i percorsi correlati alla sua formazione.\n\nA fine 2021 nasce il progetto di Studio San Damiano, dove la medicina estetica tende a costruire e ricostruire un'armonia e un equilibrio individuale.",
    photo: "/equipe-medica/dottssa-silvia-bonfiglio.jpg",
  },
  {
    name: "Dott. Mario V. Longo",
    role: "Medico Chirurgo · Founder di Studio San Damiano",
    bio: "Si occupa di Medicina Estetica e Chirurgia.\n\nDocente A.C. del Master Universitario di II Livello di Medicina Estetica del Consorzio Universitario Humanitas Alta Formazione.\n\nSocio SIME.",
    photo: "/equipe-medica/dott-mario-v-longo.jpg",
  },
  {
    name: "Dott.ssa Ozana G. Cristea",
    role: "Odontoiatra",
    bio: "",
    photo: "/equipe-medica/dottssa-ozana-g-cristea.webp",
  },
  {
    name: "Dott. Alessandro Sorrenti",
    role: "Odontoiatra",
    bio: "",
    photo: "/equipe-medica/dott-alessandro-sorrenti.jpg",
  },
  {
    name: "Dott. Gianluca Marzorati",
    role: "Odontoiatra",
    bio: "",
    photo: "/equipe-medica/dott-gianluca-marzorati.png",
  },
  {
    name: "Dott. Roberto Logozzo",
    role: "Odontoiatra · Specializzato in Ortodonzia e Gnatologia",
    bio: "Si occupa di problemi articolari, terapie fisse, mobili e allineatori trasparenti.",
    photo: "/equipe-medica/dott-roberto-logozzo.webp",
  },
  {
    name: "Dott.ssa Vittoria Risso",
    role: "Odontoiatra",
    bio: "",
    photo: "/equipe-medica/dottssa-vittoria-risso.webp",
  },
  {
    name: "Dott. Roberto Berlusconi",
    role: "Medico Specializzato in Anestesia e Rianimazione",
    bio: "Si occupa di Sedazione Cosciente durante gli interventi odontoiatrici.",
    photo: "/equipe-medica/dott-roberto-berlusconi.jpg",
  },
  {
    name: "Dott.ssa Iole Cucinotto",
    role: "Medico Chirurgo Oncologo · Medico Estetico · Socio Agorà",
    bio: "",
    photo: "/equipe-medica/dottssa-iole-cucinotto.jpg",
  },
  {
    name: "Dott.ssa Valeria Colombo",
    role: "Medico Chirurgo Maxillo Facciale · Medico Estetico",
    bio: "Esperta in Medicina Rigenerativa e Carbossiterapia.",
    photo: "/equipe-medica/dottssa-valeria-colombo.jpg",
  },
  {
    name: "Dott. Ruggero Tagliabue",
    role: "Medico Chirurgo",
    bio: "Master in Medicina Estetica.\n\nProf. A.C. Università di Milano Bicocca\nProf. A.C. Università del Sacro Cuore di Roma\n\nSocio SIME · Socio AITEB",
    photo: "/equipe-medica/dott-ruggero-tagliabue.jpg",
  },
];

export default function ChiSiamoSection() {
  const [current, setCurrent] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const lastWheelTime = useRef(0);
  const navigateRef = useRef<(dir: 1 | -1) => void>(() => {});

  const navigate = useCallback((dir: 1 | -1) => {
    setCurrent((prev) => (prev + dir + doctors.length) % doctors.length);
    setResetKey((k) => k + 1);
  }, []);

  // Mantieni il ref aggiornato all'ultima versione di navigate
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  // Auto-advance — riparte quando l'utente naviga manualmente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % doctors.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [resetKey]);

  // Wheel orizzontale → naviga (passive: false per poter chiamare preventDefault)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX > absY && absX > 20) {
        const now = Date.now();
        if (now - lastWheelTime.current < 800) return;
        lastWheelTime.current = now;
        e.preventDefault();
        navigateRef.current(e.deltaX > 0 ? 1 : -1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const doc = doctors[current];

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="relative bg-white py-20 md:py-32 overflow-hidden"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-[32px]">

        {/* Label */}
        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-grey/40 font-open-sans font-bold mb-12 md:mb-16">
          Chi siamo
        </p>

        {/* Slide content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center min-h-[420px] md:min-h-[500px]"
            >
              {/* Testo */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-raleway font-bold text-brand-grey uppercase tracking-[0.06em] mb-3 leading-snug">
                  {doc.name}
                </h2>
                {doc.role && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-grey/45 font-open-sans mb-6">
                    {doc.role}
                  </p>
                )}
                {doc.bio && doc.bio.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[11px] uppercase tracking-widest text-brand-grey/65 font-open-sans leading-loose mb-4"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Foto */}
              <div className="md:col-start-7 md:col-span-6">
                {doc.photo ? (
                  <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <Image
                      src={doc.photo}
                      alt={doc.name}
                      fill
                      className="object-cover grayscale"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[3/4] bg-[#F0EBE5] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <div className="relative w-3/4 h-3/4">
                        <Image
                          src="/san-damiano-assets/icona-o-footer-b.webp"
                          alt=""
                          fill
                          className="object-contain"
                          sizes="400px"
                        />
                      </div>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-brand-grey/25 font-open-sans relative z-10">
                      Foto placeholder
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* O fluttuante */}
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 right-[28%] w-36 h-36 md:w-56 md:h-56 pointer-events-none select-none opacity-[0.13] z-0"
          >
            <Image
              src="/san-damiano-assets/icona-o-footer-b.webp"
              alt=""
              fill
              className="object-contain"
              sizes="224px"
            />
          </motion.div>
        </div>

        {/* Controlli */}
        <div className="mt-12 md:mt-14 flex items-center gap-5">
          {/* Frecce */}
          <button
            onClick={() => navigate(-1)}
            aria-label="Precedente"
            className="w-10 h-10 border border-brand-grey/20 flex items-center justify-center hover:bg-brand-grey hover:border-brand-grey transition-colors group shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-brand-grey group-hover:text-white" />
          </button>
          <button
            onClick={() => navigate(1)}
            aria-label="Successivo"
            className="w-10 h-10 border border-brand-grey/20 flex items-center justify-center hover:bg-brand-grey hover:border-brand-grey transition-colors group shrink-0"
          >
            <ChevronRight className="w-4 h-4 text-brand-grey group-hover:text-white" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-px bg-brand-grey/10 relative overflow-hidden">
            <motion.div
              key={current}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
              className="absolute inset-0 bg-brand-grey/50 origin-left"
            />
          </div>

          {/* Counter */}
          <span className="text-[11px] font-open-sans text-brand-grey/35 tracking-widest shrink-0">
            {String(current + 1).padStart(2, "0")} / {String(doctors.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
}
