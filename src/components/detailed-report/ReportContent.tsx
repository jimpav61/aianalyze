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
    <div className="space-y-6 bg-white p-8 rounded-lg w-full max-w-4xl mx-auto">
      <ReportHeader />
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