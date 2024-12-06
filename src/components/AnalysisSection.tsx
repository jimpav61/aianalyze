import { AnalysisGrid } from "./AnalysisGrid";
import { HomeButton } from "./HomeButton";

interface AnalysisSectionProps {
  analyses: any[];
  isMobile: boolean;
  analysisGridRef: React.RefObject<HTMLDivElement>;
}

export const AnalysisSection = ({ analyses, isMobile, analysisGridRef }: AnalysisSectionProps) => {
  return (
    <>
      <div ref={analysisGridRef}>
        {analyses.length > 0 && <AnalysisGrid analyses={analyses} />}
      </div>

      {isMobile && analyses.length > 0 && (
        <div className="mt-8 flex justify-center">
          <HomeButton />
        </div>
      )}
    </>
  );
};