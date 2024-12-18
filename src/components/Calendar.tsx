import { useToast } from "@/hooks/use-toast";
import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { useEmailHandler } from "./calendar/EmailHandler";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { CalendarProps } from "@/types/calendar";
import { useCalendarScript } from "@/hooks/calendar/useCalendarScript";
import { CalendarContent } from "./calendar/CalendarContent";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { toast } = useToast();
  const { isScriptLoaded, scriptError } = useCalendarScript();
  
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

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    return <LoadingState />;
  }

  return (
    <CalendarContent 
      calLink={calLink} 
      onBookingSuccess={handleBookingSuccess} 
    />
  );
};