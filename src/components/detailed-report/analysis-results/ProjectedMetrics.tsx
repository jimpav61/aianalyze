import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { calculateFinancials } from "@/utils/financialCalculations";

interface ProjectedMetricsProps {
  savingsAmount: string;
  profitPercentage: string;
  revenue: string;
  industry?: string;
}

export const ProjectedMetrics = ({ 
  savingsAmount, 
  profitPercentage, 
  revenue,
  industry 
}: ProjectedMetricsProps) => {
  const revenueAmount = parseFloat(revenue.replace(/[^0-9.-]+/g, ""));
  const financials = calculateFinancials(revenueAmount, "Customer Service", industry);

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