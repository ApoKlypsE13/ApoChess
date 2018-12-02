import React from "react";

const styleBtn = {
  width: "auto",
  height: "32px",
  marginLeft: "20px"
};

class ButtonGame extends React.PureComponent {
  render() {
    return (
      <div style={styleBtn}>
        <button disabled>RESET BOARD</button>
      </div>
    );
  }
}

export default ButtonGame;
