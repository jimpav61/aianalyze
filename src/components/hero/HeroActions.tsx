import { Button } from "../ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { IndustrySelector } from "../IndustrySelector";

interface HeroActionsProps {
  selectedIndustry?: string;
  setSelectedIndustry: (industry: string) => void;
  isLoading: boolean;
  handleAnalyze: () => void;
}

export const HeroActions = ({
  selectedIndustry,
  setSelectedIndustry,
  isLoading,
  handleAnalyze,
}: HeroActionsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <p className="text-sm font-bold text-gray-600 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#f65228]" />
        Start your <span className="uppercase">FREE</span> trial here
      </p>
      <IndustrySelector
        value={selectedIndustry}
        onSelect={setSelectedIndustry}
      />
      <Button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="bg-[#f65228] hover:bg-[#f65228]/90 w-full animate-[fadeIn_0.5s_ease-out] animate-once transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:hover:scale-100"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing your industry...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Start Your Free Analysis Now
          </>
        )}
      </Button>
    </div>
  );
};