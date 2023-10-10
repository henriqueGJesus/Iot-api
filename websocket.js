/* WEBSOCKET ======================================== */
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server running.');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    // Handle WebSocket messages here.
    ws.on('message', (message) => {
        const msg = parseInt(message);
        console.log("Casa conectada: " + msg);

        if(msg == 1){
            //CASA 1
            ws.send(JSON.stringify({ message: '1' }));    

        } else if(msg == 2){
            //CASA 2
            ws.send(JSON.stringify({ message: '2' }));    

        } else if(msg == 3){
            //CASA 3
            ws.send(JSON.stringify({ message: '3' }));    
        }
    });
});

server.listen(433, () => {
    console.log(`Server is listening on port 433 (Websocket)`);
});