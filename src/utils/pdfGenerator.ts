import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';

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
    // Create a temporary div to render the report content
    const tempDiv = document.createElement('div');
    tempDiv.id = 'temp-report';
    tempDiv.style.padding = '40px';
    tempDiv.style.width = '800px';
    tempDiv.style.backgroundColor = '#ffffff';
    
    // Add report content
    tempDiv.innerHTML = `
      <div style="font-family: Arial, sans-serif;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">AI Implementation Analysis Report</h1>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Company Information</h2>
          <p><strong>Company Name:</strong> ${formData.companyName}</p>
          <p><strong>Industry:</strong> ${analysis.industry}</p>
          <p><strong>Contact:</strong> ${formData.ownerName}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Analysis Results</h2>
          <p><strong>Department:</strong> ${analysis.department}</p>
          <p><strong>Proposed Solution:</strong> ${analysis.bot_function}</p>
          <p><strong>Projected Annual Savings:</strong> $${analysis.savings.toLocaleString()}</p>
          <p><strong>Projected Profit Increase:</strong> ${analysis.profit_increase}%</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Implementation Details</h2>
          <p>${analysis.explanation}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Marketing Strategy</h2>
          <p>${analysis.marketing_strategy}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff'
    });
    
    document.body.removeChild(tempDiv);
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight,
      '',
      'FAST'
    );

    console.log('PDF Generation - PDF created successfully');
    return pdf;
  } catch (error) {
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};