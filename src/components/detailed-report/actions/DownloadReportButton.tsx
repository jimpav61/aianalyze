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
    if (!reportRef.current) {
      toast({
        title: "Error",
        description: "Could not generate report. Please try again.",
        variant: "destructive",
        duration: 500,
      });
      return;
    }

    const success = await exportReportAsPDF(reportRef.current);
    
    toast({
      title: success ? "Success" : "Error",
      description: success 
        ? "Report downloaded successfully!" 
        : "Failed to download report. Please try again.",
      variant: success ? "default" : "destructive",
      duration: 500,
    });
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