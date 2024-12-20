import { DetailedFormData } from "@/types/analysis";

interface HiddenReportProps {
  formData: DetailedFormData | undefined;
  analysis: any;
}

export const HiddenReport = ({ formData, analysis }: HiddenReportProps) => {
  if (!formData || !analysis) return null;

  return (
    <div id="report-content" className="hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Analysis Report</h1>
        <h2 className="text-xl mb-2">Company Information</h2>
        <p>Company: {formData.companyName}</p>
        <p>Industry: {analysis.industry}</p>
        <p>Department: {analysis.department}</p>
        <h2 className="text-xl mt-4 mb-2">Analysis Results</h2>
        <p>Potential Savings: ${analysis.savings}</p>
        <p>Profit Increase: ${analysis.profit_increase}</p>
        <p>Explanation: {analysis.explanation}</p>
        <p>Marketing Strategy: {analysis.marketing_strategy}</p>
      </div>
    </div>
  );
};