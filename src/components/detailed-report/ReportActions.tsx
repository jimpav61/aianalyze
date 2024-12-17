import { Button } from "@/components/ui/button";
import { EmailReportButton } from "./actions/EmailReportButton";
import { DownloadReportButton } from "./actions/DownloadReportButton";

interface ReportActionsProps {
  companyName: string;
  email?: string;
  onBookDemo?: () => void;
  onDownloadComplete?: () => void;
  onEmailComplete?: () => void;
}

export const ReportActions = ({ 
  companyName, 
  email,
  onBookDemo, 
  onDownloadComplete,
  onEmailComplete
}: ReportActionsProps) => {
  console.log("ReportActions - Render", { companyName, email });
  
  const handleBookDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("ReportActions - Book Demo clicked");
    if (onBookDemo) {
      onBookDemo();
    }
  };
  
  return (
    <div className="sticky top-0 z-50 flex justify-end gap-4 bg-white p-4 shadow-md">
      <EmailReportButton
        email={email}
        companyName={companyName}
        onComplete={onEmailComplete}
      />
      <DownloadReportButton
        companyName={companyName}
        onComplete={onDownloadComplete}
      />
      <Button onClick={handleBookDemo}>
        Book a Demo
      </Button>
    </div>
  );
};