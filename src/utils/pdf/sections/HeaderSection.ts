export const generateHeaderSection = (doc: HTMLElement) => {
  const header = document.createElement('div');
  header.style.padding = '24px';
  header.style.marginBottom = '32px';
  header.style.borderBottom = '1px solid #e5e7eb';
  
  header.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img 
          src="/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png" 
          alt="Logo" 
          style="height: 48px; width: auto;"
        />
        <div>
          <h1 style="font-size: 24px; font-weight: bold; margin: 0; color: #1a1f2c;">AI Implementation Analysis Report</h1>
          <p style="margin: 4px 0 0 0; color: #6b7280;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  `;
  
  // Insert at the beginning of the document
  if (doc.firstChild) {
    doc.insertBefore(header, doc.firstChild);
  } else {
    doc.appendChild(header);
  }
};