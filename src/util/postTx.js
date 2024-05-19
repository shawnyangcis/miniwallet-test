import axios from "axios";

const createTxUrl = `http://api.blockcypher.com/v1/btc/test3/txs/new`;
const sendTxUrl = `http://api.blockcypher.com/v1/btc/test3/txs/send`;


async function createTx(inputs, outputs, value, changeAddr) {
    value = Number(value);
    const response = await axios.post(createTxUrl, {
        "inputs": [{ "addresses": inputs }],
        "outputs": [{ "addresses": outputs, "value": value }],
        // Because the fee is too high to generate a TX if using high or medium preference
        "preference": "low",
    });
    return response;
}

async function postTx(txSkeleton) {
    const response = await axios.post(sendTxUrl, JSON.stringify(txSkeleton));
    return response;
}

export { createTx, postTx };