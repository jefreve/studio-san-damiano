"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Doctor = { name: string; role: string; bio: string; photo: string };

// 6 slides: 5 pairs + 1 singleton
const slides: Doctor[][] = [
  [
    { name: "Dott.ssa Silvia Bonfiglio", role: "Co-Founder", bio: "Co-founder di Studio San Damiano, si avvale di un'esperienza decennale in clinic-management. Dopo una laurea in Fisioterapia, si avvicina alla Medicina Estetica approfondendone i percorsi.\n\nA fine 2021 nasce il progetto di Studio San Damiano, dove la medicina estetica tende a costruire e ricostruire un'armonia e un equilibrio individuale.", photo: "/equipe-medica/dottssa-silvia-bonfiglio.jpg" },
    { name: "Dott. Mario V. Longo", role: "Medico Chirurgo · Founder", bio: "Si occupa di Medicina Estetica e Chirurgia. Docente A.C. del Master Universitario di II Livello di Medicina Estetica del Consorzio Universitario Humanitas.\n\nSocio SIME.", photo: "/equipe-medica/dott-mario-v-longo.jpg" },
  ],
  [
    { name: "Dott.ssa Ozana G. Cristea", role: "Odontoiatra", bio: "", photo: "/equipe-medica/dottssa-ozana-g-cristea.webp" },
    { name: "Dott. Alessandro Sorrenti", role: "Odontoiatra", bio: "", photo: "/equipe-medica/dott-alessandro-sorrenti.jpg" },
  ],
  [
    { name: "Dott. Gianluca Marzorati", role: "Odontoiatra", bio: "", photo: "/equipe-medica/dott-gianluca-marzorati.png" },
    { name: "Dott. Roberto Logozzo", role: "Odontoiatra · Ortodonzia e Gnatologia", bio: "Si occupa di problemi articolari, terapie fisse, mobili e allineatori trasparenti.", photo: "/equipe-medica/dott-roberto-logozzo.webp" },
  ],
  [
    { name: "Dott.ssa Vittoria Risso", role: "Odontoiatra", bio: "", photo: "/equipe-medica/dottssa-vittoria-risso.webp" },
    { name: "Dott. Roberto Berlusconi", role: "Anestesia e Rianimazione", bio: "Si occupa di Sedazione Cosciente durante gli interventi odontoiatrici.", photo: "/equipe-medica/dott-roberto-berlusconi.jpg" },
  ],
  [
    { name: "Dott.ssa Iole Cucinotto", role: "Medico Chirurgo Oncologo · Medico Estetico · Socio Agorà", bio: "", photo: "/equipe-medica/dottssa-iole-cucinotto.jpg" },
    { name: "Dott.ssa Valeria Colombo", role: "Medico Chirurgo Maxillo Facciale · Medico Estetico", bio: "Esperta in Medicina Rigenerativa e Carbossiterapia.", photo: "/equipe-medica/dottssa-valeria-colombo.jpg" },
  ],
  [
    { name: "Dott. Ruggero Tagliabue", role: "Medico Chirurgo", bio: "Master in Medicina Estetica. Prof. A.C. Università di Milano Bicocca e Università del Sacro Cuore di Roma.\n\nSocio SIME · Socio AITEB.", photo: "/equipe-medica/dott-ruggero-tagliabue.jpg" },
  ],
];

const TOTAL = slides.length; // 6

