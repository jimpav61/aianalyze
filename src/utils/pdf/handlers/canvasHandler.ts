import html2canvas from 'html2canvas';
import { processAllElements } from './elementProcessor';
import { hideActionButtons, restoreActionButtons } from './actionButtonsHandler';

export const createReportCanvas = async (reportElement: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log('[CanvasHandler] Starting canvas creation with dimensions:', {
    width: reportElement.scrollWidth,
    height: reportElement.scrollHeight
  });

  // Store original styles
  const originalStyles = {
    display: reportElement.style.display,
    visibility: reportElement.style.visibility,
    opacity: reportElement.style.opacity,
    position: reportElement.style.position,
    transform: reportElement.style.transform,
    margin: reportElement.style.margin,
    padding: reportElement.style.padding,
    whiteSpace: reportElement.style.whiteSpace,
    width: reportElement.style.width
  };

  try {
    // Prepare element for capture
    reportElement.style.width = '900px';
    reportElement.style.padding = '40px';
    reportElement.style.backgroundColor = 'white';
    reportElement.style.position = 'relative';
    reportElement.style.opacity = '1';
    reportElement.style.visibility = 'visible';
    reportElement.style.display = 'block';
    reportElement.style.transform = 'none';
    reportElement.style.margin = '0';
    reportElement.style.whiteSpace = 'pre-line';

    // Hide action buttons and process elements
    hideActionButtons(reportElement);
    processAllElements(reportElement);

    // Wait for all images to load
    const images = reportElement.getElementsByTagName('img');
    await Promise.all(
      Array.from(images).map(img => 
        img.complete ? Promise.resolve() : new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve; // Handle failed loads
        })
      )
    );

    // Additional wait to ensure rendering
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create canvas with high quality settings
    const canvas = await html2canvas(reportElement, {
      scale: 2,  // Higher scale for better quality
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      width: 900,
      height: reportElement.scrollHeight,
      windowWidth: 900,
      onclone: (_, clonedElement) => {
        hideActionButtons(clonedElement);
        processAllElements(clonedElement);
        console.log('[CanvasHandler] Element cloned with dimensions:', {
          width: clonedElement.scrollWidth,
          height: clonedElement.scrollHeight
        });
      }
    });

    console.log('[CanvasHandler] Canvas created successfully with dimensions:', {
      width: canvas.width,
      height: canvas.height
    });

    return canvas;
  } finally {
    // Restore original styles
    Object.entries(originalStyles).forEach(([property, value]) => {
      (reportElement.style as any)[property] = value;
    });

    // Restore action buttons
    restoreActionButtons(reportElement);
  }
};