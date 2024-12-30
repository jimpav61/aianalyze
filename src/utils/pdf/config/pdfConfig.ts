import { jsPDF } from "jspdf";

export const PDF_CONFIG = {
  format: 'a4',
  width: 210, // A4 width in mm
  height: 297, // A4 height in mm
};

export const createPdfDocument = (): jsPDF => {
  return new jsPDF('p', 'mm', PDF_CONFIG.format);
};

export const calculatePdfDimensions = (canvas: HTMLCanvasElement) => {
  const imgWidth = PDF_CONFIG.width;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pageCount = Math.ceil(imgHeight / PDF_CONFIG.height);

  return {
    imgWidth,
    imgHeight,
    pageCount,
  };
};