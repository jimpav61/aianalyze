import { Button } from "@/components/ui/button";
import { EmailReportButton } from "./actions/EmailReportButton";
import { DownloadReportButton } from "./actions/DownloadReportButton";

interface ReportActionsProps {
  companyName: string;
  email?: string;
  onBookDemo?: () => void;
  onDownloadComplete?: () => void;
}

export const ReportActions = ({ 
  companyName, 
  email,
  onBookDemo, 
  onDownloadComplete 
}: ReportActionsProps) => {
  return (
    <div className="sticky top-0 z-50 flex justify-end gap-4 bg-white p-4 shadow-md">
      <EmailReportButton
        email={email}
        companyName={companyName}
        onComplete={onDownloadComplete}
      />
      <DownloadReportButton
        companyName={companyName}
        onComplete={onDownloadComplete}
      />
      <Button onClick={onBookDemo}>Book a Demo</Button>
    </div>
  );
};