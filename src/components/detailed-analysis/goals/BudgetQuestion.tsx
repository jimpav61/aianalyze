import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

const budgetOptions = [
  { value: "under_5k", label: "Under $5,000" },
  { value: "5k_15k", label: "$5,000 - $15,000" },
  { value: "15k_30k", label: "$15,000 - $30,000" },
  { value: "30k_50k", label: "$30,000 - $50,000" },
  { value: "50k_plus", label: "$50,000+" },
];

export const BudgetQuestion = ({
  value,
  onChange,
  error,
}: BudgetQuestionProps) => {
  const handleSelectChange = (selectedValue: string) => {
    const event = {
      target: {
        name: "budget",
        value: selectedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="budget" className="text-gray-700 text-base font-medium flex items-center">
        What is your budget range for this implementation? <span className="text-red-500 ml-1">*</span>
      </Label>
      <Select value={value} onValueChange={handleSelectChange}>
        <SelectTrigger className={`w-full ${error ? 'border-red-500' : ''}`}>
          <SelectValue placeholder="Select a budget range" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {budgetOptions.map((option) => (
            <SelectItem key={option.value} value={option.label} className="hover:bg-gray-100">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};