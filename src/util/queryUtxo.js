import axios from "axios";

async function queryUtxo(addr) {
    const apiUrl = "https://blockstream.info/testnet/api/address/";
    return await axios.get(apiUrl + addr + "/utxo");
}

export default queryUtxo;