import { Calendar } from "@/components/Calendar";
import { DetailedFormData } from "@/types/analysis";

interface CalendarEmbedProps {
  calLink: string;
  onSubmit: () => void;
  formData?: DetailedFormData;
  analysis: any;
}

export const CalendarEmbedWrapper = ({ 
  calLink, 
  onSubmit, 
  formData, 
  analysis 
}: CalendarEmbedProps) => {
  return (
    <Calendar 
      calLink={calLink}
      onSubmit={onSubmit}
      formData={formData}
      analysis={analysis}
    />
  );
};