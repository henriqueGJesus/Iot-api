
// Mqtt ===========================================

const mqtt = require('mqtt');
const connectUrl = `mqtt://mqtt.tago.io:1883`;
const { mqtt_especificacoes } = require('./src/mqtt/mqtt');
const client = mqtt.connect(connectUrl, mqtt_especificacoes());

client.on('connect', () => {
    client.subscribe('api/casa/2/temperatura', (error) => {
        if (!error) {
            console.log('Inscrito na luz 1 da casa 1');
        } else {
            console.error('Subscription failed', error);
        }
    });
    client.subscribe('api/casa/3/gas', (error) => {
        if (!error) {
            console.log('Inscrito na luz 2 da casa 1');
        } else {
            console.error('Subscription failed', error);
        }
    });
});

let gas = 0;
let temperatura = 0;
client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    if(topic == 'api/casa/2/temperatura'){
        temperatura = message;
    }
    if(topic == 'api/casa/3/gas'){
        gas = message;
    }
});

// API ============================================

const express = require('express');
const app = express();
const cors = require('cors');
const topic = "/api/casa/";
const { luz, luz_todas } = require('./src/requisições/luz');
const { portao } = require('./src/requisições/portao');

app.use(cors({origin: '*'}));
app.use(express.json());

// Requisição para ligar/desligar luz
app.post(`${topic}:id/luz`, (req, res) => luz(req, res, client));
app.post(`${topic}:id/luz/todas`, (req, res) => luz_todas(req, res, client));

// Requisição para abrir portão
app.post(`${topic}:id/portao`, (req, res) => portao(req, res, client));


// Requisição getters gás e temp
app.get(`${topic}2/temperatura`, (req, res) => getTemperatura(res, temperatura));
app.get(`${topic}3/gas`, (req, res) => getGas(res, gas));


app.listen(3000, () => console.log(`API rodando na porta ${3000}`));





