import { Card } from "../ui/card";

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
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Current Operations</h2>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Service Channels:</p>
          <p className="text-gray-600">{data.serviceChannels}</p>
        </div>
        <div>
          <p className="font-medium">Monthly Interactions:</p>
          <p className="text-gray-600">{data.monthlyInteractions}</p>
        </div>
        <div>
          <p className="font-medium">Current Tools:</p>
          <p className="text-gray-600">{data.currentTools}</p>
        </div>
        <div>
          <p className="font-medium">Pain Points:</p>
          <p className="text-gray-600">{data.painPoints}</p>
        </div>
      </div>
    </Card>
  );
};