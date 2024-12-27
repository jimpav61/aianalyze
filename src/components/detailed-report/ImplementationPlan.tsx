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
        {data.objectives && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Key Objectives</p>
            <p className="text-lg text-[#f65228] whitespace-pre-line">{data.objectives}</p>
          </div>
        )}
        
        {data.timeline && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Implementation Timeline</p>
            <p className="text-lg text-[#f65228] whitespace-pre-line">{data.timeline}</p>
          </div>
        )}
        
        {data.budget && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Budget Considerations</p>
            <p className="text-lg text-[#f65228] whitespace-pre-line">{data.budget}</p>
          </div>
        )}
        
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