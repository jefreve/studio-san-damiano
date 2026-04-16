"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

function useInView(threshold = 0.2) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function fadeUp(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  };
}

const logos = [
  { src: "/parlano-di-noi/elle-logo.png",           alt: "ELLE",          width: 139, height: 65  },
  { src: "/parlano-di-noi/logo-iodonna-150x150.png", alt: "IO DONNA",      width: 150, height: 150 },
  { src: "/parlano-di-noi/larepubblica-logo.png",    alt: "la Repubblica", width: 302, height: 81  },
  { src: "/parlano-di-noi/logo-lastampa.png",        alt: "LA STAMPA",     width: 237, height: 43  },
  { src: "/parlano-di-noi/LOGO-STARBENE.png",        alt: "Starbene",      width: 232, height: 72  },
  { src: "/parlano-di-noi/vanityfair-logo.png",      alt: "VANITY FAIR",   width: 380, height: 109 },
];

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export default function ParlanoDiNoiSection({ dictionary }: Props) {
  const { ref, inView } = useInView();

  return (
    <section
      id="press"
      className="py-12 md:py-16 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div ref={ref} className="max-w-[1440px] mx-auto px-8 md:px-[32px]">
        <p
          className="font-open-sans font-light text-sm text-center mb-10 md:mb-14 tracking-[0.3em] uppercase"
          style={{ ...fadeUp(inView, 0), color: "rgba(90, 90, 90, 0.6)" }}
        >
          {dictionary.navbar.press}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map(({ src, alt, width, height }, i) => (
            <div key={alt} style={fadeUp(inView, 80 + i * 80)}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{ height: "48px", width: "auto" }}
                className="object-contain transition-all duration-300 opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
