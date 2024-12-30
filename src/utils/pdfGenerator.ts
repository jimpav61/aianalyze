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
      console.error("PDF Generation - Report element not found in DOM");
      throw new Error("Report element not found");
    }

    console.log('PDF Generation - Report element found with dimensions:', {
      offsetWidth: reportElement.offsetWidth,
      offsetHeight: reportElement.offsetHeight,
      scrollWidth: reportElement.scrollWidth,
      scrollHeight: reportElement.scrollHeight
    });

    // Store original styles
    const originalStyles = {
      display: reportElement.style.display,
      visibility: reportElement.style.visibility,
      opacity: reportElement.style.opacity,
      position: reportElement.style.position,
      transform: reportElement.style.transform,
      margin: reportElement.style.margin,
      padding: reportElement.style.padding,
      whiteSpace: reportElement.style.whiteSpace
    };

    // Create temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '900px';
    tempContainer.style.backgroundColor = 'white';
    
    // Clone and prepare the report
    const clonedReport = reportElement.cloneNode(true) as HTMLElement;
    clonedReport.style.width = '100%';
    clonedReport.style.padding = '40px';
    clonedReport.style.backgroundColor = 'white';
    clonedReport.style.position = 'relative';
    clonedReport.style.opacity = '1';
    clonedReport.style.visibility = 'visible';
    clonedReport.style.display = 'block';
    clonedReport.style.transform = 'none';
    clonedReport.style.margin = '0';
    clonedReport.style.whiteSpace = 'pre-line';
    
    // Process all child elements
    const allElements = clonedReport.getElementsByTagName('*');
    Array.from(allElements).forEach((el) => {
      const element = el as HTMLElement;
      element.style.display = 'block';
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      element.style.position = 'relative';
      element.style.transform = 'none';
      
      // Preserve text formatting and line breaks
      if (element.classList.contains('whitespace-pre-line')) {
        element.style.whiteSpace = 'pre-line';
      }
      
      // Convert <br> tags to newlines in text content
      if (element.innerHTML.includes('<br>')) {
        element.innerHTML = element.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      }
    });

    tempContainer.appendChild(clonedReport);
    document.body.appendChild(tempContainer);

    // Wait for rendering and log dimensions
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('PDF Generation - Cloned report dimensions:', {
      offsetWidth: clonedReport.offsetWidth,
      offsetHeight: clonedReport.offsetHeight,
      scrollWidth: clonedReport.scrollWidth,
      scrollHeight: clonedReport.scrollHeight
    });

    console.log('PDF Generation - Creating canvas');
    const canvas = await html2canvas(clonedReport, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 900,
      height: clonedReport.scrollHeight,
      onclone: (_, element) => {
        // Additional line break handling during canvas creation
        const textElements = element.getElementsByTagName('*');
        Array.from(textElements).forEach((el) => {
          if (el.innerHTML.includes('<br>')) {
            el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');
          }
        });
      }
    });

    // Cleanup
    document.body.removeChild(tempContainer);
    
    // Restore original styles
    Object.entries(originalStyles).forEach(([property, value]) => {
      (reportElement.style as any)[property] = value;
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