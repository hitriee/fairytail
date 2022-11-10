import '@messageCreate/Spinner.scss';
import {ReactComponent as Success} from '@images/success.svg';
import {ReactComponent as Fail} from '@images/fail.svg';

type SpinnerProps = {
  message: string;
  spinnerStop: number;
};

function Spinner({message, spinnerStop}: SpinnerProps) {
  return (
    <div className="spinner-background">
      {spinnerStop === 0 ? <div className="spinner"></div> : null}
      {spinnerStop === 1 ? (
        <div className="spinner-icon">
          <Success />
        </div>
      ) : null}
      {spinnerStop === 2 ? (
        <div className="spinner-icon">
          <Fail />
        </div>
      ) : null}
      <div className="spinner-message">{message}</div>
    </div>
  );
}

export default Spinner;
