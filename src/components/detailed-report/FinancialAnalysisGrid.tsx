import { AnalysisGrid } from "../AnalysisGrid";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";
import { DetailedFormData } from "@/types/analysis";

interface FinancialAnalysisGridProps {
  analysis: any;
  formData: DetailedFormData;
}

export const FinancialAnalysisGrid = ({ analysis, formData }: FinancialAnalysisGridProps) => {
  const revenue = calculateRevenue(formData.revenue);
  
  const analysesForGrid = analysis.allAnalyses?.map((item: any) => {
    const financials = calculateFinancials(revenue, item.department);
    
    return {
      ...item,
      savings: financials.savings.amount.toString(),
      profit_increase: financials.profit.percentage.toString(),
      explanation: item.explanation,
      marketingStrategy: item.marketingStrategy,
      actualProfitIncrease: financials.profit.amount.toString(),
      savingsPercentage: financials.savings.percentage.toString()
    };
  }) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: calculateFinancials(revenue, analysis.department).savings.amount.toString(),
    profit_increase: calculateFinancials(revenue, analysis.department).profit.percentage.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy,
    actualProfitIncrease: calculateFinancials(revenue, analysis.department).profit.amount.toString(),
    savingsPercentage: calculateFinancials(revenue, analysis.department).savings.percentage.toString()
  }];

  return (
    <div className="overflow-x-auto">
      <AnalysisGrid analyses={analysesForGrid} />
    </div>
  );
};