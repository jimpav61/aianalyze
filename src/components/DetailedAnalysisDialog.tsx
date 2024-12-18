import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DialogContent } from "./detailed-analysis/DialogContent";
import { DetailedAnalysisProps } from "./detailed-analysis/types";
import { CalendarView } from "./detailed-analysis/CalendarView";
import { DialogWrapper } from "./detailed-analysis/DialogWrapper";

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
  const [showReport, setShowReport] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState<DetailedFormData | null>(null);

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
  }, [toast, analysis]);

  const handleClose = useCallback(() => {
    console.log("DetailedAnalysisDialog - Dialog closing, resetting state");
    setShowReport(false);
    setShowCalendar(false);
    setFormData(null);
    onClose();
  }, [onClose]);

  const handleBookDemo = useCallback(() => {
    console.log("DetailedAnalysisDialog - Book demo requested");
    if (!formData) {
      toast({
        title: "Error",
        description: "Please complete the form first.",
        variant: "destructive",
      });
      return;
    }
    setShowCalendar(true);
    setShowReport(false);
  }, [formData, toast]);

  const handleBookingSubmit = useCallback(() => {
    console.log("DetailedAnalysisDialog - Demo booking submitted");
    setShowCalendar(false);
    setShowReport(true);
    toast({
      title: "Success",
      description: "Your demo has been scheduled successfully! A confirmation email with your detailed analysis report will be sent to your inbox shortly.",
      duration: 5000,
    });
  }, [toast]);

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
          onBookDemo={handleBookDemo}
        />
      )}
    </DialogWrapper>
  );
};