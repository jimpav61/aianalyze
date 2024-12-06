import { IndustrySelector } from "./IndustrySelector";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

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
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-bold mb-4">
        AI Assistant Placement Analyzer
      </h1>
      <p className="text-gray-600 mb-8">
        Discover the optimal AI Assistant placement strategy for your business
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
        {/* Left bullet points */}
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
            <p className="text-sm text-gray-600">Identify ideal AI assistant placement opportunities</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
            <p className="text-sm text-gray-600">Maximize industry-specific customer engagement potential</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
            <p className="text-sm text-gray-600">Optimize business workflows with tailored insights</p>
          </div>
        </div>

        {/* Industry selector */}
        <div className="flex flex-col items-center gap-4">
          <IndustrySelector
            value={selectedIndustry}
            onSelect={setSelectedIndustry}
          />
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="bg-[#f65228] hover:bg-[#f65228]/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Industry"
            )}
          </Button>
        </div>

        {/* Right bullet points */}
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
            <p className="text-sm text-gray-600">Boost efficiency through data-driven AI strategies</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
            <p className="text-sm text-gray-600">Discover high-impact AI use case solutions</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
            <p className="text-sm text-gray-600">Transform operations with actionable AI recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};