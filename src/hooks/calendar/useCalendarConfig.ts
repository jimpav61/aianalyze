import { CalendarUiConfig, CalendarInlineConfig } from "@/types/calendar";

export const useCalendarConfig = () => {
  const getUiConfig = (): CalendarUiConfig => ({
    theme: 'light',
    styles: { branding: { brandColor: '#2563eb' } },
    hideEventTypeDetails: false
  });

  const getInlineConfig = (calLink: string): CalendarInlineConfig => ({
    elementOrSelector: '#cal-booking-placeholder',
    calLink,
    config: {
      hideEventTypeDetails: 'false'
    }
  });

  return {
    getUiConfig,
    getInlineConfig
  };
};