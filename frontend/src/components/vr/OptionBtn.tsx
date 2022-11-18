import {Dispatch, SetStateAction} from 'react';
import '@vr/OptionBtn.scss';

interface OptionBtnProps {
  option: boolean;
  setOption: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<never[]>>;
}

function OptionBtn({option, setOption, setData}: OptionBtnProps) {
  return (
    <div
      id="option-btn"
      onClick={() => {
        {
          setOption(prev => !prev);
          setData([]);
        }
      }}>
      {option ? '최신순' : '좋아요순'}
    </div>
  );
}

export default OptionBtn;
