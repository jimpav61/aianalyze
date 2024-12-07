import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { DetailedAnalysisForm } from "./detailed-analysis/DetailedAnalysisForm";
import { DetailedReport } from "./DetailedReport";
import { useToast } from "./ui/use-toast";
import { DetailedFormData, AnalysisData } from "@/types/analysis";

interface DetailedAnalysisDialogProps {
  isOpen: boolean;
  onClose: () => void;
  industry?: string;
  analysis?: {
    id: string;
    industry?: string;
    department: string;
    function?: string;
    bot_function?: string;
    savings: string | number;
    profit_increase: string | number;
    explanation: string;
    marketing_strategy?: string;
    marketingStrategy?: string;
  };
}

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  industry,
  analysis,
}: DetailedAnalysisDialogProps) => {
  const { toast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const [formData, setFormData] = useState<DetailedFormData | null>(null);

  console.log("DetailedAnalysisDialog - Initial props:", { industry, analysis });

  const handleSubmit = (data: DetailedFormData) => {
    console.log("DetailedAnalysisDialog - handleSubmit called with:", { data, analysis });
    
    if (!analysis || typeof analysis !== 'object') {
      console.error("DetailedAnalysisDialog - Missing or invalid analysis data:", analysis);
      toast({
        title: "Missing Analysis Data",
        description: "Please complete the initial analysis first.",
        variant: "destructive",
      });
      return;
    }

    // Create a properly typed analysis object
    const processedAnalysis: AnalysisData = {
      industry: analysis.industry || industry || "Unknown Industry",
      department: analysis.department || "General",
      bot_function: analysis.bot_function || analysis.function || "General Automation",
      savings: typeof analysis.savings === 'string' ? parseFloat(analysis.savings) : analysis.savings || 0,
      profit_increase: typeof analysis.profit_increase === 'string' ? parseFloat(analysis.profit_increase) : analysis.profit_increase || 0,
      explanation: analysis.explanation || "Custom implementation strategy",
      marketing_strategy: analysis.marketing_strategy || analysis.marketingStrategy || "Custom Strategy",
    };

    console.log("DetailedAnalysisDialog - Processed analysis:", processedAnalysis);
    
    setFormData(data);
    setShowReport(true);
    
    setTimeout(() => {
      toast({
        title: "Analysis Complete",
        description: "Your detailed analysis report is ready.",
        duration: 3000,
      });
    }, 100);
  };

  const handleClose = () => {
    console.log("DetailedAnalysisDialog - Closing dialog");
    setFormData(null);
    setShowReport(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {!showReport ? (
            <>
              <DialogHeader>
                <DialogTitle>Detailed Analysis Request</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <DetailedAnalysisForm 
                  onSubmit={handleSubmit} 
                  industry={industry}
                  analysis={analysis}
                />
              </div>
            </>
          ) : (
            formData && analysis && (
              <DetailedReport 
                data={formData} 
                analysis={{
                  industry: analysis.industry || industry || "Unknown Industry",
                  department: analysis.department || "General",
                  bot_function: analysis.bot_function || analysis.function || "General Automation",
                  savings: typeof analysis.savings === 'string' ? parseFloat(analysis.savings) : analysis.savings || 0,
                  profit_increase: typeof analysis.profit_increase === 'string' ? parseFloat(analysis.profit_increase) : analysis.profit_increase || 0,
                  explanation: analysis.explanation || "Custom implementation strategy",
                  marketing_strategy: analysis.marketing_strategy || analysis.marketingStrategy || "Custom Strategy",
                }}
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};