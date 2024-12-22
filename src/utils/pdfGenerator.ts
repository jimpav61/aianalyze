import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';
import { processAllImages } from "./pdf/imageProcessing";

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
    // Create a temporary container for the report
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-report-container';
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '800px'; // Fixed width for consistent rendering
    document.body.appendChild(tempContainer);

    // Generate report content
    tempContainer.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 40px; white-space: pre-wrap; word-wrap: break-word;">
        <div style="margin-bottom: 30px;">
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">AI Analysis Report</h1>
          <h2 style="color: #666; font-size: 18px;">Company Information</h2>
          <p><strong>Company:</strong> ${formData.companyName}</p>
          <p><strong>Industry:</strong> ${analysis.industry}</p>
          <p><strong>Contact:</strong> ${formData.email}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Analysis Results</h2>
          <p><strong>Department:</strong> ${analysis.department}</p>
          <p><strong>Function:</strong> ${analysis.bot_function}</p>
          <p><strong>Annual Savings:</strong> $${analysis.savings.toLocaleString()}</p>
          <p><strong>Profit Increase:</strong> ${analysis.profit_increase}%</p>
          <p style="white-space: pre-wrap;"><strong>Implementation Strategy:</strong>\n${analysis.explanation}</p>
          <p style="white-space: pre-wrap;"><strong>Marketing Strategy:</strong>\n${analysis.marketing_strategy}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Implementation Details</h2>
          <p><strong>Timeline:</strong> ${formData.timeline}</p>
          <p><strong>Budget Range:</strong> ${formData.budget}</p>
          <p style="white-space: pre-wrap;"><strong>Objectives:</strong>\n${formData.objectives}</p>
          ${formData.additionalInfo ? `<p style="white-space: pre-wrap;"><strong>Additional Information:</strong>\n${formData.additionalInfo}</p>` : ''}
        </div>
      </div>
    `;

    // Process images if any
    await processAllImages(tempContainer);

    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (_, element) => {
        element.style.width = '800px';
        element.style.margin = '0';
        element.style.padding = '0';
      }
    });

    // Clean up the temporary container
    document.body.removeChild(tempContainer);

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
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};