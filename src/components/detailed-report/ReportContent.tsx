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
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis, onBookDemo }: ReportContentProps) => {
  const analyses = analysis.allAnalyses || [{
    department: analysis.department,
    function: analysis.bot_function,
    savings: analysis.savings.toString(),
    profit_increase: analysis.profit_increase.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy
  }];

  return (
    <div data-report-content="true" className="space-y-8 print:space-y-6">
      <ReportHeader formData={formData} onBookDemo={onBookDemo} />
      <CompanyInformation data={formData} />
      <CurrentOperations data={formData} />
      <AnalysisResults 
        analyses={analyses}
        revenue={formData.revenue || '0'}
      />
      <ImplementationPlan data={{
        objectives: formData.objectives || '',
        timeline: formData.timeline || '',
        budget: formData.budget || '',
        additionalInfo: formData.additionalInfo
      }} />
      <ReportFooter />
    </div>
  );
};