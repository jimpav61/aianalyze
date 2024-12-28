import { Card } from "../ui/card";
import { DetailedFormData } from "@/types/analysis";

interface CurrentOperationsProps {
  data: DetailedFormData;
}

export const CurrentOperations = ({ data }: CurrentOperationsProps) => {
  if (!data) {
    console.error("CurrentOperations - Missing required data");
    return null;
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Current Operations</h2>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Service Channels:</p>
          <p className="text-gray-600">{data.serviceChannels || "Not specified"}</p>
        </div>
        <div>
          <p className="font-medium">Monthly Interactions:</p>
          <p className="text-gray-600">{data.monthlyInteractions || "Not specified"}</p>
        </div>
        <div>
          <p className="font-medium">Current Tools:</p>
          <p className="text-gray-600">{data.currentTools || "Not specified"}</p>
        </div>
        <div>
          <p className="font-medium">Pain Points:</p>
          <p className="text-gray-600">{data.painPoints || "Not specified"}</p>
        </div>
      </div>
    </Card>
  );
};