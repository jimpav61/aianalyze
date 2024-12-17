import { Dialog, DialogContent } from "./ui/dialog";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DialogContent as CustomDialogContent } from "./detailed-analysis/DialogContent";
import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { Calendar } from "./Calendar";

interface ExtendedDetailedAnalysisProps extends DetailedAnalysisProps {
  showFormOnly?: boolean;
}

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  industry,
  analysis,
  showFormOnly = false,
}: ExtendedDetailedAnalysisProps) => {
  const { toast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState<DetailedFormData | null>(null);

  const handleSubmit = useCallback((data: DetailedFormData) => {
    console.log("DetailedAnalysisDialog - Form submitted with data:", data);
    if (!data || !analysis) {
      console.error("DetailedAnalysisDialog - Missing required data:", { data, analysis });
      toast({
        title: "Error",
        description: "Unable to process form submission. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setFormData(data);
    setShowReport(true);
    console.log("DetailedAnalysisDialog - Report view enabled");
  }, [toast, analysis]);

  const handleBookingSubmit = useCallback(() => {
    console.log("DetailedAnalysisDialog - Demo booking submitted");
    setShowCalendar(false);
    setShowReport(true);
    toast({
      title: "Success",
      description: "Your demo has been scheduled successfully!",
    });
  }, [toast]);

  const handleClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Dialog closing, resetting state");
    setShowReport(false);
    setShowCalendar(false);
    setFormData(null);
    onClose();
  }, [onClose]);

  const handleBookDemo = useCallback((e?: React.MouseEvent) => {
    console.log("DetailedAnalysisDialog - Book demo requested");
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowCalendar(true);
    setShowReport(false);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {showCalendar ? (
            <>
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
                <p className="text-muted-foreground">
                  Choose a time that works best for you
                </p>
              </div>
              <Calendar 
                calLink="chatsites/ai-discovery-call" 
                onSubmit={handleBookingSubmit}
                formData={formData || undefined}
                analysis={analysis}
              />
            </>
          ) : (
            <CustomDialogContent
              showReport={!showFormOnly && showReport}
              formData={formData}
              onSubmit={handleSubmit}
              industry={industry}
              analysis={analysis}
              onBookDemo={handleBookDemo}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};