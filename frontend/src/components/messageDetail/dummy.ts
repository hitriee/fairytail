interface data {
  list: [
    title: string,
    content: string,
    count: number,
    like: boolean,
    date: Date,
    author: number,
    type: string,
    emoji_no: number,
  ];
}
const dummy: data['list'][] = [
  [
    '여우비 가온해 가온누리 안녕.',
    '바나나 아련 노트북 포도 늘품 미리내 바나나 그루잠 감사합니다 노트북 바람꽃 아련 별하 소록소록 산들림 함초롱하다 아련 늘품 감또개 이플 컴퓨터 노트북 나래 산들림 도르레 가온해',
    121,
    true,
    new Date(),
    0,
    'string',
    1,
  ],
  [
    'Lorem ipsum dolor metus.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis urna purus, a elementum diam interdum eget. Ut quis semper libero, non semper magna. Cras consectetur finibus tincidunt gravida.',
    12,
    false,
    new Date(),
    1,
    'string',
    2,
  ],
  [
    '제목입니다',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Moonfromoakland04052006.jpg/250px-Moonfromoakland04052006.jpg',
    121,
    true,
    new Date(),
    0,
    'image',
    3,
  ],
  ['제목입니다', '@assets/test/test.mp4', 12, true, new Date(), 2, 'video', 4],
  ['제목입니다', '@assets/test/test.m4a', 12, true, new Date(), 3, 'audio', 5],
];

export default dummy;
