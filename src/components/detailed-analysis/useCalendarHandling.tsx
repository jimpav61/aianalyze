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
    if (!formData) {
      console.warn("useCalendarHandling - No form data available");
      return false;
    }
    setShowCalendar(true);
    return true;
  }, []);

  const handleBookingSubmit = useCallback(() => {
    console.log("Calendar - Booking submitted, ensuring report visibility");
    
    // First hide calendar
    setShowCalendar(false);
    
    // Ensure the report is visible
    setShowReport(true);
    
    // Show success toast
    toast({
      title: "Success!",
      description: (
        <div className="space-y-2">
          <p>Your demo has been scheduled successfully!</p>
          <button
            onClick={() => handleDownload()}
            className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          >
            Download Report
          </button>
        </div>
      ),
      duration: 5000,
    });
  }, [setShowReport, toast]);

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("Calendar - Download initiated with data:", {
      hasFormData: !!formData,
      hasAnalysis: !!analysis
    });

    try {
      if (!formData || !analysis) {
        console.error("Calendar - Download failed - Missing data:", {
          formData,
          analysis
        });
        
        toast({
          title: "Error",
          description: "Report data not available. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      console.log("Calendar - PDF generated successfully, saving as:", fileName);
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 3000,
      });

    } catch (error) {
      console.error("Calendar - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 3000,
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