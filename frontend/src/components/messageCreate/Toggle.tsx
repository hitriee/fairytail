import {Dispatch, SetStateAction} from 'react';
import './Toggle.scss';

type ToggleProps = {
  label: string;
  onClick: Dispatch<SetStateAction<boolean>>;
  labelClass?: string | undefined;
  containerClass?: string | undefined;
};

function Toggle({label, onClick, labelClass, containerClass}: ToggleProps) {
  return (
    <div className={`toggle-container ${containerClass}`}>
      <label htmlFor="toggle" className={`toggle-label ${labelClass}`}>
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
