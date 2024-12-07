import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OperationsStepProps {
  formData: {
    serviceChannels: string;
    monthlyInteractions: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OperationsStep = ({
  formData,
  handleInputChange,
}: OperationsStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="serviceChannels">Current Service Channels</Label>
        <Input
          id="serviceChannels"
          name="serviceChannels"
          value={formData.serviceChannels}
          onChange={handleInputChange}
          placeholder="e.g., Email, Phone, Chat"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyInteractions">Monthly Customer Interactions</Label>
        <Input
          id="monthlyInteractions"
          name="monthlyInteractions"
          type="number"
          value={formData.monthlyInteractions}
          onChange={handleInputChange}
          placeholder="e.g., 1000"
        />
      </div>
    </div>
  );
};