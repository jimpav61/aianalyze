import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OperationsStepProps {
  formData: {
    serviceChannels: string;
    monthlyInteractions: string;
    currentTools: string;
    painPoints: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const commonPainPoints = [
  "Long customer wait times",
  "High operational costs",
  "Inconsistent customer service",
  "Limited 24/7 support",
  "Manual repetitive tasks",
  "High employee turnover",
  "Communication gaps",
  "Scalability challenges"
];

export const OperationsStep = ({
  formData,
  handleInputChange,
}: OperationsStepProps) => {
  const handlePainPointChange = (value: string) => {
    handleInputChange({
      target: { name: "painPoints", value }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="serviceChannels" className="flex items-center">
          Current Service Channels <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="serviceChannels"
          name="serviceChannels"
          value={formData.serviceChannels}
          onChange={handleInputChange}
          placeholder="e.g., Email, Phone, Chat"
          className={!formData.serviceChannels ? "border-red-300" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyInteractions" className="flex items-center">
          Monthly Customer Interactions <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="monthlyInteractions"
          name="monthlyInteractions"
          type="number"
          value={formData.monthlyInteractions}
          onChange={handleInputChange}
          placeholder="e.g., 1000"
          className={!formData.monthlyInteractions ? "border-red-300" : ""}
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
        <Select value={formData.painPoints} onValueChange={handlePainPointChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select your main pain point" />
          </SelectTrigger>
          <SelectContent>
            {commonPainPoints.map((point) => (
              <SelectItem key={point} value={point}>
                {point}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};