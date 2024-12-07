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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {analyses.map((analysis) => (
        <AnalysisCard key={analysis.id} {...analysis} />
      ))}
    </div>
  );
};