import { Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DialogContent as CustomDialogContent } from "./detailed-analysis/DialogContent";
import { DetailedAnalysisProps } from "./detailed-analysis/types";

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  industry,
  analysis,
}: DetailedAnalysisProps) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <CustomDialogContent
            showReport={showReport}
            formData={formData}
            onSubmit={handleSubmit}
            industry={industry}
            analysis={analysis}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};