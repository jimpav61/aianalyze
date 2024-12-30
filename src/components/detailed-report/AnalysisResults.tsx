import { calculateFinancials, calculateRevenue } from "@/utils/financialCalculations";
import { Card } from "../ui/card";
import { PrimaryDepartment } from "./analysis-results/PrimaryDepartment";
import { ProjectedMetrics } from "./analysis-results/ProjectedMetrics";
import { ImplementationDetails } from "./analysis-results/ImplementationDetails";
import { AdditionalAnalyses } from "./analysis-results/AdditionalAnalyses";

interface AnalysisResultsProps {
  analyses: Array<{
    department: string;
    function: string;
    savings: string;
    profit_increase: string;
    explanation: string;
    marketingStrategy: string;
  }>;
  revenue: string;
}

export const AnalysisResults = ({ analyses, revenue }: AnalysisResultsProps) => {
  const primaryAnalysis = analyses[0];
  const revenueAmount = calculateRevenue(revenue);
  const financials = calculateFinancials(revenueAmount, primaryAnalysis.department);

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    return !isNaN(num) ? `$${num.toLocaleString()}` : '$0';
  };

  const formatPercentage = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(num) ? `${num}%` : '0%';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold text-[#1A1F2C] mb-6">Analysis Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PrimaryDepartment 
            department={primaryAnalysis.department}
            function={primaryAnalysis.function}
          />
          <ProjectedMetrics 
            savingsAmount={formatCurrency(financials.savingsAmount)}
            profitPercentage={formatPercentage(financials.profitPercentage)}
            revenue={revenue}
          />
        </div>
        
        <ImplementationDetails 
          explanation={primaryAnalysis.explanation}
          marketingStrategy={primaryAnalysis.marketingStrategy}
        />
        
        <AdditionalAnalyses 
          analyses={analyses}
          revenueAmount={revenueAmount}
          formatCurrency={formatCurrency}
          formatPercentage={formatPercentage}
        />
      </Card>
    </div>
  );
};