import React from "react";
import "../styles/_utils.scss";
import "./MessageCreate.scss";
import Carousel from "../components/messageCreate/Carousel";

function MessageCreate() {
  return (
      <div className="Screen">
        <div className="Container">
          <Carousel />
        </div>
      </div>
  );
}

export default MessageCreate;
