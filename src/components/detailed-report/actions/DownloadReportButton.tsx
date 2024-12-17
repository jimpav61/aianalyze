import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadReportButtonProps {
  companyName: string;
  onComplete?: () => void;
}

export const DownloadReportButton = ({ companyName, onComplete }: DownloadReportButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const report = document.getElementById("detailed-report");
      if (!report) {
        throw new Error("Report element not found");
      }

      const originalStyle = report.style.cssText;
      report.style.maxHeight = 'none';
      report.style.overflow = 'visible';
      report.style.position = 'relative';

      const canvas = await html2canvas(report, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        windowHeight: report.scrollHeight,
        height: report.scrollHeight
      });

      report.style.cssText = originalStyle;
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const totalPages = Math.ceil(imgHeight * ratio / pdfHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          -(page * pdfHeight),
          imgWidth * ratio,
          imgHeight * ratio,
          undefined,
          'FAST'
        );
      }

      pdf.save(`${companyName}-AI-Implementation-Analysis.pdf`);
      
      onComplete?.();
      toast({
        title: "Success",
        description: "Report downloaded successfully",
      });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label="Download PDF"
    >
      {isDownloading ? (
        "Downloading..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
};