import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const commonObjectives = [
  "Improve Customer Service Efficiency",
  "Reduce Operational Costs",
  "Increase Sales Conversion Rates",
  "Enhance Customer Experience",
  "Automate Repetitive Tasks",
  "24/7 Customer Support Coverage",
  "Reduce Response Time",
  "Scale Support Operations",
  "Multilingual Customer Support",
  "Lead Generation and Qualification"
];

export const GoalsStep = ({ formData, handleInputChange }: GoalsStepProps) => {
  const handleObjectiveSelect = (value: string) => {
    // Create a synthetic event to match the handleInputChange interface
    const syntheticEvent = {
      target: {
        name: 'objectives',
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="objectives">Key Objectives</Label>
        <Select 
          value={formData.objectives} 
          onValueChange={handleObjectiveSelect}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select your key objective" />
          </SelectTrigger>
          <SelectContent>
            {commonObjectives.map((objective) => (
              <SelectItem key={objective} value={objective}>
                {objective}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="timeline">Implementation Timeline</Label>
        <Input
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleInputChange}
          placeholder="e.g., 3 months"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Estimated Budget (USD)</Label>
        <Input
          id="budget"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="e.g., 50000"
        />
      </div>
    </div>
  );
};