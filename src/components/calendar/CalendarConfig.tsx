interface CalendarConfigProps {
  calLink: string;
}

export const CalendarConfig = ({ calLink }: CalendarConfigProps) => {
  return (
    <cal-inline-widget 
      style={{ width: '100%', height: '100%', minHeight: '500px' }} 
      data-cal-link={calLink}
    />
  );
};