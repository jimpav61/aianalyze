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
    console.log("useCalendarHandling - Book demo requested");
    if (!formData) {
      return false;
    }
    setShowCalendar(true);
    setShowReport(false);
    return true;
  }, []);

  const handleBookingSubmit = useCallback(() => {
    console.log("useCalendarHandling - Demo booking submitted");
    setShowCalendar(false);
    setShowReport(true);
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