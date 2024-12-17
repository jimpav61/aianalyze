import React from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const findAndClickButton = (selector: string, maxAttempts = 10, interval = 100) => {
  let attempts = 0;
  
  const tryClick = () => {
    const button = document.querySelector(selector);
    if (button instanceof HTMLButtonElement) {
      console.log(`Found and clicking ${selector}`);
      button.click();
      return true;
    }
    
    attempts++;
    if (attempts < maxAttempts) {
      console.log(`Button ${selector} not found, attempt ${attempts}/${maxAttempts}`);
      setTimeout(tryClick, interval);
    } else {
      console.warn(`Failed to find button ${selector} after ${maxAttempts} attempts`);
    }
  };
  
  tryClick();
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              findAndClickButton('[aria-label="Download PDF"]');
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
              findAndClickButton('[aria-label="Email Report"]');
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