"use client";

import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    id: "medicina-estetica",
    title: "Medicina estetica",
    image: "/categories/category-medicina-estetica.jpg",
    linkText: "Scopri i trattamenti",
  },
  {
    id: "odontoiatria",
    title: "Odontoiatria",
    image: "/categories/category-odontoiatria.jpg",
    linkText: "Scopri i trattamenti",
  },
  {
    id: "implantologia",
    title: "Implantologia \"senza osso\"",
    image: "/categories/category-implantologia-senza-osso.png",
    linkText: "Scopri di più",
  },
  {
    id: "medicina-rigenerativa",
    title: "Medicina Rigenerativa",
    image: "/categories/category-medicina-rigenerativa.png",
    linkText: "Scopri di più",
  },
];

export default function TreatmentsSection({ dictionary }: { dictionary: any }) {
  // logic for states will go here in next tasks
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto py-12">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <div className="group relative bg-[#5a5a5a] rounded-sm overflow-hidden min-h-[220px] flex items-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
      {/* Content */}
      <div className="w-1/2 p-6 md:p-8 z-10 flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl text-white font-raleway font-light mb-4 leading-tight">
          {category.title}
        </h3>
        <div>
          <span className="text-white/80 text-[10px] tracking-premium uppercase border-b border-white/30 pb-1 group-hover:border-white transition-colors duration-300">
            {category.linkText}
          </span>
        </div>
      </div>

      {/* Circle Image Wrapper - Improved spacing */}
      <div className="w-1/2 h-full flex items-center justify-end pr-4 md:pr-6">
        <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] transform group-hover:scale-105 transition-transform duration-500">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-contain object-right"
          />
        </div>
      </div>

      {/* Overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
