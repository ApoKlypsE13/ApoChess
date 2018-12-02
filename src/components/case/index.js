import React from "react";

import { movePieceServer } from "../../logic";

let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0,
  element = null;

const styleCase = {
  border: "1px solid rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const absPos = ind => {
  let obj = {
    position: "absolute"
  };

  if (ind >= 48 && ind <= 63) {
    obj.color = "blue";
  }

  return obj;
};

const mouseDown = e => {
  e.preventDefault();

  element = document.getElementById(e.currentTarget.id);
  pos3 = e.clientX;
  pos4 = e.clientY;

  document.onmouseup = mouseUp;
  document.onmousemove = moveMouse;
};

const mouseUp = e => {
  movePieceServer(element.id, { x: element.style.left, y: element.style.top });

  document.onmouseup = null;
  document.onmousemove = null;
};

const moveMouse = e => {
  e.preventDefault();

  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;

  element.style.top = element.offsetTop - pos2 + "px";
  element.style.left = element.offsetLeft - pos1 + "px";
};

const Case = ({ value, ind }) => {
  return (
    <div style={styleCase}>
      <div
        style={absPos(ind)}
        id={"salut" + ind}
        draggable
        onMouseDown={mouseDown}
      >
        {value}
      </div>
    </div>
  );
};

export default Case;
