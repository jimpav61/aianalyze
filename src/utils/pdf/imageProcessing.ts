export const processImageForPDF = async (img: HTMLImageElement): Promise<void> => {
  return new Promise((resolve) => {
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
      resolve();
    } else {
      img.onload = () => {
        console.log("PDF image loaded successfully:", img.src);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load PDF image: ${img.src}`);
        img.src = '/placeholder.svg';
        resolve();
      };
    }
  });
};

export const prepareImagesForPDF = async (reportContainer: HTMLElement): Promise<void> => {
  const images = Array.from(reportContainer.getElementsByTagName('img'));
  console.log("Processing images for PDF:", images.length);
  
  await Promise.all(images.map(processImageForPDF));
};