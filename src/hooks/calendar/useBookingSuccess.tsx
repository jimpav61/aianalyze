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
    console.log("BookingSuccess - Download attempt starting with data:", {
      hasFormData: !!formData,
      formDataContent: formData,
      hasAnalysis: !!analysis,
      analysisContent: analysis,
      hasAllAnalyses: !!analysis?.allAnalyses,
      analysesCount: analysis?.allAnalyses?.length || 1
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
      });
      return;
    }

    try {
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        console.error("BookingSuccess - Report element not found in DOM");
        throw new Error("Report element not found");
      }

      console.log("BookingSuccess - Found report element, checking content:", {
        childNodes: reportElement.childNodes.length,
        cards: reportElement.getElementsByClassName('card').length,
        height: reportElement.offsetHeight,
        scrollHeight: reportElement.scrollHeight
      });

      console.log("BookingSuccess - Generating PDF with data:", {
        formData,
        analysis
      });
      
      const doc = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      console.log("BookingSuccess - PDF generated successfully, attempting save as:", fileName);
      doc.save(fileName);
      console.log("BookingSuccess - PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("BookingSuccess - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
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
          <Button 
            onClick={handleDownload}
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 text-[#f65228]" />
            Download Report
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