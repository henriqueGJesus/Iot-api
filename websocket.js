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
        try {
            console.log(message);
            const parsedMessage = JSON.parse(message);
            const messageType = parsedMessage.type;
            switch (messageType) {
                case 'Topic1':
                    // Handle Topic1 message.
                    console.log('Received Topic1 message:', parsedMessage);
                    break;
                case 'Topic2':
                    // Handle Topic2 message.
                    console.log('Received Topic2 message:', parsedMessage);
                    break;
                case 'Topic3':
                    // Handle Topic3 message.
                    console.log('Received Topic3 message:', parsedMessage);
                    break;
                default:
                    console.log('Unknown message type:', messageType);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.send(JSON.stringify({ message: 'teste' }));
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
