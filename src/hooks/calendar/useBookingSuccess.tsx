import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { DownloadReportButton } from "@/components/download/DownloadReportButton";
import { generateReportPDF } from "@/utils/pdf/reportGenerator";

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

  const handleDownload = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("BookingSuccess - Download attempt starting with data:", {
      hasFormData: !!formData,
      formDataContent: formData,
      hasAnalysis: !!analysis,
      analysisContent: analysis
    });

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

    try {
      const { pdf, fileName } = await generateReportPDF({ formData, analysis });
      console.log("BookingSuccess - PDF generated successfully");
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
          <DownloadReportButton onClick={handleDownload} />
        </div>
      ),
      duration: 5000,
    });

    if (onSubmit) {
      onSubmit();
    }
  }, [formData, analysis, onSubmit, toast, handleDownload]);

  return { handleBookingSuccess };
};