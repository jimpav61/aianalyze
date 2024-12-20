import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="w-full bg-[#f65228] hover:bg-[#f65228]/90 text-white"
    >
      <Download className="mr-2 h-4 w-4" />
      Download Your Report
    </Button>
  );
};