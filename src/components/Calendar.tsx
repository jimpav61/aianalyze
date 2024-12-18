import { useToast } from "@/hooks/use-toast";
import { useEmailHandler } from "./calendar/EmailHandler";
import { LoadingState } from "./calendar/LoadingState";
import { ErrorState } from "./calendar/ErrorState";
import { CalendarProps } from "@/types/calendar";
import { useCalendarScript } from "@/hooks/calendar/useCalendarScript";
import { useCalApi } from "@/hooks/calendar/useCalApi";
import { useCalConfig } from "@/hooks/calendar/useCalConfig";
import { useCalCleanup } from "@/hooks/calendar/useCalCleanup";
import { useEffect, useRef } from "react";

export const Calendar = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarProps) => {
  const { toast } = useToast();
  const { isScriptLoaded, scriptError } = useCalendarScript();
  const mounted = useRef(true);
  const { calInitialized, calApiRef, initializeApi } = useCalApi();
  const { getUiConfig, getInlineConfig } = useCalConfig();
  
  useCalCleanup(mounted, calApiRef, calInitialized);
  
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
    if (!isScriptLoaded || !mounted.current) {
      console.log("Calendar - Not ready to initialize");
      return;
    }

    const initializeCalendar = async () => {
      try {
        console.log("Calendar - Starting initialization");
        
        const cal = await initializeApi();
        if (!cal) {
          console.error("Calendar - Failed to initialize Cal API");
          return;
        }

        if (calInitialized.current) {
          console.log("Calendar - Calendar already initialized");
          return;
        }

        const placeholder = document.getElementById('cal-booking-placeholder');
        if (!placeholder) {
          console.error("Calendar - Placeholder element not found");
          return;
        }

        placeholder.innerHTML = '';
        
        console.log("Calendar - Configuring calendar with link:", calLink);
        
        cal('ui', getUiConfig());
        cal('inline', {
          ...getInlineConfig(calLink),
          elementOrSelector: '#cal-booking-placeholder',
        });

        cal('on', {
          action: "bookingSuccessful",
          callback: async () => {
            console.log('Booking successful, sending emails');
            try {
              await sendEmails();
            } catch (error) {
              console.error('Error sending emails:', error);
              toast({
                title: 'Error',
                description: 'There was an issue completing your booking. Our team will contact you shortly.',
                variant: 'destructive',
              });
            }
          },
        });

        calInitialized.current = true;
        console.log("Calendar - Calendar initialized successfully");

      } catch (error) {
        console.error('Calendar - Error initializing calendar:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize calendar. Please refresh the page.',
          variant: 'destructive',
        });
      }
    };

    const initTimeout = setTimeout(initializeCalendar, 1000);
    return () => clearTimeout(initTimeout);
  }, [isScriptLoaded, calLink, sendEmails, toast, initializeApi, getUiConfig, getInlineConfig]);

  if (scriptError) {
    return <ErrorState message={scriptError} onRetry={() => window.location.reload()} />;
  }

  if (!isScriptLoaded) {
    return <LoadingState />;
  }

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        id="cal-booking-placeholder" 
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};