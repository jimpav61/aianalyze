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
    
    // Replace purple backgrounds with white
    const purpleElements = clonedReport.querySelectorAll('[class*="bg-"]');
    purpleElements.forEach(element => {
      const classes = element.className.split(' ');
      const newClasses = classes
        .filter(cls => !cls.startsWith('bg-'))
        .concat(['bg-white'])
        .join(' ');
      element.className = newClasses;
    });

    // Update text colors
    const textElements = clonedReport.querySelectorAll('*');
    textElements.forEach(element => {
      if (element instanceof HTMLElement) {
        const classes = element.className.split(' ');
        const newClasses = classes
          .filter(cls => !cls.startsWith('text-'))
          .join(' ');
        element.className = `${newClasses} text-[#f65228]`;
        
        // Ensure text is visible
        element.style.color = '#f65228';
      }
    });

    // Create temporary container with proper styling
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      width: 800px;
      background-color: white;
      padding: 40px;
      font-family: Arial, sans-serif;
    `;
    tempContainer.appendChild(clonedReport);
    document.body.appendChild(tempContainer);

    // Style all elements for PDF
    const allElements = tempContainer.getElementsByTagName('*');
    Array.from(allElements).forEach((el) => {
      if (el instanceof HTMLElement) {
        // Base styles for all elements
        el.style.margin = '0';
        el.style.padding = '8px';
        el.style.whiteSpace = 'pre-wrap';
        el.style.wordBreak = 'break-word';
        el.style.pageBreakInside = 'avoid';
        
        // Specific styles for headings
        if (/^h[1-6]$/i.test(el.tagName)) {
          el.style.fontSize = '20px';
          el.style.fontWeight = '600';
          el.style.marginBottom = '16px';
          el.style.color = '#f65228';
        }
        
        // Specific styles for cards
        if (el.classList.contains('card')) {
          el.style.border = '1px solid #e2e8f0';
          el.style.borderRadius = '8px';
          el.style.marginBottom = '16px';
          el.style.backgroundColor = 'white';
        }
        
        // Ensure all text is properly sized
        if (el.tagName === 'P') {
          el.style.fontSize = '14px';
          el.style.lineHeight = '1.5';
          el.style.marginBottom = '8px';
        }
      }
    });

    // Generate canvas with proper scaling
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      width: 800,
      height: tempContainer.scrollHeight,
      windowWidth: 800,
      onclone: (document, element) => {
        element.style.transform = 'none';
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

    // Add additional pages if content exceeds page height
    while (heightLeft >= pageHeight) {
      position = position - pageHeight;
      heightLeft = heightLeft - pageHeight;
      
      pdf.addPage();
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
    }

    return pdf;
  } catch (error) {
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};