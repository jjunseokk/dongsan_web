const getWidth = window.innerWidth;
const deviceWidth = getWidth >= 430 ? 430 : getWidth;

export const px2vw = (size: number, width: number = 430) =>
  `${(size / width) * deviceWidth}px`;
