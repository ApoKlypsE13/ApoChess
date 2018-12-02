import * as constant from "./constant";
import { initPlayers } from "../index";

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

    default:
      break;
  }
}
