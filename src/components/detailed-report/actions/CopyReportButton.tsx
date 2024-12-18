import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyReportButtonProps {
  reportRef: React.RefObject<HTMLDivElement>;
}

export const CopyReportButton = ({ reportRef }: CopyReportButtonProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!reportRef.current) {
      toast({
        title: "Error",
        description: "Could not copy report content",
        variant: "destructive",
      });
      return;
    }

    try {
      const text = reportRef.current.innerText;
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "Report copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy report",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className="flex items-center gap-2"
    >
      <Copy className="h-4 w-4" />
      Copy Report
    </Button>
  );
};