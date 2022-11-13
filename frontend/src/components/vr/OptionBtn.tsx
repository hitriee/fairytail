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
      {option ? '최신순으로\n보기' : '좋아요순으로\n보기'}
    </div>
  );
}

export default OptionBtn;
