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
  
  // Calculate actual savings based on revenue and industry standards
  const calculateActualSavings = () => {
    const revenue = parseFloat(formData.revenue.replace(/[^0-9.]/g, ''));
    if (isNaN(revenue)) return 0;
    
    // Calculate savings as a more conservative percentage of revenue
    // Typically, automation savings are 2-8% of revenue depending on industry
    const savingsPercentage = Math.min(analysis.savings / 10000, 8); // Cap at 8%
    return Math.round(revenue * (savingsPercentage / 100));
  };

  // Calculate actual profit increase based on revenue and industry averages
  const calculateActualProfit = () => {
    const revenue = parseFloat(formData.revenue.replace(/[^0-9.]/g, ''));
    if (isNaN(revenue)) return 0;
    
    // Calculate profit based on more realistic profit margins
    // Most businesses see 1-5% profit increase from automation
    const profitIncreasePercentage = Math.min(analysis.profit_increase / 5, 5); // Cap at 5%
    return Math.round(revenue * (profitIncreasePercentage / 100));
  };

  const analysesForGrid = analysis.allAnalyses?.map((item: any) => ({
    ...item,
    savings: calculateActualSavings().toString(),
    profit_increase: (analysis.profit_increase / 5).toString(), // More realistic percentage
    actualProfitIncrease: calculateActualProfit().toString()
  })) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: calculateActualSavings().toString(),
    profit_increase: (analysis.profit_increase / 5).toString(), // More realistic percentage
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