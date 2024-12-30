import { jsPDF } from "jspdf";
import { calculatePdfDimensions } from "../config/pdfConfig";

export const addPagesToDocument = (
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
): void => {
  const { imgWidth, imgHeight, pageCount } = calculatePdfDimensions(canvas);

  for (let i = 0; i < pageCount; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const position = -i * 297; // A4 height
    console.log(`[PdfPageHandler] Adding page ${i + 1} at position:`, position);

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
};