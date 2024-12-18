import { CompanyFields } from "./company-basics/CompanyFields";
import { ContactFields } from "./company-basics/ContactFields";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeCountOptions, revenueOptions } from "./constants/dropdownOptions";
import { createHandlers } from "./utils/dropdownHandlers";

interface CompanyBasicsStepProps {
  formData: {
    companyName: string;
    ownerName: string;
    employees: string;
    revenue: string;
    phoneNumber: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyBasicsStep = ({
  formData,
  handleInputChange,
}: CompanyBasicsStepProps) => {
  const { handleEmployeeChange, handleRevenueChange } = createHandlers(handleInputChange);
  
  console.log("CompanyBasicsStep - Rendering with formData:", formData);

  return (
    <div className="space-y-4">
      <CompanyFields
        companyName={formData.companyName}
        ownerName={formData.ownerName}
        employees={formData.employees}
        revenue={formData.revenue}
        handleInputChange={handleInputChange}
      />
      <ContactFields
        phoneNumber={formData.phoneNumber}
        email={formData.email}
        handleInputChange={handleInputChange}
      />
      <div className="space-y-2">
        <Label htmlFor="employees">Number of Employees</Label>
        <Select value={formData.employees} onValueChange={handleEmployeeChange}>
          <SelectTrigger id="employees">
            <SelectValue placeholder="Select employee count" />
          </SelectTrigger>
          <SelectContent>
            {employeeCountOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="revenue">Annual Revenue</Label>
        <Select value={formData.revenue} onValueChange={handleRevenueChange}>
          <SelectTrigger id="revenue">
            <SelectValue placeholder="Select revenue range" />
          </SelectTrigger>
          <SelectContent>
            {revenueOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};