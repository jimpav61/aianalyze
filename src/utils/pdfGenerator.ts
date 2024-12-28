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
      console.error('PDF Generation - Report element not found');
      throw new Error('Report element not found');
    }

    console.log('PDF Generation - Found report element, preparing for capture');

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      onclone: (document, element) => {
        // Preserve all styles and spacing
        element.style.padding = '40px';
        element.style.width = '800px';
        element.style.margin = '0 auto';
        
        // Ensure all elements maintain their styles
        const allElements = element.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i] as HTMLElement;
          const computedStyle = window.getComputedStyle(el);
          el.style.color = computedStyle.color;
          el.style.backgroundColor = computedStyle.backgroundColor;
          el.style.padding = computedStyle.padding;
          el.style.margin = computedStyle.margin;
          el.style.fontSize = computedStyle.fontSize;
          el.style.fontWeight = computedStyle.fontWeight;
          el.style.lineHeight = computedStyle.lineHeight;
          el.style.borderRadius = computedStyle.borderRadius;
          el.style.border = computedStyle.border;
        }
      }
    });

    console.log('PDF Generation - Content captured successfully');

    // Create PDF with proper dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;
    
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