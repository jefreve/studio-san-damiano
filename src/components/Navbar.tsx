'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: dictionary.navbar.trattamenti, href: `/${lang}#trattamenti` },
    { title: dictionary.navbar.soluzioni, href: `/${lang}#soluzioni` },
    { title: dictionary.navbar.filosofia, href: `/${lang}#filosofia` },
    { title: dictionary.navbar.equipe, href: `/${lang}#equipe` },
    { title: dictionary.navbar.formazione, href: `/${lang}#formazione` },
    { title: dictionary.navbar.contatti, href: `/${lang}#contatti` },
    { title: dictionary.navbar.press, href: `/${lang}#press` },
    { title: dictionary.navbar.blog, href: `/${lang}#blog` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-brand-grey/5"
          : "bg-white py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-[32px] flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="relative h-10 w-44 md:h-12 md:w-52 flex-shrink-0">
          <Image
            src="/san-damiano-assets/logo-sito-studio-san-damiano-1.png"
            alt="Studio San Damiano Logo"
            fill
            sizes="(max-width: 768px) 176px, 208px"
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-normal uppercase tracking-premium text-brand-grey hover:opacity-70 transition-opacity"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="xl:hidden text-brand-grey"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-[76px] bg-white z-40 transition-all duration-500 xl:hidden ${
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-light uppercase tracking-premium text-brand-grey"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
