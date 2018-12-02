import React from "react";
import PropTypes from "prop-types";

const style = {
  textAlign: "center",
  marginTop: "20px"
};

const getStyle = player => {
  if (player !== null && player.used) return { fontWeight: "bold" };
};

class Status extends React.Component {
  render() {
    const { players } = this.props;

    return (
      <div>
        <div style={style}>
          <span
            style={getStyle(
              players !== undefined && players.length > 0 ? players[0] : null
            )}
          >
            {players !== undefined && players.length > 0 ? players[0].name : ""}
          </span>{" "}
          vs{" "}
          <span
            style={getStyle(
              players !== undefined && players.length > 0 ? players[1] : null
            )}
          >
            {players !== undefined && players.length > 0 ? players[1].name : ""}
          </span>
        </div>
      </div>
    );
  }
}

Status.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      used: PropTypes.bool
    })
  )
};

export default Status;
