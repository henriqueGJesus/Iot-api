const topic = "dadoscoleta"

const mqtt = require('mqtt');
const connectUrl = `mqtt://broker.mqttdashboard.com`;
const { mqtt_especificacoes2 } = require('../mqtt/mqttSetor2');
const clientJonatas = mqtt.connect(connectUrl, mqtt_especificacoes2());
const topicJonatas = "setor1-setor2";
let temperaturaParaMandarFront= [];

function temperatura(req,res) {
    console.log(temperaturaParaMandarFront)
        return res.status(200).json(temperaturaParaMandarFront);
}

function temperaturaPostarTopico(req, res, client) {

    const mensagemJSON = JSON.stringify(req.body);


    // publicando o objeto recebido no nosso topico
    client.publish("dadoscoleta", JSON.stringify(mensagemJSON), (err) => {
        if (err) {
            console.error('Erro ao publicar mensagem no MQTT:', err);
            return res.status(500).send('Erro interno ao enviar mensagem MQTT');
        }

        console.log('Mensagem publicada com sucesso no MQTT');
        // Retornar um status 200 OK

    });
    const topic2 = "temperautra"
   
    client.on("message", (receivedTopic, message) => {
        if (receivedTopic === topic2) {
            temperaturaParaMandarFront.push(message)
            console.log(temperaturaParaMandarFront)
            // Faça o que for necessário com a mensagem recebida
        }
    });
   
    publicarObjetoTopicoSetor2(JSON.stringify(req.body.value), res)
}

function publicarObjetoTopicoSetor2(obejtoEnvioSetor2, res) {
    console.log(obejtoEnvioSetor2)
    const mensagemSetor2 = obejtoEnvioSetor2

    clientJonatas.publish(topicJonatas, mensagemSetor2, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send('erro ao enviar mensagem jonatas')

        }

    })
    res.status(200).send('Requisição bem-sucedida');
}
module.exports = {
    temperatura,
    temperaturaPostarTopico
};