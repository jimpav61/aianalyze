import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from "html2canvas";

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

  // Helper function to add section headers with brand colors
  const addSectionHeader = (text: string, y: number) => {
    doc.setFillColor(246, 82, 40); // Primary brand color #f65228
    doc.rect(20, y - 6, 170, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(text, 25, y);
    doc.setTextColor(0);
    return y + 15;
  };

  // Add header with logo and contact info
  doc.setFillColor(255, 255, 255);
  doc.rect(20, yPosition - 10, 170, 25, "F");
  
  // Add ChatSites text as logo placeholder
  doc.setTextColor(246, 82, 40);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("ChatSites", 25, yPosition + 5);
  
  // Add contact information
  doc.setTextColor(128, 128, 128);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text([
    "Contact us:",
    "info@chatsites.io",
    "+1 480 862 0288",
    "chatsites.ai"
  ], 150, yPosition - 5, { align: "right" });

  yPosition += 30;

  // Executive Summary
  yPosition = addSectionHeader("Executive Summary", yPosition);
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
    doc.text(line, 25, yPosition);
    yPosition += 8;
  });

  yPosition += 10;

  // Key Metrics
  const metrics = [
    `Projected Annual Savings: $${analysis.savings.toLocaleString()}`,
    `Projected Profit Increase: ${analysis.profit_increase}%`,
    `Primary Department: ${analysis.department}`,
    `Primary Function: ${analysis.bot_function}`
  ];

  metrics.forEach(line => {
    doc.text(line, 25, yPosition);
    yPosition += 8;
  });

  // Add new page for Current Operations
  doc.addPage();
  yPosition = 20;

  // Current Operations Analysis
  yPosition = addSectionHeader("Current Operations Analysis", yPosition);
  
  const operations = [
    `Service Channels: ${formData.serviceChannels}`,
    `Monthly Interactions: ${formData.monthlyInteractions}`,
    `Current Tools: ${formData.currentTools}`,
    `Pain Points: ${formData.painPoints}`
  ];

  operations.forEach(line => {
    const lines = doc.splitTextToSize(line, 160);
    lines.forEach(splitLine => {
      doc.text(splitLine, 25, yPosition);
      yPosition += 8;
    });
    yPosition += 4;
  });

  // Implementation Strategy
  yPosition = addSectionHeader("Implementation Strategy", yPosition + 10);
  
  const strategyLines = doc.splitTextToSize(analysis.explanation, 160);
  strategyLines.forEach(line => {
    doc.text(line, 25, yPosition);
    yPosition += 8;
  });

  yPosition += 10;

  const marketingLines = doc.splitTextToSize(analysis.marketing_strategy, 160);
  marketingLines.forEach(line => {
    doc.text(line, 25, yPosition);
    yPosition += 8;
  });

  // Add new page for Implementation Plan
  doc.addPage();
  yPosition = 20;

  // Implementation Plan
  yPosition = addSectionHeader("Implementation Plan", yPosition);
  
  const planDetails = [
    `Objectives: ${formData.objectives}`,
    `Timeline: ${formData.timeline}`,
    `Budget: ${formData.budget}`,
    `Additional Information: ${formData.additionalInfo || 'None provided'}`
  ];

  planDetails.forEach(detail => {
    const lines = doc.splitTextToSize(detail, 160);
    lines.forEach(line => {
      doc.text(line, 25, yPosition);
      yPosition += 8;
    });
    yPosition += 4;
  });

  // Add department recommendations if available
  if (analysis.allAnalyses && analysis.allAnalyses.length > 0) {
    yPosition = addSectionHeader("Department Recommendations", yPosition + 10);
    
    analysis.allAnalyses.forEach(dept => {
      const deptInfo = [
        `Department: ${dept.department}`,
        `Function: ${dept.function}`,
        `Savings: $${parseInt(dept.savings).toLocaleString()}`,
        `Profit Increase: ${dept.profit_increase}%`,
        `Strategy: ${dept.explanation}`,
        ''
      ];

      deptInfo.forEach(line => {
        const lines = doc.splitTextToSize(line, 160);
        lines.forEach(splitLine => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(splitLine, 25, yPosition);
          yPosition += 8;
        });
      });
    });
  }

  return doc;
};