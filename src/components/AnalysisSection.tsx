import { AnalysisGrid } from "./AnalysisGrid";
import { ContactForm } from "./ContactForm";
import { HomeButton } from "./HomeButton";

interface AnalysisSectionProps {
  analyses: any[];
  isMobile: boolean;
  analysisGridRef: React.RefObject<HTMLDivElement>;
}

export const AnalysisSection = ({ analyses, isMobile, analysisGridRef }: AnalysisSectionProps) => {
  if (analyses.length === 0) return null;

  return (
    <div ref={analysisGridRef} className="mt-12">
      <AnalysisGrid analyses={analyses} />
      {isMobile ? (
        <div className="mt-8">
          <ContactForm />
        </div>
      ) : (
        <div className="mt-8 flex justify-end">
          <HomeButton />
        </div>
      )}
    </div>
  );
};