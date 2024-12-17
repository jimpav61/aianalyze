import React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const findAndClickButton = (selector: string) => {
  return new Promise<boolean>((resolve) => {
    requestAnimationFrame(() => {
      const button = document.querySelector(selector);
      if (button instanceof HTMLButtonElement) {
        console.log(`Found button ${selector}, clicking...`);
        button.click();
        resolve(true);
      } else {
        console.warn(`Button ${selector} not found`);
        resolve(false);
      }
    });
  });
};

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
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await findAndClickButton('[aria-label="Download PDF"]');
            }}
          >
            Download PDF
          </Button>
          <Button
            variant="default"
            className="w-full sm:w-auto"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await findAndClickButton('[aria-label="Email Report"]');
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
            if (onBookDemo) {
              console.log("Executing onBookDemo from toast");
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