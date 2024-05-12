import bitcore from "bitcore-lib"
import axios from "axios";


const addr = "";
const prevTxId = "";
const apiUrl = "https://blockstream.info/testnet/api/tx";

function submitTx() {
    const privateKey = new bitcore.PrivateKey("", "testnet");
    const utxo = {
        "txId": prevTxId,
        "outputIndex": 0,
        "address": addr,
        "script": "",
        "satoshis": 18769
    };
    const transcation = new bitcore.Transaction()
        .from(utxo)
        .to("", 10000)
        .change(addr)
        .sign(privateKey);
    const serializedTx = transcation.serialize({ disableDustOutputs: true });
    console.log(`${serializedTx.toString()}`);

    axios.post(apiUrl, serializedTx)
        .then((resp) => {
            console.log(`txId is ${resp.data}`);
        }).catch((err) => {
            console.log(err);
        })
        ;
}

export default submitTx;