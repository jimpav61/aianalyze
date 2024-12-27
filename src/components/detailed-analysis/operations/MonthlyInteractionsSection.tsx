import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthlyInteractionsOptions } from "../constants/dropdownOptions";

interface MonthlyInteractionsSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const MonthlyInteractionsSection = ({
  value,
  onChange,
}: MonthlyInteractionsSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="monthlyInteractions" className="flex items-center">
        Monthly Customer Interactions <span className="text-red-500 ml-1">*</span>
      </Label>
      <Select 
        value={monthlyInteractionsOptions.find(opt => opt.label === value)?.value} 
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full bg-white">
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
    </div>
  );
};