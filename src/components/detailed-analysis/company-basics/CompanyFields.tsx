import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeCountOptions, revenueOptions } from "../constants/dropdownOptions";
import { createHandlers } from "../utils/dropdownHandlers";

interface CompanyFieldsProps {
  companyName: string;
  employees: string;
  revenue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyFields = ({
  companyName,
  employees,
  revenue,
  handleInputChange,
}: CompanyFieldsProps) => {
  const { handleEmployeeChange, handleRevenueChange } = createHandlers(handleInputChange);

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="companyName" className="flex items-center">
          Company Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="companyName"
          name="companyName"
          value={companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          className={!companyName ? "border-red-300" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="employees">Number of Employees</Label>
        <Select 
          value={employeeCountOptions.find(opt => opt.label === employees)?.value} 
          onValueChange={handleEmployeeChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select number of employees" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {employeeCountOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="revenue">Annual Revenue (USD)</Label>
        <Select 
          value={revenueOptions.find(opt => opt.label === revenue)?.value} 
          onValueChange={handleRevenueChange}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select annual revenue range" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {revenueOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};