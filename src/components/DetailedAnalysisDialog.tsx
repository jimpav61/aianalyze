import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { CalendarViewWrapper } from "./detailed-analysis/calendar/CalendarViewWrapper";
import { CloseConfirmationDialog } from "./detailed-analysis/CloseConfirmationDialog";
import { useToast } from "@/hooks/use-toast";
import { useDialogHandling } from "./detailed-analysis/useDialogHandling";
import { useCalendarHandling } from "./detailed-analysis/useCalendarHandling";

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

  console.log("[TEST] DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    formDataContent: formData,
    showFormOnly,
    hasAnalysis: !!analysis,
    analysisContent: analysis
  });

  const onBookDemo = () => {
    if (!formData) {
      console.warn("[TEST] DetailedAnalysisDialog - Book demo failed: No form data");
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    console.log("[TEST] DetailedAnalysisDialog - Attempting to book demo with data:", formData);
    const success = handleBookDemo(formData);
    if (success) {
      console.log("[TEST] DetailedAnalysisDialog - Book demo successful");
      toast({
        title: "Success",
        description: "Redirecting to calendar...",
        duration: 1500,
      });
    }
  };

  return (
    <>
      <DialogWrapper isOpen={isOpen} onClose={handleClose}>
        <div className="relative">
          {showCalendar ? (
            <CalendarViewWrapper
              onSubmit={handleBookingSubmit}
              formData={formData}
              analysis={analysis}
              onBookDemo={onBookDemo}
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