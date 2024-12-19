import { Download } from "lucide-react";
import { CalendarFormData } from "@/types/analysis";

interface SuccessMessageProps {
  onDownload: () => void;
  formData?: CalendarFormData;
  analysis?: any;
}

export const SuccessMessage = ({ onDownload, formData, analysis }: SuccessMessageProps) => {
  console.log("[DEBUG] SuccessMessage - Rendering with:", { formData, analysis });
  
  if (!formData || !analysis) return null;

  return (
    <div className="calendly-success-message">
      <button 
        onClick={onDownload}
        className="download-report-button"
      >
        <span className="flex items-center gap-2 px-4 py-2 bg-[#f65228] text-white rounded-md font-medium">
          <Download className="w-4 h-4" />
          Download Report
        </span>
      </button>
    </div>
  );
};