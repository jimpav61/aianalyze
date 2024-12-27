import { AnalysisGrid } from "./AnalysisGrid";

interface AnalysisSectionProps {
  analyses: any[];
  isMobile: boolean;
  analysisGridRef: React.RefObject<HTMLDivElement>;
}

export const AnalysisSection = ({ analyses, isMobile, analysisGridRef }: AnalysisSectionProps) => {
  if (analyses.length === 0) {
    return null;
  }

  return (
    <div ref={analysisGridRef} className="mt-12">
      <AnalysisGrid analyses={analyses} />
    </div>
  );
};