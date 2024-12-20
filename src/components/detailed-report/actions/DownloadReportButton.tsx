import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisPDF } from "@/utils/pdfGenerator";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    console.log("Download initiated with:", { formData, analysis });

    if (!formData || !analysis) {
      console.error("Missing required data for download");
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Generating PDF...");
      const doc = generateAnalysisPDF({ formData, analysis });
      
      console.log("PDF generated successfully, initiating download");
      doc.save("chatsites-analysis-report.pdf");
      
      console.log("Download completed, showing success toast");
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download PDF
    </Button>
  );
};