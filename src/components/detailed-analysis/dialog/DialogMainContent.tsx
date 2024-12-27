import { CalendarView } from "../CalendarView";
import { DialogContent } from "../DialogContent";

interface DialogMainContentProps {
  showCalendar: boolean;
  showReport: boolean;
  formData: any;
  onSubmit: (data: any) => void;
  industry?: string;
  analysis?: any;
  onBookDemo: () => void;
  handleBookingSubmit: () => void;
}

export const DialogMainContent = ({
  showCalendar,
  showReport,
  formData,
  onSubmit,
  industry,
  analysis,
  onBookDemo,
  handleBookingSubmit
}: DialogMainContentProps) => {
  return (
    <div className="dialog-content overflow-y-auto max-h-[calc(90vh-2rem)]">
      {showCalendar ? (
        <CalendarView
          onSubmit={handleBookingSubmit}
          formData={formData}
          analysis={analysis}
        />
      ) : (
        <DialogContent
          showReport={showReport}
          formData={formData}
          onSubmit={onSubmit}
          industry={industry}
          analysis={analysis}
          onBookDemo={onBookDemo}
        />
      )}
    </div>
  );
};