const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Mqtt 
const mqtt = require('mqtt');
const protocol = 'mqtt'
const host = 'mqtt.tago.io'
const portMqtt = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `${protocol}://${host}:${portMqtt}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'Token',
    password: 'a97ab245-bd1f-4e93-87eb-42b283bcdbd1',
    reconnectPeriod: 1000,
})
const topic = "casa/1"
client.on('connect', () => {})

client.publish(topic, "Ligar luz da Cozinha", { qos: 0, retain: false }, (error) => {
    if (error) {
        console.error(error)
    }
})

// API
app.use(cors({origin: '*'}));
app.use(express.json());
app.post('/api/post', (req, res) => {
    const message = req.body.mensagem;
    
    res.status(201).json(message);
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});