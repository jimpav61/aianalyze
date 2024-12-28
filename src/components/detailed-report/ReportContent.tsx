import { DetailedFormData } from "@/types/analysis";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";

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
      <ReportHeader />
      <CompanyInformation data={formData} industry={analysis.industry} />
      <CurrentOperations data={formData} />
      <AnalysisResults 
        analyses={[analysis]} 
        revenue={formData.revenue || "0"} 
      />
      <ImplementationPlan 
        data={{
          objectives: analysis.objectives || "",
          timeline: analysis.timeline || "",
          budget: analysis.budget || "",
          additionalInfo: analysis.additionalInfo
        }} 
      />
      <ReportFooter />
    </div>
  );
};