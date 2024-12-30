import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import { calculateFinancials, calculateRevenue } from "./financialCalculations";

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
    const revenue = calculateRevenue(formData.revenue);
    
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
    const financials = calculateFinancials(revenue, analysis.department, analysis.industry);
    doc.setTextColor(22, 163, 74); // text-green-600
    doc.text(`Projected Annual Savings: $${financials.savingsAmount.toLocaleString()}`, 20, 155);
    doc.text(`Projected Profit Increase: ${financials.profitPercentage}%`, 20, 165);
    
    // Implementation Details
    doc.setTextColor(64, 62, 67);
    doc.setFontSize(16);
    doc.text("Implementation Details", 20, 185);
    doc.setFontSize(12);
    
    // Split long text into multiple lines
    const splitExplanation = doc.splitTextToSize(analysis.explanation, 170);
    doc.text(splitExplanation, 20, 200);
    
    // Add new page if needed for marketing strategy
    if (doc.getTextDimensions(splitExplanation).h > 50) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Marketing Strategy", 20, 20);
      doc.setFontSize(12);
      const splitStrategy = doc.splitTextToSize(analysis.marketing_strategy, 170);
      doc.text(splitStrategy, 20, 35);
    } else {
      doc.setFontSize(16);
      doc.text("Marketing Strategy", 20, doc.getTextDimensions(splitExplanation).h + 210);
      doc.setFontSize(12);
      const splitStrategy = doc.splitTextToSize(analysis.marketing_strategy, 170);
      doc.text(splitStrategy, 20, doc.getTextDimensions(splitExplanation).h + 225);
    }

    // Additional Analyses if available
    if (analysis.allAnalyses && analysis.allAnalyses.length > 1) {
      doc.addPage();
      doc.setFontSize(20);
      doc.text("Additional Department Analyses", 20, 20);
      
      let yPos = 40;
      analysis.allAnalyses.slice(1).forEach((additionalAnalysis: any) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        const deptFinancials = calculateFinancials(revenue, additionalAnalysis.department, analysis.industry);
        
        doc.setFontSize(16);
        doc.setTextColor(64, 62, 67);
        doc.text(additionalAnalysis.department, 20, yPos);
        doc.setFontSize(12);
        doc.text(`Function: ${additionalAnalysis.function}`, 20, yPos + 10);
        
        doc.setTextColor(22, 163, 74); // text-green-600
        doc.text(`Annual Savings: $${deptFinancials.savingsAmount.toLocaleString()}`, 20, yPos + 20);
        doc.text(`Profit Increase: ${deptFinancials.profitPercentage}%`, 20, yPos + 30);
        
        doc.setTextColor(64, 62, 67);
        const splitDeptExplanation = doc.splitTextToSize(additionalAnalysis.explanation, 170);
        doc.text(splitDeptExplanation, 20, yPos + 45);
        
        yPos += 80;
      });
    }

    console.log('PDF Generation - PDF created successfully');
    return doc;
  } catch (error) {
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};