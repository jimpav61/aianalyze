import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportReportAsPDF = async (reportElement: HTMLElement, fileName: string = 'analysis-report.pdf') => {
  try {
    console.log('Starting PDF export process');
    
    // Wait for any images to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    const pdf = new jsPDF('p', 'mm');
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(fileName);
    console.log('PDF export completed successfully');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};