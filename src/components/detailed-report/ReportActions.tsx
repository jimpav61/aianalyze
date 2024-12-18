import { EmailReportButton } from "./actions/EmailReportButton";
import { DownloadReportButton } from "./actions/DownloadReportButton";

interface ReportActionsProps {
  reportRef: React.RefObject<HTMLDivElement>;
  onBookDemo: () => void;
}

export const ReportActions = ({ reportRef, onBookDemo }: ReportActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-8">
      <DownloadReportButton reportRef={reportRef} />
      <EmailReportButton onBookDemo={onBookDemo} />
    </div>
  );
};