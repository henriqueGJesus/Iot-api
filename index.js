
// Mqtt ===========================================

const mqtt = require('mqtt');
const connectUrl = `mqtt://mqtt.tago.io:1883`;
const { mqtt_especificacoes } = require('./src/mqtt/mqtt');
const client = mqtt.connect(connectUrl, mqtt_especificacoes());
client.on('connect', () => {});

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


app.listen(3000, () => console.log(`API rodando na porta ${3000}`));





