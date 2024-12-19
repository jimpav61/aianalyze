import { forwardRef } from 'react';

interface CalendarContainerProps {
  className?: string;
}

export const CalendarContainer = forwardRef<HTMLDivElement, CalendarContainerProps>(
  ({ className = '' }, ref) => {
    return (
      <div 
        ref={ref}
        className={`flex-1 min-h-[600px] bg-white rounded-lg shadow-sm ${className}`}
        style={{ minWidth: '320px' }}
      />
    );
  }
);

CalendarContainer.displayName = 'CalendarContainer';