import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

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
  const { showSuccessToast } = useSuccessToast();
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

  const handleDownload = useCallback(async () => {
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        throw new Error("Report element not found");
      }

      console.log("Download attempt with data:", {
        formData,
        analysis
      });
      
      const pdf = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      console.log("PDF generated successfully, attempting save as:", fileName);
      pdf.save(fileName);
      console.log("PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 1500, // 1.5 seconds
      });
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [formData, analysis, toast]);

  const handleBookingSubmit = useCallback(async () => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    
    if (formData && analysis) {
      showSuccessToast();
      await handleDownload();
    }
  }, [showSuccessToast, formData, analysis, handleDownload]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};