import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseCalendarEventsProps {
  onEventScheduled: () => void;
}

export const useCalendarEvents = ({ onEventScheduled }: UseCalendarEventsProps) => {
  const { toast } = useToast();

  const handleEventScheduled = useCallback((e: any) => {
    console.log('[PHONE_DEBUG] Event scheduled:', {
      event: e,
      data: e?.data,
      invitee: e?.data?.invitee,
      questions: e?.data?.invitee?.questions,
    });
    
    onEventScheduled();
    
    toast({
      title: "Important!",
      description: "Please download your detailed analysis report now. You won't be able to access it after closing this window.",
      duration: 10000,
      variant: "default",
    });
  }, [onEventScheduled, toast]);

  return {
    handleEventScheduled
  };
};