import { Card } from "@/components/ui/card";

interface CurrentOperationsProps {
  data: {
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
  };
}

export const CurrentOperations = ({ data }: CurrentOperationsProps) => {
  return (
    <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Service Channels</p>
          <p className="text-lg text-[#f65228] whitespace-pre-line">{data.serviceChannels || "Not provided"}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Monthly Interactions</p>
          <p className="text-lg text-[#f65228]">{data.monthlyInteractions || "Not provided"}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Current Tools</p>
          <p className="text-lg text-[#f65228] whitespace-pre-line">{data.currentTools || "Not provided"}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Pain Points</p>
          <p className="text-lg text-[#f65228] whitespace-pre-line">{data.painPoints || "Not provided"}</p>
        </div>
      </div>
    </Card>
  );
};