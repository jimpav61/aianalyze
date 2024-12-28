import { Card } from "../ui/card";

interface CompanyInformationProps {
  data: {
    companyName: string;
    email: string;
    phoneNumber: string;
    employees: string;
    revenue: string;
  };
  industry?: string;
}

export const CompanyInformation = ({ data, industry }: CompanyInformationProps) => {
  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="font-medium">Company Name:</p>
          <p className="text-gray-600 break-words">{data.companyName}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Industry:</p>
          <p className="text-gray-600 break-words">{industry}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Contact Email:</p>
          <p className="text-gray-600 break-all">{data.email}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Contact Phone:</p>
          <p className="text-gray-600">{data.phoneNumber}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Number of Employees:</p>
          <p className="text-gray-600">{data.employees}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Annual Revenue:</p>
          <p className="text-gray-600">{data.revenue}</p>
        </div>
      </div>
    </Card>
  );
};