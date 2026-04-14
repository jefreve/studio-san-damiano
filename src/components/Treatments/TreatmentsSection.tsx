import TreatmentsSectionContent from "./TreatmentsSectionContent";

export default function TreatmentsSection({ dictionary }: { dictionary: any }) {
  return (
    <section className="bg-brand-white pt-16 pb-12 md:pt-16 md:pb-24" id="trattamenti">
      <div className="container mx-auto px-4 md:px-[32px]">
         <TreatmentsSectionContent dictionary={dictionary} />
      </div>
    </section>
  );
}
