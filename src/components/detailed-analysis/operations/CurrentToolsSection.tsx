import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { crmToolOptions } from "../constants/dropdownOptions";
import { useToast } from "@/hooks/use-toast";

interface CurrentToolsSectionProps {
  selectedTools: string[];
  onToolChange: (tool: string, checked: boolean) => void;
}

export const CurrentToolsSection = ({
  selectedTools,
  onToolChange,
}: CurrentToolsSectionProps) => {
  const { toast } = useToast();

  const handleToolChange = (tool: string, checked: boolean) => {
    onToolChange(tool, checked);
    
    if (!checked && selectedTools.length === 1) {
      toast({
        title: "Required Field",
        description: "Please select at least one tool",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="currentTools" className="flex items-center">
        Current Tools & Software <span className="text-red-500 ml-1">*</span>
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crmToolOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedTools.includes(option.label)}
              onCheckedChange={(checked) => handleToolChange(option.label, checked as boolean)}
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