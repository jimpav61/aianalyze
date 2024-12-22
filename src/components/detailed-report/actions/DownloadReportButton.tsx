import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { DetailedFormData } from "@/types/analysis";

interface DownloadReportButtonProps {
  formData?: DetailedFormData;
  analysis?: any;
  reportData?: any;
}

export const DownloadReportButton = ({ formData, analysis, reportData }: DownloadReportButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const reportContainer = document.querySelector("#detailed-report");
      if (!reportContainer) {
        throw new Error("Report container not found");
      }

      // Create a clone to avoid modifying the original DOM
      const clone = reportContainer.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      
      // Process all images in the clone
      const images = clone.getElementsByTagName('img');
      await Promise.all(
        Array.from(images).map(img => 
          new Promise((resolve) => {
            // Ensure image URLs are absolute
            if (img.src.startsWith('/')) {
              img.src = window.location.origin + img.src;
            }
            // Remove any port number from the URL
            img.src = img.src.replace(/:\d+\//, '/');
            
            if (img.complete) {
              resolve(null);
            } else {
              img.onload = () => resolve(null);
              img.onerror = () => {
                console.warn(`Image failed to load: ${img.src}`);
                img.remove();
                resolve(null);
              };
            }
          })
        )
      );

      // Capture the content
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        onclone: (_, element) => {
          const images = element.getElementsByTagName('img');
          Array.from(images).forEach(img => {
            img.style.display = 'block';
            img.crossOrigin = 'anonymous';
            if (img.src.startsWith('/')) {
              img.src = window.location.origin + img.src;
            }
            // Remove any port number from the URL
            img.src = img.src.replace(/:\d+\//, '/');
          });
        }
      });

      document.body.removeChild(clone);

      // Generate PDF
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

      pdf.save(`AI_Analysis_Report_${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "Success",
        description: "Report downloaded successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleDownload} variant="outline" size="sm">
      <Download className="mr-2 h-4 w-4" />
      Download Report
    </Button>
  );
};