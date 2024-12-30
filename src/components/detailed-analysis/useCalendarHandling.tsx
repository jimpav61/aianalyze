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
  const [storedData, setStoredData] = useState<{
    formData: DetailedFormData | null;
    analysis: any;
  } | null>(null);

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Use stored data if available, otherwise use props
    const dataToUse = storedData || { formData, analysis };

    console.log("Calendar - Download initiated with data:", {
      hasFormData: !!dataToUse.formData,
      hasAnalysis: !!dataToUse.analysis,
      formDataContent: dataToUse.formData,
      analysisContent: dataToUse.analysis
    });

    if (!dataToUse.formData || !dataToUse.analysis) {
      console.error("Calendar - Download failed: Missing data");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      // Create deep copies of the data
      const currentFormData = JSON.parse(JSON.stringify(dataToUse.formData));
      const currentAnalysis = JSON.parse(JSON.stringify(dataToUse.analysis));

      console.log("Calendar - Generating PDF with data:", {
        formData: currentFormData,
        analysis: currentAnalysis
      });

      const pdf = await generateFullReport({ 
        formData: currentFormData, 
        analysis: currentAnalysis 
      });
      
      const fileName = getReportFileName(currentFormData.companyName);
      console.log("Calendar - Saving PDF with filename:", fileName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 1500,
      });
    } catch (error) {
      console.error("Calendar - PDF Generation error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [storedData, formData, analysis, toast]);

  const handleBookDemo = useCallback((formData: DetailedFormData | null) => {
    if (!formData) {
      console.warn("useCalendarHandling - No form data available");
      return false;
    }
    setShowCalendar(true);
    return true;
  }, []);

  const handleBookingSubmit = useCallback(() => {
    console.log("Calendar - Booking submitted with data:", { formData, analysis });
    
    // Store the current data for later use
    setStoredData({ formData, analysis });
    
    // Hide calendar but keep report visible
    setShowCalendar(false);
    setShowReport(true);
    
    const ToastContent = () => (
      <div className="space-y-2">
        <p>Your demo has been scheduled successfully!</p>
        <button
          onClick={(e) => handleDownload(e)}
          className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        >
          Download Report
        </button>
      </div>
    );

    toast({
      title: "Success!",
      description: <ToastContent />,
      duration: 5000
    });
  }, [setShowReport, toast, handleDownload, formData, analysis]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};
