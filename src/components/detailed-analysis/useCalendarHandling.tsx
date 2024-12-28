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

  const handleBookingSubmit = useCallback(async () => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    
    if (formData && analysis) {
      try {
        const pdf = await generateAnalysisReport({ formData, analysis });
        const fileName = `AI_Analysis_Report_${formData.companyName}_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
        showSuccessToast();
        toast({
          title: "Demo Scheduled Successfully",
          description: "Your report has been downloaded. You can close this window when you're done.",
          duration: 5000,
        });
      } catch (error) {
        console.error("PDF Generation Error:", error);
        toast({
          title: "Error",
          description: "Failed to generate report. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [showSuccessToast, toast, formData, analysis]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit
  };
};