import {Dispatch, SetStateAction} from 'react';
import './Toggle.scss';

type ToggleProps = {
  label: string;
  onClick: Dispatch<SetStateAction<boolean>>;
  value?: boolean;
};

function Toggle({label, onClick, value = false}: ToggleProps) {
  return (
    <div className={`toggle-container`}>
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
