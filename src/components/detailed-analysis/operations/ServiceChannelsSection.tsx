import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { serviceChannelOptions } from "../constants/dropdownOptions";

interface ServiceChannelsSectionProps {
  selectedChannels: string[];
  handleChannelChange: (channel: string, checked: boolean) => void;
  error?: string;
}

export const ServiceChannelsSection = ({
  selectedChannels,
  handleChannelChange,
  error,
}: ServiceChannelsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Service Channels</h3>
      <Label htmlFor="serviceChannels" className="text-gray-700 text-base font-medium flex items-center">
        Which channels do you currently use to serve your customers? <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {serviceChannelOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedChannels.includes(option.label)}
              onCheckedChange={(checked) => handleChannelChange(option.label, checked as boolean)}
              className={`rounded-none ${error ? 'border-red-500' : ''}`}
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
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};