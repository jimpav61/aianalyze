import { DetailedAnalysisProps } from "./types";
import { DialogWrapper } from "./DialogWrapper";
import { CloseConfirmationDialog } from "./CloseConfirmationDialog";
import { useDialogState } from "./hooks/useDialogState";
import { useDialogActions } from "./hooks/useDialogActions";
import { useBookingHandling } from "./hooks/useBookingHandling";
import { DialogStateManager } from "./dialog/DialogStateManager";
import { DialogDebugger } from "./dialog/DialogDebugger";
import { DialogMainContent } from "./dialog/DialogMainContent";

interface ExtendedDetailedAnalysisProps extends DetailedAnalysisProps {
  showFormOnly?: boolean;
}

export const DetailedAnalysisDialog = ({
  isOpen,
  onClose,
  industry,
  analysis: initialAnalysis,
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
    analysis: initialAnalysis,
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
        analysis={initialAnalysis}
        showFormOnly={showFormOnly}
        setShowReport={setShowReport}
        setFormData={setFormData}
      />

      <DialogDebugger
        showReport={showReport}
        showCalendar={showCalendar}
        formData={formData}
        analysis={initialAnalysis}
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
          analysis={initialAnalysis}
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
        analysis={initialAnalysis}
      />
    </>
  );
};