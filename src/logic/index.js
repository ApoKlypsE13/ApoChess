import { w3cwebsocket } from "websocket";
import checkMessage from "../network/action";
import * as constant from "../network/constant";

var client = new w3cwebsocket("ws://localhost:8080/", "echo-protocol");

client.onerror = function() {
  console.log("Connection Error");
};

client.onopen = function() {
  console.log("WebSocket Client Connected");
};

client.onclose = function() {
  console.log("echo-protocol Client Closed");
};

client.onmessage = function(e) {
  if (typeof e.data === "string") {
    const answer = JSON.parse(e.data);

    checkMessage(answer);
  }
};

export const movePieceServer = (pieceId, positionXY) => {
  client.send(
    JSON.stringify({
      message: constant.MOVE_PIECE,
      data: {
        pieceId,
        positionXY
      }
    })
  );
};
