import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    console.log("DownloadReportButton - Starting download with:", {
      hasFormData: !!formData,
      formDataContent: formData,
      hasAnalysis: !!analysis,
      timestamp: new Date().toISOString()
    });

    try {
      if (!formData || !analysis) {
        console.error("DownloadReportButton - Missing required data:", {
          formData,
          analysis
        });
        throw new Error("Report data not available");
      }

      console.log("DownloadReportButton - Generating full PDF report with data:", {
        formData,
        analysis,
        timestamp: new Date().toISOString()
      });
      
      const pdf = await generateAnalysisReport({ formData, analysis });
      console.log("DownloadReportButton - PDF generated successfully");
      
      pdf.save(`AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      console.log("DownloadReportButton - PDF saved successfully");

      toast({
        title: "Success",
        description: "Your detailed analysis report has been downloaded",
      });
    } catch (error) {
      console.error('DownloadReportButton - Error generating PDF:', error);
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
      Download Full Report
    </Button>
  );
};