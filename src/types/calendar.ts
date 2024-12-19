declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (config: {
        url: string;
        parentElement: HTMLElement;
        prefill?: {
          name?: string;
          email?: string;
          location?: string;
          customAnswers?: {
            [key: string]: string;
          };
        };
        utm?: Record<string, string>;
      }) => void;
      eventType?: {
        name?: string;
        location?: string;
        type?: string;
      };
    };
  }
}

export interface CalendarProps {
  calLink: string;
  onSubmit?: () => void;
  onBookingSuccess?: () => void;
  formData?: {
    companyName?: string;
    email?: string;
    phoneNumber?: string;
    [key: string]: any;
  };
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

// This export is needed to make the file a module
export {};