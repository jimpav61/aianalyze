import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";
import { useEffect } from "react";

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
  console.log("CalendarView - Render:", { hasFormData: !!formData, hasAnalysis: !!analysis });
  
  useEffect(() => {
    // Ensure Calendly script is loaded
    if (!document.getElementById('calendly-script')) {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Schedule Your Demo</h2>
        <p className="text-muted-foreground">
          Choose a time that works best for you
        </p>
      </div>
      <Calendar 
        calLink={calLink}
        onSubmit={onSubmit}
        formData={formData}
        analysis={analysis}
      />
    </>
  );
};