import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OperationsStepProps {
  formData: {
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
      <div className="space-y-2">
        <Label htmlFor="currentTools">Current Tools & Software</Label>
        <Input
          id="currentTools"
          name="currentTools"
          value={formData.currentTools}
          onChange={handleInputChange}
          placeholder="e.g., Zendesk, Salesforce, etc."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="painPoints">Current Pain Points</Label>
        <Textarea
          id="painPoints"
          name="painPoints"
          value={formData.painPoints}
          onChange={handleInputChange}
          placeholder="Describe your current challenges and pain points"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};