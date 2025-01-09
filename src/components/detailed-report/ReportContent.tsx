import { DetailedFormData } from "@/types/analysis";
import { ReportHeader } from "./ReportHeader";
import { CompanyInformation } from "./CompanyInformation";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { ReportFooter } from "./ReportFooter";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  return (
    <div data-report-content="true" className="space-y-8 print:space-y-6">
      <ReportHeader 
        formData={formData} 
        onBookDemo={onBookDemo} 
        industry={analysis.industry}
        analysis={analysis}
      />
      <CompanyInformation data={formData} industry={analysis.industry} />
      <CurrentOperations data={formData} />
      <AnalysisResults 
        analyses={analysis.allAnalyses || [{
          department: analysis.department,
          function: analysis.bot_function,
          savings: analysis.savings.toString(),
          profit_increase: analysis.profit_increase.toString(),
          explanation: analysis.explanation,
          marketingStrategy: analysis.marketing_strategy
        }]}
        revenue={formData.revenue || '0'}
      />
      <ImplementationPlan data={{
        objectives: formData.objectives || '',
        timeline: formData.timeline || '',
        budget: formData.budget || '',
        additionalInfo: formData.additionalInfo
      }} />
      <div className="flex flex-col items-center gap-4 mt-12 mb-8">
        <Button
          onClick={() => window.location.href = 'tel:8001234567'}
          className="bg-[#f65228] hover:bg-[#d43d16] text-white flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          (800) 123-4567
        </Button>
        <p className="text-sm text-gray-600">
          Talk to Our AI Implementation Expert and Test the Magic
        </p>
      </div>
      <ReportFooter />
    </div>
  );
};