import { DownloadReportButton } from "./actions/DownloadReportButton";
import { EmailReportButton } from "./actions/EmailReportButton";
import { Button } from "../ui/button";

interface ReportActionsProps {
  reportRef: React.RefObject<HTMLDivElement>;
  onBookDemo?: () => void;
}

export const ReportActions = ({ reportRef, onBookDemo }: ReportActionsProps) => {
  return (
    <div className="flex gap-4 items-center">
      <DownloadReportButton reportRef={reportRef} />
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