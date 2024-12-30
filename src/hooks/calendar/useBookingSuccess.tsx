import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface UseBookingSuccessProps {
  formData?: DetailedFormData;
  analysis?: any;
  onSubmit?: () => void;
}

export const useBookingSuccess = ({ 
  formData, 
  analysis, 
  onSubmit 
}: UseBookingSuccessProps) => {
  const { toast } = useToast();

  const handleDownload = useCallback(async () => {
    try {
      if (!formData || !analysis) {
        console.error("BookingSuccess - Download failed - Missing required data:", {
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

      // Get the report element before any state changes
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("BookingSuccess - Report element not found");
        toast({
          title: "Error",
          description: "Could not generate report. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 3000,
      });

      // Only call onSubmit after successful download
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error("BookingSuccess - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [formData, analysis, toast, onSubmit]);

  const handleBookingSuccess = useCallback(() => {
    console.log("BookingSuccess - Booking success handler triggered with data:", {
      formData,
      analysis
    });

    toast({
      title: "Success!",
      description: (
        <div className="space-y-2">
          <p>Your demo has been scheduled. Check your email for confirmation.</p>
          <button
            onClick={handleDownload}
            className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          >
            Download Report
          </button>
        </div>
      ),
      duration: 5000,
    });
  }, [formData, analysis, toast, handleDownload]);

  return { handleBookingSuccess };
};