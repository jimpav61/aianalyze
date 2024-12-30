export const hideActionButtons = (container: HTMLElement | Document) => {
  // Hide all action buttons and print-hidden elements
  const elementsToHide = container.querySelectorAll('[data-report-actions], .print\\:hidden, button, .button-like');
  elementsToHide.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = 'none';
    }
  });
};

export const restoreActionButtons = (container: HTMLElement | Document) => {
  // Restore all previously hidden elements
  const elementsToRestore = container.querySelectorAll('[data-report-actions], .print\\:hidden, button, .button-like');
  elementsToRestore.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.display = '';
    }
  });
};