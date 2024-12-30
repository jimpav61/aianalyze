export const hideActionButtons = (container: HTMLElement | Document) => {
  const actionButtons = container.querySelectorAll('[data-report-actions]');
  actionButtons.forEach((button) => {
    (button as HTMLElement).style.display = 'none';
  });
};

export const restoreActionButtons = (container: HTMLElement | Document) => {
  const actionButtons = container.querySelectorAll('[data-report-actions]');
  actionButtons.forEach((button) => {
    (button as HTMLElement).style.display = 'block';
  });
};