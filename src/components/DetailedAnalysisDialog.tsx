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
    onClose: () => {
      console.log("DetailedAnalysisDialog - Closing dialog and resetting state after booking");
      // Reset all states and close dialog
      setShowReport(false);
      setShowCloseConfirm(false);
      onClose();
      // Force reload the page to show the full sample report
      console.log("DetailedAnalysisDialog - Reloading page to show full sample report");
      window.location.reload();
    }, 
    setShowReport,
    formData,
    analysis
  });

  useEffect(() => {
    if (isOpen) {
      console.log("DetailedAnalysisDialog - Dialog opened, resetting scroll position");
      // Reset scroll position when dialog opens or content changes
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
    
    if (!formData) {
      console.warn("DetailedAnalysisDialog - Book demo failed: No form data");
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
        duration: 1500,
      });
      return;
    }

    const success = handleBookDemo(formData);
    if (success) {
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