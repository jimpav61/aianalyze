import { AnalysisGrid } from "../AnalysisGrid";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";
import { DetailedFormData } from "@/types/analysis";

interface FinancialAnalysisGridProps {
  analysis: any;
  formData: DetailedFormData;
}

export const FinancialAnalysisGrid = ({ analysis, formData }: FinancialAnalysisGridProps) => {
  const revenue = calculateRevenue(formData.revenue);
  console.log('Calculated revenue:', revenue);
  
  const analysesForGrid = analysis.allAnalyses?.map((item: any) => {
    const financials = calculateFinancials(revenue, item.department);
    console.log('Financials for', item.department, ':', financials);
    
    return {
      ...item,
      savings: financials.savingsAmount.toString(),
      profit_increase: financials.profitPercentage.toString(),
      explanation: item.explanation,
      marketingStrategy: item.marketingStrategy,
      actualProfitIncrease: financials.profitAmount.toString(),
      savingsPercentage: financials.savingsPercentage.toString()
    };
  }) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: calculateFinancials(revenue, analysis.department).savingsAmount.toString(),
    profit_increase: calculateFinancials(revenue, analysis.department).profitPercentage.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy,
    actualProfitIncrease: calculateFinancials(revenue, analysis.department).profitAmount.toString(),
    savingsPercentage: calculateFinancials(revenue, analysis.department).savingsPercentage.toString()
  }];

  return (
    <div className="overflow-x-auto">
      <AnalysisGrid analyses={analysesForGrid} />
    </div>
  );
};