// ─── Text cell (shared on mobile and desktop) ───
function TextCell({ doc }: { doc: Doctor }) {
  return (
    <div className="flex flex-col justify-center p-5 md:p-0">
      <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-brand-grey/40 font-open-sans mb-1 md:mb-1.5">{doc.role}</p>
      <h3 className="text-[11px] md:text-lg font-raleway font-bold text-brand-grey uppercase tracking-[0.05em] leading-snug mb-2 md:mb-3">{doc.name}</h3>
      {doc.bio && (
        <div className="space-y-1 md:space-y-2">
          {doc.bio.split("\n\n").map((p, i) => (
            <p key={i} className="text-[9px] md:text-[12px] text-brand-grey/55 font-open-sans leading-relaxed line-clamp-4 md:line-clamp-none">{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChiSiamoSection() {
  const [current, setCurrent] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const lastWheelTime = useRef(0);

  const navigate = useCallback((dir: 1 | -1) => {
    setCurrent((prev) => ((prev + dir) % TOTAL + TOTAL) % TOTAL);
    setResetKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL);
    }, 7000);
    return () => clearInterval(timer);
  }, [resetKey]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX), absY = Math.abs(e.deltaY);
      if (absX > absY && absX > 20) {
        const now = Date.now();
        if (now - lastWheelTime.current < 800) return;
        lastWheelTime.current = now;
        e.preventDefault();
        navigate(e.deltaX > 0 ? 1 : -1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [navigate]);

  const slide = slides[current];

  return (
    <section
      ref={sectionRef}
      id="equipe"
      className="bg-white py-12 md:py-16 overflow-hidden"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-[32px]">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-raleway font-bold text-brand-grey leading-tight tracking-tight">
            Equipe <span className="text-brand-grey/40">medica.</span>
          </h2>
        </div>

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >

            {/* ── MOBILE: griglia 2×2, 4 celle identiche ── */}
            <div className="md:hidden grid grid-cols-2">

              {/* [0,0] Testo dottore 1 */}
              <div className="bg-[#F6F6F6] flex flex-col justify-center overflow-hidden">
                <TextCell doc={slide[0]} />
              </div>

              {/* [0,1] Foto dottore 1 */}
              <div className="flex flex-col">
                <div className="aspect-[4/5] relative overflow-hidden bg-[#F6E4D8]">
                  <Image
                    src={slide[0].photo}
                    alt={slide[0].name}
                    fill
                    className="object-cover object-top grayscale"
                    sizes="50vw"
                  />
                </div>
                <div className="bg-[#5a5a5a] px-3 py-2">
                  <p className="text-white text-[9px] font-open-sans uppercase tracking-wider leading-tight">{slide[0].name}</p>
                </div>
              </div>

              {/* [1,0] Foto dottore 2 (o vuoto se singleton) */}
              {slide[1] ? (
                <div className="flex flex-col">
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#F6E4D8]">
                    <Image
                      src={slide[1].photo}
                      alt={slide[1].name}
                      fill
                      className="object-cover object-top grayscale"
                      sizes="50vw"
                    />
                  </div>
                  <div className="bg-[#5a5a5a] px-3 py-2">
                    <p className="text-white text-[9px] font-open-sans uppercase tracking-wider leading-tight">{slide[1].name}</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/5] bg-[#F6E4D8]" />
              )}

              {/* [1,1] Testo dottore 2 (o vuoto se singleton) */}
              {slide[1] ? (
                <div className="bg-[#F6F6F6] flex flex-col justify-center overflow-hidden">
                  <TextCell doc={slide[1]} />
                </div>
              ) : (
                <div className="bg-[#F6F6F6]" />
              )}
            </div>

            {/* ── DESKTOP: layout flex-row originale ── */}
            <div className="hidden md:flex md:divide-x md:divide-brand-grey/10">
              {/* Card 1 */}
              <div className="flex flex-row gap-10 items-center flex-1">
                <div className="relative w-[160px] shrink-0 h-[220px] bg-[#F6E4D8]">
                  <Image src={slide[0].photo} alt={slide[0].name} fill className="object-contain object-bottom grayscale" sizes="160px" />
                </div>
                <TextCell doc={slide[0]} />
              </div>
              {/* Card 2 */}
              {slide[1] && (
                <div className="flex flex-row gap-10 items-center flex-1 pl-12">
                  <div className="relative w-[160px] shrink-0 h-[220px] bg-[#F6E4D8]">
                    <Image src={slide[1].photo} alt={slide[1].name} fill className="object-contain object-bottom grayscale" sizes="160px" />
                  </div>
                  <TextCell doc={slide[1]} />
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Controlli */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button onClick={() => navigate(-1)} aria-label="Precedente" className="w-9 h-9 border border-brand-grey/20 flex items-center justify-center hover:bg-brand-grey hover:border-brand-grey transition-colors group shrink-0">
            <ChevronLeft className="w-4 h-4 text-brand-grey group-hover:text-white" />
          </button>
          <span className="text-[11px] font-open-sans text-brand-grey/35 tracking-widest shrink-0">
            {String(current + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
          <button onClick={() => navigate(1)} aria-label="Successivo" className="w-9 h-9 border border-brand-grey/20 flex items-center justify-center hover:bg-brand-grey hover:border-brand-grey transition-colors group shrink-0">
            <ChevronRight className="w-4 h-4 text-brand-grey group-hover:text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}
