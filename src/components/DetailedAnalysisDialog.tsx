import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { CloseConfirmationDialog } from "./detailed-analysis/CloseConfirmationDialog";
import { useDialogState } from "./detailed-analysis/hooks/useDialogState";
import { useDialogActions } from "./detailed-analysis/hooks/useDialogActions";
import { useBookingHandling } from "./detailed-analysis/hooks/useBookingHandling";
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
  const {
    formData,
    showCloseConfirm,
    showReport,
    showCalendar,
    setShowCloseConfirm,
    setShowReport,
    setShowCalendar,
    setFormData
  } = useDialogState();

  const {
    handleSubmit,
    handleClose,
    handleBookDemo
  } = useDialogActions({
    formData,
    showReport,
    showFormOnly,
    setShowReport,
    setShowCloseConfirm,
    setShowCalendar,
    onClose
  });

  const { handleBookingSubmit } = useBookingHandling({
    formData,
    analysis,
    onClose: () => {
      console.log("DetailedAnalysisDialog - Closing dialog and resetting state after booking");
      setShowReport(false);
      setShowCloseConfirm(false);
      onClose();
    }
  });

  useEffect(() => {
    if (isOpen) {
      console.log("DetailedAnalysisDialog - Dialog opened, resetting scroll position");
      window.scrollTo(0, 0);
      const dialogContent = document.querySelector('.dialog-content');
      if (dialogContent) {
        dialogContent.scrollTop = 0;
      }
    }
  }, [isOpen, showReport, showCalendar]);

  useEffect(() => {
    // When analysis data is available and dialog is opened, show the report
    if (analysis && isOpen && !showFormOnly) {
      console.log("DetailedAnalysisDialog - Analysis data available, showing report");
      setShowReport(true);
    }
  }, [analysis, isOpen, showFormOnly]);

  console.log("DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    showFormOnly,
    hasAnalysis: !!analysis,
    formDataContent: formData,
    analysisContent: analysis
  });

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
              showReport={showReport}
              formData={formData}
              onSubmit={handleSubmit}
              industry={industry}
              analysis={analysis}
              onBookDemo={handleBookDemo}
            />
          )}
        </div>
      </DialogWrapper>

      <CloseConfirmationDialog
        isOpen={showCloseConfirm}
        onOpenChange={setShowCloseConfirm}
        onConfirm={() => {
          setShowCloseConfirm(false);
          onClose();
        }}
        formData={formData}
        analysis={analysis}
      />
    </>
  );
};