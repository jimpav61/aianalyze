import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const industries = [
  "Adult Care-Giver Agency",
  "Agriculture",
  "Automotive",
  "Child Daycare Services",
  "Construction",
  "Education",
  "Energy",
  "Entertainment",
  "Environmental Services",
  "Finance",
  "Food & Beverage",
  "Government",
  "Healthcare",
  "Hospitality",
  "Insurance",
  "Legal Services",
  "Logistics",
  "Manufacturing",
  "Media",
  "Mining",
  "Non-Profit",
  "Pharmaceuticals",
  "Professional Services",
  "Real Estate",
  "Retail",
  "Technology",
  "Telecommunications",
  "Transportation",
  "Utilities",
  "Other" // Moved to the end of the list
];

interface IndustrySelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

export const IndustrySelector = ({ onSelect, value }: IndustrySelectorProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customIndustry, setCustomIndustry] = useState("");

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === "Other") {
      setShowCustomInput(true);
      setCustomIndustry("");
    } else {
      setShowCustomInput(false);
      onSelect(selectedValue);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border shadow-lg"
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
        <Input
          type="text"
          placeholder="Enter your industry"
          value={customIndustry}
          onChange={handleCustomInputChange}
          className="w-full"
        />
      )}
    </div>
  );
};