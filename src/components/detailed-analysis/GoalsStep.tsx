import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GoalsStepProps {
  formData: {
    objectives: string;
    timeline: string;
    budget: string;
    additionalInfo: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const timelineOptions = [
  { value: "1-3", label: "1-3 months" },
  { value: "3-6", label: "3-6 months" },
  { value: "6-12", label: "6-12 months" },
  { value: "12+", label: "12+ months" },
];

const budgetOptions = [
  { value: "100-1000", label: "$100 - $1,000" },
  { value: "1000-5000", label: "$1,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000+", label: "$10,000+" },
];

export const GoalsStep = ({ formData, handleInputChange }: GoalsStepProps) => {
  const handleTimelineChange = (value: string) => {
    const selectedTimeline = timelineOptions.find((t) => t.value === value);
    handleInputChange({
      target: { name: "timeline", value: selectedTimeline?.label || "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleBudgetChange = (value: string) => {
    const selectedBudget = budgetOptions.find((b) => b.value === value);
    handleInputChange({
      target: { name: "budget", value: selectedBudget?.label || "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="objectives" className="flex items-center">
          Key Objectives <span className="text-red-500 ml-1">*</span>
        </Label>
        <Textarea
          id="objectives"
          name="objectives"
          value={formData.objectives}
          onChange={handleInputChange}
          placeholder="What are your main goals for implementing AI?"
          className={`min-h-[100px] ${!formData.objectives ? "border-red-300" : ""}`}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="timeline" className="flex items-center">
          Implementation Timeline <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={timelineOptions.find((t) => t.label === formData.timeline)?.value}
          onValueChange={handleTimelineChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select implementation timeline" />
          </SelectTrigger>
          <SelectContent>
            {timelineOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget" className="flex items-center">
          Estimated Budget <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={budgetOptions.find((b) => b.label === formData.budget)?.value}
          onValueChange={handleBudgetChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select estimated budget" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleInputChange}
          placeholder="Any other details you'd like to share?"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};