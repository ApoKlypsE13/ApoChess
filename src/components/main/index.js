import React from "react";

import Board from "../board";
import Status from "../status";
import ButtonGame from "../buttongame";

const style = {
  display: "flex",
  flexDirection: "row"
};

class MainIndex extends React.PureComponent {
  render() {
    return (
      <>
        <div style={style}>
          <div>
            <Board />
            <Status {...this.state} />
          </div>
          <ButtonGame />
        </div>
      </>
    );
  }
}

export default MainIndex;
