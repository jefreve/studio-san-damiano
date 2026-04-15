"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, MessageSquare } from "lucide-react";
import { reviewsData, Review } from "@/data/reviewsData";

const TRANSITION_MS = 380;

const longestReview = reviewsData.reduce((a, b) =>
  b.text.length > a.text.length ? b : a
);

// ─── Hook: fires once when element enters viewport ───
function useInView(threshold = 0.3) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Staggered fade-up style helper ───
function fadeUp(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

// ─── Avatar Selector ───
function AvatarSelector({ selected, onSelect }: { selected: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10 h-14">
      {reviewsData.map((r, i) => (
        <button
          key={r.id}
          onClick={() => onSelect(i)}
          className={`relative rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center bg-white ${
            i === selected
              ? "w-14 h-14 border-brand-grey shadow-lg"
              : "w-10 h-10 border-transparent opacity-35 hover:opacity-65"
          }`}
          style={{ transition: "width 0.35s ease, height 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease" }}
        >
          {r.avatar ? (
            <Image src={r.avatar} alt={r.author} fill sizes={i === selected ? "56px" : "40px"} className="object-cover object-center" />
          ) : (
            <span className={`font-bold text-brand-grey ${i === selected ? "text-sm" : "text-xs"}`}>{r.author[0]}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════
export default function ReviewsSection({ dictionary }: { dictionary: any }) {
  // Header entrance
  const { ref: headerRef, inView: headerVisible } = useInView(0.4);

  // Review card entrance + navigation
  const { ref: reviewRef, inView: reviewEntered } = useInView(0.4);
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);
  const [displayedReview, setDisplayedReview] = useState<Review>(reviewsData[0]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When the review div enters view for the first time, slide in
  useEffect(() => {
    if (reviewEntered) setVisible(true);
  }, [reviewEntered]);

  const go = (i: number) => {
    if (i === idx) return;
    setIdx(i);
    setVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayedReview(reviewsData[i]);
      setVisible(true);
    }, TRANSITION_MS);
  };

  const slideStyle = (fromRight: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : `translateX(${fromRight ? "28px" : "-28px"})`,
    transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
  });

  return (
    <section className="bg-[#F9EFE9] pt-16 pb-12 md:pt-16 md:pb-24 overflow-hidden">

      {/* ── Header with staggered fade-up ── */}
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="flex flex-col items-center mb-20 max-w-4xl mx-auto text-center">

          {/* Stars + badges */}
          <div style={fadeUp(headerVisible, 0)} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 mb-6">
            <div className="flex items-center gap-1.5 order-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />)}
              <span className="ml-2 text-xs font-bold text-brand-grey/40 uppercase tracking-[0.3em]">5.0 SU GOOGLE</span>
            </div>
            <span className="hidden md:inline text-brand-grey/20">•</span>
            <span className="text-xs font-bold text-brand-grey/40 uppercase tracking-[0.3em] order-2">96 RECENSIONI</span>
          </div>

          {/* Title */}
          <h2
            style={fadeUp(headerVisible, 120)}
            className="text-4xl md:text-6xl font-raleway font-bold text-brand-grey leading-tight mb-8 tracking-tight"
          >
            La voce dei<br className="md:hidden" /> <span className="text-brand-grey/40">nostri pazienti.</span>
          </h2>

          {/* Subtitle */}
          <p
            style={fadeUp(headerVisible, 260)}
            className="text-brand-grey/80 text-base md:text-xl font-bold leading-relaxed max-w-2xl"
          >
            La fiducia delle persone è il nostro miglior biglietto da visita.
          </p>
        </div>
      </div>

      {/* ── Review card — observed separately ── */}
      <div className="container mx-auto px-6 max-w-4xl">
        <div ref={reviewRef} className="flex gap-8 md:gap-14">
          {/* Left editorial rule */}
          <div className="flex-shrink-0 w-[2px] bg-brand-grey/20" />

          <div className="flex-1 min-w-0">
            {/* Decorative quote mark — static */}
            <div className="font-raleway font-bold leading-none text-brand-grey/8 text-[10rem] select-none -mb-10 -mt-6">
              &ldquo;
            </div>

            {/* Text — slides in from RIGHT */}
            <div className="relative">
              <p
                className="invisible leading-[1.9] text-[15px] md:text-[17px] pointer-events-none select-none"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                aria-hidden="true"
              >
                {longestReview.text}
              </p>
              <p
                className="absolute top-0 left-0 right-0 text-brand-grey/80 leading-[1.9] text-[15px] md:text-[17px]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", ...slideStyle(true) }}
              >
                {displayedReview.text}
              </p>
            </div>

            {/* Author — slides in from LEFT */}
            <div className="mt-8" style={slideStyle(false)}>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />)}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-brand-grey/10 flex-shrink-0 flex items-center justify-center">
                  {displayedReview.avatar ? (
                    <Image src={displayedReview.avatar} alt={displayedReview.author} fill sizes="40px" className="object-cover object-center" />
                  ) : (
                    <span className="font-bold text-brand-grey text-sm">{displayedReview.author[0]}</span>
                  )}
                </div>
                <div>
                  <p className="font-raleway font-bold text-[11px] text-brand-grey uppercase tracking-[0.3em]">
                    — {displayedReview.author}
                  </p>
                  <p className="text-[9px] text-brand-grey/35 uppercase tracking-widest">{displayedReview.role}</p>
                </div>
                <Image src="/reviews/google-icon.svg" width={14} height={14} alt="Google" sizes="14px" className="opacity-40 ml-2" />
              </div>
            </div>
          </div>
        </div>

        <AvatarSelector selected={idx} onSelect={go} />
      </div>

      {/* CTA */}
      <div className="mt-20 text-center px-6">
        <p className="text-brand-grey/40 text-xs uppercase tracking-[0.3em] mb-6 font-semibold">Sei già nostro paziente?</p>
        <a
          href="https://www.google.com/maps/place/Studio+San+Damiano+-+Odontoiatria+e+Medicina+Estetica/@45.4674664,9.2005203,17z/data=!4m8!3m7!1s0x4786c75768f80025:0x8c71e9e30ec30367!8m2!3d45.4674664!4d9.2005203!9m1!1b1!16s%2Fg%2F11sp4qtywp"
          target="_blank" rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 bg-brand-grey text-white px-10 py-5 rounded-sm overflow-hidden transition-all hover:pr-12"
        >
          <span className="relative z-10 font-bold uppercase tracking-widest text-xs">Condividi la tua esperienza</span>
          <MessageSquare className="w-4 h-4 transition-all group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
