import { Button } from "../ui/button";
import { Download, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

interface ReportActionsProps {
  companyName: string;
  onBookDemo?: () => void;
}

export const ReportActions = ({ companyName, onBookDemo }: ReportActionsProps) => {
  const { toast } = useToast();
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('detailed-report');
    if (!element) return;

    toast({
      title: "Generating PDF",
      description: "Please wait while we prepare your report...",
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${companyName}-AI-Implementation-Analysis.pdf`);

      setHasDownloaded(true);
      toast({
        title: "Success",
        description: "Your report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white pb-4 mb-4 flex justify-end gap-4">
      <Button
        onClick={onBookDemo}
        className="gap-2"
        variant="outline"
      >
        <CalendarDays className="w-4 h-4" />
        Book A Demo
      </Button>
      <Button
        onClick={handleDownloadPDF}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
    </div>
  );
};