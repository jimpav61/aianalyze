import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { objectiveOptions, timelineOptions, budgetOptions } from "./constants/dropdownOptions";
import { createHandlers } from "./utils/dropdownHandlers";

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

export const GoalsStep = ({ formData, handleInputChange }: GoalsStepProps) => {
  const { handleObjectiveChange, handleTimelineChange, handleBudgetChange } = createHandlers(handleInputChange);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="objectives" className="flex items-center">
          Key Objectives <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={objectiveOptions.find((o) => o.label === formData.objectives)?.value}
          onValueChange={handleObjectiveChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select key objective" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {objectiveOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          <SelectContent className="bg-white">
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
          <SelectContent className="bg-white">
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