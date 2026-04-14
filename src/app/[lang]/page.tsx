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
      <section className="bg-[#F6E4D8] py-12 flex flex-col items-center overflow-hidden">
        <div className="flex flex-col md:flex-row w-full max-w-[1386px] mx-auto">
          
          {/* BLOCCO SINISTRO: 693x420 + 10px padding */}
          <div className="w-full md:w-[693px] h-[420px] p-[10px] flex items-center justify-center relative">
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
          </div>

          {/* BLOCCO DESTRO: 693x420 + 10px padding */}
          <div className="w-full md:w-[693px] h-[420px] p-[10px] flex items-center justify-start">
            <div className="w-full h-full flex flex-col justify-center pl-6 md:pl-16">
              <h1 className="text-4xl md:text-[58px] font-raleway font-bold text-[#5A5A5A] leading-[1.1] tracking-tight">
                La bellezza, come<br />
                un'opera d'arte.
              </h1>
            </div>
          </div>
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
