export const keyboard = [
  "йцукенгшщзхъ".split(""),
  "фывапролджэ".split(""),
  "ячсмитьбю".split(""),
];

export const getAlphabetMap = () => {
  const map = new Map<string, number[]>();

  keyboard.forEach((r, y) => {
    r.forEach((v, x) => {
      map.set(v, [x, y]);
    });
  });

  return map;
};
