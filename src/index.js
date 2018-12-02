import React from "react";
import ReactDOM from "react-dom";
import MainIndex from "./components/main";
import * as serviceWorker from "./serviceWorker";

export const initPlayers = data => {
  Main.setState({ players: data });
};

export const movePiece = ({ pieceId, positionXY }) => {
  let elementPiece = document.getElementById(pieceId);

  console.log(elementPiece)

  elementPiece.style.left = positionXY.x;
  elementPiece.style.top = positionXY.y;
};

var Main = ReactDOM.render(<MainIndex />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
