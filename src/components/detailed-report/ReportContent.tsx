import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { Button } from "../ui/button";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  return (
    <div className="space-y-6">
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
      {onBookDemo && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onBookDemo}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Book a Demo
          </Button>
        </div>
      )}
      <ReportFooter />
    </div>
  );
};