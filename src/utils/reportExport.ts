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
      scale: 2, // Higher scale for better quality
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
    const pageRatio = pdfHeight / pdfWidth;
    const imageRatio = imgHeight / imgWidth;
    const pages = Math.ceil(imageRatio / pageRatio);
    
    // Scale image to fit width
    const scaledWidth = pdfWidth;
    const scaledHeight = (imgHeight * pdfWidth) / imgWidth;
    
    // Add pages and split content
    for (let i = 0; i < pages; i++) {
      if (i > 0) pdf.addPage();
      
      const position = -i * pdfHeight;
      pdf.addImage(imgData, 'PNG', 0, position, scaledWidth, scaledHeight);
    }

    pdf.save(fileName);
    console.log('PDF export completed successfully');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};