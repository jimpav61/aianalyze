import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { CalendarFormData } from "@/types/analysis";
import { useCalendarEvents } from "@/hooks/calendar/useCalendarEvents";
import { useCalendarInit } from "@/hooks/calendar/useCalendarInit";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReportAsPDF } from "@/utils/reportExport";
import { useToast } from "@/hooks/use-toast";

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
  const reportRef = useRef<HTMLDivElement>(null);
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
          .calendly-confirmation-page {
            position: relative;
          }
          .calendly-confirmation-page .calendly-confirmation-button {
            margin-top: 16px !important;
          }
          .download-report-button {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
          .calendly-confirmation-page .download-report-button {
            display: flex !important;
          }
        `}
      </style>
      <div className="download-report-button">
        <Button
          onClick={handleDownload}
          size="lg"
          className="w-full bg-[#f65228] hover:bg-[#f65228]/90 text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Your Report
        </Button>
      </div>
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm"
        style={{ minWidth: '320px' }}
      />
      <div id="report-content" className="hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Analysis Report</h1>
          <h2 className="text-xl mb-2">Company Information</h2>
          <p>Company: {formData?.companyName}</p>
          <p>Industry: {analysis?.industry}</p>
          <p>Department: {analysis?.department}</p>
          <h2 className="text-xl mt-4 mb-2">Analysis Results</h2>
          <p>Potential Savings: ${analysis?.savings}</p>
          <p>Profit Increase: ${analysis?.profit_increase}</p>
          <p>Explanation: {analysis?.explanation}</p>
          <p>Marketing Strategy: {analysis?.marketing_strategy}</p>
        </div>
      </div>
    </div>
  );
};