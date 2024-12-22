import { DownloadReportButton } from "./actions/DownloadReportButton";
import { Button } from "../ui/button";
import { DetailedFormData } from "@/types/analysis";

interface ReportActionsProps {
  onBookDemo?: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const ReportActions = ({ onBookDemo, formData, analysis }: ReportActionsProps) => {
  console.log("ReportActions - Render with data:", { 
    hasFormData: !!formData, 
    hasAnalysis: !!analysis 
  });

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
      <DownloadReportButton 
        formData={formData} 
        analysis={analysis}
      />
      {onBookDemo && (
        <Button 
          onClick={onBookDemo}
          className="bg-[#f65228] hover:bg-[#f65228]/90 text-white w-full sm:w-auto"
        >
          Book a Demo
        </Button>
      )}
    </div>
  );
};