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

  const formatText = (text: string) => {
    return text?.trim().replace(/\s+/g, ' ') || '';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">Primary Department:</p>
            <p className="text-gray-600">{formatText(primaryAnalysis.department)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Primary Function:</p>
            <p className="text-gray-600">{formatText(primaryAnalysis.function)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Implementation Strategy:</p>
            <p className="text-gray-600">{formatText(primaryAnalysis.explanation)}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">Projected Annual Savings:</p>
            <div className="flex items-baseline gap-2">
              <p className="text-green-600 font-bold">{formatCurrency(financials.savingsAmount)}</p>
              <p className="text-green-600">({formatPercentage(financials.savingsPercentage)} of revenue)</p>
            </div>
            <p className="text-sm text-gray-500">Based on your annual revenue of {revenue}</p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700">Projected Profit Increase:</p>
            <div className="flex items-baseline gap-2">
              <p className="text-green-600 font-bold">{formatCurrency(financials.profitAmount)}</p>
              <p className="text-green-600">({formatPercentage(financials.profitPercentage)} increase)</p>
            </div>
            <p className="text-sm text-gray-500">Based on your current revenue</p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700">Marketing Strategy:</p>
            <p className="text-gray-600">{formatText(primaryAnalysis.marketingStrategy)}</p>
          </div>
        </div>
      </div>
      
      {analyses.length > 1 && (
        <div className="mt-6">
          <p className="font-medium text-gray-700 mb-2">Additional Department Analyses:</p>
          <div className="space-y-4">
            {analyses.slice(1).map((analysis, index) => {
              const deptFinancials = calculateFinancials(revenueAmount, analysis.department);
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">{formatText(analysis.department)}</p>
                  <p className="text-sm text-gray-600">{formatText(analysis.function)}</p>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">Savings: <span className="text-green-600">{formatCurrency(deptFinancials.savingsAmount)}</span></p>
                      <p className="text-green-600 text-xs">({formatPercentage(deptFinancials.savingsPercentage)} of revenue)</p>
                    </div>
                    <div>
                      <p className="text-sm">Additional Profit: <span className="text-green-600">{formatCurrency(deptFinancials.profitAmount)}</span></p>
                      <p className="text-green-600 text-xs">({formatPercentage(deptFinancials.profitPercentage)} increase)</p>
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