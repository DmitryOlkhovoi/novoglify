export const curvedHorizontal = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  var line = [];
  var mx = x1 + (x2 - x1) / 2;

  line.push("M", x1, y1);
  line.push("C", mx, y1, mx, y2, x2, y2);

  return line.join(" ");
};

export const curvedVertical = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  var line = [];
  var my = y1 + (y2 - y1) / 2;

  line.push("M", x1, y1);
  line.push("C", x1, my, x2, my, x2, y2);

  return line.join(" ");
};
