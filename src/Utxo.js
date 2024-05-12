import queryUtxo from './util/queryUtxo';
import {useState} from 'react';


function Utxo() {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState([].fill(null));

    const handleSubmit = async () => {
        queryUtxo(inputValue).then(
            resp => {
                const result = resp.data;
                console.log(`queryUtxo resp: ${JSON.stringify(result)}`);
                setResponse(result);
            }
        ).catch(err => {
            console.error(`queryUtxo error: ${err}`);
        });
    }
    const utxoList = response.map(utxo => (
    <li key={utxo.txId}>
        <p className='utxo_detail'>
            txid: {utxo.txid}
        </p>
        <p className='utxo_detail'>
            vout: {utxo.vout}
        </p>
        <p className='utxo_detail'>
            confirmed: {utxo.status.confirmed}
        </p>
        <p className='utxo_detail'>
            block_height: {utxo.status.block_height}
        </p>
        <p className='utxo_detail'>
            block_hash: {utxo.status.block_hash}
        </p>
        <p className='utxo_detail'>
            block_time: {utxo.status.block_time}
        </p>
        <p className='utxo_detail'>
            value: {utxo.value}
        </p>
    </li>
    ));
    return (
        <div>
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                placeholder='Inpue address please' />
            <button onClick={handleSubmit}>Query Utxo</button>
            <div>
                <h2>Utxo result:</h2>
                <ul>
                    {utxoList}
                </ul>
            </div>
        </div>
    );
}

export default Utxo;