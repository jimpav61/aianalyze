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
    if (!formData || !analysis) {
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const doc = await generateAnalysisReport({ formData, analysis });
      doc.save("chatsites-analysis-report.pdf");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
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
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Download PDF</span>
      <span className="sm:hidden">Download</span>
    </Button>
  );
};