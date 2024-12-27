import { DetailedFormData } from "@/types/analysis";
import { CurrentOperations } from "./CurrentOperations";
import { AnalysisResults } from "./AnalysisResults";
import { ImplementationPlan } from "./ImplementationPlan";
import { CompanyInformation } from "./CompanyInformation";
import { ReportHeader } from "./ReportHeader";
import { ReportFooter } from "./ReportFooter";
import { ImplementationRecommendations } from "./ImplementationRecommendations";
import { Separator } from "@/components/ui/separator";

interface ReportContentProps {
  formData: DetailedFormData;
  analysis: any;
  onBookDemo?: () => void;
  industry?: string;
}

export const ReportContent = ({ formData, analysis, onBookDemo, industry }: ReportContentProps) => {
  console.log("ReportContent - Rendering with data:", {
    formData,
    analysis,
    industry,
    hasBookDemo: !!onBookDemo
  });

  // Ensure we have valid data
  if (!formData || !analysis) {
    console.error("Missing required data for report generation");
    return null;
  }

  // Use client's form data for the report
  const clientData = {
    companyName: formData.companyName || "Not provided",
    ownerName: formData.ownerName || "Not provided",
    email: formData.email || "Not provided",
    phoneNumber: formData.phoneNumber || "Not provided",
    employees: formData.employees || "Not provided",
    revenue: formData.revenue || "Not provided"
  };

  const operationsData = {
    serviceChannels: formData.serviceChannels || "Not provided",
    monthlyInteractions: formData.monthlyInteractions || "Not provided",
    currentTools: formData.currentTools || "Not provided",
    painPoints: formData.painPoints || "Not provided"
  };

  const implementationData = {
    objectives: formData.objectives || "Not provided",
    timeline: formData.timeline || "Not provided",
    budget: formData.budget || "Not provided",
    additionalInfo: formData.additionalInfo || "Not provided"
  };

  return (
    <div 
      id="detailed-report" 
      className="space-y-8 bg-white p-6 sm:p-8 rounded-lg max-w-full overflow-x-hidden whitespace-pre-line"
    >
      <ReportHeader />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1A1F2C]">Company Overview</h2>
        <CompanyInformation data={clientData} industry={industry || analysis?.industry} />
      </div>
      
      <Separator className="my-8" />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1A1F2C]">Current Operations Analysis</h2>
        <CurrentOperations data={operationsData} />
      </div>
      
      <Separator className="my-8" />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1A1F2C]">AI Analysis Results</h2>
        <AnalysisResults 
          analyses={analysis.allAnalyses || [analysis]} 
          revenue={formData.revenue}
        />
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1A1F2C]">Implementation Strategy</h2>
        <ImplementationRecommendations analysis={analysis} formData={formData} />
      </div>
      
      <Separator className="my-8" />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#1A1F2C]">Implementation Plan</h2>
        <ImplementationPlan data={implementationData} />
      </div>
      
      <Separator className="my-8" />
      
      <ReportFooter />
    </div>
  );
};