const mqtt = require('mqtt');

const protocol = 'mqtt'
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `${protocol}://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
})

const topic = "teste12345"

client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => { 
        console.log(` inscrito no tópico '${topic}' `) 
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})