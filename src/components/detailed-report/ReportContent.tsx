import { useEffect, useRef } from "react";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { DetailedFormData } from "@/types/analysis";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      console.log("Report HTML Content:", contentRef.current.innerHTML);
    }
  }, []);

  return (
    <div ref={contentRef} className="space-y-6">
      <CompanyInformation data={formData} industry={analysis?.industry} />
      <CurrentOperations data={formData} />
      <AnalysisResults analysis={analysis} />
      <ImplementationPlan data={{
        objectives: formData.objectives,
        timeline: formData.timeline,
        budget: formData.budget,
        additionalInfo: formData.additionalInfo
      }} />
    </div>
  );
};