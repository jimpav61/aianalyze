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
      <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #ffffff;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 24px; background: #F1F0FB; border-radius: 8px; margin-bottom: 32px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img 
              src="/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png" 
              alt="ChatSites Logo" 
              style="height: 40px; width: auto;"
            />
            <span style="font-size: 24px; font-weight: bold; color: #9b87f5;">ChatSites Analysis Report</span>
          </div>
        </div>

        <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Company Information</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Company Name:</p>
              <p style="color: #6E59A5; margin: 0;">${formData.companyName}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Industry:</p>
              <p style="color: #6E59A5; margin: 0;">${analysis.industry}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Contact Email:</p>
              <p style="color: #6E59A5; margin: 0;">${formData.email}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Contact Phone:</p>
              <p style="color: #6E59A5; margin: 0;">${formData.phoneNumber}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Number of Employees:</p>
              <p style="color: #6E59A5; margin: 0;">${formData.employees}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Annual Revenue:</p>
              <p style="color: #6E59A5; margin: 0;">${formData.revenue}</p>
            </div>
          </div>
        </div>

        <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Current Operations</h2>
          <div style="display: grid; gap: 16px;">
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Service Channels:</p>
              <p style="color: #6E59A5; margin: 0;">${formatText(formData.serviceChannels)}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Monthly Interactions:</p>
              <p style="color: #6E59A5; margin: 0;">${formatText(formData.monthlyInteractions)}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Current Tools:</p>
              <p style="color: #6E59A5; margin: 0;">${formatText(formData.currentTools)}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Pain Points:</p>
              <p style="color: #6E59A5; margin: 0;">${formatText(formData.painPoints)}</p>
            </div>
          </div>
        </div>

        <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Analysis Results</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
            <div style="background: #E5DEFF; border-radius: 8px; padding: 16px;">
              <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Primary Department:</p>
              <p style="color: #6E59A5; margin: 0;">${analysis.department}</p>
              <p style="font-weight: 500; color: #403E43; margin: 8px 0;">Primary Function:</p>
              <p style="color: #6E59A5; margin: 0;">${analysis.bot_function}</p>
            </div>
            <div style="background: #E5DEFF; border-radius: 8px; padding: 16px;">
              <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Projected Annual Savings:</p>
              <p style="color: #8B5CF6; font-size: 24px; font-weight: 600; margin: 0;">${formatCurrency(analysis.savings)}</p>
              <p style="font-weight: 500; color: #403E43; margin: 8px 0;">Projected Profit Increase:</p>
              <p style="color: #8B5CF6; font-size: 24px; font-weight: 600; margin: 0;">${formatPercentage(analysis.profit_increase)}</p>
            </div>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Implementation Strategy:</p>
            <p style="color: #6E59A5; margin: 0; white-space: pre-wrap;">${formatText(analysis.explanation)}</p>
          </div>
          <div>
            <p style="font-weight: 500; color: #403E43; margin-bottom: 8px;">Marketing Strategy:</p>
            <p style="color: #6E59A5; margin: 0; white-space: pre-wrap;">${formatText(analysis.marketing_strategy)}</p>
          </div>
        </div>

        <div style="background: #F1F0FB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #1A1F2C;">Implementation Details</h2>
          <div style="display: grid; gap: 16px;">
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Timeline:</p>
              <p style="color: #6E59A5; margin: 0;">${formatText(formData.timeline)}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Budget Range:</p>
              <p style="color: #6E59A5; margin: 0;">${formatText(formData.budget)}</p>
            </div>
            <div>
              <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Objectives:</p>
              <p style="color: #6E59A5; margin: 0; white-space: pre-wrap;">${formatText(formData.objectives)}</p>
            </div>
            ${formData.additionalInfo ? `
              <div>
                <p style="font-weight: 500; color: #403E43; margin-bottom: 4px;">Additional Information:</p>
                <p style="color: #6E59A5; margin: 0; white-space: pre-wrap;">${formatText(formData.additionalInfo)}</p>
              </div>
            ` : ''}
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px;">
          <p style="color: #6E59A5; font-size: 14px; margin: 0 0 4px 0;">Generated by ChatSites AI Analysis Tool</p>
          <p style="color: #6E59A5; font-size: 14px; margin: 0;">www.chatsites.ai</p>
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