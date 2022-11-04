export const emojiArr = Array.from(
  {length: 76},
  (value, index) => process.env.PUBLIC_URL + '/emojis/' + index + '.webp',
);
