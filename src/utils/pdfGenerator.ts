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

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value}%`;
};

const formatText = (text: string): string => {
  return text.replace(/\n/g, '<br>').replace(/\r/g, '<br>');
};

export const generateAnalysisReport = async ({ formData, analysis }: GenerateReportParams): Promise<jsPDF> => {
  console.log('PDF Generation - Starting with data:', { 
    formData, 
    analysis,
    timestamp: new Date().toISOString()
  });
  
  try {
    console.log('Creating temporary container');
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-report-container';
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '800px';
    tempContainer.style.backgroundColor = '#ffffff';
    document.body.appendChild(tempContainer);

    console.log('Generating HTML content');
    tempContainer.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 40px; white-space: pre-wrap; word-wrap: break-word;">
        <div style="margin-bottom: 30px;">
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">AI Analysis Report</h1>
          <h2 style="color: #666; font-size: 18px;">Company Information</h2>
          <p><strong>Company:</strong> ${formData.companyName}</p>
          <p><strong>Industry:</strong> ${analysis.industry}</p>
          <p><strong>Contact:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phoneNumber}</p>
          <p><strong>Employees:</strong> ${formData.employees}</p>
          <p><strong>Revenue:</strong> ${formData.revenue}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Current Operations</h2>
          <p><strong>Service Channels:</strong> ${formatText(formData.serviceChannels)}</p>
          <p><strong>Monthly Interactions:</strong> ${formatText(formData.monthlyInteractions)}</p>
          <p><strong>Current Tools:</strong> ${formatText(formData.currentTools)}</p>
          <p><strong>Pain Points:</strong> ${formatText(formData.painPoints)}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Analysis Results</h2>
          <p><strong>Department:</strong> ${analysis.department}</p>
          <p><strong>Function:</strong> ${formatText(analysis.bot_function)}</p>
          <p><strong>Annual Savings:</strong> ${formatCurrency(analysis.savings)}</p>
          <p><strong>Profit Increase:</strong> ${formatPercentage(analysis.profit_increase)}</p>
          <p style="white-space: pre-wrap; margin: 15px 0;"><strong>Implementation Strategy:</strong><br>${formatText(analysis.explanation)}</p>
          <p style="white-space: pre-wrap; margin: 15px 0;"><strong>Marketing Strategy:</strong><br>${formatText(analysis.marketing_strategy)}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #666; font-size: 18px;">Implementation Details</h2>
          <p><strong>Timeline:</strong> ${formatText(formData.timeline)}</p>
          <p><strong>Budget Range:</strong> ${formatText(formData.budget)}</p>
          <p style="white-space: pre-wrap; margin: 15px 0;"><strong>Objectives:</strong><br>${formatText(formData.objectives)}</p>
          ${formData.additionalInfo ? `<p style="white-space: pre-wrap; margin: 15px 0;"><strong>Additional Information:</strong><br>${formatText(formData.additionalInfo)}</p>` : ''}
        </div>
      </div>
    `;

    console.log('Processing images');
    await processAllImages(tempContainer);

    console.log('Creating canvas');
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      onclone: (_, element) => {
        console.log('Canvas clone callback triggered');
        element.style.width = '800px';
        element.style.margin = '0';
        element.style.padding = '0';
      }
    });

    console.log('Cleaning up temporary container');
    document.body.removeChild(tempContainer);

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    console.log('Creating PDF with dimensions:', {
      imgWidth,
      pageHeight,
      imgHeight,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    let heightLeft = imgHeight;
    let position = 0;
    const totalPages = Math.ceil(imgHeight / pageHeight);

    console.log(`Adding ${totalPages} pages to PDF`);
    
    for (let page = 1; page <= totalPages; page++) {
      console.log(`Processing page ${page} of ${totalPages}`);
      
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

    console.log('PDF generation completed successfully');
    return pdf;
  } catch (error) {
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};