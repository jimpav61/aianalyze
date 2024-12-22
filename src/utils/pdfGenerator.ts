import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';
import { processAllImages } from "./pdf/imageProcessing";

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
    // Wait for any potential React updates to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    const reportContainer = document.querySelector("#detailed-report");
    if (!reportContainer) {
      throw new Error("Report container not found");
    }

    // Clone the container to avoid modifying the original DOM
    const clone = reportContainer.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.width = reportContainer.clientWidth + 'px';
    
    // Process all images in the clone
    await processAllImages(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: reportContainer.clientWidth,
      height: clone.scrollHeight,
      logging: true,
      onclone: (_, element) => {
        // Ensure all images are properly loaded
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

    document.body.removeChild(clone);

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