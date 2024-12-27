import { useCallback } from 'react';
import { DetailedFormData } from '@/types/analysis';
import { useToast } from '@/hooks/use-toast';

interface UseCalendlyEventsProps {
  formData?: DetailedFormData;
  onBookingSuccess: () => void;
  analysis?: any;
}

export const useCalendlyEvents = ({ 
  formData, 
  onBookingSuccess,
  analysis 
}: UseCalendlyEventsProps) => {
  const { toast } = useToast();

  const handleEventScheduled = useCallback((e: any) => {
    console.log('[CALENDLY_DEBUG] Event scheduled callback:', {
      formData,
      eventData: e?.data,
      invitee: e?.data?.invitee,
      questions: e?.data?.invitee?.questions,
      customAnswers: e?.data?.invitee?.customAnswers,
      analysis
    });

    toast({
      title: "Demo Scheduled!",
      description: "Your demo has been scheduled successfully. Check your email for confirmation.",
      duration: 1500,
    });

    // Use setTimeout to delay the success callback
    setTimeout(() => {
      onBookingSuccess();
    }, 1500);
  }, [formData, onBookingSuccess, analysis, toast]);

  return {
    handleEventScheduled
  };
};