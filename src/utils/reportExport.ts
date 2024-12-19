import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportReportAsPDF = async (reportElement: HTMLElement, fileName: string = 'analysis-report.pdf') => {
  try {
    console.log('Starting PDF export process');
    
    // Improved canvas settings for better quality
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight,
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // Calculate dimensions
    const aspectRatio = canvas.height / canvas.width;
    const imgWidth = pdfWidth;
    const imgHeight = pdfWidth * aspectRatio;
    
    // Initialize PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
    });
    
    // Calculate number of pages needed
    const pagesNeeded = Math.ceil(imgHeight / pdfHeight);
    
    // Add pages and split content
    for (let page = 0; page < pagesNeeded; page++) {
      if (page > 0) {
        pdf.addPage();
      }
      
      // Calculate the slice of the image to use for this page
      const sourceY = page * pdfHeight * (canvas.height / imgHeight);
      const sliceHeight = Math.min(
        canvas.height - sourceY,
        (pdfHeight * canvas.height) / imgHeight
      );
      
      // Create a temporary canvas for this slice
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = sliceHeight;
      
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) continue;
      
      // Draw the slice
      ctx.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        sliceHeight,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      
      // Add to PDF
      const imgData = tempCanvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, (sliceHeight * pdfWidth) / canvas.width);
    }
    
    pdf.save(fileName);
    console.log('PDF export completed successfully');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};