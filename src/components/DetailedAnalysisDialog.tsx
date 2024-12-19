import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";
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
  const [formData, setFormData] = useState<DetailedFormData | null>(null);
  
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
      duration: 500,
    });
    console.log("DetailedAnalysisDialog - Report view enabled");
  }, [toast, analysis, setShowReport]);

  const handleClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Dialog closing, resetting state");
    setShowReport(false);
    setFormData(null);
    onClose();
  }, [onClose]);

  return (
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
        />
      )}
    </DialogWrapper>
  );
};