export const emojiArr = Array.from(
  {length: 76},
  (value, index) => process.env.PUBLIC_URL + '/emojis/' + index + '.webp',
);

export const emojiArrStatic = Array.from(
  {length: 87},
  (value, index) => process.env.PUBLIC_URL + '/emojis/test/' + index + '.png',
);
