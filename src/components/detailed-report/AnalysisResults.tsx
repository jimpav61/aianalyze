import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";

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
      <h3 className="text-xl font-semibold text-[#1A1F2C] mb-4">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#E5DEFF] p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-[#403E43] mb-2">Primary Department:</p>
              <p className="text-[#f65228]">{primaryAnalysis.department}</p>
            </div>
            <div>
              <p className="font-medium text-[#403E43] mb-2">Primary Function:</p>
              <p className="text-[#f65228] whitespace-pre-wrap">{primaryAnalysis.function}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#E5DEFF] p-6 rounded-lg">
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
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <p className="font-medium text-[#403E43] mb-2">Implementation Strategy:</p>
          <p className="text-[#f65228] whitespace-pre-wrap">{primaryAnalysis.explanation}</p>
        </div>
        <div>
          <p className="font-medium text-[#403E43] mb-2">Marketing Strategy:</p>
          <p className="text-[#f65228] whitespace-pre-wrap">{primaryAnalysis.marketingStrategy}</p>
        </div>
      </div>
      
      {analyses.length > 1 && (
        <div className="mt-6">
          <p className="font-medium text-[#403E43] mb-2">Additional Department Analyses:</p>
          <div className="space-y-4">
            {analyses.slice(1).map((analysis, index) => {
              const deptFinancials = calculateFinancials(revenueAmount, analysis.department);
              return (
                <div key={index} className="bg-[#E5DEFF] p-6 rounded-lg">
                  <p className="font-medium text-[#403E43] mb-2">{analysis.department}</p>
                  <p className="text-[#f65228] mb-4 whitespace-pre-wrap">{analysis.function}</p>
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
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};