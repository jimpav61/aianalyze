import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";

interface UseCalendarHandlingProps {
  onClose: () => void;
}

export const useCalendarHandling = ({ onClose }: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { showSuccessToast } = useSuccessToast();

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
    showSuccessToast();
  }, [showSuccessToast]);

  return {
    showCalendar,
    showReport,
    setShowReport,
    handleBookDemo,
    handleBookingSubmit
  };
};