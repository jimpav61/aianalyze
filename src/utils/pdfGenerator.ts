import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
  // Create a temporary container for the report content
  const reportContainer = document.createElement('div');
  reportContainer.style.width = '800px';
  reportContainer.style.padding = '40px';
  reportContainer.style.background = 'white';
  document.body.appendChild(reportContainer);

  // Generate the HTML content that matches your analysis cards
  reportContainer.innerHTML = `
    <div style="font-family: Arial, sans-serif;">
      <img src="/lovable-uploads/1b6619ed-f854-4bba-87ff-33cca6d20e9a.png" alt="ChatSites Logo" style="height: 24px; margin-bottom: 24px;" />
      
      <h1 style="font-size: 24px; margin-bottom: 16px;">AI Implementation Analysis Report</h1>
      <p style="color: #666; margin-bottom: 24px;">Industry: ${analysis.industry} & Marketing</p>

      ${analysis.allAnalyses?.map(item => `
        <div style="margin-bottom: 32px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h2 style="font-size: 20px; font-weight: bold; margin: 0;">${item.department}</h2>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: inline-block; background: #f65228; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; margin-bottom: 8px;">
              Function
            </div>
            <p style="margin: 0; color: #4B5563; font-size: 14px;">${item.function}</p>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: inline-block; background: #f65228; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; margin-bottom: 8px;">
              Explanation
            </div>
            <p style="margin: 0; color: #4B5563; font-size: 14px;">${item.explanation}</p>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="display: inline-block; background: #f65228; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; margin-bottom: 8px;">
              Marketing Strategy
            </div>
            <p style="margin: 0; color: #4B5563; font-size: 14px;">${item.marketingStrategy}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #10B981;">$</span>
              <span style="font-size: 14px; font-weight: 500;">Savings: $${item.savings}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #10B981;">↗</span>
              <span style="font-size: 14px; font-weight: 500;">Profit: ${item.profit_increase}%</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  try {
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    document.body.removeChild(reportContainer);

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    let heightLeft = imgHeight;
    let position = 0;
    const totalPages = Math.ceil(imgHeight / pageHeight);

    for (let page = 1; page <= totalPages; page++) {
      if (page > 1) {
        pdf.addPage();
      }

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );

      heightLeft -= pageHeight;
      position -= pageHeight;
    }

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};