import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';
import { processAllImages } from "./pdf/imageProcessing";
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
  console.log('PDF Generation - Starting with data:', { formData, analysis });
  
  try {
    // Get the actual report element from the DOM
    const reportElement = document.getElementById('detailed-report');
    if (!reportElement) {
      throw new Error('Report element not found');
    }

    // Create a clone of the report element to modify for PDF
    const clonedReport = reportElement.cloneNode(true) as HTMLElement;
    
    // Replace purple backgrounds with white and adjust text colors
    const elements = clonedReport.getElementsByClassName('bg-[#E5DEFF]');
    while (elements.length > 0) {
      const element = elements[0];
      element.classList.remove('bg-[#E5DEFF]');
      element.classList.add('bg-white');
    }

    // Process all text colors to #f65228
    const textElements = clonedReport.querySelectorAll('[class*="text-"]');
    textElements.forEach(element => {
      const classes = element.className.split(' ');
      const newClasses = classes.filter(cls => !cls.startsWith('text-')).join(' ');
      element.className = `${newClasses} text-[#f65228]`;
    });

    // Create temporary container
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-report-container';
    tempContainer.style.cssText = 'position: absolute; left: -9999px; width: 800px; background-color: #ffffff;';
    tempContainer.appendChild(clonedReport);
    document.body.appendChild(tempContainer);

    // Process images
    await processAllImages(tempContainer);

    // Generate PDF from the actual content
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 800,
      height: tempContainer.scrollHeight,
      windowWidth: 800,
      onclone: (document, element) => {
        // Ensure proper text wrapping
        const allTextElements = element.getElementsByTagName('*');
        for (let i = 0; i < allTextElements.length; i++) {
          const el = allTextElements[i] as HTMLElement;
          if (el.style) {
            el.style.whiteSpace = 'pre-wrap';
            el.style.wordBreak = 'break-word';
          }
        }
      }
    });

    document.body.removeChild(tempContainer);

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add pages as needed
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