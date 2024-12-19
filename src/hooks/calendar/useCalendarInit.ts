import { useEffect, RefObject, useRef } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendarInitProps {
  calendarRef: RefObject<HTMLDivElement>;
  calLink: string;
  formData?: CalendarFormData;
  onEventScheduled: (e: any) => void;
}

export const useCalendarInit = ({ 
  calendarRef, 
  calLink, 
  formData, 
  onEventScheduled 
}: UseCalendarInitProps) => {
  const initialized = useRef(false);

  const getPrefillData = () => {
    const phoneNumber = formData?.phoneNumber || '';
    console.log('[PHONE_DEBUG] Building prefill data:', {
      rawPhoneNumber: phoneNumber,
      formData
    });

    const questions: Record<string, string> = {
      'a1': phoneNumber,
      'phone': phoneNumber,
      'Phone': phoneNumber,
      'phone_number': phoneNumber,
      'phoneNumber': phoneNumber,
      '1': phoneNumber,
    };

    return {
      name: formData?.ownerName || '',
      email: formData?.email || '',
      questions
    };
  };

  useEffect(() => {
    console.log('[PHONE_DEBUG] Calendar effect triggered:', {
      hasFormData: !!formData,
      phoneNumber: formData?.phoneNumber,
      calLink
    });

    if (!calendarRef.current || initialized.current || !calLink) {
      console.log('[PHONE_DEBUG] Calendar initialization blocked:', {
        hasRef: !!calendarRef.current,
        isInitialized: initialized.current,
        hasCalLink: !!calLink
      });
      return;
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const prefill = getPrefillData();
    
    if (!window.Calendly) {
      console.error('[PHONE_DEBUG] Calendly not loaded');
      return;
    }

    initialized.current = true;

    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendarRef.current,
      prefill,
      utm: {}
    });

    window.addEventListener('calendly.event_scheduled', onEventScheduled);

    return () => {
      console.log('[PHONE_DEBUG] Cleanup');
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
      initialized.current = false;
      window.removeEventListener('calendly.event_scheduled', onEventScheduled);
    };
  }, [calLink, formData, calendarRef, onEventScheduled]);

  return {
    initialized
  };
};