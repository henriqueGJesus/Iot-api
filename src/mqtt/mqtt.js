function mqtt_especificacoes() {
    return {
        clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
        clean: true,
        connectTimeout: 4000,
        username: '',
        password: 'c5d8fb2b-d92f-4f9a-893b-9fc7d27cdd8e',
        reconnectPeriod: 1000,
    }
};

module.exports = {
    mqtt_especificacoes
};