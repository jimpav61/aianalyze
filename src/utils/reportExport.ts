import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportReportAsPDF = async (reportElement: HTMLElement, fileName: string = 'analysis-report.pdf') => {
  try {
    console.log('Starting PDF export process');
    
    const canvas = await html2canvas(reportElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(fileName);
    
    console.log('PDF export completed successfully');
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};