import html2canvas from 'html2canvas';
import { processAllElements } from './elementProcessor';
import { hideActionButtons, restoreActionButtons } from './actionButtonsHandler';

export const createReportCanvas = async (reportElement: HTMLElement): Promise<HTMLCanvasElement> => {
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

  // Wait for rendering and fonts to load
  await new Promise(resolve => setTimeout(resolve, 500));

  const canvas = await html2canvas(reportElement, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: 900,
    height: reportElement.scrollHeight,
    windowWidth: 900,
    onclone: (_, clonedElement) => {
      hideActionButtons(clonedElement);
      processAllElements(clonedElement);
    }
  });

  // Restore original styles
  Object.entries(originalStyles).forEach(([property, value]) => {
    (reportElement.style as any)[property] = value;
  });

  // Restore action buttons
  restoreActionButtons(reportElement);

  return canvas;
};