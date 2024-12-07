import { AnalysisCard } from "./AnalysisCard";

interface Analysis {
  id: string;
  department: string;
  function: string;
  savings: string;
  profit_increase: string;
  explanation: string;
  marketingStrategy: string;
}

interface AnalysisGridProps {
  analyses: Analysis[];
}

export const AnalysisGrid = ({ analyses }: AnalysisGridProps) => {
  console.log('AnalysisGrid - Received analyses:', analyses);

  if (!analyses || analyses.length === 0) {
    console.log('AnalysisGrid - No analyses to display');
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {analyses.map((analysis, index) => {
        console.log(`AnalysisGrid - Rendering analysis ${index + 1}:`, analysis);
        return (
          <AnalysisCard 
            key={analysis.id} 
            department={analysis.department}
            function={analysis.function}
            savings={analysis.savings}
            profit_increase={analysis.profit_increase}
            explanation={analysis.explanation}
            marketingStrategy={analysis.marketingStrategy}
          />
        );
      })}
    </div>
  );
};