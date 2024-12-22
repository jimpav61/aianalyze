import { useEffect } from "react";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { DetailedFormData } from "@/types/analysis";

interface CalendarEmbedProps {
  onSubmit?: () => void;
  formData: DetailedFormData;
  analysis?: any;
}

export const CalendarEmbed = ({ onSubmit, formData, analysis }: CalendarEmbedProps) => {
  const { initCalendly } = useCalendlyConfig();
  const { handleEventScheduled } = useCalendlyEvents({ onSubmit });

  useEffect(() => {
    if (formData) {
      const prefill = {
        name: formData.companyName,
        email: formData.email,
        customAnswers: {
          a1: formData.phoneNumber,
          a2: formData.employees,
          a3: formData.revenue,
          a4: formData.industry || 'Not specified',
        }
      };

      initCalendly(prefill);
    }
  }, [formData, initCalendly]);

  return (
    <div className="calendly-embed min-h-[600px] w-full">
      <div 
        className="calendly-inline-widget w-full min-h-[600px]" 
        data-url="https://calendly.com/chatsites/demo"
      />
    </div>
  );
};