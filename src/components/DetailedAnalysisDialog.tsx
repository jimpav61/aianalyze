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
    industry: string; // Made required
    department: string;
    function?: string;
    bot_function: string; // Made required
    savings: number; // Changed type to number
    profit_increase: number; // Changed type to number
    explanation: string;
    marketing_strategy: string; // Made required
  } | null;
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

  const getProcessedAnalysis = (): AnalysisData => {
    console.log("DetailedAnalysisDialog - Processing analysis data:", analysis);
    
    const defaultAnalysis: AnalysisData = {
      industry: industry || "Unknown Industry",
      department: "General",
      bot_function: "General Automation",
      savings: 0,
      profit_increase: 0,
      explanation: "Custom implementation strategy",
      marketing_strategy: "Custom marketing strategy",
    };

    if (!analysis) {
      console.log("DetailedAnalysisDialog - Using default analysis");
      return defaultAnalysis;
    }

    // Process all fields with proper fallbacks
    const processedAnalysis: AnalysisData = {
      industry: analysis.industry,
      department: analysis.department,
      bot_function: analysis.bot_function,
      savings: typeof analysis.savings === 'number' ? analysis.savings : 0,
      profit_increase: typeof analysis.profit_increase === 'number' ? analysis.profit_increase : 0,
      explanation: analysis.explanation,
      marketing_strategy: analysis.marketing_strategy
    };

    console.log("DetailedAnalysisDialog - Processed analysis:", processedAnalysis);
    return processedAnalysis;
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
            formData && (
              <DetailedReport 
                data={formData} 
                analysis={getProcessedAnalysis()}
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};