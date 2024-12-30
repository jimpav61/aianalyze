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
      // Create a temporary container for the report
      const tempContainer = document.createElement('div');
      tempContainer.id = 'temp-detailed-report';
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      document.body.appendChild(tempContainer);

      // Add minimal content for PDF generation
      tempContainer.innerHTML = `
        <div class="space-y-8">
          <h2 class="text-2xl font-bold">AI Implementation Analysis</h2>
          <div class="space-y-4">
            <h3 class="text-xl">Company Information</h3>
            <p>Company: ${formData.companyName}</p>
            <p>Industry: ${analysis.industry}</p>
            <p>Department: ${analysis.department}</p>
            <h3 class="text-xl">Analysis Results</h3>
            <p>Projected Savings: $${analysis.savings.toLocaleString()}</p>
            <p>Profit Increase: ${analysis.profit_increase}%</p>
            <p>${analysis.explanation}</p>
            <p>${analysis.marketing_strategy}</p>
          </div>
        </div>
      `;

      try {
        console.log("BookingSuccess - Generating PDF...");
        const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        
        // Wait for the temporary container to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const pdf = await generateAnalysisReport({ 
          formData, 
          analysis,
          reportElement: tempContainer 
        });
        
        console.log("BookingSuccess - PDF generated successfully");
        pdf.save(fileName);
        
        toast({
          title: "Success",
          description: "Report downloaded successfully!",
          duration: 3000,
        });
      } finally {
        // Clean up the temporary container
        document.body.removeChild(tempContainer);
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