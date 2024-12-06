import { useState } from "react";
import { Logo } from "@/components/Logo";
import { IndustrySelector } from "@/components/IndustrySelector";
import { AnalysisGrid } from "@/components/AnalysisGrid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateAnalysis } from "@/utils/groq";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleAnalyze = async () => {
    if (!selectedIndustry) {
      toast({
        title: "Please select an industry",
        description: "An industry must be selected to generate analysis",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalyses([]); // Clear previous results

    try {
      console.log('Starting analysis for industry:', selectedIndustry);
      const results = await generateAnalysis(selectedIndustry);
      console.log('Analysis completed. Results:', results);
      
      if (!results || results.length === 0) {
        toast({
          title: "No analysis available",
          description: `No bot recommendations found for ${selectedIndustry}`,
          variant: "destructive",
        });
        return;
      }

      setAnalyses(results);
      toast({
        title: "Analysis complete",
        description: isMobile 
          ? <span>Found {results.length} recommendations for {selectedIndustry}. <span className="text-[#f65228]">Scroll down to view them!</span></span>
          : `Found ${results.length} recommendations for ${selectedIndustry}`,
      });
    } catch (error) {
      console.error('Error in handleAnalyze:', error);
      toast({
        title: "Error generating analysis",
        description: "There was a problem generating the analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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

        {analyses.length > 0 && <AnalysisGrid analyses={analyses} />}
      </main>
    </div>
  );
};

export default Index;