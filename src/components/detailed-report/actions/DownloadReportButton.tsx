import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
}

export const DownloadReportButton = ({ formData, analysis }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    console.log('Download Report - Starting download with:', { formData, analysis });
    
    if (!formData || !analysis) {
      console.error('Download Report - Missing required data');
      toast({
        title: "Error",
        description: "Report data not available. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the report container element
      const reportElement = document.querySelector('.space-y-6.bg-white') as HTMLElement;
      if (!reportElement) {
        throw new Error('Report element not found');
      }

      console.log('Download Report - Capturing report content');
      
      // Create a clone of the element to avoid modifying the displayed content
      const clone = reportElement.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);
      clone.style.width = '800px';
      clone.style.padding = '40px';
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      
      // Wait for all images (including logo) to load
      const images = clone.getElementsByTagName('img');
      await Promise.all(
        Array.from(images).map(img => 
          new Promise((resolve, reject) => {
            if (img.complete) {
              resolve(null);
            } else {
              img.onload = () => resolve(null);
              img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
            }
          })
        )
      );
      
      // Capture the content with proper image handling
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        onclone: (document, element) => {
          // Ensure images are visible and loaded
          const images = element.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            img.style.display = 'block';
            img.crossOrigin = 'anonymous';
          });
        }
      });
      
      document.body.removeChild(clone);

      // Convert to PDF
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

      console.log('Download Report - PDF generated, saving file');
      pdf.save("chatsites-analysis-report.pdf");
      
      toast({
        title: "Success",
        description: "Report downloaded successfully!",
      });
      console.log('Download Report - PDF saved successfully');
    } catch (error) {
      console.error('Download Report - Error:', error);
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm"
    >
      <Download className="h-4 w-4" />
      <span className="hidden sm:inline">Download PDF</span>
      <span className="sm:hidden">Download</span>
    </Button>
  );
};