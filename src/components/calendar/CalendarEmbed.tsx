import { useRef } from "react";
import { CalendarProps } from "@/types/calendar";
import { useBookingSuccess } from "@/hooks/calendar/useBookingSuccess";
import { useCalendlyConfig } from "./useCalendlyConfig";
import { useCalendlyEvents } from "./useCalendlyEvents";
import { CalendarFormData } from "@/types/analysis";
import { useCalendarInitialization } from "@/hooks/calendar/useCalendarInitialization";
import { CalendarContainer } from "./CalendarContainer";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportReportAsPDF } from "@/utils/reportExport";

interface CalendarEmbedProps extends Omit<CalendarProps, 'formData'> {
  formData?: CalendarFormData;
}

export const CalendarEmbed = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarEmbedProps) => {
  console.log("[DEBUG] CalendarEmbed - Component Mounted", {
    calLink,
    hasFormData: !!formData,
    hasAnalysis: !!analysis,
    formData,
    analysis
  });

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

  useCalendarInitialization({
    calendarRef,
    calendlyInitialized,
    calLink,
    getPrefillData,
    handleCalendlyInit,
    handleEventScheduled,
    formData
  });

  const handleDownload = async () => {
    console.log("[DEBUG] CalendarEmbed - Download initiated", {
      formData,
      analysis
    });

    if (!formData || !analysis) {
      console.error("[DEBUG] CalendarEmbed - Missing required data for download");
      toast({
        title: "Error",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
      return;
    }

    const reportElement = document.createElement('div');
    reportElement.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>AI Implementation Analysis Report</h1>
        <h2>Company Information</h2>
        <p>Company: ${formData.companyName || 'N/A'}</p>
        <p>Industry: ${analysis.industry || 'N/A'}</p>
        <h2>Analysis Results</h2>
        <p>Potential Savings: $${analysis.savings?.toLocaleString() || '0'}</p>
        <p>Profit Increase: ${analysis.profit_increase || '0'}%</p>
        <p>Implementation Strategy: ${analysis.marketing_strategy || 'N/A'}</p>
        <h2>Detailed Explanation</h2>
        <p>${analysis.explanation || 'N/A'}</p>
      </div>
    `;
    document.body.appendChild(reportElement);

    console.log("[DEBUG] CalendarEmbed - Attempting PDF export");
    const success = await exportReportAsPDF(reportElement);
    document.body.removeChild(reportElement);

    toast({
      title: success ? "Success" : "Error",
      description: success 
        ? "Report downloaded successfully!" 
        : "Failed to download report. Please try again.",
      variant: success ? "default" : "destructive",
    });
  };

  return (
    <div className="w-full h-[700px] flex flex-col">
      <CalendarContainer ref={calendarRef}>
        <div 
          className="calendly-inline-widget" 
          data-url={`https://calendly.com/${calLink}`}
          style={{ minWidth: '320px', height: '700px' }}
        />
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-white p-4 rounded-lg shadow-lg border flex items-center gap-4">
          <span className="text-sm font-medium">Download Your Report</span>
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#f65228] hover:bg-[#f65228]/90 text-white"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </CalendarContainer>
    </div>
  );
};