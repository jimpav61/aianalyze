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
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      // Get the report element to capture
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("Report element not found, retrying...");
        // Add a small delay and retry once
        await new Promise(resolve => setTimeout(resolve, 100));
        const retryElement = document.getElementById('detailed-report');
        if (!retryElement) {
          throw new Error("Report element not found after retry");
        }
      }

      console.log("Download attempt with data:", {
        formData,
        analysis
      });
      
      const pdf = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      console.log("PDF generated successfully, attempting save as:", fileName);
      pdf.save(fileName);
      console.log("PDF saved successfully");
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [formData, analysis, toast]);

  const handleBookingSubmit = useCallback(async () => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    
    if (formData && analysis) {
      showSuccessToast();
      const downloadSuccess = await handleDownload();
      
      if (downloadSuccess) {
        toast({
          title: "Demo Scheduled Successfully",
          description: (
            <div className="flex flex-col gap-2">
              <p>Your report has been downloaded. You can close this window when you're ready.</p>
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
    }
  }, [showSuccessToast, toast, formData, analysis, handleDownload]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};