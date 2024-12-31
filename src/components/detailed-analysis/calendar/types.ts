import { DetailedFormData } from "@/types/analysis";

export interface StoredData {
  formData: DetailedFormData | null;
  analysis: any | null;
}

export interface DownloadOptions {
  currentData: StoredData;
  toast: any;
}

export interface UseCalendarHandlingProps {
  onClose: () => void;
  setShowReport: (show: boolean) => void;
  formData: DetailedFormData | null;
  analysis: any;
}

export interface UseCalendarDataProps {
  initialFormData: DetailedFormData | null;
  initialAnalysis: any;
}