export const generateHeaderSection = (doc: HTMLDivElement) => {
  const header = document.createElement('div');
  header.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <img 
          src="/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png" 
          alt="ChatSites Logo" 
          style="height: 64px; width: auto;"
        />
      </div>
      <div style="text-align: right; font-size: 0.875rem; line-height: 1.6;">
        <p style="margin: 0 0 0.75rem 0; font-weight: 600; color: #374151;">Contact us:</p>
        <p style="margin: 0 0 0.25rem 0; color: #4B5563;">info@chatsites.ai</p>
        <p style="margin: 0 0 0.25rem 0; color: #4B5563;">+1 480 862 0288</p>
        <p style="margin: 0; color: #4B5563;">chatsites.ai</p>
      </div>
    </div>
  `;
  doc.appendChild(header);
};