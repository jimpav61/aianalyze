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
  if (!formData || !analysis) {
    console.error("ReportContent - Missing required data:", { formData, analysis });
    return null;
  }

  const analysisArray = analysis.allAnalyses || [{
    department: analysis.department,
    function: analysis.bot_function,
    savings: analysis.savings,
    profit_increase: analysis.profit_increase,
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy
  }];

  return (
    <div id="detailed-report" className="space-y-8">
      <ReportActions 
        formData={formData}
        analysis={analysis}
        onBookDemo={onBookDemo}
      />
      <ReportHeader />
      <CompanyInformation data={formData} industry={analysis.industry} />
      <CurrentOperations data={formData} />
      <AnalysisResults analyses={analysisArray} revenue={formData.revenue} />
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