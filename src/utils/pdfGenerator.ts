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
  // Create a temporary container to render the report
  const reportContainer = document.createElement('div');
  reportContainer.style.width = '800px'; // Set fixed width for consistent rendering
  reportContainer.style.padding = '20px';
  reportContainer.style.background = 'white';
  document.body.appendChild(reportContainer);
  
  // Create the report content matching the exact card layout
  reportContainer.innerHTML = `
    <div style="font-family: Arial, sans-serif;">
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <img src="/lovable-uploads/1b6619ed-f854-4bba-87ff-33cca6d20e9a.png" alt="ChatSites Logo" style="height: 64px; margin-right: 10px;" />
      </div>
      
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="font-size: 20px; font-weight: bold; color: #333; margin: 0;">${analysis.department}</h3>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f65228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        
        <div style="margin-bottom: 16px;">
          <span style="background: #f65228; color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px; display: inline-block; margin-bottom: 8px;">
            Function
          </span>
          <p style="color: #666; font-size: 14px; margin: 0;">${analysis.bot_function}</p>
        </div>
        
        <div style="margin-bottom: 16px;">
          <span style="background: #f65228; color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px; display: inline-block; margin-bottom: 8px;">
            Explanation
          </span>
          <p style="color: #666; font-size: 14px; margin: 0;">${analysis.explanation}</p>
        </div>
        
        <div style="margin-bottom: 16px;">
          <span style="background: #f65228; color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px; display: inline-block; margin-bottom: 8px;">
            Marketing Strategy
          </span>
          <p style="color: #666; font-size: 14px; margin: 0;">${analysis.marketing_strategy}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span style="font-size: 14px; font-weight: 500;">Savings: $${typeof analysis.savings === 'string' ? analysis.savings : analysis.savings.toLocaleString()}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span style="font-size: 14px; font-weight: 500;">Profit: ${typeof analysis.profit_increase === 'string' ? analysis.profit_increase : analysis.profit_increase}%</span>
          </div>
        </div>
      </div>
    </div>
  `;

  try {
    // Capture the rendered content as an image with higher quality settings
    const canvas = await html2canvas(reportContainer, {
      scale: 2, // Increase scale for better quality
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: 800,
      height: reportContainer.offsetHeight // Capture full height
    });

    // Remove the temporary container
    document.body.removeChild(reportContainer);

    // Create PDF with proper dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Handle multi-page content if needed
    let heightLeft = imgHeight;
    let position = 0;
    let pageNumber = 1;

    while (heightLeft >= 0) {
      if (pageNumber > 1) {
        pdf.addPage();
      }
      
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      
      heightLeft -= pageHeight;
      position -= pageHeight;
      pageNumber++;
    }

    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};