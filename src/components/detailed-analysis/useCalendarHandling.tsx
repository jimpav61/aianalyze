import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";
import { useToast } from "@/hooks/use-toast";

interface UseCalendarHandlingProps {
  onClose: () => void;
  setShowReport: (show: boolean) => void;
}

export const useCalendarHandling = ({ onClose, setShowReport }: UseCalendarHandlingProps) => {
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
    setShowReport(false); // Hide report while calendar is shown
    return true;
  }, [setShowReport]);

  const handleBookingSubmit = useCallback(() => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    setShowReport(true); // Show report again after booking
    showSuccessToast();
    
    toast({
      title: "Demo Scheduled Successfully",
      description: "Your report is still available for download.",
      duration: 5000,
    });
  }, [showSuccessToast, toast, setShowReport]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit
  };
};