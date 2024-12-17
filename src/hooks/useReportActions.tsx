import { useCallback } from "react";
import { showReportReminder, showBookingReminder } from "@/utils/toastUtils";
import { useActionTracking } from "./useActionTracking";

interface UseReportActionsProps {
  onBookDemo?: () => void;
}

export const useReportActions = ({ onBookDemo }: UseReportActionsProps) => {
  const {
    hasDownloaded,
    hasEmailed,
    hasBooked,
    showingToast,
    setShowingToast,
    trackAction
  } = useActionTracking();

  const handleBookDemo = useCallback(() => {
    console.log("Handling book demo");
    if (onBookDemo) {
      onBookDemo();
      trackAction('book');
      
      // Show report reminder after booking if they haven't downloaded or emailed
      if (!hasDownloaded && !hasEmailed && !showingToast) {
        setTimeout(() => {
          setShowingToast(true);
          showReportReminder();
        }, 500);
      }
    }
  }, [onBookDemo, hasDownloaded, hasEmailed, showingToast, setShowingToast, trackAction]);

  const handleReportAction = useCallback((type: 'download' | 'email') => {
    console.log(`Handling report action: ${type}`);
    trackAction(type);

    // Show booking reminder after download/email if they haven't booked
    if (!hasBooked && !showingToast) {
      setTimeout(() => {
        setShowingToast(true);
        showBookingReminder(onBookDemo);
      }, 500);
    }
  }, [hasBooked, showingToast, setShowingToast, onBookDemo, trackAction]);

  return {
    hasDownloaded,
    hasBooked,
    hasEmailed,
    handleBookDemo,
    handleReportAction
  };
};