export const generateHeaderSection = (doc: HTMLElement) => {
  const header = document.createElement('div');
  header.style.padding = '32px';
  header.style.marginBottom = '32px';
  header.style.borderBottom = '2px solid #e5e7eb';
  header.style.backgroundColor = '#ffffff';
  header.style.width = '100%';
  header.style.display = 'flex';
  header.style.flexDirection = 'column';
  header.style.gap = '16px';
  
  // Use direct path for logo
  const logoUrl = '/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png';
  
  header.innerHTML = `
    <div style="display: flex; align-items: center; gap: 24px;">
      <img 
        src="${logoUrl}" 
        alt="Logo" 
        style="height: 40px; width: auto;"
      />
      <div>
        <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #111827;">AI Implementation Analysis Report</h1>
        <p style="margin: 8px 0 0 0; color: #6b7280; font-size: 16px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
    </div>
  `;
  
  // Preload the image
  const img = new Image();
  img.src = logoUrl;
  
  doc.insertBefore(header, doc.firstChild);
};