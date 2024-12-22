import { jsPDF } from "jspdf";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';

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

    // Process images before capturing
    const images = Array.from(reportContainer.getElementsByTagName('img'));
    console.log("Processing images for PDF:", images.length);
    
    await Promise.all(
      images.map(img => 
        new Promise((resolve) => {
          const originalSrc = img.src;
          // Ensure absolute URLs
          if (img.src.startsWith('/')) {
            img.src = window.location.origin + img.src;
          }
          // Remove port number
          img.src = img.src.replace(/:\d+\//, '/');
          
          console.log(`Processing PDF image: ${originalSrc} -> ${img.src}`);
          
          if (img.complete) {
            console.log("PDF image already loaded:", img.src);
            resolve(null);
          } else {
            img.onload = () => {
              console.log("PDF image loaded successfully:", img.src);
              resolve(null);
            };
            img.onerror = () => {
              console.warn(`Failed to load PDF image: ${img.src}`);
              img.src = '/placeholder.svg';
              resolve(null);
            };
          }
        })
      )
    );

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