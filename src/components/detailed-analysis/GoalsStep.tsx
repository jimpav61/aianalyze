import { ObjectivesQuestion } from "./goals/ObjectivesQuestion";
import { TimelineQuestion } from "./goals/TimelineQuestion";
import { BudgetQuestion } from "./goals/BudgetQuestion";
import { AdditionalInfoQuestion } from "./goals/AdditionalInfoQuestion";

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
        <ObjectivesQuestion
          value={formData.objectives}
          onChange={handleInputChange}
          error={errors.objectives}
        />

        <TimelineQuestion
          value={formData.timeline}
          onChange={handleInputChange}
          error={errors.timeline}
        />

        <BudgetQuestion
          value={formData.budget}
          onChange={handleInputChange}
          error={errors.budget}
        />

        <AdditionalInfoQuestion
          value={formData.additionalInfo}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};