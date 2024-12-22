import { Card } from "@/components/ui/card";

interface PrimaryDepartmentProps {
  department: string;
  function: string;
}

export const PrimaryDepartment = ({ department, function: botFunction }: PrimaryDepartmentProps) => {
  return (
    <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
      <div className="space-y-4">
        <div>
          <p className="font-medium text-gray-700 mb-2">Primary Department:</p>
          <p className="text-[#f65228] text-lg">{department}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700 mb-2">Primary Function:</p>
          <p className="text-[#f65228] text-lg whitespace-pre-wrap">{botFunction}</p>
        </div>
      </div>
    </Card>
  );
};