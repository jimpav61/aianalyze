import { useRef } from "react";
import { DetailedFormData } from "@/types/analysis";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportActions } from "./ReportActions";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={reportRef} className="space-y-8">
        <CompanyInformation formData={formData} />
        <CurrentOperations formData={formData} />
        <AnalysisResults analysis={analysis} />
        <ImplementationPlan />
      </div>
      <ReportActions reportRef={reportRef} onBookDemo={onBookDemo} />
    </>
  );
};