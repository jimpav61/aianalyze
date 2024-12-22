import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

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
    console.log("[DOWNLOAD TEST] BookingSuccess - Download attempt with data:", {
      hasFormData: !!formData,
      formDataContent: formData,
      hasAnalysis: !!analysis,
      analysisContent: analysis,
      timestamp: new Date().toISOString()
    });

    if (!formData || !analysis) {
      console.error("[DOWNLOAD TEST] BookingSuccess - Missing required data:", {
        formData,
        analysis
      });
      
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("[DOWNLOAD TEST] BookingSuccess - Generating full PDF report with data:", {
        formData,
        analysis,
        timestamp: new Date().toISOString()
      });
      
      const doc = await generateAnalysisReport({ formData, analysis });
      console.log("[DOWNLOAD TEST] BookingSuccess - PDF generated successfully, attempting save...");
      doc.save(`AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      console.log("[DOWNLOAD TEST] BookingSuccess - PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Full report downloaded successfully!",
      });
    } catch (error) {
      console.error("[DOWNLOAD TEST] BookingSuccess - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  }, [formData, analysis, toast]);

  const handleBookingSuccess = useCallback(() => {
    console.log("[DOWNLOAD TEST] BookingSuccess - Booking success handler triggered with data:", {
      formData,
      analysis,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Success!",
      description: (
        <div className="space-y-2">
          <p>Your demo has been scheduled. Check your email for confirmation.</p>
          <Button 
            onClick={handleDownload}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Full Report
          </Button>
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