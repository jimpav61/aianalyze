import html2canvas from 'html2canvas';

export const createCanvas = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  console.log('[CanvasConfig] Creating canvas');
  
  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: true,
    backgroundColor: '#ffffff',
    width: 900,
    height: element.scrollHeight,
    windowWidth: 900,
    onclone: (_, element) => {
      console.log('[CanvasConfig] Cloning element for canvas generation');
      element.style.height = 'auto';
      element.style.overflow = 'visible';
    }
  });
};