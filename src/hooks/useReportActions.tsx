import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface UseReportActionsProps {
  onBookDemo?: () => void;
}

export const useReportActions = ({ onBookDemo }: UseReportActionsProps) => {
  const { toast } = useToast();
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [showingDownloadToast, setShowingDownloadToast] = useState(false);

  const handleBookDemo = useCallback(() => {
    console.log("useReportActions - handleBookDemo called");
    if (onBookDemo) {
      onBookDemo();
      setHasBooked(true);
      console.log("useReportActions - Demo booked successfully");
    }
  }, [onBookDemo]);

  const handleDownloadComplete = useCallback(() => {
    console.log("useReportActions - handleDownloadComplete called");
    setHasDownloaded(true);
    setShowingDownloadToast(false);
    
    if (!hasBooked) {
      console.log("useReportActions - Showing book demo toast");
      toast({
        title: "Ready for the Next Step?",
        description: "Would you like to book a demo to discuss implementing these solutions?",
        action: (
          <Button 
            onClick={handleBookDemo}
            variant="default"
            size="sm"
          >
            Book Demo
          </Button>
        ),
      });
    }
  }, [hasBooked, handleBookDemo, toast]);

  const showDownloadReminder = useCallback(() => {
    console.log("useReportActions - showDownloadReminder called", {
      hasBooked,
      hasDownloaded,
      showingDownloadToast
    });

    if (hasBooked && !hasDownloaded && !showingDownloadToast) {
      console.log("useReportActions - Showing download reminder toast");
      setShowingDownloadToast(true);
      toast({
        title: "Don't Forget Your Report!",
        description: "Would you like to download or email your personalized AI implementation analysis report?",
        action: (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                console.log("useReportActions - Download PDF button clicked");
                const downloadButton = document.querySelector<HTMLButtonElement>('[aria-label="Download PDF"]');
                if (downloadButton) {
                  downloadButton.click();
                  setShowingDownloadToast(false);
                }
              }}
              variant="default"
              size="sm"
            >
              Download PDF
            </Button>
            <Button
              onClick={() => {
                console.log("useReportActions - Email Report button clicked");
                const emailButton = document.querySelector<HTMLButtonElement>('[aria-label="Email Report"]');
                if (emailButton) {
                  emailButton.click();
                  setShowingDownloadToast(false);
                }
              }}
              variant="default"
              size="sm"
            >
              Email Report
            </Button>
          </div>
        ),
      });
    }
  }, [hasBooked, hasDownloaded, showingDownloadToast, toast]);

  return {
    hasDownloaded,
    hasBooked,
    showingDownloadToast,
    handleBookDemo,
    handleDownloadComplete,
    showDownloadReminder
  };
};