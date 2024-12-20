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
    if (!formData || !analysis) {
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const reportElement = document.getElementById('report-content');
    if (!reportElement) {
      toast({
        title: "Error",
        description: "Report element not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await exportReportAsPDF(reportElement);
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
    <div className="w-full h-[700px] flex flex-col">
      <style>
        {`
          iframe[src*="confirmation"] {
            padding-top: 80px !important;
          }
          .download-report-button {
            display: none;
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            width: 90%;
            max-width: 300px;
            margin: 0 auto;
          }
          iframe[src*="confirmation"] ~ .download-report-button {
            display: block !important;
          }
        `}
      </style>
      <div className="download-report-button">
        <DownloadButton onClick={handleDownload} />
      </div>
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
      <HiddenReport formData={formData} analysis={analysis} />
    </div>
  );
};