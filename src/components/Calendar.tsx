import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { DetailedFormData } from "@/types/analysis";
import { CalendarConfig } from "./calendar/CalendarConfig";
import { useEmailHandler } from "./calendar/EmailHandler";

interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const Calendar = ({ calLink, onSubmit, formData, analysis }: CalendarProps) => {
  const { sendEmails } = useEmailHandler({ 
    formData, 
    analysis, 
    onSuccess: () => {
      if (onSubmit) {
        requestAnimationFrame(onSubmit);
      }
    }
  });

  useEffect(() => {
    (async function initializeCalendar() {
      try {
        const cal = await getCalApi();
        
        if (!cal) {
          console.error('Calendar API not initialized');
          return;
        }

        // Configure Cal.com embed
        cal.ns["30min"]({
          debug: true,
          calLink: calLink,
        });

        // Add event listener for successful bookings
        cal.on({
          action: "bookingSuccessful",
          callback: async () => {
            console.log('Booking completed successfully');
            await sendEmails();
          },
        });
      } catch (error) {
        console.error('Error initializing calendar:', error);
      }
    })();
  }, [calLink, sendEmails]);

  return <CalendarConfig calLink={calLink} />;
};