export const generateHeaderSection = (doc: HTMLElement) => {
  const header = document.createElement('div');
  header.style.padding = '32px';
  header.style.marginBottom = '32px';
  header.style.backgroundColor = '#ffffff';
  header.style.width = '100%';
  header.style.display = 'flex';
  header.style.justifyContent = 'center';
  
  // Use direct path for logo
  const logoUrl = '/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png';
  
  header.innerHTML = `
    <div>
      <img 
        src="${logoUrl}" 
        alt="Logo" 
        style="height: 60px; width: auto;"
      />
    </div>
  `;
  
  // Preload the image
  const img = new Image();
  img.src = logoUrl;
  
  doc.insertBefore(header, doc.firstChild);
};