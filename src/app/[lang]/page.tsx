import { getDictionary } from "@/lib/get-dictionary";
import Image from "next/image";

import TreatmentsSection from "@/components/Treatments/TreatmentsSection";

export default async function Home({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F6E4D8] min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-8 md:px-[32px] flex flex-col items-center text-center z-10">
          <h1 className="text-4xl md:text-6xl font-light mb-8 tracking-tight text-brand-grey leading-tight max-w-4xl">
            {/* Template text for now */}
            Studio San Damiano: un luogo dove salute ed estetica<br/>si fondono per esaltare la bellezza distintiva di ogni persona.
          </h1>
        </div>
        
        {/* Statua Placeholder - We will replace with real layout in next steps */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           {/* In next steps we will implement the asymmetric statue layout */}
        </div>
      </section>

      {/* Services Section Container */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-8 md:px-[32px]">
           <TreatmentsSection dictionary={dictionary} />
        </div>
      </section>

      {/* Sezione di test stabilità altezza */}
      <section className="bg-[#F0F1EF] py-32">
        <div className="container mx-auto px-8 md:px-[32px] text-center">
          <h2 className="text-3xl text-brand-grey font-raleway font-light mb-6 uppercase tracking-widest">
            Sezione Successiva
          </h2>
          <p className="text-brand-grey/60 max-w-2xl mx-auto font-light leading-relaxed">
            Questa sezione serve per verificare che l'altezza dei trattamenti sopra rimanga stabile. 
            Il contenuto qui sotto non dovrebbe saltare o spostarsi bruscamente durante la navigazione 
            tra Griglia, Lista e Dettagli dei trattamenti.
          </p>
        </div>
      </section>
    </div>
  );
}
