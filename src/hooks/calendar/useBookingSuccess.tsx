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

  const handleDownload = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("BookingSuccess - Download initiated with data:", {
      hasFormData: !!formData,
      hasAnalysis: !!analysis,
      formDataContent: formData,
      analysisContent: analysis
    });

    try {
      if (!formData || !analysis) {
        console.error("BookingSuccess - Download failed - Missing required data:", {
          formData,
          analysis
        });
        return;
      }

      // Store data in local variables to ensure it's available throughout the process
      const currentFormData = { ...formData };
      const currentAnalysis = { ...analysis };

      console.log("BookingSuccess - Starting download with stored data:", {
        currentFormData,
        currentAnalysis
      });

      const pdf = await generateFullReport({ 
        formData: currentFormData, 
        analysis: currentAnalysis 
      });
      const fileName = getReportFileName(currentFormData.companyName);
      
      console.log("BookingSuccess - PDF generated successfully, saving as:", fileName);
      pdf.save(fileName);
      
    } catch (error) {
      console.error("BookingSuccess - PDF Generation/Download error:", error);
    }
  }, [formData, analysis]);

  const handleBookingSuccess = useCallback(() => {
    console.log("BookingSuccess - Booking success handler triggered with data:", {
      hasFormData: !!formData,
      hasAnalysis: !!analysis
    });

    toast({
      title: "Success!",
      description: "Your demo has been scheduled. Check your email for confirmation.",
      duration: 5000,
    });

    if (onSubmit) {
      console.log("BookingSuccess - Calling onSubmit callback");
      onSubmit();
    }
  }, [formData, analysis, toast, onSubmit]);

  return { handleBookingSuccess, handleDownload };
};