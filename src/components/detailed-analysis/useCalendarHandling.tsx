import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface UseCalendarHandlingProps {
  onClose: () => void;
  setShowReport: (show: boolean) => void;
  formData: DetailedFormData | null;
  analysis?: any;
}

export const useCalendarHandling = ({ 
  onClose, 
  setShowReport,
  formData,
  analysis 
}: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { showSuccessToast } = useSuccessToast();
  const { toast } = useToast();

  const handleBookDemo = useCallback((formData: DetailedFormData | null) => {
    console.log("useCalendarHandling - Book demo requested with form data:", formData);
    if (!formData) {
      console.warn("useCalendarHandling - No form data available");
      return false;
    }
    setShowCalendar(true);
    return true;
  }, []);

  const handleDownload = useCallback(async () => {
    console.log("Download attempt with:", { formData, analysis });
    
    if (!formData || !analysis) {
      console.error("Download failed - Missing required data");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create PDF directly without relying on DOM elements
      const pdf = new jsPDF();
      
      // Add content to PDF
      pdf.setFontSize(16);
      pdf.text("AI Analysis Report", 20, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Company: ${formData.companyName}`, 20, 40);
      pdf.text(`Industry: ${analysis.industry}`, 20, 50);
      pdf.text(`Department: ${analysis.department}`, 20, 60);
      pdf.text(`Function: ${analysis.bot_function}`, 20, 70);
      pdf.text(`Projected Savings: $${analysis.savings.toLocaleString()}`, 20, 80);
      pdf.text(`Profit Increase: ${analysis.profit_increase}%`, 20, 90);
      
      pdf.setFontSize(14);
      pdf.text("Implementation Plan", 20, 110);
      pdf.setFontSize(12);
      
      // Split long text into multiple lines
      const splitExplanation = pdf.splitTextToSize(analysis.explanation, 170);
      pdf.text(splitExplanation, 20, 130);
      
      pdf.setFontSize(14);
      pdf.text("Marketing Strategy", 20, 160);
      pdf.setFontSize(12);
      const splitStrategy = pdf.splitTextToSize(analysis.marketing_strategy, 170);
      pdf.text(splitStrategy, 20, 180);

      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      console.log("PDF generated and downloaded successfully");
      
      toast({
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Report downloaded successfully!</p>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full flex items-center justify-center gap-2 mt-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download Again
            </Button>
          </div>
        ),
      });
    } catch (error) {
      console.error("PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  }, [formData, analysis, toast]);

  const handleBookingSubmit = useCallback(async () => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    
    if (formData && analysis) {
      showSuccessToast();
      await handleDownload();
      toast({
        title: "Demo Scheduled Successfully",
        description: (
          <div className="flex flex-col gap-2">
            <p>Your report has been downloaded. You can close this window when you're ready.</p>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full flex items-center justify-center gap-2 mt-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download Again
            </Button>
          </div>
        ),
        duration: 5000,
      });
    }
  }, [showSuccessToast, toast, formData, analysis, handleDownload]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit
  };
};