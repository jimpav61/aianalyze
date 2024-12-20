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
  const reportContainer = document.createElement('div');
  reportContainer.style.width = '800px';
  reportContainer.style.padding = '40px';
  reportContainer.style.background = 'white';
  document.body.appendChild(reportContainer);

  reportContainer.innerHTML = `
    <div style="font-family: Arial, sans-serif;">
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <img src="/lovable-uploads/1b6619ed-f854-4bba-87ff-33cca6d20e9a.png" alt="ChatSites Logo" style="height: 32px;" />
      </div>
      
      <h1 style="color: #333; font-size: 20px; margin: 0 0 4px 0; font-weight: 500;">AI Implementation Analysis Report</h1>
      <p style="color: #666; font-size: 14px; margin: 0 0 30px 0;">Industry: ${analysis.industry}</p>

      ${analysis.allAnalyses?.map(item => `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 16px; margin: 0 0 12px 0;">${item.department}</h2>
          
          <div style="margin-bottom: 12px;">
            <div style="background: #f65228; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; display: inline-block;">
              ${item.function}
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px; margin: 0 0 12px 0; line-height: 1.4;">
            ${item.explanation}
          </p>

          <div style="display: flex; gap: 24px; margin-top: 12px;">
            <div style="display: flex; align-items: center;">
              <span style="color: #10B981; margin-right: 4px;">✓</span>
              <span style="font-size: 14px;">Savings: $${item.savings}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="color: #10B981; margin-right: 4px;">✓</span>
              <span style="font-size: 14px;">Profit: ${item.profit_increase}%</span>
            </div>
          </div>
        </div>
      `).join('')}

      <div style="margin-top: 40px; color: #666; font-size: 12px;">
        <p style="margin: 0;">Generated by ChatSites AI Analysis Tool</p>
        <p style="margin: 4px 0 0;">www.chatsites.ai</p>
      </div>
    </div>
  `;

  try {
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 800,
      height: reportContainer.offsetHeight
    });

    document.body.removeChild(reportContainer);

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    let heightLeft = imgHeight;
    let position = 0;

    // Calculate the number of pages needed
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