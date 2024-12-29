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
  console.log('PDF Generation - Starting with data:', { 
    formData, 
    analysis,
    hasAllAnalyses: !!analysis.allAnalyses,
    analysesCount: analysis.allAnalyses?.length
  });
  
  try {
    const reportElement = document.getElementById('detailed-report');
    if (!reportElement) {
      console.error("PDF Generation - Report element not found");
      throw new Error("Report element not found");
    }

    console.log('PDF Generation - Found report element with dimensions:', {
      width: reportElement.offsetWidth,
      height: reportElement.offsetHeight,
      scrollWidth: reportElement.scrollWidth,
      scrollHeight: reportElement.scrollHeight
    });

    // Temporarily make any hidden elements visible for capture
    const originalOverflow = reportElement.style.overflow;
    const originalHeight = reportElement.style.height;
    reportElement.style.overflow = 'visible';
    reportElement.style.height = 'auto';

    // Log the number of cards before capture
    const cardsBeforeCapture = reportElement.getElementsByClassName('card');
    console.log('PDF Generation - Number of cards before capture:', cardsBeforeCapture.length);

    console.log('PDF Generation - Converting report to canvas');
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight,
      onclone: (document, element) => {
        console.log('PDF Generation - Cloning element for capture');
        // Ensure all content is visible in the cloned element
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        
        // Make sure all cards are visible
        const cards = element.getElementsByClassName('card');
        console.log('PDF Generation - Number of cards in cloned element:', cards.length);
        Array.from(cards).forEach((card, index) => {
          (card as HTMLElement).style.display = 'block';
          (card as HTMLElement).style.visibility = 'visible';
          console.log(`PDF Generation - Card ${index + 1} dimensions:`, {
            width: (card as HTMLElement).offsetWidth,
            height: (card as HTMLElement).offsetHeight
          });
        });
      }
    });
    
    // Restore original styles
    reportElement.style.overflow = originalOverflow;
    reportElement.style.height = originalHeight;
    
    console.log('PDF Generation - Canvas created with dimensions:', {
      width: canvas.width,
      height: canvas.height
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate the number of pages needed
    const pageCount = Math.ceil(imgHeight / pageHeight);
    console.log('PDF Generation - Calculated pages needed:', {
      pageCount,
      imgHeight,
      pageHeight
    });
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add each page
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      // Calculate the slice of the image to use for this page
      const position = -i * pageHeight;
      console.log(`PDF Generation - Adding page ${i + 1} at position:`, position);
      
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

    console.log('PDF Generation - PDF created successfully with', pageCount, 'pages');
    return pdf;
  } catch (error) {
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};