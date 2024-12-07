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
  analysis?: AnalysisData;
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

  const handleSubmit = (data: DetailedFormData) => {
    console.log("Analysis data received:", analysis);
    console.log("Form data received:", data);
    
    if (!analysis || analysis.savings === undefined || analysis.profit_increase === undefined) {
      toast({
        title: "Missing Analysis Data",
        description: "Please complete the initial analysis first to see potential savings and profit increase.",
        variant: "destructive",
      });
      return;
    }
    
    setFormData(data);
    toast({
      title: "Analysis Complete",
      description: "Your detailed analysis report is ready.",
    });
    setShowReport(true);
  };

  const handleClose = () => {
    setFormData(null);
    setShowReport(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] h-[80vh]">
        {!showReport ? (
          <>
            <DialogHeader>
              <DialogTitle>Detailed Analysis Request</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <DetailedAnalysisForm onSubmit={handleSubmit} />
            </div>
          </>
        ) : (
          formData && analysis && (
            <DetailedReport 
              data={formData} 
              analysis={{
                industry: analysis.industry,
                department: analysis.department,
                bot_function: analysis.bot_function,
                savings: analysis.savings,
                profit_increase: analysis.profit_increase,
                explanation: analysis.explanation,
                marketing_strategy: analysis.marketing_strategy
              }} 
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};