interface CalendarConfigProps {
  calLink: string;
}

export const CalendarConfig = ({ calLink }: CalendarConfigProps) => {
  return (
    <div 
      id="cal-embed"
      data-cal-link={calLink}
      className="w-full h-full min-h-[500px]"
    />
  );
};