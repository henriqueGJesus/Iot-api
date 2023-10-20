const topic = '/api/casa/';

// Requisição para ligar/desligar uma luz
function luz(req, res, client) {
    const casa = req.params.id;
    const luz = req.body.luz;
    console.log(req.params.id);
    if (luz !== 1 && luz !== 2 && luz !== 3) {
        return res.status(400).json({ error: 'O corpo da requisição deve ser "1" ou "2".' });
    }
    if (casa !== '1' && casa !== '2' && casa !== '3') {
        return res.status(400).json({ error: 'O id da casa deve ser "1", "2" ou "3".' });
    }
    client.publish(`${topic}${casa}/luz/${luz}`, "", { qos: 0, retain: false }, (error) => { 
        if (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao publicar mensagem.' });
        }
    });
    return res.status(201).json({ result: 'O estado da lampada foi alterado!' });
}

// Requisição para ligar/desligar todas as luzes da casa
function luz_todas(req, res, client) {
    const casaId = req.params.id;
    const acao = req.body.acao;
    if (acao !== 'ligar' && acao !== 'desligar') {
        return res.status(400).json({ error: 'O corpo da requisição deve ser "ligar" ou "desligar".' });
    }
    client.publish(`${topic}${casaId}/luz/todas`, acao, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao publicar mensagem.' });
        }
    });
    return res.status(201).json();
}

module.exports = { 
    luz, 
    luz_todas 
};