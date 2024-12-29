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
    <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Project Goals</h3>
        <div className="space-y-2">
          <Label htmlFor="objectives" className="text-gray-700 text-base font-medium flex items-center">
            What are your key objectives for this project? <span className="text-red-500 ml-1">*</span>
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Implementation Details</h3>
        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-gray-700 text-base font-medium flex items-center">
            When would you like to implement this solution? <span className="text-red-500 ml-1">*</span>
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget</h3>
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-gray-700 text-base font-medium flex items-center">
            What is your estimated budget for this project? <span className="text-red-500 ml-1">*</span>
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
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
        <div className="space-y-2">
          <Label htmlFor="additionalInfo" className="text-gray-700 text-base font-medium">
            Is there anything else you'd like to share with us?
          </Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Share any other details that might be relevant..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};