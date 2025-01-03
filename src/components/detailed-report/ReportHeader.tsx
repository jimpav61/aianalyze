import { DetailedFormData } from "@/types/analysis";

interface ReportHeaderProps {
  formData: DetailedFormData;
  onBookDemo?: () => void;
}

export const ReportHeader = ({ formData, onBookDemo }: ReportHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">AI Implementation Analysis Report</h1>
      {onBookDemo && (
        <button
          onClick={onBookDemo}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Book Demo
        </button>
      )}
    </div>
  );
};