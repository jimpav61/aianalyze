import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  onClick: () => void;
  className?: string;
}

export const DownloadButton = ({ onClick, className }: DownloadButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={`w-full bg-[#f65228] hover:bg-[#f65228]/90 text-white ${className}`}
    >
      <Download className="mr-2 h-4 w-4" />
      Download Your Report
    </Button>
  );
};