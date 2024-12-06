import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const industries = [
  "Retail",
  "Healthcare",
  "Finance",
  "Technology",
  "Manufacturing",
  "Education",
  "Hospitality",
  "Real Estate",
  "Professional Services",
  "Entertainment",
  "Agriculture",
  "Automotive",
  "Construction",
  "Energy",
  "Environmental Services",
  "Food & Beverage",
  "Government",
  "Insurance",
  "Legal Services",
  "Logistics",
  "Media",
  "Mining",
  "Non-Profit",
  "Pharmaceuticals",
  "Telecommunications",
  "Transportation",
  "Utilities",
  "Other"
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
    <div className="w-full max-w-xs space-y-2 relative z-50">
      <Select 
        value={showCustomInput ? "Other" : value} 
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your industry" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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