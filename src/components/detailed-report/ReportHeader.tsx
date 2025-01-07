import { DetailedFormData } from "@/types/analysis";

interface ReportHeaderProps {
  formData: DetailedFormData;
  onBookDemo?: () => void;
  industry?: string;
}

export const ReportHeader = ({ formData, onBookDemo, industry }: ReportHeaderProps) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">AI Implementation Analysis Report</h1>
        {industry && (
          <p className="text-gray-600">Industry: {industry}</p>
        )}
      </div>
      {onBookDemo && (
        <button
          onClick={onBookDemo}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 ml-4"
        >
          Book Demo
        </button>
      )}
    </div>
  );
};