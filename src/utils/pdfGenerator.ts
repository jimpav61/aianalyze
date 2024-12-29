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

    // Store original styles
    const originalStyles = Array.from(reportElement.getElementsByTagName('*')).map(el => ({
      element: el,
      display: (el as HTMLElement).style.display,
      visibility: (el as HTMLElement).style.visibility,
      height: (el as HTMLElement).style.height,
      overflow: (el as HTMLElement).style.overflow
    }));

    // Make all elements visible for capture
    Array.from(reportElement.getElementsByTagName('*')).forEach((el) => {
      (el as HTMLElement).style.display = 'block';
      (el as HTMLElement).style.visibility = 'visible';
      (el as HTMLElement).style.height = 'auto';
      (el as HTMLElement).style.overflow = 'visible';
    });

    // Log dimensions before capture
    console.log('PDF Generation - Element dimensions:', {
      width: reportElement.offsetWidth,
      height: reportElement.scrollHeight,
      clientHeight: reportElement.clientHeight
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
        // Make all elements visible in clone
        Array.from(element.getElementsByTagName('*')).forEach((el) => {
          (el as HTMLElement).style.display = 'block';
          (el as HTMLElement).style.visibility = 'visible';
          (el as HTMLElement).style.height = 'auto';
          (el as HTMLElement).style.overflow = 'visible';
        });
      }
    });

    // Restore original styles
    originalStyles.forEach(({ element, display, visibility, height, overflow }) => {
      (element as HTMLElement).style.display = display;
      (element as HTMLElement).style.visibility = visibility;
      (element as HTMLElement).style.height = height;
      (element as HTMLElement).style.overflow = overflow;
    });

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