export const generateHeaderSection = (doc: HTMLDivElement) => {
  const header = document.createElement('div');
  header.innerHTML = `
    <div style="display: flex; items-center justify-between mb-8 p-6 bg-white rounded-lg shadow-sm">
      <div class="flex items-center gap-2">
        <img 
          src="/lovable-uploads/23135d22-4ba2-4f66-a179-9bd803c29569.png" 
          alt="Logo" 
          style="height: 64px; width: auto;"
        />
        <span style="font-size: 24px; font-weight: bold; color: #f65228;">ChatSites</span>
      </div>
      <div style="text-align: right; font-size: 14px; color: #4B5563;">
        <p style="font-weight: 600; margin-bottom: 4px;">Contact us:</p>
        <p style="margin: 0;">info@chatsites.ai</p>
        <p style="margin: 0;">+1 480 862 0288</p>
        <p style="margin: 0;">chatsites.ai</p>
      </div>
    </div>
  `;
  doc.appendChild(header);
};