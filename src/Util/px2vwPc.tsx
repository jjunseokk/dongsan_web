// Keep management tables readable on small screens; the page can scroll horizontally.
const px2vwPc = (size: number, width = 1920) =>
  `${(size / width) * Math.max(1100, window.innerWidth)}px`;

export default px2vwPc;
