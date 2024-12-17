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

  const showReportReminder = useCallback(() => {
    console.log("Showing report reminder toast");
    toast({
      title: "Don't Forget Your Report!",
      description: (
        <div className="flex flex-col space-y-2">
          <p className="text-sm">Would you like to save your personalized AI implementation analysis?</p>
          <div className="flex flex-col sm:flex-row gap-2">
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
              className="w-full sm:w-auto"
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
              className="w-full sm:w-auto"
            >
              Email Report
            </Button>
          </div>
        </div>
      ),
      duration: 10000,
    });
  }, [toast]);

  const showBookingReminder = useCallback(() => {
    console.log("Showing booking reminder toast");
    toast({
      title: "Ready for the Next Step?",
      description: (
        <div className="flex flex-col space-y-2">
          <p className="text-sm">Would you like to discuss implementing these AI solutions?</p>
          <Button
            onClick={() => {
              if (onBookDemo) {
                onBookDemo();
              }
              setShowingToast(false);
            }}
            variant="default"
            size="sm"
            className="w-full sm:w-auto"
          >
            Book Demo
          </Button>
        </div>
      ),
      duration: 10000,
    });
  }, [onBookDemo, toast]);

  const handleBookDemo = useCallback(() => {
    console.log("Handling book demo");
    if (onBookDemo) {
      onBookDemo();
      setHasBooked(true);
      
      // Show report reminder after a short delay if they haven't downloaded or emailed
      if (!hasDownloaded && !hasEmailed && !showingToast) {
        setTimeout(() => {
          setShowingToast(true);
          showReportReminder();
        }, 500);
      }
    }
  }, [onBookDemo, hasDownloaded, hasEmailed, showingToast, showReportReminder]);

  const handleReportAction = useCallback((type: 'download' | 'email') => {
    console.log(`Handling report action: ${type}`);
    if (type === 'download') {
      setHasDownloaded(true);
    } else {
      setHasEmailed(true);
    }

    // Show booking reminder after a short delay if they haven't booked
    if (!hasBooked && !showingToast) {
      setTimeout(() => {
        setShowingToast(true);
        showBookingReminder();
      }, 500);
    }
  }, [hasBooked, showingToast, showBookingReminder]);

  return {
    hasDownloaded,
    hasBooked,
    hasEmailed,
    handleBookDemo,
    handleReportAction
  };
};