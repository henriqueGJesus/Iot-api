function gas(res, gas) {
    if (gas < 0 || gas > 100) {
        return res.status(200).json({ gas: 0 });
    } else {
        return res.status(200).json({ gas: gas });   
    }
}

module.exports = {
    gas
};