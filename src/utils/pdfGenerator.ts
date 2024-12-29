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
    // First, ensure the report element exists and is visible
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

    // Force the element to be visible during capture
    const originalDisplay = reportElement.style.display;
    const originalVisibility = reportElement.style.visibility;
    const originalOpacity = reportElement.style.opacity;
    const originalPosition = reportElement.style.position;
    
    reportElement.style.display = 'block';
    reportElement.style.visibility = 'visible';
    reportElement.style.opacity = '1';
    reportElement.style.position = 'relative';

    // Create temporary container with fixed dimensions
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '900px';
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.margin = '0';
    tempContainer.style.padding = '0';
    
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
    
    // Process all child elements
    const allElements = clonedReport.getElementsByTagName('*');
    Array.from(allElements).forEach((el) => {
      const element = el as HTMLElement;
      element.style.display = 'block';
      element.style.visibility = 'visible';
      element.style.opacity = '1';
      element.style.position = 'relative';
      element.style.transform = 'none';
      
      // Preserve text formatting
      if (element.classList.contains('whitespace-pre-line')) {
        element.style.whiteSpace = 'pre-line';
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
      onclone: (doc) => {
        const clonedElement = doc.getElementById('detailed-report');
        if (clonedElement) {
          clonedElement.style.transform = 'none';
          clonedElement.style.opacity = '1';
          clonedElement.style.display = 'block';
        }
      }
    });

    // Cleanup
    document.body.removeChild(tempContainer);
    
    // Restore original element styles
    reportElement.style.display = originalDisplay;
    reportElement.style.visibility = originalVisibility;
    reportElement.style.opacity = originalOpacity;
    reportElement.style.position = originalPosition;

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