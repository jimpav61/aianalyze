import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { crmToolOptions } from "../constants/dropdownOptions";

interface ToolsSectionProps {
  selectedTools: string[];
  handleToolChange: (tool: string, checked: boolean) => void;
  error?: string;
}

export const ToolsSection = ({
  selectedTools,
  handleToolChange,
  error,
}: ToolsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Current Tools</h3>
      <Label htmlFor="currentTools" className="text-gray-700 text-base font-medium flex items-center">
        Which tools and software do you currently use? <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {crmToolOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedTools.includes(option.label)}
              onCheckedChange={(checked) => handleToolChange(option.label, checked as boolean)}
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