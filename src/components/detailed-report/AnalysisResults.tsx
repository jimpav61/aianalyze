interface AnalysisResultsProps {
  analysis: {
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
  };
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Analysis Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="font-medium text-gray-700">Department:</p>
          <p className="text-gray-600 mb-2">{analysis.department}</p>
          <p className="font-medium text-gray-700">Function:</p>
          <p className="text-gray-600 mb-2">{analysis.bot_function}</p>
          <p className="font-medium text-gray-700">Implementation Strategy:</p>
          <p className="text-gray-600">{analysis.explanation}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">Projected Annual Savings:</p>
          <p className="text-green-600 font-bold">${analysis.savings.toLocaleString()}</p>
          <p className="font-medium text-gray-700">Projected Profit Increase:</p>
          <p className="text-green-600 font-bold">{analysis.profit_increase}%</p>
          <p className="font-medium text-gray-700 mt-4">Marketing Strategy:</p>
          <p className="text-gray-600">{analysis.marketing_strategy}</p>
        </div>
      </div>
    </div>
  );
};