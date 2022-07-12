export class TerminalWs {

    public static start() {

        // Node.js socket server script
        const net = require('net');

        // Create a server object
        const server = net.createServer((socket : any) => {
            socket.on('data', (data :any) => {
                console.log(data.toString());
            });

            socket.write('SERVER: Hello! This is server speaking.');
            socket.end('SERVER: Closing connection now.');
        })
        .on('error', (err : Error) => {
            console.error(err);
        });

        // Open server on port 9898
        server.listen(9898, () => {
            console.log('opened server on', server.address().port);
        });
    }


    
}

TerminalWs.start();