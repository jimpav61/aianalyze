import { Card } from "@/components/ui/card";

interface ImplementationPlanProps {
  data: {
    objectives?: string;
    timeline?: string;
    budget?: string;
    additionalInfo?: string;
  };
}

export const ImplementationPlan = ({ data }: ImplementationPlanProps) => {
  return (
    <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Key Objectives</p>
          <p className="text-lg text-[#f65228] whitespace-pre-line">{data.objectives || "Not provided"}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Implementation Timeline</p>
          <p className="text-lg text-[#f65228] whitespace-pre-line">{data.timeline || "Not provided"}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Budget Considerations</p>
          <p className="text-lg text-[#f65228] whitespace-pre-line">{data.budget || "Not provided"}</p>
        </div>
        
        {data.additionalInfo && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Additional Information</p>
            <p className="text-lg text-[#f65228] whitespace-pre-line">{data.additionalInfo}</p>
          </div>
        )}
      </div>
    </Card>
  );
};