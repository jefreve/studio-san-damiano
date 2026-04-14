"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1386px] mx-auto">
      {/* BLOCCO SINISTRO: Immagine entra da sinistra (fuori schermo) */}
      <motion.div 
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 1.4, 
          ease: [0.22, 1, 0.36, 1], // Transition fluid e premium
          delay: 0.1 
        }}
        className="w-full md:w-[693px] h-[420px] p-[10px] flex items-center justify-center relative"
      >
        <div className="relative w-full h-full">
          <Image 
            src="/san-damiano-assets/statua-home.webp" 
            alt="La bellezza come opera d'arte" 
            fill 
            sizes="693px"
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* BLOCCO DESTRO: Testo entra da destra (fuori schermo, DECISAMENTE più lento) */}
      <motion.div 
        initial={{ opacity: 0, x: 400 }} // Aumentato leggermente l'offset per dare più strada
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 3.5, // Molto più lento per un effetto etereo
          ease: [0.16, 1, 0.3, 1],
          delay: 0.5 // Più ritardo per separare nettamente l'azione dall'immagine
        }}
        className="w-full md:w-[693px] h-[420px] p-[10px] flex items-center justify-start"
      >
        <div className="w-full h-full flex flex-col justify-center pl-6 md:pl-16">
          <h1 className="text-4xl md:text-[58px] font-raleway font-bold text-[#5A5A5A] leading-[1.1] tracking-tight">
            La bellezza, come<br />
            un'opera d'arte.
          </h1>
        </div>
      </motion.div>
    </div>
  );
}
