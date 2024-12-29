import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisReport } from "@/utils/pdfGenerator";
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
    if (!formData || !analysis) {
      console.error("Download failed - Missing required data");
      return;
    }

    try {
      const pdf = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
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
            <p>Your report has been downloaded. You can close this window when you're done.</p>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full flex items-center justify-center gap-2 mt-2"
              onClick={() => handleDownload()}
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