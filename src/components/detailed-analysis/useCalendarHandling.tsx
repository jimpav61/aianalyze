import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface UseCalendarHandlingProps {
  onClose: () => void;
  setShowReport: (show: boolean) => void;
  formData: DetailedFormData | null;
  analysis?: any;
}

interface StoredData {
  formData: DetailedFormData | null;
  analysis: any;
}

interface DownloadOptions {
  currentData: StoredData;
  toast: any;
}

// Utility function to handle PDF generation and download
const handlePdfDownload = async ({ currentData, toast }: DownloadOptions) => {
  try {
    // Ensure we wait for the hidden report to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const pdf = await generateFullReport(currentData);
    const fileName = getReportFileName(currentData.formData.companyName);
    
    console.log("Calendar - Saving PDF with filename:", fileName);
    pdf.save(fileName);
    
    toast({
      title: "Success",
      description: "Report downloaded successfully!",
      duration: 1500,
    });

    return true;
  } catch (error) {
    console.error("Calendar - PDF Generation error:", error);
    toast({
      title: "Error",
      description: "Failed to download report. Please try again.",
      variant: "destructive",
      duration: 3000,
    });
    return false;
  }
};

// Custom hook for managing calendar state and actions
export const useCalendarHandling = ({ 
  onClose, 
  setShowReport,
  formData,
  analysis 
}: UseCalendarHandlingProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();
  const storedDataRef = useRef<StoredData | null>(null);

  const storeData = useCallback((data: StoredData) => {
    storedDataRef.current = {
      formData: data.formData ? structuredClone(data.formData) : null,
      analysis: data.analysis ? structuredClone(data.analysis) : null
    };
    console.log("Calendar - Data stored:", storedDataRef.current);
  }, []);

  const getCurrentData = useCallback((): StoredData => {
    return storedDataRef.current || { formData, analysis };
  }, [formData, analysis]);

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentData = getCurrentData();
    
    console.log("Calendar - Download initiated with data:", {
      hasFormData: !!currentData.formData,
      hasAnalysis: !!currentData.analysis,
      formDataContent: currentData.formData,
      analysisContent: currentData.analysis
    });

    if (!currentData.formData || !currentData.analysis) {
      console.error("Calendar - Download failed: Missing data");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    await handlePdfDownload({ currentData, toast });
  }, [getCurrentData, toast]);

  const ToastContent = useCallback(() => (
    <div className="space-y-2">
      <p>Your demo has been scheduled successfully!</p>
      <button
        onClick={(e) => handleDownload(e)}
        className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
      >
        Download Report
      </button>
    </div>
  ), [handleDownload]);

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
    
    storeData({ formData, analysis });
    
    setShowCalendar(false);
    setShowReport(true);
    
    toast({
      title: "Success!",
      description: <ToastContent />,
      duration: 5000
    });
  }, [formData, analysis, setShowReport, toast, storeData, ToastContent]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};