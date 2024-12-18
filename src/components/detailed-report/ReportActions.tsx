import { DownloadReportButton } from "./actions/DownloadReportButton";
import { EmailReportButton } from "./actions/EmailReportButton";

interface ReportActionsProps {
  reportRef: React.RefObject<HTMLDivElement>;
  onBookDemo?: () => void;
}

export const ReportActions = ({ reportRef, onBookDemo }: ReportActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-8">
      <DownloadReportButton reportRef={reportRef} />
      <EmailReportButton onComplete={onBookDemo} />
    </div>
  );
};