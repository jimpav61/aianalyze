import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { useCalendarHandling } from "./detailed-analysis/useCalendarHandling";
import { useDialogHandling } from "./detailed-analysis/useDialogHandling";
import { CloseConfirmationDialog } from "./detailed-analysis/CloseConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

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
  } = useDialogHandling({ onClose, showFormOnly });

  const {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit
  } = useCalendarHandling({ onClose, setShowReport });

  console.log("DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    showFormOnly,
    hasAnalysis: !!analysis,
  });

  const onBookDemo = () => {
    const success = handleBookDemo(formData);
    if (!success) {
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DialogWrapper isOpen={isOpen} onClose={handleClose}>
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