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

const listUsers = [];

let players = [
  { name: "player1", used: false, address: "" },
  { name: "player2", used: false, address: "" }
];

function sendMessage(message, avoid) {
  for (const player of players) {
    if (avoid === undefined || player.address !== avoid) {
      for (const user of listUsers) {
        if (user[player.address] !== undefined) {
          user[player.address].connection.send(JSON.stringify(message));
        }
      }
    }
  }
}

const givePlace = connection => {
  for (const player of players) {
    if (!player.used) {
      player.used = true;
      player.address = connection.remoteAddress;

      listUsers.push({ [connection.remoteAddress]: { connection } });
      break;
    }
  }
};

const leavePlace = address => {
  for (let player of players) {
    if (player.address === address) {
      player.used = false;

      listUsers.splice(listUsers.findIndex(() => player.address), 1);
      break;
    }
  }
};

const firstConnection = connection => {
  givePlace(connection);
  sendMessage({ message: "INIT_PLAYERS", data: players });
};

function checkMessage(connection, { message, data }) {
  if (message === "MOVE_PIECE") {
    console.log("my adress LOL : ", connection.remoteAddress);
    sendMessage({ message, data }, connection.remoteAddress);
  }
}

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

      checkMessage(connection, JSON.parse(message.utf8Data));
    }
  });

  connection.on("close", function(reasonCode, description) {
    console.log(
      `${new Date()}. Peer ${
        connection.remoteAddress
      } disconnected with reason code : ${reasonCode}. Description : ${description}`
    );
    if (parseInt(reasonCode, 10) === 1001 || 1006) {
      leavePlace(connection.remoteAddress);
    }
  });
});
