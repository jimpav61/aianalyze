import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { processAllImages } from "@/utils/pdf/imageProcessing";
import { createPDF } from "@/utils/pdf/pdfUtils";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
  reportData?: any;
}

export const DownloadReportButton = ({ formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      const reportContainer = document.querySelector("#detailed-report");
      if (!reportContainer) {
        throw new Error("Report container not found");
      }

      // Create a clone to avoid modifying the original DOM
      const clone = reportContainer.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      
      await processAllImages(clone);
      
      const pdf = await createPDF(clone, `AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      pdf.save(`AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);

      document.body.removeChild(clone);

      toast({
        title: "Success",
        description: "Report downloaded successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Download Report
    </Button>
  );
};