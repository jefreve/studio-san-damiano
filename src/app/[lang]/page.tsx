import { getDictionary } from "@/lib/get-dictionary";
import Image from "next/image";

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
      <section className="bg-brand-cream min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
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

      {/* Services Section Container - Initial placeholder */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-8 md:px-[32px]">
           {/* Grid will go here */}
        </div>
      </section>
    </div>
  );
}
