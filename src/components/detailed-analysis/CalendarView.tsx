import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";
import { exportReportAsPDF } from "@/utils/reportExport";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { HiddenReport } from "./calendar/HiddenReport";
import { CalendarEmbedWrapper } from "./calendar/CalendarEmbed";

interface CalendarViewProps {
  onSubmit: () => void;
  formData?: DetailedFormData;
  analysis: any;
  calLink?: string;
}

export const CalendarView = ({ 
  onSubmit, 
  formData, 
  analysis, 
  calLink = "jimmy-chatsites/30min"
}: CalendarViewProps) => {
  const { toast } = useToast();
  console.log("CalendarView - Render:", { hasFormData: !!formData, hasAnalysis: !!analysis });

  const handleDownload = async () => {
    if (!formData || !analysis) {
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const reportElement = document.getElementById('report-content');
      if (!reportElement) {
        throw new Error('Report element not found');
      }

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
    <>
      <CalendarHeader onDownload={handleDownload} />
      <HiddenReport formData={formData} analysis={analysis} />
      <CalendarEmbedWrapper 
        calLink={calLink}
        onSubmit={onSubmit}
        formData={formData}
        analysis={analysis}
      />
    </>
  );
};