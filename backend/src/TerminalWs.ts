import { exec, execSync } from "child_process";

export class TerminalWs {

    public static start() {

        // Node.js socket server script
        const WebSocket = require('ws');

        const server = new WebSocket.Server({ port: 8080 });
          
      
        server.on('connection', function(socket :any) {
            console.log("[Websocket] connected by client");
            
            
            // When you receive a message, send that message to every socket.
            socket.on('message', function(msg : any) {
                
                console.log("[websocket] Command recieved: " + msg);
                
                //Execute command 
                const term = exec(msg.toString(),);

                // On output data 
                term.stdout?.on("data", (data) => {
                    console.log("[websocket] Sending " + data.toString());
                    socket.send(JSON.stringify({
                        type : "data",
                        message : data.toString()
                    }))
                })

                // On output error data 
                term.stderr?.on("data", (data) => {
                    console.log("[websocket] Sending error " + data.toString());
                    
                    socket.send(JSON.stringify({
                        type : "error",
                        message : data.toString()
                    }))
                })
                
                // what to do when the command is done
                term.on('exit', function(code){});

            });
            
            // When a socket closes, or disconnects, remove it from the array.
            socket.on('close', function() {
               console.log("[Websocket] Connection closed.");
            });
        });
    }


    
}

TerminalWs.start();