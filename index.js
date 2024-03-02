
// Mqtt ===========================================

const mqtt = require('mqtt');
const connectUrl = `mqtt://mqtt.tago.io:1883`;
const { mqtt_especificacoes } = require('./src/mqtt/mqtt');
const client = mqtt.connect(connectUrl, mqtt_especificacoes());
const topic = "fazenda";
const topic2="temperatura"

// Se inscrevendo no tópico
client.subscribe(topic);
client.subscribe();

client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic2) {
        console.log("Mensagem recebida no tópico 'dadoscoleta':", message.toString());
        // Faça o que for necessário com a mensagem recebida
    }
});

// API ============================================

const express = require('express');
const app = express();
const cors = require('cors');

// const { luz, luz_todas } = require('./src/requisições/luz');
// const { portao } = require('./src/requisições/portao');
const {temperatura,temperaturaPostarTopico} = require("./src/requisições/temperatura")
app.use(cors({origin: '*'}));
app.use(express.json());


// app.post(`${topic}:id/luz`, (req, res) => luz(req, res, client));
app.get(`/${topic}/temperatura`, (req,res) => temperatura(req,res));

app.post(`/${topic}`, (req, res) => temperaturaPostarTopico(req, res,client));

app.listen(3000, () => console.log(`API rodando na porta ${3000}`));





