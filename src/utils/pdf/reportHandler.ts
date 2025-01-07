import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import { createReportCanvas } from "./handlers/canvasHandler";
import { hideActionButtons, restoreActionButtons } from './handlers/actionButtonsHandler';
import { generateHeaderSection } from "./sections/HeaderSection";

interface GenerateReportParams {
  formData: DetailedFormData;
  analysis: any;
}

export const generateFullReport = async ({ formData, analysis }: GenerateReportParams): Promise<jsPDF> => {
  console.log('[ReportHandler] Starting PDF generation with data:', { formData, analysis });
  
  const reportElement = document.querySelector('[data-report-content="true"]');
  if (!reportElement || !(reportElement instanceof HTMLElement)) {
    console.error("[ReportHandler] Report element not found");
    throw new Error("Report element not found");
  }

  // Create a clone for PDF generation to prevent UI shifts
  const clonedReport = reportElement.cloneNode(true) as HTMLElement;
  clonedReport.style.position = 'absolute';
  clonedReport.style.left = '-9999px';
  clonedReport.style.top = '-9999px';
  document.body.appendChild(clonedReport);

  try {
    // Create canvas with proper formatting
    const canvas = await createReportCanvas(clonedReport);
    
    // Create PDF document with A4 format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Get dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageCount = Math.ceil(imgHeight / pageHeight);

    // Add pages to document
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      // Calculate position for current page
      const position = -(i * pageHeight);
      
      console.log(`[PdfPageHandler] Adding page ${i + 1} at position:`, position);

      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );
    }

    console.log('[ReportHandler] PDF created successfully with', pageCount, 'pages');
    return pdf;
  } finally {
    // Clean up the cloned element
    if (clonedReport && clonedReport.parentNode) {
      clonedReport.parentNode.removeChild(clonedReport);
    }
  }
};

export const getReportFileName = (companyName: string): string => {
  return `AI_Analysis_Report_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
};