import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadReportButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export const DownloadReportButton = ({ onClick }: DownloadReportButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <Button 
      onClick={handleClick}
      variant="outline" 
      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
    >
      <Download className="h-4 w-4 text-[#f65228]" />
      Download Report
    </Button>
  );
};