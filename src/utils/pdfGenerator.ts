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
      <div style="text-align: center; margin-bottom: 40px;">
        <img src="/lovable-uploads/1b6619ed-f854-4bba-87ff-33cca6d20e9a.png" alt="ChatSites Logo" style="height: 32px;" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        ${analysis.allAnalyses?.map(item => `
          <div style="margin-bottom: 40px; background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.3s;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px;">
              <h2 style="font-size: 20px; font-weight: bold; margin: 0;">${item.department}</h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f65228">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <div style="margin-bottom: 16px;">
              <div style="display: inline-block; background: #f65228; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 14px; margin-bottom: 8px;">
                Function
              </div>
              <p style="margin: 0; color: #4B5563; font-size: 14px;">${item.function}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <div style="display: inline-block; background: #f65228; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 14px; margin-bottom: 8px;">
                Explanation
              </div>
              <p style="margin: 0; color: #4B5563; font-size: 14px;">${item.explanation}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <div style="display: inline-block; background: #f65228; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 14px; margin-bottom: 8px;">
                Marketing Strategy
              </div>
              <p style="margin: 0; color: #4B5563; font-size: 14px;">${item.marketingStrategy}</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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