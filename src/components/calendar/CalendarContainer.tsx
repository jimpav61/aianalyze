import { forwardRef, ReactNode } from 'react';

interface CalendarContainerProps {
  className?: string;
  children?: ReactNode;
}

export const CalendarContainer = forwardRef<HTMLDivElement, CalendarContainerProps>(
  ({ className = '', children }, ref) => {
    return (
      <div 
        ref={ref}
        className={`w-full h-[650px] bg-white rounded-lg shadow-sm ${className}`}
      >
        {children}
      </div>
    );
  }
);

CalendarContainer.displayName = 'CalendarContainer';