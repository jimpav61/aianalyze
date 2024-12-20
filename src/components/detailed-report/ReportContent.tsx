import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { AnalysisGrid } from "../AnalysisGrid";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis }: ReportContentProps) => {
  console.log("ReportContent - Analysis data:", analysis);
  
  const analysesForGrid = analysis.allAnalyses || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: analysis.savings.toString(),
    profit_increase: analysis.profit_increase.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy
  }];

  console.log("ReportContent - Analyses for grid:", analysesForGrid);

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
        <AnalysisResults analyses={analysesForGrid} />
      </div>
      <div className="implementation-recommendations mt-8">
        <h3 className="text-xl font-semibold mb-4">AI Implementation Recommendations</h3>
        <AnalysisGrid analyses={analysesForGrid} />
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