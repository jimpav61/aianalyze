import { Calendar } from "../Calendar";
import { DetailedFormData } from "@/types/analysis";
import { useState } from "react";

interface CalendarViewProps {
  onSubmit: () => void;
  formData?: DetailedFormData;
  analysis?: any;
}

export const CalendarView = ({ onSubmit, formData, analysis }: CalendarViewProps) => {
  const [isBooked, setIsBooked] = useState(false);
  
  const calLink = "chatsites/demo";

  const handleBookingSuccess = () => {
    console.log("CalendarView - Booking successful");
    setIsBooked(true);
    onSubmit();
  };
  
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Schedule Your Demo</h2>
        <p className="text-muted-foreground">
          Choose a time that works best for you
        </p>
      </div>
      
      <div className="w-full">
        <Calendar 
          calLink={calLink}
          onSubmit={handleBookingSuccess}
          formData={formData}
          analysis={analysis}
        />
      </div>

      {isBooked && (
        <div className="text-center text-sm mt-4">
          <span className="font-medium">30 Minute Meeting Confirmed</span>
        </div>
      )}
    </div>
  );
};