import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportReportAsPDF } from "@/utils/reportExport";

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
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
        <p className="text-muted-foreground">
          Choose a time that works best for you
        </p>
      </div>

      {/* Hidden report content for PDF generation */}
      <div id="report-content" className="hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Analysis Report</h1>
          {formData && analysis && (
            <>
              <h2 className="text-xl mb-2">Company Information</h2>
              <p>Company: {formData.company_name}</p>
              <p>Industry: {analysis.industry}</p>
              <p>Department: {analysis.department}</p>
              <h2 className="text-xl mt-4 mb-2">Analysis Results</h2>
              <p>Potential Savings: ${analysis.savings}</p>
              <p>Profit Increase: ${analysis.profit_increase}</p>
              <p>Explanation: {analysis.explanation}</p>
              <p>Marketing Strategy: {analysis.marketing_strategy}</p>
            </>
          )}
        </div>
      </div>

      <Calendar 
        calLink={calLink}
        onSubmit={onSubmit}
        formData={formData}
        analysis={analysis}
      />

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-[#f65228] hover:bg-[#f65228]/90 text-white"
        >
          <Download className="h-4 w-4" />
          Download Your Report
        </Button>
      </div>
    </>
  );
};