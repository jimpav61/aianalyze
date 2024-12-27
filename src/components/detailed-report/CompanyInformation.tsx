import { Card } from "@/components/ui/card";

interface CompanyInformationProps {
  data: {
    companyName: string;
    ownerName: string;
    email: string;
    phoneNumber: string;
    employees: string;
    revenue: string;
  };
  industry?: string;
}

export const CompanyInformation = ({ data, industry }: CompanyInformationProps) => {
  return (
    <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Company Name</p>
          <p className="text-lg text-[#f65228]">{data.companyName}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Industry</p>
          <p className="text-lg text-[#f65228]">{industry || "Not specified"}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Contact Person</p>
          <p className="text-lg text-[#f65228]">{data.ownerName}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-lg text-[#f65228]">{data.email}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Phone</p>
          <p className="text-lg text-[#f65228]">{data.phoneNumber}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Number of Employees</p>
          <p className="text-lg text-[#f65228]">{data.employees}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Annual Revenue</p>
          <p className="text-lg text-[#f65228]">{data.revenue}</p>
        </div>
      </div>
    </Card>
  );
};