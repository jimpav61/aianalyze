import { CompanyFields } from "./company-basics/CompanyFields";
import { ContactFields } from "./company-basics/ContactFields";

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
  console.log("CompanyBasicsStep - Rendering with formData:", formData);

  return (
    <div className="space-y-4">
      <CompanyFields
        companyName={formData.companyName}
        employees={formData.employees}
        revenue={formData.revenue}
        handleInputChange={handleInputChange}
      />
      <ContactFields
        email={formData.email}
        phoneNumber={formData.phoneNumber}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};