import TreatmentsSectionContent from "./TreatmentsSectionContent";

export default function TreatmentsSection({ dictionary }: { dictionary: any }) {
  return (
    <section className="bg-brand-white py-12 md:py-24" id="trattamenti">
      <div className="container mx-auto px-4 md:px-[32px]">
         <TreatmentsSectionContent dictionary={dictionary} />
      </div>
    </section>
  );
}
