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

type CalApiType = {
  on: (event: { action: string; callback: (...args: any[]) => void }) => void;
} & (ReturnType<typeof getCalApi> extends Promise<infer T> ? T : never);

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
        const cal = (await getCalApi()) as unknown as CalApiType;
        
        if (!cal || typeof cal.on !== 'function') {
          console.error('Calendar API not properly initialized');
          return;
        }

        cal.on({
          action: "bookingSuccessful",
          callback: async (...args) => {
            console.log('Booking completed successfully', args);
            await sendEmails();
          },
        });
      } catch (error) {
        console.error('Error initializing calendar:', error);
      }
    })();
  }, [onSubmit, calLink, formData, analysis]);

  return <CalendarConfig calLink={calLink} />;
};