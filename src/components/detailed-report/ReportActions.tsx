import { DownloadReportButton } from "./actions/DownloadReportButton";
import { EmailReportButton } from "./actions/EmailReportButton";
import { Button } from "../ui/button";
import { DetailedFormData } from "@/types/analysis";

interface ReportActionsProps {
  onBookDemo?: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const ReportActions = ({ onBookDemo, formData, analysis }: ReportActionsProps) => {
  return (
    <div className="flex gap-4 items-center">
      <DownloadReportButton 
        formData={formData} 
        analysis={analysis}
      />
      <EmailReportButton onComplete={onBookDemo} />
      {onBookDemo && (
        <Button 
          onClick={onBookDemo}
          className="bg-[#f65228] hover:bg-[#f65228]/90 text-white"
        >
          Book a Demo
        </Button>
      )}
    </div>
  );
};