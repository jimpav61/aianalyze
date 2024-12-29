import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { budgetOptions } from "../constants/dropdownOptions";

interface BudgetQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const BudgetQuestion = ({ value, onChange, error }: BudgetQuestionProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="budget" className="text-base font-medium">
        Question 3: What is your budget range for this project? <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={(value) =>
          onChange({
            target: { name: "budget", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        <SelectTrigger 
          id="budget"
          className={`bg-white ${error ? 'border-red-500' : ''}`}
        >
          <SelectValue placeholder="Select budget range" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {budgetOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};