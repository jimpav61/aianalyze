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
  analyses?: any[]; // Add analyses prop
}

export const Hero = ({
  selectedIndustry,
  setSelectedIndustry,
  isLoading,
  handleAnalyze,
  analyses = [], // Add analyses with default empty array
}: HeroProps) => {
  const [showDetailedDialog, setShowDetailedDialog] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);

  const handleRequestDetailedReport = () => {
    console.log("Hero - Opening detailed dialog with:", {
      industry: selectedIndustry,
      analyses: analyses
    });

    // Get the first analysis if available
    const firstAnalysis = analyses && analyses.length > 0 ? analyses[0] : null;
    console.log("Hero - Selected analysis:", firstAnalysis);

    setCurrentAnalysis(firstAnalysis);
    setShowDetailedDialog(true);
  };

  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <HeroHeader />

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          <BenefitsList position="left" />
          
          <HeroActions
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
            isLoading={isLoading}
            handleAnalyze={handleAnalyze}
            onRequestDetailedReport={handleRequestDetailedReport}
          />
          
          <BenefitsList position="right" />
        </div>
      </div>

      <p className="text-gray-600 text-lg font-medium mb-8">or contact us below</p>

      <DetailedAnalysisDialog
        isOpen={showDetailedDialog}
        onClose={() => setShowDetailedDialog(false)}
        industry={selectedIndustry}
        analysis={currentAnalysis}
      />
    </div>
  );
};