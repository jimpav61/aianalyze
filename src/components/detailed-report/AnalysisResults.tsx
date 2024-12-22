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
  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    return !isNaN(num) ? `$${num.toLocaleString()}` : '$0';
  };

  const formatPercentage = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) ? `${num}%` : '0%';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">Primary Department:</p>
            <p className="text-gray-600">{primaryAnalysis.department}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Primary Function:</p>
            <p className="text-gray-600 whitespace-pre-wrap">{primaryAnalysis.function}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Implementation Strategy:</p>
            <p className="text-gray-600 whitespace-pre-wrap">{primaryAnalysis.explanation}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700">Projected Annual Savings:</p>
            <div className="flex items-baseline gap-2">
              <p className="text-green-600 font-bold">{formatCurrency(primaryAnalysis.savings)}</p>
              <p className="text-green-600">({formatPercentage(primaryAnalysis.savingsPercentage)} of revenue)</p>
            </div>
            <p className="text-sm text-gray-500">Based on your annual revenue of {revenue}</p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700">Projected Profit Increase:</p>
            <div className="flex items-baseline gap-2">
              <p className="text-green-600 font-bold">{formatCurrency(primaryAnalysis.actualProfitIncrease)}</p>
              <p className="text-green-600">({formatPercentage(primaryAnalysis.profit_increase)} increase)</p>
            </div>
            <p className="text-sm text-gray-500">Based on your current revenue</p>
          </div>
          
          <div>
            <p className="font-medium text-gray-700">Marketing Strategy:</p>
            <p className="text-gray-600 whitespace-pre-wrap">{primaryAnalysis.marketingStrategy}</p>
          </div>
        </div>
      </div>
      
      {analyses.length > 1 && (
        <div className="mt-6">
          <p className="font-medium text-gray-700 mb-2">Additional Department Analyses:</p>
          <div className="space-y-4">
            {analyses.slice(1).map((analysis, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{analysis.department}</p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis.function}</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm">Savings: <span className="text-green-600">{formatCurrency(analysis.savings)}</span></p>
                    <p className="text-green-600 text-xs">({formatPercentage(analysis.savingsPercentage)} of revenue)</p>
                  </div>
                  <div>
                    <p className="text-sm">Additional Profit: <span className="text-green-600">{formatCurrency(analysis.actualProfitIncrease)}</span></p>
                    <p className="text-green-600 text-xs">({formatPercentage(analysis.profit_increase)} increase)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};