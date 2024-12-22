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
    // Get the actual report element from the DOM
    const reportElement = document.getElementById('detailed-report');
    if (!reportElement) {
      throw new Error('Report element not found');
    }

    // Create a clone of the report element to modify for PDF
    const clonedReport = reportElement.cloneNode(true) as HTMLElement;
    
    // Replace purple backgrounds with white and adjust text colors
    const purpleElements = clonedReport.querySelectorAll('[class*="bg-[#E5DEFF]"], [class*="bg-[#F1F0FB]"]');
    purpleElements.forEach(element => {
      element.classList.remove('bg-[#E5DEFF]', 'bg-[#F1F0FB]');
      element.classList.add('bg-white');
    });

    // Process all text colors to #f65228
    const textElements = clonedReport.querySelectorAll('[class*="text-"]');
    textElements.forEach(element => {
      const classes = element.className.split(' ');
      const newClasses = classes.filter(cls => !cls.startsWith('text-')).join(' ');
      element.className = `${newClasses} text-[#f65228]`;
    });

    // Create temporary container with proper styling
    const tempContainer = document.createElement('div');
    tempContainer.id = 'temp-report-container';
    tempContainer.style.cssText = `
      position: absolute;
      left: -9999px;
      width: 800px;
      background-color: #ffffff;
      padding: 40px;
      font-family: Arial, sans-serif;
    `;
    tempContainer.appendChild(clonedReport);
    document.body.appendChild(tempContainer);

    // Ensure all content is properly styled
    const allElements = tempContainer.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i] as HTMLElement;
      if (el.style) {
        el.style.whiteSpace = 'pre-wrap';
        el.style.wordBreak = 'break-word';
        
        // Ensure proper spacing
        if (el.tagName === 'DIV') {
          el.style.marginBottom = '16px';
        }
        
        // Ensure proper text sizing
        if (el.tagName === 'H2' || el.tagName === 'H3') {
          el.style.fontSize = '20px';
          el.style.fontWeight = '600';
          el.style.marginBottom = '16px';
        }
      }
    }

    // Generate PDF with proper scaling
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
        // Additional styling for cloned element
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }
    });

    // Clean up temporary container
    document.body.removeChild(tempContainer);

    // Create PDF with proper dimensions
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