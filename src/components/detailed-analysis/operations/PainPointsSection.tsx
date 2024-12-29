import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { commonPainPoints } from "../constants/dropdownOptions";

interface PainPointsSectionProps {
  selectedPainPoints: string[];
  handlePainPointChange: (painPoint: string, checked: boolean) => void;
  error?: string;
}

export const PainPointsSection = ({
  selectedPainPoints,
  handlePainPointChange,
  error,
}: PainPointsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Pain Points</h3>
      <Label htmlFor="painPoints" className="text-gray-700 text-base font-medium flex items-center">
        What challenges are you currently facing? <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {commonPainPoints.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedPainPoints.includes(option.label)}
              onCheckedChange={(checked) => handlePainPointChange(option.label, checked as boolean)}
              className={`rounded-none ${error ? 'border-red-500' : ''}`}
            />
            <Label
              htmlFor={option.value}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};