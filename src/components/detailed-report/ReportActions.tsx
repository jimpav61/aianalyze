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
  return (
    <div className="flex flex-wrap gap-4 items-center justify-end">
      <Button onClick={onBookDemo} size="sm" className="bg-[#f65228] hover:bg-[#d43d16] text-white">
        Book Demo
      </Button>
      <Button 
        onClick={() => {
          const reportElement = document.getElementById('detailed-report');
          if (reportElement) {
            generateAnalysisReport({ formData, analysis });
          }
        }} 
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