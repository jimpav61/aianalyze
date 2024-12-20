export const generateHeaderSection = (doc: HTMLDivElement) => {
  const header = document.createElement('div');
  header.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1.5rem;">
      <div style="display: flex; align-items: center;">
        <img 
          src="/lovable-uploads/7def398d-ead6-40ce-893d-93996cba4427.png" 
          alt="Logo" 
          style="height: 32px; width: auto; margin-right: 1rem;"
        />
      </div>
      <div style="text-align: right; color: #4B5563; font-size: 0.875rem; line-height: 1.5;">
        <p style="margin: 0 0 0.5rem 0; font-weight: 600;">Contact us:</p>
        <p style="margin: 0 0 0.25rem 0;">info@chatsites.ai</p>
        <p style="margin: 0 0 0.25rem 0;">+1 480 862 0288</p>
        <p style="margin: 0;">chatsites.ai</p>
      </div>
    </div>
  `;
  doc.appendChild(header);
};