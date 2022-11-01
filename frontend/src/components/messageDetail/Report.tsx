import {useState} from 'react';
import Alert from '@common/Alert';
import '@common/Common.scss';

interface props {
  open: boolean;
  onCancel: () => void;
}

function Report({onCancel, open}: props) {
  const [reported, setReported] = useState(false);
  const reportedAlert = () => {
    // 백에 신고 요청
    setReported(true);
  };
  const options = [
    {name: '저작권 위반', value: 'copyright'},
    {name: '개인정보 침해', value: 'privacy'},
    {name: '부적절한 내용', value: 'inappropriate'},
    {name: '불법 홍보', value: 'advert'},
    {name: '기타', value: 'etc'},
  ];
  return (
    <div className="modal-parent">
      {/* {open ? ( */}
      <div className="modal modal-report">
        <p>신고하기</p>
        <select>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <textarea placeholder="신고 사유를 입력해주세요" rows={10} />
        <footer>
          <button type="button" onClick={reportedAlert}>
            확인
          </button>
          <button type="button" onClick={onCancel}>
            취소
          </button>
        </footer>
      </div>
      {/* ) : null} */}
      {reported ? (
        <Alert
          title="신고 확인"
          message="신고가 접수되었습니다"
          open={reported}
        />
      ) : null}
    </div>
  );
}

export default Report;
