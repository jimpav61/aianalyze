export interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
  formData?: any;
  analysis?: any;
}

export interface CalendarUiConfig {
  theme: 'light' | 'dark';
  styles: {
    branding: {
      brandColor: string;
    };
  };
  hideEventTypeDetails: boolean;
}

export interface CalendarInlineConfig {
  elementOrSelector: string;
  calLink: string;
  config: {
    hideEventTypeDetails: string;
  };
}