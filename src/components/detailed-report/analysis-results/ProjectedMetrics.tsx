import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";

interface ProjectedMetricsProps {
  savingsAmount: string;
  profitPercentage: string;
  revenue: string;
  industry?: string;
  department?: string;
}

export const ProjectedMetrics = ({ 
  revenue,
  industry,
  department = "Customer Service"
}: ProjectedMetricsProps) => {
  // Parse revenue string to number using the same utility
  const revenueAmount = calculateRevenue(revenue);
  
  // Use the same calculation function as other components
  const financials = calculateFinancials(revenueAmount, department, industry);

  return (
    <Card className="p-6 bg-[#F8F9FC] border border-gray-100">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Annual Savings</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#22A34A]" />
            <p className="text-2xl font-semibold text-[#22A34A]">
              ${financials.savingsAmount.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-[#22A34A]">
            ({financials.savingsPercentage}% of revenue)
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Profit Increase</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#22A34A]" />
            <p className="text-2xl font-semibold text-[#22A34A]">
              ${financials.profitAmount.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-[#22A34A]">
            ({financials.profitPercentage}% increase)
          </p>
        </div>
      </div>
    </Card>
  );
};