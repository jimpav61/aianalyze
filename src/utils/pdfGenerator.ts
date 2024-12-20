import { DetailedFormData } from "@/types/analysis";
import { createReportContainer, generatePDF } from "./pdf/pdfUtils";
import {
  generateHeaderSection,
  generateCompanySection,
  generateOperationsSection,
  generateAnalysisSection,
  generateImplementationSection,
  generateFooterSection
} from "./pdf/reportSections";

interface GenerateReportParams {
  formData: DetailedFormData;
  analysis: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
    allAnalyses?: any[];
  };
}

export const generateAnalysisReport = async ({ formData, analysis }: GenerateReportParams): Promise<jsPDF> => {
  console.log('Starting PDF generation with:', { formData, analysis });
  
  const reportContainer = createReportContainer();

  // Generate each section of the report
  generateHeaderSection(reportContainer);
  generateCompanySection(reportContainer, formData, analysis.industry);
  generateOperationsSection(reportContainer, formData);
  generateAnalysisSection(reportContainer, analysis);
  generateImplementationSection(reportContainer, formData);
  generateFooterSection(reportContainer);

  return generatePDF(reportContainer);
};