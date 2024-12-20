import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { CalendarFormData } from "@/types/analysis";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendarEvents } from "@/hooks/calendar/useCalendarEvents";
import { useCalendarInit } from "@/hooks/calendar/useCalendarInit";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReportAsPDF } from "@/utils/reportExport";
import { HiddenReport } from "./HiddenReport";

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
  
  console.log("CalendarEmbed - Rendering with data:", { formData, analysis });
  
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
    handleEventScheduled
  });

  const handleDownload = async () => {
    if (!reportRef.current) {
      console.error("Download error: Report ref not found");
      toast({
        title: "Error",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
      return;
    }

    console.log("Starting PDF export");
    const success = await exportReportAsPDF(reportRef.current);
    
    toast({
      title: success ? "Success" : "Error",
      description: success 
        ? "Report downloaded successfully!" 
        : "Failed to download report. Please try again.",
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div ref={calendarRef} className="min-h-[600px] relative">
          <div className="calendly-inline-widget" style={{ minWidth: '320px', height: '600px' }} />
          <div className="download-button-container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] text-center opacity-0 pointer-events-none">
            <h1 className="text-2xl font-bold mb-4">Schedule Your Demo</h1>
            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full max-w-md mx-auto bg-[#f65228] hover:bg-[#f65228]/90 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Your Report
            </Button>
          </div>
        </div>
        
        <style>
          {`
            .calendly-inline-widget {
              min-width: 320px;
              height: 600px;
            }
            
            .download-button-container {
              z-index: 999999;
              transition: opacity 0.3s ease;
            }

            .calendly-inline-widget .confirmation-page ~ .download-button-container,
            .calendly-inline-widget .confirmation-page-content ~ .download-button-container,
            .calendly-inline-widget[data-state="confirmed"] ~ .download-button-container {
              opacity: 1;
              pointer-events: auto;
            }
          `}
        </style>
      </div>
      
      <div ref={reportRef}>
        <HiddenReport formData={formData} analysis={analysis} />
      </div>
    </div>
  );
};