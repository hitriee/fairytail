import React from "react";

interface props {
  title: string;
  message: string;
  open: boolean;
  onConfirmed?: () => void;
}

function Confirm({ title, message, open, onConfirmed }: props) {
  return (
    <>
      {open ? (
        <div className="card">
          <p>{title}</p>
          <p>{message}</p>
          <button onClick={onConfirmed}>확인</button>
        </div>
      ) : null}
    </>
  );
}

export default Confirm;
