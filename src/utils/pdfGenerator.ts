import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';
import { prepareImagesForPDF } from "./pdf/imageProcessing";

interface GenerateReportParams {
  formData: DetailedFormData;
  analysis: {
    industry: string;
    department: string;
    bot_function: string;
    savings: number;
    profit_increase: number;
    explanation: string;
    marketing_strategy: string;
    allAnalyses?: any[];
  };
}

export const generateAnalysisReport = async ({ formData, analysis }: GenerateReportParams): Promise<jsPDF> => {
  console.log('PDF Generation - Starting with data:', { formData, analysis });
  
  try {
    const reportContainer = document.querySelector("#detailed-report");
    if (!reportContainer) {
      throw new Error("Report container not found");
    }

    await prepareImagesForPDF(reportContainer as HTMLElement);

    const canvas = await html2canvas(reportContainer as HTMLElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: true,
      onclone: (_, element) => {
        const clonedImages = element.getElementsByTagName('img');
        Array.from(clonedImages).forEach(img => {
          img.crossOrigin = 'anonymous';
          if (img.src.startsWith('/')) {
            img.src = window.location.origin + img.src;
          }
          img.src = img.src.replace(/:\d+\//, '/');
        });
      }
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    let heightLeft = imgHeight;
    let position = 0;
    const totalPages = Math.ceil(imgHeight / pageHeight);

    for (let page = 1; page <= totalPages; page++) {
      if (page > 1) {
        pdf.addPage();
      }

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

      heightLeft -= pageHeight;
      position -= pageHeight;
    }

    return pdf;
  } catch (error) {
    console.error('PDF Generation - Error:', error);
    throw error;
  }
};