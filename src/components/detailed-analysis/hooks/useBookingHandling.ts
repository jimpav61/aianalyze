import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface UseBookingHandlingProps {
  formData?: DetailedFormData;
  analysis?: any;
  onClose: () => void;
}

export const useBookingHandling = ({
  formData,
  analysis,
  onClose
}: UseBookingHandlingProps) => {
  const { toast } = useToast();

  const handleBookingSubmit = useCallback(async () => {
    console.log("DetailedAnalysisDialog - Handling booking submit with data:", {
      formData,
      analysis
    });

    if (formData && analysis) {
      try {
        const doc = await generateAnalysisReport({ formData, analysis });
        doc.save(`AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast({
          title: "Demo Scheduled Successfully",
          description: "Your report has been downloaded. You can close this window when you're done.",
          duration: 1500,
        });

        setTimeout(() => {
          onClose();
          // Reset the form state by clearing the URL
          window.history.pushState({}, '', '/');
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