import axios from "axios";

async function queryBlock(blockHash) {
    const apiUrl = `http://api.blockcypher.com/v1/btc/test3/blocks/${blockHash}`;
    return await axios.get(apiUrl);
}

export default queryBlock;