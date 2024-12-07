import { Card } from "../ui/card";

interface ImplementationPlanProps {
  data: {
    objectives: string;
    timeline: string;
    budget: string;
    additionalInfo?: string;
  };
}

export const ImplementationPlan = ({ data }: ImplementationPlanProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Implementation Plan</h2>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Objectives:</p>
          <p className="text-gray-600">{data.objectives}</p>
        </div>
        <div>
          <p className="font-medium">Timeline:</p>
          <p className="text-gray-600">{data.timeline}</p>
        </div>
        <div>
          <p className="font-medium">Budget:</p>
          <p className="text-gray-600">{data.budget}</p>
        </div>
        {data.additionalInfo && (
          <div>
            <p className="font-medium">Additional Information:</p>
            <p className="text-gray-600">{data.additionalInfo}</p>
          </div>
        )}
      </div>
    </Card>
  );
};