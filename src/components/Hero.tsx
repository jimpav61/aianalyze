import { useState } from "react";
import { DetailedAnalysisDialog } from "./DetailedAnalysisDialog";
import { HeroHeader } from "./hero/HeroHeader";
import { BenefitsList } from "./hero/BenefitsList";
import { HeroActions } from "./hero/HeroActions";

interface HeroProps {
  selectedIndustry?: string;
  setSelectedIndustry: (industry: string) => void;
  isLoading: boolean;
  handleAnalyze: () => void;
  analyses?: any[];
}

export const Hero = ({
  selectedIndustry,
  setSelectedIndustry,
  isLoading,
  handleAnalyze,
  analyses = [],
}: HeroProps) => {
  const [showDetailedDialog, setShowDetailedDialog] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);

  const handleRequestDetailedReport = () => {
    console.log("Hero - Opening detailed dialog with:", {
      industry: selectedIndustry,
      analyses: analyses
    });

    const firstAnalysis = analyses && analyses.length > 0 ? analyses[0] : null;
    console.log("Hero - Selected analysis:", firstAnalysis);

    setCurrentAnalysis(firstAnalysis);
    setShowDetailedDialog(true);
  };

  const handleAnalyzeClick = async () => {
    await handleAnalyze();
    handleRequestDetailedReport();
  };

  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <HeroHeader />

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <BenefitsList position="left" />
          <HeroActions
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            isLoading={isLoading}
            handleAnalyze={handleAnalyzeClick}
            onRequestDetailedReport={handleRequestDetailedReport}
          />
        </div>
      </div>

      <p className="text-gray-600 text-lg font-medium mb-8">Sample Report Preview</p>

      <DetailedAnalysisDialog
        isOpen={showDetailedDialog}
        onClose={() => setShowDetailedDialog(false)}
        industry={selectedIndustry}
        analysis={currentAnalysis}
      />
    </div>
  );
};