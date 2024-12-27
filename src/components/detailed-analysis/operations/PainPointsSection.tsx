import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { commonPainPoints } from "../constants/dropdownOptions";
import { useToast } from "@/hooks/use-toast";

interface PainPointsSectionProps {
  selectedPainPoints: string[];
  onPainPointChange: (painPoint: string, checked: boolean) => void;
}

export const PainPointsSection = ({
  selectedPainPoints,
  onPainPointChange,
}: PainPointsSectionProps) => {
  const { toast } = useToast();

  const handlePainPointChange = (painPoint: string, checked: boolean) => {
    onPainPointChange(painPoint, checked);
    
    if (!checked && selectedPainPoints.length === 1) {
      toast({
        title: "Required Field",
        description: "Please select at least one pain point",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="painPoints" className="flex items-center">
        Current Pain Points <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonPainPoints.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedPainPoints.includes(option.label)}
              onCheckedChange={(checked) => handlePainPointChange(option.label, checked as boolean)}
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