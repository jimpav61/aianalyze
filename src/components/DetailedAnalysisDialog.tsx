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
    if (!analysis) {
      toast({
        title: "Missing Analysis Data",
        description: "Please complete the initial analysis first.",
        variant: "destructive",
      });
      return;
    }
    
    setFormData(data);
    setShowReport(true);
    toast({
      title: "Analysis Complete",
      description: "Your detailed analysis report is ready.",
    });
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
              analysis={analysis}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};