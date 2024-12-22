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
  
  // Calculate actual savings based on revenue
  const calculateActualSavings = () => {
    const revenue = parseFloat(formData.revenue.replace(/[^0-9.]/g, ''));
    if (isNaN(revenue)) return 0;
    
    // Calculate savings as a percentage of revenue
    const savingsPercentage = analysis.savings / 100000; // Normalize to percentage
    return Math.round(revenue * (savingsPercentage / 100));
  };

  // Calculate actual profit increase based on revenue
  const calculateActualProfit = () => {
    const revenue = parseFloat(formData.revenue.replace(/[^0-9.]/g, ''));
    if (isNaN(revenue)) return 0;
    
    // Calculate profit based on industry average margins and revenue
    const profitIncrease = analysis.profit_increase / 100;
    return Math.round(revenue * profitIncrease);
  };

  const analysesForGrid = analysis.allAnalyses?.map((item: any) => ({
    ...item,
    savings: calculateActualSavings().toString(),
    profit_increase: analysis.profit_increase.toString(),
    actualProfitIncrease: calculateActualProfit().toString()
  })) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: calculateActualSavings().toString(),
    profit_increase: analysis.profit_increase.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy,
    actualProfitIncrease: calculateActualProfit().toString()
  }];

  console.log("ReportContent - Analyses for grid:", analysesForGrid);

  return (
    <div className="space-y-6 bg-white p-4 sm:p-8 rounded-lg max-w-full overflow-x-hidden">
      <ReportHeader />
      <div className="company-info whitespace-pre-line">
        <CompanyInformation data={formData} industry={analysis?.industry} />
      </div>
      <div className="current-operations whitespace-pre-line">
        <CurrentOperations data={formData} />
      </div>
      <div className="analysis-results whitespace-pre-line">
        <AnalysisResults 
          analyses={analysesForGrid} 
          revenue={formData.revenue}
        />
      </div>
      <div className="implementation-recommendations mt-8">
        <h3 className="text-xl font-semibold mb-4">AI Implementation Recommendations</h3>
        <div className="overflow-x-auto">
          <AnalysisGrid analyses={analysesForGrid} />
        </div>
      </div>
      <div className="implementation-plan whitespace-pre-line">
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