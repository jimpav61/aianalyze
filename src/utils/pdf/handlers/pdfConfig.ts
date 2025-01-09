import { jsPDF } from "jspdf";

export const createPdf = (canvas: HTMLCanvasElement): jsPDF => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
    hotfixes: ['px_scaling']
  });

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pageCount = Math.ceil(imgHeight / pageHeight);

  console.log('[PdfConfig] Generating PDF with dimensions:', {
    imgWidth,
    imgHeight,
    pageCount,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height
  });

  for (let i = 0; i < pageCount; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const position = -(i * pageHeight);
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight,
      '',
      'FAST'
    );

    if (i < pageCount - 1) {
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, pageHeight - 10, imgWidth, 20, 'F');
    }
  }

  return pdf;
};