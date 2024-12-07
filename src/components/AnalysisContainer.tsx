import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateAnalysis } from "@/utils/groq";
import { Hero } from "./Hero";
import { AnalysisSection } from "./AnalysisSection";
import { HomeButton } from "./HomeButton";
import { ContactForm } from "./ContactForm";

export const AnalysisContainer = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();
  const analysisGridRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    console.log('Starting analysis for industry:', selectedIndustry);
    
    if (!selectedIndustry) {
      console.log('No industry selected');
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
      console.log('Fetching analysis data...');
      const results = await generateAnalysis(selectedIndustry);
      console.log('Analysis results:', results);
      
      if (!results || results.length === 0) {
        console.log('No results returned');
        toast({
          title: "No analysis available",
          description: `No recommendations found for ${selectedIndustry}`,
          variant: "destructive",
        });
        return;
      }

      console.log('Setting analyses with results:', results);
      setAnalyses(results);
      setHasSubmitted(true);
      
      toast({
        title: "Analysis complete",
        description: `Found ${results.length} recommendations for ${selectedIndustry}`,
      });

      if (analysisGridRef.current) {
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

      {!hasSubmitted && analyses.length === 0 && (
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
    </>
  );
};