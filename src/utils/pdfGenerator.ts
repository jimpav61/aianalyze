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

    // Force all content to be visible
    const originalStyles = {
      overflow: reportElement.style.overflow,
      height: reportElement.style.height,
      position: reportElement.style.position,
      visibility: reportElement.style.visibility
    };

    // Make sure all content is visible for capture
    reportElement.style.overflow = 'visible';
    reportElement.style.height = 'auto';
    reportElement.style.position = 'relative';
    reportElement.style.visibility = 'visible';

    // Log dimensions before capture
    console.log('PDF Generation - Element dimensions:', {
      width: reportElement.offsetWidth,
      height: reportElement.scrollHeight,
      clientHeight: reportElement.clientHeight
    });

    // Ensure all cards are visible
    const cards = reportElement.getElementsByClassName('card');
    console.log('PDF Generation - Number of cards:', cards.length);
    Array.from(cards).forEach((card, index) => {
      (card as HTMLElement).style.display = 'block';
      (card as HTMLElement).style.visibility = 'visible';
      console.log(`PDF Generation - Card ${index + 1} dimensions:`, {
        width: (card as HTMLElement).offsetWidth,
        height: (card as HTMLElement).offsetHeight
      });
    });

    // Create canvas with proper scaling
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight,
      onclone: (document, element) => {
        console.log('PDF Generation - Cloning element');
        element.style.overflow = 'visible';
        element.style.height = 'auto';
        element.style.position = 'relative';
        element.style.visibility = 'visible';
        
        // Ensure all cards are visible in clone
        const clonedCards = element.getElementsByClassName('card');
        Array.from(clonedCards).forEach((card) => {
          (card as HTMLElement).style.display = 'block';
          (card as HTMLElement).style.visibility = 'visible';
        });
      }
    });

    // Restore original styles
    Object.assign(reportElement.style, originalStyles);

    console.log('PDF Generation - Canvas created with dimensions:', {
      width: canvas.width,
      height: canvas.height
    });

    // Calculate PDF dimensions (A4)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    const pageCount = Math.ceil(imgHeight / pageHeight);
    console.log('PDF Generation - Pages needed:', pageCount);
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add content page by page
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
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
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};