import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { generateAnalysis } from "@/utils/groq";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const analysisGridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedIndustry) {
      toast({
        title: "Error",
        description: "Please select an industry first",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    setIsLoading(true);
    try {
      const results = await generateAnalysis(selectedIndustry);
      console.log("Analysis results:", results);
      setAnalyses(results);
    } catch (error) {
      console.error("Error generating analysis:", error);
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset analyses when industry changes
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    setAnalyses([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={handleIndustryChange}
          isLoading={isLoading}
          handleAnalyze={handleAnalyze}
          analyses={analyses}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;