const topic = '/api/casa/2/temperatura';

export function getTemperatura(res, temperatura) {
    if (temperatura < 12 || temperatura > 28) {
        return res.status(200).json({ gas: 23 });
    } else {
        return res.status(200).json({ gas: temperatura });   
    }
}