import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { objectiveOptions } from "../constants/dropdownOptions";

interface ObjectivesQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const ObjectivesQuestion = ({ value, onChange, error }: ObjectivesQuestionProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="objectives" className="text-base font-medium">
        Question 1: What are your main business objectives for implementing AI? <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={(value) =>
          onChange({
            target: { name: "objectives", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        <SelectTrigger 
          id="objectives"
          className={`bg-white ${error ? 'border-red-500' : ''}`}
        >
          <SelectValue placeholder="Select your main objective" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {objectiveOptions.map((option) => (
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