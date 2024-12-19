import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
import { useCalendarHandling } from "./detailed-analysis/useCalendarHandling";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

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
  const [formData, setFormData] = useState<DetailedFormData | null>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  
  const {
    showCalendar,
    showReport,
    setShowReport,
    handleBookDemo,
    handleBookingSubmit
  } = useCalendarHandling({ onClose });

  console.log("DetailedAnalysisDialog - Current state:", {
    showReport,
    showCalendar,
    hasFormData: !!formData,
    showFormOnly,
    hasAnalysis: !!analysis,
  });

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
    toast({
      title: "Success",
      description: "Your analysis report is ready!",
    });
    console.log("DetailedAnalysisDialog - Report view enabled");
  }, [toast, analysis, setShowReport]);

  const handleClose = useCallback(() => {
    if (showReport && !showFormOnly) {
      setShowCloseConfirm(true);
    } else {
      console.log("DetailedAnalysisDialog - Dialog closing, resetting state");
      setShowReport(false);
      setFormData(null);
      onClose();
    }
  }, [onClose, showReport, showFormOnly]);

  const confirmClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Confirmed closing");
    setShowReport(false);
    setFormData(null);
    setShowCloseConfirm(false);
    onClose();
  }, [onClose]);

  const onBookDemo = useCallback(() => {
    const success = handleBookDemo(formData);
    if (!success) {
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
      });
    }
  }, [formData, handleBookDemo, toast]);

  return (
    <>
      <DialogWrapper isOpen={isOpen} onClose={handleClose}>
        {showCalendar ? (
          <CalendarView
            onSubmit={handleBookingSubmit}
            formData={formData || undefined}
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

      <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to close?</AlertDialogTitle>
            <AlertDialogDescription>
              Make sure you've downloaded your analysis report. You won't be able to access it after closing this window.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClose} className="bg-red-500 hover:bg-red-600">
              Yes, close window
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};