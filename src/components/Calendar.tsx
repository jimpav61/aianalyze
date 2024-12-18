import { useCalendarInitialization } from "@/hooks/useCalendarInitialization";
import { DetailedFormData } from "@/types/analysis";
import { useEmailHandler } from "./calendar/EmailHandler";

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
    console.log('Calendar - Booking completed successfully, sending emails');
    await sendEmails();
  };

  useCalendarInitialization({ 
    calLink, 
    onBookingSuccess: handleBookingSuccess 
  });

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div id="cal-booking-placeholder" className="flex-1 min-h-[600px]" />
    </div>
  );
};