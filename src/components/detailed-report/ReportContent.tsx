import { DetailedFormData } from "@/types/analysis";
import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  analyses: any[];
}

export const ReportContent = ({ formData, analysis, analyses }: ReportContentProps) => {
  return (
    <div data-report-content="true" className="space-y-8 print:space-y-6">
      <ReportHeader formData={formData} />
      <CompanyInformation formData={formData} />
      <CurrentOperations formData={formData} />
      <AnalysisResults 
        analysis={analysis}
        analyses={analyses}
        formData={formData}
      />
      <ImplementationPlan analysis={analysis} />
      <ReportFooter />
    </div>
  );
};