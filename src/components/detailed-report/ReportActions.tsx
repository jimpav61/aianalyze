import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisReport } from "@/utils/pdfGenerator";

interface ReportActionsProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportActions = ({ formData, analysis, onBookDemo }: ReportActionsProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      console.log("ReportActions - Starting download with data:", {
        formData,
        analysis
      });

      const pdf = await generateAnalysisReport({ formData, analysis });
      const fileName = `AI_Analysis_Report_${formData.companyName}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log("ReportActions - Generated PDF, attempting to save as:", fileName);
      
      pdf.save(fileName);
      
      console.log("ReportActions - PDF saved successfully");
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
    } catch (error) {
      console.error("ReportActions - Download error:", error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-end">
      <Button onClick={onBookDemo} size="sm" className="bg-[#f65228] hover:bg-[#d43d16] text-white">
        Book Demo
      </Button>
      <Button 
        onClick={handleDownload}
        variant="outline" 
        size="sm" 
        className="bg-white hover:bg-gray-50"
      >
        <Download className="mr-2 h-4 w-4 text-[#f65228]" />
        Download Report
      </Button>
    </div>
  );
};