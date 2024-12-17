import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const findAndClickButton = (selector: string) => {
  return new Promise<boolean>((resolve) => {
    let attempts = 0;
    const maxAttempts = 20; // Increased max attempts
    const interval = 100; // Add a small delay between attempts
    
    const tryClick = () => {
      const button = document.querySelector(selector);
      if (button instanceof HTMLButtonElement) {
        console.log(`Found button ${selector}, clicking...`);
        try {
          button.click();
          resolve(true);
        } catch (error) {
          console.error(`Error clicking button ${selector}:`, error);
          resolve(false);
        }
      } else {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryClick, interval);
        } else {
          console.error(`Button ${selector} not found after ${maxAttempts} attempts`);
          resolve(false);
        }
      }
    };
    
    // Start the first attempt
    tryClick();
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTimeout(() => {
                findAndClickButton('[aria-label="Download PDF"]');
              }, 100);
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
              setTimeout(() => {
                findAndClickButton('[aria-label="Email Report"]');
              }, 100);
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
              setTimeout(() => {
                onBookDemo();
              }, 100);
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