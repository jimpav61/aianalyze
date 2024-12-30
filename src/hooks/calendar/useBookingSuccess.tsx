import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

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

    console.log("BookingSuccess Toast - Download attempt starting with data:", {
      hasFormData: !!formData,
      formDataContent: formData,
      hasAnalysis: !!analysis,
      analysisContent: analysis
    });

    if (!formData || !analysis) {
      console.error("BookingSuccess Toast - Download failed - Missing required data");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create PDF directly without relying on DOM elements
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text("AI Implementation Analysis Report", 20, 20);
      
      // Company Information
      doc.setFontSize(16);
      doc.text("Company Information", 20, 40);
      doc.setFontSize(12);
      doc.text(`Company: ${formData.companyName}`, 20, 50);
      doc.text(`Contact: ${formData.ownerName}`, 20, 60);
      doc.text(`Email: ${formData.email}`, 20, 70);
      doc.text(`Phone: ${formData.phoneNumber}`, 20, 80);
      
      // Analysis Results
      doc.setFontSize(16);
      doc.text("Primary Analysis", 20, 100);
      doc.setFontSize(12);
      doc.text(`Industry: ${analysis.industry}`, 20, 110);
      doc.text(`Department: ${analysis.department}`, 20, 120);
      doc.text(`Function: ${analysis.bot_function}`, 20, 130);
      doc.text(`Projected Annual Savings: $${analysis.savings.toLocaleString()}`, 20, 140);
      doc.text(`Projected Profit Increase: ${analysis.profit_increase}%`, 20, 150);
      
      // Implementation Details
      doc.setFontSize(16);
      doc.text("Implementation Details", 20, 170);
      doc.setFontSize(12);
      
      // Split long text into multiple lines
      const splitExplanation = doc.splitTextToSize(analysis.explanation, 170);
      doc.text(splitExplanation, 20, 180);
      
      const splitStrategy = doc.splitTextToSize(analysis.marketing_strategy, 170);
      doc.text(splitStrategy, 20, 200);

      // Additional Analyses if available
      if (analysis.allAnalyses && analysis.allAnalyses.length > 1) {
        let yPos = 220;
        doc.setFontSize(16);
        doc.text("Additional Opportunities", 20, yPos);
        
        analysis.allAnalyses.slice(1).forEach((additionalAnalysis: any, index: number) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.setFontSize(14);
          doc.text(`${additionalAnalysis.department}`, 20, yPos + 20);
          doc.setFontSize(12);
          doc.text(`Function: ${additionalAnalysis.function}`, 20, yPos + 30);
          doc.text(`Savings: $${Number(additionalAnalysis.savings).toLocaleString()}`, 20, yPos + 40);
          doc.text(`Profit Increase: ${additionalAnalysis.profit_increase}%`, 20, yPos + 50);
          
          yPos += 70;
        });
      }

      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log("BookingSuccess Toast - PDF generated successfully, saving as:", fileName);
      
      doc.save(fileName);
      console.log("BookingSuccess Toast - PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("BookingSuccess Toast - PDF Generation/Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  }, [formData, analysis, toast]);

  const handleBookingSuccess = useCallback(() => {
    console.log("BookingSuccess Toast - Booking success handler triggered with data:", {
      formData,
      analysis
    });

    toast({
      title: "Success!",
      description: (
        <div className="space-y-2">
          <p>Your demo has been scheduled. Check your email for confirmation.</p>
          <Button 
            onClick={(e) => handleDownload(e)}
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