import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface UseReportActionsProps {
  onBookDemo?: () => void;
}

export const useReportActions = ({ onBookDemo }: UseReportActionsProps) => {
  const { toast } = useToast();
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasEmailed, setHasEmailed] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [showingToast, setShowingToast] = useState(false);

  // Helper to check if user has either downloaded or emailed
  const hasReportCopy = useCallback(() => {
    return hasDownloaded || hasEmailed;
  }, [hasDownloaded, hasEmailed]);

  const handleBookDemo = useCallback(() => {
    console.log("useReportActions - handleBookDemo called");
    if (onBookDemo) {
      onBookDemo();
      setHasBooked(true);
      
      // After booking, check if they need a reminder to get their report
      if (!hasReportCopy() && !showingToast) {
        console.log("useReportActions - Showing download/email reminder after booking");
        setShowingToast(true);
        toast({
          title: "Don't Forget Your Report!",
          description: "Would you like to download or email your personalized AI implementation analysis report?",
          action: (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const downloadButton = document.querySelector<HTMLButtonElement>('[aria-label="Download PDF"]');
                  if (downloadButton) {
                    downloadButton.click();
                  }
                  setShowingToast(false);
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
                  }
                  setShowingToast(false);
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
    }
  }, [onBookDemo, hasReportCopy, showingToast, toast]);

  const handleReportAction = useCallback((type: 'download' | 'email') => {
    console.log(`useReportActions - handle${type} called`);
    if (type === 'download') {
      setHasDownloaded(true);
    } else {
      setHasEmailed(true);
    }

    // After getting report, check if they need a booking reminder
    if (!hasBooked && !showingToast) {
      console.log("useReportActions - Showing booking reminder after report action");
      setShowingToast(true);
      toast({
        title: "Ready for the Next Step?",
        description: "Would you like to book a demo to discuss implementing these solutions?",
        action: (
          <Button 
            onClick={() => {
              handleBookDemo();
              setShowingToast(false);
            }}
            variant="default"
            size="sm"
          >
            Book Demo
          </Button>
        ),
      });
    }
  }, [hasBooked, showingToast, toast, handleBookDemo]);

  return {
    hasDownloaded,
    hasBooked,
    hasEmailed,
    handleBookDemo,
    handleReportAction
  };
};