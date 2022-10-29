import React from "react";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <>
      <p>This Screen is Intro</p>
      <div>
        <Link to="/main">
          <button>go Main</button>
        </Link>
      </div>
    </>
  );
}

export default Intro;
