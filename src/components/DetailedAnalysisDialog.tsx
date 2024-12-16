import { Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DialogContent as CustomDialogContent } from "./detailed-analysis/DialogContent";
import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { Calendar } from "./Calendar";

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  industry,
  analysis,
}: DetailedAnalysisProps) => {
  const { toast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState<DetailedFormData | null>(null);

  console.log("DetailedAnalysisDialog - Initial render:", { industry, analysis, showReport, formData });

  const handleSubmit = (data: DetailedFormData) => {
    console.log("DetailedAnalysisDialog - handleSubmit called with:", data);
    console.log("DetailedAnalysisDialog - Current analysis:", analysis);
    
    if (!data) {
      console.error("DetailedAnalysisDialog - No form data provided");
      toast({
        title: "Error",
        description: "Form data is missing",
        variant: "destructive",
      });
      return;
    }

    setFormData(data);
    setShowReport(true);
  };

  const handleClose = () => {
    console.log("DetailedAnalysisDialog - Closing dialog");
    setFormData(null);
    setShowReport(false);
    setShowCalendar(false);
    onClose();
  };

  const calLink = "chatsites/ai-discovery-call";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {showCalendar ? (
            <Calendar calLink={calLink} />
          ) : (
            <CustomDialogContent
              showReport={showReport}
              formData={formData}
              onSubmit={handleSubmit}
              industry={industry}
              analysis={analysis}
              onBookDemo={() => setShowCalendar(true)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};