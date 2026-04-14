"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, MessageSquare, X, ChevronLeft, ChevronRight } from "lucide-react";
import { reviewsData, Review } from "@/data/reviewsData";

// --- Sub-component: ReviewCard ---
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[400px] h-[460px] bg-white/90 backdrop-blur-md border border-white/20 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group flex flex-col overflow-hidden snap-start">
      {/* 1. Fixed Header: Stars */}
      <div className="p-10 pb-0 flex-shrink-0">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
          ))}
        </div>
      </div>

      {/* 2. Content: Review Text (Scrollable only on hover) */}
      <div className="px-10 py-6 flex-1 overflow-hidden group-hover:overflow-y-auto custom-scrollbar">
        <p className="text-brand-grey/80 font-light leading-relaxed italic text-sm">
          "{review.text}"
        </p>
      </div>

      {/* 3. Fixed Footer: Author Info (Divided with color/line) */}
      <div className="bg-brand-grey/[0.02] border-t border-brand-grey/5 p-8 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden bg-white border border-brand-grey/10 shadow-sm flex items-center justify-center">
            {review.avatar ? (
              <Image 
                src={review.avatar} 
                alt={review.author} 
                fill 
                sizes="44px"
                className="object-cover object-center" 
              />
            ) : (
              <span className="text-brand-grey font-bold text-base">
                {review.author[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="font-raleway font-bold text-[13px] text-brand-grey uppercase tracking-wider truncate">
              {review.author}
            </h4>
            <p className="text-[10px] text-brand-grey/40 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span className="w-1 h-1 bg-brand-grey/20 rounded-full" />
              {review.role}
            </p>
          </div>
          <div className="ml-auto flex-shrink-0">
             <Image 
               src="/reviews/google-icon.svg" 
               width={16} 
               height={16} 
               alt="Google" 
               sizes="16px"
               className="opacity-70" 
             />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component: ReviewsSection ---
export default function ReviewsSection({ dictionary }: { dictionary: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Triple data for seamless manual and auto-scrolling
  const displayReviews = [...reviewsData, ...reviewsData, ...reviewsData];

  // Auto-scroll logic
  useEffect(() => {
    let animationId: number;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 0.8; // Speed controlled via JS

        // Seamless loop calculation
        const maxScroll = (scrollContainer.scrollWidth / 3) * 2;
        const minScroll = scrollContainer.scrollWidth / 3;
        
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = minScroll;
        } else if (scrollContainer.scrollLeft <= 5) { // Threshold for reverse jump
          scrollContainer.scrollLeft = minScroll;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Initial scroll position (start at the middle set of reviews)
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
    }
  }, []);

  const handleArrowScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 424; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section className="bg-[#F9EFE9] py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Social Proof Header - Centered Style */}
        <div className="flex flex-col items-center mb-20 max-w-4xl mx-auto text-center">
          <div className="flex items-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
            ))}
            <span className="ml-2 text-xs font-bold text-brand-grey/40 uppercase tracking-[0.3em]">
              5.0 SU GOOGLE • 96 RECENSIONI
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-raleway font-bold text-brand-grey leading-tight mb-8 tracking-tight">
            La voce dei <span className="text-brand-grey/40">nostri pazienti.</span>
          </h2>
          
          <p className="text-brand-grey/80 text-lg md:text-xl font-bold leading-relaxed max-w-2xl">
            La fiducia delle persone è il nostro miglior biglietto da visita.
          </p>
        </div>
      </div>

      {/* Infinite Scroll Carousel */}
      <div 
        className="w-full relative py-12 group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 3px;
            height: 0px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(58, 58, 58, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb {
            background: rgba(58, 58, 58, 0.2);
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F9EFE9] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F9EFE9] to-transparent z-20 pointer-events-none" />

        {/* Navigation Arrows - Desktop Only Visibility */}
        <button 
          onClick={() => handleArrowScroll("left")}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:scale-110 text-brand-grey shadow-lg hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => handleArrowScroll("right")}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:scale-110 text-brand-grey shadow-lg hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-6 container mx-auto snap-x snap-mandatory touch-pan-x"
        >
          <div className="flex gap-6 pr-6">
            {displayReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center px-6">
        <p className="text-brand-grey/40 text-xs uppercase tracking-[0.3em] mb-6 font-semibold">
          Sei già nostro paziente?
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative inline-flex items-center gap-3 bg-brand-grey text-white px-10 py-5 rounded-sm overflow-hidden transition-all hover:pr-12"
        >
          <span className="relative z-10 font-bold uppercase tracking-widest text-xs">
            Condividi la tua esperienza
          </span>
          <MessageSquare className="w-4 h-4 transition-all group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Modal for Google Maps Review */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="maps-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-10"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              key="maps-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full md:w-[90%] md:h-[90%] bg-white shadow-2xl md:rounded-sm flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 md:p-6 bg-[#F6E4D8] border-b border-brand-grey/5 flex-shrink-0">
                <div className="flex-1" />
                <div className="flex-1 text-center overflow-hidden">
                  <h2 className="text-lg md:text-xl font-raleway font-semibold text-brand-grey uppercase tracking-widest whitespace-nowrap">
                    Lascia una recensione
                  </h2>
                </div>
                <div className="flex-1 flex justify-end">
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-brand-grey/5 rounded-full">
                    <X className="w-6 h-6 text-brand-grey" />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative bg-[#F9EFE9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.9405230489114!2d9.2005203!3d45.4674664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c75768f80025%3A0x8c71e9e30ec30367!2sStudio%20San%20Damiano%20-%20Odontoiatria%20e%20Medicina%20Estetica!5e0!3m2!1sit!2sit!4v1713100000000!5m2!1sit!2sit"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Studio San Damiano Google Maps"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                   <a 
                    href="https://www.google.com/maps/place/Studio+San+Damiano+-+Odontoiatria+e+Medicina+Estetica/@45.4674664,9.2005203,17z/data=!4m8!3m7!1s0x4786c75768f80025:0x8c71e9e30ec30367!8m2!3d45.4674664!4d9.2005203!9m1!1b1!16s%2Fg%2F11sp4qtywp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-grey text-white px-6 py-3 text-xs uppercase tracking-widest font-bold shadow-xl hover:bg-black transition-colors"
                   >
                     Apri in Google Maps
                   </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
