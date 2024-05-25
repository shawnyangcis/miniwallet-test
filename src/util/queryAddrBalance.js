import axios from "axios";

async function queryAddrBalance(addr) {
    const apiUrl = `http://api.blockcypher.com/v1/btc/test3/addrs/${addr}`;
    return await axios.get(apiUrl);
}

export default queryAddrBalance;