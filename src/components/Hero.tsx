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
}

export const Hero = ({
  selectedIndustry,
  setSelectedIndustry,
  isLoading,
  handleAnalyze,
}: HeroProps) => {
  const [showDetailedDialog, setShowDetailedDialog] = useState(false);

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
            onRequestDetailedReport={() => setShowDetailedDialog(true)}
          />
          
          <BenefitsList position="right" />
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-gray-600">
            Complete the analysis to receive your free initial report. Want deeper insights? 
            Fill out our detailed assessment form after your analysis to get a comprehensive implementation strategy.
          </p>
        </div>
      </div>

      <DetailedAnalysisDialog
        isOpen={showDetailedDialog}
        onClose={() => setShowDetailedDialog(false)}
        industry={selectedIndustry}
      />
    </div>
  );
};