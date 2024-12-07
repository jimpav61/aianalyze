import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Enter your company name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="e.g., +1 (555) 123-4567"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="employees">Number of Employees</Label>
        <Input
          id="employees"
          name="employees"
          type="number"
          value={formData.employees}
          onChange={handleInputChange}
          placeholder="e.g., 50"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="revenue">Annual Revenue (USD)</Label>
        <Input
          id="revenue"
          name="revenue"
          type="number"
          value={formData.revenue}
          onChange={handleInputChange}
          placeholder="e.g., 1000000"
        />
      </div>
    </div>
  );
};