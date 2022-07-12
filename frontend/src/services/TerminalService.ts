import { Config } from "../config/Config";

export default class TerminalService {

    public static connectWs(){
        var exampleSocket = new WebSocket(Config.API.TERMINAL_WS, ["ws", "wss"]);
    }


}