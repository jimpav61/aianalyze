import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseCalendarEventsProps {
  onEventScheduled: () => void;
}

export const useCalendarEvents = ({ onEventScheduled }: UseCalendarEventsProps) => {
  const { toast } = useToast();

  const handleEventScheduled = useCallback((e: any) => {
    console.log('Calendar event scheduled:', e);
    
    // Call the callback first
    onEventScheduled();
    
    // Show the toast notification
    toast({
      title: "Important!",
      description: "Please download your detailed analysis report before closing this window.",
      duration: 10000, // 10 seconds
      variant: "default",
    });
  }, [onEventScheduled, toast]);

  return {
    handleEventScheduled
  };
};