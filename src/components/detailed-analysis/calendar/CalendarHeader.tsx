import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface CalendarHeaderProps {
  onDownload: () => void;
}

export const CalendarHeader = ({ onDownload }: CalendarHeaderProps) => {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
      <p className="text-muted-foreground mb-4">
        Choose a time that works best for you
      </p>
      <Button
        onClick={onDownload}
        className="flex items-center gap-2 bg-[#f65228] hover:bg-[#f65228]/90 text-white mb-6"
      >
        <Download className="h-4 w-4" />
        Download Your Report
      </Button>
    </div>
  );
};