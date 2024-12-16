import { Hero } from "./Hero";
import { AnalysisSection } from "./AnalysisSection";
import { BottomSection } from "./BottomSection";
import { useAnalysis } from "@/hooks/useAnalysis";

export const AnalysisContainer = () => {
  const {
    selectedIndustry,
    setSelectedIndustry,
    analyses,
    isLoading,
    hasSubmitted,
    handleAnalyze,
    analysisGridRef
  } = useAnalysis();

  return (
    <>
      <Hero
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        isLoading={isLoading}
        handleAnalyze={handleAnalyze}
        analyses={analyses}
      />

      <AnalysisSection
        analyses={analyses}
        isMobile={false}
        analysisGridRef={analysisGridRef}
      />

      <BottomSection 
        hasSubmitted={hasSubmitted} 
        analysesLength={analyses.length} 
      />
    </>
  );
};