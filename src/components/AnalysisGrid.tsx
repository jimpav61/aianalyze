import { Card } from "./ui/card";
import { TrendingUp, DollarSign, LineChart } from "lucide-react";

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
        <Card 
          key={analysis.id || index} 
          className="p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 animate-[fadeIn_0.5s_ease-out] animate-once"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div>
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-[#9b87f5]" />
              {analysis.department}
            </h4>
            <p className="text-sm text-gray-600 mb-4">{analysis.function}</p>
            
            <div className="mb-4 space-y-3">
              <div className="p-3 bg-[#F8F9FC] rounded-lg">
                <p className="font-medium text-gray-700 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-[#9b87f5]" />
                  Projected Annual Savings:
                </p>
                <p className="text-[#9b87f5] font-bold text-lg">
                  ${analysis.savings}
                </p>
              </div>
              
              <div className="p-3 bg-[#F8F9FC] rounded-lg">
                <p className="font-medium text-gray-700 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#9b87f5]" />
                  Profit Increase:
                </p>
                <p className="text-[#9b87f5] font-bold text-lg">
                  {analysis.profit_increase}%
                </p>
              </div>
            </div>
            
            <div>
              <p className="font-medium text-gray-700">Implementation Strategy:</p>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {analysis.explanation}
              </p>
            </div>
            
            {analysis.marketingStrategy && (
              <div className="mt-4">
                <p className="font-medium text-gray-700">Marketing Strategy:</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {analysis.marketingStrategy}
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};