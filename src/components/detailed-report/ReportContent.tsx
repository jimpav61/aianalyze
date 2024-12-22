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
    
    // Calculate savings based on the provided savings value from analysis
    // This represents the actual dollar amount of savings
    const savingsAmount = parseFloat(analysis.savings);
    
    // Calculate savings percentage relative to revenue
    const savingsPercentage = (savingsAmount / revenue) * 100;
    
    return {
      amount: Math.round(savingsAmount),
      percentage: parseFloat(savingsPercentage.toFixed(1))
    };
  };

  // Calculate actual profit increase based on revenue
  const calculateActualProfit = () => {
    const revenue = parseFloat(formData.revenue.replace(/[^0-9.]/g, ''));
    if (isNaN(revenue)) return 0;
    
    // Use the profit increase percentage from analysis
    const profitPercentage = parseFloat(analysis.profit_increase);
    
    // Calculate the actual profit increase amount
    const profitAmount = (revenue * (profitPercentage / 100));
    
    return {
      amount: Math.round(profitAmount),
      percentage: parseFloat(profitPercentage.toFixed(1))
    };
  };

  const analysesForGrid = analysis.allAnalyses?.map((item: any) => {
    const savingsCalc = calculateActualSavings();
    const profitCalc = calculateActualProfit();
    
    return {
      ...item,
      savings: savingsCalc.amount.toString(),
      profit_increase: profitCalc.percentage.toString(),
      explanation: item.explanation,
      marketingStrategy: item.marketing_strategy,
      actualProfitIncrease: profitCalc.amount.toString(),
      savingsPercentage: savingsCalc.percentage.toString()
    };
  }) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: calculateActualSavings().amount.toString(),
    profit_increase: calculateActualProfit().percentage.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy,
    actualProfitIncrease: calculateActualProfit().amount.toString(),
    savingsPercentage: calculateActualSavings().percentage.toString()
  }];

  console.log("ReportContent - Analyses for grid:", analysesForGrid);

  return (
    <div id="detailed-report" className="space-y-6 bg-white p-4 sm:p-8 rounded-lg max-w-full overflow-x-hidden">
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