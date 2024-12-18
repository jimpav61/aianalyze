import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { useEmailHandler } from "./calendar/EmailHandler";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { CalendarProps } from "@/types/calendar";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { toast } = useToast();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  
  const { sendEmails } = useEmailHandler({ 
    formData, 
    analysis, 
    onSuccess: () => {
      if (onSubmit) {
        requestAnimationFrame(onSubmit);
      }
    }
  });

  const handleBookingSuccess = async () => {
    console.log("Calendar - Booking successful, sending emails");
    try {
      await sendEmails();
    } catch (error) {
      console.error("Calendar - Error sending emails:", error);
      toast({
        title: "Error",
        description: "There was an issue completing your booking. Our team will contact you shortly.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    const checkInterval = 100;

    const checkCalScript = () => {
      console.log("Calendar - Checking Cal script availability");
      if ((window as any).Cal) {
        console.log("Calendar - Cal script loaded successfully");
        setIsScriptLoaded(true);
        setScriptError(null);
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkCalScript, checkInterval);
        } else {
          console.error("Calendar - Failed to load Cal script after maximum attempts");
          setScriptError('Failed to load calendar. Please refresh the page.');
        }
      }
    };

    try {
      checkCalScript();
    } catch (error) {
      console.error("Calendar - Error during script check:", error);
      setScriptError('Failed to load calendar. Please refresh the page.');
    }

    return () => {
      if ((window as any).Cal) {
        try {
          console.log("Calendar - Cleaning up Cal instance");
          (window as any).Cal('destroy');
        } catch (e) {
          console.error('Calendar - Error destroying calendar:', e);
        }
      }
    };
  }, []);

  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess: handleBookingSuccess,
    isScriptLoaded 
  });

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    return <LoadingState />;
  }

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};