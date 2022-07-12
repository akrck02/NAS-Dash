import { Config } from "../config/Config.js";

export default class TerminalService {

    public static connectWs(){
        const exampleSocket = new WebSocket(Config.API.TERMINAL_WS, ["ws", "wss"]);
        console.log("Connecting to terminal websocket...");
        console.log(exampleSocket ? "Done." : "Failed.");
        return exampleSocket;
    }


}