"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { treatmentsData, CategoryData, Treatment } from "@/data/treatmentsData";
import { X, ArrowLeft, ChevronRight } from "lucide-react";

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

  const handleClose = () => {
    updateUrl();
  };

  const handleBack = () => {
    if (viewMode === "DETAIL") {
      updateUrl(selectedCategory?.id);
    } else {
      updateUrl();
    }
  };

  if (viewMode === "GRID") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            onClick={() => updateUrl(category.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-brand-white border border-brand-cream/30 shadow-2xl rounded-sm overflow-hidden animate-in fade-in duration-500 min-h-[600px] flex flex-col">
      {/* Navigation Header */}
      <div className="flex items-center justify-between p-6 border-b border-brand-cream/20">
        <div>
          {viewMode === "DETAIL" && (
            <button 
              onClick={handleBack}
              className="group flex items-center text-brand-grey/60 hover:text-brand-grey transition-colors text-sm uppercase tracking-premium"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Torna alla lista
            </button>
          )}
        </div>
        <button 
          onClick={handleClose}
          className="p-2 hover:bg-brand-cream/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-brand-grey" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {viewMode === "LIST" && selectedCategory && (
          <ListView category={selectedCategory} onSelect={(t) => updateUrl(selectedCategory.id, t.id)} />
        )}
        {viewMode === "DETAIL" && selectedTreatment && (
          <DetailView treatment={selectedTreatment} categoryId={selectedCategory?.id} />
        )}
      </div>
    </div>
  );
}

function CategoryCard({ category, onClick }: { category: any; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#5a5a5a] rounded-sm overflow-hidden min-h-[220px] flex items-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
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
    <div className="p-8 md:p-12">
      <h2 className="text-3xl font-raleway font-light text-brand-grey mb-12 uppercase tracking-wide border-l-4 border-brand-cream pl-6">
        {category.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {category.treatments.map((treatment) => (
          <div 
            key={treatment.id}
            onClick={() => onSelect(treatment)}
            className="group flex items-center justify-between p-4 border-b border-brand-cream/20 hover:bg-brand-cream/5 cursor-pointer transition-all"
          >
            <span className="text-lg font-raleway text-brand-grey group-hover:translate-x-2 transition-transform">
              {treatment.title}
            </span>
            <ChevronRight className="w-5 h-5 text-brand-cream opacity-0 group-hover:opacity-100 transition-opacity" />
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
    <div className="flex flex-col md:flex-row h-full animate-in slide-in-from-right duration-500">
      <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[600px]">
        <h2 className="text-4xl font-raleway font-light text-brand-grey mb-8">
          {treatment.title}
        </h2>
        <p className="text-lg text-brand-grey/80 leading-relaxed mb-10">
          {treatment.fullDescription}
        </p>
        <button className="bg-brand-grey text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-brand-grey/90 transition-colors">
          Prenota una consulenza
        </button>
      </div>
      <div className="w-full md:w-1/2 relative min-h-[400px]">
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
  );
}

function EaglegridDetailView({ treatment }: { treatment: Treatment }) {
  return (
    <div className="p-8 md:p-12 animate-in slide-in-from-bottom duration-700">
      {/* Logos and Intro Section */}
      <div className="flex flex-col items-center mb-16 text-center">
        {(treatment as any).logo && (
          <div className="relative w-full max-w-[400px] h-[200px] mb-8">
            <Image 
              src={(treatment as any).logo} 
              alt="Eaglegrid Milano" 
              fill 
              className="object-contain" 
            />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-16 mb-20">
        <div className="lg:w-3/5 space-y-8">
          <div className="prose prose-lg text-brand-grey/80">
            <p className="whitespace-pre-line leading-relaxed text-lg">
              {treatment.fullDescription}
            </p>
          </div>
          
          <div className="bg-brand-cream/10 p-8 border-l-4 border-brand-cream">
            <p className="font-semibold mb-4 uppercase tracking-premium">Contatti e Appuntamenti</p>
            {treatment.contactInfo && (
              <div className="space-y-2">
                <p className="text-xl text-brand-grey">TEL. {treatment.contactInfo.phone}</p>
                <p className="text-lg text-brand-grey underline">{treatment.contactInfo.email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-2/5">
          <div className="relative w-full aspect-square rounded-sm overflow-hidden shadow-2xl border border-brand-cream/20">
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

      {/* FAQ Section */}
      {treatment.faqs && (
        <div className="mt-20">
          <h3 className="text-2xl font-raleway font-light text-brand-grey mb-10 uppercase tracking-widest border-b border-brand-cream/30 pb-4">
            Domande Frequenti
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatment.faqs.map((faq, i) => (
              <div key={i} className="group border border-brand-cream/20 p-6 hover:border-brand-cream/50 transition-colors">
                <p className="font-medium text-brand-grey mb-2 uppercase text-sm tracking-wide flex justify-between">
                   {faq.question}
                </p>
                <p className="text-brand-grey/60 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
