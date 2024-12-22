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
      console.error('PDF Generation - Report element not found');
      throw new Error('Report element not found');
    }

    console.log('PDF Generation - Found report element, preparing for capture');

    // Create a clone of the report element to modify for PDF
    const clonedReport = reportElement.cloneNode(true) as HTMLElement;
    
    // Replace backgrounds with white and update text colors
    const elements = clonedReport.querySelectorAll('*');
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        // Remove background colors and purple shading
        element.style.backgroundColor = 'white';
        
        // Update text colors to #f65228
        if (element.style.color?.includes('purple') || element.style.color?.includes('rgb(147, 51, 234)')) {
          element.style.color = '#f65228';
        }
        
        // Ensure proper margins and padding
        element.style.margin = '0';
        element.style.padding = '8px';
        
        // Ensure text is properly wrapped
        element.style.whiteSpace = 'pre-wrap';
        element.style.wordBreak = 'break-word';
      }
    });

    // Create temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '800px';  // Fixed width for consistent scaling
    tempContainer.appendChild(clonedReport);
    document.body.appendChild(tempContainer);

    console.log('PDF Generation - Preparing to capture content');

    // Generate canvas with proper scaling
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: tempContainer.scrollHeight,
      onclone: (document, element) => {
        console.log('PDF Generation - Cloning document for capture');
        element.style.transform = 'none';
        element.style.height = 'auto';
        element.style.overflow = 'visible';
      }
    });

    console.log('PDF Generation - Content captured successfully');

    // Clean up temporary container
    document.body.removeChild(tempContainer);

    // Create PDF with proper dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;
    
    console.log('PDF Generation - Creating PDF pages');

    // Add first page
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

    // Add additional pages if needed
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

    console.log('PDF Generation - PDF created successfully');
    return pdf;
  } catch (error) {
    console.error('PDF Generation - Critical error:', error);
    throw error;
  }
};