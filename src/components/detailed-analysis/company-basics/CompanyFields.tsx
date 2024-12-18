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
}

export const CompanyFields = ({
  companyName,
  ownerName,
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
        <Label htmlFor="ownerName" className="flex items-center">
          Owner Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="ownerName"
          name="ownerName"
          value={ownerName}
          onChange={handleInputChange}
          placeholder="Enter owner's name"
          className={!ownerName ? "border-red-300" : ""}
        />
      </div>
    </>
  );
};