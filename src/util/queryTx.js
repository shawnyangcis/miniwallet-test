import axios from "axios";

const apiUrl = "https://blockstream.info/testnet/api/tx/";

function queryTx(txId) {
    axios.get(apiUrl + txId)
    .then(response => {
        console.log(response.data);
    });

}

export default queryTx;