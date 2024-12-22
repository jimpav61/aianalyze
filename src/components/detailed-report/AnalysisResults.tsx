interface AnalysisResultsProps {
  analyses: Array<{
    department: string;
    function: string;
    savings: string;
    profit_increase: string;
    explanation: string;
    marketingStrategy: string;
    actualProfitIncrease: string;
  }>;
  revenue: string;
}

export const AnalysisResults = ({ analyses, revenue }: AnalysisResultsProps) => {
  // Use the first analysis as the primary one for the summary
  const primaryAnalysis = analyses[0];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="font-medium text-gray-700">Primary Department:</p>
          <p className="text-gray-600 mb-2">{primaryAnalysis.department}</p>
          <p className="font-medium text-gray-700">Primary Function:</p>
          <p className="text-gray-600 mb-2">{primaryAnalysis.function}</p>
          <p className="font-medium text-gray-700">Implementation Strategy:</p>
          <p className="text-gray-600">{primaryAnalysis.explanation}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Projected Annual Savings:</p>
          <p className="text-green-600 font-bold">${parseInt(primaryAnalysis.savings).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Based on your annual revenue of {revenue}</p>
          
          <p className="font-medium text-gray-700 mt-4">Projected Profit Increase:</p>
          <p className="text-green-600 font-bold">${parseInt(primaryAnalysis.actualProfitIncrease).toLocaleString()}</p>
          <p className="text-sm text-gray-500">
            {primaryAnalysis.profit_increase}% increase on current revenue
          </p>
          
          <p className="font-medium text-gray-700 mt-4">Marketing Strategy:</p>
          <p className="text-gray-600">{primaryAnalysis.marketingStrategy}</p>
        </div>
      </div>
      
      {analyses.length > 1 && (
        <div className="mt-6">
          <p className="font-medium text-gray-700 mb-2">Additional Department Analyses:</p>
          <div className="space-y-4">
            {analyses.slice(1).map((analysis, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{analysis.department}</p>
                <p className="text-sm text-gray-600">{analysis.function}</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <p className="text-sm">Savings: ${parseInt(analysis.savings).toLocaleString()}</p>
                  <p className="text-sm">Additional Profit: ${parseInt(analysis.actualProfitIncrease).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};