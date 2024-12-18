export const useCalConfig = () => {
  const getUiConfig = () => ({
    theme: 'light' as const,
    styles: { branding: { brandColor: '#2563eb' } },
    hideEventTypeDetails: false
  });

  const getInlineConfig = (calLink: string) => ({
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