import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import { createReportCanvas } from "./handlers/canvasHandler";
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

  // Create a clone for PDF generation
  const clonedReport = reportElement.cloneNode(true) as HTMLElement;
  
  // Ensure proper styling for PDF generation
  clonedReport.style.position = 'absolute';
  clonedReport.style.left = '-9999px';
  clonedReport.style.width = '900px';
  clonedReport.style.backgroundColor = '#ffffff';
  clonedReport.style.padding = '40px';
  clonedReport.style.margin = '0';

  // Fix line breaks and ensure CTA button visibility
  const textElements = clonedReport.querySelectorAll('p, div, span');
  textElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.whiteSpace = 'normal';
      element.style.lineHeight = '1.5';
    }
  });

  // Ensure CTA button is visible and styled correctly
  const ctaButton = clonedReport.querySelector('[data-pdf-cta="true"]');
  if (ctaButton instanceof HTMLElement) {
    ctaButton.style.display = 'flex';
    ctaButton.style.alignItems = 'center';
    ctaButton.style.justifyContent = 'center';
    ctaButton.style.backgroundColor = '#f65228';
    ctaButton.style.color = '#ffffff';
    ctaButton.style.padding = '12px 24px';
    ctaButton.style.borderRadius = '4px';
    ctaButton.style.margin = '20px auto';
    ctaButton.style.width = 'fit-content';
  }
  
  // Add the cloned element to the document
  document.body.appendChild(clonedReport);

  try {
    console.log('[ReportHandler] Adding header section');
    generateHeaderSection(clonedReport);

    // Pre-load all images
    const images = clonedReport.getElementsByTagName('img');
    console.log('[ReportHandler] Loading images:', images.length);
    
    await Promise.all(
      Array.from(images).map(img => 
        new Promise((resolve) => {
          if (img.complete) {
            console.log('[ReportHandler] Image already loaded:', img.src);
            resolve(null);
            return;
          }

          img.onload = () => {
            console.log('[ReportHandler] Image loaded successfully:', img.src);
            resolve(null);
          };
          
          img.onerror = (error) => {
            console.error('[ReportHandler] Image failed to load:', img.src, error);
            resolve(null);
          };
        })
      )
    );

    // Create canvas with proper settings for PDF
    const canvas = await html2canvas(clonedReport, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 900,
      height: clonedReport.scrollHeight,
      windowWidth: 900,
      onclone: (_, element) => {
        // Ensure all elements are visible
        element.style.height = 'auto';
        element.style.overflow = 'visible';
        
        // Force CTA button visibility
        const pdfCta = element.querySelector('[data-pdf-cta="true"]');
        if (pdfCta instanceof HTMLElement) {
          pdfCta.style.display = 'flex';
          pdfCta.style.alignItems = 'center';
          pdfCta.style.justifyContent = 'center';
          pdfCta.style.backgroundColor = '#f65228';
          pdfCta.style.color = '#ffffff';
          pdfCta.style.padding = '12px 24px';
          pdfCta.style.borderRadius = '4px';
          pdfCta.style.margin = '20px auto';
          pdfCta.style.width = 'fit-content';
        }
      }
    });
    
    console.log('[ReportHandler] Canvas created, dimensions:', {
      width: canvas.width,
      height: canvas.height
    });

    // Create PDF with better quality settings
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageCount = Math.ceil(imgHeight / pageHeight);

    console.log('[ReportHandler] Generating PDF with dimensions:', {
      imgWidth,
      imgHeight,
      pageCount,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });

    // Add pages with improved quality
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

      // Add padding between pages
      if (i < pageCount - 1) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, pageHeight - 10, imgWidth, 20, 'F');
      }
    }

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