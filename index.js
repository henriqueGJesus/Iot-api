const express = require('express');
const app = express();
const port = 3000;

// Mqtt 
const mqtt = require('mqtt');
const protocol = 'mqtt'
const host = 'broker.emqx.io'
const portMqtt = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `${protocol}://${host}:${portMqtt}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
})

const topic = "teste12345"

client.on('connect', () => {})

app.post('/api/post', (req, res) => {
    const message = req.body;
    client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
    res.json({ message: 'Mensagem enviada' });
    res.status(201).json(message);
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});