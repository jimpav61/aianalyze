import { DetailedFormData } from "@/types/analysis";
import { createReportContainer, generatePDF } from "./pdf/pdfUtils";
import { jsPDF } from "jspdf";
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

  // Add global styles for proper text wrapping and line breaks
  const style = document.createElement('style');
  style.textContent = `
    #pdf-container {
      font-family: Arial, sans-serif;
    }
    #pdf-container * {
      white-space: pre-line !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      max-width: 100% !important;
    }
    #pdf-container p {
      margin-bottom: 1em;
      line-height: 1.5;
    }
    #pdf-container .section {
      margin-bottom: 2em;
      page-break-inside: avoid;
    }
  `;
  reportContainer.appendChild(style);

  // Generate each section of the report
  generateHeaderSection(reportContainer);
  generateCompanySection(reportContainer, formData, analysis.industry);
  generateOperationsSection(reportContainer, formData);
  generateAnalysisSection(reportContainer, analysis);
  generateImplementationSection(reportContainer, formData);
  generateFooterSection(reportContainer);

  return generatePDF(reportContainer);
};