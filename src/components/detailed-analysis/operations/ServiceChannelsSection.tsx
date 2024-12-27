import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { serviceChannelOptions } from "../constants/dropdownOptions";
import { useToast } from "@/hooks/use-toast";

interface ServiceChannelsSectionProps {
  selectedChannels: string[];
  onChannelChange: (channel: string, checked: boolean) => void;
}

export const ServiceChannelsSection = ({
  selectedChannels,
  onChannelChange,
}: ServiceChannelsSectionProps) => {
  const { toast } = useToast();

  const handleChannelChange = (channel: string, checked: boolean) => {
    onChannelChange(channel, checked);
    
    if (!checked && selectedChannels.length === 1) {
      toast({
        title: "Required Field",
        description: "Please select at least one service channel",
        variant: "destructive",
      });
    }
  };

  return (
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
              className="rounded-none"
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
  );
};