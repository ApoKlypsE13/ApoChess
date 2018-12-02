import { server } from "websocket";
import http from "http";

const httpServer = http.createServer(function(request, response) {
  console.log(new Date() + " Received request for " + request.url);
  response.writeHead(404);
  response.end();
});

httpServer.listen(8080, function() {
  console.log(new Date() + " Server is listening on port 8080");
});

const wsServer = new server({
  httpServer,
  autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

let players = [
  { name: "player1", used: false, address: "", connection: null },
  { name: "player2", used: false, address: "", connection: null }
];

const sendMessage = (obj, data) => {
  for (const player of players) {
    if (player.connection !== null) {
      console.log(data);
      const newObj = JSON.stringify(obj);
      console.log(newObj);
      player.connection.send(newObj);
    }
  }
};

const givePlace = connection => {
  for (const player of players) {
    if (!player.used) {
      player.used = true;
      player.address = connection.address;
      player.connection = connection;
      break;
    }
  }
};

const leavePlace = address => {
  for (const player of players) {
    if (player.address === address) {
      player.used = false;
      player.address = "";
      player.connection = null;
      break;
    }
  }
};

const firstConnection = connection => {
  givePlace(connection);
  sendMessage({ messageSent: "INIT_PLAYERS", dataSent: players });
};

wsServer.on("request", function(request) {
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  var connection = request.accept("echo-protocol", request.origin);
  console.log(
    `${new Date()} Connection : ${connection.remoteAddress} accepted.`
  );

  firstConnection(connection);

  connection.on("message", function(message) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      const answer = JSON.parse(message.utf8Data);

      connection.sendUTF(message.utf8Data);
    }
  });

  connection.on("close", function(reasonCode, description) {
    console.log(
      `${new Date()}. Peer ${
        connection.remoteAddress
      } disconnected with reason code : ${reasonCode}. Description : ${description}`
    );
    if (parseInt(reasonCode, 10) === 1001) {
      leavePlace(connection.remoteAddress);
    }
  });
});
