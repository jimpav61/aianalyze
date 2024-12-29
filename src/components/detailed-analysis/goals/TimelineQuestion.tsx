import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimelineQuestionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

const timelineOptions = [
  { value: "immediate", label: "Immediate (1-3 months)" },
  { value: "short_term", label: "Short-term (3-6 months)" },
  { value: "medium_term", label: "Medium-term (6-12 months)" },
  { value: "long_term", label: "Long-term (12+ months)" },
];

export const TimelineQuestion = ({
  value,
  onChange,
  error,
}: TimelineQuestionProps) => {
  const handleSelectChange = (selectedValue: string) => {
    const event = {
      target: {
        name: "timeline",
        value: selectedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(event);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="timeline" className="text-gray-700 text-base font-medium flex items-center">
        What is your expected implementation timeline? <span className="text-red-500 ml-1">*</span>
      </Label>
      <Select value={value} onValueChange={handleSelectChange}>
        <SelectTrigger className={`w-full ${error ? 'border-red-500' : ''}`}>
          <SelectValue placeholder="Select a timeline" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {timelineOptions.map((option) => (
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