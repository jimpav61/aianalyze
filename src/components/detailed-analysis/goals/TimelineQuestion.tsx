import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timelineOptions } from "../constants/dropdownOptions";

interface TimelineQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const TimelineQuestion = ({ value, onChange, error }: TimelineQuestionProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="timeline" className="text-base font-medium">
        Question 2: What is your desired implementation timeline? <span className="text-red-500">*</span>
      </Label>
      <Select
        value={value}
        onValueChange={(value) =>
          onChange({
            target: { name: "timeline", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      >
        <SelectTrigger 
          id="timeline"
          className={`bg-white ${error ? 'border-red-500' : ''}`}
        >
          <SelectValue placeholder="Select implementation timeline" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {timelineOptions.map((option) => (
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