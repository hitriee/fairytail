import {Dispatch, SetStateAction} from 'react';
import './Toggle.scss';

type ToggleProps = {
  label: string;
  onClick: Dispatch<SetStateAction<boolean>>;
  className?: string | undefined;
};

function Toggle({label, onClick, className}: ToggleProps) {
  return (
    <div className="toggle-container">
      <label htmlFor="toggle" className={`toggle-label ${className}`}>
        {label}
      </label>
      <label className="toggle-background">
        <input
          id="toggle"
          type="checkbox"
          onClick={() => onClick(prev => !prev)}
        />
        <span className="toggle-circle" />
      </label>
    </div>
  );
}

export default Toggle;
