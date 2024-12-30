import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CalendarViewProps {
  onSubmit: () => void;
  formData?: DetailedFormData;
  analysis: any;
  calLink?: string;
}

export const CalendarView = ({ 
  onSubmit, 
  formData, 
  analysis, 
  calLink = "chatsites/demo" 
}: CalendarViewProps) => {
  const { toast } = useToast();
  
  console.log("CalendarView - Render:", { 
    hasFormData: !!formData, 
    hasAnalysis: !!analysis,
    calLink 
  });
  
  useEffect(() => {
    const existingScript = document.getElementById('calendly-script');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'calendly-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      console.log("CalendarView - Calendly script loaded successfully");
      toast({
        title: "Calendar Ready",
        description: "You can now schedule your demo",
        duration: 1500
      });
    };
    
    script.onerror = (error) => {
      console.error("CalendarView - Failed to load Calendly script:", error);
      toast({
        title: "Error",
        description: "Failed to load calendar. Please refresh the page.",
        variant: "destructive",
        duration: 2000
      });
    };
    
    document.head.appendChild(script);
    console.log("CalendarView - Added Calendly script to document head");

    return () => {
      const script = document.getElementById('calendly-script');
      if (script) {
        script.remove();
        console.log("CalendarView - Removed Calendly script during cleanup");
      }
    };
  }, [toast]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
        <p className="text-muted-foreground">
          Choose a time that works best for you
        </p>
      </div>
      <div className="w-full">
        <Calendar 
          calLink={calLink}
          onSubmit={onSubmit}
          formData={formData}
          analysis={analysis}
        />
      </div>
    </div>
  );
};