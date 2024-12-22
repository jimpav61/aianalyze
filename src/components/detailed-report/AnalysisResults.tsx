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
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-[#1A1F2C] mb-6">Analysis Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-2">Primary Department:</p>
                <p className="text-[#f65228] text-lg">{primaryAnalysis.department}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Primary Function:</p>
                <p className="text-[#f65228] text-lg whitespace-pre-wrap">{primaryAnalysis.function}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-700 mb-2">Projected Annual Savings:</p>
                <p className="text-[#f65228] text-2xl font-semibold">{formatCurrency(financials.savingsAmount)}</p>
                <p className="text-sm text-gray-600">Based on your annual revenue of {revenue}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Projected Profit Increase:</p>
                <p className="text-[#f65228] text-2xl font-semibold">{formatPercentage(financials.profitPercentage)}</p>
                <p className="text-sm text-gray-600">Based on your current revenue</p>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6 mt-6 bg-[#F8F9FC] border border-gray-100">
          <div className="space-y-6">
            <div>
              <p className="font-medium text-gray-700 mb-3">Implementation Strategy:</p>
              <p className="text-[#f65228] whitespace-pre-wrap leading-relaxed">{primaryAnalysis.explanation}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-3">Marketing Strategy:</p>
              <p className="text-[#f65228] whitespace-pre-wrap leading-relaxed">{primaryAnalysis.marketingStrategy}</p>
            </div>
          </div>
        </Card>
        
        {analyses.length > 1 && (
          <div className="mt-8">
            <h4 className="font-medium text-gray-700 mb-4">Additional Department Analyses:</h4>
            <div className="space-y-4">
              {analyses.slice(1).map((analysis, index) => {
                const deptFinancials = calculateFinancials(revenueAmount, analysis.department);
                return (
                  <Card key={index} className="p-6 bg-[#F8F9FC] border border-gray-100">
                    <div className="mb-4">
                      <p className="font-medium text-gray-700 mb-2">{analysis.department}</p>
                      <p className="text-[#f65228] whitespace-pre-wrap">{analysis.function}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-700">Savings: <span className="text-[#f65228] font-semibold">{formatCurrency(deptFinancials.savingsAmount)}</span></p>
                        <p className="text-sm text-gray-600">({formatPercentage(deptFinancials.savingsPercentage)} of revenue)</p>
                      </div>
                      <div>
                        <p className="text-gray-700">Additional Profit: <span className="text-[#f65228] font-semibold">{formatCurrency(deptFinancials.profitAmount)}</span></p>
                        <p className="text-sm text-gray-600">({formatPercentage(deptFinancials.profitPercentage)} increase)</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};