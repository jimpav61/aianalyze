import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import { generateAnalysisReport } from "@/utils/pdfGenerator";
import { DownloadReportButton } from "./actions/DownloadReportButton";

interface ReportActionsProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportActions = ({ formData, analysis, onBookDemo }: ReportActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-end">
      <DownloadReportButton formData={formData} analysis={analysis} />
      {onBookDemo && (
        <Button onClick={onBookDemo} size="sm" className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
          Book Demo
        </Button>
      )}
    </div>
  );
};