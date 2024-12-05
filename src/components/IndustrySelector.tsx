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
];

interface IndustrySelectorProps {
  onSelect: (value: string) => void;
  value?: string;
}

export const IndustrySelector = ({ onSelect, value }: IndustrySelectorProps) => {
  return (
    <div className="w-full max-w-xs">
      <Select value={value} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your industry" />
        </SelectTrigger>
        <SelectContent>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};