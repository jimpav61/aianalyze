export const generateHeaderSection = (doc: HTMLElement) => {
  const header = document.createElement('div');
  header.style.padding = '40px';
  header.style.marginBottom = '32px';
  header.style.borderBottom = '2px solid #e5e7eb';
  header.style.backgroundColor = '#ffffff';
  header.style.width = '100%';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  
  // Use absolute URL for logo
  const logoUrl = window.location.origin + '/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png';
  
  header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px;">
      <img 
        src="${logoUrl}" 
        alt="Logo" 
        style="height: 60px; width: auto;"
        crossorigin="anonymous"
      />
      <div>
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #1a1f2c;">AI Implementation Analysis Report</h1>
        <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 16px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
    </div>
  `;

  // Preload the image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = logoUrl;
  
  // Insert at the beginning of the document
  doc.insertBefore(header, doc.firstChild);
};