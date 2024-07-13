export const waterfallLayout = (DOM: HTMLElement, columns: number, spacing: number = 0) => {
  const children = Array.from(DOM.children || []) as HTMLElement[];
  let heights = new Array(columns).fill(0);

  children.forEach((element, i) => {
    const index = i % columns;
    element.style.top = `${heights[index]}px`;
    heights[index] += element.offsetHeight + spacing;
  });

  const { style, offsetHeight } = children[children.length - 1];
  DOM.style.minHeight = `${+style.top.slice(0, -2) + offsetHeight}px`;
};