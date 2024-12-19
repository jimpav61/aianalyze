import { useRef, useState } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { CalendarFormData } from "@/types/analysis";
import { useCalendarInitialization } from "@/hooks/calendar/useCalendarInitialization";
import { CalendarContainer } from "./CalendarContainer";
import { useToast } from "@/hooks/use-toast";
import { exportReportAsPDF } from "@/utils/reportExport";
import { Download } from "lucide-react";

interface CalendarEmbedProps extends Omit<CalendarProps, 'formData'> {
  formData?: CalendarFormData;
}

export const CalendarEmbed = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarEmbedProps) => {
  const [showDownloadButton, setShowDownloadButton] = useState(false);
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
    onBookingSuccess: () => {
      handleBookingSuccess();
      setShowDownloadButton(true);
      if (onSubmit) {
        onSubmit();
      }
    }
  });

  useCalendarInitialization({
    calendarRef,
    calendlyInitialized,
    calLink,
    getPrefillData,
    handleCalendlyInit,
    handleEventScheduled,
    formData
  });

  return (
    <div className="flex flex-col space-y-4">
      <CalendarContainer ref={calendarRef}>
        <div 
          className="calendly-inline-widget w-full h-full"
          data-url={`https://calendly.com/${calLink}`}
        />
      </CalendarContainer>
      {showDownloadButton && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => exportReportAsPDF(formData, analysis)}
            className="flex items-center gap-2 px-4 py-2 bg-[#f65228] text-white rounded-md font-medium"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};