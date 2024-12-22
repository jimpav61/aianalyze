import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";
import { Card } from "../ui/card";

interface AnalysisResultsProps {
  analyses: Array<{
    department: string;
    function: string;
    savings: string;
    profit_increase: string;
    explanation: string;
    marketingStrategy: string;
    actualProfitIncrease: string;
    savingsPercentage: string;
  }>;
  revenue: string;
}

export const AnalysisResults = ({ analyses, revenue }: AnalysisResultsProps) => {
  const primaryAnalysis = analyses[0];
  const revenueAmount = calculateRevenue(revenue);
  const financials = calculateFinancials(revenueAmount, primaryAnalysis.department);

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    return !isNaN(num) ? `$${num.toLocaleString()}` : '$0';
  };

  const formatPercentage = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) ? `${num}%` : '0%';
  };

  return (
    <div className="space-y-6 section-card">
      <h3 className="text-xl font-semibold text-[#1A1F2C] mb-4">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-[#E5DEFF]">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-[#403E43] mb-2">Primary Department:</p>
              <p className="text-[#f65228]">{primaryAnalysis.department}</p>
            </div>
            <div>
              <p className="font-medium text-[#403E43] mb-2">Primary Function:</p>
              <p className="text-[#f65228]">{primaryAnalysis.function}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-[#E5DEFF]">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-[#403E43] mb-2">Projected Annual Savings:</p>
              <p className="text-[#f65228] text-2xl font-semibold">{formatCurrency(financials.savingsAmount)}</p>
              <p className="text-sm text-[#f65228]">Based on your annual revenue of {revenue}</p>
            </div>
            <div>
              <p className="font-medium text-[#403E43] mb-2">Projected Profit Increase:</p>
              <p className="text-[#f65228] text-2xl font-semibold">{formatPercentage(financials.profitPercentage)}</p>
              <p className="text-sm text-[#f65228]">Based on your current revenue</p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6 mt-6">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-[#403E43] mb-2">Implementation Strategy:</p>
            <p className="text-[#f65228]">{primaryAnalysis.explanation}</p>
          </div>
          <div>
            <p className="font-medium text-[#403E43] mb-2">Marketing Strategy:</p>
            <p className="text-[#f65228]">{primaryAnalysis.marketingStrategy}</p>
          </div>
        </div>
      </Card>
      
      {analyses.length > 1 && (
        <div className="mt-6">
          <p className="font-medium text-[#403E43] mb-2">Additional Department Analyses:</p>
          <div className="space-y-4">
            {analyses.slice(1).map((analysis, index) => {
              const deptFinancials = calculateFinancials(revenueAmount, analysis.department);
              return (
                <Card key={index} className="p-6 bg-[#E5DEFF]">
                  <p className="font-medium text-[#403E43] mb-2">{analysis.department}</p>
                  <p className="text-[#f65228] mb-4">{analysis.function}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#403E43]">Savings: <span className="text-[#f65228] font-semibold">{formatCurrency(deptFinancials.savingsAmount)}</span></p>
                      <p className="text-sm text-[#f65228]">({formatPercentage(deptFinancials.savingsPercentage)} of revenue)</p>
                    </div>
                    <div>
                      <p className="text-[#403E43]">Additional Profit: <span className="text-[#f65228] font-semibold">{formatCurrency(deptFinancials.profitAmount)}</span></p>
                      <p className="text-sm text-[#f65228]">({formatPercentage(deptFinancials.profitPercentage)} increase)</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};