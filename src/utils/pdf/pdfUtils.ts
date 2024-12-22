import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const createPDF = async (
  container: HTMLElement,
  fileName: string
): Promise<jsPDF> => {
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: container.scrollWidth,
    windowHeight: container.scrollHeight,
    onclone: (document, element) => {
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
  
  const ratio = imgHeight / imgWidth;
  const pageHeight = (pdfWidth * ratio);
  const pages = Math.ceil(pageHeight / pdfHeight);
  
  for (let i = 0; i < pages; i++) {
    if (i > 0) pdf.addPage();
    const position = -i * pdfHeight;
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pageHeight);
  }

  return pdf;
};