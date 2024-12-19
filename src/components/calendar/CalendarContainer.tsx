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
        className={`w-full h-full bg-white rounded-lg ${className}`}
        style={{ height: 'calc(90vh - 100px)', minWidth: '320px' }}
      >
        {children}
      </div>
    );
  }
);

CalendarContainer.displayName = 'CalendarContainer';