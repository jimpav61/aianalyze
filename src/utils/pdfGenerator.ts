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
      <div style="margin-bottom: 40px;">
        <img src="/lovable-uploads/1b6619ed-f854-4bba-87ff-33cca6d20e9a.png" alt="ChatSites Logo" style="height: 32px;" />
      </div>

      ${analysis.allAnalyses?.map(item => `
        <div style="margin-bottom: 40px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h2 style="font-size: 20px; font-weight: bold; margin: 0;">${item.department}</h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#f65228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span style="font-size: 14px; font-weight: 500;">Savings: $${item.savings}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17 6H23V12" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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