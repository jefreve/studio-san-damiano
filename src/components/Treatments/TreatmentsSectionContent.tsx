"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronRight } from "lucide-react";
import { treatmentsData, CategoryData, Treatment } from "@/data/treatmentsData";

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

type ViewMode = "GRID" | "LIST" | "DETAIL";

export default function TreatmentsSectionContent({ dictionary }: { dictionary: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [viewMode, setViewMode] = useState<ViewMode>("GRID");
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  // Sync state with URL
  useEffect(() => {
    const catId = searchParams.get("categoria");
    const treatId = searchParams.get("trattamento");

    if (catId && treatmentsData[catId]) {
      const cat = treatmentsData[catId];
      setSelectedCategory(cat);
      
      if (treatId) {
        const treat = cat.treatments.find(t => t.id === treatId);
        if (treat) {
          setSelectedTreatment(treat);
          setViewMode("DETAIL");
        } else {
          setViewMode("LIST");
        }
      } else {
        setViewMode("LIST");
      }
    } else {
      setViewMode("GRID");
      setSelectedCategory(null);
      setSelectedTreatment(null);
    }
  }, [searchParams]);

  const updateUrl = (catId?: string, treatId?: string) => {
    const params = new URLSearchParams();
    if (catId) params.set("categoria", catId);
    if (treatId) params.set("trattamento", treatId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClose = () => updateUrl();
  const handleBack = () => viewMode === "DETAIL" ? updateUrl(selectedCategory?.id) : updateUrl();

  return (
    <div className="relative w-full max-w-5xl mx-auto h-auto min-h-[504px]">
      <AnimatePresence mode="wait">
        {viewMode === "GRID" ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          >
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => updateUrl(category.id)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="large-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="w-full h-[504px] bg-brand-grey shadow-2xl rounded-sm flex flex-col relative overflow-hidden border border-white/5"
          >
            {/* Header - Fixed to top */}
            <div className="flex items-center justify-between p-6 z-30 bg-brand-grey/95 backdrop-blur-sm">
              <div>
                {viewMode === "DETAIL" && (
                  <button 
                    onClick={handleBack}
                    className="group flex items-center text-white/60 hover:text-white transition-colors text-xs uppercase tracking-premium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Indietro
                  </button>
                )}
              </div>
              <button 
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* View Content - Scrollable area */}
            <div className="flex-1 relative overflow-y-auto scrollbar-hide md:scrollbar-thin md:scrollbar-thumb-white/10 md:scrollbar-track-transparent px-8 pb-12">
              <AnimatePresence mode="wait">
                {viewMode === "LIST" && selectedCategory && (
                  <motion.div
                    key={`list-${selectedCategory.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListView category={selectedCategory} onSelect={(t) => updateUrl(selectedCategory.id, t.id)} />
                  </motion.div>
                )}
                {viewMode === "DETAIL" && selectedTreatment && (
                  <motion.div
                    key={`detail-${selectedTreatment.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DetailView treatment={selectedTreatment} categoryId={selectedCategory?.id} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryCard({ category, onClick }: { category: any; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-brand-grey rounded-sm overflow-hidden h-[236px] flex items-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer border border-white/5"
    >
      <div className="w-1/2 p-6 md:p-8 z-10 flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl text-white font-raleway font-light mb-4 leading-tight">
          {category.title}
        </h3>
        <div>
          <span className="text-white/80 text-[10px] tracking-premium uppercase border-b border-white/30 group-hover:border-white transition-colors duration-300">
            {category.linkText}
          </span>
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center justify-end pr-4 md:pr-6">
        <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] transform group-hover:scale-105 transition-transform duration-500">
          <Image src={category.image} alt={category.title} fill className="object-contain object-right" />
        </div>
      </div>
    </div>
  );
}

function ListView({ category, onSelect }: { category: CategoryData; onSelect: (t: Treatment) => void }) {
  return (
    <div>
      <h2 className="text-3xl font-raleway font-light text-white mb-10 uppercase tracking-wide border-l-4 border-brand-cream/50 pl-6">
        {category.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
        {category.treatments.map((treatment) => (
          <div 
            key={treatment.id}
            onClick={() => onSelect(treatment)}
            className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-brand-cream/30 cursor-pointer transition-all"
          >
            <span className="text-lg font-raleway text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all">
              {treatment.title}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-cream opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailView({ treatment, categoryId }: { treatment: Treatment; categoryId?: string }) {
  const isEaglegrid = treatment.id === "eaglegrid-milano";

  if (isEaglegrid) {
    return <EaglegridDetailView treatment={treatment} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-full gap-12">
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-raleway font-light text-white mb-8 border-b border-white/10 pb-6">
          {treatment.title}
        </h2>
        <p className="text-lg text-white/80 leading-relaxed mb-10 font-light">
          {treatment.fullDescription}
        </p>
        <button className="bg-brand-cream text-brand-grey px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors">
          Contattaci Ora
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <div className="relative aspect-video md:aspect-square rounded-sm overflow-hidden border border-white/10 shadow-xl">
          {treatment.image && (
            <Image 
              src={treatment.image} 
              alt={treatment.title} 
              fill 
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function EaglegridDetailView({ treatment }: { treatment: Treatment }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center text-center">
        {(treatment as any).logo && (
          <div className="relative w-full max-w-[450px] h-[180px]">
            <Image 
              src={(treatment as any).logo} 
              alt="Eaglegrid Milano" 
              fill 
              className="object-contain brightness-0 invert" 
            />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-3/5 space-y-10">
          <p className="whitespace-pre-line leading-relaxed text-lg text-white/80 font-light">
            {treatment.fullDescription}
          </p>
          
          <div className="bg-white/5 p-8 border border-white/10 rounded-sm">
            <p className="font-semibold mb-4 uppercase tracking-premium text-brand-cream text-sm">Contatti e Appuntamenti</p>
            {treatment.contactInfo && (
              <div className="space-y-2">
                <p className="text-2xl text-white font-raleway">TEL. {treatment.contactInfo.phone}</p>
                <p className="text-lg text-white/80 underline decoration-brand-cream">{treatment.contactInfo.email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-2/5">
          <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl border border-white/10">
            {treatment.image && (
              <Image 
                src={treatment.image} 
                alt="Eaglegrid Technology" 
                fill 
                className="object-cover" 
              />
            )}
          </div>
        </div>
      </div>

      {treatment.faqs && (
        <div className="pt-12 border-t border-white/10">
          <h3 className="text-2xl font-raleway font-light text-brand-cream mb-10 uppercase tracking-widest">
            Domande Frequenti
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatment.faqs.map((faq, i) => (
              <div key={i} className="group border border-white/10 p-6 hover:bg-white/5 transition-all">
                <p className="font-medium text-white mb-4 uppercase text-sm tracking-wide">
                   {faq.question}
                </p>
                <p className="text-white/50 text-sm font-light leading-relaxed italic">
                   Risposta in caricamento...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
