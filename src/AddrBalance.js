import queryAddrBalance from './util/queryAddrBalance';
import { useState } from 'react';
import { Button } from 'react-bootstrap';


function AddrBalance() {
    const [inputValue, setInputValue] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async () => {
        queryAddrBalance(inputValue).then(
            resp => {
                const result = resp.data;
                console.log(`query balance resp: ${JSON.stringify(result)}`);
                setResponse(result);
            }
        ).catch(err => {
            console.error(`query balance error: ${err}`);
        });
    };
    return (
        <div>
            <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                placeholder='Inpue address please' />
            <Button onClick={handleSubmit}>Query Address Balance</Button>
            <div>
                <h3>Balance result:</h3>
                {
                    response && (

                        <table border="1">
                            <th>Properties</th>
                            <th>Value</th>
                            <tr>
                                <td>address</td>
                                <td>{response.address}</td>
                            </tr>
                            <tr>
                                <td>total_received</td>
                                <td>{response.total_received}</td>
                            </tr>
                            <tr>
                                <td>total_sent</td>
                                <td>{response.total_sent}</td>
                            </tr>
                            <tr>
                                <td>balance</td>
                                <td>{response.balance}</td>
                            </tr>
                            <tr>
                                <td>unconfirmed_balance</td>
                                <td>{response.unconfirmed_balance}</td>
                            </tr>
                            <tr>
                                <td>final_balance</td>
                                <td>{response.final_balance}</td>
                            </tr>
                            <tr>
                                <td>n_tx</td>
                                <td>{response.n_tx}</td>
                            </tr>
                            <tr>
                                <td>unconfirmed_n_tx</td>
                                <td>{response.unconfirmed_n_tx}</td>
                            </tr>
                            <tr>
                                <td>final_n_tx</td>
                                <td>{response.final_n_tx}</td>
                            </tr>
                        </table>
                    )
                }
            </div>
        </div>
    );
}

export default AddrBalance;