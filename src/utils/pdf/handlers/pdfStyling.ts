export const applyPdfStyles = (element: HTMLElement) => {
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.width = '900px';
  element.style.backgroundColor = '#ffffff';
  element.style.padding = '40px';
  element.style.margin = '0';
};

export const hideScreenOnlyElements = (element: HTMLElement) => {
  const screenOnlyElements = element.querySelectorAll('.screen-only');
  screenOnlyElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none';
    }
  });
};