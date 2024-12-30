import { 
  applyBasicStyles, 
  applyTextStyles, 
  applyHeadingStyles, 
  applyListStyles, 
  handleLineBreaks 
} from '../styles/elementStyles';

export const processElement = (elem: HTMLElement) => {
  applyBasicStyles(elem);
  applyTextStyles(elem);
  applyHeadingStyles(elem);
  applyListStyles(elem);
  handleLineBreaks(elem);
};

export const processAllElements = (container: HTMLElement) => {
  const allElements = container.getElementsByTagName('*');
  Array.from(allElements).forEach((el) => {
    processElement(el as HTMLElement);
  });
};