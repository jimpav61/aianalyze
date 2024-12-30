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
      console.log("CloseConfirmation DownloadButton - Download attempt starting with data:", {
        hasFormData: !!formData,
        hasAnalysis: !!analysis,
        formDataContent: formData,
        analysisContent: analysis,
      });

      if (!formData || !analysis) {
        console.error("CloseConfirmation DownloadButton - Download failed - Missing required data");
        throw new Error("Report data not available");
      }

      const fileName = `AI_Analysis_Report_${formData.companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log("CloseConfirmation DownloadButton - Generating PDF with filename:", fileName);
      
      // Wait a brief moment to ensure the report element is ready
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const pdf = await generateAnalysisReport({ formData, analysis });
      console.log("CloseConfirmation DownloadButton - PDF generated successfully, saving file");
      
      pdf.save(fileName);
      console.log("CloseConfirmation DownloadButton - PDF saved successfully");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error("CloseConfirmation DownloadButton - Download error:", error);
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