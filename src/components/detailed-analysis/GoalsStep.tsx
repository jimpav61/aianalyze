import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoalsStepProps {
  formData: {
    objectives: string;
    timeline: string;
    budget: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GoalsStep = ({ formData, handleInputChange }: GoalsStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="objectives">Key Objectives</Label>
        <Input
          id="objectives"
          name="objectives"
          value={formData.objectives}
          onChange={handleInputChange}
          placeholder="What are your main goals?"
        />
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