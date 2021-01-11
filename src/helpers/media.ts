const breakpoints: { [index: string]: number } = {
  sm: 442,
  md: 768,
  lg: 992,
  xl: 1200,
  uhd: 1900,
};

export default Object.keys(breakpoints)
  .map((key) => [key, breakpoints[key]] as [string, number])
  .reduce((prev, [key, breakpoint]) => {
    prev[key] = `@media (min-width: ${breakpoint}px)`;
    return prev;
  }, {} as { [index: string]: string });
