import { w3cwebsocket } from "websocket";
import checkMessage from "../network/action";

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
  console.log(e)
  if (typeof e.data === "string") {
    console.log(e.data)
    const answer = JSON.parse(e.data);

    checkMessage(answer);
  }
};

export const resetPlayers = () => {
  client.send(JSON.stringify({ message: "RESET_PLAYERS" }));
};

export default resetPlayers;
