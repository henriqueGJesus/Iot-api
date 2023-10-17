function mqtt_especificacoes() {
    return {
        clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
        clean: true,
        connectTimeout: 4000,
        username: 'Token',
        password: 'a97ab245-bd1f-4e93-87eb-42b283bcdbd1',
        reconnectPeriod: 1000,
    }
};

module.exports = {
    mqtt_especificacoes
};