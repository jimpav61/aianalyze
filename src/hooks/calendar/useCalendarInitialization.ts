import { RefObject, useEffect } from 'react';
import { CalendarFormData } from '@/types/analysis';

interface UseCalendarInitializationProps {
  calendarRef: RefObject<HTMLDivElement>;
  calendlyInitialized: RefObject<boolean>;
  calLink: string;
  getPrefillData: () => any;
  handleCalendlyInit: (prefill: any) => void;
  handleEventScheduled: (e: any) => void;
  formData?: CalendarFormData;
}

export const useCalendarInitialization = ({
  calendarRef,
  calendlyInitialized,
  calLink,
  getPrefillData,
  handleCalendlyInit,
  handleEventScheduled,
  formData
}: UseCalendarInitializationProps) => {
  useEffect(() => {
    console.log('[PHONE_DEBUG] Calendar effect triggered:', {
      hasFormData: !!formData,
      phoneNumber: formData?.phoneNumber,
      calLink
    });

    if (!calendarRef.current || calendlyInitialized.current || !calLink) {
      console.log('[PHONE_DEBUG] Calendar initialization blocked:', {
        hasRef: !!calendarRef.current,
        isInitialized: calendlyInitialized.current,
        hasCalLink: !!calLink
      });
      return;
    }

    const calendlyUrl = `https://calendly.com/${calLink}`;
    const prefill = getPrefillData();
    
    console.log('[PHONE_DEBUG] Initializing Calendly widget:', {
      url: calendlyUrl,
      prefill,
      phoneNumber: formData?.phoneNumber
    });

    if (!window.Calendly) {
      console.error('[PHONE_DEBUG] Calendly not loaded');
      return;
    }

    calendlyInitialized.current = true;

    window.addEventListener('calendly.profile_page_loaded', (e) => {
      console.log('[PHONE_DEBUG] Calendly form loaded:', {
        event: e,
        prefill,
        phoneNumber: formData?.phoneNumber
      });
    });

    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: calendarRef.current,
      prefill,
      utm: {}
    });

    window.addEventListener('calendly.init', (e) => {
      console.log('[PHONE_DEBUG] Calendly initialized:', {
        event: e,
        prefill,
        phoneNumber: formData?.phoneNumber
      });
      handleCalendlyInit(prefill);
    });

    window.addEventListener('calendly.event_scheduled', (e: any) => {
      console.log('[PHONE_DEBUG] Event scheduled:', {
        event: e,
        data: e?.data,
        invitee: e?.data?.invitee,
        questions: e?.data?.invitee?.questions,
        phoneNumber: formData?.phoneNumber
      });
      handleEventScheduled(e);
    });

    return () => {
      console.log('[PHONE_DEBUG] Cleanup');
      if (calendarRef.current) {
        calendarRef.current.innerHTML = '';
      }
      calendlyInitialized.current = false;
      window.removeEventListener('calendly.event_scheduled', handleEventScheduled);
      window.removeEventListener('calendly.init', handleCalendlyInit);
      window.removeEventListener('calendly.profile_page_loaded', () => {});
    };
  }, [calLink, formData, getPrefillData, handleCalendlyInit, handleEventScheduled]);
};