import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

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
      // Get the report element
      const reportElement = document.getElementById('detailed-report');
      
      // Create a temporary container if the report element doesn't exist
      let tempContainer = null;
      if (!reportElement) {
        console.log("BookingSuccess - Creating temporary report container");
        tempContainer = document.createElement('div');
        tempContainer.id = 'temp-report';
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '900px';
        tempContainer.innerHTML = `
          <div id="detailed-report" class="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <h1 class="text-2xl font-bold">${formData.companyName} - AI Implementation Analysis</h1>
            <div class="space-y-4">
              <h2 class="text-xl font-semibold">Primary Implementation</h2>
              <p>${analysis.explanation}</p>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h3 class="font-medium">Projected Savings</h3>
                  <p>$${analysis.savings.toLocaleString()}</p>
                </div>
                <div>
                  <h3 class="font-medium">Profit Increase</h3>
                  <p>${analysis.profit_increase}%</p>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(tempContainer);
      }

      const elementToCapture = reportElement || tempContainer?.querySelector('#detailed-report');
      if (!elementToCapture) {
        throw new Error("Could not create or find report element");
      }

      const canvas = await html2canvas(elementToCapture, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Clean up temporary container if we created one
      if (tempContainer) {
        document.body.removeChild(tempContainer);
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      
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

    if (onSubmit) {
      onSubmit();
    }
  }, [formData, analysis, onSubmit, toast, handleDownload]);

  return { handleBookingSuccess };
};