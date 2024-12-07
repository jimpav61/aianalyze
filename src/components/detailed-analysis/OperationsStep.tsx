import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  { value: "long_wait_times", label: "Long customer wait times" },
  { value: "high_costs", label: "High operational costs" },
  { value: "inconsistent_service", label: "Inconsistent customer service" },
  { value: "limited_support", label: "Limited 24/7 support" },
  { value: "manual_tasks", label: "Manual repetitive tasks" },
  { value: "high_turnover", label: "High employee turnover" },
  { value: "communication_gaps", label: "Communication gaps" },
  { value: "scalability", label: "Scalability challenges" }
];

export const OperationsStep = ({
  formData,
  handleInputChange,
}: OperationsStepProps) => {
  const handlePainPointChange = (value: string) => {
    const selectedPoint = commonPainPoints.find(point => point.value === value);
    handleInputChange({
      target: { name: "painPoints", value: selectedPoint?.label || "" }
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
        <Select 
          value={commonPainPoints.find(point => point.label === formData.painPoints)?.value} 
          onValueChange={handlePainPointChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select your main pain point" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {commonPainPoints.map((point) => (
              <SelectItem key={point.value} value={point.value}>
                {point.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};