import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { DetailedFormData } from "@/types/analysis";
import { useEmailHandler } from "./calendar/EmailHandler";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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

  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess: handleBookingSuccess 
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

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};