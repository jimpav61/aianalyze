export interface DetailedFormData {
  companyName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  employees: string;
  revenue: string;
  objectives: string;
  timeline: string;
  budget: string;
  additionalInfo: string;
  industry: string;
  serviceChannels: string;
  monthlyInteractions: string;
  currentTools: string;
  painPoints: string;
}

export interface AnalysisData {
  industry: string;
  department: string;
  bot_function: string;
  savings: number;
  profit_increase: number;
  explanation: string;
  marketing_strategy: string;
}

// New type for calendar-specific form data
export type CalendarFormData = Partial<DetailedFormData>;