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

    try {
      await exportReportAsPDF(reportElement);
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("[DEBUG] CalendarEmbed - PDF export failed:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <CalendarContainer ref={calendarRef}>
        <div 
          className="calendly-inline-widget w-full h-full"
          data-url={`https://calendly.com/${calLink}`}
          style={{ minWidth: '320px', height: '100%' }}
        />
      </CalendarContainer>
      {showDownloadButton && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleDownload}
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