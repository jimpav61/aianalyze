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
  console.log('PDF Generation - Starting with data:', { formData, analysis });
  
  const reportContainer = createReportContainer();
  console.log('PDF Generation - Created container');

  try {
    // Generate each section of the report
    console.log('PDF Generation - Generating header section');
    generateHeaderSection(reportContainer);
    
    console.log('PDF Generation - Generating company section');
    generateCompanySection(reportContainer, formData, analysis.industry);
    
    console.log('PDF Generation - Generating operations section');
    generateOperationsSection(reportContainer, formData);
    
    console.log('PDF Generation - Generating analysis section');
    generateAnalysisSection(reportContainer, analysis);
    
    console.log('PDF Generation - Generating implementation section');
    generateImplementationSection(reportContainer, formData);
    
    console.log('PDF Generation - Generating footer section');
    generateFooterSection(reportContainer);

    console.log('PDF Generation - All sections generated, creating PDF');
    const pdf = await generatePDF(reportContainer);
    console.log('PDF Generation - PDF created successfully');
    
    return pdf;
  } catch (error) {
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};