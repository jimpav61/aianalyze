export const preloadImages = async (element: HTMLElement): Promise<void> => {
  const images = element.getElementsByTagName('img');
  console.log('[ImageLoader] Loading images:', images.length);
  
  await Promise.all(
    Array.from(images).map(img => 
      new Promise((resolve) => {
        if (img.complete) {
          console.log('[ImageLoader] Image already loaded:', img.src);
          resolve(null);
          return;
        }

        img.onload = () => {
          console.log('[ImageLoader] Image loaded successfully:', img.src);
          resolve(null);
        };
        
        img.onerror = (error) => {
          console.error('[ImageLoader] Image failed to load:', img.src, error);
          resolve(null);
        };
      })
    )
  );
};