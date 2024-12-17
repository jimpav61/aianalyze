import { useState } from "react";
import { useToast } from "./use-toast";

interface UseReportActionsProps {
  onBookDemo?: () => void;
}

export const useReportActions = ({ onBookDemo }: UseReportActionsProps) => {
  const { toast } = useToast();
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [showingDownloadToast, setShowingDownloadToast] = useState(false);

  const handleBookDemo = () => {
    if (onBookDemo) {
      onBookDemo();
      setHasBooked(true);
    }
  };

  const handleDownloadComplete = () => {
    setHasDownloaded(true);
    setShowingDownloadToast(false);
    
    if (!hasBooked) {
      toast({
        title: "Ready for the Next Step?",
        description: "Would you like to book a demo to discuss implementing these solutions?",
        duration: 5000,
        action: (
          <button
            onClick={handleBookDemo}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
          >
            Book Demo
          </button>
        ),
      });
    }
  };

  const showDownloadReminder = () => {
    if (hasBooked && !hasDownloaded && !showingDownloadToast) {
      setShowingDownloadToast(true);
      toast({
        title: "Don't Forget Your Report!",
        description: "Would you like to download or email your personalized AI implementation analysis report?",
        duration: null,
        action: (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                const downloadButton = document.querySelector<HTMLButtonElement>('[aria-label="Download PDF"]');
                if (downloadButton) {
                  downloadButton.click();
                  setShowingDownloadToast(false);
                }
              }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
            >
              Download PDF
            </button>
            <button
              onClick={() => {
                const emailButton = document.querySelector<HTMLButtonElement>('[aria-label="Email Report"]');
                if (emailButton) {
                  emailButton.click();
                  setShowingDownloadToast(false);
                }
              }}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium"
            >
              Email Report
            </button>
          </div>
        ),
      });
    }
  };

  return {
    hasDownloaded,
    hasBooked,
    showingDownloadToast,
    handleBookDemo,
    handleDownloadComplete,
    showDownloadReminder
  };
};