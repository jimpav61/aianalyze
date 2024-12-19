import { DetailedFormData } from "@/types/analysis";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportReportAsPDF = async (formData: DetailedFormData | null | undefined, analysis: any) => {
  if (!formData || !analysis) {
    console.error("[DEBUG] exportReportAsPDF - Missing required data");
    throw new Error("Missing required data for PDF export");
  }

  // Create a temporary div element to render the report
  const reportElement = document.createElement('div');
  reportElement.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1>AI Implementation Analysis Report</h1>
      <h2>Company Information</h2>
      <p>Company: ${formData.companyName || 'N/A'}</p>
      <p>Industry: ${analysis.industry || 'N/A'}</p>
      <h2>Analysis Results</h2>
      <p>Potential Savings: $${analysis.savings?.toLocaleString() || '0'}</p>
      <p>Profit Increase: ${analysis.profit_increase || '0'}%</p>
      <p>Implementation Strategy: ${analysis.marketing_strategy || 'N/A'}</p>
      <h2>Detailed Explanation</h2>
      <p>${analysis.explanation || 'N/A'}</p>
    </div>
  `;

  // Temporarily append to document for html2canvas
  document.body.appendChild(reportElement);

  try {
    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('ai-implementation-report.pdf');
  } finally {
    // Clean up: remove the temporary element
    document.body.removeChild(reportElement);
  }
};