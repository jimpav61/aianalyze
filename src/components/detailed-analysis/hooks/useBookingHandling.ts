import { useCallback } from "react";
import { DetailedFormData } from "@/types/analysis";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface UseBookingHandlingProps {
  formData: DetailedFormData | null;
  analysis: any;
  onClose: () => void;
}

export const useBookingHandling = ({
  formData,
  analysis,
  onClose
}: UseBookingHandlingProps) => {
  const { toast } = useToast();

  const handleBookingSubmit = useCallback(async () => {
    console.log("DetailedAnalysisDialog - Booking submitted successfully");
    
    if (formData && analysis) {
      try {
        const pdf = await generateAnalysisReport({ formData, analysis });
        const fileName = `AI_Analysis_Report_${formData.companyName}_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
        toast({
          title: "Demo Scheduled Successfully",
          description: "Your report has been downloaded. You can close this window when you're done.",
          duration: 1500,
        });

        // Use setTimeout to delay the close and reload
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("PDF Generation Error:", error);
        toast({
          title: "Error",
          description: "Failed to generate report. Please try again.",
          variant: "destructive",
          duration: 1500,
        });
      }
    }
  }, [formData, analysis, onClose, toast]);

  return {
    handleBookingSubmit
  };
};