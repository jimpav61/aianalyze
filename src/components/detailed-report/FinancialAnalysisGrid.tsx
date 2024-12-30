import { DetailedFormData } from "@/types/analysis";
import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";
import { TrendingUp } from "lucide-react";

interface FinancialAnalysisGridProps {
  analysis: any;
  formData: DetailedFormData;
}

export const FinancialAnalysisGrid = ({ analysis, formData }: FinancialAnalysisGridProps) => {
  const revenue = calculateRevenue(formData.revenue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {analysis.allAnalyses.slice(1).map((dept: any, index: number) => {
        const deptFinancials = calculateFinancials(revenue, dept.department, analysis.industry);
        
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-700 mb-2">{dept.department}</h4>
            <p className="text-[#22A34A] mb-4">{dept.function}</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Annual Savings</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#22A34A]" />
                  <p className="text-xl font-semibold text-[#22A34A]">
                    ${deptFinancials.savingsAmount.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-[#22A34A]">
                  ({deptFinancials.savingsPercentage}% of revenue)
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Profit Increase</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#22A34A]" />
                  <p className="text-xl font-semibold text-[#22A34A]">
                    ${deptFinancials.profitAmount.toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-[#22A34A]">
                  ({deptFinancials.profitPercentage}% increase)
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};