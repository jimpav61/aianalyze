import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";

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
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    formData.serviceChannels ? formData.serviceChannels.split(', ') : []
  );

  const { 
    handleMonthlyInteractionsChange,
    handleCurrentToolsChange,
    handlePainPointChange 
  } = createHandlers(handleInputChange);

  const handleChannelChange = (channel: string, checked: boolean) => {
    const updatedChannels = checked
      ? [...selectedChannels, channel]
      : selectedChannels.filter((c) => c !== channel);
    
    setSelectedChannels(updatedChannels);
    
    handleInputChange({
      target: {
        name: 'serviceChannels',
        value: updatedChannels.join(', ')
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Label htmlFor="serviceChannels" className="flex items-center">
          Current Service Channels <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceChannelOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={selectedChannels.includes(option.label)}
                onCheckedChange={(checked) => handleChannelChange(option.label, checked as boolean)}
              />
              <Label
                htmlFor={option.value}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
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