export const processImage = async (img: HTMLImageElement): Promise<void> => {
  return new Promise((resolve) => {
    const originalSrc = img.src;
    
    // Convert relative URLs to absolute
    if (img.src.startsWith('/')) {
      img.src = window.location.origin + img.src;
    }
    // Remove port number if present
    img.src = img.src.replace(/:\d+\//, '/');
    
    console.log(`Processing image: ${originalSrc} -> ${img.src}`);
    
    if (img.complete) {
      console.log("Image already loaded:", img.src);
      resolve();
    } else {
      img.onload = () => {
        console.log("Image loaded successfully:", img.src);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${img.src}`);
        img.src = '/placeholder.svg';
        resolve();
      };
    }
  });
};

export const processAllImages = async (container: HTMLElement): Promise<void> => {
  const images = Array.from(container.getElementsByTagName('img'));
  console.log("Processing images:", images.length);
  
  await Promise.all(images.map(processImage));
};