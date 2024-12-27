import { DetailedFormData } from "@/types/analysis";
import { ReportContent } from "../detailed-report/ReportContent";
import { ReportActions } from "../detailed-report/ReportActions";

interface ReportViewProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
  industry?: string;
}

export const ReportView = ({ 
  formData, 
  analysis, 
  onBookDemo,
  industry 
}: ReportViewProps) => {
  console.log("ReportView - Rendering with data:", {
    formData,
    analysis,
    industry
  });

  return (
    <div className="space-y-6">
      <ReportContent
        formData={formData}
        analysis={analysis}
        industry={industry}
      />
      <ReportActions
        formData={formData}
        analysis={analysis}
        onBookDemo={onBookDemo}
      />
    </div>
  );
};