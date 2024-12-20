import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { CalendarFormData } from "@/types/analysis";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendarEvents } from "@/hooks/calendar/useCalendarEvents";
import { useCalendarInit } from "@/hooks/calendar/useCalendarInit";
import { useToast } from "@/hooks/use-toast";
import { DownloadButton } from "./DownloadButton";
import { HiddenReport } from "./HiddenReport";
import { exportReportAsPDF } from "@/utils/reportExport";

interface CalendarEmbedProps extends Omit<CalendarProps, 'formData'> {
  formData?: CalendarFormData;
  analysis?: any;
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

  const { handleEventScheduled } = useCalendarEvents({
    onEventScheduled: handleBookingSuccess,
    formData
  });

  useCalendarInit({
    calendarRef,
    calLink,
    formData,
    onEventScheduled: handleEventScheduled
  });

  const handleDownload = async () => {
    console.log("Download button clicked");
    if (!formData || !analysis) {
      console.error("Missing data for download:", { formData, analysis });
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const reportElement = document.getElementById('report-content');
    if (!reportElement) {
      console.error("Report element not found");
      toast({
        title: "Error",
        description: "Report element not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await exportReportAsPDF(reportElement);
      console.log("PDF export result:", success);
      toast({
        title: success ? "Success" : "Error",
        description: success 
          ? "Report downloaded successfully!" 
          : "Failed to download report. Please try again.",
        variant: success ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-[700px] flex flex-col relative">
      <style>
        {`
          .calendly-inline-widget {
            position: relative;
            min-width: 320px;
            height: 100%;
          }
          
          .download-report-button {
            display: none;
            position: fixed;
            top: 180px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999999;
            width: calc(100% - 4rem);
            max-width: 400px;
            pointer-events: auto;
          }

          /* Show button only when confirmation page is loaded */
          .calendly-inline-widget iframe[src*="confirmation"] ~ .download-report-button {
            display: block !important;
          }
        `}
      </style>
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm relative"
      >
        <div className="download-report-button">
          <DownloadButton onClick={handleDownload} />
        </div>
      </div>
      <HiddenReport formData={formData} analysis={analysis} />
    </div>
  );
};