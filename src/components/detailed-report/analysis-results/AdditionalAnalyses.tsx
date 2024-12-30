interface Analysis {
  department: string;
  function: string;
  savings: string;
  profit_increase: string;
  explanation: string;
  marketingStrategy: string;
}

interface AdditionalAnalysesProps {
  analyses: Analysis[];
  revenueAmount: number;
  formatCurrency: (value: string | number) => string;
  formatPercentage: (value: string | number) => string;
}

export const AdditionalAnalyses = ({ 
  analyses, 
  revenueAmount, 
  formatCurrency, 
  formatPercentage 
}: AdditionalAnalysesProps) => {
  if (!analyses || analyses.length === 0) return null;

  return (
    <div className="mt-8">
      <h4 className="font-medium text-gray-700 mb-4">Additional Department Analyses:</h4>
      <div className="space-y-4">
        {analyses.map((analysis, index) => (
          <div key={index} className="bg-[#F8F9FC] p-4 rounded-lg border border-gray-100">
            <div className="mb-4">
              <p className="font-medium text-gray-700 mb-2">{analysis.department}</p>
              <p className="text-[#f65228] whitespace-pre-line leading-relaxed break-words">{analysis.function}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">Savings: <span className="text-[#f65228] font-semibold">
                  {formatCurrency(analysis.savings)}
                </span></p>
              </div>
              <div>
                <p className="text-gray-700">Profit Increase: <span className="text-[#f65228] font-semibold">
                  {formatPercentage(analysis.profit_increase)}
                </span></p>
              </div>
            </div>
            {analysis.explanation && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">{analysis.explanation}</p>
              </div>
            )}
            {analysis.marketingStrategy && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">{analysis.marketingStrategy}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};