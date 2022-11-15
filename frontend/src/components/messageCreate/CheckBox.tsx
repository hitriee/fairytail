import {Dispatch, SetStateAction} from 'react';

import '@messageCreate/CheckBox.scss';

type CheckBoxProps = {
  label: string;
  onClick: Dispatch<SetStateAction<boolean>>;
};

// 결국 쓰이지 않은... 체크박스...
function CheckBox({label, onClick}: CheckBoxProps) {
  return (
    <label htmlFor="checkbox-input" className="checkbox-label">
      {label}
      <input
        id="checkbox-input"
        type="checkbox"
        onClick={() => onClick(prev => !prev)}
      />
    </label>
  );
}

export default CheckBox;
