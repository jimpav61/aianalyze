import { toast } from "@/hooks/use-toast";

export const showReportReminder = () => {
  console.log("Showing report reminder toast");
  toast({
    title: "Don't Forget Your Report!",
    description: (
      <div className="flex flex-col space-y-2 max-w-[90vw] sm:max-w-md">
        <p className="text-sm">Would you like to save your personalized AI implementation analysis?</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              const downloadButton = document.querySelector<HTMLButtonElement>('[aria-label="Download PDF"]');
              if (downloadButton) {
                downloadButton.click();
              }
            }}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
          >
            Download PDF
          </button>
          <button
            onClick={() => {
              const emailButton = document.querySelector<HTMLButtonElement>('[aria-label="Email Report"]');
              if (emailButton) {
                emailButton.click();
              }
            }}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
          >
            Email Report
          </button>
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
      <div className="flex flex-col space-y-2 max-w-[90vw] sm:max-w-md">
        <p className="text-sm">Would you like to discuss implementing these AI solutions?</p>
        <button
          onClick={() => {
            if (onBookDemo) {
              onBookDemo();
            }
          }}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          Book Demo
        </button>
      </div>
    ),
    duration: 10000,
  });
};