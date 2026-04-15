import { getDictionary } from "@/lib/get-dictionary";

import HeroContent from "@/components/Hero/HeroContent";
import UniqueExperienceSection from "@/components/UniqueExperience/UniqueExperienceSection";
import TreatmentsSection from "@/components/Treatments/TreatmentsSection";
import ReviewsSection from "@/components/Reviews/ReviewsSection";
import ContactForm from "@/components/Contact/ContactForm";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F6E4D8] pt-12 pb-4 flex flex-col items-center overflow-hidden">
        <HeroContent />
      </section>

      {/* Un'esperienza unica — temporaneamente nascosta */}
      {/* <UniqueExperienceSection /> */}

      {/* Services Section Container */}
      <section className="bg-white" id="trattamenti-wrapper">
        <div className="container mx-auto px-0 md:px-[32px]">
           <TreatmentsSection dictionary={dictionary} />
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection dictionary={dictionary} />

      {/* Contact Form Section */}
      <ContactForm dictionary={dictionary} />
    </div>
  );
}
