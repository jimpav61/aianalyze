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
          <p className="text-green-600 text-2xl font-semibold flex items-center gap-1">
            {savingsAmount}
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </p>
          <p className="text-sm text-gray-600">Based on your annual revenue of {revenue}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700 mb-2">Projected Profit Increase:</p>
          <p className="text-green-600 text-2xl font-semibold flex items-center gap-1">
            {profitPercentage}
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </p>
          <p className="text-sm text-gray-600">Based on your current revenue</p>
        </div>
      </div>
    </Card>
  );
};