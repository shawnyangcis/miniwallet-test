import axios from "axios";

async function queryTx(txHash) {
    const apiUrl = `http://api.blockcypher.com/v1/btc/test3/txs/${txHash}`;
    return await axios.get(apiUrl);
}

export default queryTx;