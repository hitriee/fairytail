import {useState, useRef, useEffect, Dispatch, SetStateAction} from 'react';

import '@common/SelectBox.scss';
import {ReactComponent as ArrowDropDown} from '@images/arrowDropDown.svg';

interface SelectBoxProps {
  reportType: number;
  setReportType: Dispatch<SetStateAction<number>>;
  options: string[];
}

// custon select
function SelectBox({reportType, setReportType, options}: SelectBoxProps) {
  // select 목록 표시 여부
  const [showSelect, setShowSelect] = useState(false);

  const selectRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (selectRef.current && !selectRef.current.contains(target as Node)) {
        setShowSelect(false);
      }
    });
  });

  return (
    <div className="select">
      <div className="select-toggle" onClick={() => setShowSelect(true)}>
        <span style={{color: reportType === -1 ? '#767676' : '#000000'}}>
          {reportType === -1 ? '유형을 선택해주세요.' : options[reportType]}
        </span>
        <ArrowDropDown
          className="select-toggle-icon"
          fill="#a07dff"
          viewBox="0 0 50 50"
          width="25"
          height="25"
        />
      </div>

      {showSelect ? (
        <ul className="select-ul" ref={selectRef}>
          {options.map((option: string, index) => (
            <li
              className="select-li"
              key={option}
              onClick={() => {
                setReportType(index);
                setShowSelect(false);
              }}>
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SelectBox;
