import { getDictionary } from "@/lib/get-dictionary";

import HeroContent from "@/components/Hero/HeroContent";
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
      <section className="bg-[#F6E4D8] pt-12 pb-4 flex flex-col items-center overflow-hidden">
        <HeroContent />
      </section>

      {/* Services Section Container */}
      <section className="bg-white" id="trattamenti-wrapper">
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
