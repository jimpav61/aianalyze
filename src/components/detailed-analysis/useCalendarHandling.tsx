import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";
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
      toast({
        title: "Success",
        description: "Your demo has been scheduled successfully!",
        duration: 1500,
      });
    }
  }, [formData, analysis, toast]);

  const handleDownload = useCallback(async () => {
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
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