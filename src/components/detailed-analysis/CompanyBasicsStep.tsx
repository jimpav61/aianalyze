import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeeCountOptions, revenueOptions } from "./constants/dropdownOptions";
import { createHandlers } from "./utils/dropdownHandlers";
import { formatPhoneNumber, validatePhoneNumber } from "@/utils/phoneValidation";

interface CompanyBasicsStepProps {
  formData: {
    companyName: string;
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    console.log("Phone number input:", {
      raw: e.target.value,
      formatted: formattedValue
    });
    
    const event = {
      ...e,
      target: {
        ...e.target,
        name: 'phoneNumber',
        value: formattedValue
      }
    };
    handleInputChange(event);
  };

  const phoneError = validatePhoneNumber(formData.phoneNumber);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName" className="flex items-center">
          Company Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          className={!formData.companyName ? "border-red-300" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center">
          Email <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
          className={!formData.email ? "border-red-300" : ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          className={phoneError ? "border-red-300" : ""}
        />
        {phoneError && (
          <p className="text-sm text-red-500 mt-1">{phoneError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="employees">Number of Employees</Label>
        <Select 
          value={employeeCountOptions.find(opt => opt.label === formData.employees)?.value} 
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
          value={revenueOptions.find(opt => opt.label === formData.revenue)?.value} 
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
    </div>
  );
};