import React from "react";
import Case from "../case";

const styleBoard = {
  width: "508px",
  height: "508px",
  display: "grid",
  gridTemplateColumns: "auto auto auto auto auto auto auto auto ",
  border: "1px solid black"
};

const listOfCases = Array(64)
  .fill(null)
  .map((listOfCase = "", ind) => {
    if (ind === 0 || ind === 7 || ind === 56 || ind === 63) {
      listOfCase = "Tour";
    } else if (ind === 1 || ind === 6 || ind === 57 || ind === 62) {
      listOfCase = "Cheval";
    } else if (ind === 2 || ind === 5 || ind === 58 || ind === 61) {
      listOfCase = "Fou";
    } else if (ind === 3 || ind === 59) {
      listOfCase = "Reine";
    } else if (ind === 4 || ind === 60) {
      listOfCase = "Roi";
    } else if ((ind >= 8 && ind <= 15) || (ind >= 48 && ind <= 55)) {
      listOfCase = "Pion";
    }

    return <Case key={ind} value={listOfCase} ind={ind} />;
  });

const Board = () => <div style={styleBoard}>{listOfCases}</div>;

export default Board;
