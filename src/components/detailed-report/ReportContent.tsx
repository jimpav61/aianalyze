import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis }: ReportContentProps) => {
  return (
    <div className="space-y-6 bg-white p-8 rounded-lg">
      <ReportHeader />
      <div className="company-info">
        <CompanyInformation data={formData} industry={analysis?.industry} />
      </div>
      <div className="current-operations">
        <CurrentOperations data={formData} />
      </div>
      <div className="analysis-results">
        <AnalysisResults analysis={analysis} />
      </div>
      <div className="implementation-plan">
        <ImplementationPlan data={{
          objectives: formData.objectives,
          timeline: formData.timeline,
          budget: formData.budget,
          additionalInfo: formData.additionalInfo
        }} />
      </div>
      <ReportFooter />
    </div>
  );
};