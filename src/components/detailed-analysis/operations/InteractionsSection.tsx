import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthlyInteractionsOptions } from "../constants/dropdownOptions";

interface InteractionsSectionProps {
  monthlyInteractions: string;
  handleMonthlyInteractionsChange: (value: string) => void;
  error?: string;
}

export const InteractionsSection = ({
  monthlyInteractions,
  handleMonthlyInteractionsChange,
  error,
}: InteractionsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Customer Interactions</h3>
      <div className="space-y-2">
        <Label htmlFor="monthlyInteractions" className="text-gray-700 text-base font-medium flex items-center">
          How many customer interactions do you handle monthly? <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select 
          value={monthlyInteractionsOptions.find(opt => opt.label === monthlyInteractions)?.value} 
          onValueChange={handleMonthlyInteractionsChange}
        >
          <SelectTrigger className={`w-full bg-white ${error ? 'border-red-500' : ''}`}>
            <SelectValue placeholder="Select monthly interactions range" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {monthlyInteractionsOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};