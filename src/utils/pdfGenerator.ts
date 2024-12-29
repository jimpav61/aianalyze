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

    // Create a temporary container and append it to the body
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.width = '100%';
    tempContainer.style.height = 'auto';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.zIndex = '-1000';
    
    // Clone the report for PDF generation
    const clonedReport = reportElement.cloneNode(true) as HTMLElement;
    clonedReport.style.width = '100%';
    clonedReport.style.padding = '40px';
    clonedReport.style.backgroundColor = 'white';
    
    // Ensure all elements are visible
    const allElements = clonedReport.getElementsByTagName('*');
    Array.from(allElements).forEach((el) => {
      const element = el as HTMLElement;
      element.style.display = 'block';
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      
      // Preserve text formatting
      if (element.classList.contains('whitespace-pre-line')) {
        element.style.whiteSpace = 'pre-line';
      }
    });

    tempContainer.appendChild(clonedReport);
    document.body.appendChild(tempContainer);

    // Wait for images and fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('PDF Generation - Creating canvas');
    const canvas = await html2canvas(clonedReport, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: clonedReport.offsetWidth,
      height: clonedReport.offsetHeight,
      windowWidth: clonedReport.offsetWidth,
      windowHeight: clonedReport.offsetHeight
    });

    // Clean up
    document.body.removeChild(tempContainer);

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