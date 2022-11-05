import {Dispatch, SetStateAction} from 'react';
import './CheckBox.scss';

type CheckBoxProps = {
  label: string;
  onClick: Dispatch<SetStateAction<boolean>>;
};

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
