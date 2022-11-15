import MusicPlayer from '@messageCreate/MusicPlayer';

type PreviewProps = {
  type: number;
  fileURL: string;
};

// 전달받은 type에 따라 다른 미리보기 컴포넌트 반환
function Preview({type, fileURL}: PreviewProps) {
  let preview: any;

  if (type === 0) {
    preview = (
      <div className="message-create-content-text message-create-content-text-preview">
        {fileURL}
      </div>
    );
  } else if (type === 1) {
    preview = (
      <img className="message-create-content-image" src={fileURL} alt="사진" />
    );
  } else if (type === 2) {
    preview = (
      <video
        key={fileURL}
        className="message-create-content-image"
        controls={true}
        playsInline={true}>
        <source src={fileURL} />
      </video>
    );
  } else if (type === 3) {
    preview = <MusicPlayer fileURL={fileURL} />;
  }

  return preview;
}

export default Preview;
