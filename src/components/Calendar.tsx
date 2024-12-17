import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { supabase } from "@/integrations/supabase/client";
import { DetailedFormData } from "@/types/analysis";

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
            
            if (formData?.email && analysis) {
              try {
                const reportClone = document.getElementById("detailed-report");
                if (reportClone) {
                  const { error } = await supabase.functions.invoke("sendemail", {
                    body: {
                      email: formData.email,
                      companyName: formData.companyName,
                      reportHtml: reportClone.innerHTML,
                      subject: `${formData.companyName} - AI Implementation Analysis Report`
                    },
                  });

                  if (error) {
                    console.error('Error sending report email:', error);
                  }
                }
              } catch (error) {
                console.error('Error sending report email:', error);
              }
            }

            if (onSubmit) {
              requestAnimationFrame(onSubmit);
            }
          },
        });
      } catch (error) {
        console.error('Error initializing calendar:', error);
      }
    })();
  }, [onSubmit, calLink, formData, analysis]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{
        layout: "month_view",
        hideEventTypeDetails: "false",
        isDark: "false",
        theme: "light",
      }}
    />
  );
};