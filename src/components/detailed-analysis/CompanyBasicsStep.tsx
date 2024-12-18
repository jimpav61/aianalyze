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
    phoneNumber: string;
    email: string;
    employees: string;
    revenue: string;
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
    <div className="space-y-6 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
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
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="space-y-2">
          <Label htmlFor="employees" className="text-gray-700">Number of Employees</Label>
          <Select value={formData.employees} onValueChange={handleEmployeeChange}>
            <SelectTrigger id="employees" className="bg-white">
              <SelectValue placeholder="Select employee count" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {employeeCountOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="hover:bg-gray-100"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="revenue" className="text-gray-700">Annual Revenue</Label>
          <Select value={formData.revenue} onValueChange={handleRevenueChange}>
            <SelectTrigger id="revenue" className="bg-white">
              <SelectValue placeholder="Select revenue range" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              {revenueOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="hover:bg-gray-100"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};