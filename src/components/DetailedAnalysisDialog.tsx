import { useState, useEffect } from "react";
import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { CloseConfirmationDialog } from "./detailed-analysis/CloseConfirmationDialog";
import { useDialogState } from "./detailed-analysis/hooks/useDialogState";
import { useDialogActions } from "./detailed-analysis/hooks/useDialogActions";
import { useBookingHandling } from "./detailed-analysis/hooks/useBookingHandling";
import { DialogStateManager } from "./detailed-analysis/dialog/DialogStateManager";
import { DialogDebugger } from "./detailed-analysis/dialog/DialogDebugger";
import { DialogMainContent } from "./detailed-analysis/dialog/DialogMainContent";

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

  // Initialize form data from analysis if available
  useEffect(() => {
    if (analysis?.formData && !formData) {
      console.log("DetailedAnalysisDialog - Initializing form data from analysis:", analysis.formData);
      setFormData(analysis.formData);
      if (!showFormOnly) {
        setShowReport(true);
      }
    }
  }, [analysis, formData, setFormData, setShowReport, showFormOnly]);

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

  return (
    <>
      <DialogStateManager
        isOpen={isOpen}
        formData={formData}
        analysis={analysis}
        showFormOnly={showFormOnly}
        setShowReport={setShowReport}
        setFormData={setFormData}
      />

      <DialogDebugger
        showReport={showReport}
        showCalendar={showCalendar}
        formData={formData}
        analysis={analysis}
        isOpen={isOpen}
        industry={industry || ''}
      />

      <DialogWrapper isOpen={isOpen} onClose={handleClose}>
        <DialogMainContent
          showCalendar={showCalendar}
          showReport={showReport}
          formData={formData}
          onSubmit={handleSubmit}
          industry={industry}
          analysis={analysis}
          onBookDemo={handleBookDemo}
          handleBookingSubmit={handleBookingSubmit}
        />
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