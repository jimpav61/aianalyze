interface CalendarConfigProps {
  calLink: string;
}

export const CalendarConfig = ({ calLink }: CalendarConfigProps) => {
  return (
    <div 
      id="cal-embed"
      data-cal-link={calLink}
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '500px' 
      }} 
    />
  );
};