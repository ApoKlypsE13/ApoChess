import React from "react";

import Board from "../board";
import Status from "../status";
import resetPlayers from "../../logic";

const style = {
  display: "flex",
  flexDirection: "row"
};

const styleBtn = {
  width: "auto",
  height: "32px",
  marginLeft: "20px"
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
          <button style={styleBtn} onClick={resetPlayers}>
            RESET PLAYERS
          </button>
        </div>
      </>
    );
  }
}

export default MainIndex;
