import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReportAsPDF } from "@/utils/reportExport";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";

interface DownloadReportButtonProps {
  reportRef: React.RefObject<HTMLDivElement>;
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ reportRef, formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!formData || !analysis) {
      console.error("DownloadReportButton - Missing required data");
      toast({
        title: "Error",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      await exportReportAsPDF(formData, analysis);
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to export PDF:", error);
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