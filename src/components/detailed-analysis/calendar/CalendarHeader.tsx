import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CalendarHeaderProps {
  onDownload?: () => void;
  showDownload?: boolean;
}

export const CalendarHeader = ({ onDownload, showDownload }: CalendarHeaderProps) => {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
      <p className="text-muted-foreground mb-4">
        Choose a time that works best for you
      </p>
      {showDownload && onDownload && (
        <div className="flex justify-center">
          <Button
            onClick={onDownload}
            size="lg"
            className="w-full max-w-[300px] bg-[#f65228] hover:bg-[#f65228]/90 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Your Report
          </Button>
        </div>
      )}
    </div>
  );
};