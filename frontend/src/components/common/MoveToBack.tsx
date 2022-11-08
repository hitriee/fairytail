import {useNavigate} from 'react-router';
import {ReactComponent as ArrowBack} from '@images/arrowBack.svg';

import '@common/Common.scss';

interface MoveToBackProps {
  path: string;
  color?: string;
}

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
