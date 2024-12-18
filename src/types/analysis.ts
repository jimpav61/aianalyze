export interface DetailedFormData {
  companyName: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  employees: string;
  revenue: string;
  serviceChannels: string;
  monthlyInteractions: string;
  currentTools: string;
  painPoints: string;
  objectives: string;
  timeline: string;
  budget: string;
  additionalInfo: string;
}

// New type for calendar-specific form data
export type CalendarFormData = Partial<DetailedFormData>;