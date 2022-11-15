import '@loading/Loading.scss';
import {emojiArr} from '@emojis/index';

// main 최초 로딩, vr 로딩 시 보여지는 화면
function Loading({fillBackground}: {fillBackground: boolean}) {
  const letter = [
    '당신이 잠들면 나도 잘게요',
    '넌 해도 돼, 내가 달이 되지 뭐',
    '더 좋은 나를 위해, 날을 위해',
    '오늘 밤에도 별이 바람에 스치운다',
    '앓고 닳아도 아름답도록',
    '화내지 말고 환해지기로 해요',
    '소중한 것은 언제나 가까이 있다',
    '잘 될거야, 그럴거야',
    '넌 언제나 나의 별이야',
    '영원도록 빛나는 별이길',
    '곧 빛나는 순간이 올거야',
    '당신의 눈동자에 건배',
  ];

  function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={fillBackground ? 'loading loading-background' : 'loading'}>
      <img className="loading-image" src={emojiArr[66]} alt="로딩 이미지" />
      <p className="loading-message">{letter[rand(0, 11)]}</p>
    </div>
  );
}

export default Loading;
