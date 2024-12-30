export const applyBasicStyles = (elem: HTMLElement) => {
  elem.style.display = 'block';
  elem.style.visibility = 'visible';
  elem.style.opacity = '1';
  elem.style.position = 'relative';
  elem.style.transform = 'none';
};

export const applyTextStyles = (elem: HTMLElement) => {
  if (elem.tagName === 'P' || elem.tagName === 'DIV') {
    elem.style.marginBottom = '12px';
    elem.style.lineHeight = '1.6';
    elem.style.whiteSpace = 'pre-line';
  }
};

export const applyHeadingStyles = (elem: HTMLElement) => {
  if (elem.tagName.match(/^H[1-6]$/)) {
    elem.style.marginTop = '24px';
    elem.style.marginBottom = '16px';
    elem.style.lineHeight = '1.4';
  }
};

export const applyListStyles = (elem: HTMLElement) => {
  if (elem.tagName === 'UL' || elem.tagName === 'OL') {
    elem.style.marginBottom = '16px';
    elem.style.paddingLeft = '24px';
  }

  if (elem.tagName === 'LI') {
    elem.style.marginBottom = '8px';
    elem.style.lineHeight = '1.5';
  }
};

export const handleLineBreaks = (elem: HTMLElement) => {
  if (elem.innerHTML.includes('<br>')) {
    elem.innerHTML = elem.innerHTML.replace(/<br\s*\/?>/gi, '\n');
  }
};