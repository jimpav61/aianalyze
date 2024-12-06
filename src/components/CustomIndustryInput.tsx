import { Input } from "@/components/ui/input";

interface CustomIndustryInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CustomIndustryInput = ({ value, onChange }: CustomIndustryInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Enter your industry"
      value={value}
      onChange={handleInputChange}
      className="w-full"
    />
  );
};