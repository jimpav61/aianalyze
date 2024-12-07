import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AnalysisSection } from "@/components/AnalysisSection";
import { HomeButton } from "@/components/HomeButton";
import { ContactForm } from "@/components/ContactForm";
import { useToast } from "@/components/ui/use-toast";
import { generateAnalysis } from "@/utils/groq";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const analysisGridRef = useRef<HTMLDivElement>(null);

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

      // Transform the data to match the expected format
      const transformedResults = results.map(result => ({
        ...result,
        bot_function: result.function || result.bot_function,
        profit_increase: Number(result.profit_increase),
        savings: Number(result.savings)
      }));

      console.log('Transformed results:', transformedResults);
      setAnalyses(transformedResults);
      setHasSubmitted(true);
      
      toast({
        title: "Analysis complete",
        description: isMobile 
          ? <span>Found {results.length} recommendations for {selectedIndustry}. <span className="text-[#f65228]">Scroll down to view them!</span></span>
          : `Found ${results.length} recommendations for ${selectedIndustry}`,
      });

      if (isMobile && analysisGridRef.current) {
        setTimeout(() => {
          analysisGridRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
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
      <Header isMobile={isMobile} />

      <main className="container mx-auto px-4 py-8">
        <Hero
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          isLoading={isLoading}
          handleAnalyze={handleAnalyze}
        />

        <AnalysisSection
          analyses={analyses}
          isMobile={isMobile}
          analysisGridRef={analysisGridRef}
        />

        {!isMobile && !hasSubmitted && analyses.length === 0 && (
          <div className="mt-16 flex flex-col items-center space-y-12">
            <ContactForm />
            <HomeButton />
          </div>
        )}

        {hasSubmitted && (
          <div className="mt-8 flex justify-center">
            <HomeButton />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;