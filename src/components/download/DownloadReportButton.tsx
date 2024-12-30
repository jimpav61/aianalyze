import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DetailedFormData } from "@/types/analysis";

interface DownloadReportButtonProps {
  onClick: () => void;
}

export const DownloadReportButton = ({ onClick }: DownloadReportButtonProps) => {
  return (
    <Button 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      variant="outline" 
      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
    >
      <Download className="h-4 w-4 text-[#f65228]" />
      Download Report
    </Button>
  );
};