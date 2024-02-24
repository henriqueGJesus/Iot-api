const topic= "fazenda"

const mqtt = require('mqtt');
const connectUrl = `mqtt://broker.mqttdashboard.com`;
const { mqtt_especificacoes2 } = require('../mqtt/mqttSetor2');
const clientJonatas = mqtt.connect(connectUrl, mqtt_especificacoes2());
const topicJonatas = "setor1-setor2";

function temperatura(res, temperatura) {
    if (temperatura < 12 || temperatura > 28) {
        return res.status(200).json({ gas: 23 });
    } else {
        return res.status(200).json({ gas: temperatura });   
    }
}

function temperaturaPostarTopico(req, res, client){
    const mensagemJSON = JSON.stringify(req.body);
   
    // publicando o objeto recebido no nosso topico
    client.publish(topic, mensagemJSON, (err) => {
        if (err) {
            console.error('Erro ao publicar mensagem no MQTT:', err);
            return res.status(500).send('Erro interno ao enviar mensagem MQTT');
        }

        console.log('Mensagem publicada com sucesso no MQTT');
        // Retornar um status 200 OK
        
    });
    publicarObjetoTopicoSetor2(JSON.stringify(req.body.value),res)    
}

function publicarObjetoTopicoSetor2(obejtoEnvioSetor2,res){
    console.log(obejtoEnvioSetor2)
    const mensagemSetor2 = obejtoEnvioSetor2

    clientJonatas.publish(topicJonatas, mensagemSetor2, (err)=>{
        if(err){
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