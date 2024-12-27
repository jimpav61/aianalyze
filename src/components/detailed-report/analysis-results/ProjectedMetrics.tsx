import { Card } from "@/components/ui/card";

interface ProjectedMetricsProps {
  savingsAmount: string;
  profitPercentage: string;
  revenue: string;
}

export const ProjectedMetrics = ({ savingsAmount, profitPercentage, revenue }: ProjectedMetricsProps) => {
  return (
    <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
      <div className="space-y-4">
        <div>
          <p className="font-medium text-gray-700 mb-2">Projected Annual Savings:</p>
          <p className="text-[#9b87f5] text-2xl font-semibold">{savingsAmount}</p>
          <p className="text-sm text-gray-600">Based on your annual revenue of {revenue}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700 mb-2">Projected Profit Increase:</p>
          <p className="text-[#9b87f5] text-2xl font-semibold">{profitPercentage}</p>
          <p className="text-sm text-gray-600">Based on your current revenue</p>
        </div>
      </div>
    </Card>
  );
};