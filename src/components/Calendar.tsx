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
    try {
      await sendEmails();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue completing your booking. Our team will contact you shortly.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const checkCalScript = () => {
      if ((window as any).Cal) {
        setIsScriptLoaded(true);
        setScriptError(null);
      } else {
        setTimeout(checkCalScript, 100);
      }
    };

    try {
      checkCalScript();
    } catch (error) {
      setScriptError('Failed to load calendar. Please refresh the page.');
    }

    return () => {
      if ((window as any).Cal) {
        try {
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

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message === 'Script error.' && !event.filename) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

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