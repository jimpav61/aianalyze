import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { supabase } from "@/integrations/supabase/client";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "./ui/use-toast";

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
  const { toast } = useToast();

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
                const reportElement = document.getElementById("detailed-report");
                if (!reportElement) {
                  console.error('Report element not found');
                  return;
                }

                // Clone the report element to modify it for email
                const reportClone = reportElement.cloneNode(true) as HTMLElement;
                
                // Add inline styles for email
                const style = document.createElement('style');
                style.textContent = `
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  h1, h2 { color: #2563eb; margin-top: 1.5em; }
                  .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 1.5rem; margin-bottom: 1.5rem; }
                  .grid { display: grid; gap: 1rem; }
                `;
                reportClone.prepend(style);

                console.log('Sending email with report to:', formData.email);
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
                  toast({
                    title: "Error",
                    description: "Failed to send the report email. Please try again later.",
                    variant: "destructive",
                  });
                } else {
                  toast({
                    title: "Success",
                    description: "Analysis report has been sent to your email.",
                  });
                }
              } catch (error) {
                console.error('Error sending report email:', error);
                toast({
                  title: "Error",
                  description: "Failed to send the report email. Please try again later.",
                  variant: "destructive",
                });
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
  }, [onSubmit, calLink, formData, analysis, toast]);

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