import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { IndustrySelector } from "../IndustrySelector";

interface HeroActionsProps {
  selectedIndustry?: string;
  setSelectedIndustry: (industry: string) => void;
  isLoading: boolean;
  handleAnalyze: () => void;
  onRequestDetailedReport: () => void;
}

export const HeroActions = ({
  selectedIndustry,
  setSelectedIndustry,
  isLoading,
  handleAnalyze,
  onRequestDetailedReport,
}: HeroActionsProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm font-medium text-gray-600 mb-2">
        Select your industry to get started
      </div>
      <IndustrySelector
        value={selectedIndustry}
        onSelect={setSelectedIndustry}
      />
      <Button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="bg-[#f65228] hover:bg-[#f65228]/90 w-full animate-[fadeIn_0.5s_ease-out] animate-once"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Start Your Free Analysis Now"
        )}
      </Button>
      <Button
        variant="outline"
        onClick={onRequestDetailedReport}
        className="w-full"
      >
        Book A Demo
      </Button>
      <p className="text-sm font-bold text-gray-600 mt-4">
        Get instant insights and unlock a detailed report sent to your email
      </p>
    </div>
  );
};