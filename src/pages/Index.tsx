import { useState } from "react";
import { Logo } from "@/components/Logo";
import { IndustrySelector } from "@/components/IndustrySelector";
import { AnalysisGrid } from "@/components/AnalysisGrid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data - replace with actual API call
const mockAnalyses = {
  "Retail": [
    {
      id: "1",
      department: "Customer Service",
      function: "24/7 Customer Support Bot",
      savings: "$50,000/year",
      profit: "+15%",
    },
    {
      id: "2",
      department: "Sales",
      function: "Product Recommendation Bot",
      savings: "$30,000/year",
      profit: "+20%",
    },
    {
      id: "3",
      department: "Inventory",
      function: "Stock Management Bot",
      savings: "$40,000/year",
      profit: "+10%",
    },
  ],
};

const Index = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedIndustry) {
      toast({
        title: "Please select an industry",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
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
            AI Bot Placement Analyzer
          </h1>
          <p className="text-gray-600 mb-8">
            Discover the optimal AI bot placement strategy for your business
          </p>

          <div className="flex flex-col items-center gap-4">
            <IndustrySelector
              value={selectedIndustry}
              onSelect={setSelectedIndustry}
            />
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-chatsites hover:bg-chatsites/90"
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
        </div>

        {selectedIndustry && mockAnalyses[selectedIndustry] && (
          <AnalysisGrid analyses={mockAnalyses[selectedIndustry]} />
        )}
      </main>
    </div>
  );
};

export default Index;