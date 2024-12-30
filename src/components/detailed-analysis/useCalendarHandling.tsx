import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface UseCalendarHandlingProps {
  onClose: () => void;
  setShowReport: (show: boolean) => void;
  formData: DetailedFormData | null;
  analysis?: any;
}

export const useCalendarHandling = ({ 
  onClose, 
  setShowReport,
  formData,
  analysis 
}: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();

  const handleBookDemo = useCallback((formData: DetailedFormData | null) => {
    console.log("useCalendarHandling - Book demo requested with form data:", formData);
    if (!formData) {
      console.warn("useCalendarHandling - No form data available");
      return false;
    }
    setShowCalendar(true);
    return true;
  }, []);

  const handleBookingSubmit = useCallback(async () => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    
    if (formData && analysis) {
      console.log("useCalendarHandling - Showing success toast with report data:", {
        hasFormData: !!formData,
        hasAnalysis: !!analysis
      });

      toast({
        title: "Success",
        description: "Your demo has been scheduled successfully!",
        duration: 3000,
      });
      
      // Keep the report visible
      setShowReport(true);
    }
  }, [formData, analysis, toast, setShowReport]);

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      if (!formData || !analysis) {
        console.error("useCalendarHandling - Download failed - Missing required data");
        toast({
          title: "Error",
          description: "Report data not available. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 3000,
      });

    } catch (error) {
      console.error("useCalendarHandling - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [formData, analysis, toast]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};
