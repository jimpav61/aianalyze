import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateFullReport, getReportFileName } from "@/utils/pdf/reportHandler";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      const pdf = await generateFullReport({ formData, analysis });
      const fileName = getReportFileName(formData.companyName);
      
      pdf.save(fileName);
      
      toast({
        title: "Success",
        description: "Report downloaded successfully",
        duration: 1500,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm" className="bg-white hover:bg-gray-50">
      <Download className="mr-2 h-4 w-4 text-[#9b87f5]" />
      Download Report
    </Button>
  );
};