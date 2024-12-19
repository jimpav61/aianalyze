import { useCallback } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendarEventsProps {
  onEventScheduled: () => void;
  formData?: CalendarFormData;
}

export const useCalendarEvents = ({ onEventScheduled, formData }: UseCalendarEventsProps) => {
  const handleEventScheduled = useCallback((e: any) => {
    console.log('[CALENDAR_DEBUG] Event scheduled callback:', {
      formData,
      eventData: e?.data
    });
    onEventScheduled();
  }, [formData, onEventScheduled]);

  return {
    handleEventScheduled
  };
};