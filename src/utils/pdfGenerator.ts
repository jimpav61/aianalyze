import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';
import { processAllImages } from "./pdf/imageProcessing";
import { pdfStyles } from "./pdf/styles";
import { formatCurrency, formatPercentage, formatText } from "./pdf/formatters";

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
  console.log('PDF Generation - Starting with data:', { 
    formData, 
    analysis,
    timestamp: new Date().toISOString()
  });
  
  try {
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-report-container';
    tempContainer.style.cssText = 'position: absolute; left: -9999px; width: 800px; background-color: #ffffff;';
    document.body.appendChild(tempContainer);

    tempContainer.innerHTML = `
      <div style="${pdfStyles.container}">
        <div style="${pdfStyles.header}">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img 
              src="/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png" 
              alt="ChatSites Logo" 
              style="height: 40px; width: auto;"
            />
            <span style="font-size: 24px; font-weight: bold; color: #9b87f5;">ChatSites Analysis Report</span>
          </div>
        </div>

        <div style="${pdfStyles.section}">
          <h2 style="${pdfStyles.sectionTitle}">Company Information</h2>
          <div style="${pdfStyles.grid}">
            <div>
              <p style="${pdfStyles.label}">Company Name:</p>
              <p style="${pdfStyles.value}">${formData.companyName}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Industry:</p>
              <p style="${pdfStyles.value}">${analysis.industry}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Contact Email:</p>
              <p style="${pdfStyles.value}">${formData.email}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Contact Phone:</p>
              <p style="${pdfStyles.value}">${formData.phoneNumber}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Number of Employees:</p>
              <p style="${pdfStyles.value}">${formData.employees}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Annual Revenue:</p>
              <p style="${pdfStyles.value}">${formData.revenue}</p>
            </div>
          </div>
        </div>

        <div style="${pdfStyles.section}">
          <h2 style="${pdfStyles.sectionTitle}">Current Operations</h2>
          <div style="display: grid; gap: 16px;">
            <div>
              <p style="${pdfStyles.label}">Service Channels:</p>
              <p style="${pdfStyles.value}">${formatText(formData.serviceChannels)}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Monthly Interactions:</p>
              <p style="${pdfStyles.value}">${formatText(formData.monthlyInteractions)}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Current Tools:</p>
              <p style="${pdfStyles.value}">${formatText(formData.currentTools)}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Pain Points:</p>
              <p style="${pdfStyles.value}">${formatText(formData.painPoints)}</p>
            </div>
          </div>
        </div>

        <div style="${pdfStyles.section}">
          <h2 style="${pdfStyles.sectionTitle}">Analysis Results</h2>
          <div style="${pdfStyles.grid}">
            <div style="background: #E5DEFF; border-radius: 8px; padding: 16px;">
              <p style="${pdfStyles.label}">Primary Department:</p>
              <p style="${pdfStyles.value}">${analysis.department}</p>
              <p style="${pdfStyles.label}">Primary Function:</p>
              <p style="${pdfStyles.value}">${analysis.bot_function}</p>
            </div>
            <div style="background: #E5DEFF; border-radius: 8px; padding: 16px;">
              <p style="${pdfStyles.label}">Projected Annual Savings:</p>
              <p style="${pdfStyles.highlight}">${formatCurrency(analysis.savings)}</p>
              <p style="${pdfStyles.label}">Projected Profit Increase:</p>
              <p style="${pdfStyles.highlight}">${formatPercentage(analysis.profit_increase)}</p>
            </div>
          </div>
          <div style="margin-top: 16px;">
            <p style="${pdfStyles.label}">Implementation Strategy:</p>
            <p style="${pdfStyles.value}">${formatText(analysis.explanation)}</p>
          </div>
          <div style="margin-top: 16px;">
            <p style="${pdfStyles.label}">Marketing Strategy:</p>
            <p style="${pdfStyles.value}">${formatText(analysis.marketing_strategy)}</p>
          </div>
        </div>

        <div style="${pdfStyles.section}">
          <h2 style="${pdfStyles.sectionTitle}">Implementation Details</h2>
          <div style="display: grid; gap: 16px;">
            <div>
              <p style="${pdfStyles.label}">Timeline:</p>
              <p style="${pdfStyles.value}">${formatText(formData.timeline)}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Budget Range:</p>
              <p style="${pdfStyles.value}">${formatText(formData.budget)}</p>
            </div>
            <div>
              <p style="${pdfStyles.label}">Objectives:</p>
              <p style="${pdfStyles.value}">${formatText(formData.objectives)}</p>
            </div>
            ${formData.additionalInfo ? `
              <div>
                <p style="${pdfStyles.label}">Additional Information:</p>
                <p style="${pdfStyles.value}">${formatText(formData.additionalInfo)}</p>
              </div>
            ` : ''}
          </div>
        </div>

        <div style="${pdfStyles.footer}">
          <p style="${pdfStyles.footerText}">Generated by ChatSites AI Analysis Tool</p>
          <p style="${pdfStyles.footerText}">www.chatsites.ai</p>
        </div>
      </div>
    `;

    await processAllImages(tempContainer);

    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    document.body.removeChild(tempContainer);

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;
    
    for (let page = 1; page <= Math.ceil(imgHeight / pageHeight); page++) {
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
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};