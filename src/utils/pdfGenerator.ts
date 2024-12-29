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
    const reportElement = document.getElementById('detailed-report');
    if (!reportElement) {
      console.error("PDF Generation - Report element not found");
      throw new Error("Report element not found");
    }

    // Temporarily make any hidden elements visible for capture
    const originalOverflow = reportElement.style.overflow;
    const originalHeight = reportElement.style.height;
    reportElement.style.overflow = 'visible';
    reportElement.style.height = 'auto';

    console.log('PDF Generation - Converting report to canvas');
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight,
      onclone: (document, element) => {
        // Ensure all content is visible in the cloned element
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        
        // Make sure all cards are visible
        const cards = element.getElementsByClassName('card');
        Array.from(cards).forEach(card => {
          (card as HTMLElement).style.display = 'block';
          (card as HTMLElement).style.visibility = 'visible';
        });
      }
    });
    
    // Restore original styles
    reportElement.style.overflow = originalOverflow;
    reportElement.style.height = originalHeight;
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate the number of pages needed
    const pageCount = Math.ceil(imgHeight / pageHeight);
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add each page
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      // Calculate the slice of the image to use for this page
      const position = -i * pageHeight;
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

    console.log('PDF Generation - PDF created successfully');
    return pdf;
  } catch (error) {
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};