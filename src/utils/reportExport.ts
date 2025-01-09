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

    const canvas = await html2canvas(reportElement, {
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
    
    // Calculate the number of pages needed
    const ratio = imgHeight / imgWidth;
    const pageHeight = (pdfWidth * ratio);
    const pages = Math.ceil(pageHeight / pdfHeight);
    
    // Add pages and split content
    for (let i = 0; i < pages; i++) {
      if (i > 0) pdf.addPage();
      
      const position = -i * pdfHeight;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pageHeight);

      // Add significant padding between pages to prevent content from being cut off
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