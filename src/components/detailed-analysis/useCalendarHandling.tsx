import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

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

  const handleBookingSubmit = useCallback(async () => {
    console.log("useCalendarHandling - Booking submitted successfully");
    setShowCalendar(false);
    
    if (formData && analysis) {
      console.log("useCalendarHandling - Showing success toast with report data:", {
        hasFormData: !!formData,
        hasAnalysis: !!analysis
      });

      toast({
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Your demo has been scheduled successfully!</p>
            <p className="text-sm text-muted-foreground">You can now download your report or continue reviewing it.</p>
          </div>
        ),
        duration: 5000,
      });
      
      // Keep the report visible
      setShowReport(true);
      console.log("useCalendarHandling - Report visibility maintained");
    }
  }, [formData, analysis, toast, setShowReport]);

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("useCalendarHandling - Download initiated with data:", {
      hasFormData: !!formData,
      hasAnalysis: !!analysis,
      formDataContent: formData,
      analysisContent: analysis
    });

    try {
      if (!formData || !analysis) {
        console.error("useCalendarHandling - Download failed - Missing required data:", {
          formData,
          analysis
        });
        
        toast({
          title: "Error",
          description: "Report data not available. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      // Store data in local variables to ensure it's available throughout the process
      const currentFormData = { ...formData };
      const currentAnalysis = { ...analysis };

      console.log("useCalendarHandling - Starting download with stored data:", {
        currentFormData,
        currentAnalysis
      });

      const pdf = await generateFullReport({ 
        formData: currentFormData, 
        analysis: currentAnalysis 
      });
      const fileName = getReportFileName(currentFormData.companyName);
      
      console.log("useCalendarHandling - PDF generated successfully, saving as:", fileName);
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: (
          <div className="flex flex-col gap-2">
            <p>Report downloaded successfully!</p>
            <button
              onClick={(e) => handleDownload(e)}
              className="px-4 py-2 bg-white text-primary border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Download Again
            </button>
          </div>
        ),
        duration: 5000,
      });

    } catch (error) {
      console.error("useCalendarHandling - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [formData, analysis, toast]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};