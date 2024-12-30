import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";
import { ReportActions } from "./ReportActions";
import { DetailedFormData } from "@/types/analysis";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  return (
    <div id="detailed-report" className="space-y-8">
      <ReportActions 
        formData={formData}
        analysis={analysis}
        onBookDemo={onBookDemo}
      />
      <ReportHeader />
      <CompanyInformation formData={formData} />
      <CurrentOperations formData={formData} />
      <AnalysisResults analysis={analysis} />
      <ImplementationPlan formData={formData} />
      <ReportFooter />
    </div>
  );
};