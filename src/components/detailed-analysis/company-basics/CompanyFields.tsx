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
  ownerName: string;
  employees: string;
  revenue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

export const CompanyFields = ({
  companyName,
  ownerName,
  employees,
  revenue,
  handleInputChange,
  errors,
}: CompanyFieldsProps) => {
  const { handleEmployeeChange, handleRevenueChange } = createHandlers(handleInputChange);

  console.log("CompanyFields - Rendering with values:", {
    companyName,
    ownerName,
    employees,
    revenue
  });

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
          className={errors.companyName ? "border-red-300" : ""}
        />
        {errors.companyName && (
          <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="ownerName" className="flex items-center">
          Owner Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="ownerName"
          name="ownerName"
          value={ownerName}
          onChange={handleInputChange}
          placeholder="Enter owner's name"
          className={errors.ownerName ? "border-red-300" : ""}
        />
        {errors.ownerName && (
          <p className="text-sm text-red-500 mt-1">{errors.ownerName}</p>
        )}
      </div>
    </>
  );
};