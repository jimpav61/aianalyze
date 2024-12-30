import { Button } from "../../ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisReport } from "@/utils/pdfGenerator";
import { DetailedFormData } from "@/types/analysis";

interface DownloadButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadButton = ({ formData, analysis }: DownloadButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      console.log("CloseConfirmation DownloadButton - Starting download with data:", {
        hasFormData: !!formData,
        formDataContent: formData,
        hasAnalysis: !!analysis,
        analysisContent: analysis
      });

      if (!formData || !analysis) {
        console.error("CloseConfirmation DownloadButton - Missing required data:", {
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

      // Create a temporary container for the report
      const tempContainer = document.createElement('div');
      tempContainer.id = 'temp-detailed-report';
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      document.body.appendChild(tempContainer);

      // Clone the original report content
      const originalReport = document.getElementById('detailed-report');
      if (originalReport) {
        tempContainer.innerHTML = originalReport.innerHTML;
      } else {
        // If no original report exists, create minimal content
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
      }

      try {
        console.log("CloseConfirmation DownloadButton - Generating PDF...");
        const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        
        // Wait for the temporary container to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const pdf = await generateAnalysisReport({ 
          formData, 
          analysis,
          reportElement: tempContainer 
        });
        
        console.log("CloseConfirmation DownloadButton - PDF generated successfully");
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
      console.error("CloseConfirmation DownloadButton - Error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4" />
      Download Report
    </Button>
  );
};