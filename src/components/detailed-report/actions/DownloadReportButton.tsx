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
    try {
      if (!formData || !analysis) {
        throw new Error("Report data not available");
      }

      // Get the report element to capture
      const reportElement = document.getElementById('detailed-report');
      if (!reportElement) {
        throw new Error("Report element not found");
      }

      const pdf = await generateAnalysisReport({ formData, analysis });
      pdf.save(`AI_Analysis_Report_${formData.companyName}_${new Date().toISOString().split('T')[0]}.pdf`);

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
        duration: 1500,
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