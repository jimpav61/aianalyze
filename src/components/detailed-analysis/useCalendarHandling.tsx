import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { UseCalendarHandlingProps } from "./calendar/types";
import { useCalendarData } from "./calendar/useCalendarData";
import { useDownloadHandler } from "./calendar/useDownloadHandler";

export const useCalendarHandling = ({ 
  onClose, 
  setShowReport,
  formData,
  analysis 
}: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();
  const { setCalendarData, getCalendarData } = useCalendarData(formData, analysis);
  const handleDownload = useDownloadHandler(getCalendarData);

  const handleBookDemo = useCallback((formData: any) => {
    if (!formData) {
      console.warn("[useCalendarHandling] No form data available");
      return false;
    }
    
    console.log("[Calendar] Storing data before showing calendar:", { formData, analysis });
    setCalendarData({ formData, analysis });
    setShowCalendar(true);
    return true;
  }, [analysis, setCalendarData]);

  const handleBookingSubmit = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentData = getCalendarData();
    console.log("[Calendar] Booking submitted with data:", currentData);
    
    setShowCalendar(false);
    
    toast({
      title: "Success!",
      description: "Your demo has been scheduled successfully!",
      duration: 3000,
    });

    setTimeout(() => {
      setShowReport(true);
    }, 100);
  }, [getCalendarData, setShowReport, toast]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};