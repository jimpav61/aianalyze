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
    const greenColor = [34, 163, 74] as const; // Type as readonly tuple
    
    // Logo and Title
    doc.addImage("/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png", "PNG", 20, 15, 30, 30);
    doc.setFontSize(24);
    doc.setTextColor(26, 31, 44); // #1A1F2C
    doc.text("AI Implementation Analysis Report", 60, 35);
    
    // Company Information Section
    doc.setFontSize(18);
    doc.setTextColor(26, 31, 44);
    doc.text("Company Information", 20, 60);
    
    doc.setFontSize(12);
    doc.setTextColor(64, 62, 67);
    const companyInfo = [
      [`Company Name: ${formData.companyName}`, `Industry: ${analysis.industry}`],
      [`Contact Email: ${formData.email}`, `Phone: ${formData.phoneNumber || 'N/A'}`],
      [`Number of Employees: ${formData.employees}`, `Annual Revenue: ${formData.revenue}`]
    ];
    
    let yPos = 75;
    companyInfo.forEach(row => {
      doc.text(row[0], 20, yPos);
      doc.text(row[1], 120, yPos);
      yPos += 15;
    });

    // Current Operations Section
    yPos += 10;
    doc.setFontSize(18);
    doc.setTextColor(26, 31, 44);
    doc.text("Current Operations", 20, yPos);
    
    doc.setFontSize(12);
    doc.setTextColor(64, 62, 67);
    yPos += 15;
    const operations = [
      `Service Channels: ${formData.serviceChannels}`,
      `Monthly Interactions: ${formData.monthlyInteractions}`,
      `Current Tools: ${formData.currentTools}`,
      `Pain Points: ${formData.painPoints}`
    ];
    
    operations.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 10;
    });

    // Analysis Results Section
    yPos += 10;
    doc.setFontSize(18);
    doc.setTextColor(26, 31, 44);
    doc.text("Analysis Results", 20, yPos);
    
    // Primary Department Analysis
    yPos += 20;
    doc.setFontSize(14);
    doc.text(analysis.department, 20, yPos);
    doc.setFontSize(12);
    doc.setTextColor(246, 82, 40); // #f65228
    doc.text(analysis.bot_function, 20, yPos + 10);
    
    // Financial metrics in green
    doc.setTextColor(...greenColor);
    doc.setFontSize(16);
    doc.text(`$${analysis.savings.toLocaleString()}`, 20, yPos + 30);
    doc.setFontSize(12);
    doc.text(`(${calculateFinancials(calculateRevenue(formData.revenue), analysis.department).savingsPercentage}% of revenue)`, 20, yPos + 40);
    
    doc.setFontSize(16);
    doc.text(`${analysis.profit_increase}%`, 20, yPos + 60);
    doc.setFontSize(12);
    doc.text("profit increase", 20, yPos + 70);

    // Implementation Strategy
    doc.setTextColor(64, 62, 67);
    yPos += 90;
    doc.text("Implementation Strategy:", 20, yPos);
    const splitExplanation = doc.splitTextToSize(analysis.explanation, 170);
    doc.text(splitExplanation, 20, yPos + 10);

    // Marketing Strategy
    yPos += doc.getTextDimensions(splitExplanation).h + 20;
    doc.text("Marketing Strategy:", 20, yPos);
    const splitMarketing = doc.splitTextToSize(analysis.marketing_strategy, 170);
    doc.text(splitMarketing, 20, yPos + 10);

    // Additional Analyses
    if (analysis.allAnalyses && analysis.allAnalyses.length > 1) {
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(26, 31, 44);
      doc.text("Additional Department Analyses", 20, 30);
      
      let currentY = 50;
      analysis.allAnalyses.slice(1).forEach((dept: any) => {
        if (currentY > 250) {
          doc.addPage();
          currentY = 30;
        }
        
        doc.setFontSize(14);
        doc.setTextColor(64, 62, 67);
        doc.text(dept.department, 20, currentY);
        
        doc.setFontSize(12);
        doc.setTextColor(246, 82, 40); // #f65228
        doc.text(dept.function, 20, currentY + 10);
        
        // Financial metrics in green
        doc.setTextColor(...greenColor);
        doc.setFontSize(16);
        doc.text(`$${Number(dept.savings).toLocaleString()}`, 20, currentY + 30);
        doc.setFontSize(12);
        doc.text(`(${calculateFinancials(calculateRevenue(formData.revenue), dept.department).savingsPercentage}% of revenue)`, 20, currentY + 40);
        
        doc.setFontSize(16);
        doc.text(`${dept.profit_increase}%`, 20, currentY + 60);
        doc.setFontSize(12);
        doc.text("profit increase", 20, currentY + 70);
        
        currentY += 90;
      });
    }

    // Footer
    doc.setTextColor(64, 62, 67);
    doc.setFontSize(10);
    doc.text("Generated by ChatSites AI Analysis Tool", 20, 280);
    doc.text("www.chatsites.ai", 20, 287);

    return doc;
  } catch (error) {
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};