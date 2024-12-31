export interface StoredData {
  formData: any | null;
  analysis: any | null;
}

export interface UseCalendarHandlingProps {
  onClose: () => void;
  setShowReport: (show: boolean) => void;
  formData: any;
  analysis: any;
}

export interface PdfHandlerProps {
  currentData: StoredData;
  toast: any;
}