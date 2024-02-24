function mqtt_especificacoes2() {
    return {
        clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
        clean: true,
        connectTimeout: 4000,
        username: '',
        password: '',
        reconnectPeriod: 1000,
    }
};

module.exports = {
    mqtt_especificacoes2
};