import { IndustrySelector } from "./IndustrySelector";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { DetailedAnalysisDialog } from "./DetailedAnalysisDialog";
import { useState } from "react";

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
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f65228] to-orange-600 bg-clip-text text-transparent">
          Transform Your Business with AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover how AI assistants can revolutionize your operations and boost profitability with our industry-specific analysis
        </p>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
          {/* Left bullet points */}
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
              <p className="text-sm text-gray-600">Get instant AI placement recommendations tailored to your industry</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
              <p className="text-sm text-gray-600">Maximize efficiency with data-driven insights</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
              <p className="text-sm text-gray-600">Identify high-impact opportunities for AI integration</p>
            </div>
          </div>

          {/* Industry selector */}
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
                "Get Free Analysis"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDetailedDialog(true)}
              className="w-full"
            >
              Request Detailed Report
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Get instant insights and unlock a detailed report
            </p>
          </div>

          {/* Right bullet points */}
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
              <p className="text-sm text-gray-600">Receive customized implementation strategies</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
              <p className="text-sm text-gray-600">Learn from industry-specific success metrics</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f65228] mt-2"></div>
              <p className="text-sm text-gray-600">Get ROI projections based on real data</p>
            </div>
          </div>
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