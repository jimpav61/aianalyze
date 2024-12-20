import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReportAsPDF } from "@/utils/reportExport";
import { useToast } from "@/hooks/use-toast";

interface DownloadReportButtonProps {
  reportRef: React.RefObject<HTMLDivElement>;
}

export const DownloadReportButton = ({ reportRef }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    console.log("DownloadReportButton - Starting download");
    if (!reportRef?.current) {
      console.error("DownloadReportButton - No report ref found");
      toast({
        title: "Error",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await exportReportAsPDF(reportRef.current);
      console.log("DownloadReportButton - Download result:", success);
      
      toast({
        title: success ? "Success" : "Error",
        description: success 
          ? "Report downloaded successfully!" 
          : "Failed to download report. Please try again.",
        variant: success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("DownloadReportButton - Download error:", error);
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