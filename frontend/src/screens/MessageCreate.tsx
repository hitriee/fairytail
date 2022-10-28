import Carousel from "@/components/messageCreate/Carousel";
import React from "react";
import "../styles/_utils.scss";
import "./MessageCreate.scss";

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
