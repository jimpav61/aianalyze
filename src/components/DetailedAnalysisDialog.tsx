import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { useCalendarHandling } from "./detailed-analysis/useCalendarHandling";
import { useDialogHandling } from "./detailed-analysis/useDialogHandling";
import { CloseConfirmationDialog } from "./detailed-analysis/CloseConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
  
  const {
    formData,
    showCloseConfirm,
    showReport,
    setShowCloseConfirm,
    setShowReport,
    handleSubmit,
    handleClose,
    confirmClose
  } = useDialogHandling({ 
    onClose, 
    showFormOnly,
    resetOnClose: true
  });

  const {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit
  } = useCalendarHandling({ 
    onClose, 
    setShowReport,
    formData,
    analysis
  });

  // Reset scroll position when dialog opens or view changes
  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      const dialogContent = document.querySelector('.dialog-content');
      if (dialogContent) {
        dialogContent.scrollTop = 0;
      }
    }
  }, [isOpen, showReport, showCalendar]);

  console.log("DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    showFormOnly,
    hasAnalysis: !!analysis,
    formDataContent: formData,
    analysisContent: analysis
  });

  const onBookDemo = () => {
    console.log("DetailedAnalysisDialog - Book demo clicked with data:", {
      formData,
      analysis
    });
    
    const success = handleBookDemo(formData);
    if (!success) {
      console.warn("DetailedAnalysisDialog - Book demo failed: No form data");
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
        duration: 3000, // Added duration for consistency
      });
    } else {
      console.log("DetailedAnalysisDialog - Book demo successful");
    }
  };

  return (
    <>
      <DialogWrapper isOpen={isOpen} onClose={handleClose}>
        <div className="dialog-content overflow-y-auto max-h-[calc(90vh-2rem)]">
          {showCalendar ? (
            <CalendarView
              onSubmit={handleBookingSubmit}
              formData={formData}
              analysis={analysis}
            />
          ) : (
            <DialogContent
              showReport={showReport && !showFormOnly}
              formData={formData}
              onSubmit={handleSubmit}
              industry={industry}
              analysis={analysis}
              onBookDemo={onBookDemo}
            />
          )}
        </div>
      </DialogWrapper>

      <CloseConfirmationDialog
        isOpen={showCloseConfirm}
        onOpenChange={setShowCloseConfirm}
        onConfirm={confirmClose}
        formData={formData}
        analysis={analysis}
      />
    </>
  );
};