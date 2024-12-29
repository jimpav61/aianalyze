import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: { [key: string]: string };
}

const timelineOptions = [
  { value: "1-3months", label: "1-3 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "6-12months", label: "6-12 months" },
  { value: "12+months", label: "12+ months" },
];

const budgetOptions = [
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k+", label: "$100,000+" },
];

export const GoalsStep = ({
  formData,
  handleInputChange,
  errors,
}: GoalsStepProps) => {
  return (
    <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Implementation Goals</h3>
        <p className="text-sm text-gray-600">Tell us about your AI implementation objectives:</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="objectives" className="text-base font-medium">
            Question 1: What are your main business objectives for implementing AI? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="objectives"
            name="objectives"
            value={formData.objectives}
            onChange={handleInputChange}
            placeholder="e.g., Reduce response time, improve customer satisfaction..."
            className={`min-h-[100px] ${errors.objectives ? 'border-red-500' : ''}`}
          />
          {errors.objectives && (
            <p className="text-sm text-red-500">{errors.objectives}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label htmlFor="timeline" className="text-base font-medium">
            Question 2: What is your desired implementation timeline? <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) =>
              handleInputChange({
                target: { name: "timeline", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger 
              id="timeline"
              className={`bg-white ${errors.timeline ? 'border-red-500' : ''}`}
            >
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
          {errors.timeline && (
            <p className="text-sm text-red-500">{errors.timeline}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label htmlFor="budget" className="text-base font-medium">
            Question 3: What is your budget range for this project? <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.budget}
            onValueChange={(value) =>
              handleInputChange({
                target: { name: "budget", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SelectTrigger 
              id="budget"
              className={`bg-white ${errors.budget ? 'border-red-500' : ''}`}
            >
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && (
            <p className="text-sm text-red-500">{errors.budget}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label htmlFor="additionalInfo" className="text-base font-medium">
            Question 4: Any additional information you'd like to share? (Optional)
          </Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Share any other relevant details..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};