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
    onEventScheduled: handleEventScheduled
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
    <div className="w-full h-[700px] flex flex-col relative">
      <Button
        onClick={handleDownload}
        size="lg"
        className="absolute top-4 right-4 z-50 bg-[#f65228] hover:bg-[#f65228]/90 text-white"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Your Report
      </Button>
      
      <div 
        ref={calendarRef}
        className="flex-1 min-h-[600px] bg-white rounded-lg shadow-sm relative"
      />
      
      <div ref={reportRef} className="hidden">
        <HiddenReport formData={formData} analysis={analysis} />
      </div>
    </div>
  );
};