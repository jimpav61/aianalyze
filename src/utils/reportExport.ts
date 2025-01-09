import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportReportAsPDF = async (reportElement: HTMLElement, fileName: string = 'analysis-report.pdf') => {
  try {
    console.log('Starting PDF export process');
    
    // Wait for any images to load
    await Promise.all(
      Array.from(reportElement.getElementsByTagName('img'))
        .map(img => img.complete ? Promise.resolve() : new Promise(resolve => img.onload = resolve))
    );

    // Clone the element to modify it for PDF generation
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Ensure all text content is properly formatted
    const textElements = clonedElement.querySelectorAll('p, div, span');
    textElements.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.whiteSpace = 'normal';
        element.style.lineHeight = '1.5';
      }
    });

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight,
      onclone: (document, element) => {
        // Ensure all elements are visible for capture
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        
        // Force CTA button to be visible in PDF
        const ctaButton = element.querySelector('[data-pdf-cta]');
        if (ctaButton instanceof HTMLElement) {
          ctaButton.style.backgroundColor = '#f65228';
          ctaButton.style.color = '#ffffff';
          ctaButton.style.display = 'flex';
          ctaButton.style.alignItems = 'center';
          ctaButton.style.justifyContent = 'center';
          ctaButton.style.padding = '12px 24px';
          ctaButton.style.borderRadius = '4px';
        }
      }
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    const ratio = imgHeight / imgWidth;
    const pageHeight = (pdfWidth * ratio);
    const pages = Math.ceil(pageHeight / pdfHeight);
    
    for (let i = 0; i < pages; i++) {
      if (i > 0) pdf.addPage();
      
      const position = -i * pdfHeight;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pageHeight);

      if (i < pages - 1) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, pdfHeight - 30, pdfWidth, 60, 'F');
      }
    }

    pdf.save(fileName);
    console.log('PDF export completed successfully');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};