const topic = '/api/casa/3/gas';

// Get gás
export function getGas(res, gas) {
    if (gas < 0 || gas > 100) {
        return res.status(200).json({ gas: 0 });
    } else {
        return res.status(200).json({ gas: gas });   
    }
}