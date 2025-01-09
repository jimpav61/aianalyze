import { DetailedFormData } from "@/types/analysis";
import { applyPdfStyles, hideScreenOnlyElements } from "./handlers/pdfStyling";
import { preloadImages } from "./handlers/imageLoader";
import { createCanvas } from "./handlers/canvasConfig";
import { createPdf } from "./handlers/pdfConfig";
import { jsPDF } from "jspdf";

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

  const clonedReport = reportElement.cloneNode(true) as HTMLElement;
  
  hideScreenOnlyElements(clonedReport);
  applyPdfStyles(clonedReport);
  
  document.body.appendChild(clonedReport);

  try {
    await preloadImages(clonedReport);
    const canvas = await createCanvas(clonedReport);
    const pdf = createPdf(canvas);

    console.log('[ReportHandler] PDF generation completed successfully');
    return pdf;
  } catch (error) {
    console.error('[ReportHandler] Error generating PDF:', error);
    throw error;
  } finally {
    if (clonedReport.parentNode) {
      clonedReport.parentNode.removeChild(clonedReport);
    }
  }
};

export const getReportFileName = (companyName: string): string => {
  const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, '_');
  return `AI_Analysis_Report_${sanitizedName}_${new Date().toISOString().split('T')[0]}.pdf`;
};