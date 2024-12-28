import { Card } from "../ui/card";
import { DetailedFormData } from "@/types/analysis";

interface CompanyInformationProps {
  data: DetailedFormData;
  industry?: string;
}

export const CompanyInformation = ({ data, industry }: CompanyInformationProps) => {
  if (!data) {
    console.error("CompanyInformation - Missing required data");
    return null;
  }

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="font-medium">Company Name:</p>
          <p className="text-gray-600 break-words">{data.companyName || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Industry:</p>
          <p className="text-gray-600 break-words">{industry || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Contact Email:</p>
          <p className="text-gray-600 break-all">{data.email || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Contact Phone:</p>
          <p className="text-gray-600">{data.phoneNumber || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Number of Employees:</p>
          <p className="text-gray-600">{data.employees || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Annual Revenue:</p>
          <p className="text-gray-600">{data.revenue || "Not specified"}</p>
        </div>
      </div>
    </Card>
  );
};