import { useState, useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useSuccessToast } from "./SuccessToast";
import { useToast } from "@/hooks/use-toast";
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
  const [hasDownloaded, setHasDownloaded] = useState(false);
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

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      setHasDownloaded(true);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
      
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
      if (!hasDownloaded) {
        toast({
          title: "Success",
          description: (
            <div className="space-y-2">
              <p>Your demo has been scheduled successfully!</p>
              <Button
                onClick={handleDownload}
                className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
              >
                Download Report
              </Button>
            </div>
          ),
          duration: 5000,
        });
      } else {
        toast({
          title: "Success",
          description: "Your demo has been scheduled successfully!",
          duration: 1500,
        });
      }
    }
  }, [formData, analysis, hasDownloaded, handleDownload, toast]);

  return {
    showCalendar,
    handleBookDemo,
    handleBookingSubmit,
    handleDownload
  };
};