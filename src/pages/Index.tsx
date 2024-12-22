import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { AnalysisSection } from "@/components/AnalysisSection";
import { generateAnalysis } from "@/utils/groq";

const Index = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const analysisGridRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!selectedIndustry) return;

    setIsLoading(true);
    try {
      const results = await generateAnalysis(selectedIndustry);
      console.log("Analysis results:", results);
      setAnalyses(results);

      if (analysisGridRef.current) {
        analysisGridRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error generating analysis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
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