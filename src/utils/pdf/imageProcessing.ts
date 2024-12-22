export const processAllImages = async (container: HTMLElement) => {
  const images = container.getElementsByTagName('img');
  return Promise.all(
    Array.from(images).map(img => 
      img.complete ? Promise.resolve() : new Promise(resolve => img.onload = resolve)
    )
  );
};