import { Card } from "./ui/card";

interface Analysis {
  id?: string;
  department: string;
  function?: string;
  savings: string;
  profit_increase: string;
  explanation: string;
  marketingStrategy?: string;
}

interface AnalysisGridProps {
  analyses: Analysis[];
}

export const AnalysisGrid = ({ analyses }: AnalysisGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {analyses.map((analysis, index) => (
        <Card key={analysis.id || index} className="p-6 bg-white/50 backdrop-blur-sm">
          <div>
            <h4 className="text-lg font-semibold mb-2">{analysis.department}</h4>
            <p className="text-sm text-gray-600 mb-4">{analysis.function}</p>
            
            <div className="mb-4">
              <p className="font-medium text-gray-700">Projected Annual Savings:</p>
              <p className="text-green-600 font-bold">${analysis.savings}</p>
              <p className="font-medium text-gray-700 mt-2">Profit Increase:</p>
              <p className="text-green-600 font-bold flex items-center gap-1">
                {analysis.profit_increase}%
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </p>
            </div>
            
            <div>
              <p className="font-medium text-gray-700">Implementation Strategy:</p>
              <p className="text-gray-600 text-sm mt-1">{analysis.explanation}</p>
            </div>
            
            {analysis.marketingStrategy && (
              <div className="mt-4">
                <p className="font-medium text-gray-700">Marketing Strategy:</p>
                <p className="text-gray-600 text-sm mt-1">{analysis.marketingStrategy}</p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};