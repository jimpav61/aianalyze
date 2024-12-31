import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { UseCalendarHandlingProps } from "./calendar/types";
import { handlePdfDownload } from "./calendar/pdfHandler";
import { useCalendarState } from "./calendar/useCalendarState";

export const useCalendarHandling = ({ 
  onClose, 
  setShowReport,
  formData,
  analysis 
}: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();
  const { storeData, getCurrentData } = useCalendarState(formData, analysis);

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentData = getCurrentData();
    
    console.log("[Calendar] Download initiated with data:", {
      hasFormData: !!currentData.formData,
      hasAnalysis: !!currentData.analysis,
      formDataContent: currentData.formData,
      analysisContent: currentData.analysis
    });

    if (!currentData.formData || !currentData.analysis) {
      console.error("[Calendar] Download failed: Missing data");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    await handlePdfDownload({ currentData, toast });
  }, [getCurrentData, toast]);

  const handleBookDemo = useCallback((formData: any) => {
    if (!formData) {
      console.warn("[useCalendarHandling] No form data available");
      return false;
    }
    
    console.log("[Calendar] Storing data before showing calendar:", { formData, analysis });
    storeData({ formData, analysis });
    setShowCalendar(true);
    return true;
  }, [analysis, storeData]);

  const handleBookingSubmit = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentData = getCurrentData();
    console.log("[Calendar] Booking submitted with data:", currentData);
    
    setShowCalendar(false);
    
    toast({
      title: "Success!",
      description: "Your demo has been scheduled successfully!",
      duration: 3000,
    });

    // Ensure we show the report after the toast
    setTimeout(() => {
      setShowReport(true);
    }, 100);
  }, [getCurrentData, setShowReport, toast]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};