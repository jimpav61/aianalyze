import { useRef } from "react";
import { DetailedFormData } from "@/types/analysis";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={reportRef} className="space-y-8">
        <CompanyInformation data={formData} industry={analysis.industry} />
        <CurrentOperations data={formData} />
        <AnalysisResults analysis={analysis} />
        <ImplementationPlan data={{
          objectives: formData.objectives,
          timeline: formData.timeline,
          budget: formData.budget,
          additionalInfo: formData.additionalInfo
        }} />
      </div>
    </>
  );
};