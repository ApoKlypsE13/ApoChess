import * as constant from "./constant";
import { initPlayers, movePiece } from "../index";

export default function checkMessage(datas) {
  console.log(datas);

  switch (datas.message) {
    case constant.INIT_PLAYERS:
      try {
        initPlayers(datas.data);
      } catch (e) {
        console.error("Unable to reset players");
      }
      break;
    case constant.MOVE_PIECE:
      try {
        movePiece(datas.data);
      } catch (e) {
        console.error("Unable to move chesspiece");
      }
      break;

    default:
      break;
  }
}
