import { useEffect } from "react";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { DetailedFormData } from "@/types/analysis";

interface CalendarEmbedProps {
  calLink?: string;
  onSubmit?: () => void;
  formData: DetailedFormData;
  analysis?: any;
}

export const CalendarEmbed = ({ onSubmit, formData, analysis }: CalendarEmbedProps) => {
  console.log("CalendarEmbed - Initializing with:", {
    hasFormData: !!formData,
    formDataFields: Object.keys(formData),
    hasAnalysis: !!analysis
  });

  const { getPrefillData, initCalendly } = useCalendlyConfig(formData);
  const { handleEventScheduled } = useCalendlyEvents({ 
    formData, 
    onBookingSuccess: onSubmit || (() => {}) 
  });

  useEffect(() => {
    const setupCalendly = () => {
      if (formData && window.Calendly) {
        console.log("CalendarEmbed - Setting up Calendly");
        const prefill = getPrefillData();
        console.log("CalendarEmbed - Prefill data:", prefill);
        
        // Clear any existing Calendly widgets
        const existingWidget = document.querySelector('.calendly-inline-widget');
        if (existingWidget) {
          existingWidget.innerHTML = '';
        }

        // Initialize new widget
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/chatsites/demo',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill,
          utm: {
            utmSource: 'ChatSites',
            utmMedium: 'AI_Analysis',
            utmCampaign: 'Demo_Booking'
          }
        });
      }
    };

    // Initial setup with retry mechanism
    const maxRetries = 5;
    let retryCount = 0;
    
    const retrySetup = () => {
      if (window.Calendly) {
        setupCalendly();
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(retrySetup, 1000);
      } else {
        console.error("CalendarEmbed - Failed to load Calendly after multiple attempts");
      }
    };

    retrySetup();

    // Set up event listeners
    window.addEventListener('calendly.event_scheduled', handleEventScheduled);
    
    return () => {
      console.log("CalendarEmbed - Cleaning up event listeners");
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
    };
  }, [formData, getPrefillData, handleEventScheduled]);

  return (
    <div className="calendly-embed min-h-[600px] w-full">
      <div 
        className="calendly-inline-widget w-full min-h-[600px]" 
        data-url="https://calendly.com/chatsites/demo"
      />
    </div>
  );
};