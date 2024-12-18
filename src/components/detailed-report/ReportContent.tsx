import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { ReportActions } from "./ReportActions";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  return (
    <div className="space-y-6">
      <ReportHeader />
      <div className="flex justify-end mb-4">
        <ReportActions 
          reportRef={null}
          onBookDemo={onBookDemo}
        />
      </div>
      <CompanyInformation data={formData} industry={analysis?.industry} />
      <CurrentOperations data={formData} />
      <AnalysisResults analysis={analysis} />
      <ImplementationPlan data={{
        objectives: formData.objectives,
        timeline: formData.timeline,
        budget: formData.budget,
        additionalInfo: formData.additionalInfo
      }} />
      <ReportFooter />
    </div>
  );
};