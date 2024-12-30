import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomIndustryInput } from "./CustomIndustryInput";
import { industries } from "@/constants/industries";

interface IndustrySelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

export const IndustrySelector = ({ onSelect, value }: IndustrySelectorProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customIndustry, setCustomIndustry] = useState("");

  const handleSelectChange = (selectedValue: string) => {
    console.log("IndustrySelector - Industry selected:", selectedValue);
    
    if (selectedValue === "Other") {
      console.log("IndustrySelector - Showing custom input");
      setShowCustomInput(true);
      setCustomIndustry("");
    } else {
      console.log("IndustrySelector - Using predefined industry");
      setShowCustomInput(false);
      onSelect(selectedValue);
    }
  };

  const handleCustomInputChange = (value: string) => {
    console.log("IndustrySelector - Custom industry input:", value);
    setCustomIndustry(value);
    onSelect(value);
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="relative">
        <Select 
          value={showCustomInput ? "Other" : value} 
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select your industry to get started" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border shadow-lg max-h-[300px] overflow-y-auto touch-pan-y"
            position="popper"
            sideOffset={5}
          >
            {industries.map((industry) => (
              <SelectItem 
                key={industry} 
                value={industry}
                className={`hover:bg-gray-100 ${industry === "Other" ? "text-gray-600" : ""}`}
              >
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showCustomInput && (
        <CustomIndustryInput
          value={customIndustry}
          onChange={handleCustomInputChange}
        />
      )}
    </div>
  );
};