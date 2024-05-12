import axios from "axios";

const apiUrl = "https://blockstream.info/testnet/api/address/";

function queryAddr(addr) {
    axios.get(apiUrl + addr)
        .then(response => {
            console.log(response.data);
        });

}

export default queryAddr;