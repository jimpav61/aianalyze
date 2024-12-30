import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";

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
  
  try {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(26, 31, 44); // #1A1F2C
    doc.text("AI Implementation Analysis Report", 20, 20);
    
    // Company Information
    doc.setFontSize(16);
    doc.setTextColor(64, 62, 67); // #403E43
    doc.text("Company Information", 20, 40);
    doc.setFontSize(12);
    doc.text(`Company: ${formData.companyName}`, 20, 55);
    doc.text(`Contact: ${formData.ownerName}`, 20, 65);
    doc.text(`Email: ${formData.email}`, 20, 75);
    doc.text(`Phone: ${formData.phoneNumber || 'N/A'}`, 20, 85);
    
    // Primary Analysis
    doc.setFontSize(16);
    doc.text("Primary Analysis", 20, 105);
    doc.setFontSize(12);
    doc.text(`Industry: ${analysis.industry}`, 20, 120);
    doc.text(`Department: ${analysis.department}`, 20, 130);
    doc.text(`Function: ${analysis.bot_function}`, 20, 140);
    
    // Financial Projections
    doc.setTextColor(22, 163, 74); // text-green-600
    doc.text(`Projected Annual Savings: $${analysis.savings.toLocaleString()}`, 20, 155);
    doc.text(`Projected Profit Increase: ${analysis.profit_increase}%`, 20, 165);
    
    // Implementation Details
    doc.setTextColor(64, 62, 67);
    doc.setFontSize(16);
    doc.text("Implementation Details", 20, 185);
    doc.setFontSize(12);
    
    // Split long text into multiple lines
    const splitExplanation = doc.splitTextToSize(analysis.explanation, 170);
    doc.text(splitExplanation, 20, 200);
    
    const splitStrategy = doc.splitTextToSize(analysis.marketing_strategy, 170);
    doc.text(splitStrategy, 20, doc.getTextDimensions(splitExplanation).h + 210);

    console.log('PDF Generation - PDF created successfully');
    return doc;
  } catch (error) {
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};