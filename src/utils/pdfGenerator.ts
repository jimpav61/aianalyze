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

  // Helper function to add section headers with brand colors
  const addSectionHeader = (text: string, y: number) => {
    doc.setFillColor(246, 82, 40); // Primary brand color #f65228
    doc.rect(margin, y - 6, contentWidth, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(text, margin + 5, y);
    doc.setTextColor(0);
    return y + 15;
  };

  // Helper function to add wrapped text
  const addWrappedText = (text: string, y: number, fontSize: number = 11) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth - 10);
    lines.forEach((line: string) => {
      // Check if we need a new page
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin + 5, y);
      y += fontSize * 0.5;
    });
    return y + 8;
  };

  // Header with logo and contact info
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, yPosition - 10, contentWidth, 25, "F");
  
  // Add ChatSites text as logo
  doc.setTextColor(246, 82, 40);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("ChatSites", margin + 5, yPosition + 5);
  
  // Add contact information
  doc.setTextColor(128, 128, 128);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text([
    "Contact us:",
    "info@chatsites.io",
    "+1 480 862 0288",
    "chatsites.ai"
  ], pageWidth - margin - 5, yPosition - 5, { align: "right" });

  yPosition += 30;

  // Company Information
  yPosition = addSectionHeader("Company Information", yPosition);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const companyInfo = [
    `Company: ${formData.companyName}`,
    `Industry: ${analysis.industry}`,
    `Contact: ${formData.email}`,
    `Phone: ${formData.phoneNumber}`,
    `Employees: ${formData.employees}`,
    `Annual Revenue: ${formData.revenue}`
  ];

  companyInfo.forEach(line => {
    yPosition = addWrappedText(line, yPosition);
  });

  // Current Operations
  yPosition = addSectionHeader("Current Operations", yPosition + 5);
  
  const operations = [
    `Service Channels: ${formData.serviceChannels}`,
    `Monthly Interactions: ${formData.monthlyInteractions}`,
    `Current Tools: ${formData.currentTools}`,
    `Pain Points: ${formData.painPoints}`
  ];

  operations.forEach(line => {
    yPosition = addWrappedText(line, yPosition);
  });

  // Analysis Results
  yPosition = addSectionHeader("Analysis Results", yPosition + 5);
  
  const results = [
    `Primary Department: ${analysis.department}`,
    `Primary Function: ${analysis.bot_function}`,
    `Projected Annual Savings: $${analysis.savings.toLocaleString()}`,
    `Projected Profit Increase: ${analysis.profit_increase}%`,
    `Implementation Strategy: ${analysis.explanation}`,
    `Marketing Strategy: ${analysis.marketing_strategy}`
  ];

  results.forEach(line => {
    yPosition = addWrappedText(line, yPosition);
  });

  // Implementation Plan
  yPosition = addSectionHeader("Implementation Plan", yPosition + 5);
  
  const planDetails = [
    `Objectives: ${formData.objectives}`,
    `Timeline: ${formData.timeline}`,
    `Budget: ${formData.budget}`
  ];

  planDetails.forEach(line => {
    yPosition = addWrappedText(line, yPosition);
  });

  if (formData.additionalInfo) {
    yPosition = addWrappedText(`Additional Information: ${formData.additionalInfo}`, yPosition);
  }

  // Department Recommendations
  if (analysis.allAnalyses && analysis.allAnalyses.length > 1) {
    yPosition = addSectionHeader("Additional Department Recommendations", yPosition + 5);
    
    analysis.allAnalyses.slice(1).forEach((dept: any) => {
      const deptInfo = [
        `Department: ${dept.department}`,
        `Function: ${dept.function}`,
        `Savings: $${parseInt(dept.savings).toLocaleString()}`,
        `Profit Increase: ${dept.profit_increase}%`,
        `Strategy: ${dept.explanation}`,
        ''
      ];

      deptInfo.forEach(line => {
        yPosition = addWrappedText(line, yPosition);
      });
    });
  }

  return doc;
};