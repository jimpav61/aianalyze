import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { DetailedFormData } from "@/types/analysis";
import { useEmailHandler } from "./calendar/EmailHandler";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { toast } = useToast();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  console.log('Calendar - Component mounted with props:', { 
    calLink, 
    hasOnSubmit: !!onSubmit,
    hasFormData: !!formData,
    hasAnalysis: !!analysis
  });

  const { sendEmails } = useEmailHandler({ 
    formData, 
    analysis, 
    onSuccess: () => {
      console.log('Calendar - Email sent successfully, triggering onSubmit callback');
      if (onSubmit) {
        requestAnimationFrame(onSubmit);
      }
    }
  });

  const handleBookingSuccess = async () => {
    console.log('Calendar - Booking completed successfully, initiating email send');
    try {
      await sendEmails();
      console.log('Calendar - Full booking process completed successfully');
    } catch (error) {
      console.error('Calendar - Error in booking success handler:', error);
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
      } else {
        setTimeout(checkCalScript, 100);
      }
    };

    checkCalScript();

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

  // Add error boundary for Cal.com script errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message === 'Script error.' && !event.filename) {
        console.log('Calendar - Handled external script error');
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!isScriptLoaded) {
    return (
      <div className="w-full h-[700px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};