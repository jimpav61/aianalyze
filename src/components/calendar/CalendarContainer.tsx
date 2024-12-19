import { forwardRef } from "react";

interface CalendarContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export const CalendarContainer = forwardRef<HTMLDivElement, CalendarContainerProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={`w-full h-[700px] bg-white rounded-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CalendarContainer.displayName = "CalendarContainer";