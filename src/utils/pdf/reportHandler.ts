import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import { createPdfDocument } from "./config/pdfConfig";
import { createReportCanvas } from "./handlers/canvasHandler";
import { addPagesToDocument } from "./handlers/pdfPageHandler";
import { hideActionButtons, restoreActionButtons } from './handlers/actionButtonsHandler';

interface GenerateReportParams {
  formData: DetailedFormData;
  analysis: any;
}

export const generateFullReport = async ({ formData, analysis }: GenerateReportParams): Promise<jsPDF> => {
  console.log('[ReportHandler] Starting PDF generation with data:', { formData, analysis });
  
  const reportElement = document.getElementById('detailed-report');
  if (!reportElement) {
    console.error("[ReportHandler] Report element not found");
    throw new Error("Report element not found");
  }

  // Hide action buttons before capture
  hideActionButtons(document);

  try {
    // Create canvas with proper formatting
    const canvas = await createReportCanvas(reportElement);
    
    // Create PDF document
    const pdf = createPdfDocument();
    
    // Add pages to PDF
    addPagesToDocument(pdf, canvas);

    console.log('[ReportHandler] PDF created successfully');
    return pdf;
  } finally {
    // Always restore action buttons visibility
    restoreActionButtons(document);
  }
};

export const getReportFileName = (companyName: string): string => {
  return `AI_Analysis_Report_${companyName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
};