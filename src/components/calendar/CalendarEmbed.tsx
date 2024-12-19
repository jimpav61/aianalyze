import { useEffect, useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { CalendarFormData } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReportAsPDF } from "@/utils/reportExport";
import { useToast } from "@/hooks/use-toast";

interface CalendarEmbedProps extends Omit<CalendarProps, 'formData'> {
  formData?: CalendarFormData;
}

export const CalendarEmbed = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarEmbedProps) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { handleBookingSuccess } = useBookingSuccess({ 
    formData, 
    analysis, 
    onSubmit 
  });
  
  const { calendlyInitialized, getPrefillData } = useCalendlyConfig(formData);
  const { handleCalendlyInit, handleEventScheduled } = useCalendlyEvents({
    formData,
    onBookingSuccess: handleBookingSuccess
  });

  const handleDownload = async () => {
    if (!calendarRef?.current) {
      toast({
        title: "Error",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const success = await exportReportAsPDF(calendarRef.current);
    
    toast({
      title: success ? "Success" : "Error",
      description: success 
        ? "Report downloaded successfully!" 
        : "Failed to download report. Please try again.",
      variant: success ? "default" : "destructive",
    });
  };

  useEffect(() => {
    console.log('[PHONE_DEBUG] Calendar effect triggered:', {
      hasFormData: !!formData,
      phoneNumber: formData?.phoneNumber,
      calLink
    });

    if (!calendarRef.current || calendlyInitialized.current || !calLink) {
      console.log('[PHONE_DEBUG] Calendar initialization blocked:', {
        hasRef: !!calendarRef.current,
        isInitialized: calendlyInitialized.current,
        hasCalLink: !!calLink
      });
      return;
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const prefill = getPrefillData();
    
    console.log('[PHONE_DEBUG] Initializing Calendly widget:', {
      url: calendlyUrl,
      prefill,
      phoneNumber: formData?.phoneNumber
    });

    if (!window.Calendly) {
      console.error('[PHONE_DEBUG] Calendly not loaded');
      return;
    }

    calendlyInitialized.current = true;

    // Add event listener for form load
    window.addEventListener('calendly.profile_page_loaded', (e) => {
      console.log('[PHONE_DEBUG] Calendly form loaded:', {
        event: e,
        prefill,
        phoneNumber: formData?.phoneNumber
      });
    });

    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendarRef.current,
      prefill,
      utm: {}
    });

    window.addEventListener('calendly.init', (e) => {
      console.log('[PHONE_DEBUG] Calendly initialized:', {
        event: e,
        prefill,
        phoneNumber: formData?.phoneNumber
      });
      handleCalendlyInit(prefill);
    });

    window.addEventListener('calendly.event_scheduled', (e: any) => {
      console.log('[PHONE_DEBUG] Event scheduled:', {
        event: e,
        data: e?.data,
        invitee: e?.data?.invitee,
        questions: e?.data?.invitee?.questions,
        phoneNumber: formData?.phoneNumber
      });
      handleEventScheduled(e);

      // Add download button after successful booking
      const confirmationPage = document.querySelector('.calendly-confirmation-content');
      if (confirmationPage) {
        const downloadButton = document.createElement('div');
        downloadButton.className = 'download-button-container';
        downloadButton.style.marginBottom = '20px';
        downloadButton.innerHTML = `
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" onclick="window.handleDownloadPDF()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download PDF
          </button>
        `;
        
        const title = confirmationPage.querySelector('h1');
        if (title && title.parentNode) {
          title.parentNode.insertBefore(downloadButton, title);
        }
      }
    });

    // Add global function for the download button
    window.handleDownloadPDF = handleDownload;

    return () => {
      console.log('[PHONE_DEBUG] Cleanup');
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
      calendlyInitialized.current = false;
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      window.removeEventListener('calendly.init', handleCalendlyInit);
      window.removeEventListener('calendly.profile_page_loaded', () => {});
      delete window.handleDownloadPDF;
    };
  }, [calLink, handleBookingSuccess, formData, getPrefillData, handleCalendlyInit, handleEventScheduled]);

  return (
    <div className="w-full h-[700px] flex flex-col">
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
    </div>
  );
};