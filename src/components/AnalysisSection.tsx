import { AnalysisGrid } from "./AnalysisGrid";
import { SampleReport } from "./SampleReport";

interface AnalysisSectionProps {
  analyses: any[];
  isMobile: boolean;
  analysisGridRef: React.RefObject<HTMLDivElement> | null;
}

export const AnalysisSection = ({ analyses, isMobile, analysisGridRef }: AnalysisSectionProps) => {
  // Show sample report only when analyses array is empty
  if (!analyses || analyses.length === 0) {
    return (
      <div className="mt-12">
        <SampleReport />
      </div>
    );
  }

  // Show the analysis grid when we have analyses
  return (
    <div ref={analysisGridRef} className="mt-12">
      <AnalysisGrid analyses={analyses} />
    </div>
  );
};