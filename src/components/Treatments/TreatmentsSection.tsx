import { Suspense } from "react";
import TreatmentsSectionContent from "./TreatmentsSectionContent";

export default function TreatmentsSection({ dictionary }: { dictionary: any }) {
  return (
    <section className="bg-brand-white pt-16 pb-12 md:pt-16 md:pb-24" id="trattamenti">
      <div className="container mx-auto px-0 md:px-[32px]">
        <Suspense fallback={<div>Loading...</div>}>
          <TreatmentsSectionContent dictionary={dictionary} />
        </Suspense>
      </div>
    </section>
  );
}
