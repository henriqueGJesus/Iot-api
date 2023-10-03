
// Mqtt ===========================================
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

client.on('connect', () => {})

// API ============================================

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const topic = "casa/"

app.use(cors({origin: '*'}));
app.use(express.json());

// Requisição para ligar/desligar luz
app.get('/api/casa/:id/luz/:acao', (req, res) => {
    const casaId = req.params.id;
    const acao = req.params.acao;

    if (acao !== 'on' && acao !== 'off' && acao !== 'null') {
        return res.status(400).json({ error: 'A ação deve ser "on", "off" ou "null".' });
    }

    client.publish(`${topic}${casaId}/luz`, acao, { qos: 0, retain: false }, (error) => { 
        if (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao publicar mensagem.' });
        }
    });

    return res.status(201).json();
});

// Requisição para abrir/fechar portão
app.get('/api/casa/:id/portao/:acao', (req, res) => {
    const casaId = req.params.id;
    const acao = req.params.acao;

    if (acao !== 'on' && acao !== 'off' && acao !== 'null') {
        return res.status(400).json({ error: 'A ação deve ser "on" ou "off".' });
    }

    client.publish(`${topic}${casaId}/portao`, acao, { qos: 0, retain: false }, (error) => { 
        if (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao publicar mensagem.' });
        }
    });

    return res.status(201).json();
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

/*
    NOTA
    
    Deve ser testado se o frontend consegue utilizar
    a tecnologia MQTT para se inscrever nos tópicos
    necessários para pegar as informações de estado
    dos dispositivos.

    Utilizar a biblioteca mqtt.js no frontend
    para permitir a conexão com o broker MQTT.
*/