import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { CloseConfirmationDialog } from "./detailed-analysis/CloseConfirmationDialog";
import { useDialogState } from "./detailed-analysis/hooks/useDialogState";
import { useDialogActions } from "./detailed-analysis/hooks/useDialogActions";
import { useBookingHandling } from "./detailed-analysis/hooks/useBookingHandling";
import { useEffect, useState } from "react";

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
    onClose,
    industry
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

  // Reset scroll position when dialog content changes
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

  // Always show the form first when dialog opens
  useEffect(() => {
    if (isOpen) {
      setShowReport(false);
      setFormData(null);
      console.log("DetailedAnalysisDialog - Dialog opened, showing initial form");
    }
  }, [isOpen, setShowReport, setFormData]);

  // Only show report after form submission and analysis is available
  useEffect(() => {
    if (analysis && formData && !showFormOnly) {
      console.log("DetailedAnalysisDialog - Analysis data available after form submission, showing report");
      setShowReport(true);
    }
  }, [analysis, formData, showFormOnly, setShowReport]);

  console.log("DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    showFormOnly,
    hasAnalysis: !!analysis,
    formDataContent: formData,
    analysisContent: analysis,
    isDialogOpen: isOpen,
    currentIndustry: industry
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