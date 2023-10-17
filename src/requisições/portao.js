const topic = '/api/casa/';

function portao(req, res, client) {
    const casa = req.params.id;
    if (casa !== '1' && casa !== '2' && casa !== '3') {
        return res.status(400).json({ error: 'O id da casa deve ser "1", "2" ou "3".' });
    }
    client.publish(`${topic}${casa}/portao`, "", { qos: 0, retain: false }, (error) => { 
        if (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao publicar mensagem.' });
        }
    });

    return res.status(201).json();
}

module.exports = {
    portao
};