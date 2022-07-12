import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";
import TerminalService from "../../services/TerminalService.js";

export default class TerminalCore extends ViewCore {

    private socket : WebSocket;

    public constructor() {
        super();
    }

    public connect(){
        this.socket = TerminalService.connectWs();
    }
    
    public sendCommand(cmd : string) {
        this.socket.send(cmd);
    }

    public onOpen(){
        this.socket.onopen = function(e) {
            console.log("Connection established");   
        };
    }

    public onOutput(callback: (message: string[] , error : boolean) => void){

        this.socket.onmessage = (event) => {
            const dataObj = JSON.parse(event.data);
            const lines = dataObj.message.toString().split(/\r?\n/).filter(l => l.trim().length > 0);

            if(dataObj.type == "data") {
                callback(lines,false);
            } else if(dataObj.type == "error"){
                callback(lines,true);
            }           
        }
        
    }

    public onError(){
        this.socket.onerror = function(error : any) {
            console.log(`[error] ${error.message}`);
        };
    }

    public onClose(){
        this.socket.onclose = function(e) {
            if(e.wasClean) {
                console.log("Connection closed" );   
            } else {
                console.log("Connection died"); 
            }
        };
    }


}