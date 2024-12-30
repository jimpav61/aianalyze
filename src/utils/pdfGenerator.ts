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
  reportElement?: HTMLElement;
}

export const generateAnalysisReport = async ({ formData, analysis, reportElement }: GenerateReportParams): Promise<jsPDF> => {
  console.log('PDF Generation - Starting with data:', { formData, analysis });
  
  try {
    const element = reportElement || document.getElementById('detailed-report');
    if (!element) {
      console.error("PDF Generation - Report element not found in DOM");
      throw new Error("Report element not found");
    }

    console.log('PDF Generation - Report element found with dimensions:', {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight
    });

    // Store original styles
    const originalStyles = {
      display: element.style.display,
      visibility: element.style.visibility,
      opacity: element.style.opacity,
      position: element.style.position,
      transform: element.style.transform,
      margin: element.style.margin,
      padding: element.style.padding,
      whiteSpace: element.style.whiteSpace
    };

    // Prepare the element for capture
    element.style.width = '900px';
    element.style.padding = '40px';
    element.style.backgroundColor = 'white';
    element.style.position = 'relative';
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.display = 'block';
    element.style.transform = 'none';
    element.style.margin = '0';
    element.style.whiteSpace = 'pre-line';
    
    // Process all child elements
    const allElements = element.getElementsByTagName('*');
    Array.from(allElements).forEach((el) => {
      const elem = el as HTMLElement;
      elem.style.display = 'block';
      elem.style.visibility = 'visible';
      elem.style.opacity = '1';
      elem.style.position = 'relative';
      elem.style.transform = 'none';
      
      // Preserve text formatting and line breaks
      if (elem.classList.contains('whitespace-pre-line')) {
        elem.style.whiteSpace = 'pre-line';
      }
      
      // Convert <br> tags to newlines in text content
      if (elem.innerHTML.includes('<br>')) {
        elem.innerHTML = elem.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      }
    });

    // Wait for rendering
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.log('PDF Generation - Creating canvas');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 900,
      height: element.scrollHeight,
      onclone: (_, clonedElement) => {
        // Additional line break handling during canvas creation
        const textElements = clonedElement.getElementsByTagName('*');
        Array.from(textElements).forEach((el) => {
          if (el.innerHTML.includes('<br>')) {
            el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');
          }
        });
      }
    });

    // Only restore styles if it's not a temporary element
    if (!reportElement) {
      // Restore original styles
      Object.entries(originalStyles).forEach(([property, value]) => {
        (element.style as any)[property] = value;
      });
    }

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