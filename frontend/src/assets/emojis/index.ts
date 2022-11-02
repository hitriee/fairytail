export const emojiArr = Array.from(
  {length: 87},
  (value, index) => process.env.PUBLIC_URL + '/emojis/' + index + '.png',
);
