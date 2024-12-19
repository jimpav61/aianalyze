import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";
import { useToast } from "@/hooks/use-toast";

interface UseCalendarHandlingProps {
  onClose: () => void;
}

export const useCalendarHandling = ({ onClose }: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReport, setShowReport] = useState(false);
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

  const handleBookingSubmit = useCallback(() => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    setShowReport(true); // Keep showing the report
    showSuccessToast();
    
    // Show download reminder toast
    toast({
      title: "Important!",
      description: "Please download your detailed analysis report before closing.",
      duration: 10000, // 10 seconds
    });
  }, [showSuccessToast, toast]);

  return {
    showCalendar,
    showReport,
    setShowReport,
    handleBookDemo,
    handleBookingSubmit
  };
};