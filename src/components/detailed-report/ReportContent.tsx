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
  console.log("ReportContent - Render with data:", { formData, analysis });

  if (!formData || !analysis) {
    console.error("ReportContent - Missing required data:", { formData, analysis });
    return null;
  }

  return (
    <div id="detailed-report" className="space-y-8 print:space-y-6">
      <CompanyInformation formData={formData} industry={analysis.industry} />
      <CurrentOperations formData={formData} />
      <AnalysisResults analyses={[analysis]} />
      <ImplementationPlan data={analysis} onBookDemo={onBookDemo} />
    </div>
  );
};