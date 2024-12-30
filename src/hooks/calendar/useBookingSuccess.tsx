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

      console.log("BookingSuccess - Starting download with data:", {
        hasFormData: !!formData,
        hasAnalysis: !!analysis
      });

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      console.log("BookingSuccess - PDF generated successfully, saving as:", fileName);
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        duration: 3000,
      });
    } catch (error) {
      console.error("BookingSuccess - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [formData, analysis, toast]);

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

    // Only call onSubmit after showing the toast
    if (onSubmit) {
      setTimeout(onSubmit, 5000);
    }
  }, [formData, analysis, toast, handleDownload, onSubmit]);

  return { handleBookingSuccess };
};