export const generateHeaderSection = (doc: HTMLElement) => {
  const header = document.createElement('div');
  header.innerHTML = `
    <div style="padding: 24px 0; margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img 
          src="/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png" 
          alt="Logo" 
          style="height: 64px; width: auto;"
        />
        <div>
          <h1 style="font-size: 24px; font-weight: bold; margin: 0;">AI Implementation Analysis Report</h1>
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