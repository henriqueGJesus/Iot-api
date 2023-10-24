function temperatura(res, temperatura) {
    if (temperatura < 12 || temperatura > 28) {
        return res.status(200).json({ gas: 23 });
    } else {
        return res.status(200).json({ gas: temperatura });   
    }
}

module.exports = {
    temperatura
};