import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { exportReportAsPDF } from "@/utils/reportExport";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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
  const [showDownload, setShowDownload] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("[DEBUG] CalendarView - Component Mounted", {
      showDownload,
      hasFormData: !!formData,
      hasAnalysis: !!analysis,
      formData,
      analysis
    });
  }, []);

  useEffect(() => {
    console.log("[DEBUG] CalendarView - showDownload changed:", showDownload);
  }, [showDownload]);

  const handleDownload = async () => {
    console.log("[DEBUG] CalendarView - Download initiated", {
      formData,
      analysis
    });

    if (!formData || !analysis) {
      console.error("[DEBUG] CalendarView - Missing required data for download:", {
        formData,
        analysis
      });
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

    console.log("[DEBUG] CalendarView - Attempting PDF export");
    const success = await exportReportAsPDF(reportElement);
    document.body.removeChild(reportElement);

    console.log("[DEBUG] CalendarView - PDF export result:", { success });
    toast({
      title: success ? "Success" : "Error",
      description: success 
        ? "Report downloaded successfully!" 
        : "Failed to download report. Please try again.",
      variant: success ? "default" : "destructive",
    });
  };

  const handleCalendarEvent = () => {
    console.log("[DEBUG] CalendarView - Calendar event received");
    setShowDownload(true);
    console.log("[DEBUG] CalendarView - Download button should now be visible");
    onSubmit();
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
        <p className="text-muted-foreground">
          Choose a time that works best for you
        </p>
      </div>
      
      <Calendar 
        calLink={calLink}
        onSubmit={handleCalendarEvent}
        formData={formData}
        analysis={analysis}
      />

      {showDownload && (
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium">30 Minute Meeting</span>
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#f65228] hover:bg-[#f65228]/90 text-white"
          >
            <Download className="h-4 w-4" />
            Download Report PDF
          </Button>
        </div>
      )}
    </div>
  );
};