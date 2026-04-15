'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

interface NavbarProps {
  lang: string;
  dictionary: {
    navbar: {
      trattamenti: string;
      soluzioni: string;
      filosofia: string;
      equipe: string;
      formazione: string;
      contatti: string;
      press: string;
      blog: string;
    };
  };
}

export default function Navbar({ lang, dictionary }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = useState(false);
  const [isMenuTransitioning, setIsMenuTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menus are open
  useEffect(() => {
    if (secondaryMenuOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [secondaryMenuOpen, mobileMenuOpen]);

  const primaryItems = [
    { title: dictionary.navbar.trattamenti, href: `/${lang}#trattamenti` },
    { title: dictionary.navbar.equipe, href: `/${lang}#equipe` },
    { title: dictionary.navbar.contatti, href: `/${lang}#contatti` },
  ];

  const secondaryItems = [
    { title: dictionary.navbar.soluzioni, href: `/${lang}#soluzioni` },
    { title: dictionary.navbar.filosofia, href: `/${lang}#filosofia` },
    { title: dictionary.navbar.formazione, href: `/${lang}#formazione` },
    { title: dictionary.navbar.press, href: `/${lang}#press` },
    { title: dictionary.navbar.blog, href: `/${lang}#blog` },
  ];

  const allItems = [...primaryItems, ...secondaryItems];

  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setIsMenuTransitioning(true);
      setTimeout(() => {
        setMobileMenuOpen(true);
      }, 100);
    } else {
      setMobileMenuOpen(false);
      setTimeout(() => {
        setIsMenuTransitioning(false);
      }, 300);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[height,background-color,backdrop-filter] duration-300 flex items-center ${
          isScrolled
            ? isMenuTransitioning 
              ? "bg-white h-[80px]" 
              : "bg-white/90 backdrop-blur-md h-[80px] shadow-sm border-b border-brand-grey/5"
            : "bg-white h-[103px]"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-8 md:px-[32px] flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${lang}`} 
            className={`relative transition-[height,width] duration-300 flex-shrink-0 ${
              isScrolled 
                ? "h-10 w-44 md:h-12 md:w-52" 
                : "h-14 w-64 md:h-20 md:w-80"
            }`}
          >
            <Image
              src="/san-damiano-assets/logo-sito-studio-san-damiano-1.png"
              alt="Studio San Damiano Logo"
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation SPLIT (Primary items + Explore) */}
          <div className="hidden lg:flex items-center gap-8">
            {primaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-bold font-open-sans uppercase tracking-premium text-brand-grey hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
            <button
              onClick={() => setSecondaryMenuOpen(true)}
              className="flex items-center gap-1 text-[14px] font-bold font-open-sans uppercase tracking-premium text-brand-grey hover:opacity-70 transition-opacity cursor-pointer group"
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Esplora lo Studio</span>
            </button>
            <Link
              href={`/${lang}#contatti`}
              className="bg-brand-grey text-white text-[13px] font-bold font-open-sans uppercase tracking-premium px-5 py-2.5 hover:bg-black transition-colors duration-200 whitespace-nowrap"
            >
              Prenota ora
            </Link>
          </div>

          {/* 3. Mobile Menu Toggle (< 1024px) */}
          <button
            className="lg:hidden text-brand-grey cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" strokeWidth={1} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (< 1024px) */}
      <div className={`fixed inset-0 z-[45] transition-all duration-300 lg:hidden bg-white ${
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        <div className={`flex flex-col items-center h-full gap-6 p-6 overflow-y-auto ${
          isScrolled ? "pt-[100px]" : "pt-[130px]"
        }`}>
          {allItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-bold font-open-sans uppercase tracking-premium text-brand-grey"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href={`/${lang}#contatti`}
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 bg-brand-grey text-white text-[15px] font-bold font-open-sans uppercase tracking-premium px-8 py-4 hover:bg-black transition-colors duration-200"
          >
            Prenota ora
          </Link>
        </div>
      </div>

      {/* Secondary Menu Overlay (Panel - All Screens can trigger it if logic allows, but here it's for 1024-1409) */}
      <AnimatePresence>
        {secondaryMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSecondaryMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[101] shadow-2xl p-12 flex flex-col"
            >
              <button 
                onClick={() => setSecondaryMenuOpen(false)}
                className="self-end p-2 hover:bg-brand-grey/5 rounded-full transition-colors mb-16 cursor-pointer"
              >
                <X className="w-8 h-8 text-brand-grey" strokeWidth={1} />
              </button>
              
              <div className="flex flex-col gap-10">
                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-brand-grey/30 mb-2">Esplora lo Studio</span>
                {secondaryItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-end gap-4"
                    onClick={() => setSecondaryMenuOpen(false)}
                  >
                    <span className="text-3xl font-bold font-open-sans uppercase tracking-tight text-brand-grey group-hover:text-brand-grey/60 transition-colors">
                      {item.title}
                    </span>
                    <div className="h-[1px] flex-grow bg-brand-grey/10 mb-2 group-hover:bg-brand-grey/30 transition-colors" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-16 border-t border-brand-grey/10">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-grey/40">Studio San Damiano Milano</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>

  );
}
