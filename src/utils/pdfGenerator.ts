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
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - (2 * margin);

  // Helper function for consistent section styling
  const addSection = (title: string, content: string | string[], y: number) => {
    // Add section background
    doc.setFillColor(249, 250, 251); // bg-gray-50
    doc.rect(margin, y - 5, contentWidth, 30, "F");
    
    // Add section title
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55); // text-gray-800
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 5, y + 5);
    
    // Add content
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(75, 85, 99); // text-gray-600
    
    const contentArray = Array.isArray(content) ? content : [content];
    let contentY = y + 15;
    
    contentArray.forEach(line => {
      const lines = doc.splitTextToSize(line, contentWidth - 10);
      lines.forEach((textLine: string) => {
        if (contentY > 270) {
          doc.addPage();
          contentY = 20;
        }
        doc.text(textLine, margin + 5, contentY);
        contentY += 7;
      });
    });
    
    return contentY + 10;
  };

  // Header with logo and contact
  doc.setFillColor(246, 82, 40); // #f65228
  doc.rect(margin, yPosition - 10, contentWidth, 2, "F");
  
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(246, 82, 40);
  doc.text("ChatSites", margin, yPosition + 10);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128); // text-gray-500
  doc.text([
    "Contact:",
    "info@chatsites.io",
    "chatsites.ai"
  ], pageWidth - margin - 30, yPosition, { align: "right" });
  
  yPosition += 30;

  // Company Information
  yPosition = addSection("Company Information", [
    `Company: ${formData.companyName}`,
    `Industry: ${analysis.industry}`,
    `Contact: ${formData.email}`,
    `Phone: ${formData.phoneNumber}`,
    `Employees: ${formData.employees}`,
    `Revenue: ${formData.revenue}`
  ], yPosition);

  // Current Operations
  yPosition = addSection("Current Operations", [
    `Service Channels: ${formData.serviceChannels}`,
    `Monthly Interactions: ${formData.monthlyInteractions}`,
    `Current Tools: ${formData.currentTools}`,
    `Pain Points: ${formData.painPoints}`
  ], yPosition);

  // Analysis Results
  yPosition = addSection("Analysis Results", [
    `Department: ${analysis.department}`,
    `Function: ${analysis.bot_function}`,
    `Projected Annual Savings: $${analysis.savings.toLocaleString()}`,
    `Projected Profit Increase: ${analysis.profit_increase}%`,
    `Implementation Strategy: ${analysis.explanation}`,
    `Marketing Strategy: ${analysis.marketing_strategy}`
  ], yPosition);

  // Additional Analyses
  if (analysis.allAnalyses && analysis.allAnalyses.length > 1) {
    yPosition = addSection("Additional Department Analyses", 
      analysis.allAnalyses.slice(1).map(dept => 
        `${dept.department}: ${dept.function}\nSavings: $${parseInt(dept.savings).toLocaleString()}, Profit Increase: ${dept.profit_increase}%`
      ),
      yPosition
    );
  }

  // Implementation Plan
  yPosition = addSection("Implementation Plan", [
    `Objectives: ${formData.objectives}`,
    `Timeline: ${formData.timeline}`,
    `Budget: ${formData.budget}`,
    formData.additionalInfo ? `Additional Information: ${formData.additionalInfo}` : ""
  ], yPosition);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text("Generated by ChatSites AI Analysis Tool", pageWidth / 2, doc.internal.pageSize.height - 20, { align: "center" });
  doc.text("www.chatsites.ai", pageWidth / 2, doc.internal.pageSize.height - 15, { align: "center" });

  return doc;
};