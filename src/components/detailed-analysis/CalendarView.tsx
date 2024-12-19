import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";
import { useState } from "react";

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
  calLink = "jimmy-chatsites/30min"
}: CalendarViewProps) => {
  const [isBooked, setIsBooked] = useState(false);

  const handleCalendarEvent = () => {
    console.log("[DEBUG] CalendarView - Calendar event received");
    setIsBooked(true);
    onSubmit();
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule Your Demo</h2>
      
      <Calendar 
        calLink={calLink}
        onSubmit={handleCalendarEvent}
        formData={formData}
        analysis={analysis}
      />

      {isBooked && (
        <div className="text-center mt-4">
          <span className="font-medium">30 Minute Meeting Confirmed</span>
        </div>
      )}
    </div>
  );
};