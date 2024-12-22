import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { AnalysisGrid } from "../AnalysisGrid";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
}

export const ReportContent = ({ formData, analysis }: ReportContentProps) => {
  console.log("ReportContent - Analysis data:", analysis);
  
  // Calculate actual savings and profit based on revenue and department
  const calculateFinancials = () => {
    // Extract the revenue range and convert to a number for calculations
    const revenueStr = formData.revenue;
    let revenue: number;

    if (revenueStr.includes('million')) {
      if (revenueStr.includes('1 million+')) {
        revenue = 1000000;
      } else {
        const match = revenueStr.match(/\$(\d+(?:\.\d+)?)/);
        revenue = match ? parseFloat(match[1]) * 1000000 : 0;
      }
    } else {
      const match = revenueStr.match(/\$(\d+(?:,\d{3})*)/g);
      if (match && match.length >= 1) {
        revenue = parseFloat(match[0].replace(/[$,]/g, ''));
      } else {
        revenue = 0;
      }
    }

    console.log("Calculated revenue base:", revenue);

    if (revenue === 0) {
      return {
        savings: { amount: 0, percentage: 0 },
        profit: { amount: 0, percentage: 0 }
      };
    }

    // Department-specific calculation factors
    const departmentFactors: Record<string, { savingsPercent: number, profitPercent: number }> = {
      'Customer Service': {
        savingsPercent: 25, // 25% potential savings in customer service costs
        profitPercent: 8    // 8% profit increase through better customer retention
      },
      'Marketing': {
        savingsPercent: 15, // 15% savings in marketing spend
        profitPercent: 12   // 12% profit increase through better targeting
      },
      'Sales': {
        savingsPercent: 20, // 20% savings in sales operations
        profitPercent: 15   // 15% profit increase through better conversion
      }
    };

    // Get department-specific factors or use default values
    const factors = departmentFactors[analysis.department] || {
      savingsPercent: 10,
      profitPercent: 5
    };

    // Calculate department-specific savings
    const savingsAmount = (revenue * (factors.savingsPercent / 100));
    const savingsPercentage = factors.savingsPercent;
    
    // Calculate department-specific profit increase
    const profitPercentage = factors.profitPercent;
    const profitAmount = (revenue * (profitPercentage / 100));
    
    console.log("Financial calculations:", {
      revenue,
      savingsAmount,
      savingsPercentage,
      profitAmount,
      profitPercentage,
      department: analysis.department
    });

    return {
      savings: {
        amount: Math.round(savingsAmount),
        percentage: parseFloat(savingsPercentage.toFixed(1))
      },
      profit: {
        amount: Math.round(profitAmount),
        percentage: parseFloat(profitPercentage.toFixed(1))
      }
    };
  };

  const financials = calculateFinancials();

  const analysesForGrid = analysis.allAnalyses?.map((item: any) => {
    // Calculate department-specific financials for each analysis
    const departmentFactors: Record<string, { savingsPercent: number, profitPercent: number }> = {
      'Customer Service': {
        savingsPercent: 25,
        profitPercent: 8
      },
      'Marketing': {
        savingsPercent: 15,
        profitPercent: 12
      },
      'Sales': {
        savingsPercent: 20,
        profitPercent: 15
      }
    };

    const factors = departmentFactors[item.department] || {
      savingsPercent: 10,
      profitPercent: 5
    };

    const revenueNum = parseFloat(formData.revenue.replace(/[^0-9.]/g, '')) || 0;
    const savingsAmount = Math.round(revenueNum * (factors.savingsPercent / 100));
    const profitAmount = Math.round(revenueNum * (factors.profitPercent / 100));

    return {
      ...item,
      savings: savingsAmount.toString(),
      profit_increase: factors.profitPercent.toString(),
      explanation: item.explanation,
      marketingStrategy: item.marketingStrategy,
      actualProfitIncrease: profitAmount.toString(),
      savingsPercentage: factors.savingsPercent.toString()
    };
  }) || [{
    id: crypto.randomUUID(),
    department: analysis.department,
    function: analysis.bot_function,
    savings: financials.savings.amount.toString(),
    profit_increase: financials.profit.percentage.toString(),
    explanation: analysis.explanation,
    marketingStrategy: analysis.marketing_strategy,
    actualProfitIncrease: financials.profit.amount.toString(),
    savingsPercentage: financials.savings.percentage.toString()
  }];

  console.log("ReportContent - Analyses for grid:", analysesForGrid);

  return (
    <div id="detailed-report" className="space-y-6 bg-white p-4 sm:p-8 rounded-lg max-w-full overflow-x-hidden">
      <ReportHeader />
      <div className="company-info whitespace-pre-line">
        <CompanyInformation data={formData} industry={analysis?.industry} />
      </div>
      <div className="current-operations whitespace-pre-line">
        <CurrentOperations data={formData} />
      </div>
      <div className="analysis-results whitespace-pre-line">
        <AnalysisResults 
          analyses={analysesForGrid} 
          revenue={formData.revenue}
        />
      </div>
      <div className="implementation-recommendations mt-8">
        <h3 className="text-xl font-semibold mb-4">AI Implementation Recommendations</h3>
        <div className="overflow-x-auto">
          <AnalysisGrid analyses={analysesForGrid} />
        </div>
      </div>
      <div className="implementation-plan whitespace-pre-line">
        <ImplementationPlan data={{
          objectives: formData.objectives,
          timeline: formData.timeline,
          budget: formData.budget,
          additionalInfo: formData.additionalInfo
        }} />
      </div>
      <ReportFooter />
    </div>
  );
};