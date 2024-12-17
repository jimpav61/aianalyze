import React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export const showReportReminder = () => {
  console.log("Showing report reminder toast");
  
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    toast({
      title: "Don't Forget Your Report!",
      description: (
        <div className="flex flex-col space-y-2 w-full max-w-[90vw] sm:max-w-md">
          <p className="text-sm text-muted-foreground">
            Would you like to save your personalized AI implementation analysis?
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              className="w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                try {
                  const downloadButton = document.querySelector<HTMLButtonElement>(
                    '[aria-label="Download PDF"]'
                  );
                  if (downloadButton) {
                    downloadButton.click();
                  } else {
                    console.warn("Download button not found");
                  }
                } catch (error) {
                  console.error("Error clicking download button:", error);
                }
              }}
            >
              Download PDF
            </Button>
            <Button
              variant="default"
              className="w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                try {
                  const emailButton = document.querySelector<HTMLButtonElement>(
                    '[aria-label="Email Report"]'
                  );
                  if (emailButton) {
                    emailButton.click();
                  } else {
                    console.warn("Email button not found");
                  }
                } catch (error) {
                  console.error("Error clicking email button:", error);
                }
              }}
            >
              Email Report
            </Button>
          </div>
        </div>
      ),
      duration: 10000,
    });
  });
};

export const showBookingReminder = (onBookDemo?: () => void) => {
  console.log("Showing booking reminder toast");
  
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    toast({
      title: "Ready for the Next Step?",
      description: (
        <div className="flex flex-col space-y-2 w-full max-w-[90vw] sm:max-w-md">
          <p className="text-sm text-muted-foreground">
            Would you like to discuss implementing these AI solutions?
          </p>
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              try {
                if (onBookDemo) {
                  onBookDemo();
                }
              } catch (error) {
                console.error("Error executing book demo callback:", error);
              }
            }}
          >
            Book Demo
          </Button>
        </div>
      ),
      duration: 10000,
    });
  });
};