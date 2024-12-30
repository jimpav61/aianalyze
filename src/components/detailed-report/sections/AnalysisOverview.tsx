import { DetailedFormData } from "@/types/analysis";
import { calculateFinancials } from "@/utils/financialCalculations";
import { TrendingUp } from "lucide-react";

interface AnalysisOverviewProps {
  analysis: any;
  formData: DetailedFormData;
}

export const AnalysisOverview = ({ analysis, formData }: AnalysisOverviewProps) => {
  // Convert revenue string to number before calculation
  const revenueAmount = parseInt(formData.revenue?.replace(/[^0-9]/g, '') || '0');
  const financials = calculateFinancials(revenueAmount, analysis.department, analysis.industry);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">Primary Department</h4>
        <p className="text-[#f65228]">{analysis.department}</p>
        <h4 className="font-medium text-gray-700 mt-4 mb-2">Primary Function</h4>
        <p className="text-[#f65228]">{analysis.bot_function}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h4 className="font-medium text-gray-700 mb-2">Financial Impact</h4>
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
      </div>
    </div>
  );
};