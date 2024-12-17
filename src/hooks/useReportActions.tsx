import React from "react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

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
            <Button
              onClick={() => {
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