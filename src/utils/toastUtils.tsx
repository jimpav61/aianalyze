import React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export const showReportReminder = () => {
  console.log("Showing report reminder toast");
  
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
              e.stopPropagation();
              console.log("Download button clicked from toast");
              const downloadButton = document.querySelector('[aria-label="Download PDF"]') as HTMLButtonElement;
              if (downloadButton) {
                downloadButton.click();
              } else {
                console.warn("Download button not found");
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
              e.stopPropagation();
              console.log("Email button clicked from toast");
              const emailButton = document.querySelector('[aria-label="Email Report"]') as HTMLButtonElement;
              if (emailButton) {
                emailButton.click();
              } else {
                console.warn("Email button not found");
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
};

export const showBookingReminder = (onBookDemo?: () => void) => {
  console.log("Showing booking reminder toast");
  
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
            e.stopPropagation();
            console.log("Book demo clicked from toast");
            if (onBookDemo) {
              onBookDemo();
            }
          }}
        >
          Book Demo
        </Button>
      </div>
    ),
    duration: 10000,
  });
};