import {useNavigate} from 'react-router';

import '@common/Common.scss';
import {ReactComponent as ArrowBack} from '@images/arrowBack.svg';

interface MoveToBackProps {
  path: string;
  color?: string;
}

// 좌측 상단 뒤로가기 버튼
function MoveToBack({path, color = 'white'}: MoveToBackProps) {
  const navigate = useNavigate();
  return (
    <div
      id="move-to-back"
      onClick={() => {
        if (path.startsWith('/')) {
          navigate(path);
        } else {
          navigate(-1);
        }
      }}>
      <ArrowBack viewBox="0 0 45 50" width="40" height="40" fill={color} />
    </div>
  );
}

export default MoveToBack;
