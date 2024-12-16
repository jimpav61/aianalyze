import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  commonPainPoints, 
  serviceChannelOptions, 
  monthlyInteractionsOptions,
  crmToolOptions 
} from "./constants/dropdownOptions";
import { createHandlers } from "./utils/dropdownHandlers";

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
  const { 
    handleServiceChannelsChange, 
    handleMonthlyInteractionsChange,
    handleCurrentToolsChange,
    handlePainPointChange 
  } = createHandlers(handleInputChange);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="serviceChannels" className="flex items-center">
          Current Service Channels <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select 
          value={serviceChannelOptions.find(opt => opt.label === formData.serviceChannels)?.value} 
          onValueChange={handleServiceChannelsChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select service channels" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {serviceChannelOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="monthlyInteractions" className="flex items-center">
          Monthly Customer Interactions <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select 
          value={monthlyInteractionsOptions.find(opt => opt.label === formData.monthlyInteractions)?.value} 
          onValueChange={handleMonthlyInteractionsChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select monthly interactions range" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {monthlyInteractionsOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentTools">Current Tools & Software</Label>
        <Select 
          value={crmToolOptions.find(opt => opt.label === formData.currentTools)?.value} 
          onValueChange={handleCurrentToolsChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select your CRM/tools" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {crmToolOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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