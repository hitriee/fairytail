import {Dispatch, SetStateAction} from 'react';
import '@messageCreate/Toggle.scss';

type ToggleProps = {
  label: string;
  onClick: Dispatch<SetStateAction<boolean>>;
  value?: boolean;
};

// 토글 스위치
function Toggle({label, onClick, value = false}: ToggleProps) {
  return (
    <div className={`toggle-container`} onClick={() => onClick(prev => !prev)}>
      <label htmlFor="toggle" className={`toggle-label`}>
        {label}
      </label>
      <label className="toggle-background">
        <input
          id="toggle"
          type="checkbox"
          checked={value}
          onChange={() => onClick(prev => !prev)}
        />
        <span className="toggle-circle" />
      </label>
    </div>
  );
}

export default Toggle;
